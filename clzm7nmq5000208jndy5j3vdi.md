---
title: "Deploy Go Apps on Google Cloud Serverless Platforms - GSP702"
seoTitle: "Deploy Go Apps on Google Cloud Serverless Platforms - GSP702"
seoDescription: "Go is an open source programming language by Google that makes it easy to build fast, reliable, and efficient software at scale. In this lab you explore the"
datePublished: Fri Aug 09 2024 04:32:23 GMT+0000 (Coordinated Universal Time)
cuid: clzm7nmq5000208jndy5j3vdi
slug: deploy-go-apps-on-google-cloud-serverless-platforms-gsp702
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723177101236/b82d6426-caca-46c0-8bdc-18f74f03429c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723177916694/bc56203f-e6d6-4c27-9417-88ace89b937f.png

---

## **Overview**

Go is an open source programming language by Google that makes it easy to build **fast**, **reliable**, and **efficient** software at scale. In this lab you explore the basics of Go by deploying a simple Go app to [Cloud Run](https://cloud.google.com/run), [Cloud Functions](https://cloud.google.com/functions), and [App Engine](https://cloud.google.com/appengine). You then use the Go app to access data in [BigQuery](https://cloud.google.com/bigquery) and [Firestore](https://cloud.google.com/firestore).

**What you'll do**

In this lab, you perform the following:

* Set up your Firestore Database and import data
    
* Get an introduction to the power of Cloud Build
    
* Explore data in BigQuery and Firestore
    
* Deploy a Go app to App Engine, Cloud Run, and Cloud Functions
    
* Examine the Go app code
    
* Test the app on the each of the platforms
    

---

### **Task 1. Setup your environment**

1. In Cloud Shell, enter the following command to create an environment variable to store the **Project ID** to use later in this lab:
    

```apache
gcloud config set compute/region us-central1
export REGION=$(gcloud config get compute/region)
export PROJECT_ID=$(gcloud info --format="value(config.project)")
```

2. Get the sample code for this lab by copying from Google Cloud Storage (GCS):
    

```apache
mkdir DIY-Tools
gsutil cp -R gs://spls/gsp702/DIY-Tools/* DIY-Tools/
```

**Prepare your databases**

This lab uses sample data in BigQuery and Firestore to test your Go app.

#### **BigQuery database**

BigQuery is a serverless, future proof data warehouse with numerous features for machine learning, data partitioning, and segmentation. This lets you analyze gigabytes to petabytes of data using ANSI SQL at blazing-fast speeds, and with zero operational overhead.

The BigQuery dataset is a view of California zip codes and was created for you when the lab started.

#### **Firestore database**

Firestore, is a serverless document database, with super fast document lookup and real-time eventing features. It is also capable of a 99.999% SLA. To use data in Firestore to test your app, you must initialize Firestore in native mode and then import the sample data.

A Firestore native mode database instance has been created.

1. In the Cloud Console, click **Navigation menu** &gt; **Firestore** to open Firestore in the Console.
    

Wait for the Firestore Database instance to initialize. This process also initializes App Engine in the same region, which allows you to deploy the application to App Engine without first creating an App Engine instance.

2. In Cloud Shell, launch a Firestore import job that provides sample Firestore data for the lab:
    

```apache
gcloud firestore import gs://$PROJECT_ID-firestore/prd-back
```

This import job loads a Cloud Firestore backup of a collection called `symbols` into the `$PROJECT_ID-firestore` storage bucket.

This import job takes up to 5 minutes to complete. Start the next section while you wait.

Check Firestore Database Deployment

**Check my progress**

**Configure permissions for Cloud Build**

Cloud Build is a service that executes your builds on Google Cloud infrastructure. By default, Cloud Build does not have sufficient permissions to deploy applications to

* App Engine
    
* Cloud Run
    
* Cloud Functions
    

You must enable these services before you can use Cloud Build to deploy the Google Cloud Data Drive app.

1. In the Console, click **Navigation menu** &gt; **Cloud Build** &gt; **Settings**.
    
2. Set the **Status** for **Cloud Functions** to **Enable**.
    

![The Enable option hihglighted on the expanded Satatus dropdwon menu alongside Cloud Functions in the UI](https://cdn.qwiklabs.com/ctnwvExK0MY%2F30NRy3sPY46gmIOcMgmwCGc8tT3JHtE%3D align="left")

3. When prompted, click **Grant access to All Service Accounts**.
    
4. Set the **Status** for **Cloud Run** to **Enable**.
    
5. Set the **Status** for **App Engine** to **Enable**.
    

### **Task 2. Deploy to Cloud Run**

Google Cloud Run is very similar to App Engine standard environment, except that Cloud Run allows you to bring your own container (BYOC). For the Google Cloud Data Drive app, you supply a Dockerfile that creates a Docker container, and then deploy that container to Cloud Run.

**Note:** The same container can be hosted in Google Kubernetes Engine or any other platform that hosts Docker containers, even on-premises compute platforms.

**Review the** `Dockerfile`

Go is an excellent language to write apps for deployment on container platforms. The only item included in the container is the Go compiled binary. In the below example you can see we use a base container called `distroless/static`. This base container is built from scratch and contains only public certificate roots and timezone file information. The Go binary is injected and registered as a start command (see the last line of the `Dockerfile` below). There are no additional frameworks included or needed. This type of container construction creates the smallest container and security footprint possible and makes the container extremely portable to GKE, Anthos, and on premise hosting solutions.

1. Have a look at the `Dockerfile` code that builds the container below:
    

```dockerfile
# Use the official Golang image to create a build artifact.
# This is based on Debian and sets the GOPATH to /go.
# https://hub.docker.com/_/golang
FROM golang:1.21 as builder

# Create and change to the app directory.
WORKDIR /app

# Retrieve application dependencies.
# This allows the container build to reuse cached dependencies.
COPY go.* ./
RUN go mod download

# Copy local code to the container image.
COPY .  ./

WORKDIR /app/cmd/webserver
# Build the binary.
RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o gcp-data-drive

# Use the Google Distroless image for a minimal container.
FROM gcr.io/distroless/static

# Copy the binary to the production image from the builder stage.
COPY --from=builder /app/cmd/webserver/gcp-data-drive /gcp-data-drive

# Run the web service on container startup.
CMD ["/gcp-data-drive"]
```

2. View the [`Dockerfile` on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/Dockerfile#L19-L45).
    

**Review the Cloud Build YAML config file**

The Cloud Build YAML file, `DIY-Tools/gcp-data-drive/cloudbuild_run.yaml`, shown below contains the Cloud Build step definitions that deploy your application to Cloud Run. You use this file to deploy the application to Cloud Run.

* The first step executes the `git` command to clone the source repository that contains the application. This step is parameterized to allow you to easily switch between application branches.
    
* The second step executes the `gcloud builds submit` command to use Cloud Build to create a container containing the compiled application using the steps contained in the `Dockerfile`. The container is then saved to `gcr.io`
    
* The third step deploys the application container image from `gcr.io` to Cloud Run in the `us-central1` region.
    

You could build the container yourself and manually deploy this app using `gcloud run deploy`, but Cloud Build allows you to offload this to Google infrastructure. The Google Cloud Build system is a core component of an automated CI/CD system because it allows you to listen to commit events with tag filters.These features come together to create an automated pipeline from developers committed to lifecycle deployment in a consistent and reliable way.

**Note:** The comments have been removed for clarity.

```dockerfile
steps:
- name: 'gcr.io/cloud-builders/git'
  args: ['clone','--single-branch','--branch',
        '${_GIT_SOURCE_BRANCH}','${_GIT_SOURCE_URL}']

- name: 'gcr.io/cloud-builders/gcloud'and I args: ['builds','submit', '--tag','gcr.io/$PROJECT_ID/gcp-data-drive'] dir: 'DIY-Tools/gcp-data-drive'

- name: 'gcr.io/cloud-builders/gcloud' args: ['run','deploy','gcp-data-drive', '--image','gcr.io/$PROJECT_ID/gcp-data-drive', '--platform','managed', '--region','us-central1', '--allow-unauthenticated'] dir: 'DIY-Tools/gcp-data-drive' 
```

View the steps in [`cloudbuild_run.yaml` on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cloudbuild_run.yaml#L15-L27).

**Check the import process**

Look in Cloud Shell to see if the import process loading the data into Filestore has finished. When it completes, continue to the next section to deploy the Google Cloud Data Drive app.

**Deploy the Google Cloud Data Drive app**

1. In Cloud Shell, change to the directory for the application that you cloned from GitHub:
    

```apache
cd ~/DIY-Tools/gcp-data-drive
```

2. Deploy the Google Cloud Data Drive app to Cloud Run with Cloud Build:
    

```apache
gcloud builds submit --config cloudbuild_run.yaml \
  --project $PROJECT_ID --no-source \
  --substitutions=_GIT_SOURCE_BRANCH="master",_GIT_SOURCE_URL="https://github.com/GoogleCloudPlatform/DIY-Tools",_GCP_REGION="us-central1"
```

3. Enter the following command to allow unauthorized access to the Google Cloud Run services:
    

```apache
gcloud beta run services add-iam-policy-binding --region=us-central1 --member=allUsers --role=roles/run.invoker gcp-data-drive
```

The deployment takes a few minutes and you may see some red text in the console. These are not failure logs.

4. Store the Cloud Run service URL in an environment variable:
    

```apache
export CLOUD_RUN_SERVICE_URL=$(gcloud run services --platform managed describe gcp-data-drive --region us-central1 --format="value(status.url)")
```

5. Use `curl` to call the application to query data from the Firestore `symbols` collection in your project:
    

```apache
curl $CLOUD_RUN_SERVICE_URL/fs/$PROJECT_ID/symbols/product/symbol | jq .
```

**Note:** If you get an authentication error, wait a minute and retry the previous curl command.

This responds with the contents of a JSON file containing the values from the `symbols` collection in your project, which looks similar to this:

```json
[
  {
    "asin": "B07DR9XYKB",
    "bbw": false,
    "brand": "",
    "category": "toy_display_on_website",
    "cpip": 1640,
    "docid": "887961768916",
    "fba": false,
    "fbafees": 610,
    "inStock": "NOW",
    "lastMatchLookup": "2020-03-13T13:00:47.040414Z",
    "lastOfferLookup": "2020-03-13T13:00:47.933649Z",
    "listPrice": 1599,
    "manufacturer": "Fisher-Price",
    "pkgquantity": 0,
    "salesrank": 54773,
    "sfbc": 4683,
    "sfbr": 0.99,
    "smallImage": "http://ecx.images-amazon.com/images/I/41fDombwLCL._SL75_.jpg",
    "title": "Fisher-Price Imaginext Toy Story Buzz Lightyear & Pizza Planet Truck",
    "upc": "887961768916"
  },
  {
    "asin": "0744018307",
    "bbw": true,
    "brand": "",
    "category": "book_display_on_website",
    "cpip": 2000,
    "docid": "9780744018301",
    "fba": false,
    "fbafees": 722,
    "inStock": "NOW",
    "lastMatchLookup": "2020-03-13T14:00:10.209183Z",
    "lastOfferLookup": "2020-03-13T14:00:13.670858Z",
    "listPrice": 3999,
    "manufacturer": "Prima Games",
    "pkgquantity": 0,
    "salesrank": 337073,
    "sfbc": 0,
    "sfbr": 0,
    "smallImage": "http://ecx.images-amazon.com/images/I/51NFIAHRfTL._SL75_.jpg",
    "title": "Wolfenstein II: The New Colossus: Prima Collector's Edition Guide",
    "upc": "9780744018301"
  }
]
```

6. Use `curl` to call the application to query data from the BigQuery `publicviews.ca_zip_codes` table in your lab project:
    

```apache
curl $CLOUD_RUN_SERVICE_URL/bq/$PROJECT_ID/publicviews/ca_zip_codes | jq .
```

This responds with the contents of a JSON file containing the results of the BigQuery SQL statement `SELECT * FROM publicviews.ca_zip_codes;`, which looks similar to this:

```json
[
  {
    "Zipcode": "94123",
    "area_land_miles": 1.024,
    "state_code": "CA"
  },
  {
    "Zipcode": "96090",
    "area_land_miles": 1.027,
    "state_code": "CA"
  },
  {
    "Zipcode": "94929",
    "area_land_miles": 1.062,
    "state_code": "CA"
  }
]
```

Go is a great language for use on Cloud Run mainly because of its portability and compile size. Even though Go is a statically typed compiled language, you can effectively access different data platforms in a modular way. Look at the details of the application container for this Go App.

Check Cloud Run application Deployment

**Check my progress**

**Take a closer look at the container**

1. In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Cloud Run**.
    
2. Click **gcp-data-drive** in the services list.
    

![gcp-data-drive highlighted in the Filter services list](https://cdn.qwiklabs.com/hgNpQe%2B2jO7rx3OJFm6OIhprg%2FfmBaVvLX3%2BK9FYL7Q%3D align="left")

3. Click the **Revisions** tab.
    

![The highlighted Revisions tab](https://cdn.qwiklabs.com/Pdv0Nw64O1wrMvqa03O3ahulaDufavlewqkymYpl2Z8%3D align="left")

4. In the right panel, in the **Container** tab, click the **Image URL**.
    

The **Container** pane includes the URL for the Container image to examine the image in the Container Registry.

![The Container pane](https://cdn.qwiklabs.com/3fsTlaXRdOiONzRvHYfLqua0d84LUuX5TMiHCwcEvCQ%3D align="left")

The Container Registry opens in a new browser tab at the **Image details** window.

![The Image details page open on the Overview tab](https://cdn.qwiklabs.com/fPrnTHtELJ8HvkxE6SLaFLN4KD74QAzfYNeZB9TfkR4%3D align="left")

As you can see from the virtual size, the container is small as it only contains the Go binary, which gives it the smallest security attack service possible. Go containers also make great Anthos services because they are small and easily portable across CPU and OS types. This makes them easily transferable from Cloud to on premise platforms, and vice versa.

### **Task 3. Deploy to Cloud Functions**

Cloud Functions is Google Cloud's event-driven serverless compute platform. When you combine Go and Cloud Functions, you get the best serverless has to offer in terms of fast spin up times and infinite scale so your application can have the best event driven response times possible.

Have a look at the source code and see how to reuse the Google Cloud Data Drive source code in a Cloud Function.

**Review the** `main` **function**

1. At the start of the `main` function in `DIY-Tools/gcp-data-drive/cmd/webserver/main.go`, you tell the web server to send all HTTP requests to the `gcpdatadrive.GetJSONData` Go function.
    

```apache
func main() {

    // Register the initial HTTP handler.
    http.HandleFunc("/", gcpdatadrive.GetJSONData)

    port := os.Getenv("PORT")
...
```

2. View the [`main` function in `main.go` on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cmd/webserver/main.go#L25-L28).
    

In a Cloud Function, the `main.go` is not used, instead the Cloud Function runtime is configured to send HTTP requests directly to the `gcpdatadrive.GetJSONData` Go function that is defined in the `DIY-Tools/gcp-data-drive/gcpdatadrive.go` file.

3. You can see how this is done by looking at how the Google Cloud Data Drive application is deployed to Cloud Functions using Cloud Build with `cloudbuild_gcf.yaml`:
    

**Note:** The comments have been removed for clarity.

!['GetJSONData' highlighted on the entrypoint line](https://cdn.qwiklabs.com/56nnsTXLKLVkCOKj0DPvaQZOiLDy067k6OiOOUU%2BW7w%3D align="left")

4. View the [`cloudbuild_gcf.yaml` on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cloudbuild_gcf.yaml#L15-L23).
    

These Cloud Build steps are also similar to those used to deploy the application to Cloud Run, but in this case, you deploy the application to Cloud Functions using the `gcloud functions deploy` command.

Notice that the Cloud Functions `--entrypoint` parameter is used to specify the `GetJSONData` function and not the `main` function in the main Go package that is used when it is deployed to App Engine or Cloud Run.

**Deploy the Google Cloud Data Drive app**

1. Assign the Cloud Functions service account the `roles/artifactregistry.reader` role to allow the Cloud Functions service account to read from Artifact Registry:
    

```apache
PROJECT_NUMBER=$(gcloud projects list --filter="PROJECT_ID=$PROJECT_ID" --format="value(PROJECT_NUMBER)")
SERVICE_ACCOUNT_EMAIL="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member "serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
    --role "roles/artifactregistry.reader"
```

2. Still in `DIY-Tools/gcp-data-drive`, deploy to Cloud Functions with Cloud Build:
    

```apache
gcloud builds submit --config cloudbuild_gcf.yaml --project $PROJECT_ID --no-source --substitutions=_GIT_SOURCE_BRANCH="master",_GIT_SOURCE_URL="https://github.com/GoogleCloudPlatform/DIY-Tools",_GCP_REGION="us-central1"
```

**Note:** If you get a 403 permission error, wait a minute and retry the build command. It typically takes a couple of minutes for the service account permissions to propagate.

3. Enter the following command to allow unauthorized access to the Google Cloud Data Drive Cloud Function:
    

```apache
gcloud alpha functions add-iam-policy-binding gcp-data-drive --member=allUsers --role=roles/cloudfunctions.invoker
```

4. Store the Cloud Functions HTTP Trigger URL in an environment variable:
    

```apache
export CF_TRIGGER_URL=$(gcloud functions describe gcp-data-drive --format="value(httpsTrigger.url)")
```

5. Use `curl` to call the application to query data from the Firestore `symbols` collection in your project:
    

```apache
curl $CF_TRIGGER_URL/fs/$PROJECT_ID/symbols/product/symbol | jq .
```

This responds with the contents of a JSON file containing the values from the `symbols` collection in your project .

```json
[
  {
    "asin": "",
    "brand": "",
    "category": "",
    "docid": "914600502073",
    "fbafees": 0,
    "lastMatchLookup": "0001-01-01T00:00:00Z",
    "listPrice": 0,
    "manufacturer": "",
    "pkgquantity": 0,
    "salesrank": 0,
    "smallImage": "",
    "title": "",
    "upc": "914600502073"
  },
  {
    "asin": "0744018307",
    "bbw": true,
    "brand": "",
    "category": "book_display_on_website",
    "cpip": 2000,
    "docid": "9780744018301",
    "fba": false,
    "fbafees": 722,
    "inStock": "NOW",
    "lastMatchLookup": "2020-03-13T14:00:10.209183Z",
    "lastOfferLookup": "2020-03-13T14:00:13.670858Z",
    "listPrice": 3999,
    "manufacturer": "Prima Games",
    "pkgquantity": 0,
    "salesrank": 337073,
    "sfbc": 0,
    "sfbr": 0,
    "smallImage": "http://ecx.images-amazon.com/images/I/51NFIAHRfTL._SL75_.jpg",
    "title": "Wolfenstein II: The New Colossus: Prima Collector's Edition Guide",
    "upc": "9780744018301"
  }
]
```

6. Use `curl` to call the application to query data from the BigQuery `publicviews.ca_zip_codes` table in your lab project:
    

```apache
curl $CF_TRIGGER_URL/bq/$PROJECT_ID/publicviews/ca_zip_codes
```

This responds with the contents of a JSON file containing the results of the BigQuery SQL statement `SELECT * FROM publicviews.ca_zip_codes;`.

```apache
[
  {
    "Zipcode": "96090",
    "area_land_miles": 1.027,
    "state_code": "CA"
  },
  {
    "Zipcode": "94929",
    "area_land_miles": 1.062,
    "state_code": "CA"
  }
]
```

Check Cloud Functions application Deployment

**Check my progress**

### **Task 4. Additional Cloud Functions triggers**

Cloud Functions has an event driven architecture. The app you deployed uses an HTTP request as an event. Explore the code of another Go app that takes in a different event type. The function is triggered on a Firestore write event.

The Go source code below is adapted from the [Go Code sample guide](https://cloud.google.com/functions/docs/calling/cloud-firestore#functions_firebase_firestore-go):

```go
package mygopackage

 import (
        "context"
        "fmt"
        "log"
        "time"

        "cloud.google.com/go/functions/metadata"
)

// FirestoreEvent is the payload of a Firestore event.
type FirestoreEvent struct {
        OldValue   FirestoreValue `json:"oldValue"`
        Value      FirestoreValue `json:"value"`
        UpdateMask struct {
                FieldPaths []string `json:"fieldPaths"`
        } `json:"updateMask"`
}

// FirestoreValue holds Firestore fields.
type FirestoreValue struct {
        CreateTime time.Time `json:"createTime"`
        Fields     interface{} `json:"fields"`
        Name       string      `json:"name"`
        UpdateTime time.Time   `json:"updateTime"`
}

// DoSomeThingOnWrite is triggered by
// a change to a Firestore document.
func DoSomeThingOnWrite(ctx context.Context, e FirestoreEvent) error {
        meta, err := metadata.FromContext(ctx)
        if err != nil {
                return fmt.Errorf("metadata.FromContext: %v", err)
        }
        // The variables e and meta contain
        // the information from the event
        // so now we can Go do some logic
        // work with the data. In this case
        // we are simply writing it to the log.

        log.Printf("Function triggered by change to: %v", meta.Resource)
        log.Printf("Old value: %+v", e.OldValue)
        log.Printf("New value: %+v", e.Value)
        return nil
}
```

View the [example source code on GitHub](https://github.com/GoogleCloudPlatform/golang-samples/blob/cf26d989155ce16db093f3e338f1b09a75f26e4a/functions/firebase/hello/firestore.go#L18-L59).

This example contains code that can be used to deploy Cloud Functions that handle Firestore events, instead of the HTTP request trigger used in the lab sample application. You register this function with a Cloud Firestore event trigger using `DoSomeThingOnWrite` as the Cloud Functions entrypoint.

Cloud Functions currently support the following event triggers.

![A list of event triggers](https://cdn.qwiklabs.com/8sIcIiqmJfZZ90oRpgPhKeRgFQd7q%2Fgxq%2B0ogFgCfoI%3D align="left")

The example above is a simple case, but you can imagine the potential. Simple Go Cloud Functions do tasks that used to come with the burden of managing an operating system. For example, you can use a function like this to run Data Loss Prevention (DLP) to sanitize data when a customer writes something to Cloud Firestore via a mobile app.

The Cloud Function could rewrite a summary report to Firestore for web consumption based on a pub/sub event. Any number of small processes that are event based are good candidates for Go Cloud Functions. Best of all, there are zero servers to patch.

### **Task 5. Deploy to App Engine**

App Engine is well suited for running Go applications. App Engine is a serverless compute platform that is fully managed to scale up and down as workloads fluctuate. Go applications are compiled to a single binary executable file during deployment. Go cold startup times for applications are often between 80 and 1400 in milliseconds and when running, App Engine can horizontally scale to meet the most demanding global scale workloads in seconds.

**Review the Cloud Build YAML config file**

The Cloud Build YAML file, `DIY-Tools/gcp-data-drive/cloudbuild_appengine.yaml,` shown below contains the Cloud Build step definitions that deploy your application to App Engine. You use this file to deploy the application to App Engine.

The first step executes the `git` command to clone the source repository that contains the application. This step is parameterized to allow you to easily switch between application branches.

The second step executes the `sed` command to replace the `runtime: go113` line in the `app.yaml` file with `runtime: go121`. This is necessary because the Go 1.13 runtime is deprecated and will be removed in the future. Note that this is just a patch to keep the app running. You should update the app to use the latest Go runtime in your own projects.

The third step executes the `gcloud app deploy` command to deploy the application to App Engine.

As with the other examples, you could manually deploy this app using `gcloud app deploy`, but Cloud Build allows you to offload this to Google infrastructure, for example if you want to create a serverless CI/CD pipeline.

**Note:** The comments from the file have been removed for clarity.

```bash
steps:
- name: 'gcr.io/cloud-builders/git'
  args: ['clone','--single-branch','--branch',
        '${_GIT_SOURCE_BRANCH}','${_GIT_SOURCE_URL}']

- name: 'ubuntu'  # Or any base image containing 'sed'
  args: ['sed', '-i', 's/runtime: go113/runtime: go121/', 'app.yaml'] # Replace go113 with go121
  dir: 'DIY-Tools/gcp-data-drive/cmd/webserver'

- name: 'gcr.io/cloud-builders/gcloud'
  args: ['app','deploy','app.yaml','--project','$PROJECT_ID']
  dir: 'DIY-Tools/gcp-data-drive/cmd/webserver'
```

View [`cloudbuild_appengine.yaml` on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cloudbuild_appengine.yaml#L15-L23).

**Deploy the Google Cloud Data Drive app**

1. Still in `DIY-Tools/gcp-data-drive`, deploy the Go webserver app to App Engine using Cloud Build:
    

```apache
gcloud builds submit  --config cloudbuild_appengine.yaml \
   --project $PROJECT_ID --no-source \
   --substitutions=_GIT_SOURCE_BRANCH="master",_GIT_SOURCE_URL="https://github.com/GoogleCloudPlatform/DIY-Tools"
```

Deployment takes a few minutes to complete.

2. Store the App Engine URL in an environment variable to use in the command to call the app:
    

**Note:** The App Engine URL is the `target url` in the output.

```apache
export TARGET_URL=https://$(gcloud app describe --format="value(defaultHostname)")
```

3. Use `curl` to call the application running on App Engine to query data from Firestore:
    

```apache
curl $TARGET_URL/fs/$PROJECT_ID/symbols/product/symbol | jq .
```

This responds with the contents of a JSON file containing three values from the `symbols` collection in your project.

```json
[
  {
    "asin": "",
    "brand": "",
    "category": "",
    "docid": "914600502073",
    "fbafees": 0,
    "lastMatchLookup": "0001-01-01T00:00:00Z",
    "listPrice": 0,
    "manufacturer": "",
    "pkgquantity": 0,
    "salesrank": 0,
    "smallImage": "",
    "title": "",
    "upc": "914600502073"
  },
  {
    "asin": "0744018307",
    "bbw": true,
    "brand": "",
    "category": "book_display_on_website",
    "cpip": 2000,
    "docid": "9780744018301",
    "fba": false,
    "fbafees": 722,
    "inStock": "NOW",
    "lastMatchLookup": "2020-03-13T14:00:10.209183Z",
    "lastOfferLookup": "2020-03-13T14:00:13.670858Z",
    "listPrice": 3999,
    "manufacturer": "Prima Games",
    "pkgquantity": 0,
    "salesrank": 337073,
    "sfbc": 0,
    "sfbr": 0,
    "smallImage": "http://ecx.images-amazon.com/images/I/51NFIAHRfTL._SL75_.jpg",
    "title": "Wolfenstein II: The New Colossus: Prima Collector's Edition Guide",
    "upc": "9780744018301"
  }
]
```

4. Use `curl` to call the app running on App Engine to query data from BigQuery:
    

```apache
curl $TARGET_URL/bq/$PROJECT_ID/publicviews/ca_zip_codes | jq .
```

This responds with the contents of a JSON file containing the results of the BigQuery SQL statement `SELECT * FROM publicviews.ca_zip_codes;`.

```apache
[
  {
    "Zipcode": "96090",
    "area_land_miles": 1.027,
    "state_code": "CA"
  },
  {
    "Zipcode": "94929",
    "area_land_miles": 1.062,
    "state_code": "CA"
  }
]
```

### Increase the load

Increase the load to see what happens.

1. Use the nano editor to create a simple shell script to put some load on the application:
    

```apache
nano loadgen.sh
```

2. Type or paste the following script into the editor:
    

```apache
#!/bin/bash
for ((i=1; i<=1000; i++)); do
   curl "$TARGET_URL/bq/$PROJECT_ID/publicviews/ca_zip_codes" > /dev/null &
done
```

3. Press **Ctrl+X**, **Y**, and then **Enter** to save the new file.
    
4. Make the script executable:
    

```apache
chmod +x loadgen.sh
```

5. Run the load test:
    

```apache
./loadgen.sh
```

6. In the Console, click **Navigation menu** &gt; **App Engine** &gt; **Instances**.
    

The Instances window opens and shows a summary of requests/second and a list of instances spawned when you ran the load test in Cloud Shell. Notice how App Engine automatically created additional app instances and distributed the incoming HTTP traffic.

![The Instances window displaying a list of instances](https://cdn.qwiklabs.com/7%2BPFWUuN8Pp%2FkoVDV7R1ki2FvrSaySm26zF1pq%2BhLRk%3D align="left")

**Note:** It may take 3 to 5 minutes for the Summary graph to show data. Don't forget to refresh the **Instances** window!

7. In Cloud Shell, press **Ctrl+C** to end the load test if it is still running.
    

Check App Engine application Deployment

---

### Solution of Lab

%[https://www.youtube.com/watch?v=iZXLFziQ3QI] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723177871705/929ac0bf-23a6-4506-b69c-d2b763807b1d.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Deploy%20Go%20Apps%20on%20Google%20Cloud%20Serverless%20Platforms/quicklabgsp702.sh
sudo chmod +x quicklabgsp702.sh
./quicklabgsp702.sh
```