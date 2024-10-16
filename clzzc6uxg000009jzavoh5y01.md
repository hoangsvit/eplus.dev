---
title: "IAM Custom Roles - GSP190"
seoTitle: "IAM Custom Roles - GSP190"
seoDescription: "Cloud IAM provides the right tools to manage resource permissions with minimum fuss and high automation. You don't directly grant users permissions. Instead"
datePublished: Sun Aug 18 2024 09:00:19 GMT+0000 (Coordinated Universal Time)
cuid: clzzc6uxg000009jzavoh5y01
slug: iam-custom-roles-gsp190
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723971178111/0c17026a-d5ae-46fa-a741-2d711d939528.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723971597281/1481757c-e401-4fe7-8f84-2db0b6e10f70.png

---

## **Overview**

Cloud IAM provides the right tools to manage resource permissions with minimum fuss and high automation. You don't directly grant users permissions. Instead, you grant them roles, which bundle one or more permissions. This allows you to map job functions within your company to groups and roles. Users get access only to what they need to get the job done, and admins can easily grant default permissions to entire groups of users.

There are two kinds of roles in Cloud IAM:

* Predefined Roles
    
* Custom Roles
    

**Predefined roles** are created and maintained by Google. Their permissions are automatically updated as necessary, such as when new features or services are added to Google Cloud.

**Custom roles** are user-defined, and allow you to bundle one or more supported permissions to meet your specific needs. Custom roles are not maintained by Google; when new permissions, features, or services are added to Google Cloud, your custom roles will not be updated automatically.You create a custom role by combining one or more of the available Cloud IAM permissions. Permissions allow users to perform specific actions on Google Cloud resources.

### What you'll learn

In this lab, you create, update, delete, and restore custom roles.

### Prerequisites

Familiarity with IAM roles is recommended to optimize your learning.

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
    student-04-a4f32af597b1@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    39SMckvSBKQ4
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-57712e416bda`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-57712e416bda
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
ACCOUNT: student-04-a4f32af597b1@qwiklabs.net

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
project = qwiklabs-gcp-01-57712e416bda
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region for your project

Run the following command to set the region for your project:

```apache
gcloud config set compute/region us-east1
```

## **Introduction to IAM custom roles**

Cloud IAM also provides the ability to create customized Cloud IAM roles. You can create a custom Cloud IAM role with one or more permissions and then grant that custom role to users. Cloud IAM provides a UI and API for creating and managing custom roles.

**Key Point:** Custom roles enable you to enforce the principle of least privilege, ensuring that the user and service accounts in your organization have only the permissions essential to performing their intended functions.

**Note:** You can create a custom role at the organization level and at the project level. However, you cannot create custom roles at the folder level.

You create a custom role by combining one or more of the available Cloud IAM permissions. Permissions allow users to perform specific actions on Google Cloud resources.

In the Cloud IAM world, permissions are represented in the form:

```apache
<service>.<resource>.<verb>
```

For example, the `compute.instances.list` permission allows a user to list the Compute Engine instances they own, while `compute.instances.stop` allows a user to stop a VM.

Permissions usually, but not always, correspond 1:1 with REST methods. That is, each Google Cloud service has an associated permission for each REST method that it has. To call a method, the caller needs that permission. For example, the caller of `topic.publish()` needs the `pubsub.topics.publish` permission.

Custom roles can only be used to grant permissions in policies for the same project or organization that owns the roles or resources under them. You cannot grant custom roles from one project or organization on a resource owned by a different project or organization.

### Required permissions and roles

To create a custom role, a caller must have the `iam.roles.create` permission.

Users who are not owners, including organization administrators, must be assigned either the Organization Role Administrator role (roles/iam.organizationRoleAdmin) or the IAM Role Administrator role (roles/iam.roleAdmin). The IAM Security Reviewer role (roles/iam.securityReviewer) enables the ability to view custom roles but not administer them.

The custom roles user interface is in the Cloud Console under IAM Roles. It is only available to users who have permissions to create or manage custom roles. By default, only project owners can create new roles. Project owners can control access to this feature by granting IAM Role Administrator role to others on the same project; for organizations, only Organization Administrators can grant the Organization Role, Administrator role.

### Prepare to create a custom role

Before you create a custom role, you might want to know:

* What permissions can be applied to a resource
    
* What roles are grantable on a resource
    
* What a role's metadata is
    

## **Task 1. View the available permissions for a resource**

Before you create a custom role, you might want to know what permissions can be applied to a resource. You can get all permissions that can be applied to a resource, and the resources below that in the hierarchy, using the gcloud command-line tool, the Cloud Console, or the IAM API. For example, you can get all permissions that you can apply on an organization and on projects in that organization.

* Run the following to get the list of permissions available for your project.:
    

```apache
gcloud iam list-testable-permissions //cloudresourcemanager.googleapis.com/projects/$DEVSHELL_PROJECT_ID
```

Output:

```apache
name: appengine.applications.create
stage: GA
---
name: appengine.applications.get
stage: GA
---
name: appengine.applications.update
stage: GA
---
name: appengine.instances.delete
 stage: GA
---
name: appengine.instances.get
stage: GA
---
name: appengine.instances.list
stage: GA
---
customRolesSupportLevel: TESTING
name: appengine.memcache.addKey
stage: BETA
---
customRolesSupportLevel: TESTING
name: appengine.memcache.flush
stage: BETA
---
```

## **Task 2. Get the role metadata**

Before you create a custom role, you might want to get the metadata for both predefined and custom roles. Role metadata includes the role ID and permissions contained in the role. You can view the metadata using the Cloud Console or the IAM API.

* To view the role metadata, use command below, replacing `[ROLE_NAME]` with the role. For example: `roles/viewer` or `roles/editor`:
    

```apache
gcloud iam roles describe [ROLE_NAME]
```

**Example output (for roles/viewer):**

```apache
description: Read access to all custom roles in the project.
etag: AA==
includedPermissions:
- iam.roles.get
- iam.roles.list
- resourcemanager.projects.get
- resourcemanager.projects.getIamPolicy
...
...
name: roles/iam.roleViewer
stage: GA
title: Viewer
```

## **Task 3. View the grantable roles on resources**

Use the `gcloud iam list-grantable-roles` command to return a list of all roles that can be applied to a given resource.

* Execute the following `gcloud` command to list grantable roles from your project:
    

```apache
gcloud iam list-grantable-roles //cloudresourcemanager.googleapis.com/projects/$DEVSHELL_PROJECT_ID
```

Your output will look something like this:

```apache
---
description: Full management of App Engine apps (but not storage).
name: roles/appengine.appAdmin
title: App Engine Admin
---
description: Ability to view App Engine app status.
name: roles/appengine.appViewer
title: App Engine Viewer
---
description: Ability to view App Engine app status and deployed source code.
name: roles/appengine.codeViewer
title: App Engine Code Viewer
---
...
...
```

## **Task 4. Create a custom role**

To create a custom role, a caller must possess `iam.roles.create` permission. By default, the owner of a project or an organization has this permission and can create and manage custom roles.

Users who are not owners, including organization admins, must be assigned either the Organization Role Administrator role, or the IAM Role Administrator role.

Use the `gcloud iam roles create` command to create new custom roles in two ways:

* Provide a YAML file that contains the role definition
    
* Specify the role definition using flags
    

When creating a custom role, you must specify whether it applies to the organization level or project level by using the `--organization [ORGANIZATION_ID]` or `--project [PROJECT_ID]` flags. Each example below creates a custom role at the project level.

In the next sections you create custom roles at the project level.

### Create a custom role using a YAML file

Create a YAML file that contains the definition for your custom role. The file must be structured in the following way:

```apache
title: [ROLE_TITLE]
description: [ROLE_DESCRIPTION]
stage: [LAUNCH_STAGE]
includedPermissions:
- [PERMISSION_1]
- [PERMISSION_2]
```

Each of the placeholder values is described below:

* `[ROLE_TITLE]` is a friendly title for the role, such as **Role Viewer**.
    
* `[ROLE_DESCRIPTION]` is a short description about the role, such as **My custom role description**.
    
* `[LAUNCH_STAGE]` indicates the stage of a role in the launch lifecycle, such as ALPHA, BETA, or GA.
    
* `includedPermissions` specifies the list of one or more permissions to include in the custom role, such as **iam.roles.get**.
    

1. Time to get started! Create your role definition YAML file by running:
    

```apache
nano role-definition.yaml
```

2. Add this custom role definition to the YAML file:
    

```apache
title: "Role Editor"
description: "Edit access for App Versions"
stage: "ALPHA"
includedPermissions:
- appengine.versions.create
- appengine.versions.delete
```

3. Then save and close the file by pressing **CTRL+X**, **Y** and then **ENTER**.
    
4. Execute the following `gcloud` command:
    

```apache
gcloud iam roles create editor --project $DEVSHELL_PROJECT_ID \
--file role-definition.yaml
```

If the role was created successfully, the following response is returned:

```apache
Created role [editor].
description: Edit access for App Versions
etag: BwVs4O4E3e4=
includedPermissions:
- appengine.versions.create
- appengine.versions.delete
name: projects/qwiklabs-gcp-01-57712e416bda/roles/editor
stage: ALPHA
title: Role Editor
```

Click **Check my progress** to verify the objective.

Create a custom role using a YAML file

**Check my progress**

### Create a custom role using flags

Now you'll use the flag method to create a new custom role. The flags take a similar form to the YAML file, so you’ll recognize how the command is being built.

* Execute the following `gcloud` command to create a new role using flags:
    

```apache
gcloud iam roles create viewer --project $DEVSHELL_PROJECT_ID \
--title "Role Viewer" --description "Custom role description." \
--permissions compute.instances.get,compute.instances.list --stage ALPHA
```

**Example output:**

```apache
Created role [viewer].
description: Custom role description.
etag: BwVs4PYHqYI=
includedPermissions:
- compute.instances.get
- compute.instances.list
name: projects/qwiklabs-gcp-01-57712e416bda/roles/viewer
stage: ALPHA
title: Role Viewer
```

Click **Check my progress** to verify the objective.

Create a custom role using flags

**Check my progress**

## **Task 5. List the custom roles**

1. Execute the following `gcloud` command to list custom roles, specifying either project-level or organization-level custom roles:
    

```apache
gcloud iam roles list --project $DEVSHELL_PROJECT_ID
```

**Example output:**

```apache
---
description: Edit access for App Versions
etag: BwVxLgrnawQ=
name: projects/qwiklabs-gcp-01-57712e416bda/roles/editor
title: Role Editor
---
description: Custom role description.
etag: BwVxLg18IQg=
name: projects/qwiklabs-gcp-01-57712e416bda/roles/viewer
title: Role Viewer
```

To list deleted roles, you can also specify the `--show-deleted` flag.

2. Execute the following `gcloud` command to list predefined roles:
    

```apache
gcloud iam roles list
```

## **Task 6. Update an existing custom role**

A common pattern for updating a resource's metadata, such as a custom role, is to read its current state, update the data locally, and then send the modified data for writing. This pattern could cause a conflict if two or more independent processes attempt the sequence simultaneously.

For example, if two owners for a project try to make conflicting changes to a role at the same time, some changes could fail.

Cloud IAM solves this problem using an `etag` property in custom roles. This property is used to verify if the custom role has changed since the last request. When you make a request to Cloud IAM with an etag value, Cloud IAM compares the etag value in the request with the existing etag value associated with the custom role. It writes the change only if the etag values match.

Use the `gcloud iam roles update` command to update custom roles in one of two ways:

* A YAML file that contains the updated role definition
    
* Flags that specify the updated role definition
    

When updating a custom role, you must specify whether it applies to the organization level or project level by using the `--organization [ORGANIZATION_ID]` or `--project [PROJECT_ID]` flags. Each example below creates a custom role at the project level.

The `describe` command returns the role's definition and includes an etag value that uniquely identifies the current version of the role. The etag value should be provided in the updated role definition to ensure that any concurrent role changes are not overwritten.

### Update a custom role using a YAML file

1. Get the current definition for the role by executing the following `gcloud` command, replacing `[ROLE_ID]` with **editor**.
    

```apache
gcloud iam roles describe [ROLE_ID] --project $DEVSHELL_PROJECT_ID
```

The `describe` command returns the following output:

```apache
description: [ROLE_DESCRIPTION]
etag: [ETAG_VALUE]
includedPermissions:
- [PERMISSION_1]
- [PERMISSION_2]
name: [ROLE_ID]
stage: [LAUNCH_STAGE]
title: [ROLE_TITLE]
```

2. Copy the output to use to create a new YAML file in the next steps.
    
3. Create a `new-role-definition.yaml` file with your editor:
    

```apache
nano new-role-definition.yaml
```

4. Paste in the output from the last command and add these two permissions under `includedPermissions`:
    

```apache
- storage.buckets.get
- storage.buckets.list
```

Your YAML file looks like this when you're finished:

```apache
description: Edit access for App Versions
etag: BwVxIAbRq_I=
includedPermissions:
- appengine.versions.create
- appengine.versions.delete
- storage.buckets.get
- storage.buckets.list
name: projects/qwiklabs-gcp-01-57712e416bda/roles/editor
stage: ALPHA
title: Role Editor
```

5. Save and close the file **CTRL+X**, **Y** and then **ENTER**.
    
6. Now you’ll use the `update` command to update the role. Execute the following `gcloud` command, replacing `[ROLE_ID]` with **editor**:
    

```apache
gcloud iam roles update [ROLE_ID] --project $DEVSHELL_PROJECT_ID \
--file new-role-definition.yaml
```

If the role was updated successfully, the following response is returned:

```apache
description: Edit access for App Versions
etag: BwVxIBjfN3M=
includedPermissions:
- appengine.versions.create
- appengine.versions.delete
- storage.buckets.get
- storage.buckets.list
name: projects/qwiklabs-gcp-01-57712e416bda/roles/editor
stage: ALPHA
title: Role Editor
```

Click **Check my progress** to verify the objective.

Update a custom role using a YAML file

**Check my progress**

### Update a custom role using flags

Each part of a role definition can be updated using a corresponding flag. For a list of all possible flags from the SDK reference documentation, see the topic [gcloud iam roles update](https://cloud.google.com/sdk/gcloud/reference/iam/roles/update).

Use the following flags to add or remove permissions:

* `--add-permissions`: Adds one or more comma-separated permissions to the role.
    
* `--remove-permissions`: Removes one or more comma-separated permissions from the role.
    

Alternatively, you can simply specify the new permissions using the `--permissions [PERMISSIONS]` flag and providing a comma-separated list of permissions to replace the existing permissions list.

* Execute the following `gcloud` command to add permissions to the **viewer** role using flags:
    

```apache
gcloud iam roles update viewer --project $DEVSHELL_PROJECT_ID \
--add-permissions storage.buckets.get,storage.buckets.list
```

If the role was updated successfully, the following response is returned:

```apache
description: Custom role description.
etag: BwVxLi4wTvk=
includedPermissions:
- compute.instances.get
- compute.instances.list
- storage.buckets.get
- storage.buckets.list
name: projects/qwiklabs-gcp-01-57712e416bda/roles/viewer
stage: ALPHA
title: Role Viewer
```

Click **Check my progress** to verify the objective.

Update a custom role using flags

**Check my progress**

## **Task 7. Disable a custom role**

When a role is disabled, any policy bindings related to the role are inactivated, meaning that the permissions in the role will not be granted, even if you grant the role to a user.

The easiest way to disable an existing custom role is to use the `--stage` flag and set it to DISABLED.

* Execute the following `gcloud` command to disable the **viewer** role:
    

```apache
gcloud iam roles update viewer --project $DEVSHELL_PROJECT_ID \
--stage DISABLED
```

If the role was updated successfully, the following response is returned:

```apache
description: Custom role description.
etag: BwVxLkIYHrQ=
includedPermissions:
- compute.instances.get
- compute.instances.list
- storage.buckets.get
- storage.buckets.list
name: projects/qwiklabs-gcp-01-57712e416bda/roles/viewer
stage: DISABLED
title: Role Viewer
```

Click **Check my progress** to verify the objective.

Disabling a custom role

**Check my progress**

## **Task 8. Delete a custom role**

* Use the `gcloud iam roles delete` command to delete a custom role. Once deleted the role is inactive and cannot be used to create new IAM policy bindings:
    

```apache
gcloud iam roles delete viewer --project $DEVSHELL_PROJECT_ID
```

**Example output:**

```apache
deleted: true
description: Custom role description.
etag: BwVxLkf_epw=
includedPermissions:
- compute.instances.get
- compute.instances.list
- storage.buckets.get
- storage.buckets.list
name: projects/qwiklabs-gcp-01-57712e416bda/roles/viewer
stage: DISABLED
title: Role Viewer
```

After the role has been deleted, existing bindings remain, but are inactive. The role can be undeleted within 7 days. After 7 days, the role enters a permanent deletion process that lasts 30 days. After 37 days, the Role ID is available to be used again.

**Note:** If a role is being phased out, change its **role.stage** property to **DEPRECATED**, and set the `deprecation_message` to let users know what alternative roles should be used or where to get more information.

## **Task 9. Restore a custom role**

* Within the 7 days window you can restore a role. Deleted roles are in a **DISABLED** state. To make it available again, update the `--stage` flag:
    

```apache
gcloud iam roles undelete viewer --project $DEVSHELL_PROJECT_ID
```

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=TgBqhF_O_7Q] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723971411730/f456afa6-6c14-4113-afe0-192225a4fb19.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/IAM%20Custom%20Roles/quicklabgsp190.sh
sudo chmod  +x quicklabgsp190.sh
./quicklabgsp190.sh
```