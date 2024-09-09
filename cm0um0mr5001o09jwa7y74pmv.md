---
title: "Authentication, Authorization, and Identity with Vault - GSP1005"
seoTitle: "Authentication, Authorization, and Identity with Vault - GSP1005"
seoDescription: "Authentication in Vault is the process by which user or machine supplied information is verified against an internal or external system. Vault supports mult"
datePublished: Mon Sep 09 2024 06:16:16 GMT+0000 (Coordinated Universal Time)
cuid: cm0um0mr5001o09jwa7y74pmv
slug: authentication-authorization-and-identity-with-vault-gsp1005
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725862229675/cfdc4f90-eafd-4111-b2de-7fd40b343a04.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725862557567/be196c24-ada3-487b-a2bf-75489ed922b6.jpeg
tags: authentication-authorization-and-identity-with-vault-gsp1005, gsp1005

---

## **Overview**

Authentication in Vault is the process by which user or machine supplied information is verified against an internal or external system. Vault supports multiple auth methods including GitHub, LDAP, AppRole, and more.

Identity is used to maintain the clients who are recognized by Vault. As such, Vault provides an identity management solution through the Identity secrets engine. In this lab, you will learn about the different types of authentication and auth methods, as well as how to interact with identity in Vault.

### Objectives

In this lab, you will:

* Learn about the different types of authentication
    
* Configure and use the AppRole auth method
    
* Create aliases with distinct policies
    
* Create an entity with a base policy
    
* Associate aliases as entity members
    
* Create an internal group with an entity member
    

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
    student-00-fa917ca2b4f5@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    JIW008Nxr218
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-cfc8fc0ce604`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-cfc8fc0ce604
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
ACCOUNT: student-00-fa917ca2b4f5@qwiklabs.net

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
project = qwiklabs-gcp-03-cfc8fc0ce604
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Install Vault**

1. In Cloud Shell, add the HashiCorp GPG key:
    

```apache
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
```

2. Add the official HashiCorp Linux repository:
    

```apache
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
```

Press ENTER to continue.

3. Update and install Vault:
    

```apache
sudo apt-get update
sudo apt-get install vault
```

### Verify the installation

After installing Vault, verify the installation worked by checking that the Vault binary is available.

* Execute the `vault` command to verify the installation:
    

```apache
vault
```

You should see help output similar to the following:

```apache
Usage: vault <command> [args]

Common commands:
    read        Read data and retrieves secrets
    write       Write data, configuration, and secrets
    delete      Delete secrets and configuration
    list        List data or secrets
    login       Authenticate locally
    agent       Start a Vault agent
    server      Start a Vault server
    status      Print seal and HA status
    unwrap      Unwrap a wrapped secret

Other commands:
    audit          Interact with audit devices
    auth           Interact with auth methods
    debug          Runs the debug command
    kv             Interact with Vault's Key-Value storage
    lease          Interact with leases
    monitor        Stream log messages from a Vault server
    namespace      Interact with namespaces
    operator       Perform operator-specific tasks
    path-help      Retrieve API help for paths
    plugin         Interact with Vault plugins and catalog
    policy         Interact with policies
    print          Prints runtime configurations
    secrets        Interact with secrets engines
    ssh            Initiate an SSH session
    token          Interact with tokens
```

## **Task 2. Start the Vault server**

With Vault installed, the next step is to start a Vault server.

Vault operates as a client/server application. The Vault server is the only piece of the Vault architecture that interacts with the data storage and backends. All operations done via the Vault CLI interact with the server over a TLS connection.

In this lab, you will start and interact with the Vault server running in [development mode](https://www.vaultproject.io/docs/concepts/dev-server).

This dev-mode server requires no further setup, and your local vault CLI will be authenticated to talk to it. This makes it easy to experiment with Vault or start a Vault instance for development. Every feature of Vault is available in "dev" mode. The `-dev` flag just short-circuits a lot of setup to insecure defaults.

**Note:** Never run a "dev" mode server in production. It is insecure and will lose data on every restart (since it stores data in-memory). It is only made for development or experimentation.

### Starting the dev server

First, start a Vault *dev server*. The dev server is a built-in, pre-configured server that is not very secure but useful for playing with Vault locally.

1. To start the Vault dev server, run:
    

```apache
vault server -dev
```

You should see output relating to your Vault server configuration. Notice that **Unseal Key** and **Root Token** values are displayed.

```apache
==> Vault server configuration:

             Api Address: http://127.0.0.1:8200
                     Cgo: disabled
         Cluster Address: https://127.0.0.1:8201
              Listener 1: tcp (addr: "127.0.0.1:8200", cluster address: "127.0.0.1:8201", max_request_duration: "1m30s", max_request_size: "33554432", tls: "disabled")
               Log Level: info
                   Mlock: supported: false, enabled: false
           Recovery Mode: false
                 Storage: inmem
                 Version: Vault v1.4.1

WARNING! dev mode is enabled! In this mode, Vault runs entirely in-memory
and starts unsealed with a single unseal key. The root token is already
authenticated to the CLI, so you can immediately begin using Vault.

You may need to set the following environment variable:

    $ export VAULT_ADDR='http://127.0.0.1:8200'

The unseal key and root token are displayed below in case you want to
seal/unseal the Vault or re-authenticate.

Unseal Key: 1+yv+v5mz+aSCK67X6slL3ECxb4UDL8ujWZU/ONBpn0=
Root Token: s.XmpNPoi9sRhYtdKHaQhkHP6x

Development mode should NOT be used in production installations!

==> Vault server started! Log data will stream in below:
```

**Note:** The dev server stores all its data in-memory (but still encrypted), listens on `localhost` without TLS, and automatically unseals and shows you the unseal key and root access key.

**Note: Insecure operation**

Do not run a Vault dev server in production! This approach is only used here to simplify the unsealing process for this demonstration.

Now that you have the Vault development server running, you can continue setting up access to it.

2. Open a new Cloud Shell tab.
    
3. Copy and run the export `VAULT_ADDR ..`. command from the **terminal output**. This will configure the Vault client to talk to the dev server:
    

```apache
export VAULT_ADDR='http://127.0.0.1:8200'
```

The Vault CLI determines which Vault servers to send requests using the `VAULT_ADDR` environment variable.

4. Save the unseal key somewhere. Don't worry about *how* to save this securely. For now, just save it anywhere.
    
5. Set the `VAULT_TOKEN` environment variable value to the generated **Root Token** value displayed in the **terminal output**:
    

```apache
export VAULT_TOKEN="<REPLACE WITH YOUR ROOT TOKEN>"
```

### Verify the server is running

* Verify the server is running by running the `vault status` command:
    

```apache
vault status
```

If it ran successfully, the output should look like the following:

```apache
$ vault status

Key             Value
---             -----
Seal Type       shamir
Initialized     true
Sealed          false
Total Shares    1
Threshold       1
Version         1.9.2
Storage Type    inmem
Cluster Name    vault-cluster-e2392b81
Cluster ID      48d7aba0-5416-a36b-2c27-0b256b222f57
HA Enabled      false
```

Great! You've started the Vault development server. You can now continue on to the next section.

### Log in to the Vault web UI

1. First, click on the **web preview icon** on the toolbar of Cloud Shell.
    

![Web preview icon.](https://cdn.qwiklabs.com/OLFGboKgKleMinJjp0qj8J713XImthsD7PvdxjmW9Uw%3D align="left")

2. Click **Change port**.
    
3. Change the Port Number to `8200` and click **Change and Preview**.
    

![Change Preview Port page, with 8200 added to its Port Number text field.](https://cdn.qwiklabs.com/9wLXL7KtGaMJ6KQ8VD24cIyD81m%2ByaxzfR3VDR0%2BztQ%3D align="left")

4. You should be redirected to the Vault sign in page.
    

![Vault sign in page, which includes the Method and Token fields.](https://cdn.qwiklabs.com/rZ9T%2BPXR2kK6uCui7Q2gyPyPCiBQUKx%2F8VeSeZQNlz8%3D align="left")

5. Enter your **Root Token** that you saved earlier in the lab and click **Sign In**.
    

Your Vault development server should resemble the following.

![Vault development server UI, whith the Secrets tabbed page displayed.](https://cdn.qwiklabs.com/WEhTAP0E3xRqEjwQyr%2BTR3pJswk3nruPIHACeYms6sY%3D align="left")

Now that you're logged in to the development server web UI, you can continue on to the next section. Keep this page open as you will need to use the UI later in the lab.

## **Task 3. Authentication in Vault**

Before a client can interact with Vault, it must *authenticate* against an auth method. Upon authentication, a token is generated. This token is conceptually similar to a session ID on a website. The token may have attached policy, which is mapped at authentication time. This process is described in detail in the [policies concepts](https://www.vaultproject.io/docs/concepts/policies) documentation.

### Auth methods

Vault supports a number of auth methods. Some backends are targeted toward users while others are targeted toward machines. Most authentication backends must be enabled before use. Often you will see authentications at the same path as their name, but this is not a requirement.

To learn more about authentication, you could use the built-in `path-help` command:

```apache
vault path-help auth/my-auth
```

Vault supports multiple auth methods simultaneously, and you can even mount the same type of auth method at different paths. Only one authentication is required to gain access to Vault, and it is not currently possible to force a user through multiple auth methods to gain access, although some backends do support MFA.

### Tokens

It is important to understand that authentication works by verifying your identity and then generating a token to associate with that identity.

For example, even though you may authenticate using something like GitHub, Vault generates a *unique access token* for you to use for future requests. The CLI automatically attaches this token to requests, but if you're using the API you'll have to do this manually.

This token given for authentication with any backend can also be used with the full set of token commands, such as creating new sub-tokens, revoking tokens, and renewing tokens. This is all covered on the [token concepts page](https://www.vaultproject.io/docs/concepts/tokens).

### API

API authentication is generally used for machine authentication. Each auth method implements its own login endpoint. Use the vault path-help mechanism to find the proper endpoint. For example, the GitHub login endpoint is located at `auth/github/login`. And to determine the arguments needed, `vault path-help auth/github/login` can be used.

## **Task 4. AppRole auth method overview**

The `approle` auth method allows machines or *apps* to authenticate with Vault-defined *roles*. The open design of `AppRole` enables a varied set of workflows and configurations to handle large numbers of apps. This auth method is oriented to automated workflows (machines and services), and is less useful for human operators.

An "AppRole" represents a set of Vault policies and login constraints that must be met to receive a token with those policies. The scope can be as narrow or broad as desired. An AppRole can be created for a particular machine, or even a particular user on that machine, or a service spread across machines. The credentials required for successful login depend upon the constraints set on the AppRole associated with the credentials.

### What makes AppRole better?

The most essential feature of AppRole that makes it better than direct token assignment is that the credential is split into a **Role ID** and a **Secret ID**, delivered through different channels. Furthermore, the Secret ID is delivered to the application only at the expected time of use (usually at application startup).

This pattern of authorization by using knowledge delivered just in time, in parts, through independent delivery paths should be familiar from standard multi-factor authentication methods: to log in to a service, you have an already-known identity, but you need a one-time-use token generated and delivered at the time you log in as well.

The **Role ID** is not sensitive and can be used for any number of instances of a given application; you can hardcode it into things like VM or container images (though as a best practice, you should not provide it to processes that don’t need it, e.g. processes that manage roles rather than using them to authenticate). Role ID can be seen as the “username” for a particular application. This means that multiple instances of the same application can share the same Role ID.

The **Secret ID**, by contrast, is:

* Always intended to be a secret and can be seen as the “password” that is required to login to Vault.
    
* Intended to be access-limited so it can be used only by authorized applications; it may be usable by only a single application or even a single app instance.
    
* Intended to be short-lived to reduce the window for compromise; it may be valid for only seconds.
    

For more information on AppRole, and the Secret and Role IDs, check out the [Authenticating Applications with HashiCorp Vault AppRole documentation](https://www.hashicorp.com/blog/authenticating-applications-with-vault-approle).

## **Task 5. Using the AppRole auth method**

Before a client can interact with Vault, it must authenticate against an **auth method** to acquire a token. This token has policies attached so that the behavior of the client can be governed.

![Vault auth method architecture diagram.](https://cdn.qwiklabs.com/BGk9Efn7pybsmKm2Py2uoJ3kNP2j8UUAjvWN9l3p2iw%3D align="left")

Since tokens are the core method for authentication within Vault, there is a **token** auth method (often referred to as ***token store***). This is a special auth method responsible for creating and storing tokens. In this section, you will generate tokens for machines or apps by enabling the AppRole auth method.

### Challenge

Think of a scenario where a DevOps team wants to configure Jenkins to read secrets from Vault so that it can inject the secrets to an app's environment variables (e.g. `MYSQL_DB_HOST`) at deployment time. Instead of hardcoding secrets in each build script as plain text, Jenkins retrieves secrets from Vault.

As a user, you can authenticate with Vault using your LDAP credentials, and Vault generates a token. This token has policies granting you permission to perform the appropriate operations. How can a Jenkins server programmatically request a token so that it can read secrets from Vault?

#### **Solution:**

Enable the **AppRole** auth method so that the Jenkins server can obtain a Vault token with appropriate policies attached. Since each AppRole has attached policies, you can write fine-grained policies limiting which app can access which path.

### Create a policy and test data

As discussed earlier, [AppRole](https://www.vaultproject.io/docs/auth/approle.html) is an authentication mechanism within Vault to allow machines or apps to acquire a token to interact with Vault. It uses **RoleID** and **SecretID** for login. The basic workflow is:

![Vault app role workflow diagram](https://cdn.qwiklabs.com/oEKr9uC20pYtwn4O2zo9ssZKY4GygVSmmynEgHOv%2FZk%3D align="left")

**Note:** For the purpose of introducing the basics of AppRole, this lab walks you through a very simple scenario involving only two personas (`admin` and `app`).

1. In Cloud Shell, run the following to create some test data:
    

```apache
vault kv put secret/mysql/webapp db_name="users" username="admin" password="passw0rd"
```

You should receive the following output:

```apache
Key              Value
---              -----
created_time     2021-06-08T02:34:23.182299Z
deletion_time    n/a
destroyed        false
version          1
```

2. Next, enable `approle` auth method by executing the following command:
    

```apache
vault auth enable approle
```

```apache
Success! Enabled approle auth method at: approle/
```

When you enabled the AppRole auth method, it gets mounted at the `/auth/approle` path. In this example, you are going to create a role for the `app` persona (`jenkins` in our scenario).

3. Before creating a role, use the following command to create a `jenkins` policy file:
    

```apache
vault policy write jenkins -<<EOF
# Read-only permission on secrets stored at 'secret/data/mysql/webapp'
path "secret/data/mysql/webapp" {
  capabilities = [ "read" ]
}
EOF
```

You should receive the following output:

```apache
Success! Uploaded policy: jenkins
```

4. Next, create a **role** named `jenkins` with `jenkins` policy attached:
    

```apache
vault write auth/approle/role/jenkins token_policies="jenkins" \
    token_ttl=1h token_max_ttl=4h
```

Output:

```apache
Success! Data written to: auth/approle/role/jenkins
```

The generated token's time-to-live (TTL) is set to 1 hour and can be renewed for up to 4 hours of its first creation. (Note: This example creates a role which operates in [pull mode](https://www.vaultproject.io/docs/auth/approle#pull-and-push-secretid-modes).)

**Note:** To attach multiple policies, pass the policy names as a comma separated string: `token_policies="jenkins,anotherpolicy"`.

There are a number of [parameters](https://www.vaultproject.io/api-docs/auth/approle#create-update-approle) that you can set on a role. If you want to limit the use of the generated secret ID, set `secret_id_num_uses` or `secret_id_ttl` parameter values. Similarly, you can specify `token_num_uses` and `token_ttl`. You may never want the app token to expire. In such a case, specify the period so that the token generated by this AppRole is a periodic token. To learn more about periodic tokens, refer to the [Tokens](https://learn.hashicorp.com/tutorials/vault/tokens#periodic-service-tokens) tutorial.

5. Read the `jenkins` role you created to verify:
    

```apache
vault read auth/approle/role/jenkins
```

Your output should resemble the following:

```apache
Key                        Value
---                        -----
bind_secret_id             true
local_secret_ids           false
secret_id_bound_cidrs      <nil>
secret_id_num_uses         0
secret_id_ttl              0s
token_bound_cidrs          []
token_explicit_max_ttl     0s
token_max_ttl              4h
token_no_default_policy    false
token_num_uses             0
token_period               0s
token_policies             [jenkins]
token_ttl                  1h
token_type                 default
```

### Get RoleID and SecretID

The **RoleID** and **SecretID** are like a username and password that a machine or app uses to authenticate. Since the example created a `jenkins` role which operates in pull mode, Vault will generate the **SecretID**. You can set properties such as usage-limit, TTLs, and expirations on the SecretIDs to control its lifecycle.

To retrieve the **RoleID**, invoke the `auth/approle/role/<ROLE_NAME>/role-id` endpoint. To generate a new SecretID, invoke the `auth/approle/role/<ROLE_NAME>/secret-id` endpoint.

Now, you'll need to fetch the RoleID and SecretID of a role.

1. Execute the following command to retrieve the RoleID for the `jenkins` role:
    

```apache
vault read auth/approle/role/jenkins/role-id
```

Your output should resemble the following:

```apache
Key     Value
---     -----
role_id 675a50e7-cfe0-be76-e35f-49ec009731ea
```

2. Execute the following command to generate a SecretID for the `jenkins` role:
    

```apache
vault write -force auth/approle/role/jenkins/secret-id
```

You should receive output resembling the following:

```apache
Key                 Value
---                 -----
secret_id           ed0a642f-2acf-c2da-232f-1b21300d5f29
secret_id_accessor  a240a31f-270a-4765-64bd-94ba1f65703c
```

The `-force` (or `-f`) flag forces the write operation to continue without any data values specified. Or you can set [parameters](https://www.vaultproject.io/api/auth/approle/index.html#generate-new-secret-id) such as `cidr_list`.

**Note:** The **RoleID** is similar to a username; therefore, you will get the same value for a given role. In this case, the `jenkins` role has a fixed RoleID. While SecretID is similar to a password that Vault will generate a new value every time you request it.

### Login with RoleID & SecretID

The client (in this case, Jenkins) uses the RoleID and SecretID passed by the admin to authenticate with Vault. If Jenkins did not receive the RoleID and/or SecretID, the admin needs to investigate.

1. To login, use the `auth/approle/login` endpoint by passing the RoleID and SecretID. Make sure to replace the values with your RoleID and SecretID:
    

```apache
vault write auth/approle/login role_id="your-role-ID" secret_id="your-secret-ID"
```

Your output should resemble:

```apache
Key                     Value
---                     -----
token                   s.ncEw5bAZJqvGJgl8pBDM0C5h
token_accessor          gIQFfVhUd8fDsZjC7gLBMnQu
token_duration          1h
token_renewable         true
token_policies          ["default" "jenkins"]
identity_policies       []
policies                ["default" "jenkins"]
token_meta_role_name    jenkins
```

Vault returns a **client token** with `default` and `jenkins` policies attached.

2. Store the generated token value in an environment variable named, `APP_TOKEN`:
    

```apache
export APP_TOKEN="your-token"
```

### Read secrets using the AppRole token

Once receiving a token from Vault, the client can make future requests using this token.

1. Verify that you can access the secrets at secret/mysql/webapp:
    

```apache
VAULT_TOKEN=$APP_TOKEN vault kv get secret/mysql/webapp
```

Your output should resemble the following:

```apache
====== Metadata ======
Key              Value
---              -----
created_time     2021-06-08T02:34:23.182299Z
deletion_time    n/a
destroyed        false
version          1

====== Data ======
Key         Value
---         -----
db_name     users
password    passw0rd
username    admin
```

2. The app has a read-only access; therefore, the following `delete` command will fail:
    

```apache
VAULT_TOKEN=$APP_TOKEN vault kv delete secret/mysql/webapp
```

The error message indicates permission error.

```apache
Error deleting secret/mysql/webapp: Error making API request.

URL: DELETE http://127.0.0.1:8200/v1/secret/data/mysql/webapp
Code: 403. Errors:

* 1 error occurred:
    * permission denied
```

3. Run the following command to copy the values of the `mysql/webapp` secret to text files:
    

```apache
VAULT_TOKEN=$APP_TOKEN vault kv get -format=json secret/mysql/webapp | jq -r .data.data.db_name > db_name.txt
VAULT_TOKEN=$APP_TOKEN vault kv get -format=json secret/mysql/webapp | jq -r .data.data.password > password.txt
VAULT_TOKEN=$APP_TOKEN vault kv get -format=json secret/mysql/webapp | jq -r .data.data.username > username.txt
```

4. Run the following command to copy these file to a pre-created Cloud Storage bucket to track your progress:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp *.txt gs://$PROJECT_ID
```

Click *Check my progress* to verify the objective.

Using the AppRole Auth Method

**Check my progress**

### Response wrap the SecretID

The RoleID is equivalent to a username, and SecretID is the corresponding password. The app needs both to log in with Vault. Naturally, the next question becomes how to deliver those values to the client securely.

A common solution involves **three personas** instead of two: `admin`, `app`, and `trusted entity`. The trusted entity delivers the RoleID and SecretID to the client by separate means.

For example, Terraform as a trusted entity can deliver the RoleID onto the virtual machine. When the app runs on the virtual machine, the RoleID already exists on the virtual machine.

![Vault's response wrap SecretID workflow diagram.](https://cdn.qwiklabs.com/HiPvTabfOP52BgLxqp%2FI%2F8l0fsdRq8wbdinn%2BLSH%2B8I%3D align="left")

SecretID is like a password. To keep the SecretID confidential, use **response wrapping** so that only the expecting client can unwrap the SecretID.

Earlier, you executed the following command to retrieve the Secret ID.

```apache
vault write -force auth/approle/role/jenkins/secret-id
```

1. Instead, you can use response wrapping by passing the `-wrap-ttl` parameter:
    

```apache
vault write -wrap-ttl=60s -force auth/approle/role/jenkins/secret-id
```

```apache
Key                              Value
---                              -----
wrapping_token:                  s.yzbznr9NlZNzsgEtz3SI56pX
wrapping_accessor:               Smi4CO0Sdhn8FJvL8XvOT30y
wrapping_token_ttl:              1m
wrapping_token_creation_time:    2021-06-07 20:02:01.019838 -0700 PDT
wrapping_token_creation_path:    auth/approle/role/jenkins/secret-id
```

2. Now you can send this `wrapping_token` to the client so that the response can be unwrapped and obtain the SecretID:
    

```apache
VAULT_TOKEN="<your-wrapping-token>" vault unwrap
```

You should now see the SecretID unwrapped:

```apache
Key                   Value
---                   -----
secret_id             d3eb75bc-2fb4-9d4e-9d81-17179130609c
secret_id_accessor    54b2683c-9c14-cb49-2510-b87c82c7d279
secret_id_ttl         0s
```

**Note:** To learn more about the wrapping token, read the [Cubbyhole Response Wrapping tutorial.](https://learn.hashicorp.com/tutorials/vault/cubbyhole-response-wrapping)

### Limit the SecretID usages

Another best practice is to treat the SecretID like a password and force it to be regenerated after a number of use.

* To do so, update the role definition with `secret_id_num_uses` set:
    

```apache
vault write auth/approle/role/jenkins token_policies="jenkins" \
     token_ttl=1h token_max_ttl=4h \
     secret_id_num_uses=10
```

In this example, a SecretID of the `jenkins` role can be used for up to 10 times to authenticate and fetch a client token. After the number of uses is reached, the SecretID expires and you would need to generate a new one. This is similar to forcing a password rotation.

## **Task 6. Entities, aliases, and groups**

A common scenario is that users may have multiple accounts with various identity providers, and Vault supports many of those providers to authenticate with Vault. Vault Identity can tie authentications from various auth methods to a single representation. This representation of a consolidated identity is called an **Entity** and their corresponding accounts with authentication providers can be mapped as **Aliases**. In essence, each entity is made up of zero or more aliases. An entity cannot have more than one alias for a particular authentication backend.

The idea of Identity is to maintain the clients who are recognized by Vault. As such, Vault provides an identity management solution through the Identity secrets engine. For more information about the Identify secrets engine and how it is used, refer to the [Identify Secrets Engine](https://www.vaultproject.io/docs/secrets/identity) documentation.

### Challenge

Bob has accounts in both Github and LDAP. Both Github and LDAP auth methods are enabled on the Vault server that he can authenticate using either one of his accounts. Although both accounts belong to Bob, there is no association between the two accounts to set some common properties.

#### **Solution:**

Create an entity representing Bob, and associate aliases representing each of his accounts as the entity member. You can set additional policies and metadata on the entity level so that both accounts can inherit.

When Bob authenticates using either one of his accounts, the entity identifier will be tied to the authenticated token. When such tokens are put to use, their entity identifiers are audit logged, marking a trail of actions performed by specific users.

### Create an entity with Alias

You are first going to create a new entity with base policy assigned. The entity defines two entity aliases with each having a different policy assigned.

For this lab, let's assume a user, Bob Smith at ACME Inc. happened to have two sets of credentials: `bob` and `bsmith`. Bob can authenticate with Vault using either one of his accounts. To manage the user's accounts and link them to identity Bob Smith in QA team, you are going to create an entity for Bob.

![Bob's Entity card, which includes information such as his name, entity ID, metadata, and aliases.](https://cdn.qwiklabs.com/cBGhs5MOoJRQNhWwn6dEmlVYbQUVdEqABVwgwxXMNps%3D align="left")

For the simplicity of this lab, you are going to work with the userpass auth method. In reality, the user `bob` might be a username that exists in Active Directory, and `bsmith` might be Bob's username in GitHub. To mock the behavior, you are going to enable the userpass auth method at two separate paths: `userpass-test` and `userpass-qa`. Pretend that they are two different types of auth methods.

You'll first start by creating the appropriate policies.

1. Navigate to the Vault UI. Click the **Policies** tab from the home page. You should see the default and root ACL policies, along with the `jenkins` policy you created earlier.
    

![Vault's Policies tabbed page, which lists two folders: default, and jenkins, along with a Create ACL policy button.](https://cdn.qwiklabs.com/EXfg2KMjuwJFTrPCo7sGbEbild60TiAAsyXewHBLr6M%3D align="left")

2. Click **Create ACL policy**.
    
3. Name this policy: `base`.
    
4. In the **Policy** box, add the following policy:
    

```apache
path "secret/data/training_*" {
   capabilities = ["create", "read"]
}
```

5. Click **Create policy**.
    
6. Click **ACL Policies** to navigate back to the Policies page.
    
7. Click **Create ACL policy** .
    
8. Name this policy: `test`.
    
9. In the **Policy** box, add the following policy:
    

```apache
path "secret/data/test" {
   capabilities = [ "create", "read", "update", "delete" ]
}
```

10. Click **Create policy**.
    
11. Click **ACL Policies** to navigate back to the Policies page.
    
12. Click **Create ACL policy** .
    
13. Name this policy: `team-qa`.
    
14. In the **Policy** box, add the following policy:
    

```apache
path "secret/data/team-qa" {
   capabilities = [ "create", "read", "update", "delete" ]
}
```

15. Click **Create policy**.
    
16. Click **ACL Policies** to navigate back to the Policies page.
    

Your policies should resemble the following:

![The Policies tabbed page, which now lists the newly-added policies.](https://cdn.qwiklabs.com/6GxRllMILemA4HH%2FwgMxsbG7yFuyFEMGEAPBFsuU%2Bn0%3D align="left")

### Create the users and attach policies

Now, you are going to create `bob` and `bsmith` users with appropriate policies attached.

1. On the Navigation menu click the **Access** tab and then click **Enable new method**.
    

![Enable new method button.](https://cdn.qwiklabs.com/Yo3CJBSSvfOwU7DCFqbWR3ppqzCCHCGPgypky82T1rE%3D align="left")

2. Select **Username & Password** and click **Next**.
    
3. For the **Path**, use: `userpass-test`.
    
4. Click **Enable Method**.
    
5. Navigate back to the `userpass-test` auth method.
    

![The userpass-test's Users tabbed page.](https://cdn.qwiklabs.com/aZzU0I%2BXbRAqFBNgDK%2BUesJqFv60oVBnOV%2Bgg2vq2Cs%3D align="left")

6. Click **Create user**.
    
7. For the **Username**, use `bob`. For the **Password**, use `training`.
    

![The Create user page, which includes the added username and password fields.](https://cdn.qwiklabs.com/vGWCjLL09ziTG3YCKxQqpyPYSKVM6mTw9t9b9SoPA3I%3D align="left")

8. Click **Tokens** to open the sub-menu.
    
9. Under **Generated Token's Policies**, add the `test` policy.
    
10. Click **Save**.
    

![The Userpass-test's User tabbed page, which lists the folder 'bob'.](https://cdn.qwiklabs.com/8tmHDYdiOluAbQvM3o7o0sqKS5y%2BRssBDIqUkdJPUv0%3D align="left")

Great! You've created the `bob` user on the `userpass-test` path and attached the `test` policy to it.

11. Click **Auth methods** to navigate back to the **Authentication Methods** page.
    

![The Authentication Methods page, which includes the Enable new method button.](https://cdn.qwiklabs.com/NWxwAnb7kPksyv0LMJl%2FV3bEjQydTo9hbvs4dLbHVXg%3D align="left")

12. Click **Enable new method**.
    
13. Select **Username & Password** and click **Next**.
    
14. For the **Path**, use: `userpass-qa`.
    
15. Click **Enable Method**.
    
16. Navigate back to the `userpass-qa` auth method.
    

![The Users tabbed page, which includes the Create user button.](https://cdn.qwiklabs.com/mNyefPxUCzC8jb3iFz7Yst%2BOEbIeMRPrVAslaYXCtSQ%3D align="left")

17. Click **Create user**.
    
18. For the **Username**, use `bsmith`. For the **Password**, use `training`.
    

![The Create user page, which includes the username and password fields.](https://cdn.qwiklabs.com/ywuDTe24Ndo8P8v0C67RoRIuP%2FJXlCxpt3K6xTyL2vc%3D align="left")

19. Click **Tokens** to open the sub-menu.
    
20. Under **Generated Token's Policies**, add the `team-qa` policy.
    
21. Click **Save**.
    

![The userpass-qa page, which lists the bsmith user.](https://cdn.qwiklabs.com/XmT7HXACrNutA3zBsqJyo2dbYKg30Myv4AgK3BPVHL0%3D align="left")

### Associate aliases as entity members

You can set policies on the entity level that both accounts can inherit. In this section you will associate two aliases (`bob` and `bsmith`) as entity members.

1. Click **Back to main navigation** and click the **Access** tab, then under the **Access** menu on the left, click **Entities**.
    
2. Click **Create entity**.
    
3. For the name, use `bob-smith`.
    
4. For the **Policies**, choose `base`.
    

![The Create entity page.](https://cdn.qwiklabs.com/pVmVV7zaB4WkMeoH%2BHTNKn1L%2FlZliR9vxLYNXt95S54%3D align="left")

5. Click **Create**.
    

![bob-smith Details tabbed page, which includes the name, ID, date created, and last updated date.](https://cdn.qwiklabs.com/4UTMddgNEoOB3yl%2BSMtRNx2CpbiBc7wB1hvM9yrjcmU%3D align="left")

Now it's time to create aliases.

6. Click **Add alias**.
    
7. For the **Name**, use `bob`.
    
8. For **Auth Backend**, select `userpass-test/`.
    

![Create entity alias page.](https://cdn.qwiklabs.com/B6I%2F1MtANsUF2TOD7Sc6mHBSX6my7jlQWhFU2gl2DGc%3D align="left")

9. Click **Create**. Your alias should resemble the following.
    

![bob Details tabbed page, which includes the name, ID, mount, date created, and last updated date.](https://cdn.qwiklabs.com/EOrFgbLrqM8YxaThogu2ph5llCZl4jTpYfyBRelUlbU%3D align="left")

10. Navigate back to the **bob-smith** entity.
    
11. Click **Add alias**.
    
12. For the **Name**, use `bsmith`.
    
13. For **Auth Backend**, select `userpass-qa/`.
    

![create entity alias page](https://cdn.qwiklabs.com/kYKsoVsg2IdyATw%2BkX%2BFDJQ67e2uUwI%2BERdj0mttchg%3D align="left")

14. Click **Create**. Your alias should resemble the following.
    

![bsmith Details tabbed page, which includes the name, ID, mount, date created, and last updated date.](https://cdn.qwiklabs.com/1eQjgevike%2FbL1J2BSgmT6tK1vGLESbvVxzpxUD5vZo%3D align="left")

15. Click **Entities** on the left menu to navigate back to the entities page. You should see the `bob-smith` entity with 2 aliases.
    

![The Entities tabbed page.](https://cdn.qwiklabs.com/l6QnZtupx06tY3VtOchIEHfsUQahyC0Lkl2NGxL67zw%3D align="left")

**Note:** You can ignore the other entity that was created earlier in setting up the approle auth method.

### Test the entity

1. First, navigate back to Cloud Shell and run the following command to log in as the `bob` user:
    

```apache
vault login -method=userpass -path=userpass-test \
    username=bob password=training
```

You should see the following output:

```apache
Key                    Value
---                    -----
token                  s.upfmMlX7tvFE0caUUVuCj7Fjtoken_accessor         j8KxZUPJ4R4yEQYYV2T4Slow
token_duration         768h
token_renewable        true
token_policies         ["default" "test"]
identity_policies      ["base"]
policies               ["base" "default" "test"]
token_meta_username    bob
```

2. Notice the two lines: `identity_policies` and `policies`.
    

```apache
identity_policies      ["base"]
policies               ["base" "default" "test"]
```

Here you see that within the policies, there are three policies attached: `base`, `default`, and `test`. The `test` policy is the one directly associated with the user, and the `base` policy is the one inherited by the entity.

The `identity_policies` shows which policies are coming *directly* from the entity. Although the username `bob` does not have `base` policy attached, the token inherits the capabilities granted in the base policy because `bob` is a member of the `bob-smith` entity, and the entity has base policy attached. Check to see that the bob's token inherited the capabilities.

3. Copy the token for `bob` and run the following command to check the token capabilities:
    

```apache
vault token capabilities <bob token> secret/data/training_test
```

You should see:

```apache
create, read
```

The `base` policy grants create and read capabilities on `secret/training_*` path; therefore bob is permitted to run create and read operations against any path starting with `secret/training_*`.

4. What about the `secret/team-qa` path?
    

```apache
vault token capabilities <bob token> secret/data/team-qa
```

You should see:

```apache
deny
```

The user `bob` only inherits capability from its associating entity's policy. The user can access the s`ecret/team-qa` path only if he logs in with `bsmith` credentials. Let's try that now.

5. Next, run the following command to log in as the `bsmith` user:
    

```apache
vault login -method=userpass -path=userpass-qa \
    username=bsmith password=training
```

You should see the following output:

```apache
Key                    Value
---                    -----
token                  s.zsPGSIolQ1SdInhHv4IhV12v
token_accessor         y2ephSbQCGZ7LV6oLCOmUBno
token_duration         768h
token_renewable        true
token_policies         ["default" "team-qa"]
identity_policies      ["base"]
policies               ["base" "default" "team-qa"]
token_meta_username    bsmith
```

6. Notice the two lines: `identity_policies` and `policies`.
    

```apache
identity_policies      ["base"]
policies               ["base" "default" "team-qa"]
```

Again, you see that within the policies, there are three policies attached: `base`, `default`, and `team-qa`. The `team-qa` policy is the one directly associated with the user, and the `base` policy is inheritied. You can now optionally test out the token capabilities.

### Create an internal group

Vault identity has support for groups. A group can contain multiple entities as its members. A group can also have subgroups. Policies set on the group are granted to all members of the group. During request time, when the token's entity ID is being evaluated for the policies that it has access to, policies that are inherited due to group memberships are granted along with the policies on the entity itself.

![The Group page, which includes the entity data.](https://cdn.qwiklabs.com/cB3iBFSHLdyJw8ECZ9acR7UXNxP5Y14ywYIE0Y%2Fyo%2FI%3D align="left")

Now you are going to create an internal group named `engineers`. Its member is `bob-smith` entity that you created earlier.

1. Navigate back to the Vault UI and click on the **Policies** tab.
    
2. Click **Create ACL Policy**.
    
3. For the name, use `team-eng`.
    
4. In the **Policy** box, add the following policy:
    

```apache
path "secret/data/team/eng" {
  capabilities = [ "create", "read", "update", "delete"]
}
```

5. Click **Create policy**.
    
6. Click the **Access** tab, then select **Groups** from the left hand side.
    
7. Click **Create group**.
    
8. For the name, use: `engineers`.
    
9. For **Policies**, choose `team-eng`.
    
10. For **Member Entity IDs**, select `bob-smith`.
    
11. Click **Create**.
    

Now verify that the user has inherited the policy.

12. Navigate back to Cloud Shell and run the following command to log in as `bob`:
    

```apache
vault login -method=userpass -path=userpass-test username=bob password=training
```

You should see similar output:

```apache
Key                    Value
---                    -----
token                  s.6Z13hPfLY6FxHxIypRprwHxS
token_accessor         25onRmi8TrSVbjYix6zdvpae
token_duration         768h
token_renewable        true
token_policies         ["default" "test"]
identity_policies      ["base" "team-eng"]
policies               ["base" "default" "team-eng" "test"]
token_meta_username    bob
```

13. Notice the following lines:
    

```apache
identity_policies      ["base" "team-eng"]
policies               ["base" "default" "team-eng" "test"]
```

Here you see that within the policies, there are now four policies attached: `base`, `default`, `test`, and `team-eng`. Within the `identity_policies`, you can also see that `team-eng` is now associated with the user. You can optionally log in with the `bsmith` user and verify this is the case as well.

By default, the groups created in identity store are called the internal groups. The membership management of these groups should be carried out manually. A group can also be created as an external group. In this case, the entity membership in the group is managed semi-automatically. An external group serves as a mapping to a group that is outside of the identity store. For more information on external groups, you can check out the following [tutorial](https://learn.hashicorp.com/tutorials/vault/identity?in=vault/auth-methods#step-4-create-an-external-group).

---

## Solution of Lab

%[https://www.youtube.com/watch?v=3ty7prpsnMk&ab_channel=Techcps] 

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Authentication%2C%20Authorization%2C%20and%20Identity%20with%20Vault/techcps1005.sh
sudo chmod +x techcps1005.sh
./techcps1005.sh
```