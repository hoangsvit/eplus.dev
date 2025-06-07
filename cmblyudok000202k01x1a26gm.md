---
title: "Using Role-based Access Control in Kubernetes Engine - GSP493"
seoTitle: "Using Role-based Access Control in Kubernetes Engine - GSP493"
seoDescription: "This lab covers the usage and debugging of role-based access control (RBAC) in a Kubernetes Engine cluster.

While RBAC resource definitions are standard ac"
datePublished: Sat Jun 07 2025 08:22:09 GMT+0000 (Coordinated Universal Time)
cuid: cmblyudok000202k01x1a26gm
slug: using-role-based-access-control-in-kubernetes-engine-gsp493
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749284435934/fe4c29da-0d23-46dd-8c5d-7411757c4d74.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749284507632/22cfdccf-204c-4dfb-a637-02e650a2d557.png
tags: kubernetes, using-role-based-access-control-in-kubernetes-engine-gsp493, using-role-based-access-control-in-kubernetes-engine, gsp493, kubernetes-engine

---

## Overview

This lab covers the usage and debugging of [role-based access control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) in a Kubernetes Engine cluster.

While RBAC resource definitions are standard across all Kubernetes platforms, their interaction with underlying authentication and authorization providers needs to be understood when building on any cloud provider.

RBAC is a powerful security mechanism that provides great flexibility in how you restrict operations within a cluster. This lab will cover two use cases for RBAC:

1. Assigning different permissions to user personas, namely owners and auditors.
    
2. Granting limited API access to an application running within your cluster.
    

Since RBAC's flexibility can occasionally result in complex rules, common steps for troubleshooting RBAC are included as part of scenario 2.

## Architecture

This lab focuses on the use of RBAC within a Kubernetes Engine cluster. It demonstrates how varying levels of cluster privilege can be granted to different user personas. You will provision two service accounts to represent user personas and three namespaces: dev, test, and prod. The "owner" persona will have read-write access to all three namespaces, while the "auditor" persona will have read-only access and be restricted to the dev namespace.

This lab was created by GKE Helmsman engineers to help you grasp a better understanding of Using role-based access controls in GKE. You can [view this demo on Github](https://github.com/GoogleCloudPlatform/gke-rbac-demo.git). We encourage any and all to contribute to our assets!

![Architecture Diagram](https://cdn.qwiklabs.com/s7ZjmSO2Z2fvTB1Dw4GAXuGlJQkmii7Jyvd12Wzcsu4%3D align="left")

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
    "Username"
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    "Password"
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `PROJECT_ID`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to "PROJECT_ID"
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
ACCOUNT: "ACCOUNT"

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
project = "PROJECT_ID"
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

Learn more about regions and zones and see a complete list in [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/).

Run the following to set a region and zone for your lab (you can use the region/zone that's best for you):

```apache
gcloud config set compute/region REGION
gcloud config set compute/zone ZONE
```

## Task 1. Verify the cluster

Confirm the pre created cluster in the Console. Go to **Navigation menu** &gt; **Kubernetes Engine** &gt; **Clusters** and click on the 'rbac-demo-cluster' cluster. Ensure that Legacy Authorization is disabled for the new cluster.

![Cluster settings in console](https://cdn.qwiklabs.com/HMekjKZOqJ2Gw9B%2FPaimNfnE3C1geKfjUeWwWSUJqM0%3D align="left")

## Task 2. Scenario 1: Assigning permissions by user persona

### IAM - role

A role named `kube-api-ro-xxxxxxxx` (where `xxxxxxxx` is a random string) has been created with the permissions below as part of the Terraform configuration in `iam.tf`. These permissions are the minimum required for any user that requires access to the Kubernetes API.

* container.apiServices.get
    
* container.apiServices.list
    
* container.clusters.get
    
* container.clusters.getCredentials
    

### Simulating users

Three service accounts have been created to act as Test Users:

* **admin:** has admin permissions over the cluster and all resources
    
* **owner:** has read-write permissions over common cluster resources
    
* **auditor:** has read-only permissions within the dev namespace only
    

1. Run the following:
    

```apache
gcloud iam service-accounts list
```

Three test hosts have been provisioned by the Terraform script. Each node has `kubectl` and `gcloud` installed and configured to simulate a different user persona.

* **gke-tutorial-admin**: kubectl and gcloud are authenticated as a cluster administrator.
    
* **gke-tutorial-owner**: simulates the `owner` account
    
* **gke-tutorial-auditor**: simulates the `auditor` account
    

2. Run the following:
    

```apache
gcloud compute instances list
```

Output:

```apache
NAME                                             ZONE           MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
rbac-demo-cluster-default-pool-a9cd3468-4vpc    ZONE  n1-standard-1                10.0.96.5                    RUNNING
rbac-demo-cluster-default-pool-a9cd3468-b47f    ZONE  n1-standard-1                10.0.96.6                    RUNNING
rbac-demo-cluster-default-pool-a9cd3468-rt5p    ZONE  n1-standard-1                10.0.96.7                    RUNNING
gke-tutorial-auditor                            ZONE  f1-micro                     10.0.96.4    35.224.148.28    RUNNING
gke-tutorial-admin                              ZONE  f1-micro                     10.0.96.3    35.226.237.142   RUNNING
gke-tutorial-owner                              pZONE  f1-micro                     10.0.96.2    35.194.58.130    RUNNING
```

### Creating the RBAC rules

Create the Namespaces, Roles, and RoleBindings by logging into the admin instance and applying the `rbac.yaml` manifest.

1. SSH to the admin:
    

```apache
gcloud compute ssh gke-tutorial-admin
```

**Note:** Ignore the error which relates to gcp auth plugin.

Existing versions of kubectl and custom Kubernetes clients contain provider-specific code to manage authentication between the client and Google Kubernetes Engine. Starting with v1.26, this code will no longer be included as part of the OSS kubectl. GKE users will need to download and use a separate authentication plugin to generate GKE-specific tokens. This new binary, `gke-gcloud-auth-plugin`, uses the [Kubernetes Client-go Credential Plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins) mechanism to extend kubectl’s authentication to support GKE. For more information, you can check out the following [documentation](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke).

To have kubectl use the new binary plugin for authentication instead of using the default provider-specific code, use the following steps.

2. Once connected, run the following command to install the `gke-gcloud-auth-plugin` on the VM.
    

```apache
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
```

3. Set `export USE_GKE_GCLOUD_AUTH_PLUGIN=True` in `~/.bashrc`:
    

```apache
echo "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" >> ~/.bashrc
```

4. Run the following command:
    

```apache
source ~/.bashrc
```

5. Run the following command to force the config for this cluster to be updated to the Client-go Credential Plugin configuration.
    

```apache
gcloud container clusters get-credentials rbac-demo-cluster --zone ZONE
```

On success, you should see this message pop up:

```apache
Kubeconfig entry generated for dev-cluster.
```

The newly-created cluster will now be available for the standard `kubectl` commands on the bastion.

6. Create the namespaces, roles, and bindings:
    

```apache
kubectl apply -f ./manifests/rbac.yaml
```

Output:

```apache
namespace/dev created
namespace/prod created
namespace/test created
role.rbac.authorization.k8s.io/dev-ro created
clusterrole.rbac.authorization.k8s.io/all-rw created
clusterrolebinding.rbac.authorization.k8s.io/owner-binding created
rolebinding.rbac.authorization.k8s.io/auditor-binding created
```

Click *Check my progress* to verify the objective.

Creating the RBAC rules

**Check my progress**

### Managing resources as the owner

1. Open a new Cloud Shell terminal by clicking the **+** at the top of the terminal window.
    

You will now SSH into the owner instance and create a simple deployment in each namespace.

2. SSH to the "owner" instance:
    

```apache
gcloud compute ssh gke-tutorial-owner
```

**Note:** Ignore the error which relates to gcp auth plugin.

3. When prompted about the zone, enter `n`, so the default zone is used.
    
4. Install gke-gcloud-auth-plugin:
    

```apache
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
echo "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" >> ~/.bashrc
source ~/.bashrc
gcloud container clusters get-credentials rbac-demo-cluster --zone ZONE
```

5. Create a server in each namespace, first `dev`:
    

```apache
kubectl create -n dev -f ./manifests/hello-server.yaml
```

Output:

```apache
service/hello-server created
deployment.apps/hello-server created
```

6. And then `prod`:
    

```apache
kubectl create -n prod -f ./manifests/hello-server.yaml
```

Output:

```apache
service/hello-server created
deployment.apps/hello-server created
```

7. Then `test`:
    

```apache
kubectl create -n test -f ./manifests/hello-server.yaml
```

Output:

```apache
service/hello-server created
deployment.apps/hello-server created
```

Click *Check my progress* to verify the objective.

Create a server in each namespace

**Check my progress**

As the owner, you will also be able to view all pods.

* On the "owner" instance list all `hello-server` pods in all namespaces by running:
    

```apache
kubectl get pods -l app=hello-server --all-namespaces
```

Output:

```apache
NAMESPACE   NAME                            READY     STATUS    RESTARTS   AGE
dev         hello-server-6c6fd59cc9-h6zg9   1/1       Running   0          6m
prod        hello-server-6c6fd59cc9-mw2zt   1/1       Running   0          44s
test        hello-server-6c6fd59cc9-sm6bs   1/1       Running   0          39s
```

### Viewing resources as the auditor

Now you will open a new terminal, SSH into the auditor instance, and try to view all namespaces.

1. Open a new Cloud Shell terminal by clicking the **+** at the top of the terminal window.
    
2. SSH to the "auditor" instance:
    

```apache
gcloud compute ssh gke-tutorial-auditor
```

**Note:** Ignore the error which relates to gcp auth plugin.

3. When prompted about the zone, enter `n`, so the default zone is used.
    
4. Install gke-gcloud-auth-plugin:
    

```apache
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
echo "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" >> ~/.bashrc
source ~/.bashrc
gcloud container clusters get-credentials rbac-demo-cluster --zone ZONE
```

5. On the "auditor" instance, list all `hello-server` pods in all namespaces with the following:
    

```apache
kubectl get pods -l app=hello-server --all-namespaces
```

You should see an error like the following:

```apache
Error from server (Forbidden): pods is forbidden: User "gke-tutorial-auditor@myproject.iam.gserviceaccount.com" cannot list pods at the cluster scope: Required "container.pods.list" permission
```

The error indicates that you don't have sufficient permissions. The auditor role is restricted to viewing only the resources in the dev namespace, so you'll need to specify the namespace when viewing resources.

Now attempt to view pods in the dev namespace.

6. On the "auditor" instance run the following:
    

```apache
kubectl get pods -l app=hello-server --namespace=dev
```

Output:

```apache
NAME                            READY     STATUS    RESTARTS   AGE
hello-server-6c6fd59cc9-h6zg9   1/1       Running   0          13m
```

7. Try to view pods in the test namespace:
    

```apache
kubectl get pods -l app=hello-server --namespace=test
```

Output:

```apache
Error from server (Forbidden): pods is forbidden: User "gke-tutorial-auditor@myproject.iam.gserviceaccount.com" cannot list pods in the namespace "test": Required "container.pods.list" permission.
```

8. Attempt to view pods in the prod namespace:
    

```apache
kubectl get pods -l app=hello-server --namespace=prod
```

Output:

```apache
Error from server (Forbidden): pods is forbidden: User "gke-tutorial-auditor@myproject.iam.gserviceaccount.com" cannot list pods in the namespace "prod": Required "container.pods.list" permission.
```

Finally, verify that the auditor has read-only access by trying to create and delete a deployment in the dev namespace.

9. On the "auditor" instance attempt to create a deployment:
    

```apache
kubectl create -n dev -f manifests/hello-server.yaml
```

Output:

```apache
Error from server (Forbidden): error when creating "manifests/hello-server.yaml": services is forbidden: User "gke-tutorial-auditor@myproject.iam.gserviceaccount.com" cannot create services in the namespace "dev": Required "container.services.create" permission.
Error from server (Forbidden): error when creating "manifests/hello-server.yaml": deployments.extensions is forbidden: User "gke-tutorial-auditor@myproject.iam.gserviceaccount.com" cannot create deployments.extensions in the namespace "dev": Required "container.deployments.create" permission.
```

10. On the "auditor" instance, attempt to delete the deployment:
    

```apache
kubectl delete deployment -n dev -l app=hello-server
```

Output:

```apache
Error from server (Forbidden): deployments.extensions "hello-server" is forbidden: User "gke-tutorial-auditor@myproject.iam.gserviceaccount.com" cannot update deployments.extensions in the namespace "dev": Required "container.deployments.update" permission.
```

## Task 3. Scenario 2: Assigning API permissions to a cluster application

In this scenario you'll go through the process of deploying an application that requires access to the Kubernetes API as well as configure RBAC rules while troubleshooting some common use cases.

### Deploying the sample application

The sample application will run as a single pod that periodically retrieves all pods in the default namespace from the API server and then applies a timestamp label to each one.

1. From the **admin** instance (this should be your first Cloud Shell tab), deploy the `pod-labeler` application. This will also deploy a Role, ServiceAccount, and RoleBinding for the pod:
    

```apache
kubectl apply -f manifests/pod-labeler.yaml
```

Output:

```apache
role.rbac.authorization.k8s.io/pod-labeler created
serviceaccount/pod-labeler created
rolebinding.rbac.authorization.k8s.io/pod-labeler created
deployment.apps/pod-labeler created
```

Click *Check my progress* to verify the objective.

Deploying the sample application

**Check my progress**

### Diagnosing an RBAC misconfiguration

Now check the status of the pod. Once the container has finished creating, you'll see it error out. Investigate the error by inspecting the pods' events and logs.

1. On the **admin** instance check the pod status:
    

```apache
kubectl get pods -l app=pod-labeler
```

Output:

```apache
NAME                           READY     STATUS    RESTARTS   AGE
pod-labeler-6d9757c488-tk6sp   0/1       Error     1          1m
```

2. On the **admin** instance, view the pod event stream by running:
    

```apache
kubectl describe pod -l app=pod-labeler | tail -n 20
```

You should see:

```apache
Events:
  Type     Reason     Age                     From                                                       Message
  ----     ------     ----                    ----                                                       -------
  Normal   Scheduled  7m35s                   default-scheduler                                          Successfully assigned default/pod-labeler-5b4bd6cf9-w66jd to gke-rbac-demo-cluster-default-pool-3d348201-x0pk
  Normal   Pulling    7m34s                   kubelet, gke-rbac-demo-cluster-default-pool-3d348201-x0pk  pulling image "gcr.io/pso-examples/pod-labeler:0.1.5"
  Normal   Pulled     6m56s                   kubelet, gke-rbac-demo-cluster-default-pool-3d348201-x0pk  Successfully pulled image "gcr.io/pso-examples/pod-labeler:0.1.5"
  Normal   Created    5m29s (x5 over 6m56s)   kubelet, gke-rbac-demo-cluster-default-pool-3d348201-x0pk  Created container
  Normal   Pulled     5m29s (x4 over 6m54s)   kubelet, gke-rbac-demo-cluster-default-pool-3d348201-x0pk  Container image "gcr.io/pso-examples/pod-labeler:0.1.5" already present on machine
  Normal   Started    5m28s (x5 over 6m56s)   kubelet, gke-rbac-demo-cluster-default-pool-3d348201-x0pk  Started container
  Warning  BackOff    2m25s (x23 over 6m52s)  kubelet, gke-rbac-demo-cluster-default-pool-3d348201-x0pk  Back-off restarting failed container
```

3. On the **admin** instance, run the following to check the pod's logs:
    

```apache
kubectl logs -l app=pod-labeler
```

Output:

```apache
Attempting to list pods
Traceback (most recent call last):
  File "label_pods.py", line 13, in <module>
    ret = v1.list_namespaced_pod("default",watch=False)
  File "build/bdist.linux-x86_64/egg/kubernetes/client/apis/core_v1_api.py", line 12310, in list_namespaced_pod
  File "build/bdist.linux-x86_64/egg/kubernetes/client/apis/core_v1_api.py", line 12413, in list_namespaced_pod_with_http_info
  File "build/bdist.linux-x86_64/egg/kubernetes/client/api_client.py", line 321, in call_api
  File "build/bdist.linux-x86_64/egg/kubernetes/client/api_client.py", line 155, in __call_api
  File "build/bdist.linux-x86_64/egg/kubernetes/client/api_client.py", line 342, in request
  File "build/bdist.linux-x86_64/egg/kubernetes/client/rest.py", line 231, in GET
  File "build/bdist.linux-x86_64/egg/kubernetes/client/rest.py", line 222, in request
kubernetes.client.rest.ApiException: (403)
Reason: Forbidden
HTTP response headers: HTTPHeaderDict({'Date': 'Fri, 25 May 2018 15:33:15 GMT', 'Audit-Id': 'ae2a0d7c-2ab0-4f1f-bd0f-24107d3c144e', 'Content-Length': '307', 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff'})
HTTP response body: {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"pods is forbidden: User \"system:serviceaccount:default:default\" cannot list pods in the namespace \"default\": Unknown user \"system:serviceaccount:default:default\"","reason":"Forbidden","details":{"kind":"pods"},"code":403}
</module>
```

Based on this error, you can see a permissions error when trying to list pods via the API.

4. The next step is to confirm you are using the correct ServiceAccount.
    

### Fixing the serviceAccountName

By inspecting the pod's configuration, you can see it is using the default ServiceAccount rather than the custom Service Account.

1. On the **admin** instance, run:
    

```apache
kubectl get pod -oyaml -l app=pod-labeler
```

Output:

```apache
    restartPolicy: Always
    schedulerName: default-scheduler
    securityContext:
      fsGroup: 9999
      runAsGroup: 9999
      runAsUser: 9999
    serviceAccount: default
```

The `pod-labeler-fix-1.yaml` file contains the fix in the deployment's template spec:

```apache
      # Fix 1, set the serviceAccount so RBAC rules apply
      serviceAccount: pod-labeler
```

Next you'll apply the fix and view the resulting change.

2. On the **admin** instance, apply the fix 1 by running:
    

```apache
kubectl apply -f manifests/pod-labeler-fix-1.yaml
```

Output:

```apache
role.rbac.authorization.k8s.io/pod-labeler unchanged
serviceaccount/pod-labeler unchanged
rolebinding.rbac.authorization.k8s.io/pod-labeler unchanged
deployment.apps/pod-labeler configured
```

3. View the change in the deployment configuration:
    

```apache
kubectl get deployment pod-labeler -oyaml
```

Changes in the output:

```apache
  ...
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: pod-labeler
  ...
```

Click *Check my progress* to verify the objective.

Fixing the service account name

**Check my progress**

### Diagnosing insufficient privileges

Once again, check the status of your pod and you'll notice it is still erring out, but with a different message this time.

1. On the **admin** instance check the status of your pod:
    

```apache
kubectl get pods -l app=pod-labeler
```

Output:

```apache
NAME                          READY     STATUS             RESTARTS   AGE
pod-labeler-c7b4fd44d-mr8qh   0/1       CrashLoopBackOff   3          1m
```

You may need to run the previous command again to see this output.

2. On the **admin** instance, check the pod's logs:
    

```apache
kubectl logs -l app=pod-labeler
```

Output:

```apache
  File "/usr/local/lib/python3.8/site-packages/kubernetes/client/rest.py", line 292, in PATCH
    return self.request("PATCH", url,
  File "/usr/local/lib/python3.8/site-packages/kubernetes/client/rest.py", line 231, in request
    raise ApiException(http_resp=r)
kubernetes.client.rest.ApiException: (403)
Reason: Forbidden
HTTP response headers: HTTPHeaderDict({'Audit-Id': 'f6c67c34-171f-42f3-b1c9-833e00cedd5e', 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', 'Date': 'Mon, 23 Mar 2020 16:35:18 GMT', 'Content-Length': '358'})
HTTP response body: {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"pods \"pod-labeler-659c8c99d5-t96pw\" is forbidden: User \"system:serviceaccount:default:pod-labeler\" cannot patch resource \"pods\" in API group \"\" in the namespace \"default\"","reason":"Forbidden","details":{"name":"pod-labeler-659c8c99d5-t96pw","kind":"pods"},"code":403}
```

Since this is failing on a PATCH operation, you can also see the error in Stackdriver. This is useful if the application logs are not sufficiently verbose.

3. In the Console, select **Navigation menu**, and in the Operations section, click on **Logging**.
    
4. In the **Query builder** dialog box, paste the following code and click **Run Query**:
    

```apache
protoPayload.methodName="io.k8s.core.v1.pods.patch"
```

5. Click on a down arrow next to a log record and explore the details.
    

### Identifying the application's role and permissions

Use the ClusterRoleBinding to find the ServiceAccount's role and permissions.

1. On the **admin** instance, inspect the `rolebinding` definition:
    

```apache
kubectl get rolebinding pod-labeler -oyaml
```

Output:

```apache
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleBinding","metadata":{"annotations":{},"name":"pod-labeler","namespace":"default"},"roleRef":{"apiGroup":"rbac.authorization.k8s.io","kind":"Role","name":"pod-labeler"},"subjects":[{"kind":"ServiceAccount","name":"pod-labeler"}]}
  creationTimestamp: "2020-03-23T16:29:05Z"
  name: pod-labeler
  namespace: default
  resourceVersion: "2886"
  selfLink: /apis/rbac.authorization.k8s.io/v1/namespaces/default/rolebindings/pod-labeler
  uid: 0e4d5be7-d986-40d0-af1d-a660f9aa4336
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: pod-labeler
subjects:
- kind: ServiceAccount
  name: pod-labeler
```

The `RoleBinding` shows you need to inspect the `pod-labeler` role in the default namespace. Here you can see the role is only granted permission to list pods.

2. On the **admin** instance, inspect the `pod-labeler` role definition:
    

```apache
kubectl get role pod-labeler -oyaml
```

Output:

```apache
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"annotations":{},"name":"pod-labeler","namespace":"default"},"rules":[{"apiGroups":[""],"resources":["pods"],"verbs":["list"]}]}
  creationTimestamp: "2020-03-23T16:29:05Z"
  name: pod-labeler
  namespace: default
  resourceVersion: "2883"
  selfLink: /apis/rbac.authorization.k8s.io/v1/namespaces/default/roles/pod-labeler
  uid: c8191869-c7de-42c6-98fc-79a91d9b02a1
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - list
```

Since the application requires PATCH permissions, you can add it to the "verbs" list of the role, which you will do now.

The `pod-labeler-fix-2.yaml` file contains the fix in it's rules/verbs section:

```apache
rules:
- apiGroups: [""] # "" refers to the core API group
  resources: ["pods"]
  verbs: ["list","patch"] # Fix 2: adding permission to patch (update) pods
```

Apply the fix and view the resulting configuration.

3. On the **admin** instance, apply `fix-2`:
    

```apache
kubectl apply -f manifests/pod-labeler-fix-2.yaml
```

Output:

```apache
role.rbac.authorization.k8s.io/pod-labeler configured
serviceaccount/pod-labeler unchanged
rolebinding.rbac.authorization.k8s.io/pod-labeler unchanged
deployment.apps/pod-labeler unchanged
```

Click *Check my progress* to verify the objective.

Identifying the application's role and permissions

**Check my progress**

4. On the **admin** instance, view the resulting change:
    

```apache
kubectl get role pod-labeler -oyaml
```

Output:

```apache
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"annotations":{},"name":"pod-labeler","namespace":"default"},"rules":[{"apiGroups":[""],"resources":["pods"],"verbs":["list","patch"]}]}
  creationTimestamp: "2020-03-23T16:29:05Z"
  name: pod-labeler
  namespace: default
  resourceVersion: "8802"
  selfLink: /apis/rbac.authorization.k8s.io/v1/namespaces/default/roles/pod-labeler
  uid: c8191869-c7de-42c6-98fc-79a91d9b02a1
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - list
  - patch
```

Because the `pod-labeler` may be in a back-off loop, the quickest way to test the fix is to kill the existing pod and let a new one take its place.

5. On the **admin** instance, run the following to kill the existing pod and let the deployment controller replace it:
    

```apache
kubectl delete pod -l app=pod-labeler
```

Output:

```apache
pod "pod-labeler-659c8c99d5-t96pw" deleted
```

### Verifying successful configuration

Finally, verify the new `pod-labeler` is running and check that the "updated" label has been applied.

1. On the **admin** instance, list all pods and show their labels:
    

```apache
kubectl get pods --show-labels
```

Output:

```apache
NAME                          READY     STATUS    RESTARTS   NAME                           READY   STATUS    RESTARTS   AGE   LABELS
pod-labeler-659c8c99d5-5qsmw   1/1     Running   0          31s   app=pod-labeler,pod-template-hash=659c8c99d5,updated=1584982487.6428008
```

2. View the pod's logs to verify there are no longer any errors:
    

```apache
kubectl logs -l app=pod-labeler
```

Output:

```apache
Attempting to list pods
labeling pod pod-labeler-659c8c99d5-5qsmw
labeling pod pod-labeler-659c8c99d5-t96pw
...
```

### Key take-aways

* Container and API server logs will be your best source of clues for diagnosing RBAC issues.
    
* Use RoleBindings or ClusterRoleBindings to determine which role is specifying the permissions for a pod.
    
* API server logs can be found in Stackdriver under the Kubernetes resource.
    
* Not all API calls will be logged to Stackdriver. Frequent, or verbose payloads are omitted by the Kubernetes' audit policy used in Kubernetes Engine. The exact policy will vary by Kubernetes version, but can be found in the [open source codebase](https://github.com/kubernetes/kubernetes/blob/master/cluster/gce/gci/configure-helper.sh#L740).
    

---

## Solution of Lab

%[https://youtu.be/gGSbtCVEkP8] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Using%20Role-based%20Access%20Control%20in%20Kubernetes%20Engine/techcps493.sh
sudo chmod +x techcps493.sh
./techcps493.sh
```