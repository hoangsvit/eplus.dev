---
title: "APIs Explorer: Create and Update a Cluster - GSP288"
seoTitle: "APIs Explorer: Create and Update a Cluster - GSP288"
seoDescription: "The Google APIs Explorer is a tool that helps you explore various Google APIs interactively. With the APIs Explorer, you can:

Browse quickly through availa"
datePublished: Tue Dec 10 2024 04:00:36 GMT+0000 (Coordinated Universal Time)
cuid: cm4hxojdu000309icdky53wb3
slug: apis-explorer-create-and-update-a-cluster-gsp288
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749025474156/124b1ac1-d095-4220-a189-08ce957ef24f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749025483335/70455570-cc11-4e3c-b52b-8c0d6a210b01.png
tags: apis-explorer-create-and-update-a-cluster-gsp288, gsp288

---

## **Overview**

The [Google APIs Explorer](http://developers.google.com/apis-explorer/) is a tool that helps you explore various Google APIs interactively. With the APIs Explorer, you can:

* Browse quickly through available **APIs** and versions.
    
* See **methods** available for each API and what **parameters** they support along with inline documentation.
    
* Execute requests for any method and see responses in **real time**.
    
* Make **authenticated and authorized** API calls.
    
* Search across all **services**, **methods**, and your **recent requests** to quickly find what you are looking for.
    

The APIs Explorer uses its own [API key](https://developers.google.com/console/help/using-keys) whenever it makes a request. When you use the APIs Explorer to make a request, it displays the request syntax, which includes a placeholder labeled {YOUR\_API\_KEY}. If you want to make the same request in your application, you need to replace this placeholder with your own API key.

In this lab, you'll learn how to use an inline [Google APIs Explorer](https://developers.google.com/apis-explorer/#p/) template to call the Cloud Dataproc API to create a cluster, then run a simple Spark job in the cluster. It also shows you how to use the APIs Explorer template to call the Cloud Dataproc API to update a cluster.

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
    student-04-fcca080921a0@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    FOq443Oral1H
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-5633370102d2`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-5633370102d2
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
ACCOUNT: student-04-fcca080921a0@qwiklabs.net

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
project = qwiklabs-gcp-04-5633370102d2
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Open APIs Explorer**

1. Go to **Navigation menu** &gt; **APIs & Services**.
    
2. Scroll down the list until you find **Cloud Dataproc API**, and click on it.
    
3. Make sure that API is enabled, if not click **Enable**.
    
4. Now that you have verified the API's enablement, open [Rest API Reference](https://cloud.google.com/dataproc/docs/reference/rest/). This will open a new tab with the Rest API Reference page for the Cloud Dataproc API.
    

## **Task 2. Create a cluster**

From the left APIs & Reference section navigate to **REST reference** &gt; **v1** &gt; **projects.regions.clusters** &gt; **create** to `projects.regions.clusters.create` method or, to create cluster, use the [Method: projects.regions.clusters.create reference](https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.clusters/create).

Now you'll fill in the form and execute the APIs Explorer template, below, as follows:

1. Insert your Qwiklabs Project ID in the projectId field.
    
2. Set the region field to `us-central1`.
    
3. In the **Request body**, click between the curly brackets and add the `clusterName` property. Enter the clusterName of your choice. Note, the value of the clusterName must not contain any uppercase letters or spaces.
    
4. From the Add a Property dropdown menu choose `config`.
    
5. In the Add a Property dropdown, choose `gceClusterConfig`.
    
6. In this Add a Property dropdown choose `zoneUri` field, then add the following, replacing `my-project-id` with the Project ID for this lab:
    

```apache
https://www.googleapis.com/compute/v1/projects/my-project-id/zones/us-central1-c
```

7. In the curly bracket under `config`, select `softwareConfig`.
    
8. In the curly bracket under `softwareConfig`, select `imageVersion`and set it to `2.0-debian10`.
    
9. In the curly bracket under `softwareConfig`, select `optionalComponents`. Under `optionalComponents` click on **ADD ITEM** and select `JUPYTER` from the dropdown.
    

When you're done your **Request body** should look like this:

![The Request body field displaying lines of code](https://cdn.qwiklabs.com/D9ZHNw1U47%2BBweTvVlghXmflRIiPyKTx2KZzCn6YJ9k%3D align="left")

10. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under the **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on the question mark icon next to **Credentials** title.

11. Make sure that there are no trailing spaces in any of the fields.
    
12. Now scroll down and click **Execute**.
    
13. Select the student account you started the lab with.
    
14. On the next screen, click **Allow** to give APIs Explorer access.
    
15. The results of the Dataproc API will appear below the Request and will look similar to the following:
    

![The Dataproc API results](https://cdn.qwiklabs.com/0cR7EpqT%2BS2fYOaxQIRskSl%2BQDr%2Bjpwrl%2FLw353%2Bedg%3D align="left")

16. You can go to **Navigation menu** &gt; **Dataproc** &gt; **Clusters** to see the cluster created.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you successfully created a Dataproc cluster in the `us-central1` region, you will see an assessment score.

Create a Dataproc cluster (region: `us-central1`)

Check my progress

## **Task 3. Run a Spark job**

Next you'll run a simple [Apache Spark](http://spark.apache.org/) job that calculates a rough value for pi in an existing Cloud Dataproc cluster.

* From the left APIs & Reference section navigate to **REST reference** &gt; **v1** &gt; **projects.regions.jobs** &gt; **submit** to `projects.regions.jobs.submit` method or use [this link](https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/submit) to submit a job to a cluster.
    

Now you'll fill in the form and execute the APIs Explorer template, below, as follows:

1. Insert your project ID in the projectId field.
    
2. Set the region field to `us-central1`.
    
3. In the Request body, click between the curly brackets and choose `job`.
    
4. Click in the curly brackets below this and choose `placement`.
    
5. Click in the curly brackets below this and choose `clusterName` then type the name of your cluster.
    
6. In the curly bracket under job, select `sparkJob`.
    
7. You will now add 3 items under sparkJob:
    

* In the curly bracket under sparkjob, select `args`. Under `args` click on **ADD ITEM** and type 1000
    
* In the Add a Property dropdown, choose `jarFileUris`. Under `jarFileUris` click on **ADD ITEM** and type `file:///usr/lib/spark/examples/jars/spark-examples.jar`
    
* In the Add a Property dropdown, choose `mainClass` and type `org.apache.spark.examples.SparkPi`
    

When you're done your **Request body** should look like this:

![The Request body layout](https://cdn.qwiklabs.com/B184A9hT5FnbPYZurxFnegBm8EjBZNdwAAPzMHf4uFs%3D align="left")

8. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under the **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on the question mark icon next to **Credentials** title.

9. Make sure that there are no trailing spaces in any of the fields. Click **EXECUTE**.
    

The results of the Dataproc API will appear below the Request, and look similar to this:

![The Dataproc API results](https://cdn.qwiklabs.com/24YS9uiDekDZBqM%2BhkFIigUSEoJqGO1%2BSZKjoPrFfHk%3D align="left")

10. You can find your results by going to **Dataproc** &gt; **Clusters**. Click on the name of your cluster, then the **Jobs** tab.
    
11. Click on the Job ID and select **Line Wrap** to **ON** to bring the lines that exceed the right margin into view.
    

![The Job output tabbed page with Line Wrap On selected](https://cdn.qwiklabs.com/2tUY5LHWgSwYcU28aF%2FdQR6qRwJE%2B6SYU%2BA9bu1Jj0w%3D align="left")

### Test completed task

Click **Check my progress** to verify your performed task. If you successfully submit a Spark job to a cluster, you will see an assessment score.

Submit a Spark Job

Check my progress

## **Task 4. Update a cluster**

* From the left APIs & Reference section navigate to **REST reference** &gt; **v1** &gt; **projects.regions.clusters** &gt; **patch** to `projects.regions.clusters.patch` method or use [this link](https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.clusters/patch) to update a cluster.
    

Now you'll fill in the form and execute the APIs Explorer template, below, as follows:

1. projectID = your project ID
    
2. Region = `us-central1`
    
3. clusterName = enter your cluster name
    
4. updateMask = config.worker\_config.num\_instances
    
5. Patch body, enter the following:
    

* First curly bracket = `config`
    
* Click in the curly bracket below this and choose `workerConfig`
    
* Click in the curly bracket beneath this, and select `numInstances` , then type in **3**.
    

Your form should look like this:

![The Request parameters](https://cdn.qwiklabs.com/V%2BRIxyxYntEyLZAd5y1wXC8h0x44%2Bf%2BtqEFr2J0rhj8%3D align="left")

5. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under the **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on the question mark icon next to **Credentials** title.

6. Make sure that there are no trailing spaces in any of the fields. Click **EXECUTE**.
    

The results of the Dataproc API will appear below the Request, and look similar to this:

![The Dataproc API results](https://cdn.qwiklabs.com/f1EoUf5BT6%2FUPkY5OrfbOmcUUn%2FWZngsOZHmcGhvBk0%3D align="left")

7. To verify this update, go back to the Dataproc Clusters page. You'll see that you now have 3 total worker nodes.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully updated a worker config for 3 worker nodes you will see an assessment score.

Update a cluster for 3 worker nodes

Check my progress

## **Task 5. Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

The API Explorer provides a way to try out methods in the Dataproc API without having to write any code.TrueFalse

In API Explorer we can only try out Google Cloud APIs.

* True
    
* False
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=aUy_R-2sRyQ&ab_channel=AbhiArcadeSolution] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP288/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export REGION=
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1733803092483/b480d82a-4d5a-4d27-95a6-614ee838ed34.png align="center")

```apache
curl -LO raw.githubusercontent.com/gcpsolution99/GCP-solution/refs/heads/main/GSP/GSP288.sh
sudo chmod +x GSP288.sh
./GSP288.sh
```