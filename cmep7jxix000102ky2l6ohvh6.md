---
title: "Validating Policies for Terraform on Google Cloud - GSP1021"
seoTitle: "Validating Policies for Terraform on Google Cloud - GSP1021"
seoDescription: "Learn to validate Terraform policies on Google Cloud using `gcloud beta terraform vet` to enforce policy compliance and prevent deployment issues"
datePublished: Sun Aug 24 2025 04:48:24 GMT+0000 (Coordinated Universal Time)
cuid: cmep7jxix000102ky2l6ohvh6
slug: validating-policies-for-terraform-on-google-cloud-gsp1021
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756010787788/2ce04bcf-f90e-4747-a3b1-35d3530ec6c4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756010883478/05ce218b-71b6-4f9e-a754-738d96ce456b.png
tags: google-cloud, terraform, validating-policies-for-terraform-on-google-cloud-gsp1021, validating-policies-for-terraform-on-google-cloud, gsp1021

---

## Overview

In this lab, you will learn about the command `gcloud beta terraform vet`, referred as **Validate** through the rest of the lab. Validate is a tool for enforcing policy compliance as part of an infrastructure CI/CD pipeline. You can use Validate to detect policy violations and provide warnings or halt deployments before they reach production.

This lab will walk you through applying a constraint that enforces a domain restriction. You'll test that constraint and intentionally throw an error. You'll then modify the constraint so that your domain passes.

## Objectives

In this lab, you will:

* Apply a constraint that enforces a domain restriction
    
* Test a constraint to intentionally throw a validation error
    
* Modify the constraint so that it passes validation
    

### Prerequisites

For this lab, you should have experience using Terraform. Check out the [Build Infrastructure with Terraform on Google Cloud](https://www.cloudskillsboost.google/course_templates/636) course for more hands-on practice with Terraform.

## Setup and Requirements

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
    student-00-11343d11fc8e@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    U92ClGrju6l4
    ```
    
    Copied!
    
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-70c80066f97e`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-70c80066f97e
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-00-11343d11fc8e@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-03-70c80066f97e
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Validate a constraint

To see how a constraint is implemented, you'll copy an existing constraint, provide a test case that fails validation, and then modify the constraint so that it passes.

### Copy the constraint

1. Open a new Cloud Shell window and run the following command to clone the policy library repository.
    

```apache
git clone https://github.com/GoogleCloudPlatform/policy-library.git
```

Copied!

2. At the command prompt, enter the following to copy over the sample IAM domain restriction constraint:
    

```apache
cd policy-library/
cp samples/iam_service_accounts_only.yaml policies/constraints
```

Copied!

2. Examine the constraint you copied by printing it to the terminal.
    

```apache
cat policies/constraints/iam_service_accounts_only.yaml
```

Copied!

The output looks like this:

```apache
# This constraint checks that all IAM policy members are in the
# "gserviceaccount.com" domain.
apiVersion: constraints.gatekeeper.sh/v1alpha1
kind: GCPIAMAllowedPolicyMemberDomainsConstraintV2
metadata:
  name: service_accounts_only
  annotations:
    description: Checks that members that have been granted IAM roles belong to allowlisted
      domains.
spec:
  severity: high
  match:
    target: # {"$ref":"#/definitions/io.k8s.cli.setters.target"}
    - "organizations/**"
  parameters:
    domains:
    - gserviceaccount.com
```

Notice the highlighted section at the bottom. This specifies that only members from the `gserviceaccount.com` domain can be present in an IAM policy.

### Test the constraint

1. To verify that the policy works as expected, you'll create a Terraform file within the current directory.
    

```apache
touch main.tf
```

Copied!

2. On the Cloud Shell toolbar, click **Open Editor**. To switch between Cloud Shell and the code editor, click **Open Editor** or **Open Terminal** as required, or click **Open in new window** to leave the Editor open in a separate tab.
    
3. Open the `policy-library/main.tf` file and copy the following code into it:
    

```apache
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~> 3.84"
    }
  }
}

resource "google_project_iam_binding" "sample_iam_binding" {
  project = "<YOUR PROJECT ID>"
  role    = "roles/viewer"

  members = [
    "user:<USER>"
  ]
}
```

Copied!

4. Replace `<YOUR PROJECT ID>` with `qwiklabs-gcp-03-70c80066f97e`.
    
5. Replace `<USER>` with `student-00-11343d11fc8e@qwiklabs.net`.
    
6. Next, navigate back to the terminal and run the following command to initialize Terraform:
    

```apache
terraform init
```

Copied!

7. Run the following command to export the Terraform plan. If asked, click **Authorize** when prompted.
    

```apache
terraform plan -out=test.tfplan
```

Copied!

8. Convert the Terraform plan to JSON.
    

```apache
terraform show -json ./test.tfplan > ./tfplan.json
```

Copied!

9. Install the **Terraform Tools** component.
    

```apache
sudo apt-get install google-cloud-sdk-terraform-tools
```

Copied!

10. Run the following command to validate that your Terraform plan complies with your policies.
    

```apache
gcloud beta terraform vet tfplan.json --policy-library=.
```

Copied!

**Note:** you can ignore any warnings about retrieving your Project ID.

Since the email address you provided in the IAM policy binding does not belong to a service account, the plan violates the constraint you set up. Your output should resemble the following:

```apache
constraint: GCPIAMAllowedPolicyMemberDomainsConstraintV2.service_accounts_only
constraint_config:
  api_version: constraints.gatekeeper.sh/v1alpha1
  kind: GCPIAMAllowedPolicyMemberDomainsConstraintV2
  metadata:
    annotations:
      description: Checks that members that have been granted IAM roles belong to
        allowlisted domains.
      validation.gcp.forsetisecurity.org/originalName: service_accounts_only
      validation.gcp.forsetisecurity.org/yamlpath: policies/constraints/iam_service_accounts_only.yaml
    name: service-accounts-only
  spec:
    match:
      target:
      - organizations/**
    parameters:
      domains:
      - gserviceaccount.com
    severity: high
message: 'IAM policy for //cloudresourcemanager.googleapis.com/projects/qwiklabs-gcp-02-ec89de7c9f9d
  contains member from unexpected domain: user:student-02-0edcb8aed69f@qwiklabs.net'
metadata:
  ancestry_path: organizations/616463121992/folders/365352270458/folders/474147567761/folders/125430737939/projects/qwiklabs-gcp-02-ec89de7c9f9d
  constraint:
    annotations:
      description: Checks that members that have been granted IAM roles belong to
        allowlisted domains.
      validation.gcp.forsetisecurity.org/originalName: service_accounts_only
      validation.gcp.forsetisecurity.org/yamlpath: policies/constraints/iam_service_accounts_only.yaml
    labels: {}
    parameters:
      domains:
      - gserviceaccount.com
  details:
    member: user:student-02-0edcb8aed69f@qwiklabs.net
    resource: //cloudresourcemanager.googleapis.com/projects/qwiklabs-gcp-02-ec89de7c9f9d
resource: //cloudresourcemanager.googleapis.com/projects/qwiklabs-gcp-02-ec89de7c9f9d
severity: high
```

**Troubleshooting:** If you receive the following error, "Error 403: The caller does not have permission, forbidden," then you either didn't replace the `project_id` argument in `policy-library/main.tf`, or you don't have the necessary permissions on the project you specified.

## Task 2. Modify the constraint

The constraint works as intended, but let's say you want to modify this so you can allow other email addresses in your domain.

1. From the Editor, navigate to the `policy-library/policies/constraints/iam_service_accounts_only.yaml` file.
    
2. Under the `domains` section, append the `qwiklabs.net` email domain to the domains allowlist:
    

```apache
apiVersion: constraints.gatekeeper.sh/v1alpha1
kind: GCPIAMAllowedPolicyMemberDomainsConstraintV1
metadata:
  name: service_accounts_only
spec:
  severity: high
  match:
    target: ["organizations/**"]
  parameters:
    domains:
      - gserviceaccount.com
      - qwiklabs.net
```

Copied!

2. Navigate back to the Cloud Shell window and export a new JSON Terraform plan.
    

```apache
terraform plan -out=test.tfplan
```

Copied!

3. Now validate your Terraform plan again, and this should result in no violations found.
    

```apache
gcloud beta terraform vet tfplan.json --policy-library=.
```

Copied!

Output:

```apache
Validating resources...done.
```

4. Lastly, apply the Terraform plan for the IAM policy to grant a role to the member.
    

```apache
terraform apply test.tfplan
```

Copied!

Click *Check my progress* to verify the objective.

Modify the constraint

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1021/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756010546090/614e6188-1327-46ae-9182-b67dfe147190.png align="center")

---

### Other solution

%[https://youtu.be/yN1kxWKp71E] 

```apache
curl -LO raw.githubusercontent.com/G-Tech-007/The-Arcade-Trivia-January-2024/main/GSP1021_Validating_Policies_for_Terraform_on_Google_Cloud.sh
sudo chmod +x GSP1021_Validating_Policies_for_Terraform_on_Google_Cloud.sh
./GSP1021_Validating_Policies_for_Terraform_on_Google_Cloud.sh
```