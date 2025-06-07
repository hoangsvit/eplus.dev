---
title: "Build and Execute MySQL, PostgreSQL, and SQLServer to Data Catalog Connectors - GSP814"
seoTitle: "Build and Execute MySQL, PostgreSQL, and SQLServer to Data Catalog Con"
seoDescription: "Dataplex is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data ware"
datePublished: Thu Apr 04 2024 01:35:07 GMT+0000 (Coordinated Universal Time)
cuid: clukkehls000508l2cyinhmpo
slug: build-and-execute-mysql-postgresql-and-sqlserver-to-data-catalog-connectors-gsp814
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749287794648/f9c6dc59-dae3-4acb-8d53-4b5c46167ce2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749287802711/d4d607fe-109a-4ae7-b657-54035b664017.png
tags: sql-server, postgresql, mysql, build-and-execute-mysql-postgresql-and-sqlserver-to-data-catalog-connectors-gsp814, build-and-execute-mysql-postgresql-and-sqlserver-to-data-catalog-connectors, gsp814

---

## Overview

[Dataplex Universal Catalog](https://cloud.google.com/dataplex) is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale.

[Data Catalog](https://cloud.google.com/data-catalog/docs/concepts/overview) is a fully managed, scalable metadata management service within Dataplex Universal Catalog. It offers a simple and easy-to-use search interface for data discovery, a flexible and powerful cataloging system for capturing both technical and business metadata, and a strong security and compliance foundation with Cloud Data Loss Prevention (part of Sensitive Data Protection) and Identity and Access Management (IAM) integrations.

### Using Data Catalog

Using Data Catalog within Dataplex Universal Catalog, you can search for assets to which you have access, and you can tag data assets to support discovery and access control. Tags allow you to attach custom metadata fields to specific data assets for easy identification and retrieval (such as tagging certain assets as containing protected or sensitive data); you can also create reusable tag templates to rapidly assign the same tags to different data assets.

### What you'll learn

In this lab, you learn how to:

* Enable the Data Catalog API.
    
* Configure Dataplex Universal Catalog connectors for PostgreSQL and MySQL.
    
* Search for PostgreSQL and MySQL entries in Data Catalog within Dataplex Universal Catalog.
    

### Prerequisites

**Note:** Before starting this lab, log out of your personal or corporate gmail account, or run this lab in Incognito. This prevents sign-in confusion while the lab is running.

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
    student-04-ac7af5164ab1@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    8I32kQjyDTrC
    ```
    
    Copied!content\_copy
    
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-e95a618039b3`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-e95a618039b3
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!content\_copy

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-ac7af5164ab1@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!content\_copy

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-e95a618039b3
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Enable the Data Catalog API

1. In the Google Cloud console, click on the **Navigation menu** () &gt; **APIs & Services** &gt; **Library**.
    
2. In the search bar, enter `Data Catalog`, and select the `Google Cloud Data Catalog API`.
    
3. Click **Enable**.
    

**Note:** If you run into an "Action Failed" error after trying to enable the Data Catalog API, try the following steps: click **close**, refresh your browser tab, then click **Enable** again.

Click **Check my progress** to verify the objective.

Enable the Data Catalog API

**Check my progress**

## Task 2. Connect PostgreSQL to Dataplex Universal Catalog

### Create a variable for Project ID

* In Cloud Shell, run the following command to set your Project ID as an environment variable:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
```

Copied!content\_copy

### Create the PostgreSQL Database

1. Run the following command to clone the Github repository:
    

```apache
gsutil cp gs://spls/gsp814/cloudsql-postgresql-tooling.zip .
unzip cloudsql-postgresql-tooling.zip
```

Copied!content\_copy

2. Next, change your current working directory to the cloned repo directory:
    

```apache
cd cloudsql-postgresql-tooling/infrastructure/terraform
```

Copied!content\_copy

3. Run the following commands to change the region and zone from `us-central1` and `us-central1-a` to your default assigned region and zone:
    

```apache
export REGION=us-west1
sed -i "s/us-central1/$REGION/g" variables.tf
```

Copied!content\_copy

```apache
export ZONE=us-west1-a
sed -i "s/$REGION-a/$ZONE/g" variables.tf
```

Copied!content\_copy

4. Next, execute the `init-db.sh` script:
    

```apache
cd ~/cloudsql-postgresql-tooling
bash init-db.sh
```

Copied!content\_copy

This will create your PostgreSQL instance and populate it with a random schema. This can take `around 10 to 15 minutes` to complete.

**Note:** If you get an `Error: Failed to load "tfplan" as a plan file`, re-run the `init-db` script.

Soon after you should receive the following output:

```apache
CREATE TABLE factory_warehouse69945.home17e97c57 ( house57588 DATE, paragraph64180 SMALLINT, ip_address61569 JSONB, date_time44962 REAL, food19478 JSONB, state8925 VARCHAR(25), cpf75444 REAL, date_time96090 SMALLINT, reason7955 CHAR(5), phone_number96292 INT, size97593 DATE, date_time609 CHAR(5), location70431 DATE )
 COMPLETED
```

Click **Check my progress** to verify the objective.

Create the PostgreSQL Database

**Check my progress**

### Set up the Service Account

1. Create a Service Account:
    

```apache
gcloud iam service-accounts create postgresql2dc-credentials \
--display-name  "Service Account for PostgreSQL to Data Catalog connector" \
--project $PROJECT_ID
```

Copied!content\_copy

2. Next, create and download the Service Account Key:
    

```apache
gcloud iam service-accounts keys create "postgresql2dc-credentials.json" \
--iam-account "postgresql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com"
```

Copied!content\_copy

3. Next, add Data Catalog admin role to the Service Account:
    

```apache
gcloud projects add-iam-policy-binding $PROJECT_ID \
--member "serviceAccount:postgresql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com" \
--quiet \
--project $PROJECT_ID \
--role "roles/datacatalog.admin"
```

Copied!content\_copy

Click **Check my progress** to verify the objective.

Create a Service Account for PostgreSQL

**Check my progress**

### Execute PostgreSQL to Dataplex Universal Catalog connector

You can build the PostgreSQL connector yourself by going to [this GitHub repository](https://github.com/GoogleCloudPlatform/datacatalog-connectors-rdbms/tree/master/google-datacatalog-postgresql-connector).

To facilitate its usage, this lab uses a docker image.

The variables needed were output by the Terraform config.

1. Change directories into the location of the Terraform scripts:
    

```apache
cd infrastructure/terraform/
```

Copied!content\_copy

2. Grab the environment variables:
    

```apache
public_ip_address=$(terraform output -raw public_ip_address)
username=$(terraform output -raw username)
password=$(terraform output -raw password)
database=$(terraform output -raw db_name)
```

Copied!content\_copy

3. Change back to the root directory for the example code:
    

```apache
cd ~/cloudsql-postgresql-tooling
```

Copied!content\_copy

4. Execute the connector:
    

```apache
docker run --rm --tty -v \
"$PWD":/data mesmacosta/postgresql2datacatalog:stable \
--datacatalog-project-id=$PROJECT_ID \
--datacatalog-location-id=$REGION \
--postgresql-host=$public_ip_address \
--postgresql-user=$username \
--postgresql-pass=$password \
--postgresql-database=$database
```

Copied!content\_copy

Soon after you should receive the following output:

```apache
============End postgresql-to-datacatalog============
```

Click **Check my progress** to verify the objective.

Execute PostgreSQL to Data Catalog connector

**Check my progress**

### Check the results of the script

1. Navigate to **Dataplex Universal Catalog** in the Google Cloud console by clicking on the **Navigation menu** () &gt; **View all products** &gt; **Analytics** &gt; **Dataplex Universal Catalog**.
    
2. Click on **Catalog** then **Aspect types & Tag Templates**.
    

You should see the following postgresql Tag Templates:

![Postgresql Table - Metadata and Postgresql Schema - Metadata](https://cdn.qwiklabs.com/U3HpDjBWCB4CNBVpBXV3F%2BLYxmPwC3TT%2Bj4hcmdIQNc%3D align="left")

3. Click on **Entry groups**.
    

You should see the following postgresql Entry Group:

![postgresql](https://cdn.qwiklabs.com/kL6jpMObPm8op%2BBa78399kBKamyhdYmlNVswGKR%2Fmxw%3D align="left")

4. Now click on the `postgresql` Entry Group. Your console should resemble the following:
    

![postgresql Entry Group entries](https://cdn.qwiklabs.com/KCTQegrPb5lvYDZIDXoBZaL%2FIgeMWu830VznULEZL3M%3D align="left")

This is the real value of an Entry Group — you can see all entries that belong to postgresql using the UI.

5. Click on one of the `warehouse` entries. Look at the Custom entry details and tags:
    

![Custom entry details tabbed page](https://cdn.qwiklabs.com/647Ki3cjUJO%2BRy1%2Bl4OKVxWHgLG9bm3bJ5tHhZ7olC0%3D align="left")

This is the real value the connector adds—it allows you to have the metadata searchable in Dataplex Universal Catalog.

### Clean up

1. To delete the created resources, run the following command to delete the PostgreSQL metadata:
    

```apache
./cleanup-db.sh
```

Copied!content\_copy

2. Now execute the cleaner container:
    

```apache
docker run --rm --tty -v \
"$PWD":/data mesmacosta/postgresql-datacatalog-cleaner:stable \
--datacatalog-project-ids=$PROJECT_ID \
--rdbms-type=postgresql \
--table-container-type=schema
```

Copied!content\_copy

3. Finally, delete the PostgreSQL database:
    

```apache
./delete-db.sh
```

Copied!content\_copy

4. From the **Dataplex Universal Catalog** menu, under **Discover**, click on the **Search** page.
    
5. In the search bar, enter **PostgreSQL** and click **Search**.
    

You no longer see the PostgreSQL Tag Templates in the results:

![Search results: 0 rows to display](https://cdn.qwiklabs.com/7Ktrtq%2BFWFHQJ6TNQYGkC0L4981bLL3aFrHhrWEd0qI%3D align="left")

Ensure you see the following output in Cloud Shell before you move on:

```apache
  Cloud SQL Instance deleted
  COMPLETED
```

Next, you learn how to do the same thing with a MySQL instance.

## Task 3. Connect MySQL to Dataplex Universal Catalog

### Create the MySQL database

1. Run the following command in Cloud Shell to return to your home directory:
    

```apache
cd
```

Copied!content\_copy

2. Run the following command to download the scripts to create and populate your MySQL instance:
    

```apache
gsutil cp gs://spls/gsp814/cloudsql-mysql-tooling.zip .
unzip cloudsql-mysql-tooling.zip
```

Copied!content\_copy

3. Now change your current working directory to the cloned repo directory:
    

```apache
cd cloudsql-mysql-tooling/infrastructure/terraform
```

Copied!content\_copy

4. Run the following commands to change the region and zone from `us-central1` and `us-central1-a` to your default assigned region and zone:
    

```apache
export REGION=us-west1
sed -i "s/us-central1/$REGION/g" variables.tf
```

Copied!content\_copy

```apache
export ZONE=us-west1-a
sed -i "s/$REGION-a/$ZONE/g" variables.tf
```

Copied!content\_copy

5. Next execute the `init-db.sh` script:
    

```apache
cd ~/cloudsql-mysql-tooling
bash init-db.sh
```

Copied!content\_copy

This creates your MySQL instance and populate it with a random schema. After a few minutes, you should receive the following output:

```apache
CREATE TABLE factory_warehouse14342.persons88a5ebc4 ( address9634 TEXT, cpf12934 FLOAT, food88799 BOOL, food4761 LONGTEXT, credit_card44049 FLOAT, city8417 TINYINT, name76076 DATETIME, address19458 TIME, reason49953 DATETIME )
 COMPLETED
```

**Note:** If you get an `Error: Failed to load "tfplan" as a plan file`, re-run the `init-db` script.

Click **Check my progress** to verify the objective.

Create the MySQL Database

**Check my progress**

### Set up the Service Account

1. Run the following to create a Service Account:
    

```apache
gcloud iam service-accounts create mysql2dc-credentials \
--display-name  "Service Account for MySQL to Data Catalog connector" \
--project $PROJECT_ID
```

Copied!content\_copy

2. Next, create and download the Service Account Key:
    

```apache
gcloud iam service-accounts keys create "mysql2dc-credentials.json" \
--iam-account "mysql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com"
```

Copied!content\_copy

3. Next add Data Catalog admin role to the Service Account:
    

```apache
gcloud projects add-iam-policy-binding $PROJECT_ID \
--member "serviceAccount:mysql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com" \
--quiet \
--project $PROJECT_ID \
--role "roles/datacatalog.admin"
```

Copied!content\_copy

Click **Check my progress** to verify the objective.

Create a Service Account for MySQL

**Check my progress**

### Execute MySQL to Dataplex Universal Catalog connector

You can build the MySQL connector yourself by going to [this GitHub repository](https://github.com/GoogleCloudPlatform/datacatalog-connectors-rdbms/tree/master/google-datacatalog-mysql-connector).

To facilitate its usage, this lab uses a docker image.

The variables needed were output by the Terraform config.

1. Change directories into the location of the Terraform scripts:
    

```apache
cd infrastructure/terraform/
```

Copied!content\_copy

2. Grab the environment variables:
    

```apache
public_ip_address=$(terraform output -raw public_ip_address)
username=$(terraform output -raw username)
password=$(terraform output -raw password)
database=$(terraform output -raw db_name)
```

3. Change back to the root directory for the example code:
    

```apache
cd ~/cloudsql-mysql-tooling
```

4. Execute the connector:
    

```apache
docker run --rm --tty -v \
"$PWD":/data mesmacosta/mysql2datacatalog:stable \
--datacatalog-project-id=$PROJECT_ID \
--datacatalog-location-id=$REGION \
--mysql-host=$public_ip_address \
--mysql-user=$username \
--mysql-pass=$password \
--mysql-database=$database
```

Soon after you should receive the following output:

```apache
============End mysql-to-datacatalog============
```

Click **Check my progress** to verify the objective.

Execute MySQL to Data Catalog connector

**Check my progress**

### Check the results of the script

1. Navigate to **Dataplex Universal Catalog** in the Google Cloud console by clicking on the **Navigation menu** () &gt; **View all products** &gt; **Analytics** &gt; **Dataplex Universal Catalog**.
    
2. Click on **Catalog** then **Aspect types & Tag Templates**.
    

You should see the following mysql Tag Templates:

![Mysql Table - Metadata and Mysql Database - Metadata](https://cdn.qwiklabs.com/KiSLLiHErYDE7eA8aDBt%2BTXdQ3xmBblNPPJU9H50sQk%3D align="left")

3. Click on **Entry groups**.
    

You should see the following mysql Entry Group:

![mysql](https://cdn.qwiklabs.com/WKnbzlrEd7k2SqWMptXeqBlcWB8XHD7ZzF5NDTVBd%2Fw%3D align="left")

4. Now click on the `mysql` Entry Group. Your console should resemble the following:
    

![mysql Entry Group entries](https://cdn.qwiklabs.com/6uZUatinse98fbQYAW3kh6qJj%2FyiUb6WTg3QOfQQ4l0%3D align="left")

This is the real value of an Entry Group — you can see all entries that belong to MySQL using the UI.

5. Click on one of the `warehouse` entries. Look at the Custom entry details and tags.
    

This is the real value the connector adds — it allows you to have the metadata searchable in Dataplex Universal Catalog.

### Clean up

1. To delete the created resources, run the following command to delete the MySQL metadata:
    

```apache
./cleanup-db.sh
```

2. Now execute the cleaner container:
    

```apache
docker run --rm --tty -v \
"$PWD":/data mesmacosta/mysql-datacatalog-cleaner:stable \
--datacatalog-project-ids=$PROJECT_ID \
--rdbms-type=mysql \
--table-container-type=database
```

3. Finally, delete the PostgreSQL database:
    

```apache
./delete-db.sh
```

Ensure you see the following output in Cloud Shell before you move on:

```apache
  Cloud SQL Instance deleted
  COMPLETED
```

4. From the **Dataplex Universal Catalog** menu, under **Discover**, click on the **Search** page.
    
5. In the search bar, enter **MySQL** and click **Search**.
    

You no longer see the MySQL Tag Templates in the results.

---

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=43hA0Is9J1I&ab_channel=QUICKGCPLAB] 

**Run the following Commands in CloudShell**

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1749287583868/ccf65b9a-ab59-4bdb-9e88-2590beb45d45.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Build%20and%20Execute%20MySQL%20PostgreSQL%20and%20SQLServer%20to%20Data%20Catalog%20Connectors/gsp814.sh
sudo chmod +x gsp814.sh
./gsp814.sh
```

---

### Manual

```powershell
BLACK=`tput setaf 0`
RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
BLUE=`tput setaf 4`
MAGENTA=`tput setaf 5`
CYAN=`tput setaf 6`
WHITE=`tput setaf 7`

BG_BLACK=`tput setab 0`
BG_RED=`tput setab 1`
BG_GREEN=`tput setab 2`
BG_YELLOW=`tput setab 3`
BG_BLUE=`tput setab 4`
BG_MAGENTA=`tput setab 5`
BG_CYAN=`tput setab 6`
BG_WHITE=`tput setab 7`

BOLD=`tput bold`
RESET=`tput sgr0`
#----------------------------------------------------start--------------------------------------------------#

echo "${YELLOW}${BOLD}Starting${RESET}" "${GREEN}${BOLD}Execution${RESET}"

gcloud services enable datacatalog.googleapis.com

echo "${YELLOW}${BOLD}Task 1. ${RESET}""${WHITE}${BOLD}Enable the Data Catalog API${RESET}" "${GREEN}${BOLD}Completed${RESET}"

export PROJECT_ID=$(gcloud config get-value project)

gsutil cp gs://spls/gsp814/cloudsql-sqlserver-tooling.zip .
unzip cloudsql-sqlserver-tooling.zip

cd cloudsql-sqlserver-tooling/infrastructure/terraform

sed -i "s/us-central1/$REGION/g" variables.tf

cd ~/cloudsql-sqlserver-tooling
bash init-db.sh

gcloud iam service-accounts create sqlserver2dc-credentials \
--display-name  "Service Account for SQL Server to Data Catalog connector" \
--project $PROJECT_ID

gcloud iam service-accounts keys create "sqlserver2dc-credentials.json" \
--iam-account "sqlserver2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
--member "serviceAccount:sqlserver2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com" \
--quiet \
--project $PROJECT_ID \
--role "roles/datacatalog.admin"

cd infrastructure/terraform/

public_ip_address=$(terraform output -raw public_ip_address)
username=$(terraform output -raw username)
password=$(terraform output -raw password)
database=$(terraform output -raw db_name)

cd ~/cloudsql-sqlserver-tooling

docker run --rm --tty -v \
"$PWD":/data mesmacosta/sqlserver2datacatalog:stable \
--datacatalog-project-id=$PROJECT_ID \
--datacatalog-location-id=$REGION \
--sqlserver-host=$public_ip_address \
--sqlserver-user=$username \
--sqlserver-pass=$password \
--sqlserver-database=$database

echo "${YELLOW}${BOLD}Task 2. ${RESET}""${WHITE}${BOLD}SQL Server to Dataplex${RESET}" "${GREEN}${BOLD}Completed${RESET}"

cd

gsutil cp gs://spls/gsp814/cloudsql-postgresql-tooling.zip .
unzip cloudsql-postgresql-tooling.zip

cd cloudsql-postgresql-tooling/infrastructure/terraform

sed -i "s/us-central1/$REGION/g" variables.tf

cd ~/cloudsql-postgresql-tooling
bash init-db.sh

gcloud iam service-accounts create postgresql2dc-credentials \
--display-name  "Service Account for PostgreSQL to Data Catalog connector" \
--project $PROJECT_ID

gcloud iam service-accounts keys create "postgresql2dc-credentials.json" \
--iam-account "postgresql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
--member "serviceAccount:postgresql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com" \
--quiet \
--project $PROJECT_ID \
--role "roles/datacatalog.admin"

cd infrastructure/terraform/

public_ip_address=$(terraform output -raw public_ip_address)
username=$(terraform output -raw username)
password=$(terraform output -raw password)
database=$(terraform output -raw db_name)

cd ~/cloudsql-postgresql-tooling

docker run --rm --tty -v \
"$PWD":/data mesmacosta/postgresql2datacatalog:stable \
--datacatalog-project-id=$PROJECT_ID \
--datacatalog-location-id=$REGION \
--postgresql-host=$public_ip_address \
--postgresql-user=$username \
--postgresql-pass=$password \
--postgresql-database=$database


echo "${YELLOW}${BOLD}Task 3. ${RESET}""${WHITE}${BOLD}PostgreSQL to Dataplex${RESET}" "${GREEN}${BOLD}Completed${RESET}"

cd

gsutil cp gs://spls/gsp814/cloudsql-mysql-tooling.zip .
unzip cloudsql-mysql-tooling.zip

cd cloudsql-mysql-tooling/infrastructure/terraform

sed -i "s/us-central1/$REGION/g" variables.tf

cd ~/cloudsql-mysql-tooling
bash init-db.sh

gcloud iam service-accounts create mysql2dc-credentials \
--display-name  "Service Account for MySQL to Data Catalog connector" \
--project $PROJECT_ID

gcloud iam service-accounts keys create "mysql2dc-credentials.json" \
--iam-account "mysql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
--member "serviceAccount:mysql2dc-credentials@$PROJECT_ID.iam.gserviceaccount.com" \
--quiet \
--project $PROJECT_ID \
--role "roles/datacatalog.admin"

cd infrastructure/terraform/

public_ip_address=$(terraform output -raw public_ip_address)
username=$(terraform output -raw username)
password=$(terraform output -raw password)
database=$(terraform output -raw db_name)

cd ~/cloudsql-mysql-tooling

docker run --rm --tty -v \
"$PWD":/data mesmacosta/mysql2datacatalog:stable \
--datacatalog-project-id=$PROJECT_ID \
--datacatalog-location-id=$REGION \
--mysql-host=$public_ip_address \
--mysql-user=$username \
--mysql-pass=$password \
--mysql-database=$database

echo "${YELLOW}${BOLD}Task 4. ${RESET}""${WHITE}${BOLD}MySQL to Dataplex${RESET}" "${GREEN}${BOLD}Completed${RESET}"

echo "${RED}${BOLD}Congratulations${RESET}" "${WHITE}${BOLD}for${RESET}" "${GREEN}${BOLD}Completing the Lab !!!${RESET}"

#-----------------------------------------------------end----------------------------------------------------------#
```