---
title: "Classify Images with TensorFlow on Google Cloud: Challenge Lab - GSP398"
seoTitle: "Classify Images with TensorFlow on Google Cloud: Challenge Lab - GSP39"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sat Aug 17 2024 07:44:47 GMT+0000 (Coordinated Universal Time)
cuid: clzxu1veo000e09la5lu13cx5
slug: classify-images-with-tensorflow-on-google-cloud-challenge-lab-gsp398
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758964836133/b40233b6-3054-4530-a507-921e7e98b220.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723880674696/1735beab-732d-4781-8983-8cb90d7c359b.png
tags: classify-images-with-tensorflow-on-google-cloud-challenge-lab-gsp398

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Get Started with TensorFlow on Google Cloud](https://www.cloudskillsboost.google/authoring/course_templates/646) skill badge course. Are you ready for the challenge?

### Topics tested:

* Write a script to train a CNN for image classification and saves the trained model to the specified directory.
    
* Run your training script using Vertex AI custom training job.
    
* Deploy your trained model to a Vertex Online Prediction Endpoint for serving predictions.
    
* Request an online prediction and see the response.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-bfede1434629@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    EA654l3afWkG
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-0543c0e8f6e3`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-0543c0e8f6e3
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-bfede1434629@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-0543c0e8f6e3
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Enable Google Cloud services**

1. In Cloud Shell, use `gcloud` to enable the services used in the lab
    

```apache
gcloud services enable \
  compute.googleapis.com \
  monitoring.googleapis.com \
  logging.googleapis.com \
  notebooks.googleapis.com \
  aiplatform.googleapis.com \
  artifactregistry.googleapis.com \
  container.googleapis.com
```

This will allow access to running model training, deployment, and explanation jobs with Vertex AI.

Click *Check my progress* to verify the objective.

Enable Google Cloud services

**Check my progress**

## **Challenge scenario**

You were recently hired as a Machine Learning Engineer for an Optical Character Recognition app development team. Your manager has tasked you with building a machine learning model to recognize Hiragana alphabets. The challenge: your business requirements are that you have just 6 weeks to produce a model that achieves greater than 90% accuracy to improve upon an existing bootstrapped solution. Furthermore, after doing some exploratory analysis in your startup's data warehouse, you found that you only have a small dataset of 60k images of alphabets to build a higher-performing solution.

To build and deploy a high-performance machine learning model with limited data quickly, you will walk through training and deploying a CNN classifier for online predictions on Google Cloud's [Vertex AI](https://cloud.google.com/vertex-ai) platform. Vertex AI is Google Cloud's next-generation machine learning development platform where you can leverage the latest ML pre-built components to significantly enhance your development productivity, scale your workflow and decision-making with your data, and accelerate time to value.

![cnn-challenge-lab.png](https://cdn.qwiklabs.com/k7p%2Fk2KrhhOda7fgEYMx1w6azluVwnuP%2FtYBLZ0qfSs%3D align="left")

First, you will progress through a typical experimentation workflow where you will write a script that trains your custom CNN model using `tf.keras` classification layers. You will then send the model code to a custom training job and run the custom training job using pre-built Docker containers provided by Vertex AI to run training and prediction. Lastly, you will deploy the model to an endpoint so that you can use your model for predictions.

## **Task 1. Create a Vertex Notebooks instance**

1. Navigate to **Vertex AI** &gt; **Workbench** &gt; **User-Managed Notebooks**.
    
2. Create a Notebook instance. Select **TensorFlow Enterprise 2.11** *Without GPUs.* Name your notebook `cnn-challenge` and leave the default configurations.
    
3. Select region `us-east1` and for zone `us-east1-c`.
    
4. Click **OPEN JUPYTERLAB** next to the name of your pre-provisioned Vertex Notebook instance. It may take a few minutes for the **OPEN JUPYTERLAB** option to appear.
    

Click *Check my progress* to verify the objective.

Create the vertex AI notebook instance

**Check my progress**

## **Task 2. Download the Challenge Notebook**

1. In your notebook, click the **terminal**.
    
2. Clone the repo:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

Click *Check my progress* to verify the objective.

Download the challenge Notebook

**Check my progress**

3. Go to the enclosing folder: `training-data-analyst/self-paced-labs/learning-tensorflow/cnn-challenge-lab/`.
    
4. Open the notebook file `cnn-challenge-lab.ipynb`.
    
5. In the **Setup** section, define your `PROJECT_ID` and `GCS_BUCKET` variables.
    

Click *Check my progress* to verify the objective.

Create a Cloud Storage Bucket

**Check my progress**

## **Task 3. Create a training script**

In this section, you will complete the training script `task.py` using TensorFlow.

### Write a TensorFlow CNN classifier

1. Fill out the `#TODO` section to add the last layer for the model creation.
    
2. Fill out the `#TODO` section to save your model. You should save it to the AIP\_MODEL\_DIR environment variable.
    

Click *Check my progress* to verify the objective.

Create training script

**Check my progress**

## **Task 4. Train the model**

### Define custom training job on Vertex AI

1. Fill out the `#TODO` section to create a custom training job on vertex ai. You can find the documentation [here](https://googleapis.dev/python/aiplatform/latest/aiplatform.html?highlight=customtraining#google.cloud.aiplatform.CustomTrainingJob).
    

**Hint:** Make sure that you specify the `script_path`, `container_uri`, and `model_serving_container_image_uri` parameters.

### Train the model using Vertex AI pipelines

1. Fill out the `#TODO` section and run the custom training job function you defined above. You can find the documentation [here](https://googleapis.dev/python/aiplatform/latest/aiplatform.html?highlight=customtraining#google.cloud.aiplatform.CustomTrainingJob.run).
    

**Hint:** Make sure that you specify the `args` and `machine_type` parameters.

**Note**: It can take around 8-10 minutes to train the model.

Click *Check my progress* to verify the objective.

Train the Model on Vertex AI

**Check my progress**

## **Task 5. Deploy the model to a Vertex Online Prediction Endpoint**

1. Fill out the `#TODO` section deploy the model to an endpoint. You can find the documentation [here](https://googleapis.dev/python/aiplatform/latest/aiplatform.html?highlight=customtraining#google.cloud.aiplatform.Model.deploy).
    

**Hint:** Make sure that you specify the `traffic_split`, `machine_type`, `min_replica_count` and `max_replica_count` parameters.

**Note**: It can take around 10-15 minutes to deploy the model.

Click *Check my progress* to verify the objective.

Deploy the model

**Check my progress**

## **Task 6. Query deployed model on Vertex Online Prediction Endpoint**

1. Fill out the `#TODO` section to generate online predictions using your Vertex Endpoint. You can find the documentation [here](https://googleapis.dev/python/aiplatform/latest/aiplatform.html?highlight=customtraining#google.cloud.aiplatform.Endpoint.predict).
    

---

## Solution of Lab

### Quick

%[https://youtu.be/UB5Zz8qQqOk] 

**Task 1:**

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP398/task1.sh
source task1.sh
```

**Task 2: Open** [Vetex AI -&gt; Workbench](https://console.cloud.google.com/vertex-ai/workbench)

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP398/lab.sh
source lab.sh
```

---

### Manual

```apache
gcloud services enable \
  compute.googleapis.com \
  monitoring.googleapis.com \
  logging.googleapis.com \
  notebooks.googleapis.com \
  aiplatform.googleapis.com \
  artifactregistry.googleapis.com \
  container.googleapis.com
```

**Task 1. Create a Vertex Notebooks instance**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723876761907/aef4133a-1f37-4b03-a8ae-36d8c4390cdf.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723876841826/4475d93f-99bd-4b4b-b593-747fcd74bdfd.png align="center")

**Task 2. Download the Challenge Notebook**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723876948334/8e04959f-99c6-462b-b885-dcacbbfa97da.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723877006235/b11648f0-582e-4186-ba50-e2bf3f135b39.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723877096417/03c9ecec-ee7c-48a6-a5b2-fc17d353248d.png align="center")

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723877438623/2aadac7b-cc2d-4912-b8a6-1c6bcb7362fb.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723877476034/33e3044d-a307-4218-bcac-cacdaa705364.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723877489529/5761f367-6e39-4709-bb02-db39d77fd772.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723878012389/8ab298fe-eec5-4682-995c-05b234aaf010.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723878489533/c46b8fb1-a70a-4896-a360-45c17f016a88.png align="center")

```apache
job = aiplatform.CustomTrainingJob(
    display_name=JOB_NAME,
    requirements=["tensorflow_datasets==4.6.0"],
    # TODO: fill in the remaining arguments for the CustomTrainingJob function.
    script_path="task.py",
    container_uri=TRAIN_IMAGE,
    model_serving_container_image_uri=DEPLOY_IMAGE,
)

MODEL_DISPLAY_NAME = "kmnist-" + TIMESTAMP

# Start the training
model = job.run(
    model_display_name=MODEL_DISPLAY_NAME,
    replica_count=1,
    accelerator_count=0,
    # TODO: fill in the remaining arguments to run the custom training job function.
    args=CMDARGS,
    machine_type=TRAIN_COMPUTE,
)
```

---

### Run the following Commands in CloudShell

%[https://www.youtube.com/watch?v=bbKUgdaADIs] 

```apache
export ZONE=
```

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Classify%20Images%20with%20TensorFlow%20on%20Google%20Cloud%20Challenge%20Lab/gsp398.sh
sudo chmod +x gsp398.sh
./gsp398.sh
```

* Go to `User-managed Notebooks` from [here](https://console.cloud.google.com/vertex-ai/workbench/user-managed?)
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

* Download `Jupyter` file from [here](https://github.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/blob/main/Classify%20Images%20with%20TensorFlow%20on%20Google%20Cloud%20Challenge%20Lab/cnn_challenge_lab.ipynb)
    

**Congratulations 🎉 for completing the Lab !**