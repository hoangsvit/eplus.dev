---
title: "Securing Google Cloud with CFT Scorecard - GSP698"
seoTitle: "Securing Google Cloud with CFT Scorecard - GSP698"
seoDescription: "CFT Scorecard is an open-sourced command line client of Forseti Config Validator and part of the broader Cloud Foundation Toolkit. It provides visibility in"
datePublished: Tue Nov 12 2024 02:29:16 GMT+0000 (Coordinated Universal Time)
cuid: cm3du382f000d09mcbvs30cnp
slug: securing-google-cloud-with-cft-scorecard-gsp698
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731378524570/cf43a8c3-60fd-435b-b55b-3789b5813c18.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731378537635/afe914d7-dc85-48ee-ba95-5000392113f6.png
tags: securing-google-cloud-with-cft-scorecard-gsp698, gsp698, securing-google-cloud-with-cft-scorecard

---

## **Overview**

CFT Scorecard is an open-sourced command line client of [Forseti Config Validator](https://github.com/forseti-security/policy-library/blob/master/docs/user_guide.md) and part of the broader [Cloud Foundation Toolkit](https://github.com/GoogleCloudPlatform/cloud-foundation-toolkit). It provides visibility into misconfigurations and violations of an established set of standards for Google Cloud resources, projects, folders, or even organizations.

There are over 86 distinct Google Cloud resource types, and they're growing. With the move to public cloud, it is easier than ever to federate cloud operations and resource deployment out to many individuals. Along with federation and agility in the deployment of infrastructure, resources, and policy, it has become increasingly difficult to keep policies and standards in order.

In this lab you will configure [CFT Scorecard](https://github.com/GoogleCloudPlatform/cloud-foundation-toolkit/blob/master/cli/docs/scorecard.md) to improve visibility into a Google Cloud project and detect misconfigurations.

### What will you do in this lab?

This lab highlights the challenges with using the cloud with multiple concurrent users. You will enable the CFT Scorecard and extend its resource configuration monitoring and violation detection capabilities through integration with [Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs/overview) and the open-sourced [Policy Library](https://github.com/forseti-security/policy-library). You will set up the tooling for detecting misconfigurations and over-exposed resources while still allowing other individuals within your team, and ultimately the Google Cloud project, to be agile within established policies.

#### **Topics covered**

* Setting up CFT Scorecard.
    
* Running a CFT Scorecard assessment.
    
* Adding new CFT Scorecard policy.
    

![Topic infographic](https://cdn.qwiklabs.com/n2I54wqTe%2BlAHa1eadcQYdQrdumXyKQfpXz2co8Hnik%3D align="left")

## **Scenario**

Imagine you are the Technical Lead of a 3 person team. Your remote teammates, Alice and Bob, are working very closely with you and deploying many resources into the same shared Google Cloud project as you. After a few weeks of working together, you start to notice a few red flags. You soon discover that both Alice and Bob have cut corners and introduced project configurations that you consider misconfiguration. One misconfiguration exposed a Cloud Storage bucket publicly. This is merely one misconfiguration that you have uncovered, but you fear that there could be many more.

After doing a quick Google search, you come across the Cloud Foundation Toolkit (CFT) Scorecard CLI utility. After a quick read, you decide this can help you administer policies into your Google Cloud environment and determine where misconfigurations are occurring. You decide to give it a try.

## **Setup and requirements**

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
    student-04-0f6ad783f9b2@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    BKFgrBgUpne7
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-6d1e42b5448c`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-6d1e42b5448c
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
ACCOUNT: student-04-0f6ad783f9b2@qwiklabs.net

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
project = qwiklabs-gcp-04-6d1e42b5448c
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Set up the environment**

1. Open Cloud Shell and set a couple of environment variables to begin:
    

```apache
export GOOGLE_PROJECT=$DEVSHELL_PROJECT_ID
export CAI_BUCKET_NAME=cai-$GOOGLE_PROJECT
```

2. After reading the docs, understand that CFT scorecard has two dependencies:
    

* Cloud Asset Inventory
    
* Policy Library
    

3. Proceed to enable Cloud Asset API in your project:
    

```apache
gcloud services enable cloudasset.googleapis.com \
    --project $GOOGLE_PROJECT
```

4. Run this command to create the default **Cloud Asset** service account:
    

```apache
gcloud beta services identity create --service=cloudasset.googleapis.com --project=$GOOGLE_PROJECT
```

5. Grant the **storage admin** role to the cloud assets service account:
    

```apache
gcloud projects add-iam-policy-binding ${GOOGLE_PROJECT}  \
   --member=serviceAccount:service-$(gcloud projects list --filter="$GOOGLE_PROJECT" --format="value(PROJECT_NUMBER)")@gcp-sa-cloudasset.iam.gserviceaccount.com \
   --role=roles/storage.admin
```

6. Clone the Policy Library:
    

```apache
git clone https://github.com/forseti-security/policy-library.git
```

7. You realize Policy Library enforces policies that are located in the policy-library/policies/constraints folder, in which case you can copy a sample policy from the samples directory into the constraints directory.
    

```apache
cp policy-library/samples/storage_denylist_public.yaml policy-library/policies/constraints/
```

8. Create the bucket that will hold the data that Cloud Asset Inventory (CAI) will export:
    

```apache
gsutil mb -l europe-west4 -p $GOOGLE_PROJECT gs://$CAI_BUCKET_NAME
```

Click **Check my progress** to verify the objective.

Create the CAI bucket

Check my progress

## **Task 2. Collect data using Cloud Asset Inventory (CAI)**

Now that you have set up your environment, start collecting the data for CFT Scorecard.

As mentioned earlier, input to CFT Scorecard is resource and IAM data, and the policy-library folder.

You'll need to use CAI to generate the resource and IAM policy information for the project.

1. Use the command below to create the data:
    

```apache
# Export resource data
gcloud asset export \
    --output-path=gs://$CAI_BUCKET_NAME/resource_inventory.json \
    --content-type=resource \
    --project=$GOOGLE_PROJECT

# Export IAM data
gcloud asset export \
    --output-path=gs://$CAI_BUCKET_NAME/iam_inventory.json \
    --content-type=iam-policy \
    --project=$GOOGLE_PROJECT

# Export org policy data
gcloud asset export \
    --output-path=gs://$CAI_BUCKET_NAME/org_policy_inventory.json \
    --content-type=org-policy \
    --project=$GOOGLE_PROJECT

# Export access policy data
gcloud asset export \
    --output-path=gs://$CAI_BUCKET_NAME/access_policy_inventory.json \
    --content-type=access-policy \
    --project=$GOOGLE_PROJECT
```

Example output:

```bash
Export in progress for root asset [projects/qwiklabs-gcp-01-68169ed6dd00].
Use [gcloud asset operations describe projects/97186664469/operations/ExportAssets/RESOURCE/2295255602305764396] to check the status of the operation.

Export in progress for root asset [projects/qwiklabs-gcp-01-68169ed6dd00].
Use [gcloud asset operations describe projects/97186664469/operations/ExportAssets/IAM_POLICY/11771734913762837428] to check the status of the operation.
```

2. Ensure CAI has finished data collection. Look at the output from the previous command and use the provided `gcloud asset operations describe` from the output of the above commands to verify these operations have finished. It might take some time to check the progress.
    

Click **Check my progress** to verify the objective.

Create the CAI files have been created

Check my progress

## **Task 3. Analyze CAI data with CFT scorecard**

1. You need to download the CFT scorecard application and make it executable:
    

```apache
curl -o cft https://storage.googleapis.com/cft-cli/latest/cft-linux-amd64
# make executable
chmod +x cft
```

2. Now that you have configured everything, go ahead and run the CFT scorecard application:
    

```apache
./cft scorecard --policy-path=policy-library/ --bucket=$CAI_BUCKET_NAME
```

Example output:

```apache
Generating CFT scorecard
1 total issues found
Operational Efficiency: 0 issues found
----------
Security: 1 issues found
----------
denylist_public_users: 1 issues
- //storage.googleapis.com/fun-bucket-qwiklabs-gcp-00-2d8ed2a5cc0e is publicly accessable
Reliability: 0 issues found
----------
Other: 0 issues found
----------
```

This was the public bucket you identified earlier.

## **Task 4. Add more constraints to CFT scorecard**

1. You forgot about IAM! Add the following constraint to ensure you are entirely aware who has the `roles/owner` role aside from your allowlisted user:
    

```apache
# Add a new policy to blacklist the IAM Owner Role
cat > policy-library/policies/constraints/iam_allowlist_owner.yaml << EOF
apiVersion: constraints.gatekeeper.sh/v1alpha1
kind: GCPIAMAllowedBindingsConstraintV3
metadata:
  name: allowlist_owner
  annotations:
    description: List any users granted Owner
spec:
  severity: high
  match:
    target: ["organizations/**"]
    exclude: []
  parameters:
    mode: allowlist
    assetType: cloudresourcemanager.googleapis.com/Project
    role: roles/owner
    members:
    - "serviceAccount:admiral@qwiklabs-services-prod.iam.gserviceaccount.com"
EOF
```

2. Rerun CFT scorecard:
    

```apache
./cft scorecard --policy-path=policy-library/ --bucket=$CAI_BUCKET_NAME
```

Ok, it all looks clean, but let's look at `roles/editor`, too.

3. Set two extra variables to help with the new constraint creation:
    

```apache
export USER_ACCOUNT="$(gcloud config get-value core/account)"
export PROJECT_NUMBER=$(gcloud projects describe $GOOGLE_PROJECT --format="get(projectNumber)")
```

4. Create the following constraint that will allowlist all the valid accounts:
    

```apache
# Add a new policy to allowlist the IAM Editor Role
cat > policy-library/policies/constraints/iam_identify_outside_editors.yaml << EOF
apiVersion: constraints.gatekeeper.sh/v1alpha1
kind: GCPIAMAllowedBindingsConstraintV3
metadata:
  name: identify_outside_editors
  annotations:
    description: list any users outside the organization granted Editor
spec:
  severity: high
  match:
    target: ["organizations/**"]
    exclude: []
  parameters:
    mode: allowlist
    assetType: cloudresourcemanager.googleapis.com/Project
    role: roles/editor
    members:
    - "user:$USER_ACCOUNT"
    - "serviceAccount:**$PROJECT_NUMBER**gserviceaccount.com"
    - "serviceAccount:$GOOGLE_PROJECT**gserviceaccount.com"
EOF
```

5. Rerun CFT scorecard:
    

```json
./cft scorecard --policy-path=policy-library/ --bucket=$CAI_BUCKET_NAME
```

Example output:

```apache
Generating CFT scorecard
3 total issues found
Reliability: 0 issues found
----------
Other: 2 issues found
----------
identify_outside_editors: 1 issues
- IAM policy for //cloudresourcemanager.googleapis.com/projects/1044418630080 grants roles/editor to user:qwiklabs.lab.user@gmail.com
Operational Efficiency: 0 issues found
----------
Security: 1 issues found
----------
denylist_public_users: 1 issues
- //storage.googleapis.com/fun-bucket-qwiklabs-gcp-00-2d8ed2a5cc0e is publicly accessable
```

You should now see an editor who is not in your organization. Time to talk to Alice and Bob.

---

## Solution of Lab

%[https://youtu.be/f_FUtZvF0bo] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Securing%20Google%20Cloud%20with%20CFT%20Scorecard/techcps698.sh
sudo chmod +x techcps698.sh
./techcps698.sh
```