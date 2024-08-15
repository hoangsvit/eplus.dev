---
title: "Connecting Cloud Functions"
seoTitle: "Connecting Cloud Functions
"
seoDescription: "Cloud Functions let you connect directly to your VPC network enabling your functions to access Compute Engine VM instances, Memorystore instances, and other"
datePublished: Thu Aug 15 2024 04:09:59 GMT+0000 (Coordinated Universal Time)
cuid: clzurhxn8000c09la19d5a8v4
slug: connecting-cloud-functions
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723694619380/65ec499b-2256-4844-85cd-7d3a963452aa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723694973819/e65aa3f1-5f74-4507-ad7e-5553b54a04e2.png
tags: the-arcade-base-camp-august-2024, connecting-cloud-functions

---

## **Overview**

Cloud Functions let you connect directly to your VPC network enabling your functions to access Compute Engine VM instances, Memorystore instances, and other resources with an internal IP address.

In this lab, you will use Serverless VPC Access to connect a function to your VPC network and access data in a Memorystore instance running in your network. You will also use the connector to access a web server running on a VM instance in your network.

## **Objectives**

In this lab, you will:

* Set up a Memorystore for Redis instance.
    
* Create a Serverless VPC Access Connector to enable Serverless VPC Access.
    
* Write a Pub/Sub event-driven function that uses the connector to store the message content in the Redis database.
    
* Write an HTTP function to fetch data from the Redis database using the connector, and return the message data in an HTTP response.
    
* Write an HTTP function to access a web server running on a VM instance in your VPC network.
    

Here's a high-level overview of the resources that you create in this lab:

![components_architecture](https://cdn.qwiklabs.com/TTXzZTMDcqga7qy7%2BwfezE0LrAs6W6g6QfVQDPHJUtE%3D align="left")

## **Setup and requirements**

#### **Before you click the Start Lab button**

**Note: Read these instructions.**

Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This Qwiklabs hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

#### **What you need**

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time to complete the lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab.

**Note:** If you are using a Pixelbook, open an Incognito window to run this lab.

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

## **Task 1. Enable APIs**

Before you create Cloud Functions, you must enable the relevant APIs.

1. To set your `Project ID` and `Region` environment variables, activate Cloud Shell, and then run the following commands:
    
    ```apache
     PROJECT_ID=$(gcloud config get-value project)
     REGION=us-west1
    ```
    
2. Run the following command to enable all necessary services:
    
    ```apache
    gcloud services enable \
      artifactregistry.googleapis.com \
      cloudfunctions.googleapis.com \
      cloudbuild.googleapis.com \
      eventarc.googleapis.com \
      run.googleapis.com \
      logging.googleapis.com \
      pubsub.googleapis.com \
      redis.googleapis.com \
      vpcaccess.googleapis.com
    ```
    

## **Task 2. Set up a Memorystore for Redis instance**

Memorystore is a Google Cloud service that provides a fully managed, highly available, scalable, and secure in-memory cache solution for Redis and Memcached.

In this task, you set up a Memorystore for Redis instance in your Google Cloud project. This instance is used by the Cloud Function to store data which you will develop in a later task of the lab.

### Create the Memorystore instance

1. Set an environment variable for the Memorystore instance name:
    
    ```apache
    REDIS_INSTANCE=customerdb
    ```
    
2. To create a 2GiB Memorystore for Redis instance, run the following command:
    
    ```apache
    gcloud redis instances create $REDIS_INSTANCE \
     --size=2 --region=$REGION \
     --redis-version=redis_6_x
    ```
    
    It will take a few minutes to create the Memorystore for Redis instance. You can proceed and complete Task 3 to set up Serverless VPC Access, and then return to complete the remaining steps in this task after the Redis instance is created.
    
3. To view the instance details after it is successfully created, run the following command:
    
    ```apache
    gcloud redis instances describe $REDIS_INSTANCE --region=$REGION
    ```
    

### Create environment variables

1. Save the host IP address of Memorystore instance in an environment variable
    
    ```apache
    REDIS_IP=$(gcloud redis instances describe $REDIS_INSTANCE --region=$REGION --format="value(host)"); echo $REDIS_IP
    ```
    
2. Save the port of the Memorystore instance in an environment variable:
    
    ```apache
    REDIS_PORT=$(gcloud redis instances describe $REDIS_INSTANCE --region=$REGION --format="value(port)"); echo $REDIS_PORT
    ```
    
    You'll use the host and port values in a subsequent task to connect to the instance.
    

Click **Check my progress** to verify the objective.

Set up a Memorystore for Redis instance

**Check my progress**

## **Task 3. Set up Serverless VPC Access**

To send requests from Cloud Functions to resources in your VPC network and receive the corresponding responses without using the public internet, you must set up Serverless VPC Access.

### Set up a Serverless VPC Access connector

1. In the Google Cloud console **Navigation menu** (), under **Networking**, click **VPC network**, and then select **Serverless VPC access**.
    
2. To create a Serverless VPC Access connector, click **Create Connector**.
    
3. For the connector **Name**, type **test-connector**
    
4. For **Region**, select `us-west1`
    
5. For **Subnet**, select **Custom IP range**.
    
6. For the **IP range**, type **10.8.0.0**
    
    **Note:** The IP range must be an unreserved internal /28 subnet specified in CIDR notation. This IP range must not overlap with any existing IP address reservations in your VPC network. This IP address range is used when scaling to create additional connector instances.
    
    The Region specified for the connector must be the same region where your Cloud Functions are hosted.
    
7. Leave the other settings as their defaults, and Click **Create**.
    
    A green check mark will appear next to the connector's name when it's ready to use.
    
8. To verify the connector details, in Cloud Shell, run the following command:
    
    ```apache
    gcloud compute networks vpc-access connectors \
      describe test-connector \
      --region $REGION
    ```
    

Click **Check my progress** to verify the objective.

Create a Serverless VPC Access connector

**Check my progress**

If you skipped ahead to complete this task while the Redis instance is being created, go back to complete the remaining steps in Task 2.

## **Task 4. Create an event-driven function for Pub/Sub**

Now that the Serverless VPC Access connector is created, you can develop a function to access data in the Memorystore Redis instance using the connector.

In this task, you create a Pub/Sub event-driven function in Python to store and fetch data to and from the Memorystore instance.

### Create a Pub/Sub topic

1. You must first create a topic that the function will listen for messages. Set an environment variable for the topic name:
    
    ```apache
    TOPIC=add_redis
    ```
    
2. To create a topic, run the following command:
    
    ```apache
    gcloud pubsub topics create $TOPIC
    ```
    

### Write the function code

1. Run the following command to create the folder and files for the function and navigate to the folder:
    
    ```apache
    mkdir ~/redis-pubsub && cd $_
    touch main.py && touch requirements.txt
    ```
    
2. Click the **Open Editor** button on the toolbar of Cloud Shell. (You can switch between Cloud Shell and the code editor by using the **Open Editor** and **Open Terminal** icons as required).
    
3. In the Cloud Shell Editor, select the `redis-pubsub` folder.
    
4. In the Editor, add the following code to the `redis-pubsub/main.py` file:
    
    ```apache
    import os
    import base64
    import json
    import redis
    import functions_framework
    
    redis_host = os.environ.get('REDISHOST', 'localhost')
    redis_port = int(os.environ.get('REDISPORT', 6379))
    redis_client = redis.StrictRedis(host=redis_host, port=redis_port)
    
    # Triggered from a message on a Pub/Sub topic.
    @functions_framework.cloud_event
    def addToRedis(cloud_event):
        # The Pub/Sub message data is stored as a base64-encoded string in the cloud_event.data property
        # The expected value should be a JSON string.
        json_data_str = base64.b64decode(cloud_event.data["message"]["data"]).decode()
        json_payload = json.loads(json_data_str)
        response_data = ""
        if json_payload and 'id' in json_payload:
            id = json_payload['id']
            data = redis_client.set(id, json_data_str)
            response_data = redis_client.get(id)
            print(f"Added data to Redis: {response_data}")
        else:
            print("Message is invalid, or missing an 'id' attribute")
    ```
    
5. To specify the function code dependencies, add the following content to the `redis-pubsub/requirements.txt` file.
    
    ```apache
    functions-framework==3.2.0
    redis==4.3.4
    ```
    

### Deploy and test the function

1. To deploy the function, in Cloud Shell, run the following command:
    
    ```apache
    gcloud functions deploy python-pubsub-function \
     --runtime=python310 \
     --region=$REGION \
     --source=. \
     --entry-point=addToRedis \
     --trigger-topic=$TOPIC \
     --vpc-connector projects/$PROJECT_ID/locations/$REGION/connectors/test-connector \
     --set-env-vars REDISHOST=$REDIS_IP,REDISPORT=$REDIS_PORT
    ```
    
    The function is deployed with a Pub/Sub trigger topic, the Serverless VPC Access connector, and environment variables that provide the function with the host IP address and port of the Memorystore Redis instance.
    
    **Note:** If you see a permissions error, please wait a few minutes, and try the deployment again.
    
2. To test the function, publish a message to the topic:
    
    ```apache
    gcloud pubsub topics publish $TOPIC --message='{"id": 1234, "firstName": "Lucas" ,"lastName": "Sherman", "Phone": "555-555-5555"}'
    ```
    

### View the function logs

1. In Google Cloud console, navigate to the Cloud Functions overview page, and click the `python-pubsub-function` name.
    
2. Click **Logs**.
    
3. Verify the log entry that indicates that the JSON data payload sent in the Pub/Sub message is added to Redis.
    
    ![Log entry added to Redis](https://cdn.qwiklabs.com/yItOT987h6cayTRrsI2%2F5EzGIIoWokuDpxmUVMo%2BcLQ%3D align="left")
    

Click **Check my progress** to verify the objective.

Create an event-driven function for Pub/Sub

**Check my progress**

## **Task 5. Create an HTTP function**

In this task, you create an HTTP function in Python to query the Memorystore for Redis instance and return data based on an identifier that is passed in the request.

### Write the function code

1. Run the following command to create a folder and files for the HTTP function and navigate to the folder:
    
    ```apache
    mkdir ~/redis-http && cd $_
    touch main.py && touch requirements.txt
    ```
    
2. In the Cloud Shell toolbar, click **Open Editor**.
    
3. In the Cloud Shell Editor, select the `redis-http` folder.
    
4. In the editor, add the following code to the `redis-http/main.py` file:
    
    ```python
    import os
    import redis
    from flask import request
    import functions_framework
    
    redis_host = os.environ.get('REDISHOST', 'localhost')
    redis_port = int(os.environ.get('REDISPORT', 6379))
    redis_client = redis.StrictRedis(host=redis_host, port=redis_port)
    
    @functions_framework.http
    def getFromRedis(request):
        response_data = ""
        if request.method == 'GET':
            id = request.args.get('id')
            try:
                response_data = redis_client.get(id)
            except RuntimeError:
                response_data = ""
            if response_data is None:
                response_data = ""
        return response_data
    ```
    
5. To specify the function code dependencies, add the following lines to the `redis-http/requirements.txt` file:
    
    ```apache
    functions-framework==3.2.0
    redis==4.3.4
    ```
    
    It's a good idea to separate your function's dependencies for each function so that only modules needed for your function are loaded at function instance startup time. This reduces function latency during cold starts.
    

### Deploy and test the function

1. To deploy the function, in Cloud Shell, run the following command:
    
    ```apache
    gcloud functions deploy http-get-redis \
    --gen2 \
    --runtime python310 \
    --entry-point getFromRedis \
    --source . \
    --region $REGION \
    --trigger-http \
    --timeout 600s \
    --max-instances 1 \
    --vpc-connector projects/$PROJECT_ID/locations/$REGION/connectors/test-connector \
    --set-env-vars REDISHOST=$REDIS_IP,REDISPORT=$REDIS_PORT \
    --no-allow-unauthenticated
    ```
    
    **Note:** If you see a permissions error, please wait a few minutes, and try the deployment again.
    
2. After the function is deployed, retrieve the HTTP URI of the function and store it in an environment variable:
    
    ```apache
    FUNCTION_URI=$(gcloud functions describe http-get-redis --gen2 --region $REGION --format "value(serviceConfig.uri)"); echo $FUNCTION_URI
    ```
    
3. To test the function, run the following `curl` command:
    
    ```apache
    curl -H "Authorization: bearer $(gcloud auth print-identity-token)" "${FUNCTION_URI}?id=1234"
    ```
    
    **Note:** Pass the same *id* parameter value that was used when testing the Pub/Sub function trigger in the previous task.
    
4. Verify that the response from the HTTP function matches the JSON data that was previously stored in the Redis instance:
    
    ```json
    {"id": 1234, "firstName": "Lucas" ,"lastName": "Sherman", "Phone": "555-555-5555"}
    ```
    

Click **Check my progress** to verify the objective.

Create a HTTP function to connect to Redis

**Check my progress**

## **Task 6. Connect to a VM instance from an HTTP function**

Connecting to resources in your VPC network from Cloud Functions requires the use of a Serverless VPC Access connector. In this task, you create a VM, and an HTTP function to connect to the VM instance.

### Create a VM startup script

1. Before creating a VM, in Cloud Shell, download a startup script that installs and runs a simple web server:
    
    ```apache
    gcloud storage cp gs://cloud-training/CBL492/startup.sh .
    ```
    
2. To view the contents of the VM startup script, run:
    
    ```apache
    cat startup.sh
    ```
    

### Create a VM

1. Set an environment variable for the zone in which the VM will be created:
    
    ```apache
     ZONE=us-west1-c
    ```
    
2. To create a VM with the startup script, run the following command:
    
    ```apache
    gcloud compute instances create webserver-vm \
    --image-project=debian-cloud \
    --image-family=debian-11 \
    --metadata-from-file=startup-script=./startup.sh \
    --machine-type e2-standard-2 \
    --tags=http-server \
    --scopes=https://www.googleapis.com/auth/cloud-platform \
    --zone $ZONE
    ```
    
3. Add a firewall rule to the VPC network to enable HTTP traffic to reach the VM:
    
    ```apache
    gcloud compute --project=$PROJECT_ID \
     firewall-rules create default-allow-http \
     --direction=INGRESS \
     --priority=1000 \
     --network=default \
     --action=ALLOW \
     --rules=tcp:80 \
     --source-ranges=0.0.0.0/0 \
     --target-tags=http-server
    ```
    
4. To verify that the VM is created and running, in Google Cloud console, navigate to **Compute Engine**, and click **VM instances**.
    
    There should be one VM listed with a green check to indicate that it is running:
    
    ![verify VM is created](https://cdn.qwiklabs.com/JIzeanYc3%2FDECFgouFHhP4CjQUnF4HPjVRnR7%2FBx9MA%3D align="left")
    
5. Save the internal and external IP addresses of the VM in environment variables. These variables will be used later when testing the function.
    
    ```apache
    VM_INT_IP=$(gcloud compute instances describe webserver-vm --format='get(networkInterfaces[0].networkIP)' --zone $ZONE); echo $VM_INT_IP
    ```
    
    ```apache
    VM_EXT_IP=$(gcloud compute instances describe webserver-vm --format='get(networkInterfaces[0].accessConfigs[0].natIP)' --zone $ZONE); echo $VM_EXT_IP
    ```
    

### Write the function code

In this subtask, you write the HTTP function which when triggered connects to the VM that you created.

1. Run the following command to create a folder and files for the HTTP function code and navigate to the folder:
    
    ```apache
    mkdir ~/vm-http && cd $_
    touch main.py && touch requirements.txt
    ```
    
2. In the Cloud Shell toolbar, click **Open Editor**.
    
3. In the Cloud Shell Editor, select the `vm-http` folder.
    
4. In the editor, add the following code to the `vm-http/main.py` file:
    
    ```python
    import functions_framework
    import requests
    
    @functions_framework.http
    def connectVM(request):
        resp_text = ""
        if request.method == 'GET':
            ip = request.args.get('ip')
            try:
                response_data = requests.get(f"http://{ip}")
                resp_text = response_data.text
            except RuntimeError:
                print ("Error while connecting to VM")
        return resp_text
    ```
    
    The function makes a GET HTTP request to the web server running on the VM. The web server's endpoint IP address is passed to the function as a query parameter in the function URL.
    
5. In the editor, add the following to the `vm-http/requirements.txt` file:
    
    ```apache
    functions-framework==3.2.0
    Werkzeug==2.3.7
    flask==2.1.3
    requests==2.28.1
    ```
    

### Deploy the function

1. To deploy the function, in Cloud Shell, run the following command:
    
    ```apache
    gcloud functions deploy vm-connector \
     --runtime python310 \
     --entry-point connectVM \
     --source . \
     --region $REGION \
     --trigger-http \
     --timeout 10s \
     --max-instances 1 \
     --no-allow-unauthenticated
    ```
    
2. After the function is deployed successfully, to extract the function's HTTP URL, run the following command:
    
    ```apache
    FUNCTION_URI=$(gcloud functions describe vm-connector --region $REGION --format='value(httpsTrigger.url)'); echo $FUNCTION_URI
    ```
    

### Test the function

1. Test the function by providing the VM's external IP address in the function URL:
    
    ```apache
    curl -H "Authorization: bearer $(gcloud auth print-identity-token)" "${FUNCTION_URI}?ip=$VM_EXT_IP"
    ```
    
    The command should return the HTML response from the web server running on the VM:
    
    ```xml
    <html><body><p>Linux startup script from a local file.</p></body></html>
    ```
    
    By default, Cloud Functions can access public external IPs or URLs. You can change this behavior by modifying the function's egress settings to route traffic from your function through your VPC network using a connector.
    
2. Repeat the test, providing the VM's internal IP address to the function URL:
    
    ```apache
    curl -H "Authorization: bearer $(gcloud auth print-identity-token)" "${FUNCTION_URI}?ip=$VM_INT_IP"
    ```
    
    The function times out after approximately 10 seconds since by default your function cannot access the VM on its internal IP address.
    
    An error is reported:
    
    ```apache
    upstream request timeout
    ```
    

### Use the VPC connector

To access the VM or other internal resources in your VPC network from your function, you must use a Serverless VPC Access connector.

1. Re-enable the Cloud Function API:
    
    ```apache
    gcloud services disable cloudfunctions.googleapis.com
    ```
    
    ```apache
    gcloud services enable cloudfunctions.googleapis.com
    ```
    
2. Redeploy the HTTP function setting the VPC connector that you created earlier in this lab:
    
    ```apache
    gcloud functions deploy vm-connector \
     --runtime python310 \
     --entry-point connectVM \
     --source . \
     --region $REGION \
     --trigger-http \
     --timeout 10s \
     --max-instances 1 \
     --no-allow-unauthenticated \
     --vpc-connector projects/$PROJECT_ID/locations/$REGION/connectors/test-connector
    ```
    
    **Note:** If you see a permissions error, please wait a few minutes, and try the deployment again.
    
3. After the function is redeployed, test the internal connection to the VM:
    
    ```apache
    curl -H "Authorization: bearer $(gcloud auth print-identity-token)" "${FUNCTION_URI}?ip=$VM_INT_IP"
    ```
    
    The function now returns the HTML response from the web server running on the VM:
    
    ```apache
    <html><body><p>Linux startup script from a local file.</p></body></html>
    ```
    

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=81WdGTslfU8] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723694941024/807fe1c8-c98f-4d11-85b1-61d5d97eac07.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Connecting%20Cloud%20Functions/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```