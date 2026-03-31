---
title: "How to Use a Network Policy on Google Kubernetes Engine - GSP480"
seoTitle: "How to Use a Network Policy on Google Kubernetes Engine - GS"
seoDescription: "The Principle of Least Privilege is widely recognized as an important design consideration in enhancing the protection of critical systems from faults"
datePublished: 2026-02-28T05:36:26.946Z
cuid: cmm5w1v0900dg1qi5172rhlod
slug: how-to-use-a-network-policy-on-google-kubernetes-engine-gsp480
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/35967f31-5a24-4551-b85f-f32823f46dad.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/af6f2231-e269-45f2-b3c3-2b86fcd44b33.png
tags: how-to-use-a-network-policy-on-google-kubernetes-engine-gsp480, how-to-use-a-network-policy-on-google-kubernetes-engine

---

## **Overview**

This lab will show you how to improve the security of your Kubernetes Engine by applying fine-grained restrictions to network communication.

The [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) is widely recognized as an important design consideration in enhancing the protection of critical systems from faults and malicious behavior. It suggests that every component must be able to access **only** the information and resources that are necessary for its legitimate purpose. This document demonstrates how the Principle of Least Privilege can be implemented within the Kubernetes Engine network layer.

Network connections can be restricted at two tiers of your Kubernetes Engine infrastructure. The first, and coarser grained, mechanism is the application of Firewall Rules at the Network, Subnetwork, and Host levels. These rules are applied outside of the Kubernetes Engine at the VPC level.

While Firewall Rules are a powerful security measure, and Kubernetes enables you to define even finer grained rules via Network Policies. [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) are used to limit intra-cluster communication. Network policies do not apply to pods attached to the host's network namespace.

For this lab you will provision a private Kubernetes Engine cluster and a bastion host with which to access it. A bastion host provides a single host that has access to the cluster, which, when combined with a private Kubernetes network, ensures that the cluster isn't exposed to malicious behavior from the internet at large. Bastions are particularly useful when you do not have VPN access to the cloud network.

Within the cluster, a simple HTTP server and two client pods will be provisioned. You will learn how to use a Network Policy and labeling to only allow connections from one of the client pods.

This lab was created by GKE Helmsman engineers to give you a better understanding of GKE Binary Authorization. You can view this demo by running `gsutil cp -r gs://spls/gke-binary-auth/* .` and `cd gke-binary-auth-demo` command in cloud shell. We encourage any and all to contribute to our assets!

## **Architecture**

You will define a private, standard mode Kubernetes cluster that uses Dataplane V2. Dataplane V2 has network policies enabled by default.

Since the cluster is private, neither the API nor the worker nodes will be accessible from the internet. Instead, you will define a bastion host and use a firewall rule to enable access to it. The bastion's IP address is defined as an authorized network for the cluster, which grants it access to the API.

Within the cluster, provision three workloads:

1.  hello-server: this is a simple HTTP server with an internally-accessible endpoint
    
2.  hello-client-allowed: this is a single pod that repeatedly attempts to access hello-server. The pod is labeled such that the Network Policy will allow it to connect to hello-server.
    
3.  hello-client-blocked: this runs the same code as hello-client-allowed but the pod is labeled such that the Network Policy will **not** allow it to connect to hello-server.
    

![Kubernetes cluster diagram](https://cdn.qwiklabs.com/hk%2FxJLR97fdUVv6wUeXrNnsWxUr7OaAbdS8uCBFOUX4%3D align="center")

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    *   The Open Google Cloud console button
        
    *   Time remaining
        
    *   The temporary credentials that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-04-6d2194db0024@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    uEaNw77wW5EL
    ```
    
    You can also find the Password in the Lab Details pane.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1.  Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    at the top of the Google Cloud console.
    
2.  Click through the following windows:
    
    *   Continue through the Cloud Shell information window.
        
    *   Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-668b9ffe0190`. The output contains a line that declares the **Project\_ID** for this session:

```plaintext
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-668b9ffe0190
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3.  (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```

4.  Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-04-6d2194db0024@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-02-668b9ffe0190
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Clone demo

1.  Copy the resources needed for this lab exercise from a Cloud Storage bucket:
    

```plaintext
gsutil cp -r gs://spls/gsp480/gke-network-policy-demo .
```

2.  Go into the directory for the demo:
    

```plaintext
cd gke-network-policy-demo
```

3.  Make the demo files executable:
    

```plaintext
chmod -R 755 *
```

## **Task 1. Lab setup**

First, set the Google Cloud region and zone.

1.  Set the Google Cloud region.
    

```plaintext
gcloud config set compute/region "europe-west1"
```

2.  Set the Google Cloud zone.
    

```plaintext
gcloud config set compute/zone "europe-west1-d"
```

This lab will use the following Google Cloud Service APIs, and have been enabled for you:

*   `compute.googleapis.com`
    
*   `container.googleapis.com`
    
*   `cloudbuild.googleapis.com`
    

In addition, the Terraform configuration takes three parameters to determine where the Kubernetes Engine cluster should be created:

*   `project ID`
    
*   `region`
    
*   `zone`
    

For simplicity, these parameters are specified in a file named `terraform.tfvars`, in the `terraform` directory.

3.  To ensure the appropriate APIs are enabled and to generate the `terraform/terraform.tfvars` file based on your gcloud defaults, run:
    

```plaintext
make setup-project
```

4.  Type `y` when asked to confirm.
    

This will enable the necessary Service APIs, and it will also generate a `terraform/terraform.tfvars` file with the following keys.

5.  Verify the values themselves will match the output of `gcloud config list` by running:
    

```plaintext
cat terraform/terraform.tfvars
```

### Provisioning the Kubernetes Engine cluster

1.  Next, apply the Terraform configuration within the project root:
    

```plaintext
make tf-apply
```

2.  When prompted, review the generated plan and enter `yes` to deploy the environment.
    

This will take several minutes to deploy.

## **Task 2. Validation**

Terraform outputs a message when the cluster's been successfully created.

```plaintext
...snip...
google_container_cluster.primary: Still creating... (3m0s elapsed)
google_container_cluster.primary: Still creating... (3m10s elapsed)
google_container_cluster.primary: Still creating... (3m20s elapsed)
google_container_cluster.primary: Still creating... (3m30s elapsed)
google_container_cluster.primary: Creation complete after 3m34s (ID: gke-demo-cluster)

Apply complete! Resources: 5 added, 0 changed, 0 destroyed.
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully deployed necessary infrastructure with Terraform, you will see an assessment score.

Use Terraform to set up the necessary infrastructure (Lab setup)

1.  Now ssh into the bastion for the remaining steps:
    

```plaintext
gcloud compute ssh gke-demo-bastion
```

Existing versions of kubectl and custom Kubernetes clients contain provider-specific code to manage authentication between the client and Google Kubernetes Engine. Starting with v1.26, this code will no longer be included as part of the OSS kubectl. GKE users will need to download and use a separate authentication plugin to generate GKE-specific tokens. This new binary, `gke-gcloud-auth-plugin`, uses the [Kubernetes Client-go Credential Plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins) mechanism to extend kubectl’s authentication to support GKE. For more information, you can check out the following [documentation](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke).

To have kubectl use the new binary plugin for authentication instead of using the default provider-specific code, use the following steps.

2.  Once connected, run the following command to install the `gke-gcloud-auth-plugin` on the VM.
    

```plaintext
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
```

3.  Set `export USE_GKE_GCLOUD_AUTH_PLUGIN=True` in `~/.bashrc`:
    

```plaintext
echo "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" >> ~/.bashrc
```

4.  Run the following command:
    

```plaintext
source ~/.bashrc
```

5.  Run the following command to force the config for this cluster to be updated to the Client-go Credential Plugin configuration.
    

```plaintext
gcloud container clusters get-credentials gke-demo-cluster --zone europe-west1-d
```

On success, you should see this message:

```plaintext
kubeconfig entry generated for gke-demo-cluster.
```

The newly-created cluster will now be available for the standard `kubectl` commands on the bastion.

## **Task 3. Installing the hello server**

The test application consists of one simple HTTP server, deployed as `hello-server`, and two clients, one of which will be labeled `app=hello` and the other `app=not-hello`.

All three services can be deployed by applying the hello-app manifests.

1.  On the bastion, run:
    

```plaintext
kubectl apply -f ./manifests/hello-app/
```

Output:

```plaintext
deployment.apps/hello-client-allowed created
deployment.apps/hello-client-blocked created
service/hello-server created
deployment.apps/hello-server created
```

2.  Verify all three pods have been successfully deployed:
    

```plaintext
kubectl get pods
```

You will see one running pod for each of *hello-client-allowed*, *hello-client-blocked*, and *hello-server* deployments.

```plaintext
NAME                                      READY     STATUS    RESTARTS   AGE
hello-client-allowed-7d95fcd5d9-t8fsk   |  1/1      Running   0          14m
hello-client-blocked-6497db465d-ckbn8   |  1/1      Running   0          14m
hello-server-7df58f7fb5-nvcvd           |  1/1      Running   0          14m
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully deployed a simple HTTP hello server, you will see an assessment score.

Installing the hello server

## **Task 4. Confirming default access to the hello server**

1.  First, tail the "allowed" client:
    

```plaintext
kubectl logs --tail 10 -f $(kubectl get pods -oname -l app=hello)
```

Press CTRL+C to exit.

2.  Second, tail the logs of the "blocked" client:
    

```plaintext
kubectl logs --tail 10 -f $(kubectl get pods -oname -l app=not-hello)
```

3.  Press CTRL+C to exit.
    

You will notice that both pods are successfully able to connect to the `hello-server` service. This is because you have not yet defined a Network Policy to restrict access. In each of these windows you should see successful responses from the server.

```plaintext
Hostname: hello-server-7df58f7fb5-nvcvd
Hello, world!
Version: 1.0.0
Hostname: hello-server-7df58f7fb5-nvcvd
Hello, world!
Version: 1.0.0
Hostname: hello-server-7df58f7fb5-nvcvd
...
```

## **Task 5. Restricting access with a Network Policy**

Now you will block access to the `hello-server` pod from all pods that are not labeled with `app=hello`.

The policy definition you'll use is contained in `manifests/network-policy.yaml`

1.  Apply the policy with the following command:
    

```plaintext
kubectl apply -f ./manifests/network-policy.yaml
```

Output:

```plaintext
networkpolicy.networking.k8s.io/hello-server-allow-from-hello-client created
```

2.  Tail the logs of the "blocked" client again:
    

```plaintext
kubectl logs --tail 10 -f $(kubectl get pods -oname -l app=not-hello)
```

You'll now see that the output looks like this in the window tailing the "blocked" client:

```plaintext
wget: download timed out
wget: download timed out
wget: download timed out
wget: download timed out
wget: download timed out
wget: download timed out
wget: download timed out
wget: download timed out
wget: download timed out
...
```

The network policy has now prevented communication to the `hello-server` from the unlabeled pod.

3.  Press CTRL+C to exit.
    

## **Task 6. Restricting namespaces with Network Policies**

In the previous example, you defined a network policy that restricts connections based on pod labels. It is often useful to instead label entire namespaces, particularly when teams or applications are granted their own namespaces.

You'll now modify the network policy to only allow traffic from a designated namespace, then you'll move the `hello-allowed` pod into that new namespace.

1.  First, delete the existing network policy:
    

```plaintext
kubectl delete -f ./manifests/network-policy.yaml
```

Output:

```plaintext
networkpolicy.networking.k8s.io "hello-server-allow-from-hello-client" deleted
```

2.  Create the namespaced version:
    

```plaintext
kubectl create -f ./manifests/network-policy-namespaced.yaml
```

Output:

```plaintext
networkpolicy.networking.k8s.io/hello-server-allow-from-hello-client created
```

3.  Now observe the logs of the `hello-allowed-client` pod in the default namespace:
    

```plaintext
kubectl logs --tail 10 -f $(kubectl get pods -oname -l app=hello)
```

You will notice it is no longer able to connect to the `hello-server`.

4.  Press CTRL+C to exit.
    
5.  Finally, deploy a second copy of the hello-clients app into the new namespace.
    

```plaintext
kubectl -n hello-apps apply -f ./manifests/hello-app/hello-client.yaml
```

Output:

```plaintext
deployment.apps/hello-client-allowed created
deployment.apps/hello-client-blocked created
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully deployed a second copy of the hello-clients app into the new namespace, you will see an assessment score.

Deploy a second copy of the hello-clients app into the new namespace

## **Task 7. Validation**

Next, check the logs for the two new `hello-app` clients.

1.  View the logs for the "hello" labeled app in the app in the `hello-apps` namespace by running:
    

```plaintext
kubectl logs --tail 10 -f -n hello-apps $(kubectl get pods -oname -l app=hello -n hello-apps)
```

Output:

```plaintext
Hostname: hello-server-6c6fd59cc9-7fvgp
Hello, world!
Version: 1.0.0
Hostname: hello-server-6c6fd59cc9-7fvgp
Hello, world!
Version: 1.0.0
Hostname: hello-server-6c6fd59cc9-7fvgp
Hello, world!
Version: 1.0.0
Hostname: hello-server-6c6fd59cc9-7fvgp
Hello, world!
Version: 1.0.0
Hostname: hello-server-6c6fd59cc9-7fvgp
```

Both clients are able to connect successfully because *as of Kubernetes 1.10.x NetworkPolicies do not support restricting access to pods within a given namespace*. You can allowlist by pod label, namespace label, or allowlist the union (i.e. OR) of both. But you cannot yet allowlist the intersection (i.e. AND) of pod labels and namespace labels.

2.  Press CTRL+C to exit.
    

## **Task 8. Teardown**

Qwiklabs will take care of shutting down all the resources used for this lab, but here’s what you would need to do to clean up your own environment to save on cost and to be a good cloud citizen:

1.  Log out of the bastion host:
    

```plaintext
exit
```

2.  Run the following to destroy the environment:
    

```plaintext
make teardown
```

Output:

```plaintext
...snip...
google_compute_subnetwork.cluster-subnet: Still destroying... (ID: us-east1/kube-net-subnet, 20s elapsed)
google_compute_subnetwork.cluster-subnet: Destruction complete after 25s
google_compute_network.gke-network: Destroying... (ID: kube-net)
google_compute_network.gke-network: Still destroying... (ID: kube-net, 10s elapsed)
google_compute_network.gke-network: Still destroying... (ID: kube-net, 20s elapsed)
google_compute_network.gke-network: Destruction complete after 26s

Destroy complete! Resources: 5 destroyed.
```

## **Task 9. Troubleshooting in your own environment**

### The install script fails with a "permission denied" error when running Terraform

The credentials that Terraform is using do not provide the necessary permissions to create resources in the selected projects. Ensure that the account listed in `gcloud config list` has necessary permissions to create resources. If it does, regenerate the application default credentials using `gcloud auth application-default login`.

### Invalid fingerprint error during Terraform operations

Terraform occasionally complains about an invalid fingerprint, when updating certain resources.

If you see the error below, simply re-run the command.

![terraform fingerprint error](https://cdn.qwiklabs.com/MovqAAg0Chnh9QY%2BsrRn5WUzsqrVNSRw6sB2lF46U1w%3D align="center")

* * *

## Solution of Lab

### Quick

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP480/lab.sh
source lab.sh
```

* * *

### Manual

<iframe type="youtube" src="https://www.youtube.com/watch?v=s8CM56JowgQ" data-node-type="hn-embed"></iframe>