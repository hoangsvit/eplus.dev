---
title: "Google Kubernetes Engine Security: Binary Authorization - GSP479"
seoTitle: "Google Kubernetes Engine Security: Binary Authorization - GSP479"
seoDescription: "One of the key security concerns for running Kubernetes clusters is knowing what container images are running inside each pod and being able to account for"
datePublished: Sun Mar 09 2025 08:31:39 GMT+0000 (Coordinated Universal Time)
cuid: cm81djx0k000108l80zlw5jvj
slug: google-kubernetes-engine-security-binary-authorization-gsp479
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741507900920/dcfc48dd-bfd9-4e37-9d23-3cfddee9374c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741509076503/c48ad795-ba39-49ad-9e5d-c051e0934eec.png
tags: google-kubernetes-engine-security-binary-authorization-gsp479, google-kubernetes-engine-security-binary-authorization, gsp479

---

## **Overview**

One of the key security concerns for running Kubernetes clusters is knowing what container images are running inside each pod and being able to account for their origin. Establishing "container provenance" means having the ability to trace the source of a container to a trusted point of origin and ensuring your organization follows the desired processes during artifact (container) creation.

Some of the key concerns are:

* **Safe Origin** - How do you ensure that all container images running in the cluster come from an approved source?
    
* **Consistency and Validation** - How do you ensure that all desired validation steps were completed successfully for every container build and every deployment?
    
* **Integrity** - How do you ensure that containers were not modified before running after their provenance was proven?
    

From a security standpoint, not enforcing where images originate from presents several risks:

* A malicious actor that has compromised a container may be able to obtain sufficient cluster privileges to launch other containers from an unknown source without enforcement.
    
* An authorized user with the permissions to create pods may be able to accidentally or maliciously run an undesired container directly inside a cluster.
    
* An authorized user may accidentally or maliciously overwrite a docker image tag with a functional container that has undesired code silently added to it, and Kubernetes will pull and deploy that container as a part of a deployment automatically.
    

To help system operators address these concerns, Google Cloud offers a capability called [Binary Authorization](https://cloud.google.com/binary-authorization/). Binary Authorization is a Google Cloud managed service that works closely with GKE to enforce deploy-time security controls to ensure that only trusted container images are deployed. With Binary Authorization you can allowlist container registries, require images to be signed by trusted authorities, and centrally enforce those policies. By enforcing this policy, you can gain tighter control over your container environment by ensuring only approved and/or verified images are integrated into the build-and-release process.

This lab deploys a [Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) Cluster with the Binary Authorization feature enabled demonstrates how to allowlist approved container registries, and walks you through the process of creating and running a signed container.

This lab was created by GKE Helmsman engineers to give you a better understanding of GKE Binary Authorization. We encourage any one to contribute to our assets!

## **Architecture**

The Binary Authorization and Container Analysis APIs are based upon the open-source projects Grafeas and Kritis.

* Grafeas defines an API spec for managing metadata about software resources, such as container images, Virtual Machine (VM) images, JAR files, and scripts. You can use Grafeas to define and aggregate information about your project’s components.
    
* Kritis defines an API for ensuring a deployment is prevented unless the artifact (container image) is conformant to central policy and optionally has the necessary attestations present.
    

In a simplified container deployment pipeline such as this:

![Deployment pipeline](https://cdn.qwiklabs.com/%2F23XvJfZJKvYRYkgWMwl8JHpZKz6d52x4%2B%2Fi%2BxZ3cOE%3D align="left")

The container goes through at least 4 steps:

1. The source code for creating the container is stored in source control.
    
2. Upon committing a change to source control, the container is built and tested.
    
3. If the build and test steps are completed, the container image artifact is then placed in a central container registry, ready for deployment.
    
4. When a deployment of that container version is submitted to the Kubernetes API, the container runtime will pull that container image from the container registry and run it as a pod.
    

In a container build pipeline, there are opportunities to inject additional processes to signify or "attest" that each step was completed successfully. Examples include running unit tests, source control analysis checks, licensing verification, vulnerability analysis, and more. Each step could be given the power or "attestation authority" to sign for that step being completed. An "attestation authority" is a human or system with the correct PGP key and the ability to register that "attestation" with the Container Analysis API.

By using separate PGP keys for each step, each attestation step could be performed by different humans, systems, or build steps in the pipeline (a). Each PGP key is associated with an "attestation note" which is stored in the Container Analysis API. When a build step "signs" an image, a snippet of JSON metadata about that image is signed via PGP and that signed snippet is submitted to the API as a "note occurrence".

![Attestation diagram](https://cdn.qwiklabs.com/RXPfaDeQ1Mv%2Bs2RYXmRFIDD%2Be1AoKAf9qEOD9m5t%2F80%3D align="left")

(b).Once the container image has been built and the necessary attestations have been stored centrally, they are available for being queried as a part of a policy decision process. In this case, a [Kubernetes Admission Controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/), upon receiving an API request to `create` or `update` a Pod:

1. Send a WebHook to the Binary Authorization API for a policy decision.
    
2. The Binary Authorization policy is then consulted.
    
3. If necessary, the Container Analysis API is also queried for the necessary attestation occurrences.
    
4. If the container image conforms to the policy, it is allowed to run.
    
5. If the container image fails to meet the policy, an error is presented to the API client with a message describing why it was prevented.
    

![Enforce diagram](https://cdn.qwiklabs.com/2eczz6ago2COUKvuw9adq64v0g1SFqVaRTar7mLyTSc%3D align="left")

## **Setup and requirements**

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
    student-04-b42c6420db7d@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    Rfq56igLp8Xt
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-7a6a7be88d1d`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-7a6a7be88d1d
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
ACCOUNT: student-04-b42c6420db7d@qwiklabs.net

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
project = qwiklabs-gcp-01-7a6a7be88d1d
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Copy resources**

1. Now, you will copy the resources needed for this lab by running:
    

```apache
gsutil -m cp -r gs://spls/gke-binary-auth/* .
```

2. Go into the directory for this demo:
    

```apache
cd gke-binary-auth-demo
```

### Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

**Note**: Learn more about regions and zones and see a complete list in [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/).

Run the following to set a region and zone for your lab (you can use the region/zone that's best for you):

```apache
gcloud config set compute/region us-east4
gcloud config set compute/zone us-east4-a
```

### Updating files permissions

* Now, make some files readable, writable, and executable for resources needed for this lab:
    

```apache
chmod +x create.sh
chmod +x delete.sh
chmod 777 validate.sh
```

## **Task 2. Set default cluster version**

* Change the `create.sh`'s **GKE\_VERSION** variable to `defaultClusterVersion`:
    

```apache
sed -i 's/validMasterVersions\[0\]/defaultClusterVersion/g' ./create.sh
```

**Note:** The default cluster version will be compatible with other dependencies in this lab.

## **Task 3. Deployment steps**

**Note:** The following instructions are applicable for deployments performed both with and without Cloud Shell.

* To deploy the cluster, execute the following command. Feel free to replace the text `my-cluster-1` with the name of the cluster that you would like to create.
    

```apache
./create.sh -c my-cluster-1
```

The `create` script will output the following message when complete:

```apache
kubeconfig entry generated for my-cluster-1.
NAME          LOCATION       MASTER_VERSION  MASTER_IP        MACHINE_TYPE   NODE_VERSION   NUM_NODES  STATUS
my-cluster-1  us-east4-a  1.14.8-gke.17   104.154.181.211  n1-standard-1  1.14.8-gke.17  2          RUNNING
Fetching cluster endpoint and auth data.
kubeconfig entry generated for my-cluster-1.
```

The script will:

1. Enable the necessary APIs in your project. Specifically, `container`, `containerregistry`, `containeranalysis`, and `binaryauthorization`.
    
2. Create a new Kubernetes Engine cluster in your default ZONE, VPC and network.
    
3. Retrieve your cluster credentials to enable `kubectl` usage.
    

It is safe to ignore warnings.

## **Task 4. Validation**

* The following script will validate that the demo is deployed correctly:
    

```apache
./validate.sh -c my-cluster-1
```

If the script fails, it will output:

```apache
Validation Failed: the BinAuthZ policy was NOT available
```

And / Or

```apache
Validation Failed: the Container Analysis API was NOT available
```

If the script passes, it will output:

```apache
Validation Passed: the BinAuthZ policy was available
Validation Passed: the Container Analysis API was available
```

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Kubernetes cluster with Binary Authorization, you will see an assessment score.

Create a Kubernetes Cluster with Binary Authorization

Check my progress

## **Task 5. Using Binary Authorization**

### Managing the Binary Authorization Policy

To access the Binary Authorization Policy configuration UI, perform the following steps:

1. In the Google Cloud console, navigate to the **Security** &gt; **Binary Authorization**.
    

![Expanded Navigation menu with Binary Authorization option highlighted](https://cdn.qwiklabs.com/cQrrp%2B6bsJKEXu39TVLLUdvYCdfqP9Gnt48eAvj2IkM%3D align="left")

2. Click **Edit Policy**.
    

![Welcome to Binary Authorization page](https://cdn.qwiklabs.com/tSaLAfhV%2BMSloh4er0qUKDUDVBAd0ko6zeM2vFT25Xg%3D align="left")

**Note:** To access the Binary Authorization Policy configuration via `gcloud`:

* Run `gcloud beta container binauthz policy export > policy.yaml`
    
* Make the necessary edits to `policy.yaml`
    
* Run `gcloud beta container binauthz policy import policy.yaml`
    

The policy you are editing is the "default" policy, and it applies to *all GKE clusters in the Google Cloud project* unless a cluster-specific policy is in place.

The recommendation is to create policies specific to each cluster and achieve successful operation (allowlisting registries as needed), and then set the default project-level policy to "Deny All Images". Any new cluster in this project will then need its own cluster-specific policy.

3. After clicking **Edit Policy**, the following will appear.
    

![Edit policy page](https://cdn.qwiklabs.com/XR9j3hIMGQl2ZhCsWQUuX4S7bc1FwZTXJfGc58IsPDg%3D align="left")

The default policy rule is to `Allow all images`. This mimics the behavior as if Binary Authorization wasn't enabled on the cluster.

If the default rule is changed to `Disallow all images` or `Allow only images that have been approved by all of the following attestors`, then images that do not match the exempted registry image paths or do not have the required attestations will be blocked, respectively.

Next, you will make some edits to the policy:

4. Change your **Default rule** to `Disallow all images`
    
5. In Additional settings for GKE and Anthos deployments, click **Create Specific Rules**.
    
6. Select **GKE Cluster** from the dropdown and click **Change**.
    
7. Under **GKE Cluster-specific rules**, Click **Add Specific Rule**.
    
8. In the **Add GKE Cluster-specific rule** field, enter your location and cluster name in the form `location.clustername`. e.g. `us-east4-a`.my-cluster-1 which corresponds to the zone `us-east4-a` and the cluster name `my-cluster-1`.
    
9. Select the default rule of `Allow all images` for your cluster.
    
10. Click **ADD**.
    

![Add GKE cluster specific rule dialog box](https://cdn.qwiklabs.com/BYn8k8jI2f9%2F31X1iPUbrOfNrudtD7rT5MQAxRqxkDI%3D align="left")

11. Click **Save Policy**.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully updated Binary Authorization Policy to add Disallow all images rule at project level and allow all images at cluster level, you will see an assessment score.

Update Binary Authorization Policy to add Disallow all images rule at project level and allow at cluster level

Check my progress

## **Task 6. Creating a private GCR image**

1. To simulate a real-world configuration, create a private GCR container image in your project.
    
2. You will pull down the `nginx` container from `nginx` project and push it to your own GCR repository without modification.
    
3. In Cloud Shell, pull down the `latest` `nginx` container:
    

```apache
docker pull nginx:latest
```

4. Authenticate docker to the project:
    

```apache
gcloud auth configure-docker
```

When prompted, `Do you want to continue (Y/n)?` Enter `Y`.

5. Set the PROJECT\_ID shell variable:
    

```apache
PROJECT_ID="$(gcloud config get-value project)"
```

6. Tag and push it to the current project's GCR:
    

```apache
docker tag nginx "gcr.io/${PROJECT_ID}/nginx:latest"
docker push "gcr.io/${PROJECT_ID}/nginx:latest"
```

7. List the "private" nginx image in your own GCR repository:
    

```apache
gcloud container images list-tags "gcr.io/${PROJECT_ID}/nginx"
```

## **Task 7. Denying all images**

To prove that image denial by policy will eventually work as intended, first verify that the cluster-specific `allow` rule is in place and allows all containers to run.

1. To do this, launch a single `nginx` pod:
    

```apache
cat << EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: "gcr.io/${PROJECT_ID}/nginx:latest"
    ports:
    - containerPort: 80
EOF
```

You should see a message stating that `pod/nginx created`.

2. List the pods:
    

```apache
kubectl get pods
```

Output:

```apache
NAME    READY     STATUS    RESTARTS   AGE
nginx   1/1       Running   0          1m
```

If this fails recheck your cluster-specific region and name and try again.

3. Now, delete this pod:
    

```apache
kubectl delete pod nginx
```

4. Next, prove that the Binary Authorization policy can block undesired images from running in the cluster.
    

On the Binary Authorization page, click **Edit Policy**,

5. Click on the three vertical dots to the right of your GKE cluster-specific rules, and click **edit**.
    
6. Then, select `Disallow all images`, click **Submit**.
    

Your policy should look similar to the following:

![Edit GKE cluster-specific rule for us-central1-a.mycluster-1 dialog box with Disallow all images option selected](https://cdn.qwiklabs.com/B1Lz5UwF9pTxbQtGqwnU8lmWMobP8cQfM9W4UtQJNK4%3D align="left")

7. Finally, click **Save Policy** to apply those changes.
    

**Note:** Wait at least 30 seconds before proceeding to allow the policy to take effect.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully updated Binary Authorization Policy to Disallow all images rule at cluster level, you will see an assessment score.

Update cluster specific policy to Disallow all images

Check my progress

8. Now, run the same command as before to create the static `nginx` pod:
    

```apache
cat << EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: "gcr.io/${PROJECT_ID}/nginx:latest"
    ports:
    - containerPort: 80
EOF
```

This time, though, you should receive a message from the API server indicating that the policy prevented this pod from being successfully run:

```apache
Error from server (VIOLATES_POLICY): error when creating "STDIN": admission webhook "imagepolicywebhook.image-policy.k8s.io" denied the request: Image gcr.io/qwiklabs-gcp-00-ce851250686b/nginx:latest denied by Binary Authorization cluster admission rule for us-east4-a.my-cluster-1. Denied by always_deny admission rule
```

To be able to see when any and all images are blocked by the Binary Authorization Policy, navigate to the GKE Audit Logs in Stackdriver and filter on those error messages related to this activity.

9. In the Google Cloud console, navigate to the **Navigation menu** &gt; **Logging** &gt; **Logs Explorer**.
    
10. Populate the **Query builder** box with:
    

```apache
resource.type="k8s_cluster" protoPayload.response.reason="VIOLATES_POLICY"
```

![Query builder box with populated code](https://cdn.qwiklabs.com/CuB3tuWp04fgeKzw0axcGm3yu4x0X29NGzmMlCO0IRI%3D align="left")

11. Click **Run Query**.
    
12. You should see errors corresponding to the blocking of the `nginx` pod from running.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully verified cluster admission rule, you will see an assessment score.

Create a Nginx pod to verify cluster admission rule is applied for disallow all images (denies to create)

Check my progress

## **Task 8. Denying images except from allowlisted container registries**

1. Let's say that you actually want to allow *just* that nginx container to run. The quickest step to enable this is to *allowlist* the registry that it comes from.
    
2. You will use the output of the following command as your image path:
    

```apache
echo "gcr.io/${PROJECT_ID}/nginx*"
```

3. Copy the image path output to your buffer.
    
4. Navigate to the **Navigation menu** &gt; **Security** &gt; **Binary Authorization**.
    
5. Edit the Binary Authorization Policy, under **Custom exemption rules** display the image paths, then click **Add an Image Pattern**.
    
6. Paste in the image path you copied earlier. The image below shows an example path.
    

![Binary Authorization screen with image path populated in the new image pattern field](https://cdn.qwiklabs.com/oVBBEQuWzsLCxLZKG8BU0V0ttpzpeVP%2FM9BC%2FZZ0YPA%3D align="left")

7. Click **Save Policy**, then run:
    

```apache
cat << EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: "gcr.io/${PROJECT_ID}/nginx:latest"
    ports:
    - containerPort: 80
EOF
```

You should now be able to launch this pod and prove that registry allowlisting is working correctly.

8. Run the following to clean up and prepare for the next steps:
    

```apache
kubectl delete pod nginx
```

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully updated Binary Authorization policy to allowlist the container registry, you will see an assessment score.

Update BA policy to denying images except from allowlisted container registries (your project container registry)

Check my progress

## **Task 9. Enforcing attestations**

Allowlisting container image registries is a great first step in preventing undesired container images from being run inside a cluster, but there is more you can do to ensure the container was built correctly.

You want to cryptographically verify that a given container image was approved for deployment. This is done by an "attestation authority" which states or *attests* to the fact that a certain step was completed. The attestation authority does this by using a PGP key to *sign* a snippet of metadata describing the SHA256 hash of a container image and submitting it to a central metadata repository--the Container Analysis API.

Later, when the Admission Controller goes to validate if a container image is allowed to run by consulting a Binary Authorization policy that requires attestations to be present on an image, it will check to see if the Container Analysis API holds the signed snippet(s) of metadata saying which steps were completed. With that information, the Admission Controller will know whether to allow or deny that pod from running.

Next, perform a manual attestation of a container image. You will take on the role of a human attestation authority and will perform all the steps to sign a container image, create a policy to require that attestation to be present on images running inside your cluster, and then successfully run that image in a pod.

### Setting up the necessary variables

1. Attestor name/email details:
    

```apache
ATTESTOR="manually-verified" # No spaces allowed
ATTESTOR_NAME="Manual Attestor"
ATTESTOR_EMAIL="$(gcloud config get-value core/account)" # This uses your current user/email
```

2. Container Analysis Note ID/description of your attestation authority:
    

```apache
NOTE_ID="Human-Attestor-Note" # No spaces
NOTE_DESC="Human Attestation Note Demo"
```

3. Names for files to create payloads/requests:
    

```apache
NOTE_PAYLOAD_PATH="note_payload.json"
IAM_REQUEST_JSON="iam_request.json"
```

### Creating an attestation note

The first step is to register the attestation authority as a [Container Analysis note](https://cloud.google.com/binary-authorization/docs/key-concepts#analysis_notes) with the Container Analysis API. To do this, you'll create an `ATTESTATION` note and submit it to the API.

1. Create the `ATTESTATION` note payload:
    

```powershell
cat > ${NOTE_PAYLOAD_PATH} << EOF
{
  "name": "projects/${PROJECT_ID}/notes/${NOTE_ID}",
  "attestation_authority": {
    "hint": {
      "human_readable_name": "${NOTE_DESC}"
    }
  }
}
EOF
```

2. Submit the `ATTESTATION` note to the Container Analysis API:
    

```apache
curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)"  \
    --data-binary @${NOTE_PAYLOAD_PATH}  \
    "https://containeranalysis.googleapis.com/v1beta1/projects/${PROJECT_ID}/notes/?noteId=${NOTE_ID}"
```

You should see the output from the prior command display the created note, but the following command will also list the created note:

```apache
curl -H "Authorization: Bearer $(gcloud auth print-access-token)"  \
    "https://containeranalysis.googleapis.com/v1beta1/projects/${PROJECT_ID}/notes/${NOTE_ID}"
```

### Creating a PGP signing key

As your attestation authority uses a PGP key to perform the cryptographic signing of the image metadata, create a new PGP key and export the public PGP key.

**Note:** This error messages related to this activity. PGP key is not password protected for this exercise. In a production system, be sure to properly safeguard your private PGP keys.

1. Set another shell variable:
    

```apache
PGP_PUB_KEY="generated-key.pgp"
```

2. Create the PGP key:
    

```apache
sudo apt-get install rng-tools
```

```apache
sudo rngd -r /dev/urandom
```

```apache
gpg --quick-generate-key --yes ${ATTESTOR_EMAIL}
```

3. Press **Enter** to use an empty passphrase and acknowledge warnings.
    
4. Extract the public PGP key:
    

```apache
gpg --armor --export "${ATTESTOR_EMAIL}" > ${PGP_PUB_KEY}
```

### Registering the Attestor in the Binary Authorization API

The next step is to create the "attestor" in the Binary Authorization API and add the public PGP key to it.

1. Create the Attestor in the Binary Authorization API:
    

```apache
gcloud --project="${PROJECT_ID}" \
    beta container binauthz attestors create "${ATTESTOR}" \
    --attestation-authority-note="${NOTE_ID}" \
    --attestation-authority-note-project="${PROJECT_ID}"
```

2. Add the PGP Key to the Attestor:
    

```apache
gcloud --project="${PROJECT_ID}" \
    beta container binauthz attestors public-keys add \
    --attestor="${ATTESTOR}" \
    --pgp-public-key-file="${PGP_PUB_KEY}"
```

3. List the newly created Attestor:
    

```apache
gcloud --project="${PROJECT_ID}" \
    beta container binauthz attestors list
```

The output should look similar to the following:

```apache
NAME: manually-verified
NOTE: projects/<project_id>/notes/Human-Attestor-Note
NUM_PUBLIC_KEYS: 1
</project_id>
```

## **Task 10. "Signing" a container image**

The preceeding steps only need to be performed once. From this point on, this step is the only step that needs repeating for every new container image.

The `nginx` image at `nginx:latest` is already built and available for use. Perform the manual attestations on it as if it were your own image built by your own processes and save the step of having to build it.

1. Set a few shell variables:
    

```apache
GENERATED_PAYLOAD="generated_payload.json"
GENERATED_SIGNATURE="generated_signature.pgp"
```

2. Get the PGP fingerprint:
    

```apache
PGP_FINGERPRINT="$(gpg --list-keys ${ATTESTOR_EMAIL} | head -2 | tail -1 | awk '{print $1}')"
```

3. Obtain the SHA256 Digest of the container image:
    

```apache
IMAGE_PATH="gcr.io/${PROJECT_ID}/nginx"
IMAGE_DIGEST="$(gcloud container images list-tags --format='get(digest)' $IMAGE_PATH | head -1)"
```

4. Create a JSON-formatted signature payload:
    

```apache
gcloud beta container binauthz create-signature-payload \
    --artifact-url="${IMAGE_PATH}@${IMAGE_DIGEST}" > ${GENERATED_PAYLOAD}
```

5. View the generated signature payload:
    

```apache
cat "${GENERATED_PAYLOAD}"
```

6. "Sign" the payload with the PGP key:
    

```apache
gpg --local-user "${ATTESTOR_EMAIL}" \
    --armor \
    --output ${GENERATED_SIGNATURE} \
    --sign ${GENERATED_PAYLOAD}
```

7. View the generated signature (PGP message):
    

```apache
cat "${GENERATED_SIGNATURE}"
```

8. Create the attestation:
    

```apache
gcloud beta container binauthz attestations create \
    --artifact-url="${IMAGE_PATH}@${IMAGE_DIGEST}" \
    --attestor="projects/${PROJECT_ID}/attestors/${ATTESTOR}" \
    --signature-file=${GENERATED_SIGNATURE} \
    --public-key-id="${PGP_FINGERPRINT}"
```

9. View the newly created attestation:
    

```apache
gcloud beta container binauthz attestations list \
    --attestor="projects/${PROJECT_ID}/attestors/${ATTESTOR}"
```

## **Task 11. Running an image with attestation enforcement enabled**

The next step is to change the Binary Authorization policy to enforce that attestation is to be present on all images that do not match the allowlist pattern(s).

1. To change the policy to require attestation, run the following and then copy the full path/name of the attestation authority:
    

```apache
echo "projects/${PROJECT_ID}/attestors/${ATTESTOR}" # Copy this output to your copy/paste buffer
```

2. Next, edit the Binary Authorization policy to `edit` the **GKE cluster-specific rules**.
    

Click the three dots by your cluster name to **Edit** your cluster-specific rules.

3. Select `Require attestations (Allow only images that have been verified by all of the following attestors)` instead of `Disallow all images` in the pop-up window.:
    

![Edit Policy page with Disallow all images option selected](https://cdn.qwiklabs.com/HXkk8WbGxIy16NT5N3n6%2BeDpiKBY8SrL6BmsIgBBGMQ%3D align="left")

4. Next, click on `Add Attestors` followed by `Add by attestor resource ID`. Enter the contents of your copy/paste buffer in the format of `projects/${PROJECT_ID}/attestors/${ATTESTOR}`, then click **Add 1 Attestor**, and then click **Submit**, and finally click **Save Policy**.
    

![Edit GKE cluster-specific rule for us-central1-a.my-cluster-1 dialog box](https://cdn.qwiklabs.com/Rpc6MdPXwJEl9tWyuUTzCc2opzI8vjY6j0F%2FWocOqxA%3D align="left")

The default policy should still show `Disallow all images`, but the cluster-specific rule should be requiring attestation.

5. Now, obtain the most recent SHA256 Digest of the signed image from the previous steps:
    

```apache
IMAGE_PATH="gcr.io/${PROJECT_ID}/nginx"
IMAGE_DIGEST="$(gcloud container images list-tags --format='get(digest)' $IMAGE_PATH | head -1)"
```

6. After waiting at least 30 seconds from the time the Binary Authorization policy was updated, run the pod and verify success:
    

```apache
cat << EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: "${IMAGE_PATH}@${IMAGE_DIGEST}"
    ports:
    - containerPort: 80
EOF
```

Congratulations! You have now manually attested to a container image and enforced a policy for that image inside your GKE cluster.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully updated Binary Authorization policy to modify cluster specific rule to allow only images that have been approved by attestors, you will see an assessment score.

Update BA policy to modify cluster specific rule to allow only images that have been approved by attestors

Check my progress

## **Task 12. Handling emergency situations**

From a user's perspective, the Binary Authorization policy may incorrectly block an image or there may be another issue with the successful operation of the admission controller webhook.

In this "emergency" case, there is a "break glass" capability that leverages a specific annotation to signal to the admission controller to run the pod and skip policy enforcement.

**Note:** You will want to notify a security team when this occurs as this can be leveraged by malicious users if they have the ability to create a pod.

In this case, though, your response procedures can be started within seconds of the activity occurring. The logs are available in Stackdriver:

1. To run an unsigned `nginx` container with the "break glass" annotation, run:
    

```apache
cat << EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx-alpha
  annotations:
    alpha.image-policy.k8s.io/break-glass: "true"
spec:
  containers:
  - name: nginx
    image: "nginx:latest"
    ports:
    - containerPort: 80
EOF
```

2. In the Google Cloud console, navigate to the **Navigation menu** &gt; **Logging** &gt; **Logs Explorer** page.
    
3. Populate the **Query builder** box with below and then Click **Run Query**:
    
    ```apache
    resource.type="k8s_cluster" protoPayload.request.metadata.annotations."alpha.image-policy.k8s.io/break-glass"="true"
    ```
    
4. You should see events when the admission controller allowed a pod due to the annotation being present. From this filter, you can create a `Sink` which sends logs that match this filter to an external destination.
    

![Query builder text box with populated code](https://cdn.qwiklabs.com/uluTLrI3yZVnyVhBZaRFFmubQbJDW38Nfp2Bii0RgMM%3D align="left")

**Note:** Wait for at least 5 to 10 minutes for the logs to appear.

## **Task 13. Tear down**

Qwiklabs will remove all resources you created for this lab, but it's good to know how to clean up your own environment.

1. The following script will destroy the Kubernetes Engine cluster:
    

```apache
./delete.sh -c my-cluster-1
```

If you created your own cluster name at the beginning of the lab, use that name. In this example the name `my-cluster-1` was used.

The last lines of the output will be:

```apache
Deleting cluster
```

**Note:** Cluster delete command is being run asynchronously and will take a few moments to be removed. Use the **Cloud Console UI** or `gcloud container clusters list` command to track the progress if desired. Wait until cluster get removed.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully deleted your cluster, you will see an assessment score.

Tear Down (delete cluster)

Check my progress

The following commands will remove the remaining resources.

2. Delete the container image that was pushed to GCR:
    

```apache
gcloud container images delete "${IMAGE_PATH}@${IMAGE_DIGEST}" --force-delete-tags
```

3. If prompted, `Do you want to continue (Y/n)?` enter `Y`.
    
4. Delete the Attestor:
    

```apache
gcloud --project="${PROJECT_ID}" \
    beta container binauthz attestors delete "${ATTESTOR}"
```

5. Delete the Container Analysis note:
    

```apache
curl -X DELETE \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://containeranalysis.googleapis.com/v1beta1/projects/${PROJECT_ID}/notes/${NOTE_ID}"
```

## **Troubleshooting in your own environment**

1. If you update the Binary Authorization policy and very quickly attempt to launch a new pod/container, the policy might not have time to take effect. You may need to wait 30 seconds or more for the policy change to become active. To retry, delete your pod using `kubectl delete <podname>` and resubmit the pod creation command.
    
2. Run `gcloud container clusters list` command to check the cluster status.
    
3. If you enable additional features like `--enable-network-policy`, `--accelerator`, `--enable-tpu`, or `--enable-metadata-concealment`, you may need to add additional registries to your Binary Authorization policy allowlist for those pods to be able to run. Use `kubectl describe pod <podname>` to find the registry path from the image specification and add it to the allowlist in the form of `gcr.io/example-registry/*` and save the policy.
    
4. If you get errors about quotas, please increase your quota in the project. Learn more about resource quotas from the [Resource quotas documentation](https://cloud.google.com/compute/quotas).
    

## **Relevant materials**

1. [Google Cloud Quotas](https://cloud.google.com/compute/quotas)
    
2. [Signup for Google Cloud](https://cloud.google.com/)
    
3. [Google Cloud Shell](https://cloud.google.com/shell/docs/)
    
4. [Binary Authorization in GKE](https://cloud.google.com/binary-authorization/)
    
5. [Container Analysis notes](https://cloud.google.com/binary-authorization/docs/key-concepts#analysis_notes)
    
6. [Kubernetes Admission Controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
    
7. [Launch Stages](https://cloud.google.com/terms/launch-stages)
    

---

## Solution of Lab

%[https://youtu.be/cXTA0nxGfLo] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP479/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1741508757011/358d2bc6-25bf-4b6d-9296-1202cf81c782.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Google%20Kubernetes%20Engine%20Security%20Binary%20Authorization/gsp479.sh
sudo chmod +x gsp479.sh
./gsp479.sh
```

![]( align="center")