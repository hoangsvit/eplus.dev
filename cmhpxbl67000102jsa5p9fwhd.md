---
title: "Use Go Code to Work with Google Cloud Data Sources - GSP701"
seoTitle: "Use Go Code to Work with Google Cloud Data Sources - GSP701"
seoDescription: "Learn to use Go to interact with Google Cloud services like BigQuery and Firestore. Deploy Go applications on App Engine effortlessly"
datePublished: Sat Nov 08 2025 06:48:52 GMT+0000 (Coordinated Universal Time)
cuid: cmhpxbl67000102jsa5p9fwhd
slug: use-go-code-to-work-with-google-cloud-data-sources-gsp701
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762584448892/80073d43-aada-43ef-9f68-1c13f462301d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762584502250/0210d081-79b1-4350-adb4-5038dfd3bb2c.png
tags: use-go-code-to-work-with-google-cloud-data-sources-gsp701, use-go-code-to-work-with-google-cloud-data-sources, gsp701

---

## Overview

Go is an open source programming language supported by Google that makes it easy to build **fast**, **reliable**, and **efficient** software at scale. In this lab you explore the basics of Go by compiling and testing a Go app interactively in Cloud Shell, and then deploying it to [App Engine](https://cloud.google.com/appengine). You then use the Go app to access data in [BigQuery](https://cloud.google.com/bigquery) and [Firestore](https://cloud.google.com/firestore).

### What you'll do

In this lab, you perform the following:

* Code review of the open source tool developed by Google
    
* Explore code patterns that extract data from Google Cloud
    
* Test your Go app from a browser
    
* Deploy your Go app to App Engine
    
* Test your deployed Go app from a browser or using `curl` commands
    

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
    student-02-23ebe5e2fc38@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ZckVvsimxYQS
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-1c9a0221f7a8`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-1c9a0221f7a8
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
ACCOUNT: student-02-23ebe5e2fc38@qwiklabs.net

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
project = qwiklabs-gcp-02-1c9a0221f7a8
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## What is Go?

Go (golang) is a general-purpose language designed with systems programming in mind. It is strongly typed and garbage-collected and has explicit support for concurrent programming. Programs are constructed from *packages*, whose properties allow efficient management of dependencies.

Go runs native on Google Cloud, and is fully supported on Google Kubernetes Engine, Compute Engine, App Engine, Cloud Run, and Cloud Functions. Google Cloud has open source client libraries for Google Cloud service which can be found on [GitHub](https://github.com/googleapis/google-cloud-go). Go is also used in production by thousands of enterprises, including some of Google Cloud's largest customers. Learn how enterprises develop with Go at [Go.dev](https://go.dev/).

Unlike Python and Javascript, Go is a compiled language and not interpreted. Go source code is compiled into machine code before execution. As a result, Go is typically faster and more efficient than interpreted languages and **does not** require a runtime like Node, Python, or JDK to execute.

### Build for any platform (OS/CPU) from any platform (OS/CPU)

The cross compile feature of Go streamlines the build process and makes Go one of the most portable languages in existence. You can build a Go program for any supported platform and CPU type, from any platform and CPU type. For example, if you are developing a Go program on OS X, you can simply change build parameters to build that application as an `.exe` file that will run on Windows. Cross compilation in Go simplifies CI/CD pipelines and testing.

### Function over construction

Go focuses on **function over construction**. This means you spend less time worrying about program construction and more time accomplishing project objectives.

### Keep it simple and consistent

A few simple commands are all you need to deploy your source code across a range of Google Cloud Serverless technologies. This makes it easy to deploy Go apps on Google Cloud.

#### Go Compatibility

Source code written in Go is expected to have a long life. For the specifics of Go compatibility, see [Go 1 and the Future of Go Programs](https://golang.org/doc/go1compat). In short, Go code written using the Go 1 guidelines will continue to compile and run for the lifetime of Go 1 (10 years and climbing).

## Deployment

Google Cloud offers [several options for running your code](https://cloud.google.com/hosting-options). In this introduction to running a basic Go app, you deploy and test a Go app interactively, in Cloud Shell, and on App Engine.

### App Engine

App Engine is well suited for running Go apps. App Engine is a serverless compute platform that is fully managed to scale up and down as workloads demand. Go apps are compiled to a single binary executable file during the deployment. Cold Start (zero instances running) request initial response times are often between 80 and 1400 milliseconds. Hot (at least 1 instance running ) requests are fulfilled immediately. Go apps running on App Engine give you the best of the cloud by being extremely efficient with CPU and memory resources at cloud scale with the App Engine service.

#### Architecture

The data flow architecture of a Go app deployed on App Engine looks like the diagram below:

![The Go Serverless data flow architecture.](https://cdn.qwiklabs.com/0eXopr3dfNf4e2r4%2BONt7u4AyI4N0DdLMdAPmVqZBPY%3D align="left")

### Google Cloud Data Drive source code

In this lab, you’ll deploy a sample Go app called Google Cloud Data Drive. This app is developed by Google to help developers extract data from Google Cloud quickly, and is one of a series of tools that demonstrate effective usage patterns for using Cloud APIs and services.

Google Cloud Data Drive leverages a composable URL path to retrieve data in JSON format from two supported Google Cloud data platforms: BigQuery and Firestore.

## Task 1. Prepare your environment

1. In Cloud Shell, enter the following command to create an environment variable to store the **Project ID** for this lab:
    

```apache
export PROJECT_ID=$(gcloud info --format="value(config.project)")
```

[Cloud Shell](https://cloud.google.com/shell) is developer ready and pre-configured with Go and many other languages.

2. Enter the following command in Cloud Shell to view the version:
    

```apache
go version
```

**Example output:**

```apache
go version go1.13 linux/amd64
```

3. Get the sample code for this lab by cloning the sample repository:
    

```apache
git clone https://github.com/GoogleCloudPlatform/DIY-Tools.git
```

### Prepare your databases

This lab uses sample data in BigQuery and Firestore to test your Go app.

#### BigQuery database

BigQuery is a serverless, future proof data warehouse with numerous features for machine learning, data partitioning, and segmentation. BigQuery lets you analyze gigabytes to petabytes of data using ANSI SQL at blazing-fast speeds, and with zero operational overhead.

The BigQuery dataset is a view of California zip codes and was created for you when the lab started.

#### Firestore database

Firestore is a serverless document database with super fast document lookup and real-time eventing features. It is also capable of a 99.999% SLA. To use data in Firestore to test your app, you must initialize Firestore in native mode, then import the sample data into a storage bucket.

* When the database is ready, in Cloud Shell run the following to launch a Firestore import job that provides sample Firestore data for the lab:
    

```apache
gcloud firestore import gs://$PROJECT_ID-firestore/prd-back
```

It takes a few minutes to import data into Firestore. The import process loads a Firestore backup of a collection called `symbols` into the `$PROJECT_ID-firestore` storage bucket. This is sample data that is common to retailers and contains UPC and product information.

While you wait, continue to the next section.

## Task 2. Review the Google Cloud Data Drive source code

In this lab you use the Google Cloud Data Drive application to demonstrate basic structure and effective usage patterns for using Go to access Cloud API's and services. Google Cloud Data Drive has been written not only for this lab but as something you could implement in your environment.

The Google Cloud Data Drive Go app leverages a simple composable URL path to retrieve data in JSON format from supported Google Cloud data platforms. The Google Cloud Data Drive app supports BigQuery and Firestore, but could be modified to support any data source. For more details see [Google Cloud Data Drive on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools).

### The `main.go` file

The `DIY-Tools/gcp-data-drive/cmd/webserver/main.go` file in the project is the entry point for the application. There is nothing special about the name `main.go`. The compiler is looking for the package `main` (below) and the function `main`.

To get familiar with the structure of a Go program, view the code in [this file in GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/master/gcp-data-drive/cmd/webserver/main.go).

**Package name:** The package name "main" is used when the source code is executed directly. There are some exceptions to this, but for now consider anything with a package name "main" to be the first source code to get executed. For more information, see [The Go Programming Language Specification for Packages](https://golang.org/ref/spec#Packages).

The package definition defines the package that this source file belongs to, in this case `main`:

```go
package main
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cmd/webserver/main.go#L15).

**Note:** Remember to return to these instructions when you have reviewed the code.

**Imports:** Import statements define what internal or external Go packages to use in the source code. A short path, like "log" or "net/http", indicates that the package is included in the Go installation. By contrast, an import of `github.com/foo` would cause Go to retrieve the external dependency from GitHub at build time. For a more detailed explanation of Go imports refer to [The Go Programming Language Specification for Import declarations](https://golang.org/ref/spec#Import_declarations).

This import statement lists the packages used for this app:

```go
import (
    "log"
    "net/http"
    "os"

    "github.com/GoogleCloudPlatform ... /gcpdatadrive"
)
```

**Note:** Some lines have been shortened for clarity. Refer to the source file in the GitHub repository for the complete syntax.

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cmd/webserver/main.go#L17-L23).

**Functions:** Go function declarations name a block of Go source code and defines inputs and outputs for that source. The combination of the function name, input parameters, and outputs are also known as the function signature. For more information, refer to [The Go Programming Language Specification on Function declarations](https://golang.org/ref/spec#Function_declarations).

#### The `main` function

The `main` function, shown below, is in the `DIY-Tools/gcp-data-drive/cmd/webserver/main.go` file.

The `func` keyword names a block of code. In this case "`main`" is the name of the function definition.

* It adds an HTTP handler that specifies the function `gcpdatadrive.GetJSONData`. This function processes and responds to HTTP traffic.
    
* It defines the access ports used to listen for HTTP requests, setting the default to 8080 (`port = 8080`).
    
* Tells you what to do: listen and respond to HTTP traffic, and if there's an error, log the error.
    

```go
func main() {

    // Register the initial HTTP handler.
    http.HandleFunc("/", gcpdatadrive.GetJSONData)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
        log.Printf("Defaulting to port %s", port)
    }

    log.Printf("Listening on port %s", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cmd/webserver/main.go#L25-L40).

With this very small block of Go code, you have created a very simple HTTP server.

### Connect to Cloud services with Go

In this section you explore how to connect to Google Cloud data platforms. The code needed to retrieve data from each data platform differs based on the underlying technology your code needs to access. This varies because the individual Google Cloud data platforms differ in the problems they solve and how the data they store is accessed.

**BigQuery** is a serverless, future proof data warehouse with numerous features for machine learning, data partitioning, and segmentation. This lets you analyze gigabytes to petabytes of data using ANSI SQL at blazing-fast speeds, and with zero operational overhead.

**Firestore** is a serverless document database, with super fast document lookup and real-time eventing features. It is also capable of a 99.999% SLA.

Go excels at masking the complexity that arises when working with different platforms like these while surfacing a simple API. You will explore that later; for now, look at how data are extracted from BigQuery using Go.

#### Getting Data from BigQuery

The `DIY-Tools/gcp-data-drive/bq.go` file contains the Go code that extracts data from BigQuery.

In this snippet notice the `b.query.Read()` statement. In this context, `b` represents a variable that was passed to this function as a pointer to a `bqdataplatform`. The variable `b` is a memory pointer to a struct of type `bqdataplatform` that has a property named `query`, and `query` has a function named `Read`.

**Note:** Refer to [Pointers](https://www.golang-book.com/books/intro/8) and [Structs](https://www.golang-book.com/books/intro/9#section1%3E) for more information.

```go
func (b *bqDataPlatform) getData(ctx context.Context) ([]byte, error) {
    // Call the read function to get the BQ iterator of the BigQuery rows.
    it, err := b.query.Read(ctx)
    if err != nil {
        return nil, err
    }
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/bq.go#L41-L46).

The call to the `Read` function returns results, so we collect those results and encode them to JSON.

In the following snippet, the `for` statement collects the results into a slice of map named `res`. Once the results are gathered they are encoded to JSON in the `return` statement.

```go
    // Create a map to hold our BigQuery results.
	res := []map[string]bigquery.Value{}

    // Add the BigQuery rows to a map string interface for marshaling.
    // TODO: This implementation builds and map in memory. The dataset size must fit in memory. Consider
    // providing callback fulfillment for large datasets leveraging pub/sub and GCS.
    for {
        row := make(map[string]bigquery.Value)
        err := it.Next(&row)

        if err != nil {
            if err == iterator.Done {
                break
            }
            return nil, err
        }
        res = append(res, row)
    }

    return json.Marshal(&res)
}
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/bq.go#L48-L68).

#### Getting data from Firestore

The `DIY-Tools/gcp-data-drive/fs.go` file contains the Go code that retrieves data from Firestore. This code is similar to the code used to get data from BigQuery in the previous section.

Firestore has the concept of a collection/document/collection/document pattern to store documents. In the case of Firestore we can get either just a single document or a list of documents in a collection.

```go
func (f *fsDataPlatform) getData(ctx context.Context) ([]byte, error) {

    // If the path is to a document, fulfill the request with the document.
    if f.isDoc {
        doc, err := f.client.Doc(f.itemPath).Get(ctx)
        if err != nil {
            return nil, err
        }
        docItem := doc.Data()
        return json.Marshal(&docItem)
    }

    // Otherwise the request is for a collection.
    q := f.client.Collection(f.itemPath)

    // Get all the documents in a single read. Only a single read is charged.
    docs, err := q.Documents(ctx).GetAll()
    if err != nil {
        return nil, err
    }

    // Create a map to hold our firestore result set.
    res := []map[string]interface{}{}

    for _, doc := range docs {
        // Adding the doc id to the result for ease of use.
        d := doc.Data()
        d["docid"] = doc.Ref.ID

        // Append the doc to the map so it can be marshaled.
        res = append(res, d)
    }

    return json.Marshal(res)
}
```

**Note:** View the code on [GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/fs.go#L40-L74).

### Go structs and interfaces

You've just seen how to pull data from a Cloud data platform such as BigQuery and Firestore. In this section look at the overall Go program structure and see how the demo application for this lab, Google Cloud Data Drive, is written in a modular way to support any number of underlying data platforms.

The Google Cloud Data Drive app is a JSON data service that retrieves data from either BigQuery or Firestore. You will deploy this service on App Engine later in this lab to see it in action. You use the following HTTP URL patterns to get data from Cloud platforms via `gcp-data-drive`.

* BigQuery: `https://<<host>>/bq/projectid/dataset/view`
    
* Firestore: `https://<<host>>/fs/projectid/collection/document...`
    

The host in these examples is the URL you use to access the server or service that `gcp-data-drive` runs on, or is deployed to.

1. Return to `DIY-Tools/gcp-data-drive/webserver/main.go` to walk through an HTTP request to see how this reusablity is accomplished.
    

Notice in the `func main()`the HTTP listener is specified by the `http.HandleFunc` function. This function takes two parameters: a path string and a function. Yes, functions can be parameters in Go. The `http.HandleFunc` function call defines the function that is used to process requests for the specified path. In this case, since the path is `"/"`, all HTTP requests are sent to a function in the `gcpdatadrive` module called `GetJSONData` and the request data, for example the full URL request path, are passed as parameters to that function.

```go
func main() {

    // Register the initial HTTP handler.
    http.HandleFunc("/", gcpdatadrive.GetJSONData)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
        log.Printf("Defaulting to port %s", port)
    }

    log.Printf("Listening on port %s", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cmd/webserver/main.go#L25-L40).

**Note:** It's worth noting that this very small Go HTTP server can be made to use https by simply calling `http.ListenAndServeTLS` and providing a `PEM` file containing the certificate you want to use.

2. Now take a look at the `DIY-Tools/gcp-data-drive/gcpdatadrive.go` file.
    

Interfaces in Go provide a way to specify the behavior of an object: if something can do this, then it can be used here. Interfaces with only one or two methods are common in Go code, and are usually given a name derived from the method, such as io.Writer for something that implements Write. For more information, see [The Go Programming Language Specification on Interface types](https://golang.org/ref/spec#Interface_types).

3. See the line `type dataplatform interface`.
    

A Go interface is arguably the most valuable feature in Go. In the case of `gcp-data-drive` a `dataPlatform interface` is created to group methods together. When a struct type is created in Go and it has the same methods as an interface, the struct type is said to have "implicitly implemented" the Go interface. More details will come later, for now just remember that Go interfaces are groups of methods and Go types implement Go interfaces implicitly.

```go
type dataPlatform interface {
    // getData returns the slice of bytes that have been marshaled from the underlying data source.
    getData(ctx context.Context) ([]byte, error)
    close() error
}
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/gcpdatadrive.go#L25-L29).

In this next code snippet, you see the definition of the `GetJSONData` function. This function was referenced in `main.go` as the code to be used as the HTTP handler function.

`GetJSONData` takes an `http.ResponseWriter` and a `http.Request` as parameters. Each time an HTTP request is received in the main function, this `GetJSONData` function is called.

Notice the line `conParams, err := parseDDURL(r)`. This line calls another function, `parseDDURL`, that parses the URL contained in the parameter r, which is an `http.Request`.

Line `pd, err := parseDataPlatform(r.Context(), conParams)`, calls the `parseDataPlatform` function:

```go
func GetJSONData(w http.ResponseWriter, r *http.Request) {

    // Parse the request URL.
    conParams, err := parseDDURL(r)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    // Parse the platform interface from the URL path.
    pd, err := parseDataPlatform(r.Context(), conParams)
    defer pd.close()
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    // Get the []byte results from the requested data platform.
    bts, err := pd.getData(r.Context())
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    // Setting the default content-type header to JSON.
    w.Header().Add("Content-Type", "application/json")

    // Writing the bytes to the IO writer.
    w.Write(bts)

}
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/gcpdatadrive.go#L31-L61).

The `parseDataPlatform` function identifies the data platform and returns the function that is used to query data from that platform or provide an error message detailing the platforms that are supported.

Go has a switch flow control statement as you might expect in any language. In this case you are switching on the platform indicator provided in the URL. Remember the request format that the `gcp-data-drive` application expects is in the format `https://<host>/<platform>/...` and the `<platform>` position in the URL determines which function to call, `newBQPlatform()` for BigQuery or `newFSPlatform()` for Firestore. The source of these functions are in `bq.go` and `fs.go`.

Pay attention to the return statements of the `parseDataPlatform()` function. Each of these methods return different Go types, but because each data platform type implicitly implements the methods of the dataplatform interface, you can return it to the `GetJSONData` function.

```go
func parseDataPlatform(ctx context.Context, p *dataConnParam) (dataPlatform, error) {

    switch p.platform {
    case "bq":
        return newBQPlatform(ctx, p)

    case "fs":
        return newFSPlatform(ctx, p)

    }

    return nil, fmt.Errorf(`unknown data platform %q: bigquery ("bq") and firestore ("fs") supported`, p.platform)
}
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/gcpdatadrive.go#L64-L76).

Back in the `GetJSONData` function, be sure that your `getData` method is available because it is required for the `dataPlatform` interface:

```go
    bts, err := pd.getData(r.Context())
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/gcpdatadrive.go#L49-L53).

Go interfaces are a big topic, and this lab merely scratches the surface. The key takeaway is that even though Go is a statically typed and compiled language, using Go interfaces can make modular programs and services that maximize code reuse.

To see additional data platform support, feel free to [create an issue](https://github.com/GoogleCloudPlatform/DIY-Tools/issues/new) or submit a pull request on GitHub.

## Task 3. Check the import process

* Look in Cloud Shell to see if the import process loading the data into Filestore has finished.
    

Import data into Firestore

## Task 4. Compile and run Google Cloud Data Drive application in Cloud Shell

This section shows how easy it is to interactively compile and run Go apps.

1. In Cloud Shell, change to the directory for the application that you cloned from GitHub:
    

```apache
cd ~/DIY-Tools/gcp-data-drive/cmd/webserver
```

2. Compile the application:
    

```apache
go build -mod=readonly -v -o gcp-data-drive
```

This saves the compiled application into the `gcp-data-drive` binary in the current directory. Since this is the first use of go build on this machine, you see Go download and provision several external libraries. Each library is cached so additional builds are fast. Run the same command again and notice the difference.

3. Run the application locally to test it interactively:
    

```apache
./gcp-data-drive
```

Leave the application running in this Cloud Shell tab.

## Task 5. Test the application in your browser

The Google Cloud Data Drive app responds to HTTP requests, parsing the request URL to extract parameters about the target Cloud data service. Once the application has those parameters it queries the required platform and returns data in JSON format.

These HTTP URL patterns are used to get data from Google Cloud using the Google Cloud Data Drive app.

* Firestore : `[SERVICE_URL]/fs/[PROJECT_ID]/[COLLECTION]/[DOCUMENT]`
    
* BigQuery: `[SERVICE_URL]/bq/[PROJECT_ID]/[DATASET]/[TABLE]`
    

Where:

| **Parameter** | **Description** |
| --- | --- |
| \[SERVICE URL\] | The base URL for the application from App Engine or Cloud In this case, local running of the application, it is the first part of the URL from the **Web Preview**, similar to this: |
| \[PROJECT ID\] | The **Project ID** of the Firestore Collection or BigQuery Dataset you want to access. You find the **Project ID** in the left panel in your lab. |
| \[COLLECTION\] | The Firestore Collection ID (`symbols/product`) |
| \[DOCUMENT\] | The Firestore Document you would like to query (`symbol`) |
| \[DATASET\] | The BigQuery Dataset name (`publicviews`) |
| \[TABLE\] | The BigQuery Table name (`ca_zip_codes`) |

**Note:** Although in the next sections you use Cloud Shell to create your URL to test the app, you can create the URLs yourself for an added functionality test in a browser.

### Query Firestore using Google Cloud Data Drive

1. In the Cloud Shell toolbar, click the **+** icon next to the first Cloud Shell tab to open a second Cloud Shell tab.
    

![The Add icon highlighted within the browser ribbon.](https://cdn.qwiklabs.com/sRSUmf1EXcRa2wtQqUmC6bzE1v9bC%2F6KktiUZLvYHP0%3D align="left")

2. Enter the following command to create an environment variable to store the **Project ID** for this lab:
    

```apache
export PROJECT_ID=$(gcloud info --format="value(config.project)")
```

3. Click the **Web Preview** button and select **Preview on port 8080** in your Cloud Shell tab.
    

This will open a new browser tab with Cloud Shell's service url.

4. Copy the service url (your web preview page) without the `/?authuser=0` at the end.
    

What you copy will look similar to this:

```apache
https://8080-46fc6e69-64ff-46b6-99e3-65bc89c2ac0b.ql-us-west1-ckmj.cloudshell.dev
```

**Note:** Ensure you don't copy a trailing slash.

5. Return to your Cloud Shell terminal and paste the URL into a variable:
    

```apache
export PREVIEW_URL=[REPLACE_WITH_WEB_PREVIEW_URL]
```

6. Run the following command in the second Cloud Shell tab to generate the test URL that will access the application running in the first Cloud Shell tab, which queries the Firestore `symbols/product/symbol` collection:
    

```apache
echo $PREVIEW_URL/fs/$PROJECT_ID/symbols/product/symbol
```

The Web Preview URL is output and looks similar to this:

```apache
https://8080-46fc6e69-64ff-46b6-99e3-65bc89c2ac0b.ql-us-west1-ckmj.cloudshell.dev/fs/qwiklabs-gcp-02-ade214b7db85/symbols/product/symbol
```

**Note:** Your URL has a different `Service_URL` and `Project_ID`.

7. Click the Web Preview URL.
    

This URL opens in a new browser tab, and is redirected to the Web Preview for Cloud Shell with the fully composed URL. This composed URL queries the `symbols/products/symbol` Firestore collection in your project.

The following is a portion of the data you should see returned:

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

### Query BigQuery using Google Cloud Data Drive

1. In the browser tab that queried the Firestore collection, update the URL. Replace:
    

* `fs` with `bq`
    
* `symbols/product/symbol` with `publicviews/ca_zip_codes?authuser=0&environment_name=default` for the sample BigQuery table that is included in the lab for testing.
    

The URL should look something like this:

```apache
https://8080-dot-11434904-dot-devshell.appspot.com/bq/qwiklabs-gcp-02-f4eec1e17694/publicviews/ca_zip_codes?authuser=0&environment_name=default
```

**Note:** Remember, your URL has a different `Service_URL` and `Project_ID`.

You should see a page of results containing JSON data similar to the following:

Test Google Cloud Data Drive in Cloud Shell by querying data in BigQuery

2. Close the preview browser tab.
    
3. Close the second Cloud Shell tab.
    
4. Back in the first Cloud Shell tab, and press **Ctrl+C** to stop the Google Cloud Data Drive application.
    

Go makes the complex simple. One of Go's strengths is masking complexity (in this case Google Cloud access) into simple to use building blocks.

## Task 6. Deploy to App Engine

One of the most valuable features of Go is its portability. In this section you deploy the Google Cloud Data Drive app to App Engine without making any changes to the code. Deploying to App Engine allows you to maintain a running copy of your application without having to manage server infrastructure.

### Examine the source code

To deploy a Go app to App Engine standard environment, you must provide an `app.yaml` file containing the application's service configuration settings. For the Google Cloud Data Drive application, the `DIY-Tools/gcp-data-drive/cmd/webserver/app.yaml` file contains the following:

```apache
runtime: go113

handlers:
- url: /.*
  secure: always
  script: auto

env_variables:
  PORT: "8080"
```

[View the code on GitHub](https://github.com/GoogleCloudPlatform/DIY-Tools/blob/21f62b69ce1ae14df1d5d17fd9cb06bec657814a/gcp-data-drive/cmd/webserver/app.yaml#L15-L23).

This specifies the Go runtime to be used, which URL requests to handle, and which port to redirect inbound web requests to. The Google Cloud Data Drive app sets its HTTP listener port to the value of the PORT environment variable. App Engine requires applications to listen on port 8080.

### Deploy the Google Cloud Data Drive app

1. In Cloud Shell, make sure you're still in the directory for the app you cloned from GitHub:
    

```apache
cd ~/DIY-Tools/gcp-data-drive/cmd/webserver
```

2. Use sed command to upgrade your `Go runtime` verison in **app.yaml** file:
    

```apache
sed -i 's/runtime: go113/runtime: go122/' app.yaml
```

3. Deploy the Google Cloud Data Drive app to App Engine:
    

```apache
gcloud app deploy app.yaml --project $PROJECT_ID -q
```

The deployment takes up to 2 minutes.

**Note:** The `target url` in the output is the endpoint of the application, which you will use to test the application.

4. Store the App Engine URL in an environment variable to use when you test the application:
    

```apache
export TARGET_URL=https://$(gcloud app describe --format="value(defaultHostname)")
```

This command extracts the `target url` for the first application in your project and stores it in an environment variable.

Deploy Google Cloud Data Drive to App Engine

### Test the application

You deployed the application to App Engine, now try it out.

#### Access the application in your browser

* To access the application in your browser, construct the URL in the same way as you did when you access the application locally:
    
* Firestore: `[SERVICE_URL]/fs/[PROJECT_ID]/[COLLECTION]/[DOCUMENT]`
    
* BigQuery: `[SERVICE_URL]/bq/[PROJECT_ID]/[DATASET]/[TABLE]`
    

**Note:** Notice the change in the `[SERVICE_URL]`

Where:

| **Parameter** | **Description** |
| --- | --- |
| \[SERVICE URL\] | The base URL for the application from App Engine or Cloud In this case, running the application on App Engine, it is the `target url` you noted when you deployed the application. It looks like this: |
| \[PROJECT ID\] | The **Project ID** of the Firestore Collection or BigQuery Dataset you want to access. You find the **Project ID** in the left panel in your lab. |
| \[COLLECTION\] | The Firestore Collection ID (`symbols/product`) |
| \[DOCUMENT\] | The Firestore Document you would like to query (`symbol`) |
| \[DATASET\] | The BigQuery Dataset name (`publicviews`) |
| \[TABLE\] | The BigQuery Table name (`ca_zip_codes`) |

#### Access the application with the `curl` command

1. Use `curl` to call the application running on App Engine to query data from Firestore:
    

```apache
curl $TARGET_URL/fs/$PROJECT_ID/symbols/product/symbol
```

This returns the same data that you saw previously in the preview browser window:

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

2. Drill down to see the UPC data for a product in the Firestore product collection:
    

```apache
curl $TARGET_URL/fs/$PROJECT_ID/symbols/product/symbol/008888166900
```

You should see the following data returned:

```json
{
  "asin": "B0090PX7VU",
  "bbw": true,
  "brand": "",
  "category": "video_games_display_on_website",
  "cpip": 1899,
  "fba": false,
  "fbafees": 430,
  "inStock": "NOW",
  "lastMatchLookup": "2020-03-13T14:00:11.527874Z",
  "lastOfferLookup": "2020-03-13T14:00:13.129947Z",
  "listPrice": 2999,
  "manufacturer": "UBI Soft",
  "pkgquantity": 0,
  "salesrank": 41119,
  "sfbc": 1238,
  "sfbr": 0.99,
  "smallImage": "http://ecx.images-amazon.com/images/I/6163nx-IKkL._SL75_.jpg",
  "title": "Imagine Fashion Life - Nintendo 3DS",
  "upc": "008888166900"
}
```

3. Use curl to call the application running on App Engine to query data from BigQuery:
    

```apache
curl $TARGET_URL/bq/$PROJECT_ID/publicviews/ca_zip_codes
```

This returns the same data that you saw previously in the preview browser window:

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

Test Google Cloud Data Drive running on App Engine

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP701/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/5KVqgXro82o] 

**Task 5**

```apache
$PREVIEW_URL/bq/$PROJECT_ID/publicviews/ca_zip_codes
```