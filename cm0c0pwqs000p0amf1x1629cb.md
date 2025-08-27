---
title: "Cloud SQL with Terraform - GSP234"
seoTitle: "Cloud SQL with Terraform - GSP234"
seoDescription: "In this hands-on lab you will learn how to create Cloud SQL instances with Terraform, then set up the Cloud SQL Proxy, testing the connection with a MySQL c"
datePublished: Tue Aug 27 2024 06:00:13 GMT+0000 (Coordinated Universal Time)
cuid: cm0c0pwqs000p0amf1x1629cb
slug: cloud-sql-with-terraform-gsp234
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724738231706/04973667-4071-41f9-b48a-506a4a515c27.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724738394017/a950c8e3-9f73-4b1a-8832-27b6d72cb8c4.jpeg
tags: cloud-sql-with-terraform-gsp234

---

## **Overview**

In this hands-on lab you will learn how to create Cloud SQL instances with Terraform, then set up the Cloud SQL Proxy, testing the connection with a MySQL client.

### Objectives

In this lab, you will:

* Create a Cloud SQL instance
    
* Install the Cloud SQL Proxy
    
* Test connectivity with MySQL client using Cloud Shell
    

## **Setup**

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
    student-04-2af3977d1925@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    NcORmb676Xs6
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-fe55781c4b9f`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-fe55781c4b9f
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
ACCOUNT: student-04-2af3977d1925@qwiklabs.net

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
project = qwiklabs-gcp-01-fe55781c4b9f
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Cloud SQL

Cloud SQL is a fully managed database service that makes it easy to set up, maintain, manage, and administer your relational databases on Google Cloud. You can use Cloud SQL with either [MySQL](https://cloud.google.com/sql/docs/mysql/) or [PostgreSQL](https://cloud.google.com/sql/docs/postgres/).

## **Task 1. Download necessary files**

1. Create a directory and fetch the required Terraform scripts from the Cloud Storage bucket with:
    

```apache
mkdir sql-with-terraform
cd sql-with-terraform
gsutil cp -r gs://spls/gsp234/gsp234.zip .
```

2. Unzip the downloaded content:
    

```apache
unzip gsp234.zip
```

## **Task 2. Understand the code**

* Take a look at the contents of the `main.tf` file:
    

```apache
cat main.tf
```

**Example output:**

```apache
...
resource "google_sql_database_instance" "master" {
  name                 = "example-mysql-${random_id.name.hex}"
  project              = var.project
  region               = var.region
  database_version     = var.database_version
  master_instance_name = var.master_instance_name

  settings {
    tier                        = var.tier
    activation_policy           = var.activation_policy
    authorized_gae_applications = var.authorized_gae_applications
    disk_autoresize             = var.disk_autoresize
    dynamic "backup_configuration" {
      for_each = [var.backup_configuration]
      content {

        binary_log_enabled = lookup(backup_configuration.value, "binary_log_enabled", null)
        enabled            = lookup(backup_configuration.value, "enabled", null)
        start_time         = lookup(backup_configuration.value, "start_time", null)
      }
    }
    dynamic "ip_configuration" {
      for_each = [var.ip_configuration]
      content {

        ipv4_enabled    = lookup(ip_configuration.value, "ipv4_enabled", true)
        private_network = lookup(ip_configuration.value, "private_network", null)
        require_ssl     = lookup(ip_configuration.value, "require_ssl", null)

        dynamic "authorized_networks" {
          for_each = lookup(ip_configuration.value, "authorized_networks", [])
          content {
            expiration_time = lookup(authorized_networks.value, "expiration_time", null)
            name            = lookup(authorized_networks.value, "name", null)
            value           = lookup(authorized_networks.value, "value", null)
          }
        }
      }
    }
...
```

Next, you will update the `variables.tf` file to use the project ID and region allocatedß to this lab.

1. Click on **Open Editor** in Cloud Shell.
    
2. Open `variables.tf` and modify the `project` and `region` variables to the values shown below:
    

* project: `qwiklabs-gcp-01-fe55781c4b9f`
    
* region: `us-east4`
    

When finished save the changes made.

## **Task 3. Run Terraform**

The `terraform init` command is used to initialize a working directory containing Terraform configuration files.

This command performs several different initialization steps in order to prepare a working directory for use. This command is always safe to run multiple times, to bring the working directory up to date with changes in the configuration.

1. Run `terraform init`:
    

```apache
terraform init
```

The `terraform plan` command is an optional but recommended command and is used to create an execution plan. Terraform performs a refresh, unless explicitly disabled, and then determines what actions are necessary to achieve the desired state specified in the configuration files.

This command is a convenient way to check whether the execution plan for a set of changes matches your expectations without making any changes to real resources or to the state. For example, `terraform plan` might be run before committing a change to version control, to create confidence that it will behave as expected.

2. Run `terraform plan`:
    

```apache
terraform plan -out=tfplan
```

The optional `-out` argument can be used to save the generated plan to a file for later execution with `terraform apply`.

The `terraform apply` command is used to apply the changes required to reach the desired state of the configuration or the pre-determined set of actions generated by a `terraform plan` execution plan.

3. Apply the Terraform plan you just created:
    

```apache
terraform apply tfplan
```

This will take a little while to complete. Once complete you will see an output as below:

```apache
Apply complete! Resources: 5 added, 0 changed, 0 destroyed.

The state of your infrastructure has been saved to the path
below. This state is required to modify and destroy your
infrastructure, so keep it safe. To inspect the complete state
use the `terraform show` command.

State path: terraform.tfstate

Outputs:

generated_user_password = 
instance_address = 35.232.204.44
instance_address_time_to_retire =
instance_name = example-mysql-6808
self_link = https://www.googleapis.com/sql/v1beta4/projects/[PROJECT_ID]/instances/example-mysql-6808
```

### Test completed task

Click **Check my progress** to verify your performed task.

Assessment Completed!

Create Cloud SQL instance using Terraform script.

**Check my progress**

*Assessment Completed!*

## **Task 4. Cloud SQL Proxy**

### What the proxy provides

The Cloud SQL Proxy provides secure access to your Cloud SQL Second Generation instances without having to [allowlist IP addresses](https://cloud.google.com/sql/docs/mysql/configure-ip) or [configure SSL](https://cloud.google.com/sql/docs/mysql/configure-ssl-instance).

Accessing your Cloud SQL instance using the Cloud SQL Proxy offers these advantages:

* **Secure connections:** The proxy automatically encrypts traffic to and from the database using TLS 1.2 with a 128-bit AES cipher; SSL certificates are used to verify client and server identities.
    
* **Easier connection management:** The proxy handles authentication with Cloud SQL, removing the need to provide static IP addresses.
    

**Note:** You do not need to use the proxy or configure SSL to connect to Cloud SQL from App Engine standard or the flexible environment. These connections use a "built-in" proxy implementation automatically.

### How the Cloud SQL Proxy works

The Cloud SQL Proxy works by having a local client, called the proxy, running in the local environment. Your application communicates with the proxy with the standard protocol used by your database. The proxy uses a secure tunnel to communicate with its companion process running on the server.

The following diagram shows how the proxy connects to Cloud SQL:

![Proxy connection diagram, which includes the 3rd party and cloud SQL code within the cloud SQL and client machine.](https://cdn.qwiklabs.com/BEufWW4GnrS6Y29aGV5IH6w3%2F5QxbYk62b6hY5FLAiU%3D align="left")

## **Task 5. Installing the Cloud SQL Proxy**

1. Download the proxy:
    

```apache
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
```

2. Make the proxy executable:
    

```apache
chmod +x cloud_sql_proxy
```

You can install the proxy anywhere in your environment. The location of the proxy binaries does not impact where it listens for data from your application.

### Proxy startup options

When you start the proxy, you provide it with the following sets of information:

* What Cloud SQL instances it should establish connections to
    
* Where it will listen for data coming from your application to be sent to Cloud SQL
    
* Where it will find the credentials it will use to authenticate your application to Cloud SQL
    

The proxy startup options you provide determine whether it will listen on a TCP port or on a Unix socket. If it is listening on a Unix socket, it creates the socket at the location you choose; usually, the `/cloudsql/` directory. For TCP, the proxy listens on `localhost` by default.

## **Task 6. Test connection to the database**

1. Start by running the Cloud SQL proxy for the Cloud SQL instance:
    

```apache
export GOOGLE_PROJECT=$(gcloud config get-value project)
```

```apache
MYSQL_DB_NAME=$(terraform output -json | jq -r '.instance_name.value')
MYSQL_CONN_NAME="${GOOGLE_PROJECT}:us-east4:${MYSQL_DB_NAME}"
```

2. Run the following command:
    

```apache
./cloud_sql_proxy -instances=${MYSQL_CONN_NAME}=tcp:3306
```

Now you'll start another Cloud Shell tab by clicking on plus (**+**) icon. You'll use this shell to connect to the Cloud SQL proxy.

3. Navigate to `sql-with-terraform` directory:
    

```apache
cd ~/sql-with-terraform
```

4. Get the generated password for MYSQL:
    

```apache
echo MYSQL_PASSWORD=$(terraform output -json | jq -r '.generated_user_password.value')
```

5. Test the MySQL connection:
    

```apache
mysql -udefault -p --host 127.0.0.1 default
```

6. When prompted, enter the value of `MYSQL_PASSWORD`, found in the output above, and press **Enter**.
    
7. You should successfully log into the MYSQL command line. Exit from MYSQL by typing **Ctrl** + **D**.
    

If you go back to the first Cloud Shell tab you'll see logs for the connections made to the Cloud SQL Proxy.

## **Task 7. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**Which command is used to create a Terraform execution plan?**

* terraform plan
    
* terraform ini
    
* tterraform apply
    

**Submit**

**The Cloud SQL Proxy provides secure access to your Cloud SQL instances without having to allowlist IP addresses or configure SSL.**

* True
    
* False
    

---

## Solution of Lab

%[https://youtu.be/M35m46Q3GWM] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP234/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

**Script alternative**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Cloud%20SQL%20with%20Terraform/quicklabgsp234.sh
sudo chmod +x quicklabgsp234.sh
./quicklabgsp234.sh
```