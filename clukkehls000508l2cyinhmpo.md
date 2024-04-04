---
title: "Build and Execute MySQL, PostgreSQL, and SQLServer to Data Catalog Connectors - GSP814"
seoTitle: "Build and Execute MySQL, PostgreSQL, and SQLServer to Data Catalog Con"
seoDescription: "Dataplex is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data ware"
datePublished: Thu Apr 04 2024 01:35:07 GMT+0000 (Coordinated Universal Time)
cuid: clukkehls000508l2cyinhmpo
slug: build-and-execute-mysql-postgresql-and-sqlserver-to-data-catalog-connectors-gsp814
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1712194384180/65961220-e33d-4f89-aff1-7a786318501f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1712194395113/a36b67ab-81a8-462c-bdfd-63207410c962.png
tags: sql-server, postgresql, mysql, data-catalog-connectors

---

## **Overview**

[Dataplex is an](https://cloud.google.com/dataplex) in[telligen](https://cloud.google.com/dataplex)t data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale.

[Data Catalog is a](https://cloud.google.com/data-catalog/docs/concepts/overview) [fully m](https://cloud.google.com/dataplex)[anaged](https://cloud.google.com/data-catalog/docs/concepts/overview), scalable metadata management service within Dataplex. It offers a simple and easy-to-use search interface for data discovery, a flexible and powerful cataloging system for capturing both technica[l and busine](https://cloud.google.com/data-catalog/docs/concepts/overview)ss metadata, and a strong security and compliance foundation with Cloud Data Loss Prevention (DLP) and Cloud Identity and Access Management (IAM) integrations.

### Using Data Catalo[g](https://cloud.google.com/dataplex)

[Using](https://cloud.google.com/dataplex) Data Catalo[g within](https://cloud.google.com/dataplex) Dataplex, you can search for assets to which you have access, and you can tag data assets to support discovery and access control. Tags allow you to attach custom metadata fields to [specific dat](https://cloud.google.com/data-catalog/docs/concepts/overview)a assets [for easy id](https://cloud.google.com/data-catalog/docs/concepts/overview)entification and retrieval (such as tagging certain assets as containing protected or sensitive data); you can also create reusable tag templates to rapidly assign the same tags to different data assets.

---

%[https://www.youtube.com/watch?v=43hA0Is9J1I&ab_channel=QUICKGCPLAB] 

### Run the following Commands in CloudShell

```powershell
export REGION=
```

```powershell
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Build%20and%20Execute%20MySQL%20PostgreSQL%20and%20SQLServer%20to%20Data%20Catalog%20Connectors/gsp814.sh
sudo chmod +x gsp814.sh
./gsp814.sh
```

Alternative solution

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