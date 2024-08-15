---
title: "Creating a Containerized Application with Buildpacks"
seoTitle: "Creating a Containerized Application with Buildpacks"
seoDescription: "Buildpacks are another approach for building container images and provide an alternate approach to turn your source code into a container image. Buildpacks"
datePublished: Thu Aug 15 2024 07:16:00 GMT+0000 (Coordinated Universal Time)
cuid: clzuy55wx000309ldagdn8wmk
slug: creating-a-containerized-application-with-buildpacks
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723701833961/8aed6a04-dd52-4e9e-88a8-16ed9a6dd7f8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723706199117/df7ea468-7973-4623-be8e-4d47bccfbfba.png
tags: the-arcade-base-camp-august-2024, creating-a-containerized-application-with-buildpacks

---

## **Overview**

Buildpacks are another approach for building container images and provide an alternate approach to turn your source code into a container image. Buildpacks are distributed and executed in images called builders. Each builder can have one or more buildpacks. A builder turns your source code into a container image. The buildpacks do the actual work to build and package the container image that you can deploy to Cloud Run or run with Docker locally.

You can create your own buildpacks, or use those provided by multiple vendors. Google Cloud's buildpacks allow developers to create and deploy containerized applications without the need to install Docker locally, or create a Dockerfile. Buildpacks are also built into Cloud Run to enable a source-based deployment workflow.

## **Objectives**

In this lab, you:

* Build an application with `pack`, a command-line tool that is used with builders to create container images from source code.
    
* Use the Google Cloud's buildpacks builder to build a container image.
    
* Run and test the container locally with Docker.
    
* Build and redeploy the container to Cloud Run.
    

## **Setup**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

### Activate Google Cloud Shell

Google Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud.

Google Cloud Shell provides command-line access to your Google Cloud resources.

1. In Cloud console, on the top right toolbar, click the Open Cloud Shell button.
    
    ![Highlighted Cloud Shell icon](https://cdn.qwiklabs.com/WGBFVIap4CrFWut%2BGdNFzNxeelWYHF1IqYSMFH6Ouq4%3D align="left")
    
2. Click **Continue**.
    

It takes a few moments to provision and connect to the environment. When you are connected, you are already authenticated, and the project is set to your *PROJECT\_ID*. For example:

![Project ID highlighted in the Cloud Shell Terminal](https://cdn.qwiklabs.com/hmMK0W41Txk%2B20bQyuDP9g60vCdBajIS%2B52iI2f4bYk%3D align="left")

**gcloud** is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

* You can list the active account name with this command:
    

```apache
gcloud auth list
```

**Output:**

```apache
Credentialed accounts:
 - @.com (active)
```

**Example output:**

```apache
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

* You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project =
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** Full documentation of **gcloud** is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud) .

## **Task 1. Configure your environment and project**

In this task, you set environment variables, and configure your Cloud Shell environment.

### Configure your Cloud Shell environment

1. To set your project ID and region environment variables, in Cloud Shell, run the following commands:
    
    ```apache
    PROJECT_ID=$(gcloud config get-value project)
    REGION=us-central1
    ```
    
2. Set the compute region in Cloud Shell:
    
    ```apache
    gcloud config set compute/region $REGION
    ```
    

### Enable Google APIs

* To use Cloud Run, and the Google Translate API later in this lab, enable relevant APIs for your project:
    
    ```apache
    gcloud services enable artifactregistry.googleapis.com run.googleapis.com translate.googleapis.com
    ```
    

Click **Check my progress** to verify the objective.

Enabled Google APIs

**Check my progress**

## **Task 2. Build and run an application with Docker**

In this task, you build a sample application with the `pack` command line tool and the Google Cloud's buildpacks builder.

### Develop the application

1. Create an `app` directory and change to it:
    
    ```apache
    mkdir app && cd app
    ```
    
2. Copy the sample `python` application for this lab from Cloud Storage, and extract the contents from the archive:
    
    ```apache
    gsutil cp gs://cloud-training/CBL513/sample-apps/sample-py-app.zip . && unzip sample-py-app
    ```
    
3. View the sample application files and source code:
    
    ```apache
    ls sample-py-app
    ```
    
    ```apache
    cat sample-py-app/main.py
    ```
    
    Because the Python buildpack does not generate a default container entry-point for the application, we use a *Procfile* to configure the application's start command.
    
    The application is written in Python and returns a sample welcome message in response to a request made to the application.
    

### Build the container

1. Change to the sample application directory:
    
    ```apache
    cd sample-py-app
    ```
    
2. To build the container, run `pack`:
    
    ```apache
    pack build --builder=gcr.io/buildpacks/builder sample-py-app
    ```
    
    A partial output is similar to:
    
    ```bash
    ...
    ...
    [exporter] Setting default process type 'web'
    [exporter] Saving sample-py-app...
    [exporter] *** Images (9f9f9a48fd46):
    [exporter]       sample-py-app
    [exporter] Adding cache layer 'google.python.pip:pip'
    [exporter] Adding cache layer 'google.python.pip:pipcache'
    Successfully built image sample-py-app
    ```
    
    **Note:** With *pack*, you did not need to write and provide a *Dockerfile* to build the container image.
    
3. To view the images downloaded and built in your Cloud Shell host, run:
    
    ```apache
    docker images
    ```
    
    ```apache
    REPOSITORY                  TAG       IMAGE ID       CREATED        SIZE
    gcr.io/buildpacks/builder   latest    514fb6f1bbfe   29 hours ago   804MB
    gcr.io/buildpacks/gcp/run   v1        22db1b5e48e3   29 hours ago   177MB
    buildpacksio/lifecycle      0.16.0    67e021546a3f   43 years ago   30.5MB
    sample-py-app               latest    9f9f9a48fd46   43 years ago   571MB
    ```
    
4. Run the container locally in Docker by passing in the PORT environment variable to the application and binding the host's port 8080 to the container port:
    
    ```apache
    docker run -it -e PORT=8080 -p 8080:8080 -d sample-py-app
    ```
    
    The application code listens on the port that is provided in the environment variable, in this case, port 8080.
    
5. Test the containerized application with the `curl` command:
    
    ```apache
    curl http://localhost:8080/
    ```
    
    You should see the following message as a response:
    
    ```bash
    Welcome to this sample app, built with Buildpacks.
    ```
    

## **Task 3. Build and run an application on Cloud Run**

Typically, as a next step in your development and deployment lifecycle, you should push the container image that you built in the previous task to Artifact Registry, and then deploy the image to a container-based environment like Google Kubernetes Engine or Cloud Run.

In this task, you modify the sample application code, then build and deploy the containerized application directly from source with Cloud Run.

### Modify the application code

You modify the sample application code to use the Google Translation API that translates a piece of text from English to Spanish.

1. Edit the `main.py` file with an editor of your choice, for example, **vi** or **nano**. You can also click **Open Editor** from the Cloud Shell menu to edit the file.
    
2. Replace the entire contents of the `main.py` file with the code below:
    
    ```python
    from flask import Flask, request
    import google.auth
    from google.cloud import translate
    
    app = Flask(__name__)
    _, PROJECT_ID = google.auth.default()
    TRANSLATE = translate.TranslationServiceClient()
    PARENT = 'projects/{}'.format(PROJECT_ID)
    SOURCE, TARGET = ('en', 'English'), ('es', 'Spanish')
    
    @app.route('/', methods=['GET', 'POST'])
    def index():
        # reset all variables
        text = translated = None
    
        if request.method == 'POST':
            text = request.get_json().get('text').strip()
            if text:
                data = {
                    'contents': [text],
                    'parent': PARENT,
                    'target_language_code': TARGET[0],
                }
                # handle older call for backwards-compatibility
                try:
                    rsp = TRANSLATE.translate_text(request=data)
                except TypeError:
                    rsp = TRANSLATE.translate_text(**data)
                translated = rsp.translations[0].translated_text
    
        # create context
        context = {
            'trtext': translated
        }
        return context
    
    if __name__ == "__main__":
        # Dev only: run "python main.py" and open http://localhost:8080
        import os
        app.run(host="localhost", port=int(os.environ.get('PORT', 8080)), debug=True)
    ```
    
    The application code uses the Google Translate API to translate a piece of text passed in a JSON request from English to Spanish.
    

### Build and deploy the container

1. To build and deploy the container on Cloud Run, execute the following command:
    
    ```apache
    gcloud run deploy sample-py-app --source . --region=${REGION} --allow-unauthenticated
    ```
    
    The *allow-unauthenticated* option enables access to the service without requiring any authentication.
    
2. When prompted, type **Y** to accept the default repository that is created in Artifact Registry to store the container image.
    
3. When the command completes, a Cloud Run service named `sample-py-app` is created.
    
    The command output is similar to:
    
    ```bash
    Building using Buildpacks and deploying container to Cloud Run service [sample-py-app] in project [qwiklabs-gcp-00-0d56d42aca1a] region [asia-east1]
    OK Building and deploying new service... Done.                                                           
    OK Creating Container Repository...
    OK Uploading sources...
    OK Building Container... Logs are available at [https://console.cloud.google.com/cloud-build/builds/8bea2ded-4745-41f9-a82d-128e409daa20?project=34240880885].
    OK Creating Revision...                  
    OK Routing traffic...
    OK Setting IAM Policy...
    Done.
    Service [sample-py-app] revision [sample-py-app-00001-nec] has been deployed and is serving 100 percent of traffic.
    Service URL: https://sample-py-app-ulvp7xw3bq-de.a.run.app
    ```
    

### Test the Cloud Run service

1. Set an environment variable for the Cloud Run service that was created in the previous step:
    
    ```apache
    SERVICE_URL=[SERVICE URL]
    ```
    
    Replace the \[SERVICE URL\] with the value returned from Cloud Run in the output of the command in the previous step.
    
2. To test the service, , and execute the `curl` command:
    
    ```apache
    curl $SERVICE_URL -H 'Content-Type: application/json' -d '{"text" : "Welcome to this sample app, built with Google Cloud buildpacks."}'
    ```
    
    ```apache
    {"trtext":"Bienvenido a esta aplicaci\u00f3n de muestra, creada con paquetes de compilaci\u00f3n de Google Cloud."}
    ```
    

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=mL8JQqb2fIk] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723706791636/526d21e7-72aa-4104-8cbc-28f6f19c37c0.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Creating%20a%20Containerized%20Application%20with%20Buildpacks/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```