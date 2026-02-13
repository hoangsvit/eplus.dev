---
title: "Interacting with Vault Policies - GSP1004"
seoTitle: "Interacting with Vault Policies - GSP1004"
seoDescription: "Explore Vault policies and learn to write, manage, and test them to control client access and implement Role-Based Access Control (RBAC)"
datePublished: Sun Aug 17 2025 08:44:28 GMT+0000 (Coordinated Universal Time)
cuid: cmeffwkar000302ld59t3efa3
slug: interacting-with-vault-policies-gsp1004
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755420217642/aefe22df-9760-46f8-86a0-9b1e0d2f1aaa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755420249341/e39fa1b9-d40f-4f33-b8f4-4b094b3af20b.png
tags: vault, interacting-with-vault-policies-gsp1004, interacting-with-vault-policies, gsp1004, vault-policies

---

## Overview

Vault uses policies to govern the behavior of clients and instrument Role-Based Access Control (RBAC) by specifying access privileges (*authorization*). Policies provide a declarative way to grant or forbid access to certain paths and operations. In this hands-on lab you'll learn how to write and use Vault policies.

### Objectives

In this lab, you will:

* Create Vault policies
    
* Manage Vault policies
    
* Associate Vault policies
    
* Verify and test Vault policies
    

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
    student-03-997fcd6e75dd@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    c4kiQs468y8N
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-5c1b11a47496`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-5c1b11a47496
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
ACCOUNT: student-03-997fcd6e75dd@qwiklabs.net

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
project = qwiklabs-gcp-03-5c1b11a47496
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Install Vault

1. In Cloud Shell, add the HashiCorp GPG key:
    

```apache
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
```

Copied!

**Note**: Ignore the warning if any.

2. Add the official HashiCorp Linux repository:
    

```apache
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
```

Copied!

3. Update and install Vault:
    

```apache
sudo apt-get update
sudo apt-get install vault
```

Copied!

### Verify the installation

After installing Vault, verify the installation worked by checking that the Vault binary is available.

* Execute the `vault` command to verify the installation:
    

```apache
vault
```

Copied!

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

## Task 2. Start the Vault server

With Vault installed, the next step is to start a Vault server.

Vault operates as a client/server application. The Vault server is the only piece of the Vault architecture that interacts with the data storage and backends. All operations done via the Vault CLI interact with the server over a TLS connection.

In this lab, you will start and interact with the Vault server running in [development mode](https://www.vaultproject.io/docs/concepts/dev-server).

This dev-mode server requires no further setup, and your local vault CLI will be authenticated to talk to it. This makes it easy to experiment with Vault or start a Vault instance for development. Every feature of Vault is available in "dev" mode. The `-dev` flag just short-circuits a lot of setup to insecure defaults.

**Warning:** Never run a "dev" mode server in production. It is insecure and will lose data on every restart (since it stores data in-memory). It is only made for development or experimentation.

### Starting the dev server

First, start a Vault *dev server*. The dev server is a built-in, pre-configured server that is not very secure but useful for playing with Vault locally.

1. To start the Vault dev server, run:
    

```apache
vault server -dev
```

Copied!

You should see output relating to your Vault server configuration. Notice that **Unseal Key** and **Root Token** values are displayed:

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
```

**Note:** The dev server stores all its data in-memory (but still encrypted), listens on `localhost` without TLS, and automatically unseals and shows you the unseal key and root access key.

**Note: Insecure** operation

Do not run a Vault dev server in production! This approach is only used here to simplify the unsealing process for this demonstration.

Now that you have the Vault development server running, you can continue setting up access to it.

2. Open a new Cloud Shell tab.
    
3. Copy and run the export `VAULT_ADDR ..`. command from the **terminal output**. This will configure the Vault client to talk to the dev server:
    

```apache
export VAULT_ADDR='http://127.0.0.1:8200'
```

Copied!

The Vault CLI determines which Vault servers to send requests using the `VAULT_ADDR` environment variable.

### Verify the server is running

* Verify the server is running by running the `vault status` command:
    

```apache
vault status
```

Copied!

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
Version         1.13.2
Build Date      2023-04-25T13:02:50z
Storage Type    inmem
Cluster Name    vault-cluster-e2392b81
Cluster ID      48d7aba0-5416-a36b-2c27-0b256b222f57
HA Enabled      false
```

Great! You've started your first Vault development server. You can now continue on to the next section, where you will learn how to write Vault policies.

## Task 3. Vault policies

Vault creates a [root](https://www.vaultproject.io/docs/concepts/policies.html#root-policy) policy during initialization. The *root* policy is capable of performing every operation for all paths. This policy is assigned to the *root* token that displays when initialization completes. This provides an initial superuser to enable secrets engines, define policies, and configure authentication methods.

Vault also creates a [default](https://www.vaultproject.io/docs/concepts/policies.html#default-policy) policy. The default policy defines a common set of capabilities that enable a token the ability to reflect and manage itself. This policy is also assigned to the *root* token, and is attached to all tokens by default.

### Policy syntax

Policies are written in [HCL](https://github.com/hashicorp/hcl) or JSON and describe which *paths* in Vault a user or machine is allowed to access. A policy defines a list of paths. Each path expresses the capabilities that are allowed. Capabilities for a path must be granted, as Vault defaults to denying capabilities to paths to ensure that it is **secure by default**.

The basic format of a policy is as follows:

```apache
path "<path>" {
    capabilities = ["list of capabilities"]
}
```

Here is a very simple policy which grants read capabilities to the path `"secret/foo"`:

```apache
path "secret/foo" {
  capabilities = ["read"]
}
```

When this policy is assigned to a token, the token can read from `"secret/foo"`. However, the token cannot update or delete `"secret/foo"`, since the capabilities do not allow it. Because policies are **deny by default**, the token would have no other access in Vault. This means that **an empty Vault policy grants no permission in the system**.

### Capabilities

A policy defines one or more paths and a list of permitted [capabilities](https://www.vaultproject.io/docs/concepts/policies.html#capabilities). Each path must define one or more capabilities which provide fine-grained control over permitted (or denied) operations. As you'll see in the examples below, capabilities are always specified as a list of strings, even if there is only one capability. Most of these capabilities map to the HTTP verbs supported by the Vault API. The list of capabilities are:

| **Policy Capability** | **Associated HTTP Verbs** |
| --- | --- |
| create | POST/PUT |
| read | GET |
| update | POST/PUT |
| delete | DELETE |
| list | LIST |
| patch | PATCH |
| sudo | \- |
| deny | \- |

The **sudo** capability allows access to paths that are root-protected (refer to the [Root protected endpoints](https://learn.hashicorp.com/tutorials/vault/policies#root-protected-api-endpoints) tutorial section). The **deny** capability disables access to the path. When combined with other capabilities it always takes precedence.

### Policy examples

A more detailed policy to grant all access on `"secret/*`" could be defined as follows:

```apache
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
```

If you want to define further restrictions, this could be accomplished by adding the following `deny` capability:

```apache
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

path "secret/super-secret" {
  capabilities = ["deny"]
}
```

Even though you allowed `secret/*`, this additional line above **explicitly denies** `secret/super-secret`. This takes denial precedence.

Policies can also specify *allowed*, *disallowed*, and *required* parameters. Here the key `"secret/restricted"` can only contain "`foo`" (any value) and "`bar`" (one of "`zip`" or "`zap`").

```apache
path "secret/restricted" {
  capabilities = ["create"]
  allowed_parameters = {
    "foo" = []
    "bar" = ["zip", "zap"]
  }
}
```

Policies use *path-based* matching to test the set of capabilities against a request. A policy `path` may specify an exact path to match, or it could specify a glob pattern which instructs Vault to use a prefix match.

For example, this policy permits reading only `"secret/foo"` or `"secret/foo/bar"`.

```apache
path "secret/foo" {
  capabilities = ["read"]
}
```

Moreover, this policy permits reading everything under `"secret/bar"`. An attached token could read `"secret/bar/zip"`, `"secret/bar/zip/zap"`, but not `"secret/bars/zip"`.

```apache
path "secret/bar/*" {
  capabilities = ["read"]
}
```

In addition, this policy would permit reading everything prefixed with `"zip-"`. An attached token could read `"secret/zip-zap"` or `"secret/zip-zap/zong"`, but not `"secret/zip/zap`.

```apache
path "secret/zip-*" {
  capabilities = ["read"]
}
```

Lastly, a **+** can be used to denote any number of characters bounded within a single path segment. The following would permit reading the `"teamb"` path under any top-level path under `secret/`.

```apache
path "secret/+/teamb" {
  capabilities = ["read"]
}
```

And this one would permit reading `secret/foo/bar/teamb`, `secret/bar/foo/teamb`, etc.

```apache
path "secret/+/+/teamb" {
  capabilities = ["read"]
}
```

As you can see, Vault's architecture is similar to a filesystem. Every action in Vault has a corresponding path and capability - even Vault's internal core configuration endpoints live under the `"sys/"` path. Policies define access to these paths and capabilities, which controls a token's access to credentials in Vault.

### Templated policies

The policy syntax allows for doing variable replacement in some policy strings with values available to the token. Currently `identity` information can be injected, and currently the `path` keys in policies allow injection. For now, you don't need to worry about entities or aliases—this is simply included for reference later.

#### Parameters

| **Name** | **Description** |
| --- | --- |
| `identity.entity.id` | The entity's ID |
| `identity.entity.name` | The entity's name |
| `identity.entity.metadata.<metadata key>` | Metadata associated with the entity for the given key |
| `identity.entity.aliases.<mount accessor>.id` | Entity alias ID for the given mount |
| `identity.entity.aliases.<mount accessor>.name` | Entity alias name for the given mount |
| `identity.entity.aliases.<mount accessor>.metadata.<metadata key>` | Metadata associated with the alias for the given mount and metadata key |
| `identity.entity.aliases.<mount accessor>.custom_metadata.<custom_metadata key>` | Custom metadata associated with the alias for the given mount and custom metadata key |
| `identity.groups.ids.<group id>.name` | The group name for the given group ID |
| `identity.groups.names.<group name>.id` | The group ID for the given group name |
| `identity.groups.ids.<group id>.metadata.<metadata key>` | Metadata associated with the group for the given key |
| `identity.groups.names.<group name>.metadata.<metadata key>` | Metadata associated with the group for the given key |

#### Examples

The following policy creates a section of the KVv2 Secret Engine to a specific user:

```apache
path "secret/data/{{identity.entity.id}}/*" {
  capabilities = ["create", "update", "read", "delete"]
}

path "secret/metadata/{{identity.entity.id}}/*" {
  capabilities = ["list"]
}
```

For more information on templated policies, you can check out the [Templated Policies documentation](https://www.vaultproject.io/docs/concepts/policies#templated-policies).

**Note:** When developing templated policies, use IDs wherever possible. Each ID is unique to the user, whereas names can change over time and can be reused. This ensures that if a given user or group name is changed, the policy will be mapped to the intended entity or group.

### Verify built-in policy capabilities

Now that you've seen how policies are written, let's quickly check out the capabilities of the **root** and **default** policies.

1. In your open Cloud Shell tab, execute the following command to log in to Vault with your **root token**:
    

```apache
vault login token=<your root token>
```

Copied!

You should see the following output:

```apache
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again. Future Vault requests will automatically use this token.

Key                  Value
---                  -----
token                s.mCWmZyVNi6ZDU7HSq7vQXwvj
token_accessor       nFDgTnm7FYCHNLSERwiVsbWf
token_duration       ∞
token_renewable      false
token_policies       ["root"]
identity_policies    []
policies             ["root"]
```

**Note:** Notice that the policy attached is the **root** policy.

2. Since the root policy allows you to do anything in Vault, run a basic command to verify that this is the case:
    

```apache
vault secrets list
```

Copied!

Your output should resemble the following:

```apache
Path          Type         Accessor              Description
----          ----         --------              -----------
cubbyhole/    cubbyhole    cubbyhole_f0f2e28e    per-token private secret storage
identity/     identity     identity_a554d41f     identity store
secret/       kv           kv_ca28f047           key/value secret storage
sys/          system       system_1a7dcf93       system endpoints..
```

Now you'll try to run the same command as a user with only the `default` policy attached.

3. Start by enabling the `userpass` auth method and creating a new user:
    

```apache
vault auth enable userpass
vault write auth/userpass/users/example-user password=password!
```

Copied!

4. Next, log in to Vault with the new user you created:
    

```apache
vault login -method=userpass username=example-user password=password!
```

Copied!

You should receive the following:

```apache
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again. Future Vault requests will automatically use this token.

Key                    Value
---                    -----
token                  s.Ov9GkScxp5AYDjzmbdHNN4r0
token_accessor         UewGCCotUMjccmD1EjssgHqf
token_duration         768h
token_renewable        true
token_policies         ["default"]
identity_policies      []
policies               ["default"]
token_meta_username    example-user
```

**Note:** Notice that the policy attached is the **default** policy.

5. Run the same command from earlier to check the policy capabilities:
    

```apache
vault secrets list
```

Copied!

You should receive the following error:

```apache
Error listing secrets engines: Error making API request.

URL: GET http://127.0.0.1:8200/v1/sys/mounts
Code: 403. Errors:

* 1 error occurred:
        * permission denied
```

As you can see here, Vault is making a **GET** API request to the path `sys/mounts`. Since you're receiving a permission denied error, you can't access the path and list the secrets engines. Now it's time to write your first policy to get access to this path and list the secrets engines!

## Task 4. Create a policy

Since Vault centrally secures, stores, and controls access to secrets across distributed infrastructure and applications, it is critical to control permissions before any user or machine can gain access.

The solution to this is to restrict the use of root policy, and write fine-grained policies to practice **least privileged**. For example, if an app gets Google Cloud credentials from Vault, write policy grants to read from Google Cloud secrets engine but not to delete, etc.

Policies are attached to tokens and roles to enforce client permissions on Vault. Now that you've seen how policies are defined syntactically, it's time to write your first Vault policy.

### Log in to the Vault web UI

1. First, click on the **web preview icon** on the toolbar of Cloud Shell.
    

![Web preview icon](https://cdn.qwiklabs.com/OLFGboKgKleMinJjp0qj8J713XImthsD7PvdxjmW9Uw%3D align="left")

2. Click **Change port**.
    
3. Change the Port Number to `8200` and click **Change and Preview**.
    

![Change Preview Port dialog box, which includes the Change and Preview button.](https://cdn.qwiklabs.com/9wLXL7KtGaMJ6KQ8VD24cIyD81m%2ByaxzfR3VDR0%2BztQ%3D align="left")

4. You should be redirected to the Vault sign in page.
    

![Sign in to Vault page.](https://cdn.qwiklabs.com/rZ9T%2BPXR2kK6uCui7Q2gyPyPCiBQUKx%2F8VeSeZQNlz8%3D align="left")

5. Enter your **Root Token** that you saved earlier in the lab and click **Sign In**.
    

Your Vault development server should resemble the following.

![Secret Engines page, which includes the cubbyhole/ and secret/ listed, along with an Enable new engine button.](https://cdn.qwiklabs.com/vd7uLxroNDIbAhUWhhD%2FyYZLwMNVeH2bgTinKwXWBYU%3D align="left")

Now that you're logged in to the development server web UI, you can continue on to the next section.

### Create a new policy

1. Click **Policies** from the home page. You should see the `default` and `root` ACL policies.
    

![ACL Policies page, which lists the two ACL policies.](https://cdn.qwiklabs.com/UB2pEN7RCkcrQmmc2O%2BBDTqhNKwRCo%2F2LB%2FSUp%2BZsf8%3D align="left")

2. Click **Create ACL policy**.
    
3. Start by naming your policy `demo-policy`.
    

You can now start writing your policy. Recall in the previous section, you were unable to access the `sys/mounts` path to read the secrets engines. You'll go ahead and add that now.

4. In the **Policy** box, add the following placeholder code:
    

```apache
path "path" {
    capabilities = [""]
}
```

Copied!

5. Now, let's first update the `path` to the `sys/mounts` path you were trying to access earlier:
    

```apache
path "sys/mounts" {
    capabilities = [""]
}
```

Copied!

6. Next, you'll add a capability. Since Vault is attempting to make a **GET** API call on this path, you'll need to have the `read` capability. Add `read` to the capabilities list:
    

```apache
path "sys/mounts" {
    capabilities = ["read"]
}
```

Copied!

Your policy should resemble the following:

![The code entered on the Policy page.](https://cdn.qwiklabs.com/At6DqoiM3PQcOSZgwIMaiDE55%2BYQvSd3d05g9Wbsilo%3D align="left")

7. Click **Create policy**.
    

Now, you'll need to associate this policy with the `example-user` you created earlier.

8. Click **Back to main navigation**.
    
9. Click the **Access** from the left pane and then click on the `userpass` authentication method.
    

![Authentication Methods page.](https://cdn.qwiklabs.com/zFX0bcftcIuYQkmf%2Bi229iPyMNDdWCZ9ekgeadcuges%3D align="left")

10. Click on the three dots next to the `example-user` user and select **Edit user**.
    

![Userpass' Users tabbed page, with the expanded More menu](https://cdn.qwiklabs.com/rE%2FnUsJSPa531fxquPRYWcSBKmfOZHwAAcfew6pzLcQ%3D align="left")

11. Under the password field, click **Tokens** to open up the submenu.
    
12. Under **Generated Token's Policies**, add the policy you just created (`demo-policy`) and click **Add**.
    

![Add button](https://cdn.qwiklabs.com/x7hpqSC5wup0CmPDe0P8s7Au0TAzX9hYa%2Faxr2znFds%3D align="left")

13. Click **Save**.
    

Great! You've created a new policy and associated it with the `example-user`.

14. Navigate back to Cloud Shell and run the following command again:
    

```apache
vault secrets list
```

Copied!

You'll notice the same error as before:

```apache
Error listing secrets engines: Error making API request.

URL: GET http://127.0.0.1:8200/v1/sys/mounts
Code: 403. Errors:

* 1 error occurred:
        * permission denied
```

Why did it error after you've added the policy to the user? This is because once you associate a new policy with a *user*, that policy won't be associated with the existing *token* for that user. To fix this, you'll need to **generate a new token for that user so that new policy can be attached to that token**.

15. Run the following command to log in and generate a new token for `example-user`:
    

```apache
vault login -method=userpass username=example-user password=password!
```

Copied!

**Note:** You should receive a new token on output. Notice that you now have the `default` policy **and** `demo-policy` attached.

```apache
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again. Future Vault requests will automatically use this token.

Key                    Value
---                    -----
token                  s.7AVelOPORi1zhjH5iLototw7
token_accessor         H1ee2gTXzTXUU9ptpU3ailnJ
token_duration         768h
token_renewable        true
token_policies         ["default" "demo-policy"]
identity_policies      []
policies               ["default" "demo-policy"]
token_meta_username    example-user
```

16. Now, try listing the secrets engines one more time:
    

```apache
vault secrets list
```

Copied!

Your output should now resemble the following:

```apache
Path          Type         Accessor              Description
----          ----         --------              -----------
cubbyhole/    cubbyhole    cubbyhole_76cb59ae    per-token private secret storage
identity/     identity     identity_7fa27e52     identity store
secret/       kv           kv_f6e83366           key/value secret storage
sys/          system       system_414d50aa       system endpoints..
```

17. You can also check the capabilities of the token by using the `vault token capabilities` command. Run the following to verify your policy on the `sys/mounts` path:
    

```apache
vault token capabilities <your token> sys/mounts
```

Copied!

You should get the following output:

```apache
read
```

18. Next, check the token capabilities for the `sys/policies/acl` path:
    

```apache
vault token capabilities <your token> sys/policies/acl
```

Copied!

You should get the following output:

```apache
deny
```

19. To verify this, try to run the following command to list the policies:
    

```apache
vault policy list
```

Copied!

You should receive the following error:

```apache
Error listing policies: Error making API request.

URL: GET http://127.0.0.1:8200/v1/sys/policies/acl?list=trueCode: 403. Errors:

* 1 error occurred:
        * permission denied
```

As you can see here, you're getting a permission denied error for a **GET** API request on the `sys/policies/acl` path. Also notice the additional `list=true` on the path; you will need to add this capability as well. Let's fix this by updating the existing policy.

20. Navigate back to the `demo-policy` you created in the Vault UI.
    

![demo-policy page](https://cdn.qwiklabs.com/12pSJV9KDNQ5v6uGa8ashPqoxk62sBkUU7dTUIimo8A%3D align="left")

21. Click **Edit policy**.
    
22. In the **Policy** box, add the following placeholder code under the existing policy you wrote:
    

```apache
path "path" {
    capabilities = [""]
}
```

Copied!

23. Again, let's first update the `path` to the `sys/policies/acl` path you were trying to access:
    

```apache
path "sys/policies/acl" {
    capabilities = [""]
}
```

Copied!

24. Now you'll add the capability. Since Vault is attempting to make a **GET** API call on this path, you'll need to add the `read` capability again. Additionally, the attempt passed in the `list=true` to the URL, so you'll need to add this capability as well.
    

```apache
path "sys/policies/acl" {
    capabilities = ["read", "list"]
}
```

Copied!

Your updated policy should now resemble the following:

![The updated Policy code.](https://cdn.qwiklabs.com/DHrQGCe6hOBrgfB%2BhEVbf8Ovularejq5RIP%2FbZDGjmM%3D align="left")

25. Click **Save**.
    
26. Navigate back to Cloud Shell and run the following command again:
    

```apache
vault policy list
```

Copied!

Your output should now resemble:

```apache
default
demo-policy
root
```

27. Run the following command to copy the values of the policies to a text file:
    

```apache
vault policy list > policies.txt
```

Copied!

28. Lastly, check the token capabilities again for the `sys/policies/acl` path:
    

```apache
vault token capabilities <your token> sys/policies/acl
```

Copied!

You should get the following output:

```apache
list, read
```

29. Run the following command to copy the values of the policies to a text file. Make sure to replace `<your token>` with the value of your token:
    

```apache
vault token capabilities <your token> sys/policies/acl > token_capabilities.txt
```

Copied!

30. Run the following commands to copy both the `policies` and `token_capabilities` text files to a pre-created Cloud Storage bucket to track your progress:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp *.txt gs://$PROJECT_ID
```

Copied!

As you can see, when you *modified* the existing policy associated with the user, the changes were reflected without generating a new token. This is because the contents of policies are parsed in real-time whenever the token is used. As a result, if a policy is modified, the modified rules will be enforced the next time a token, with that policy attached, is used to make a call to Vault.

Great! You successfully created a policy that granted read access to the `sys/mounts` path and associated it with a user. You then added an additional policy to grant read and list access to the `sys/policies` path.

Click *Check my progress* to verify the objective.

Create policies

## Task 5. Managing policies

Policies are authored (written) in your editor of choice. They can be authored in HCL or JSON, and the syntax is described in detail above. Once saved, policies must be uploaded to Vault before they can be used.

In the previous section, you used the UI to write and manage a a policy. This section will cover the CLI commands to manage policies.

* First, make sure to run the following in Cloud Shell to log in to Vault with your root token:
    

```apache
vault login <your root token>
```

Copied!

### Listing policies

* Run the following command to list all registered policies in Vault:
    

```apache
vault read sys/policy
```

Copied!

You should see the following output:

```apache
Key         Value
---         -----
keys        [default demo-policy root]
policies    [default demo-policy root
```

### Creating policies

Policies can be created (uploaded) via the CLI, UI, or via the API. In the previous section, you simply used the UI to create the HCL file.

To create a new policy in Vault, you would use the following command:

```apache
vault policy write policy-name policy-file.hcl
```

1. You can test this out by first creating a basic policy file with the following command:
    

```apache
tee example-policy.hcl <<EOF
# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
EOF
```

Copied!

2. Check that your file was created correctly:
    

```apache
cat example-policy.hcl
```

Copied!

3. Now, create a new policy named `example-policy` with the `vault policy write` command:
    

```apache
vault policy write example-policy example-policy.hcl
```

Copied!

If it was successful, you should see the following output:

```apache
Success! Uploaded policy: example-policy
```

In this example, the name of the policy is "example-policy". You can think of this name as a pointer or symlink to the policy ACLs. Tokens are attached policies by name, which are then mapped to the set of rules corresponding to that name.

### Updating policies

Existing policies may be updated to change permissions via the CLI or via the API. To update an existing policy in Vault, you will follow the same steps as creating a policy, but use an existing policy name.

1. First, run the following command to update and overwrite your existing policy file to be able to list auth methods:
    

```apache
tee example-policy.hcl <<EOF
# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}

# List auth methods
path "sys/auth"
{
  capabilities = ["read"]
}
EOF
```

Copied!

2. Check that your file was created correctly:
    

```apache
cat example-policy.hcl
```

Copied!

3. Update your policy:
    

```apache
vault write sys/policy/example-policy policy=@example-policy.hcl
```

Copied!

Great! You've successfully updated a policy using the CLI.

4. Run the following command to copy the policy file to a pre-created Cloud Storage bucket to track your progress:
    

```apache
gsutil cp example-policy.hcl gs://$PROJECT_ID
```

Copied!

Click *Check my progress* to verify the objective.

Create and manage policies using CLI commands

### Deleting policies

Existing policies may be deleted via the CLI, UI, or API. To delete a policy, you would run the following:

```apache
vault delete sys/policy/policy-name
```

1. Let's try this in practice. Run the following command to delete the policy you just created:
    

```apache
vault delete sys/policy/example-policy
```

Copied!

If it was successful, you should have seen the following output:

```apache
Success! Data deleted (if it existed) at: sys/policy/example-policy
```

2. List your policies with the following command:
    

```apache
vault policy list
```

Copied!

You should see the following output:

```apache
default
demo-policy
root
```

Great! You've successfully deleted the `example-policy`.

**Note:** This is an idempotent operation. Vault will not return an error when deleting a policy that does not exist.

## Task 6. Associating policies

Vault can automatically associate a set of policies to a token based on an authorization. This configuration varies significantly between authentication backends. For simplicity, this example will use Vault's built-in userpass auth method.

1. Run the following command to create the user `firstname-lastname` in Vault with a list of associated policies:
    

```apache
vault write auth/userpass/users/firstname-lastname \
    password="s3cr3t!" \
    policies="default, demo-policy"
```

Copied!

```apache
Success! Data written to: auth/userpass/users/firstname-lastname
```

This creates an authentication mapping to the policy such that, when the user authenticates successfully to Vault, they will be given a token which has the list of policies attached.

2. Authenticate with Vault by running the following:
    

```apache
vault login -method="userpass" username="firstname-lastname" password="s3cr3t!"
```

Copied!

You should see the following output:

```apache
Key                    Value
---                    -----
token                  s.XnRsinhsokVUiN7XbsnyCOEC
token_accessor         JFErk5Rgb7vtW47CJjY2OCsF
token_duration         768h
token_renewable        true
token_policies         ["default" "demo-policy"]
identity_policies      []
policies               ["default" "demo-policy"]
token_meta_username    firstname-lastname
```

Since the provided information is correct, Vault will generate a token, assign the list of configured policies to the token, and return that token to the authenticated user.

### Tokens

Tokens have two sets of policies: identity policies, which are computed based on the entity and its groups, and token policies, which are either defined based on the login method or, in the case of explicit token creates via the API, are an input to the token creation. What follows concerns token policies exclusively: a token's identity policies cannot be controlled except by modifying the underlying entities, groups, and group memberships.

1. First, log back in to Vault with your root token:
    

```apache
vault login <your root token>
```

Copied!

2. Tokens are associated with their policies at creation time. Run the following to create a token with the `dev-readonly` and `logs` policies:
    

```apache
vault token create -policy=dev-readonly -policy=logs
```

Copied!

You should see the following output:

```apache
Key                  Value
---                  -----
token                s.gKRV6vzFmpdJ9iwvPfzNjAuI
token_accessor       S4jfdYvy8jQP7GGDa947CBlT
token_duration       768h
token_renewable      true
token_policies       ["default" "dev-readonly" "logs"]
identity_policies    []
policies             ["default" "dev-readonly" "logs"]
```

**Note:** You can ignore the warnings that the policies don't exist, since you haven't created them.

Normally the only policies that may be specified are those which are present in the current token's (i.e. the new token's parent's) token policies. However, root users can assign any policies.

**There is no way to modify the policies associated with a token once the token has been issued**. The token must be revoked and a new one acquired to receive a new set of policies.

However, the *contents* of policies are parsed in real-time whenever the token is used. As a result, if a policy is modified, the modified rules will be enforced the next time a token, with that policy attached, is used to make a call to Vault.

## Task 7. Policies for secrets

In this section, you'll create Vault policies to grant users different levels of access within Vault and test them.

* In Cloud Shell, start by creating a few different users with different policies:
    

```apache
vault write auth/userpass/users/admin \
    password="admin123" \
    policies="admin"
```

Copied!

```apache
vault write auth/userpass/users/app-dev \
    password="appdev123" \
    policies="appdev"
```

Copied!

```apache
vault write auth/userpass/users/security \
    password="security123" \
    policies="security"
```

Copied!

Now that you've created some new users, you'll create the policies that you've already associated with them. You'll first start with the **admin** policy, which should be able to have full access to all the secrets in Vault.

### Create the admin policy

For the purposes of this lab, an **admin** user must be able to:

* Read system health check
    
* Create and manage ACL policies broadly across Vault
    
* Enable and manage authentication methods broadly across Vault
    
* Manage the Key-Value secrets engine enabled at `secret/` path
    

1. Navigate to **Policies** from the left pane in the Vault UI. You should see the `default`, `demo-policy`, and `root` policies.
    
2. Click **Create ACL policy**.
    
3. Start by naming your policy `admin`.
    
4. In the **Policy** box, add the following policy code:
    

```apache
# Read system health check
path "sys/health"
{
  capabilities = ["read", "sudo"]
}

# Create and manage ACL policies broadly across Vault

# List existing policies
path "sys/policies/acl"
{
  capabilities = ["list"]
}

# Create and manage ACL policies
path "sys/policies/acl/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Enable and manage authentication methods broadly across Vault

# Manage auth methods broadly across Vault
path "auth/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Create, update, and delete auth methods
path "sys/auth/*"
{
  capabilities = ["create", "update", "delete", "sudo"]
}

# List auth methods
path "sys/auth"
{
  capabilities = ["read"]
}

# Enable and manage the key/value secrets engine at `secret/` path

# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
```

Copied!

Your policy should resemble the following:

![Updated Policy page.](https://cdn.qwiklabs.com/6A3E8mZzpX%2BHgFn65TbDItWARDOWUpc6NIkXOxvsGeQ%3D align="left")

5. Click **Create policy**.
    

### Create the appdev policy

For the purposes of this lab, an **appdev** user must be able to:

* Create, read, and update secrets engines
    
* Manage the Key-Value secrets engine enabled at `secret/appdev/` path
    

1. Navigate back to the **ACL Policies** page.
    
2. Click **Create ACL policy**.
    
3. Start by naming your policy `appdev`.
    
4. In the **Policy** box, add the following policy code:
    

```apache
# List, create, update, and delete key/value secrets
path "secret/+/appdev/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Create, read, and update secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
```

Copied!

5. Click **Create policy**.
    

### Create the security policy

For the purposes of this lab, a **security** user must be able to:

* Create and manage ACL policies broadly across Vault
    
* Manage secrets engines
    
* Manage the Key-Value secrets engine enabled at `secret/` path
    
* Not have access to read or list secrets on the `secret/admin` path
    

1. Navigate back to the **ACL Policies** page.
    
2. Click **Create ACL policy**.
    
3. Start by naming your policy `security`.
    
4. In the **Policy** box, add the following policy code:
    

```apache
# List existing policies
path "sys/policies/acl"
{
  capabilities = ["list"]
}

# Create and manage ACL policies
path "sys/policies/acl/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}

# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Deny access to secret/admin
path "secret/data/admin" {
    capabilities = ["deny"]
}
path "secret/data/admin/*" {
    capabilities = ["deny"]
}

# Deny list access to secret/admin
path "secret/metadata/admin" {
    capabilities = ["deny"]
}
path "secret/metadata/admin/*" {
    capabilities = ["deny"]
}
```

Copied!

5. Click **Create policy**.
    

### Create secrets

Now that you've created the different policies, it's time to create some secrets.

1. Navigate back to Cloud Shell and run the following commands to create some secrets in the `secret/security` path:
    

```apache
vault kv put secret/security/first username=password
vault kv put secret/security/second username=password
```

Copied!

2. Create some secrets in the `secret/appdev` path:
    

```apache
vault kv put secret/appdev/first username=password
vault kv put secret/appdev/beta-app/second username=password
```

Copied!

3. Create some secrets in the `secret/admin` path:
    

```apache
vault kv put secret/admin/first admin=password
vault kv put secret/admin/supersecret/second admin=password
```

Copied!

### Verify security for appdev

Now that you've created some secrets, let's verify that these policies are being enforced. You'll first log in as the `app-dev` user and see what you have access to.

1. Run the following command to log in as `app-dev` user:
    

```apache
vault login -method="userpass" username="app-dev" password="appdev123"
```

Copied!

2. Now, try to fetch the `appdev/first` secret:
    

```apache
vault kv get secret/appdev/first
```

Copied!

You should see the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:13.18635501Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

3. Fetch the secret located at `secret/appdev/beta-app/second`:
    

```apache
vault kv get secret/appdev/beta-app/second
```

Copied!

You should see the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:13.829274247Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

4. Create a new secret:
    

```apache
vault kv put secret/appdev/appcreds credentials=creds123
```

Copied!

5. Destroy the secret:
    

```apache
vault kv destroy -versions=1 secret/appdev/appcreds
```

Copied!

6. Attempt to get a secret from `secret/security`:
    

```apache
vault kv get secret/security/first
```

Copied!

You should receive the following error:

```apache
Error reading secret/data/security/first: Error making API request.

URL: GET http://127.0.0.1:8200/v1/secret/data/security/first
Code: 403. Errors:

* 1 error occurred:
        * permission denied
```

7. Attempt to list all the secrets at `secret/`:
    

```apache
vault kv list secret/
```

Copied!

You should again receive an error:

```apache
Error listing secret/metadata: Error making API request.

URL: GET http://127.0.0.1:8200/v1/secret/metadata?list=true
Code: 403. Errors:

* 1 error occurred:
        * permission denied
```

Great! You were able to fetch and create secrets in the `secret/appdev` path, and verified that you were not able to access secrets outside of it.

### Verify policy for security

1. Run the following command to log in as `security` user:
    

```apache
vault login -method="userpass" username="security" password="security123"
```

Copied!

2. Now, try to fetch the `security/first` secret:
    

```apache
vault kv get secret/security/first
```

Copied!

You should see the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:04.299036073Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

3. Fetch the secret located at `secret/security/second`:
    

```apache
vault kv get secret/security/second
```

Copied!

You should see the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:13.829274247Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

4. Create a new secret in `secret/security/supersecure`:
    

```apache
vault kv put secret/security/supersecure/bigsecret secret=idk
```

Copied!

5. Destroy the secret:
    

```apache
vault kv destroy -versions=1 secret/security/supersecure/bigsecret
```

Copied!

6. Attempt to read a secret from `secret/appdev`:
    

```apache
vault kv get secret/appdev/first
```

Copied!

You should receive the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:13.18635501Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

7. Attempt to list all of the secrets at `secret/`:
    

```apache
vault kv list secret/
```

Copied!

You should receive the following output:

```apache
Keys
----
admin/
appdev/
security/
```

8. Enable a new secrets engine:
    

```apache
vault secrets enable -path=supersecret kv
```

Copied!

```apache
Success! Enabled the kv secrets engine at: supersecret/
```

9. Attempt to look at the `secret/admin/first` secret:
    

```apache
vault kv get secret/admin/first
```

Copied!

You should receive the following error:

```apache
Error reading secret/data/admin/first: Error making API request.

URL: GET http://127.0.0.1:8200/v1/secret/data/admin/first
Code: 403. Errors:

* 1 error occurred:
        * permission denied
```

10. Attempt to list the secrets at `secret/admin`:
    

```apache
vault kv list secret/admin
```

Copied!

Again, you should receive an error:

```apache
Error listing secret/metadata/admin: Error making API request.

URL: GET http://127.0.0.1:8200/v1/secret/metadata/admin?list=true
Code: 403. Errors:

* 1 error occurred:
        * permission denied
```

Great! You are able to fetch and create secrets in the `secret/` path, enable a secrets engine, and were denied access to the `secret/admin` path as specified in the policy.

### Verify policy for admin

1. Run the following command to log in as `admin` user:
    

```apache
vault login -method="userpass" username="admin" password="admin123"
```

Copied!

2. Now, try to fetch the `admin/first` secret:
    

```apache
vault kv get secret/admin/first
```

Copied!

You should see the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:18.521925218Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

==== Data ====
Key      Value
---      -----
admin    password
```

3. Fetch a secret located at `secret/security/first` :
    

```apache
vault kv get secret/security/first
```

Copied!

You should see the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:04.299036073Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

4. Create a new secret:
    

```apache
vault kv put secret/webserver/credentials web=awesome
```

Copied!

5. Destroy the secret:
    

```apache
vault kv destroy -versions=1 secret/webserver/credentials
```

Copied!

6. Attempt to get secrets from the `secret/appdev`:
    

```apache
vault kv get secret/appdev/first
```

Copied!

You should receive the following output:

```apache
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-12T18:58:13.18635501Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            1

====== Data ======
Key         Value
---         -----
username    password
```

7. Attempt to list all of the secrets at `secret/appdev`:
    

```apache
vault kv list secret/appdev/
```

Copied!

You should receive the following output:

```apache
Keys
----
appcreds
beta-app/
first
```

8. List all of the policies:
    

```apache
vault policy list
```

Copied!

You should receive the following output:

```apache
admin
appdev
default
demo-policy
security
root
```

9. Run the following command to copy the values of the policies to a text file and upload it to the Cloud Storage bucket:
    

```apache
vault policy list > policies-update.txt
gsutil cp policies-update.txt gs://$PROJECT_ID
```

Copied!

10. Enable the `gcp` auth method:
    

```apache
vault auth enable gcp
```

Copied!

11. Lastly, list the authentication methods enabled:
    

```apache
vault auth list
```

Copied!

```apache
Path         Type        Accessor                  Description
----         ----        --------                  -----------
gcp/         gcp         auth_gcp_faa3d15f         n/a
token/       token       auth_token_066c5ebd       token based credentials
userpass/    userpass    auth_userpass_929fe9bd    n/a
```

Great, you have verified that you have the admin priviledges associated with the policy you wrote.

Click *Check my progress* to verify the objective.

Policies for Secrets

### Paths

As you may have seen in the policy code that was provided for the `security` user, there were a couple topics introduced that you haven't seen before: `data/` and `metadata/`.

The `metadata/` path endpoint returns a list of key names at the specified location. Furthermore, the values themselves are not accessible with this command. Writing and reading versions are prefixed with `data/`. Listing, reading, and destroying are as follows:

* **Writing and Reading Versions** - `data/`
    
* **Listing Keys** - `metadata/`
    
* **Reading versions** - `metadata/`
    
* **Destroy Versions of Secret** - `destroy/`
    
* **Destroy all versions of metadata for a key** - `metadata/`
    

For example, if you are trying to deny access to a secret at `secret/example`, you would need to format it with the following `data/`:

```apache
path "secret/data/example" {
    capabilities = ["deny"]
}
```

If you want to deny list access to `secret/examples`, you would need format with the following `metadata/`:

```apache
path "secret/metadata/examples/*" {
    capabilities = ["deny"]
}
```

## Task 8. Fine-grained control

In addition to the standard set of capabilities, Vault offers finer-grained control over permissions at a given path. The capabilities associated with a path take precedence over permissions on parameters.

### Parameter constraints

In Vault, data is represented as `key=value` pairs. Vault policies can optionally further restrict paths based on the keys and data at those keys when evaluating the permissions for a path. The optional finer-grained control options are:

* `required_parameters` - A list of parameters that must be specified.
    
* `allowed_parameters` - A list of keys and values that are permitted on the given path.
    
* `denied_parameters` - Denylists a list of parameter and values. Any values specified here take precedence over `allowed_parameters`
    

For more information on fine-grained control, you can check out the [Fine-Grained Control documentation](https://www.vaultproject.io/docs/concepts/policies#fine-grained-control).

---

## Solution of Lab

### New Solution

%[https://www.youtube.com/watch?v=R75L99wb3Rs] 

**Task 1:**

```apache
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Interacting%20with%20Vault%20Policies/TechCode1.sh
sudo chmod +x TechCode1.sh
./TechCode1.sh
```

**Task 2:**

```apache
run() {
  echo -e "\n\033[1;36m▶ $*\033[0m"
  "$@"
  echo -e "\n\033[1;33mPress ENTER to continue...\033[0m"
  read
}

export VAULT_ADDR='http://127.0.0.1:8200'
run vault status
printf "\033[1;32mEnter Vault Token: \033[0m"
read -s ROOT_TOKEN
echo
run vault login token="$ROOT_TOKEN"
run vault secrets list
run vault auth enable userpass
run vault write auth/userpass/users/example-user password='password!'
run vault login -method=userpass username=example-user password='password!'
run vault secrets list
echo -e "\n\033[1;32mAll commands completed. Shell will stay open.\033[0m"
exec bash
```

**Task 3:**

```apache
path "sys/mounts" {
    capabilities = ["read"]
}
```

**Task 4:**

```apache
run() {
  echo -e "\n\033[1;36m▶ $*\033[0m"
  "$@"
  echo -e "\n\033[1;33mPress ENTER to continue...\033[0m"
  read
}

run vault secrets list
run vault login -method=userpass username=example-user password='password!'
run vault secrets list
printf "\033[1;32mEnter Vault Token: \033[0m"
read -s YOUR_TOKEN
echo
run vault token capabilities "$YOUR_TOKEN" sys/mounts
run vault token capabilities "$YOUR_TOKEN" sys/policies/acl
run vault policy list
```

**Task 5:**

```apache
path "sys/policies/acl" {
    capabilities = ["read", "list"]
}
```

**Task 6:**

```apache
run() {
  echo -e "\n\033[1;36m▶ $*\033[0m"
  "$@"
  echo -e "\n\033[1;33mPress ENTER to continue...\033[0m"
  read
}

run vault policy list
vault policy list > policies.txt
echo "policies.txt created"
run vault token capabilities "$YOUR_TOKEN" sys/policies/acl
vault token capabilities "$YOUR_TOKEN" sys/policies/acl > token_capabilities.txt
echo "token_capabilities.txt created"
export PROJECT_ID=$(gcloud config get-value project)
run gsutil cp policies.txt token_capabilities.txt "gs://$PROJECT_ID"
```

**Task 7:**

```apache
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Interacting%20with%20Vault%20Policies/TechCode2.sh
sudo chmod +x TechCode2.sh
./TechCode2.sh
```

**Task 8:**

```apache
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Interacting%20with%20Vault%20Policies/TechCode3.sh
sudo chmod +x TechCode3.sh
./TechCode3.sh 
```

---

### Manual

%[https://youtu.be/aSiHm6JySd4] 

```apache
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update
sudo apt-get install vault -y
vault
vault server -dev
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417615272/f228a998-cd88-48db-94f1-eb64d65fe565.png align="center")

```apache
export VAULT_ADDR='http://127.0.0.1:8200'
vault status
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417712479/36cc905f-2d05-4693-b986-d0064dd85f33.png align="center")

```apache
vault login token=<your root token>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417806796/c3fea0d0-f813-4475-adcc-d428c1eb3eaf.png align="center")

```apache
vault secrets list
vault auth enable userpass
vault write auth/userpass/users/example-user password=password!
vault login -method=userpass username=example-user password=password!
vault secrets list
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417886402/bd136db2-e193-4793-add5-97e0f7858423.png align="center")

```apache
8200
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417937119/27eca1d8-0a31-446a-a75a-f6c769f12cb8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755418083308/095c45db-a831-49d6-a2f0-9de622afb4a1.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755418134197/5fe1cd69-472d-45c8-acb7-21c357439cd1.png align="center")

```apache
demo-policy
```

```apache
path "sys/mounts" {
    capabilities = ["read"]
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755418457000/8d266a55-0a2a-40db-99d9-cc5202adda5c.png align="center")

```apache
demo-policy
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755418574055/7079153c-7b23-4ade-88f2-71f062f6d219.png align="center")

```apache
vault secrets list
vault login -method=userpass username=example-user password=password!
vault secrets list
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755418842350/f517639f-a767-43fa-9605-4dee36c4d27a.png align="center")

```apache
vault token capabilities <your token> sys/mounts
```

```apache
vault token capabilities <your token> sys/mounts
```

```apache
vault policy list
```

```apache
path "sys/policies/acl" {
    capabilities = ["read", "list"]
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419093099/8fc6240c-d4db-4a18-a7dd-ac18d1d60899.png align="center")

```apache
vault policy list
vault policy list > policies.txt
```

```apache
vault token capabilities <your token> sys/policies/acl
```

```apache
vault token capabilities <your token> sys/policies/acl > token_capabilities.txt
```

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp *.txt gs://$PROJECT_ID
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419271229/5b74d892-b01f-49e7-9103-b5427dcfa535.png align="center")

```apache
vault login <your root token>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419285925/6006dc1a-9680-417c-906c-2bfed67aaba4.png align="center")

```apache
vault read sys/policy
```

```apache
tee example-policy.hcl <<EOF
# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
EOF
```

```apache
cat example-policy.hcl
vault policy write example-policy example-policy.hcl
```

```apache
tee example-policy.hcl <<EOF
# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}

# List auth methods
path "sys/auth"
{
  capabilities = ["read"]
}
EOF
```

```apache
cat example-policy.hcl
vault write sys/policy/example-policy policy=@example-policy.hcl
gsutil cp example-policy.hcl gs://$PROJECT_ID
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419475151/c404a12d-5a33-4f9f-abfc-c0ba0b3f14cc.png align="center")

```apache
vault delete sys/policy/example-policy
vault policy list
vault write auth/userpass/users/firstname-lastname \
    password="s3cr3t!" \
    policies="default, demo-policy"
vault login -method="userpass" username="firstname-lastname" password="s3cr3t!"
```

```apache
vault login <your root token>
```

```apache
vault token create -policy=dev-readonly -policy=logs
vault write auth/userpass/users/admin \
    password="admin123" \
    policies="admin"
vault write auth/userpass/users/app-dev \
    password="appdev123" \
    policies="appdev"
vault write auth/userpass/users/security \
    password="security123" \
    policies="security"
```

```apache
admin
```

```apache
# Read system health check
path "sys/health"
{
  capabilities = ["read", "sudo"]
}

# Create and manage ACL policies broadly across Vault

# List existing policies
path "sys/policies/acl"
{
  capabilities = ["list"]
}

# Create and manage ACL policies
path "sys/policies/acl/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Enable and manage authentication methods broadly across Vault

# Manage auth methods broadly across Vault
path "auth/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Create, update, and delete auth methods
path "sys/auth/*"
{
  capabilities = ["create", "update", "delete", "sudo"]
}

# List auth methods
path "sys/auth"
{
  capabilities = ["read"]
}

# Enable and manage the key/value secrets engine at `secret/` path

# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419698943/2f3f1696-c106-4fc3-964b-a8dbfd14e9f7.png align="center")

```apache
appdev
```

```apache
# List, create, update, and delete key/value secrets
path "secret/+/appdev/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Create, read, and update secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419789719/a9685765-dc0d-45c7-837f-aa6d21a5357a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755419834657/454c2265-06dd-4541-8d8a-4b82624bc0d7.png align="center")

```apache
vault kv put secret/security/first username=password
vault kv put secret/security/second username=password
vault kv put secret/appdev/first username=password
vault kv put secret/appdev/beta-app/second username=password
vault kv put secret/admin/first admin=password
vault kv put secret/admin/supersecret/second admin=password
vault login -method="userpass" username="app-dev" password="appdev123"
vault kv get secret/appdev/first
vault kv get secret/appdev/beta-app/second
vault kv put secret/appdev/appcreds credentials=creds123
vault kv destroy -versions=1 secret/appdev/appcreds
vault kv get secret/security/first
vault kv list secret/
vault login -method="userpass" username="security" password="security123"
vault kv get secret/security/first
vault kv get secret/security/second
vault kv put secret/security/supersecure/bigsecret secret=idk
vault kv destroy -versions=1 secret/security/supersecure/bigsecret
vault kv get secret/appdev/first
vault kv list secret/
vault secrets enable -path=supersecret kv
vault kv get secret/admin/first
vault kv list secret/admin
vault login -method="userpass" username="admin" password="admin123"
vault kv get secret/admin/first
vault kv get secret/security/first
vault kv put secret/webserver/credentials web=awesome
vault kv destroy -versions=1 secret/webserver/credentials
vault kv get secret/appdev/first
vault kv list secret/appdev/
vault policy list
vault policy list > policies-update.txt
gsutil cp policies-update.txt gs://$PROJECT_ID
vault auth enable gcp
vault auth list
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755420161448/f124de53-971c-4669-ac05-f59066694304.png align="center")