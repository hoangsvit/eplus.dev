---
title: "Stream Processing with Cloud Pub/Sub and Dataflow: Qwik Start - GSP903"
seoTitle: "Stream Processing with Cloud Pub/Sub and Dataflow: Qwik Start - GSP903"
seoDescription: "Learn Google Cloud Pub/Sub and Dataflow for stream processing: read, group, write messages to Cloud Storage with this guide"
datePublished: Thu Aug 21 2025 07:19:06 GMT+0000 (Coordinated Universal Time)
cuid: cmel2m6ou000u02jx5h0x6asj
slug: stream-processing-with-cloud-pubsub-and-dataflow-qwik-start-gsp903
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755760691029/babb5e58-ea74-41e5-9244-7fa2aee24dbf.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755760708551/97802424-49f5-4c4a-a26e-3773df74981f.png
tags: pubsub, dataflow, stream-processing-with-cloud-pubsub-and-dataflow-qwik-start-gsp903, stream-processing-with-cloud-pubsub-and-dataflow-qwik-start, gsp903

---

## Overview

Google Cloud Pub/Sub is a messaging service for exchanging event data among applications and services. A producer of data publishes messages to a Cloud Pub/Sub topic. A consumer creates a subscription to that topic. Subscribers either pull messages from a subscription or are configured as webhooks for push subscriptions. Every subscriber must acknowledge each message within a configurable window of time.

[Dataflow](https://cloud.google.com/dataflow) is a fully-managed service for transforming and enriching data in stream (real-time) and batch modes with equal reliability and expressiveness. It provides a simplified pipeline development environment using the Apache Beam SDK, which has a rich set of windowing and session analysis primitives as well as an ecosystem of source and sink connectors.

Pub/Sub is a scalable, durable event ingestion and delivery system. Dataflow compliments Pub/Sub's scalable, at-least-once delivery model with message deduplication and exactly-once, in-order processing if you use windows and buffering.

### What you'll do

* Read messages published to a Pub/Sub topic
    
* Window (or group) the messages by timestamp
    
* Write the messages to Cloud Storage
    

## Setup

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
    student-03-b0c130af25b9@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    nESsA5Ud0pL2
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-8f7826a76f90`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-8f7826a76f90
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
ACCOUNT: student-03-b0c130af25b9@qwiklabs.net

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
project = qwiklabs-gcp-03-8f7826a76f90
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region

* In Cloud Shell, run the following command to set the project region for this lab:
    

```apache
gcloud config set compute/region us-central1
```

### Ensure that the Dataflow API is successfully enabled

To ensure access to the necessary API, restart the connection to the Dataflow API.

```apache
gcloud services disable dataflow.googleapis.com --project qwiklabs-gcp-03-8f7826a76f90 --force
gcloud services enable dataflow.googleapis.com --project qwiklabs-gcp-03-8f7826a76f90
```

Click **Check my progress** to verify the objective.

Disable and re-enable the Dataflow API

## Task 1. Create project resources

1. In Cloud Shell, create variables for your bucket, project, and region.
    

```apache
PROJECT_ID=$(gcloud config get-value project)
BUCKET_NAME="${PROJECT_ID}-bucket"
TOPIC_ID=my-id
REGION=us-central1
```

2. Set your App Engine region.
    

**Note:** For regions other than `us-central1` and `europe-west1`, set the AppEngine region variable to be the same as the assigned region. If you are assigned `us-central1`, set the AppEngine region variable to `us-central`. If you are assigned `europe-west1`, set the AppEngine region variable to `europe-west`.

You can refer to the [App Engine locations](https://cloud.google.com/appengine/docs/standard/locations) for more information.

```apache
AE_REGION=us-central
```

3. Create a Cloud Storage bucket owned by this project:
    

```apache
gsutil mb gs://$BUCKET_NAME
```

**Note:** Cloud Storage bucket names must be globally unique. Your Qwiklabs Project ID is always unique, so that is used in your bucket name in this lab.

4. Create a Pub/Sub topic in this project:
    

```apache
gcloud pubsub topics create $TOPIC_ID
```

5. Create an App Engine app for your project:
    

```apache
gcloud app create --region=$AE_REGION
```

6. Create a Cloud Scheduler job in this project. The job publishes a message to a Pub/Sub topic at one-minute intervals:
    

```apache
gcloud scheduler jobs create pubsub publisher-job --schedule="* * * * *" \
    --topic=$TOPIC_ID --message-body="Hello!"
```

7. If prompted to enable the Cloud Scheduler API, press `y` and enter.
    

Click **Check my progress** to verify the objective.

Create Project Resources

8. Start the job:
    

```apache
gcloud scheduler jobs run publisher-job
```

**Note:** If you encounter an error for `RESOURCE_EXHAUSTED`, attempt to execute the command again.

9. Use the following commands to clone the quickstart repository and navigate to the sample code directory:
    

**JavaPython**

```apache
git clone https://github.com/GoogleCloudPlatform/java-docs-samples.git
cd java-docs-samples/pubsub/streaming-analytics
```

**Note:** If you are using the Python option, execute the Python commands individually.

Click **Check my progress** to verify the objective.

Start the cloud scheduler job

## Task 2. Review code to stream messages from Pub/Sub to Cloud Storage

### Code sample

Review the following sample code, which uses Dataflow to:

* Read Pub/Sub messages.
    
* Window (or group) messages into fixed-size intervals by publish timestamps.
    
* Write the messages in each window to files in Cloud Storage.
    

**JavaPython**

```apache
import java.io.IOException;
import org.apache.beam.examples.common.WriteOneFilePerWindow;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.gcp.pubsub.PubsubIO;
import org.apache.beam.sdk.options.Default;
import org.apache.beam.sdk.options.Description;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.options.StreamingOptions;
import org.apache.beam.sdk.options.Validation.Required;
import org.apache.beam.sdk.transforms.windowing.FixedWindows;
import org.apache.beam.sdk.transforms.windowing.Window;
import org.joda.time.Duration;

public class PubSubToGcs {
  /*
   * Define your own configuration options. Add your own arguments to be processed
   * by the command-line parser, and specify default values for them.
   */
  public interface PubSubToGcsOptions extends StreamingOptions {
    @Description("The Cloud Pub/Sub topic to read from.")
    @Required
    String getInputTopic();

    void setInputTopic(String value);

    @Description("Output file's window size in number of minutes.")
    @Default.Integer(1)
    Integer getWindowSize();

    void setWindowSize(Integer value);

    @Description("Path of the output file including its filename prefix.")
    @Required
    String getOutput();

    void setOutput(String value);
  }

  public static void main(String[] args) throws IOException {
    // The maximum number of shards when writing output.
    int numShards = 1;

    PubSubToGcsOptions options =
        PipelineOptionsFactory.fromArgs(args).withValidation().as(PubSubToGcsOptions.class);

    options.setStreaming(true);

    Pipeline pipeline = Pipeline.create(options);

    pipeline
        // 1) Read string messages from a Pub/Sub topic.
        .apply("Read PubSub Messages", PubsubIO.readStrings().fromTopic(options.getInputTopic()))
        // 2) Group the messages into fixed-sized minute intervals.
        .apply(Window.into(FixedWindows.of(Duration.standardMinutes(options.getWindowSize()))))
        // 3) Write one file to GCS for every window of messages.
        .apply("Write Files to GCS", new WriteOneFilePerWindow(options.getOutput(), numShards));

    // Execute the pipeline and wait until it finishes running.
    pipeline.run().waitUntilFinish();
  }
}
```

**Note:** To explore the sample code further, visit the respective [java-docs-samples](https://github.com/GoogleCloudPlatform/java-docs-samples/blob/HEAD/pubsub/streaming-analytics/src/main/java/com/examples/pubsub/streaming/PubSubToGcs.java) and [python-docs-samples](https://github.com/GoogleCloudPlatform/python-docs-samples/blob/HEAD/pubsub/streaming-analytics/PubSubToGCS.py) GitHub pages.

## Task 3. Start the pipeline

1. To start the pipeline, run the following command:
    

**JavaPython**

```apache
mvn compile exec:java \
-Dexec.mainClass=com.examples.pubsub.streaming.PubSubToGcs \
-Dexec.cleanupDaemonThreads=false \
-Dexec.args=" \
    --project=$PROJECT_ID \
    --region=$REGION \
    --inputTopic=projects/$PROJECT_ID/topics/$TOPIC_ID \
    --output=gs://$BUCKET_NAME/samples/output \
    --runner=DataflowRunner \
    --windowSize=2 \
    --tempLocation=gs://$BUCKET_NAME/temp"
```

**Note**: When executing the python command, replace `project_id`, `bucket_name`, and `region` with your project id, bucket name, and assigned lab region.

The preceding command runs locally and launches a Dataflow job that runs in the cloud.

**Note:** You may have to wait **around 10 minutes** for the code to fully execute and for the pipeline job to appear in the Dataflow console in the next task.

**Note:** If you receive a warning regarding `StaticLoggerBinder`, you can safely ignore it and move ahead in the lab.

Click **Check my progress** to verify the objective.

Start the pipeline and launch dataflow job

## Task 4. Observe job and pipeline progress

1. Go to [Dataflow console](https://console.cloud.google.com/dataflow?project=) to observe the job's progress.
    
2. Click **Refresh** to see the job and the latest status updates.
    

![Dataflow page displaying the information of the pubsubtogcs 0815172250-75a99ab8 job](https://cdn.qwiklabs.com/RaFJBrjeoXO0jVCQnlfbGKRYp05LNneSpbqnQ25%2Fe1Y%3D align="left")

3. Click on the job name to open the job details and review the following:
    

* Job structure
    
* Job logs
    
* Stage metrics
    

![Job page displaying the Job summary information](https://cdn.qwiklabs.com/YeS%2F3aBHYjhizSJQJEXcyk9hnJrvKY%2FtACSZQyx%2FVVY%3D align="left")

You may have to wait a few more minutes to see the output files in Cloud Storage.

4. You can see the output files by navigating to **Navigation menu** &gt; **Cloud Storage**, and clicking on your bucket name and then clicking **Samples**.
    

![Bucket details page displaying the output file information](https://cdn.qwiklabs.com/1ZT3gmwJfLUDUAgaZeSpzvhp89P5EwPP0P0Du662wk4%3D align="left")

5. Alternately, you can exit the application in Cloud Shell using **CTRL+C** (and for the Python option, type `exit`), and then execute the command below to list the files that have been written out to Cloud Storage:
    

```apache
gsutil ls gs://${BUCKET_NAME}/samples/
```

The output should look like the following:

**javapython**

```apache
gs://{$BUCKET_NAME}/samples/output-22:30-22:32-0-of-1
gs://{$BUCKET_NAME}/samples/output-22:32-22:34-0-of-1
gs://{$BUCKET_NAME}/samples/output-22:34-22:36-0-of-1
gs://{$BUCKET_NAME}/samples/output-22:36-22:38-0-of-1
```

## Task 5. Cleanup

1. If you have not already, exit the application in Cloud Shell using **CTRL+C**.
    

For the Python option, type `exit` to exit the Python environment.

2. In Cloud Shell, delete the Cloud Scheduler job:
    

```apache
gcloud scheduler jobs delete publisher-job
```

If prompted "Do you want to continue", press `Y` and enter.

3. In the Dataflow console, stop the job by selecting your job name, and clicking **Stop**.
    

When prompted, click **Stop Job &gt; Cancel** to cancel the pipeline without draining.

4. In Cloud Shell, delete the topic:
    

```apache
gcloud pubsub topics delete $TOPIC_ID
```

5. In Cloud Shell, delete the files created by the pipeline:
    

```apache
gsutil -m rm -rf "gs://${BUCKET_NAME}/samples/output*"
gsutil -m rm -rf "gs://${BUCKET_NAME}/temp/*"
```

6. In Cloud Shell, delete the Cloud Storage bucket:
    

```apache
gsutil rb gs://${BUCKET_NAME}
```

---

## Solution of Lab

%[https://youtu.be/Vfe6SES1ixE] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP903/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755760633427/0bf21997-ced7-44d5-8120-89160c965f3e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755760648417/d3a7fe5a-b9a0-4f36-8766-8035e981f579.png align="center")