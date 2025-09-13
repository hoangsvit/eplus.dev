---
title: "Manage Kubernetes in Google Cloud: Challenge Lab - GSP510"
seoTitle: "Manage Kubernetes in Google Cloud: Challenge Lab - GSP510"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Mar 28 2024 15:55:12 GMT+0000 (Coordinated Universal Time)
cuid: clubf1liq000708js89izdbbg
slug: manage-kubernetes-in-google-cloud-challenge-lab
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757777170267/0c62b3d4-1071-4290-95b3-c236bdd8ea78.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757777217170/2c9b9e73-7cc4-43a2-8705-83fb0a971b31.png
tags: google-cloud-platform, manage-kubernetes-in-google-cloud-challenge-lab, manage-kubernetes-in-google-cloud, gsp510, manage-kubernetes

---

## Introduction

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Manage Kubernetes in Google Cloud](https://www.cloudskillsboost.google/authoring/course_templates/783) skill badge. Are you ready for the challenge?

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You were onboarded at Cymbal Shops just a few months ago. You have spent a lot of time working with containers in Docker and Artifact Registry and have learned the ropes of managing new and existing deployments on GKE. You've had practice updating manifests as well as scaling, monitoring, and debugging applications running on your clusters.

![cymbal shops logo](https://cdn.qwiklabs.com/ERaGdAqCyYGK%2Flm84HkWBKxIQawXk%2FXKsTWjApgsPJ0%3D align="left")

Your team would like you to start managing their Kubernetes deployments to ensure smooth rollouts and application updates to their new e-commerce website. Before you switch to this new role, the development team would like you to demonstrate your new skills. As part of this demonstration, they have a list of tasks they would like to see you do in an allotted period of time in a sandbox environment.

### Your challenge

As part of the sandbox environment, your developers have created an Artifact Registry repository named `demo-repo` that has some code with a basic example application that you will deploy onto a cluster.

**Note:** This image created in the repo is a containerized version of the code you will be downloading from the `spls/gsp510/hello-app` bucket later in the lab.

Your tasks will include the following:

* Creating a GKE cluster based on a set of configurations provided.
    
* Enabling Managed Prometheus on the cluster for metrics monitoring.
    
* Deploying a Kubernetes manifest onto the cluster, and debugging the errors.
    
* Creating a logs-based metric and alerting policy for the errors on the Kubernetes cluster.
    
* Fixing the manifest errors, containerizing your application code and pushing it to Artifact Registry using Docker.
    
* Exposing a service for your application on the cluster and verifying your updates.
    

## Task 1. Create a GKE cluster

The new Cymbal Shops e-commerce website will run natively on GKE and the team would like to see your experience working and setting up clusters. In this section, you will need to create a Kubernetes cluster based on a set of configurations provided to run your demo applications on.

1. Create a GKE cluster named `hello-world-k9el` with the following configuration:
    

| **Setting** | **Value** |
| --- | --- |
| **Zone** | `us-east1-c` |
| **Release channel** | **Regular** |
| **Cluster version** | `1.27.8` *or newer* |
| **Cluster autoscaler** | **Enabled** |
| **Number of nodes** | **3** |
| **Minimum nodes** | **2** |
| **Maximum nodes** | **6** |

Click **Check my progress** to verify the objective.

Create a GKE cluster

## Task 2. Enable Managed Prometheus on the GKE cluster

As part of the e-commerce website strategy, Cymbal Shops would like to start using Managed Prometheus for metrics and monitoring on the cluster to ensure a good experience for their customers. In this section, you will enable Managed Prometheus on the cluster for metric monitoring and create a namespace to deploy a sample Prometheus application and pod monitoring on.

1. Enable the Prometheus managed collection on the GKE cluster.
    
2. Create a namespace on the cluster named `gmp-d252`.
    
3. Download a sample Prometheus app:
    

```apache
gsutil cp gs://spls/gsp510/prometheus-app.yaml .
```

Copied!

4. Update the `<todo>` sections (lines 35-38) with the following configuration.
    
    * **containers.image**: `nilebox/prometheus-example-app:latest`
        
    * **containers.name:** `prometheus-test`
        
    * **ports.name**: `metrics`
        
5. Deploy the application onto the `gmp-d252` namespace on your GKE cluster.
    
6. Download the `pod-monitoring.yaml` file:
    

```apache
gsutil cp gs://spls/gsp510/pod-monitoring.yaml .
```

Copied!

7. Update the `<todo>` sections (lines 18-24) with the following configuration:
    
    * **metadata.name**: `prometheus-test`
        
    * **labels.app.kubernetes.io/name**: `prometheus-test`
        
    * **matchLabels.app**: `prometheus-test`
        
    * **endpoints.interval**: `30s`
        
8. Apply the pod monitoring resource onto the `gmp-d252` namespace on your GKE cluster.
    

Click **Check my progress** to verify the objective.

Enable Managed Prometheus on the GKE cluster

## Task 3. Deploy an application onto the GKE cluster

The development team at Cymbal Shops will be consistently releasing new application code to the cluster that you will have to successfully deploy into production. In this section, you will deploy a Kubernetes manifest onto the cluster and inspect the issue.

1. Download the demo deployment manifest files:
    

```apache
gsutil cp -r gs://spls/gsp510/hello-app/ .
```

Copied!

2. Create a deployment onto the `gmp-d252` namespace on your GKE cluster from the `helloweb-deployment.yaml` manifest file. It is located in the `hello-app/manifests` folder.
    
3. Verify you have created the deployment, and navigate to the **helloweb** deployment details page. You should see the following error:
    

![invalid image name error](https://cdn.qwiklabs.com/OONay%2Feg%2FuH6FbRql2BVYFxbv%2FrWV1ER97BP1RRyjbY%3D align="left")

This error seems to stem from an invalid image name in the manifest that you just deployed. Before you fix the image name, you will create a logs-based metric and alerting policy so that your team can be notified if this happens again in the future.

Click **Check my progress** to verify the objective.

Deploy an application onto the GKE cluster

## Task 4. Create a logs-based metric and alerting policy

Cymbal Shops would like to set up some logs based metrics and alerting policies to aggregate the number of errors and warnings in their Kubernetes pods and set up an alerting mechanism for their clusters when a certain amount of errors are above a specific threshold. In this section, you will demonstrate your knowledge on building these metrics and alerting policies for the team.

### Create a logs-based metric

1. In the Logs Explorer, create a query that exposes warnings/errors you saw in the previous section on the cluster.
    

**Hint:** your query should have just one *Resource Type* and one *Severity* selected.

If the query is correct, upon running you should see the following errors show up in the logs:

```apache
Error: InvalidImageName
Failed to apply default image tag "<todo>": couldn't parse image reference "<todo>": invalid reference format
```

2. Create a logs-based metric from this query. For **Metric type**, use **Counter** and for the **Log Metric Name** use `pod-image-errors`.
    

### Create an alerting policy

1. Create an Alerting Policy based on the logs-based metric you just created. Use the following details to configure your policy:
    
    * **Rolling Window**: `10 min`
        
    * **Rolling window function**: `Count`
        
    * **Time series aggregation**: `Sum`
        
    * **Condition type**: `Threshold`
        
    * **Alert trigger**: `Any time series violates`
        
    * **Threshold position**: `Above threshold`
        
    * **Threshold value**: `0`
        
    * **Use notification channel**: ***Disable***
        
    * **Alert policy name**: `Pod Error Alert`
        

Click **Check my progress** to verify the objective.

Create a logs-based metric and alerting policy

## Task 5. Update and re-deploy your app

The development team would like to see you demonstrate your knowledge on deleting and updating deployments on the cluster in case of an error. In this section, you will update a Kubernetes manifest with a correct image reference, delete a deployment, and deploy the updated application onto the cluster.

1. Replace the `<todo>` in the image section in the `helloweb-deployment.yaml` deployment manifest with the following image:
    
    * `us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0`
        
2. **Delete** the **helloweb** deployment from your cluster.
    
3. Deploy the updated `helloweb-deployment.yaml` manifest onto your cluster on the `gmp-d252` namespace.
    

You should verify that it has deployed correctly with no errors. Your Kubernetes Workloads page should resemble the following:

![helloweb deployed with no errors](https://cdn.qwiklabs.com/0Uymx3hvEhcCmtQreOMdkRsBj8DPVPz6Qq0jDuyuUPw%3D align="left")

Click **Check my progress** to verify the objective.

Update and re-deploy your app

## Task 6. Containerize your code and deploy it onto the cluster

Lastly, as part of the Cymbal Shops e-commerce strategy, the application team will be providing you code that you will need to containerize and store in a registry, and then update the cluster with the newest version of that code.

In this section, you will containerize your application code, update an image in Artifact Registry, and set that to the image on your cluster. Your team has a repository in Artifact Registry named `demo-repo` that contains a containerized version of the `hello-app` sample app in Docker. You will update the code for the build locally, then push a new version to the repository.

1. In the `hello-app` directory, update the **main.go** file to use `Version: 2.0.0` on line 49.
    
2. Use the `hello-app/Dockerfile` to create a Docker image with the `v2` tag.
    

**Note:** you should follow the Artifact Registry naming conventions as detailed [here](https://cloud.google.com/artifact-registry/docs/docker/names#containers).

3. Push the newly built Docker image to your repository in Artifact Registry using the `v2` tag.
    
4. Set the image on your **helloweb** deployment to reflect the `v2` image you pushed to Artifact Registry.
    
5. Expose the **helloweb** deployment to a LoadBalancer service named `helloweb-service-5lt3` on port 8080, and set the target port of the container to the one specified in the Dockerfile.
    
6. Navigate to the external load balancer IP address of the `helloweb-service-5lt3` service, and you should see the following text returned by the service:
    

```apache
Hello, world!
Version: 2.0.0
Hostname: helloweb-6fc7476576-cvv5f
```

**Note:** It may take a few minutes for the webpage to load.

Click **Check my progress** to verify the objective.

Containerize your code and deploy it onto the cluster

---

## Solution of Lab

## Quick

1. Create metric: [https://console.cloud.google.com/logs/metrics/edit](https://console.cloud.google.com/logs/metrics/edit)
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757781532932/c286ae2f-cbf6-4211-a5b4-eb7300f20de7.png align="center")
    
    ```apache
    pod-image-errors
    ```
    
    ```apache
    resource.type="k8s_pod"
    severity=WARNING
    ```
    

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP510/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757778863011/2eb48906-64b2-4c31-9b38-f9dc77ef3b08.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757778868823/c85a6b3d-169f-4cf4-bccf-14dbbc9d275e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757778876855/a8302060-a541-4b54-8928-1dab400d1eaf.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757778880588/3e760984-4ced-4a9b-97a0-a422508576dd.png align="center")

---

### New Solution

%[https://youtu.be/6x0g95874NA] 

**Metric type: Counter**

**Log Metric Name:**

```apache
pod-image-errors
```

**In the built filter box, add the following query:**

```apache
resource.type="k8s_pod"
severity=WARNING
```

**Tap here to open the** [**Onlin**](https://www.rapidtables.com/tools/notepad.html#)[**e Notepad**](https://www.rapidtables.com/tools/notepad.html#)

**Make sure to use an online notepad, which I was using**

```apache
export REPO_NAME=
export CLUSTER_NAME=
export ZONE=
export NAMESPACE=
export INTERVAL=
export SERVICE_NAME=
```

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/NEW%20Manage%20Kubernetes%20in%20Google%20Cloud%20Challenge%20Lab/quicklabgsp510.sh
sudo chmod +x quicklabgsp510.sh
./quicklabgsp510.sh
```

---

### Old Solution

%[https://www.youtube.com/watch?v=vsaqpdaXhfg&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

***1\. Go to the log base metric***

***2 Click Create Metric.***

***3\. Use the following details to configure your metric:***

***Metric type:*** `Counter` ***Log Metric Name :*** `pod-image-errors`

***4\. Enable Show query and in the Query builder box, add the following query:***

```apache
resource.type="k8s_pod"
severity=WARNING
```

***5\. Click Create Metric.***

```apache
export REPO_NAME=
export CLUSTER_NAME=
export ZONE=
export NAMESPACE=
export INTERVAL=
export SERVICE_NAME=
```

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/NEW%20Manage%20Kubernetes%20in%20Google%20Cloud%20Challenge%20Lab/quicklabgsp510.sh
sudo chmod +x quicklabgsp510.sh
./quicklabgsp510.sh
```

---

```powershell
gcloud config set compute/zone $ZONE

gcloud container clusters create $CLUSTER_NAME \
--release-channel regular \
--cluster-version latest \
--num-nodes 3 \
--min-nodes 2 \
--max-nodes 6 \
--enable-autoscaling --no-enable-ip-alias

 
gcloud container clusters update $CLUSTER_NAME --enable-managed-prometheus --zone $ZONE
  
kubectl create ns $NAMESPACE
  
gsutil cp gs://spls/gsp510/prometheus-app.yaml .
 
cat > prometheus-app.yaml <<EOF

apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus-test
  labels:
    app: prometheus-test
spec:
  selector:
    matchLabels:
      app: prometheus-test
  replicas: 3
  template:
    metadata:
      labels:
        app: prometheus-test
    spec:
      nodeSelector:
        kubernetes.io/os: linux
        kubernetes.io/arch: amd64
      containers:
      - image: nilebox/prometheus-example-app:latest
        name: prometheus-test
        ports:
        - name: metrics
          containerPort: 1234
        command:
        - "/main"
        - "--process-metrics"
        - "--go-metrics"
EOF

 
kubectl -n $NAMESPACE apply -f prometheus-app.yaml
  
gsutil cp gs://spls/gsp510/pod-monitoring.yaml .
 
cat > pod-monitoring.yaml <<EOF

apiVersion: monitoring.googleapis.com/v1alpha1
kind: PodMonitoring
metadata:
  name: prometheus-test
  labels:
    app.kubernetes.io/name: prometheus-test
spec:
  selector:
    matchLabels:
      app: prometheus-test
  endpoints:
  - port: metrics
    interval: $INTERVAL
EOF

  
kubectl -n $NAMESPACE apply -f pod-monitoring.yaml
  
gsutil cp -r gs://spls/gsp510/hello-app/ .
  
export PROJECT_ID=$(gcloud config get-value project)
export REGION="${ZONE%-*}"
cd ~/hello-app
gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE
kubectl -n $NAMESPACE apply -f manifests/helloweb-deployment.yaml

cd manifests/

cat > helloweb-deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloweb
  labels:
    app: hello
spec:
  selector:
    matchLabels:
      app: hello
      tier: web
  template:
    metadata:
      labels:
        app: hello
        tier: web
    spec:
      containers:
      - name: hello-app
        image: us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 200m
# [END container_helloapp_deployment]
# [END gke_manifests_helloweb_deployment_deployment_helloweb]
---
EOF
 
cd ..

kubectl delete deployments helloweb  -n $NAMESPACE
kubectl -n $NAMESPACE apply -f manifests/helloweb-deployment.yaml

cat > main.go <<EOF
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	// register hello function to handle all requests
	mux := http.NewServeMux()
	mux.HandleFunc("/", hello)

	// use PORT environment variable, or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// start the web server on port and accept requests
	log.Printf("Server listening on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}

// hello responds to the request with a plain-text "Hello, world" message.
func hello(w http.ResponseWriter, r *http.Request) {
	log.Printf("Serving request: %s", r.URL.Path)
	host, _ := os.Hostname()
	fmt.Fprintf(w, "Hello, world!\n")
	fmt.Fprintf(w, "Version: 2.0.0\n")
	fmt.Fprintf(w, "Hostname: %s\n", host)
}

// [END container_hello_app]
// [END gke_hello_app]

EOF

 
export PROJECT_ID=$(gcloud config get-value project)
export REGION="${ZONE%-*}"
cd ~/hello-app/

gcloud auth configure-docker $REGION-docker.pkg.dev --quiet
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/hello-app:v2 .
 
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/hello-app:v2
  
kubectl set image deployment/helloweb -n $NAMESPACE hello-app=$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/hello-app:v2
  
kubectl expose deployment helloweb -n $NAMESPACE --name=$SERVICE_NAME --type=LoadBalancer --port 8080 --target-port 8080
 
cd ..

kubectl -n $NAMESPACE apply -f pod-monitoring.yaml



cat > quicklab.json <<EOF_END
{
  "displayName": "Pod Error Alert",
  "userLabels": {},
  "conditions": [
    {
      "displayName": "Kubernetes Pod - logging/user/pod-image-errors",
      "conditionThreshold": {
        "filter": "resource.type = \"k8s_pod\" AND metric.type = \"logging.googleapis.com/user/pod-image-errors\"",
        "aggregations": [
          {
            "alignmentPeriod": "600s",
            "crossSeriesReducer": "REDUCE_SUM",
            "perSeriesAligner": "ALIGN_COUNT"
          }
        ],
        "comparison": "COMPARISON_GT",
        "duration": "0s",
        "trigger": {
          "count": 1
        },
        "thresholdValue": 0
      }
    }
  ],
  "alertStrategy": {
    "autoClose": "604800s"
  },
  "combiner": "OR",
  "enabled": true,
  "notificationChannels": []
}
EOF_END

gcloud alpha monitoring policies create --policy-from-file="quicklab.json"
```