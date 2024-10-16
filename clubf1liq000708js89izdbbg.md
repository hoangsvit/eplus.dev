---
title: "Manage Kubernetes in Google Cloud: Challenge Lab"
seoTitle: "Manage Kubernetes in Google Cloud: Challenge Lab"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Mar 28 2024 15:55:12 GMT+0000 (Coordinated Universal Time)
cuid: clubf1liq000708js89izdbbg
slug: manage-kubernetes-in-google-cloud-challenge-lab
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711641229187/783021c6-b204-437c-acbc-71cbe0df9412.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711641237567/c238d83d-801c-46c5-9b13-8d9ed41efe99.png

---

## **Introduction**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the Manage Kubernetes in Google Cloud quest and have previously completed the introductory Deploy to Kubernetes in Google Cloud quest. Are you ready for the challenge?

[***1***](https://google.qwiklabs.com/quests/116)***. Go to log base metric***

***2 Click Create Metric.***

***3\. Use the following details to configure your metric:***

***Metric type:*** `Counter` ***Log Metric Name :*** `pod-image-errors`

***4\. Enable Show query and in the Query builder box, add the f***[***ollowing query:***](https://google.qwiklabs.com/quests/116)

```apache
resource.type="k8s_pod"
severity=WARNING
```

***5\. Click Create Metric.***

Make sure to use online notepad which I was using

%[https://www.youtube.com/watch?v=vsaqpdaXhfg&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```apache
export REPO_NAME=
export CLUSTER_NAME=
export ZONE=
export NAMESPACE=
export INTERVAL=
export SERVICE_NAME=
```

[<mark>Example</mark>](https://google.qwiklabs.com/quests/116)

```apache
export REPO_NAME=hello-repo
export CLUSTER_NAME=hello-world-fjc1
export ZONE=us-central1-b
export NAMESPACE=gmp-dwgf
export INTERVAL=60s
export SERVICE_NAME=helloweb-service-2t2h
```

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/NEW%20Manage%20Kubernetes%20in%20Google%20Cloud%20Challenge%20Lab/quicklabgsp510.sh
sudo chmod +x quicklabgsp510.sh
./quicklabgsp510.sh
```

or

```apache
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