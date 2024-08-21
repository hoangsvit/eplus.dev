---
title: "Deploy Kubernetes Load Balancer Service with Terraform - GSP233"
seoTitle: "Deploy Kubernetes Load Balancer Service with Terraform - GSP233"
seoDescription: "In Terraform, a Provider is the logical abstraction of an upstream API. This lab will show you how to set up a Kubernetes cluster and deploy Load Balancer t"
datePublished: Wed Aug 21 2024 08:12:22 GMT+0000 (Coordinated Universal Time)
cuid: cm03ksre100050aikegnb48x7
slug: deploy-kubernetes-load-balancer-service-with-terraform-gsp233
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724227230402/7508995d-129a-49e7-86e4-c9cc064af219.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724227930110/b8ebd463-7af5-4700-8b08-4400496862cb.png
tags: deploy-kubernetes-load-balancer-service-with-terraform-gsp233, gsp233

---

## **Overview**

In Terraform, a Provider is the logical abstraction of an upstream API. This lab will show you how to set up a Kubernetes cluster and deploy Load Balancer type NGINX service on it.

### Objectives

In this lab, you will learn how to:

* Deploy a Kubernetes cluster along with a service using Terraform
    

### Prerequisites

For this lab, you should have experience with the following:

* Familiarity with Kubernetes Services
    
* Familiarity with `kubectl` CLI.
    

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
    student-04-2cfd6ccbc3f8@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    EPt9joTZ1Q99
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-fa2b85037afb`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-fa2b85037afb
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
ACCOUNT: student-04-2cfd6ccbc3f8@qwiklabs.net

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
project = qwiklabs-gcp-00-fa2b85037afb
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Kubernetes services**

A service is a grouping of pods that are running on the cluster. Services are "cheap" and you can have many services within the cluster. Kubernetes services can efficiently power a microservice architecture.

Services provide important features that are standardized across the cluster: load-balancing, service discovery between applications, and features to support zero-downtime application deployments.

Each service has a pod label query which defines the pods which will process data for the service. This label query frequently matches pods created by one or more replication controllers. Powerful routing scenarios are possible by updating a service's label query via the Kubernetes API with deployment software.

## **Why Terraform?**

While you could use `kubectl` or similar CLI-based tools mapped to API calls to manage all Kubernetes resources described in YAML files, orchestration with Terraform presents a few benefits:

* **One language** - You can use the same [configuration language](https://www.terraform.io/docs/configuration/syntax.html) to provision the Kubernetes infrastructure and to deploy applications into it.
    
* **Drift detection** - `terraform plan` will always present you the difference between reality at a given time and the config you intend to apply.
    
* **Full lifecycle management** - Terraform doesn't just initially create resources, but offers a single command to create, update, and delete tracked resources without needing to inspect the API to identify those resources.
    
* **Synchronous feedback** - While asynchronous behavior is often useful, sometimes it's counter-productive as the job of identifying operation results (failures or details of created resource) is left to the user. e.g. you don't have the IP/hostname of the load balancer until it has finished provisioning, hence you can't create any DNS record pointing to it.
    
* [**Graph of relationships**](https://www.terraform.io/docs/internals/graph.html) - Terraform understands relationships between resources which may help in scheduling - e.g. Terraform won't try to create a service in a Kubernetes cluster until the cluster exists.
    

## **Task 1. Clone the sample code**

1. In Cloud Shell, start by cloning the sample code:
    

```apache
gsutil -m cp -r gs://spls/gsp233/* .
```

2. Navigate to the `tf-gke-k8s-service-lb` directory:
    

```apache
cd tf-gke-k8s-service-lb
```

## **Task 2. Understand the code**

1. Review the contents of the `main.tf` file:
    

```apache
cat main.tf
```

*Example output:*

```apache
  ...

variable "region" {
  type        = string
  description = "Region for the resource."
}

variable "location" {
  type        = string
  description = "Location represents region/zone for the resource."
}

variable "network_name" {
  default = "tf-gke-k8s"
}

provider "google" {
  region = var.region
}

resource "google_compute_network" "default" {
  name                    = var.network_name
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "default" {
  name                     = var.network_name
  ip_cidr_range            = "10.127.0.0/20"
  network                  = google_compute_network.default.self_link
  region                   = var.region
  private_ip_google_access = true
}
  ...
```

* Variables are defined for `region`, `zone`, and `network_name`. These will be used to create the Kubernetes cluster.
    
* The Google Cloud provider will let us create resources in this project.
    
* There are several resources defined to create the appropriate network and cluster.
    
* At the end, there are some outputs which you'll see after running `terraform apply`.
    

2. Review the contents of the `k8s.tf` file:
    

```apache
cat k8s.tf
```

*Example output:*

```apache
provider "kubernetes" {
  version = "~> 1.10.0"
  host    = google_container_cluster.default.endpoint
  token   = data.google_client_config.current.access_token
  client_certificate = base64decode(
    google_container_cluster.default.master_auth[0].client_certificate,
  )
  client_key = base64decode(google_container_cluster.default.master_auth[0].client_key)
  cluster_ca_certificate = base64decode(
    google_container_cluster.default.master_auth[0].cluster_ca_certificate,
  )
}

resource "kubernetes_namespace" "staging" {
  metadata {
    name = "staging"
  }
}

resource "google_compute_address" "default" {
  name   = var.network_name
  region = var.region
}

resource "kubernetes_service" "nginx" {
  metadata {
    namespace = kubernetes_namespace.staging.metadata[0].name
    name      = "nginx"
  }

  spec {
    selector = {
      run = "nginx"
    }

    session_affinity = "ClientIP"

    port {
      protocol    = "TCP"
      port        = 80
      target_port = 80
    }

    type             = "LoadBalancer"
    load_balancer_ip = google_compute_address.default.address
  }
}

resource "kubernetes_replication_controller" "nginx" {
  metadata {
    name      = "nginx"
    namespace = kubernetes_namespace.staging.metadata[0].name

    labels = {
      run = "nginx"
    }
  }

  spec {
    selector = {
      run = "nginx"
    }

    template {
      container {
        image = "nginx:latest"
        name  = "nginx"

        resources {
          limits {
            cpu    = "0.5"
            memory = "512Mi"
          }

          requests {
            cpu    = "250m"
            memory = "50Mi"
          }
        }
      }
    }
  }
}

output "load-balancer-ip" {
  value = google_compute_address.default.address
}
```

* The script configures a Kubernetes provider with Terraform and creates the service, namespace and a replication\_controller resource.
    
* The script returns an `nginx` service IP as an output.
    

## **Task 3. Initialize and install dependencies**

The `terraform init` command is used to initialize a working directory containing the Terraform configuration files.

This command performs several different initialization steps in order to prepare a working directory for use and is always safe to run multiple times, to bring the working directory up to date with changes in the configuration:

1. Run `terraform init`:
    

```apache
terraform init
```

*Example output:*

```apache
...
* provider.google: version = "~> 3.8.0"
* provider.kubernetes: version = "~> 1.10.0"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running `terraform plan` to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

2. Run the `terraform apply` command, which is used to apply the changes required to reach the desired state of the configuration:
    

```apache
terraform apply -var="region=us-west1" -var="location=us-west1-a"
```

3. Review Terraform's actions and inspect the resources which will be created.
    
4. When ready, type **yes** to begin Terraform actions.
    

On completion, you should see similar output:

*Example output:*

```apache
Apply complete! Resources: 7 added, 0 changed, 0 destroyed.

Outputs:

cluster_name = tf-gke-k8s
cluster_region = "us-west1"
cluster_zone = "us-west1"
load-balancer-ip = 35.233.177.223
network = https://www.googleapis.com/compute/beta/projects/qwiklabs-gcp-5438ad3a5e852e4a/global/networks/tf-gke-k8s
subnetwork_name = tf-gke-k8s
```

### Verify resources created by Terraform

1. In the console, navigate to **Navigation menu** &gt; **Kubernetes Engine**.
    
2. Click on `tf-gke-k8s` cluster and check its configuration.
    
3. In the left panel, click **Gateways, Services & Ingress** and check the `nginx` service status.
    
4. Click the **Endpoints** IP address to open the `Welcome to nginx!` page in a new browser tab.
    

![Welcome to nginx! page](https://cdn.qwiklabs.com/Buc5aDKVT5gyxV9dEn3ginoluom7aCsqZ0WlcVYh7GQ%3D align="left")

Click **Check my progress** to verify your performed task. If you have successfully deployed infrastructure with Terraform, you will see an assessment score.

Deploy infrastructure with Terraform

---

## Solution of Lab

%[https://www.youtube.com/watch?v=lIzrpddUWUQ] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724227553359/38d857a0-3d2d-45bd-aab9-d1cb5336d3cf.png align="center")

[https://cloud-google-com.translate.goog/compute/docs/regions-zones](https://cloud-google-com.translate.goog/compute/docs/regions-zones)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724227843209/24f62ebb-bd54-4edc-950c-776361dcc77e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724227894094/6449075b-58a1-42d4-a7dc-ec55da5cbd72.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Deploy%20Kubernetes%20Load%20Balancer%20Service%20with%20Terraform/quicklabgsp233.sh
sudo chmod +x quicklabgsp233.sh
./quicklabgsp233.sh
```