---
title: "Securing a Cloud SQL for PostgreSQL Instance - GSP920"
seoTitle: "Securing a Cloud SQL for PostgreSQL Instance - GSP920"
seoDescription: "Secure your Cloud SQL PostgreSQL with CMEK, pgAudit, and IAM authentication in this step-by-step guide designed for database administrators"
datePublished: Thu Sep 11 2025 01:50:58 GMT+0000 (Coordinated Universal Time)
cuid: cmfer52sv000002ky5kcfeeoj
slug: securing-a-cloud-sql-for-postgresql-instance-gsp920
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757554356353/3ef2e1ff-2314-4b75-92fb-5ba1270d33dd.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757554386702/8ca28cf6-71ac-4237-b308-a465539172fc.png
tags: postgresql, cloudsql, securing-a-cloud-sql-for-postgresql-instance-gsp920, securing-a-cloud-sql-for-postgresql-instance, gsp920

---

## Overview

Customer-managed encryption keys (CMEK) let you use your own cryptographic keys for data at rest in Cloud SQL. After adding customer-managed encryption keys, whenever an API call is made, Cloud SQL uses your key to access data.

This lab provides you with step-by-step guidance on how to secure a Cloud SQL for PostgreSQL instance. You first deploy a new Cloud SQL instance using a CMEK. Once you have created the Cloud SQL for PostgreSQL instance, you configure pgAudit to selectively record and track SQL operations performed against that instance, and finally you configure and test Cloud SQL IAM database authentication.

### What you'll do

* Setup CMEK for Cloud SQL for PostgreSQL.
    
* Enable and configure pgAudit on a Cloud SQL for PostgreSQL instance.
    
* Configure Cloud SQL for PostgreSQL IAM database authentication.
    

### Target Audience

The content of this hands-on lab will be most applicable to PostgreSQL Database Administrators. This lab is designed to give professionals hands-on experience setting up and configuring Google Cloud resources to support PostgreSQL.

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
    student-03-b0dbd8e4ff65@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    WIpZdWGelUcU
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

## Task 1. Create a Cloud SQL for PostgreSQL instance with CMEK enabled

In this task, you create a Cloud SQL for PostgreSQL instance with CMEK enabled. It is imperative that you keep the keys safe as you cannot manage your database without them.

### Create a per-product, per-project service account for Cloud SQL

You can create the service account you require for Cloud SQL CMEK using the `gcloud beta services identity create` command.

1. In Cloud Shell, run the following to create the service account:
    

```apache
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
gcloud beta services identity create \
    --service=sqladmin.googleapis.com \
    --project=$PROJECT_ID
```

2. Click the **Authorize** button if prompted.
    

This creates the service account that you will bind to the CMEK in a later step.

### Create a Cloud Key Management Service keyring and key

In this section, you create a Cloud KMS keyring and key to use with CMEK.

1. In Cloud Shell, run the following command to create the Cloud KMS keyring:
    

```apache
export KMS_KEYRING_ID=cloud-sql-keyring
export ZONE=$(gcloud compute instances list --filter="NAME=bastion-vm" --format=json | jq -r .[].zone | awk -F "/zones/" '{print $NF}')
export REGION=${ZONE::-2}
gcloud kms keyrings create $KMS_KEYRING_ID \
    --location=$REGION
```

2. In Cloud Shell, run the following command to create the Cloud KMS key:
    

```apache
export KMS_KEY_ID=cloud-sql-key
gcloud kms keys create $KMS_KEY_ID \
 --location=$REGION \
 --keyring=$KMS_KEYRING_ID \
 --purpose=encryption
```

3. In Cloud Shell, run the following command to bind the key to the service account:
    

```apache
export PROJECT_NUMBER=$(gcloud projects describe ${PROJECT_ID} \
    --format 'value(projectNumber)')
gcloud kms keys add-iam-policy-binding $KMS_KEY_ID \
    --location=$REGION \
    --keyring=$KMS_KEYRING_ID \
    --member=serviceAccount:service-${PROJECT_NUMBER}@gcp-sa-cloud-sql.iam.gserviceaccount.com \
    --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

The service account name is the same name that was returned by the `gcloud beta services identity create` command in the previous sub-task.

### Create a Cloud SQL instance with CMEK enabled

In this section, you create a Cloud SQL for PostgreSQL instance with CMEK enabled. It is not possible to patch an existing instance to enable CMEK, so you should bear this in mind if you plan to use CMEK to encrypt your data.

In order to access your Cloud SQL instance from external development or application environments, you can configure the Cloud SQL instance with a public IP address and control access by allowlisting the IP address of those environments. This limits access to the public interface to those address ranges that you specify.

You treat the Compute Engine VM instance in the lab as a development environment and therefore need the to allow list the external IP address of that instance. You also add the external IP address of the Cloud Shell to the allowlist to make it easier to complete tasks later in the lab.

1. In Cloud Shell, run the following command to find the external IP address of the `bastion-vm` VM instance:
    

```apache
export AUTHORIZED_IP=$(gcloud compute instances describe bastion-vm \
    --zone=$ZONE \
    --format 'value(networkInterfaces[0].accessConfigs.natIP)')
echo Authorized IP: $AUTHORIZED_IP
```

2. In Cloud Shell, run the following command to find the external IP address of the Cloud Shell:
    

```apache
export CLOUD_SHELL_IP=$(curl ifconfig.me)
echo Cloud Shell IP: $CLOUD_SHELL_IP
```

3. In Cloud Shell, run the following command to create your Cloud SQL for PostgreSQL instance with:
    

```apache
export KEY_NAME=$(gcloud kms keys describe $KMS_KEY_ID \
    --keyring=$KMS_KEYRING_ID --location=$REGION \
    --format 'value(name)')

export CLOUDSQL_INSTANCE=postgres-orders
gcloud sql instances create $CLOUDSQL_INSTANCE \
    --project=$PROJECT_ID \
    --authorized-networks=${AUTHORIZED_IP}/32,$CLOUD_SHELL_IP/32 \
    --disk-encryption-key=$KEY_NAME \
    --database-version=POSTGRES_13 \
    --cpu=1 \
    --memory=3840MB \
    --region=$REGION \
    --root-password=supersecret!
```

4. Enter 'y' if prompted after entering the command.
    

Create a Cloud SQL instance with CMEK enabled

## Task 2. Enable and configure pgAudit on a Cloud SQL for PostgreSQL database

In this task, you enable and configure the pgAudit database extension which enables fine-grained control of logging of all types of database activity.

1. In Cloud Shell, run the following command to add the pgAudit database flags to your Cloud SQL instance:
    

```apache
gcloud sql instances patch $CLOUDSQL_INSTANCE \
    --database-flags cloudsql.enable_pgaudit=on,pgaudit.log=all
```

2. Enter 'y' if prompted to confirm and continue.
    

**Note:** Wait for the patch command to complete before continuing. When you see the message that `Patching Cloud SQL instance...done`, you can proceed to the next step.

3. In Cloud Console, on the **Navigation menu** (), click **SQL**.
    
4. Click on the Cloud SQL instance named `postgres-orders`.
    
5. In the Cloud SQL **Overview** panel, top menu, click **Restart** to restart the instance after the patch that you ran in step 1.
    

If prompted again, click **Restart** again in the pop-up dialog.

**Note:** It can take a few minutes to restart your Cloud SQL for PostgreSQL instance. When you see the message that the instance has been successfully restarted (`Restarted postgres-orders`), you can proceed to the next step.

6. In Cloud console, in the **Connect to this instance** section, click **Open Cloud Shell**.
    

**Note:** If you receive an error message and are not able to connect, wait a few minutes to provide some time after restart for the instance to be accessible again, and then repeat step 6.

A command to connect to the instance will auto-populate in Cloud Shell.

7. Run that command as is, and enter the password `supersecret!` when prompted.
    

A **psql** session will start in Cloud Shell.

8. In **psql**, run the following command to create the `orders` database and enable the pgAudit extension to log all reads and writes:
    

```apache
CREATE DATABASE orders;
\c orders;
```

9. Enter the password `supersecret!` again.
    
10. In **psql**, run the following command to create and configure the database extension:
    

```apache
CREATE EXTENSION pgaudit;
ALTER DATABASE orders SET pgaudit.log = 'read,write';
```

### Enable Audit Logging in Cloud Console

In this section, you enable Audit Logging in Cloud Console.

1. In Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **IAM & Admin** &gt; **Audit Logs**.
    

**Note:** If you see a message at the top of the page that states `you don't have permission to view inherited audit logs configuration data for one or more parent resources`, you can safely ignore the message and continue to the next step.

2. In the **Filter** box under **Data access audit logs configuration**, type `Cloud SQL`, and select the entry in the drop-down list.
    
3. Enable the checkbox for `Cloud SQL` on the left, and then enable the following checkboxes in the **Info Panel** on the right:
    

* **Admin read**
    
* **Data read**
    
* **Data write**
    

4. Click **Save** in the **Info Panel**.
    

### Populate a database on Cloud SQL for PostgreSQL

In this section, you populate the `orders` database with data provided to you.

1. Click the **+** icon on the Cloud Shell title bar to open a new tab in the Cloud Shell.
    
2. In the new tab, run the following to download the data and database population scripts:
    

```apache
export SOURCE_BUCKET=gs://spls/gsp920
gsutil -m cp ${SOURCE_BUCKET}/create_orders_db.sql .
gsutil -m cp ${SOURCE_BUCKET}/DDL/distribution_centers_data.csv .
gsutil -m cp ${SOURCE_BUCKET}/DDL/inventory_items_data.csv .
gsutil -m cp ${SOURCE_BUCKET}/DDL/order_items_data.csv .
gsutil -m cp ${SOURCE_BUCKET}/DDL/products_data.csv .
gsutil -m cp ${SOURCE_BUCKET}/DDL/users_data.csv .
```

2. Continue in the new tab, and run the following to create and populate the database:
    

```apache
export CLOUDSQL_INSTANCE=postgres-orders
export POSTGRESQL_IP=$(gcloud sql instances describe $CLOUDSQL_INSTANCE --format="value(ipAddresses[0].ipAddress)")
export PGPASSWORD=supersecret!
psql "sslmode=disable user=postgres hostaddr=${POSTGRESQL_IP}" \
    -c "\i create_orders_db.sql"
```

3. Exit the terminal session in the new tab:
    

```apache
exit
```

4. Return to your **psql** session in the original Cloud Shell tab, and run the following to further log all `SELECT` operations on a particular relation (such as the `order_items` table):
    

```apache
CREATE ROLE auditor WITH NOLOGIN;
ALTER DATABASE orders SET pgaudit.role = 'auditor';
GRANT SELECT ON order_items TO auditor;
```

5. Run the first `SELECT` query below :
    

**Summary of orders by usersSummary by individual productOrders by distribution center**

```apache
SELECT
    users.id  AS users_id,
    users.first_name  AS users_first_name,
    users.last_name  AS users_last_name,
    COUNT(DISTINCT order_items.order_id ) AS order_items_order_count,
    COALESCE(SUM(order_items.sale_price ), 0) AS order_items_total_revenue
FROM order_items
LEFT JOIN users ON order_items.user_id = users.id
GROUP BY 1, 2, 3
ORDER BY 4 DESC
LIMIT 500;
```

6. The output is 500 rows long, so you can enter `q` to close the results and return to the `orders=>` prompt.
    
7. Repeat the steps 5-6 for the other two query tabs in the code block.
    
8. Run the following to exit **psql**:
    

```apache
\q
```

### View pgAudit logs

In this step you will view the logging of your database updates and queries in the pgAudit logs.

1. In Cloud Console, on the **Navigation menu** (), click **View all products**. Under **Observablity**, click **Logging** to open the **Logs Explorer** page.
    
2. In the **Query** tab of the **Logs Explorer**, paste the following, and click **Run query**:
    

```apache
resource.type="cloudsql_database"
logName="projects/qwiklabs-gcp-03-6d4d1d81ce87/logs/cloudaudit.googleapis.com%2Fdata_access"
protoPayload.request.@type="type.googleapis.com/google.cloud.sql.audit.v1.PgAuditEntry"
```

3. In the histogram displayed, you can see the audit activity associated with your DDL inserts and the `SELECT` queries you ran earlier.
    

![An example histogram with seven bars.](https://cdn.qwiklabs.com/XOYPCu21EZFQviBkuuoDY8P3EKT06csK7rjuPHrjINg%3D align="left")

4. Click on the last bar on the histogram, which corresponds to the `SELECT` queries you ran.
    

In the **Query results** panel below the histogram, the log entries are listed.

5. Expand a log entry, and under `protoPayload.request` you will see the `SELECT` query.
    

Enable and configure pgAudit on a Cloud SQL for PostgreSQL database

## Task 3. Configure Cloud SQL IAM database authentication

In this task, you configure Cloud SQL IAM database authentication. All of the database access and update tasks you have performed so far have used built-in PostgreSQL user accounts. You can also create Cloud SQL for PostgreSQL users using Cloud IAM accounts. Database users can authenticate to Cloud SQL using Cloud IAM instead of using built-in database accounts and fine-grained permissions at the database level can be granted to those users.

In this task, you configure the lab user account as a Cloud SQL IAM user, grant that user access to the `orders.order_items` database table using the **postgres** administrator account, and then test access to the `orders.order_items` database table from the command line using the **psql** command line utility.

The authentication process that is used in this task is explained in detail in the [IAM authentication documentation for Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres/iam-logins#logging-in-as-a-user).

### Test database access using a Cloud IAM user before Cloud SQL IAM authentication is configured.

You attempt to access the database using a Cloud IAM user before Cloud SQL IAM authentication has been enabled in order to establish that the Cloud IAM user cannot initially access the data. You will see this connection attempt fail before you proceed to the next section to address the issue.

* In Cloud Shell, test access to the `orders` database using the lab student account as the username:
    

```apache
export USERNAME=$(gcloud config list --format="value(core.account)")
export CLOUDSQL_INSTANCE=postgres-orders
export POSTGRESQL_IP=$(gcloud sql instances describe $CLOUDSQL_INSTANCE --format="value(ipAddresses[0].ipAddress)")
export PGPASSWORD=$(gcloud auth print-access-token)
psql --host=$POSTGRESQL_IP $USERNAME --dbname=orders
```

This connection attempt fails, and you see an authentication failed message similar to the following because the Cloud SQL IAM user has not been created yet:

```apache
psql --host=$POSTGRESQL_IP $USERNAME --dbname=orders
psql: error: connection to server at "35.226.251.234", port 5432 failed: FATAL:  password authentication failed for user "student-01-22fa974575e4@qwiklabs.net"
connection to server at "35.226.251.234", port 5432 failed: FATAL:  password authentication failed for user "student-01-22fa974575e4@qwiklabs.net"
```

Cloud SQL IAM database authentication uses OAuth 2.0 access tokens is the Cloud IAM user password, which are short-lived and only valid for one hour so you should regenerate the token every time you need to authenticate. The access token should always be passed into the **psql** command using the **PGPASSWORD** environment variable as the buffer for the **psql** password parameter is too small to hold the OAuth 2.0 token string.

### Create a Cloud SQL IAM user

In this section, you create a Cloud SQL IAM user and confirm that Cloud SQL IAM user authentication has been enabled.

1. In Cloud Console, on the **Navigation menu** (), click **SQL**
    
2. Click on the Cloud SQL instance named `postgres-orders`.
    

In the **Configuration** panel on the right, note that the **Database flags and parameters** list includes **pgAudit.log** and **cloudsql.enable\_pgaudit** only.

3. In the **SQL menu** (left panel) under **Primary instance**, click **Users** to open the **Users** panel.
    
4. Click **Add user account**.
    
5. Select **Cloud IAM**.
    
6. In the **Principal** box enter the lab student name: `student-03-b0dbd8e4ff65@qwiklabs.net`
    
7. Click **Add**.
    

Wait for the new user to be successfully added.

On the main overview page for instance, in the **Configuration** panel on the right, note **cloudsql.iam\_authentication** has been added to the **Database flags and parameters** list.

### Grant the Cloud IAM user access to a Cloud SQL database table

You now connect to the `postgres-orders` instance using the built in `postgres` administrator account and grant access to the `orders.order_items` table to the Cloud IAM user.

1. On the main overview page for instance, in the **Connect to this instance** section, click **Open Cloud Shell**.
    

A command to connect to the instance will auto-populate in Cloud Shell.

2. Run that command as is, and enter the password `supersecret!` when prompted.
    
3. Enter the following SQL command to switch to the `orders` database:
    

```apache
\c orders
```

When prompted for a password enter `supersecret!` again.

4. Enter the following SQL command to grant the lab user all permissions on the `order_items` table. The Cloud IAM username for the lab has been inserted into this query for you.
    

```apache
GRANT ALL PRIVILEGES ON TABLE order_items TO "student-03-b0dbd8e4ff65@qwiklabs.net";
\q
```

### Test database access using a Cloud IAM user after Cloud SQL IAM authentication is configured.

You now repeat the attempt to access the database using a Cloud IAM user after Cloud SQL IAM authentication has been enabled in order to establish that the Cloud IAM user can now access the data.

You can now test access to the database again using the Cloud IAM user instead of the built-in `postgres` user:

1. In the Cloud Shell, run the following command to connect to the database using the Cloud IAM database user:
    

```apache
export PGPASSWORD=$(gcloud auth print-access-token)
psql --host=$POSTGRESQL_IP $USERNAME --dbname=orders
```

This connection succeeds, and you are now connected to the instance using Cloud IAM user authentication.

2. Test your access permission by running this query:
    

```apache
SELECT COUNT(*) FROM order_items;
```

This now returns a successful result:

```apache
orders=> SELECT COUNT(*) FROM order_items;
 count
--------
 198553
(1 row)
```

3. Confirm that you do not have access to one of the other tables by running this query:
    

```apache
SELECT COUNT(*) FROM users;
```

This query does not return a successful result:

```apache
orders=> SELECT COUNT(*) FROM users;
ERROR:  permission denied for table users
```

Configure Cloud SQL IAM database authentication

---

## Solution of Lab

%[https://youtu.be/HXwklj2v9fQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP920/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/pspcps/Arcade/refs/heads/main/GSP920.sh
sudo chmod +x GSP920.sh
./GSP920.sh
```