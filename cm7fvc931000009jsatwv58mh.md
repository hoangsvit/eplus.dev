---
title: "Running Databases in GKE (Solution)"
seoTitle: "Running Databases in GKE (Solution)"
seoDescription: "In this lab, you create a Google Kubernetes Engine (GKE) cluster, and then deploy databases into it. You see two ways to deploy the databases: first using y"
datePublished: Sat Feb 22 2025 07:18:38 GMT+0000 (Coordinated Universal Time)
cuid: cm7fvc931000009jsatwv58mh
slug: running-databases-in-gke-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740208511186/e00dddab-3fbf-4979-a949-6211691b33c9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740208690750/44ae450e-2e1a-4227-91b1-715e4aa2e95f.png
tags: running-databases-in-gke-solution, running-databases-in-gke

---

## **Overview**

In this lab, you create a Google Kubernetes Engine (GKE) cluster, and then deploy databases into it. You see two ways to deploy the databases: first using your own configuration code, and then using a Kubernetes package manager called Helm.

### Objectives

In this lab, you learn how to perform the following tasks:

* Create a GKE cluster.
    
* Deploy MySQL on the cluster.
    
* Use Helm to deploy MySQL on the cluster.
    

## **Setup**

In this task, you use Qwiklabs and perform initialization steps for your lab.

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

## **Task 1. Create a GKE cluster**

1. Open a new web browser window and navigate to the Google Cloud Console ([console.cloud.google.com](http://console.cloud.google.com)). Use the project selector to choose the first project with a leading name of 'qwiklabs-gcp.'
    
2. On the Navigation menu (), click **Kubernetes Engine &gt; Clusters**.
    
3. Click **Create**.
    
4. Click **Switch to Standard Cluster**.
    
5. In the switch dialog box, click **Switch to Standard Cluster**.
    
6. For **Location type**, select **Zonal**.
    
7. Accept all defaults and click **Create**. It will take a couple minutes for the cluster to be ready.
    
8. When the cluster is ready, click **Connect** from the Actions menu.
    

![The Connect option selected in the expanded More actions menu](https://cdn.qwiklabs.com/%2BZZ0FTi1hPe%2BU4KpCDSCHsxk%2FO%2BC%2FE0gAC2uaMwUTOE%3D align="left")

The command for connecting to the cluster is specified.

9. To open Cloud Shell with the command entered, click **Run in Cloud Shell**, and if prompted click **Continue**.
    

![The Run in CLoud Shell button highlighted on the Command-line access page](https://cdn.qwiklabs.com/brhJV3jRUgBlqfhquiF43mzERs%2FRQVZJnVjptfL9MrY%3D align="left")

10. Press ENTER to run the command. If prompted click **Authorize**.
    

You are connected to the cluster and ready to deploy a program.

11. Test the connection with the following kubectl command:
    

```apache
kubectl get nodes
```

This command returns a list of the three virtual machines that make up this cluster.

Click *Check my progress* to verify the objective.

Create a Kubernetes cluster

Check my progress

### Review

You just created a Kubernetes cluster. Next, you configure and deploy MySQL to run in it.

## **Task 2. Deploy MySQL on the cluster**

You need a root password for the database. You store the password as a Kubernetes secret. The secret is a key-value pair. In this case, the key is `ROOT_PASSWORD` and the value is `password`.

1. To create the secret, enter the following command:
    

```apache
kubectl create secret generic mysql-secrets --from-literal=ROOT_PASSWORD="password"
```

2. Create a folder for the configuration files you create, and change to it:
    

```apache
mkdir mysql-gke
cd mysql-gke
```

3. Create the Kubernetes configuration files. In Cloud Shell, click **Open Editor**. Click on **Open in a new window** to open the editor in a new window.
    

![The Open Editor button highlighted in the UI](https://cdn.qwiklabs.com/eKqJzpi2fVYr10xqnfwERuNUT0q8sFk9vVJ813ujyPg%3D align="left")

4. Select the **mysql-gke** folder on the left.
    

![The mysql-gke folder highlighted in the Explorer](https://cdn.qwiklabs.com/A9kgi74xx0fphWm16YsNG%2BNM8n%2FpWrlaVl3%2BWr84yzg%3D align="left")

5. Right click the **mysql-gke** folder, and then click **New File**.
    
6. For name, type **volume.yaml**.
    
7. Enter the following YAML code and save the file:
    

```apache
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-data-disk
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

This reserves 1 gigabyte of disk space for the MySQL database. Note the name `mysql-data-disk`. This name will be used in the next file.

8. To configure the MySQL database, create another new file in the **mysql-gke** folder, name it **deployment.yaml**, and paste the following code into it:
    

```apache
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-deployment
  labels:
    app: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          ports:
            - containerPort: 3306
          volumeMounts:
            - mountPath: "/var/lib/mysql"
              subPath: "mysql"
              name: mysql-data
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secrets
                  key: ROOT_PASSWORD
            - name: MYSQL_USER
              value: testuser
            - name: MYSQL_PASSWORD
              value: password
      volumes:
        - name: mysql-data
          persistentVolumeClaim:
            claimName: mysql-data-disk
```

**Notes:**

* On line 19, the MySQL docker image is specified.
    
* Starting at line 26, an environment variable is created for the database root password using the secret you created earlier. There are also variables to create a test user with a simple password.
    
* On the last line, the disk space you allocated in the previous file is used.
    

The database needs a service so it can be accessed.

9. Create a third file in the **mysql-gke** folder, name it **service.yaml**, and paste the following code into it:
    

```apache
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
spec:
  selector:
    app: mysql
  ports:
  - protocol: TCP
    port: 3306
    targetPort: 3306
```

**Note:** This creates a service that provides access to the database from within the cluster that forwards requests to the MySQL database.

10. In Cloud Shell, click **Open Terminal** to return to the command line. Make sure you are in the correct folder and type **ls** to verify that you have your three YAML files.
    
11. To deploy your database, enter the following kubectl commands:
    

```apache
kubectl apply -f volume.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

12. Wait a minute for the resources to be created, and then enter the following command:
    

```apache
kubectl get pods
```

***The pod that has your database installed should be running. If it is not running yet, wait a little while and try again.***

**Note:** At this point, there are no client applications and the database is only accessible from inside the cluster. In the next step, you access the database from inside the pod where it is running.

Click *Check my progress* to verify the objective.

Deploy MySQL on the cluster

Check my progress

13. Copy the name of the pod obtained from the last command to the clipboard. It will begin with `mysql-deployment-` followed by a unique string.
    
14. Enter the following command ***but replace the pod name with your pod's name***:
    

```apache
kubectl exec -it mysql-deployment-76fdc44468-rfhbp -- /bin/bash
```

Now you're at a bash prompt within the MySQL pod.

15. To log in to MySQL, enter the following:
    

```apache
mysql -u root -p
```

16. When prompted, enter the password **password**. This gives you a mysql prompt.
    
17. Run the following command:
    

```apache
show databases;
```

18. Create a new database:
    

```apache
create database pets;
```

19. To confirm that your database was created, enter:
    

```apache
show databases;
```

20. Type **exit** to exit MySQL.
    
21. Type **exit** again to return to the Cloud Shell command prompt.
    
22. To remove everything that was created, enter the following commands:
    

```apache
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml
kubectl delete -f volume.yaml
```

### Review

You deployed a MySQL database to a Kubernetes cluster using Kubernetes configuration files.

Helm is a package manager for Kubernetes. It can make deploying databases and other applications easier on a Kubernetes cluster. You use it next.

## **Task 3. Use Helm to deploy MySQL on the cluster**

You should still be in Cloud Shell, connected to your Kubernetes cluster.

1. To add the Bitnami Helm repository to your cluster, enter the following command:
    

```apache
helm repo add bitnami https://charts.bitnami.com/bitnami
```

2. To update the Helm packages, enter the following command:
    

```apache
helm repo update
```

3. Install a MySQL named mydb using Helm:
    

```apache
helm install mydb bitnami/mysql
```

Click *Check my progress* to verify the objective.

Use Helm to deploy MySQL on the cluster

Check my progress

4. Read the output from the Helm install command and connect to your database using the instructions provided.
    
5. When you are connected to the database, exit to return to the Cloud Shell command prompt.
    
6. To see your Helm deployment, enter the following command:
    

```apache
helm ls
```

Notice that the deployment has the name `mydb` specified in the install command.

7. To delete the deployment, enter the following command:
    

```apache
helm delete mydb
```

**Congratulations!** You have created a Kubernetes cluster and then deployed MySQL databases into it, first using your own configuration code, and then using Helm.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=m53QMe4VWas&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Running%20Databases%20in%20GKE/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```