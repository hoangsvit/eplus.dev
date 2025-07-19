---
title: "Deploying a Python Flask Web Application to App Engine Flexible - GSP023"
seoTitle: "Deploying a Python Flask Web Application to App Engine Flexible - GSP0"
seoDescription: "Deploy a Python Flask app on Google Cloud's App Engine Flexible with Cloud APIs for Vision, Storage, and Datastore"
datePublished: Sat Jul 19 2025 04:02:50 GMT+0000 (Coordinated Universal Time)
cuid: cmd9q2nwa000n02jvhuq52mnk
slug: deploying-a-python-flask-web-application-to-app-engine-flexible-gsp023
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752897704664/4064522a-1573-4b6b-9b8b-1214ead7aab9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752897750052/4bc58cda-5939-4cf0-b88a-ee4db30f3536.png
tags: deploying-a-python-flask-web-application-to-app-engine-flexible-gsp023, deploying-a-python-flask, python-flask-web-application, app-engine-flexible, gsp023

---

## Overview

In this lab you will learn how to deploy a Python Flask web application to the App Engine Flexible environment. The example application allows a user to upload a photo of a person's face and learn how likely it is that the person is happy. The application uses Google Cloud APIs for Vision, Storage, and Datastore.

### About App Engine

Google App Engine applications are easy to create, easy to maintain, and easy to scale as your traffic and data storage needs change. With App Engine, there are no servers to maintain. You simply upload your application and it's ready to go.

App Engine applications automatically scale based on incoming traffic. Load balancing, microservices, authorization, SQL and NoSQL databases, traffic splitting, logging, search, versioning, roll out and roll backs, and security scanning are all supported natively and are highly customizable.

App Engine's [Flexible Environment](https://cloud.google.com/appengine/docs/flexible) supports a host of programming languages, including Java, Python, PHP, NodeJS, Ruby, and Go. App Engine's [Standard Environment](https://cloud.google.com/appengine/docs/about-the-standard-environment) is an additional option for certain languages including Python. The two environments give users maximum flexibility in how their application behaves since each environment has certain strengths. Read [Choosing an App Engine Environment](https://cloud.google.com/appengine/docs/the-appengine-environments) for more information.

### **What you'll learn**

* How to deploy a simple web application to the App Engine Flexible Environment
    
* How to access the Google Cloud client libraries for Vision, Storage, and Datastore
    
* How to use Cloud Shell
    

### Prerequisites

* Familiarity with Python
    
* Familiarity with standard Linux text editors such as vim, emacs, or nano
    
* Access to an image with a face
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-03-dd83653e23e4@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    6ObRCVjDYHfC
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-0cc3b535ba31`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-0cc3b535ba31
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-03-dd83653e23e4@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-02-0cc3b535ba31
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Get the sample code

1. In Cloud Shell, run the following command to copy the sample code:
    

```apache
gcloud storage cp -r gs://spls/gsp023/flex_and_vision/ .
```

2. Change directory into `flex_and_vision`:
    

```apache
cd flex_and_vision
```

## Task 2. Authenticate API requests

The Datastore, Storage, and Vision APIs are automatically enabled for you in this lab. In order to make requests to the APIs, you will need service account credentials. You can generate credentials from your project using *gcloud* in Cloud Shell. Your **Project ID** can be found on the tab where you started the lab.

1. Set an environment variable for your Project ID:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
```

2. Create a Service Account to access the Google Cloud APIs when testing locally:
    

```apache
gcloud iam service-accounts create qwiklab \
  --display-name "My Qwiklab Service Account"
```

3. Give your newly created Service Account appropriate permissions:
    

```apache
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
--member serviceAccount:qwiklab@${PROJECT_ID}.iam.gserviceaccount.com \
--role roles/owner
```

4. After creating your Service Account, create a Service Account key:
    

```apache
gcloud iam service-accounts keys create ~/key.json \
--iam-account qwiklab@${PROJECT_ID}.iam.gserviceaccount.com
```

This command generates a service account key stored in a JSON file named `key.json` in your home directory.

5. Using the absolute path of the generated key, set an environment variable for your service account key:
    

```apache
export GOOGLE_APPLICATION_CREDENTIALS="/home/${USER}/key.json"
```

Learn more about authenticating the Vision API from [Quickstart: Setup the Vision API Guide](https://cloud.google.com/vision/docs/common/auth).

Click **Check my progress** below to check your lab progress.

Authenticate API Requests

## Task 3. Testing the application locally

### Starting your virtual environment and installing dependencies

1. Create an isolated Python 3 environment named `env` with [virtualenv](https://virtualenv.pypa.io/en/stable):
    

```apache
virtualenv -p python3 env
```

2. Enter your newly created *virtualenv* named `env`:
    

```apache
source env/bin/activate
```

3. Use `pip` to install dependencies for your project from the `requirements.txt` file:
    

```apache
pip install -r requirements.txt
```

The `requirements.txt` file is a list of package dependencies you need for your project. The above command downloaded all of these listed package dependencies to the *virtualenv*.

### Creating an App Engine app

1. First, create an environment variable with your assigned region:
    

```apache
AE_REGION=us-east1
```

2. Next, create an App Engine instance by using:
    

```apache
gcloud app create --region=$AE_REGION
```

### Creating a storage bucket

1. First, set the environment variable *CLOUD\_STORAGE\_BUCKET* equal to the name of your *PROJECT\_ID*. (It is generally recommended to name your bucket the same as your *PROJECT\_ID* for convenience purposes):
    

```apache
export CLOUD_STORAGE_BUCKET=${PROJECT_ID}
```

2. Now run the following command to create a bucket with the same name as your *PROJECT\_ID*:
    

```apache
gsutil mb gs://${PROJECT_ID}
```

Click **Check my progress** below to check your lab progress.

Create an App Engine App and Storage Bucket

### Running the Application

1. Execute the following command to start your application:
    

```apache
python main.py
```

2. Once the application starts, click on the Web Preview icon
    
    ![Web preview icon](https://cdn.qwiklabs.com/7b9oXblGsiFuNK7hmDZjFB%2B7Lrwdv5T64bbmo8X9FAo%3D align="left")
    
    in the Cloud Shell toolbar and choose **Preview on port 8080**.
    

A tab in your browser opens and connects to the server you just started. You should see something like this:

![App page](https://cdn.qwiklabs.com/3XEUm%2FJ1jhdalpSARYV57vCM70Cl3hpJ1QZkHqTOfhA%3D align="left")

Now things will get interesting!

3. Click the **Choose File** button, find an image from your computer that has a human face, and then click **Submit**.
    

After uploading a photo, you should see something like this:

![Face Detection Sample page](https://cdn.qwiklabs.com/42S6HnaFnnUPxkY9p7TiBsfsJO15TrON45trEZOxppE%3D align="left")

**Note:** When you are done testing your application locally, press CTRL+C in Cloud Shell to shut down the local web server.

Click **Check my progress** below to check your lab progress.

Run the Application

## Task 4. Exploring the code

### Sample code layout

The sample has the following layout:

```apache
templates/
homepage.html     /* HTML template that uses Jinja2 */
app.yaml          /* App Engine application configuration file */
main.py           /* Python Flask web application */
requirements.txt  /* List of dependencies for the project */
```

### main.py

This Python file is a Flask web application. The application allows users to submit photos (preferably of faces), which are stored in Cloud Storage and analyzed using the face detection feature of the Cloud Vision API. Key information about each photo is stored in Datastore, Google Cloud's NoSQL database, where it is accessed each time a user visits the website.

This application uses the Google Cloud client libraries for Storage, Datastore, and Vision. These client libraries make it easy to access Cloud APIs from your favorite programming languages.

Let's take a look at some key snippets of the code.

The imports section at the top is where we import the various packages we need for our code. This is how we import our Google Cloud client libraries for Datastore, Storage, and Vision:

```apache
from google.cloud import datastore
from google.cloud import storage
from google.cloud import vision
```

### Code that directs what happens when a user visits the root URL of the website

Here is the code for what happens when a user visits the root URL of the website. A Datastore client object is created, which is used to access the Datastore client library. A query on Datastore is run for entities of kind `Faces`. Finally, the HTML template is rendered, passing in the `image_entities` we extract from Datastore as a variable.

```apache
@app.route('/')
def homepage():
    # Create a Cloud Datastore client.
    datastore_client = datastore.Client()

    # Use the Cloud Datastore client to fetch information from Datastore about
    # each photo.
    query = datastore_client.query(kind='Faces')
    image_entities = list(query.fetch())

    # Return a Jinja2 HTML template and pass in image_entities as a parameter.
    return render_template('homepage.html', image_entities=image_entities)
```

Let's take a look at how [entities](https://cloud.google.com/datastore/docs/concepts/entities) are saved to Datastore. Datastore is Google Cloud's NoSQL database solution. Data is stored in objects called *entities*. Each entity is assigned a unique identifying *key*, which can be created using a *kind* and a *key name* string. A *kind* is an organizational bucket for what type of *entity* it is. For example, we might want to set up *kinds* for Photos, People, and Animals.

Each *entity* can have multiple developer-defined *properties*, which can have values of a number of types, including integers, floats, strings, dates, or binary data:

```apache
# Create a Cloud Datastore client.
datastore_client = datastore.Client()

# Fetch the current date / time.

current_datetime = datetime.now()

# The kind for the new entity.

kind = 'Faces'

# The name/ID for the new entity.

name = blob.name

# Create the Cloud Datastore key for the new entity.

key = datastore_client.key(kind, name)

# Construct the new entity using the key. Set dictionary values for entity

# keys blob_name, storage_public_url, timestamp, and joy.

entity = datastore.Entity(key) entity['blob_name'] = blob.name entity['image_public_url'] = blob.public_url entity['timestamp'] = current_datetime entity['joy'] = face_joy

# Save the new entity to Datastore.

datastore_client.put(entity) 
```

The Storage and Vision client libraries can be accessed programmatically in a similar manner to Datastore. You can open the *main.py* file yourself using *vim*, *emacs*, or *nano* to explore all of the sample code.

### homepage.html

The Flask web framework leverages Jinja2 as a template engine. This allows us to pass in variables and expressions from `main.py` into `homepage.html` that get replaced with values once the page is rendered.

Learn more about Jinja2 at [Template Designer Documentation](http://jinja.pocoo.org/docs/2.9/templates).

This Jinja2 HTML template displays a form for users to submit photos to the database. It also displays each previously submitted image along with its file name, upload date/time, and the likelihood that the face detected by the Vision API is happy.

```apache
<h1>Google Cloud Platform - Face Detection Sample</h1>

<p>This Python Flask application demonstrates App Engine Flexible, Google Cloud
Storage, Datastore, and the Cloud Vision API.</p>

<br>

<html>
  <body>
    <form action="upload_photo" method="POST" enctype="multipart/form-data">
      Upload File: <input type="file" name="file"><br>
      <input type="submit" name="submit" value="Submit">
    </form>
    {% for image_entity in image_entities %}
      <img src="{{image_entity['image_public_url']}}" width=200 height=200>
      <p>{{image_entity['blob_name']}} was uploaded {{image_entity['timestamp']}}.</p>
      <p>Joy Likelihood for Face: {{image_entity['joy']}}</p>
    {% endfor %}
  </body>
</html>
```

## Task 5. Deploying the App to App Engine Flexible

App Engine Flexible uses a file called `app.yaml` to describe an application's deployment configuration. If this file is not present, App Engine will try to guess the deployment configuration. However, it is a good idea to provide this file.

1. Next, you will modify `app.yaml` using an editor of your choice *vim*, *nano*, or *emacs*. We will use the `nano` editor:
    

```apache
nano app.yaml
```

2. Once you have `app.yaml` open, replace `<your-cloud-storage-bucket>` with the name of your Cloud Storage bucket. (If you forgot the name of your Cloud Storage bucket, copy the **Project ID** from the lab details panel).
    

The `env_variables` section sets up environment variables that will be used in `main.py` once the application is deployed.

3. Next, set your app to use **manual scaling** by adding this at the end of the file:
    

```apache
manual_scaling:
  instances: 1
```

4. Lastly, ensure the `python_version` is set to 3.12 to deploy your App Engine successfully.
    

Your file should look like this:

```apache
runtime: python
env: flex 
entrypoint: gunicorn -b :$PORT main:app

runtime_config:
    operating_system: "ubuntu22"
    runtime_version: "3.12"

env_variables:
  CLOUD_STORAGE_BUCKET: <your-cloud-storage-bucket>

manual_scaling:
  instances: 1
```

This is the basic configuration needed to deploy a Python 3 App Engine Flex application. You can learn more about configuring App Engine at [Configuring your App with app.yaml Guide](https://cloud.google.com/appengine/docs/flexible/python/configuring-your-app-with-app-yaml).

5. Save and close the file in `nano`:
    

* Press CTRL+X.
    
* At the prompt, type Y and then press ENTER.
    

6. Update your Cloud Build timeout:
    

```apache
gcloud config set app/cloud_build_timeout 1000
```

7. Deploy your app on App Engine by using `gcloud`:
    

```apache
gcloud app deploy
```

If prompted **Do you want to continue (Y/n)**, type Y and then press ENTER.

Watch in Cloud Shell as the application gets built. This will take up to **10** minutes. The App Engine Flexible environment is automatically provisioning a Compute Engine virtual machine for you behind the scenes, and then installing the application, then starting it.

8. After the application is deployed, open the app in your web browser with the following URL:
    

```apache
https://<PROJECT_ID>.appspot.com
```

**Note:** If you forgot your **PROJECT\_ID**, run `gcloud config list project` from Cloud Shell.

Click **Check my progress** below to check your lab progress.

Deploy the App

---

## Solution of Lab

%[https://youtu.be/q_lcJAd-dGI] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Deploying%20a%20Python%20Flask%20Web%20Application%20to%20App%20Engine%20Flexible/techcps023.sh
sudo chmod +x techcps023.sh
./techcps023.sh
```