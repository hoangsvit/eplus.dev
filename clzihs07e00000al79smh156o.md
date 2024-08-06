---
title: "Web Security Scanner: Qwik Start - GSP112"
seoTitle: "Web Security Scanner: Qwik Start - GSP112"
seoDescription: "The Web Security Scanner, one of Security Command Center's built-in services, identifies security vulnerabilities in your Google App Engine, Google Kubernet"
datePublished: Tue Aug 06 2024 14:04:39 GMT+0000 (Coordinated Universal Time)
cuid: clzihs07e00000al79smh156o
slug: web-security-scanner-qwik-start-gsp112
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722953054717/b6b14557-172c-4fbd-ae94-fcc1f7302cbe.png
tags: web-security-scanner-qwik-start-gsp112, gsp112

---

## **Overview**

The Web Security Scanner, one of [Security Command Center's built-in services, identifies sec](https://cloud.google.com/security-command-center)urity vulnerabilities in your Google App Engine, Google Kubernetes Engine (GKE), and Compute Engine web applications. It crawls your application, following all links within the scope of your starting URLs, and attempts to exercise as many user inputs and event handlers as possible.

The scanner is designed to complement your existing secure design a[nd development processes.](https://cloud.google.com/security-command-center) To avoid distracting developers with false positives, the scanner errs on the side of under reporting and will not display low confidence alerts. It does not replace a manual security review, and it does not guarantee that your application is free from security flaws.

### **Task 1. Before you begin, you need an app to scan**

In this lab, you will deploy a sample Hello World application to run Security Scanner on.

1. Run the following command in Cloud Shell to clone the [Hello World sample app repository](https://github.com/GoogleCloudPlatform/python-docs-samples/tree/main/appengine/standard_python3/hello_world):
    

```apache
gsutil -m cp -r gs://spls/gsp067/python-docs-samples .
```

2. Then go to the directory that contains the sample code:
    

```apache
cd python-docs-samples/appengine/standard_python3/hello_world
```

3. Change the python version with the sed command.
    

```apache
sed -i "s/python37/python39/g" app.yaml
```

4. Run the below command and add `itsdangerous==2.0.1`, `Jinja2==3.0.3` and `werkzeug==2.0.1` in the *requirements.txt* file:
    

```apache
nano requirements.txt
```

so that the file looks like:

```apache
Flask==1.1.2
itsdangerous==2.0.1
Jinja2==3.0.3
werkzeug==2.0.1
```

5. Save the file (press **Ctrl+O** then **Enter**) and exit nano (press **Ctrl+X**).
    

**Note:** The package `itsdangerous==2.0.1` is added in *requirements.txt* file to safely pass data to untrusted environments and get it back safe.

### **Task 2. Test app**

1. Installing Prerequisites Python environment.
    

```apache
sudo apt install python3.11-venv -y
python3 -m venv create myvenv
source myvenv/bin/activate
```

2. From within the `hello_world` directory where the app's [app.yaml](https://cloud.google.com/appengine/docs/standard/python/config/appref) configuration file is located, start the local development server with the following command:
    

```apache
dev_appserver.py app.yaml
```

3. The local development server is now running and listening for requests on port 8080. Click on the **web preview** button in Cloud Shell, and select **Preview on port 8080** to see it:
    

![Expanded Web preview menu with the Preview on port 8080 option highlighted](https://cdn.qwiklabs.com/a6YnJv8GlGae4rnJIbjA27J8c7YApa%2B6noPFkkKxZjk%3D align="left")

**Note:** If you cannot see the web preview icon, close the Navigation menu, top left corner.

4. Press **Ctrl+c** to stop the local app and return to the command line.
    

### **Task 3. Deploy app**

In this lab use `us-west4` as the App Engine region.

1. Deploy your app to App Engine by running the following command from within the root directory of your application (`hello_world`):
    

```apache
gcloud app deploy
```

2. You'll be asked to select a region. Choose the number for one that is near where you are.
    
3. After the app is created in your lab, you'll be asked if you want to continue. Click **Y** to continue.
    

Deployment of your app will then begin.

**Note:** If you get Timed out error re-run the command.

### **Task 4. View app**

* To launch the app in your browser, run the following command:
    

```apache
gcloud app browse
```

There will be a link in Cloud Shell that you can use, or view the app at `http://[YOUR_PROJECT_ID].uc.r.appspot.com`. This is the URL you'll scan for vulnerabilities and it will be added to your scan parameters in the next step.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted with an assessment score.

Deploy sample App Engine application.

**Check my progress**

### **Task 5. Run the scan**

The scan does not run immediately, but is queued for later execution; it can take hours before the scan executes, depending on current load. For more information about these form settings, refer to [Using Web Security Scanner](https://cloud.google.com/security-command-center/docs/how-to-use-web-security-scanner).

1. Go to **Navigation menu** &gt; **APIs & Services** &gt; **Library**.
    
2. In Search for APIs & Services type **Web Security Scanner**.
    
3. Select the **Web Security Scanner API** then Click **Enable** to enable the API.
    
4. From the **Navigation menu** select **Security** &gt; **Web Security Scanner**.
    
5. Click **New Scan**.
    
6. Under `Starting URL 1`, enter the URL of the application you want to scan.
    
7. Click **Save** to create the scan.
    
8. Click **Run** to start scanning:
    

![Web Security Scanner page displaying the RUN button](https://cdn.qwiklabs.com/AwL1CPxb2iVDvYHXXrKR5L8DLFsFwkSyl82dodGyzPI%3D align="left")

The scan will be queued, and you can watch the status bar progress as it scans. The scan overview page displays a results section when the scan completes. The following image shows example scan results when no vulnerabilities are detected:

![Results tab displaying message that the scan discovered an unexpectedly low number of URLs](https://cdn.qwiklabs.com/clvVFZu8WRja0na3YlxfeZdj5Cnnpc%2BwyT2OkaCn4Cw%3D align="left")

**Note:** It will take 4-5 minutes for the scan to complete. Try refreshing the page if you aren't seeing any updates.

Nice job! You just completed a scan using Web Security Scanner. You will see a warning to let you know that only scanning 1 URL isn't ideal. This lab is just to demonstrate a simple example. Your production environment will have plenty of URLs to scan.

### **Task 6. Test your understanding**

Below is a multiple-choice question to reinforce your understanding of this lab's concepts. Answer it to the best of your abilities.

Web Security Scanner scans for common vulnerabilities in Google App Engine applications.True False

---

### Solution of Lab

%[https://youtu.be/id9QxtE-8Yc] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722953007400/ab32b5fa-97a8-42cf-a811-2bdb9bf0b821.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Web%20Security%20Scanner%20Qwik%20Start/quicklabgsp112.sh
sudo chmod +x quicklabgsp112.sh
./quicklabgsp112.sh
```