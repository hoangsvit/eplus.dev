---
title: "Migrate a MySQL Database to Google Cloud SQL: Challenge Lab - GSP306"
seoTitle: "Migrate a MySQL Database to Google Cloud SQL: Challenge Lab - GSP306"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Aug 18 2024 14:00:57 GMT+0000 (Coordinated Universal Time)
cuid: clzzmxgwq000c0aku5fmran2s
slug: migrate-a-mysql-database-to-google-cloud-sql-challenge-lab-gsp306
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723989109379/ba45a49c-a2da-4e5b-8357-ab57b6bb5c15.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723989636504/c2aa24d6-2b54-4c7c-a7a7-614e5ba6f107.png
tags: migrate-a-mysql-database-to-google-cloud-sql-challenge-lab-gsp306

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students preparing for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect) certification exam. Are you up for the challenge?

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

Your WordPress blog is running on a server that is no longer suitable. As the first part of a complete migration exercise, you are migrating the locally hosted database used by the blog to Cloud SQL.

The existing WordPress installation is installed in the `/var/www/html/wordpress` directory in the instance called `blog` that is already running in the lab. You can access the blog by opening a web browser and pointing to the external IP address of the blog instance.

The existing database for the blog is provided by MySQL running on the same server. The existing MySQL database is called `wordpress` and the user called **blogadmin** with password **Password1\***, which provides full access to that database.

### Your challenge

1. You need to create a new Cloud SQL instance to host the migrated database.
    
2. Once you have created the new database and configured it, you can then create a database dump of the existing database and import it into Cloud SQL.
    
3. When the data has been migrated, you will then reconfigure the blog software to use the migrated database.
    

For this lab, the WordPress site configuration file is located here: `/var/www/html/wordpress/wp-config.php`.

To sum it all up, your challenge is to migrate the database to Cloud SQL and then reconfigure the application so that it no longer relies on the local MySQL database. Good luck!

**Note:** Your lab activity tracking score will initially report a score of 20 points because your blog is running. If you reconfigure the blog application to use Cloud SQL database successfully, those points will remain in your grand total.

If the database has been incorrectly migrated, the "blog is running" test will fail, reducing your score by 20 points.

**Note:** Use the following values for the zone and region where applicable Zone: `us-central1-c` Region: `us-central1`

### Tips and tricks

**Google Cloud SQL - How-To Guides**: The Cloud SQL documentation includes a set of [How-to guides](https://cloud.google.com/sql/docs/mysql/how-to) that provide guidance on how to create instances and databases, and how to connect applications to those databases.

**WordPress Installation and Migration:** The [WordPress Codex](https://codex.wordpress.org/Installing_WordPress) provides information on how to install, configure, and migrate WordPress sites. You will find the instructions on how to create and prepare databases for use with WordPress [here](https://codex.wordpress.org/Installing_WordPress#Detailed_Instructions).

## **Task 1. Create a new Cloud SQL instance**

In this task, you need to set up a new Cloud SQL instance in Google Cloud. Choose the right configurations and make sure to create the SQL instance in the **Zone**:`us-central1-c` and **Region**: `us-central1` that will be suitable for hosting the WordPress database. Make sure you understand the requirements for the database to support the WordPress blog.

Click **Check my progress** to verify the objective.

Check that there is a Cloud SQL instance.

**Check my progress**

## **Task 2. Configure the new database**

Once you've created the Cloud SQL instance, your next step is to configure the database within it. Set up the necessary database parameters, ensuring it's prepared to receive the existing WordPress database data.

Click **Check my progress** to verify the objective.

Check that there is a user database on the Cloud SQL instance.

**Check my progress**

## **Task 3. Perform a database dump and import the data**

Your task here is to perform a dump of the existing **wordpress** MySQL database and then import this data into your newly created Cloud SQL database. This step is crucial in migrating the database effectively.

Click **Check my progress** to verify the objective.

Check that the blog instance is authorized to access Cloud SQL.

**Check my progress**

## **Task 4. Reconfigure the WordPress installation**

Now that the database has been migrated to Cloud SQL, you need to reconfigure the WordPress software to use this new database. This involves editing the `wp-config.php` file in the WordPress directory to point to the Cloud SQL database, moving away from the local MySQL database.

Click **Check my progress** to verify the objective.

Check that wp-config.php points to the Cloud SQL instance.

**Check my progress**

## **Task 5. Validate and troubleshoot**

Your final task is to ensure that the WordPress blog is functioning correctly with the new Cloud SQL database. Check if the blog operates as expected and troubleshoot any issues you encounter. This step is important to confirm the success of your database migration and the overall functionality of the blog.

Click **Check my progress** to verify the objective.

Check that the blog still responds to requests.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=EaJG_HmFUfI] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723989310904/21a02575-ca07-460f-bfa7-edbd04a019c2.png align="center")

```apache
REGION="${ZONE%-*}"
gcloud sql instances create wordpress --tier=db-n1-standard-1 --activation-policy=ALWAYS --zone $ZONE
gcloud sql users set-password --host % root --instance wordpress --password Password1*
ADDRESS=$(gcloud compute instances describe blog --zone=$ZONE --format="get(networkInterfaces[0].accessConfigs[0].natIP)")/32
gcloud sql instances patch wordpress --authorized-networks $ADDRESS --quiet
gcloud compute ssh "blog" --zone=$ZONE --project=$DEVSHELL_PROJECT_ID --quiet
sudo apt-get update
sudo apt-get install -y mysql-client
```

---

```apache
gcloud auth login --no-launch-browser --quiet
echo 'Password1*' | mysql_config_editor set --login-path=local --host=$MYSQLIP --user=root --password
MYSQLIP=$(gcloud sql instances describe wordpress --format="value(ipAddresses.ipAddress)")
export MYSQL_PWD=Password1*
mysql --host=$MYSQLIP --user=root << EOF
CREATE DATABASE wordpress;
CREATE USER 'blogadmin'@'%' IDENTIFIED BY 'Password1*';
GRANT ALL PRIVILEGES ON wordpress.* TO 'blogadmin'@'%';
FLUSH PRIVILEGES;
EOF
sudo mysqldump -u root -pPassword1* wordpress > wordpress_backup.sql
mysql --host=$MYSQLIP --user=root -pPassword1* --verbose wordpress < wordpress_backup.sql
sudo service apache2 restart
cd /var/www/html/wordpress
EXTERNAL_IP=$(gcloud sql instances describe wordpress --format="value(ipAddresses[0].ipAddress)")
CONFIG_FILE="wp-config.php"
sudo sed -i "s/define('DB_HOST', 'localhost')/define('DB_HOST', '$EXTERNAL_IP')/" $CONFIG_FILE
```