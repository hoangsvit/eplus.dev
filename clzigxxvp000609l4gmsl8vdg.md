---
title: "Running a MongoDB Database in Kubernetes with StatefulSets - GSP022"
seoTitle: "Running a MongoDB Database in Kubernetes with StatefulSets - GSP022"
seoDescription: "Kubernetes is an open source container orchestration tool that handles the complexities of running containerized applications. You can run Kubernetes applic"
datePublished: Tue Aug 06 2024 13:41:16 GMT+0000 (Coordinated Universal Time)
cuid: clzigxxvp000609l4gmsl8vdg
slug: running-a-mongodb-database-in-kubernetes-with-statefulsets-gsp022
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722949568612/c8c77d6e-2c47-459e-af8a-7769afd1f1f8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722951654116/2b3e46a9-e927-48cf-ad56-f2dd2aa0f6a7.png
tags: running-a-mongodb-database-in-kubernetes-with-statefulsets-gsp022, gsp022

---

## **Overview**

[Kubernetes](http://kubernetes.io/) is an open source container orchestration tool that handles the complexities of running containerized applications. You can run Kubernetes applications with `Kubernetes Engine`—a Google Cloud computing service that offers many different customizations and integrations. In this lab, you will get some practical experience with Kubernetes by learning how to set up a MongoDB database with a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/). Running a stateful application (a database) on a stateless service (container) may sound contradictory. However, after getting hands-on practice with this lab you will quickly see how that's not the case. In fact, by using a few open-source tools you will see how Kubernetes and stateless services can go hand-in-hand.

### What you'll learn

In this lab, you will learn the following:

* How to deploy a Kubernetes cluster, a headless service, and a StatefulSet.
    
* How to connect a Kubernetes cluster to a MongoDB replica set.
    
* How to scale MongoDB replica set instances up and down.
    
* How to clean up your environment and shutdown the above services.
    

### Prerequisites

This is an **advanced level** lab. Familiarity with Kubernetes or containerized applications is suggested. Experience with the Google Cloud Shell/SDK and MongoDB is also recommended. If you are looking to get up to speed in these services, be sure to check out the following labs:

* [Kubernetes Engine: Qwik Start](https://google.qwiklabs.com/catalog_lab/911)
    
* [Managing Deployments Using Kubernetes Engine](https://google.qwiklabs.com/catalog_lab/572)
    
* [Datastore: Qwik Start](https://google.qwiklabs.com/catalog_lab/923)
    

Once you're ready, scroll down to get your lab environment set up.

### **Task 1. Set a compute zone**

Throughout this lab, we will be using the [gcloud command line tool](https://cloud.google.com/sdk/gcloud/) to provision our services.

* Before we can create our Kubernetes cluster, we will need to set a compute zone so that the virtual machines in our cluster are all created in the same region. We can do this using the `gcloud config set` command—run the following in your cloud shell to set your zone to `us-east4-b`:
    

```apache
gcloud config set compute/zone us-east4-b
```

**Note:** Learn more about regions and zones from the [Regions and zones guide](https://cloud.google.com/compute/docs/zones).

### **Task 2. Create a new cluster**

Now that our zone is set, we will create a new cluster of containers.

* Run the following command to instantiate a cluster named `hello-world`:
    

```apache
gcloud container clusters create hello-world --num-nodes=2
```

This command creates a new cluster with two nodes, or virtual machines. You can configure this command with additional flags to change the number of nodes, the default permissions, and other variables. Learn more from the [gcloud container clusters create reference](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create).

Launching the cluster may take a few minutes. Once it's up, you should receive a similar output:

```apache
NAME         Location       MATER_VERSION   MASTER_IP       ...
hello-world  us-east4-b  1.9.7-gke.3     35.184.131.251  ...
```

Click **Check my progress** to verify the objective.

Create a new Cluster

**Check my progress**

### **Task 3. Setting up**

Now that we have our cluster up and running, it's time to integrate it with MongoDB. We will be using a [replica set](https://docs.mongodb.com/manual/replication/) so that our data is highly available and redundant—a must for running production applications.

To get set up, we need to do the following:

* Download the MongoDB [replica set/sidecar](https://github.com/thesandlord/mongo-k8s-sidecar.git) (or utility container in our cluster).
    
* Instantiate a [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/).
    
* Instantiate a [headless service](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services).
    
* Instantiate a [StatefulSet](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/).
    

1. Run the following command to clone the MongoDB/Kubernetes replica set from the Github repository:
    

```apache
gsutil -m cp -r gs://spls/gsp022/mongo-k8s-sidecar .
```

2. Once it's cloned, navigate to the `StatefulSet` directory with the following command:
    

```apache
cd ./mongo-k8s-sidecar/example/StatefulSet/
```

Once you have verified that the files have been downloaded and that you're in the right directory, let's go ahead and create a Kubernetes `StorageClass`.

**Create the StorageClass**

A `StorageClass` tells Kubernetes what kind of storage you want to use for database nodes. On the Google Cloud, you have a couple of [storage choices](https://cloud.google.com/compute/docs/disks/): SSDs and hard disks.

If you take a look inside the `StatefulSet` directory (you can do this by running the `ls` command), you will see SSD and HDD configuration files for both Azure and Google Cloud.

1. Run the following command to take a look at the `googlecloud_ssd.yaml` file:
    

```apache
cat googlecloud_ssd.yaml
```

**Output:**

```javascript
kind: StorageClass
apiVersion: storage.k8s.io/v1beta1
metadata:
  name: fast
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
```

This configuration creates a new StorageClass called "fast" that is backed by SSD volumes.

2. Run the following command to deploy the StorageClass:
    

```apache
kubectl apply -f googlecloud_ssd.yaml
```

Now that our StorageClass is configured, our StatefulSet can now request a volume that will automatically be created.

Click **Check my progress** to verify the objective.

Create the StorageClass

**Check my progress**

### **Task 4. Deploying the Headless Service and StatefulSet**

**Find and inspect the files**

1. Before we dive into what headless service and StatefulSets are, let's open up the configuration file (`mongo-statefulset.yaml`) where they are both housed in:
    

```apache
nano mongo-statefulset.yaml
```

You should receive the following output (without the pointers to the Headless Service and StatefulSet content):

```javascript
apiVersion: v1   <-----------   Headless Service configuration
kind: Service
metadata:
  name: mongo
  labels:
    name: mongo
spec:
  ports:
  - port: 27017
    targetPort: 27017
  clusterIP: None
  selector:
    role: mongo
---
apiVersion: apps/v1    <------- StatefulSet configuration
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: "mongo"
  replicas: 3
  selector:
    matchLabels:
      role: mongo
  template:
    metadata:
      labels:
        role: mongo
        environment: test
    spec:
      terminationGracePeriodSeconds: 10
      containers:
        - name: mongo
          image: mongo
          command:
            - mongod
            - "--replSet"
            - rs0
            - "--smallfiles"
            - "--noprealloc"
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: mongo-persistent-storage
              mountPath: /data/db
        - name: mongo-sidecar
          image: cvallance/mongo-k8s-sidecar
          env:
            - name: MONGO_SIDECAR_POD_LABELS
              value: "role=mongo,environment=test"
  volumeClaimTemplates:
  - metadata:
      name: mongo-persistent-storage
      annotations:
        volume.beta.kubernetes.io/storage-class: "fast"
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 50Gi
```

2. **Remove** the following flags from the file (lines 49 and 50):
    

```json
- "--smallfiles"
- "--noprealloc"
```

3. Ensure that this section of your file looks like the following:
    

```javascript
containers:
        - name: mongo
          image: mongo
          command:
            - mongod
            - "--replSet"
            - rs0
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: mongo-persistent-storage
              mountPath: /data/db
```

4. Exit the nano editor with **CTRL**+**X** &gt; **Y** &gt; **ENTER**.
    

#### **Headless service: overview**

The first section of `mongo-statefulset.yaml` refers to a `headless service`. In Kubernetes terms, a service describes policies or rules for accessing specific pods. In brief, a headless service is one that doesn't prescribe load balancing. When combined with StatefulSets, this will give us individual DNSs to access our pods, and in turn a way to connect to all of our MongoDB nodes individually. In the `yaml` file, you can make sure that the service is headless by verifying that the `clusterIP` field is set to `None`.

#### **StatefulSet: overview**

The StatefulSet configuration is the second section of `mongo-statefulset.yaml.` This is the bread and butter of the application: it's the workload that runs MongoDB and what orchestrates your Kubernetes resources. Referencing the `yaml` file, we see that the first section describes the StatefulSet object. Then, we move into the Metadata section, where labels and the number of replicas are specified.

Next comes the pod spec. The `terminationGracePeriodSeconds` is used to gracefully shutdown the pod when you scale down the number of replicas. Then the configurations for the two containers are shown. The first one runs MongoDB with command line flags that configure the replica set name. It also mounts the persistent storage volume to `/data/db`: the location where MongoDB saves its data. The second container runs the sidecar. This [sidecar container](https://github.com/cvallance/mongo-k8s-sidecar) will configure the MongoDB replica set automatically. As mentioned earlier, a "sidecar" is a helper container that helps the main container run its jobs and tasks.

Finally, there is the `volumeClaimTemplates`. This is what talks to the StorageClass we created before to provision the volume. It provisions a 100 GB disk for each MongoDB replica.

#### **Deploy Headless Service and the StatefulSet**

Now that we have a basic understanding of what a headless service and StatefulSet are, let's go ahead and deploy them.

* Since the two are packaged in `mongo-statefulset.yaml`, we can run the following command to run both of them:
    

```apache
kubectl apply -f mongo-statefulset.yaml
```

You should receive the following output:

```apache
service/mongo created
statefulset.apps/mongo created
```

Click **Check my progress** to verify the objective.

Deploying the Headless Service and StatefulSet

**Check my progress**

### **Task 5. Connect to the MongoDB Replica set**

Now that we have a cluster running and our replica set deployed, let's go ahead and connect to it.

**Wait for the MongoDB replica set to be fully deployed**

Kubernetes StatefulSets deploys each pod sequentially. It waits for the MongoDB replica set member to fully boot up and create the backing disk before starting the next member.

* Run the following command to view and confirm that all three members are up:
    

```apache
kubectl get statefulset
```

**Output - all three members are up:**

```javascript
NAME    READY   AGE
mongo   3/3     103s
```

**Initiating and Viewing the MongoDB replica set**

At this point, you should have three pods created in your cluster. These correspond to the three nodes in your MongoDB replica set.

1. Run this command to view:
    

```apache
kubectl get pods
```

**Output:**

```javascript
NAME        READY     STATUS    RESTARTS   AGE
mongo-0     2/2       Running   0          3m
mongo-1     2/2       Running   0          3m
mongo-2     2/2       Running   0          3m
```

2. Wait for all three members to be created before moving on.
    
3. Connect to the first replica set member:
    

```apache
kubectl exec -ti mongo-0 -- mongosh
```

You now have a `REPL` environment connected to the MongoDB.

4. Let's instantiate the replica set with a default configuration by running the `rs.initiate()` command:
    

```javascript
rs.initiate()
```

5. Print the replica set configuration; run the `rs.conf()` command:
    

```javascript
rs.conf()
```

This outputs the details for the current member of replica set `rs0`. In this lab you see only one member. To get details of all members you need to expose the replica set through additional services like [nodeport](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) or [load balancer](https://cloud.google.com/compute/docs/load-balancing/http/).

```javascript
rs0:OTHER> rs.conf()
{
        "_id" : "rs0",
        "version" : 1,
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "localhost:27017",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {
                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {
                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("5c526b6501fa2d29fc65c48c")
        }
}
```

6. Type "exit" and press enter to quit the `REPL`.
    

### **Task 6. Scaling the MongoDB replica set**

A big advantage of Kubernetes and StatefulSets is that you can scale the number of MongoDB Replicas up and down with a single command!

1. To scale up the number of replica set members from 3 to 5, run this command:
    

```apache
kubectl scale --replicas=5 statefulset mongo
```

In a few minutes, there will be 5 MongoDB pods.

2. Run this command to view them:
    

```apache
kubectl get pods
```

Your output should look like this:

```javascript
NAME      READY     STATUS    RESTARTS   AGE
mongo-0   2/2       Running   0          41m
mongo-1   2/2       Running   0          39m
mongo-2   2/2       Running   0          37m
mongo-3   2/2       Running   0          4m
mongo-4   2/2       Running   0          2m
```

3. To scale down the number of replica set members from 5 back to 3, run this command:
    

```apache
kubectl scale --replicas=3 statefulset mongo
```

In a few seconds, there are 3 MongoDB pods.

4. Run this command to view:
    

```apache
kubectl get pods
```

Your output should look like this:

```javascript
NAME      READY     STATUS    RESTARTS   AGE
mongo-0   2/2       Running   0          41m
mongo-1   2/2       Running   0          39m
mongo-2   2/2       Running   0          37m
```

Click **Check my progress** to verify the objective.

Scaling the MongoDB replica set

**Check my progress**

### **Task 7. Using the MongoDB replica set**

Each pod in a StatefulSet backed by a Headless Service will have a stable DNS name. The template follows this format: `<pod-name>.<service-name>`

This means the DNS names for the MongoDB replica set are:

```javascript
mongo-0.mongo
mongo-1.mongo
mongo-2.mongo
```

You can use these names directly in the [connection string URI](http://docs.mongodb.com/manual/reference/connection-string) of your app.

Using a database is outside the scope of this lab, however for this case, the connection string URI would be:

```javascript
"mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo:27017/dbname_?"
```

### **Task 8. Clean up**

Because you are working in a lab environment, when you end the lab all your resources and your project will be cleaned up and discarded on your behalf. But we want to show you how to clean up resources yourself to save on cost and to be a good cloud citizen when you are in your own environment.

To clean up the deployed resources, run the following commands to delete the StatefulSet, Headless Service, and the provisioned volumes.

1. Delete the StatefulSet:
    

```apache
kubectl delete statefulset mongo
```

2. Delete the service:
    

```apache
kubectl delete svc mongo
```

3. Delete the volumes:
    

```apache
kubectl delete pvc -l role=mongo
```

4. Finally, you can delete the test cluster:
    

```javascript
gcloud container clusters delete "hello-world"
```

5. Press **Y** then **Enter** to continue deleting the test cluster.
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=u8aFop9_I34]