---
title: "Get Started with TensorFlow on Google Cloud: Challenge Lab"
seoTitle: "Get Started with TensorFlow on Google Cloud: Challenge Lab"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Mar 28 2024 04:30:14 GMT+0000 (Coordinated Universal Time)
cuid: cluaqkpyr000608lf9ruv6qor
slug: get-started-with-tensorflow-on-google-cloud-challenge-lab
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711600139295/c5aeb2fb-02a5-4330-bfda-cab678dd1870.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711600177708/213cc316-2ecc-44be-85bf-c7d71c8fdfc1.png
tags: tensorflow, google-cloud, jupyterlab, vertex-ai, challenge-notebook

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Get Started with TensorFlow on Google Cloud](https://www.cloudskillsboost.google/authoring/course_templates/646) skill badge. Are you ready for the challenge?

### Topics tested:

* Write a script to train a CNN for image classification and saves the trained model to the specified directory.
    
* Run your training script using Vertex AI custom training job.
    
* Deploy your trained model to a Vertex Online Prediction Endpoint for serving predictions.
    
* Request an online prediction and see the response.
    

---

### Task 1. Create a Vertex Notebooks instance

1. Navigate to **Vertex AI** &gt; **Workbench** &gt; **User-Managed Notebooks**.
    
2. Create a Notebook instance. Select **TensorFlow Enterprise 2.11** *Without GPUs.* Name your notebook `cnn-challenge` and leave the default configurations.
    
3. Select region .
    
4. Click **OPEN JUPYTERLAB** next to the name of your pre-provisioned Vertex Notebook instance. It may take a few minutes for the **OPEN JUPYTERLAB** option to appear.
    

### Task 2. Download the Challenge Notebook

> *\# TODO: fill in PROJECT\_ID.*

```apache
if not os.getenv("IS_TESTING"):
    # Get your Google Cloud project ID from gcloud
    PROJECT_ID = "qwiklabs-gcp-01-6ae543337eab"
```

> *\# TODO: Create a globally unique Google Cloud Storage bucket name for artifact storage.*

```apache
BUCKET_NAME = "gs://qwiklabs-gcp-01-6ae543337eab"
```

> *\# TODO: Write the last layer.*

```apache
tf.keras.layers.Dense(10, activation=tf.nn.softmax)
```

### Task 3. Create a training script

> *\# TODO: Save your CNN classifier.*

```apache
model.save(MODEL_DIR)
```

### Task 4. Train the model

> *\# TODO: fill in the remaining arguments for the CustomTrainingJob function.*

```apache
job = aiplatform.CustomTrainingJob(
    display_name=JOB_NAME,
    requirements=["tensorflow_datasets==4.6.0"],
    # TODO: fill in the remaining arguments for the CustomTrainingJob function.
    container_uri=TRAIN_IMAGE,
    script_path="task.py",
    model_serving_container_image_uri=DEPLOY_IMAGE,
)
```

### Task 5. Deploy the model to a Vertex Online Prediction Endpoint

> *\# TODO: fill in the remaining arguments to run the custom training job function.*

```apache
model = job.run(
    model_display_name=MODEL_DISPLAY_NAME,
    replica_count=1,
    accelerator_count=0,
    # TODO: fill in the remaining arguments to run the custom training job function.
    args=CMDARGS,
    machine_type="n1-standard-4",
)
```

> *\# TODO: fill in the remaining arguments to deploy the model to an endpoint.*

```apache
endpoint = model.deploy(
        deployed_model_display_name=DEPLOYED_NAME,
        accelerator_type=None,
        accelerator_count=0,
        # TODO: fill in the remaining arguments to deploy the model to an endpoint.
        min_replica_count=MIN_NODES,
        max_replica_count=MAX_NODES
    )
```

### Task 6. Query deployed model on Vertex Online Prediction Endpoint

> *\# TODO: use your Endpoint to return prediction for your x\_test.*

```apache
predictions = endpoint.predict(instances=x_test.tolist())
```