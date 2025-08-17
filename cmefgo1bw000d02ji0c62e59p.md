---
title: "Managing Vault Token - GSP1006"
seoTitle: "Managing Vault Token - GSP1006"
seoDescription: "Learn to manage and administer Vault tokens, covering creation, usage, revocation, and various management techniques in this hands-on lab"
datePublished: Sun Aug 17 2025 09:05:50 GMT+0000 (Coordinated Universal Time)
cuid: cmefgo1bw000d02ji0c62e59p
slug: managing-vault-token-gsp1006
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755420531293/507b33e0-2776-4373-9d51-c0359c75bbc2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755421526387/8028894c-14a9-4012-bd48-de5d291814ec.png
tags: vault, managing-vault-token-gsp1006, managing-vault-token, gsp1006, vault-token

---

## Overview

Tokens are the core method for *authentication* within Vault. If you log in with Vault via an auth method, a successful authentication generates a token. Regardless, clients need valid tokens to read secrets from Vault. Furthermore, tokens can be used directly or auth methods can be used to dynamically generate tokens based on external identities.

As stated in the [authentication concepts](https://www.vaultproject.io/docs/concepts/auth), all external authentication mechanisms, such as GitHub, map down to dynamically created tokens. These tokens have all the same properties as a normal manually created token. Within Vault, tokens map to information. The most important information mapped to a token is a set of one or more attached [policies](https://www.vaultproject.io/docs/concepts/policies). These policies control what the token holder is allowed to do within Vault. Other mapped information includes metadata that can be viewed and is added to the audit log, such as creation time, last renewal time, and more.

In this lab, you will learn how to create, use, revoke, and manage Vault tokens.

### Objectives

In this lab, you will:

* Interact with use limit tokens, periodic tokens, and short-lived tokens
    
* Interact with orphan tokens
    
* Create and test batch tokens
    
* Configure and test default TTLs and maximum TTLs to manage tokens
    

## Setup and requirements

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
    student-00-75a820b1dc03@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    BnhA0rV8XpLT
    ```
    
    Copied!
    
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-c2e021a9e888`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-c2e021a9e888
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-00-75a820b1dc03@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-00-c2e021a9e888
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Install Vault

1. In Cloud Shell window, add the HashiCorp GPG key:
    

```apache
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
```

Copied!

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
Usage: vault <command></command> [args]

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

**Note:** Never run a "dev" mode server in production. It is insecure and will lose data on every restart (since it stores data in-memory). It is only made for development or experimentation.

### Starting the dev server

First, start a Vault *dev server*. The dev server is a built-in, pre-configured server that is not very secure but useful for playing with Vault locally.

1. To start the Vault dev server, run:
    

```apache
vault server -dev
```

Copied!

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

**Note: Insecure** operation: Do not run a Vault dev server in production! This approach is only used here to simplify the unsealing process for this demonstration.

Now that you have the Vault development server running, you can continue setting up access to it.

2. Open a new Cloud Shell tab.
    
3. Copy and run the export `VAULT_ADDR ..`. command from the **terminal output**. This will configure the Vault client to talk to the dev server:
    

```apache
export VAULT_ADDR='http://127.0.0.1:8200'
```

Copied!

The Vault CLI determines which Vault servers to send requests using the `VAULT_ADDR` environment variable.

4. Save the unseal key somewhere. Don't worry about *how* to save this securely. For now, just save it anywhere.
    
5. Set the `VAULT_TOKEN` environment variable value to the generated **Root Token** value displayed in the **terminal output**:
    

```apache
export VAULT_TOKEN="<REPLACE WITH YOUR ROOT TOKEN>"
```

Copied!

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
Version         1.9.2
Storage Type    inmem
Cluster Name    vault-cluster-e2392b81
Cluster ID      48d7aba0-5416-a36b-2c27-0b256b222f57
HA Enabled      false
```

Great! You've started the Vault development server. You can now continue on to the next section.

## Tokens overview

There are two types of Vault tokens: **service tokens** and **batch tokens**. Vault persists the service tokens in its storage backend. You can renew a service token or revoke it as necessary. On the other hand, Vault does not persist the batch tokens. Batch tokens are encrypted binary large objects (blobs) that carry enough information to perform Vault actions. Therefore, batch tokens are extremely lightweight and scalable; however, they lack most of the flexibility and features of service tokens. The following features detailed in this section apply to *service tokens*; their applicability to batch tokens is discussed later.

### The token store

Often in documentation or in help channels, the "token store" is referenced. This is the same as the [token authentication backend](https://www.vaultproject.io/docs/auth/token). This is a special backend in that it is responsible for creating and storing tokens, and cannot be disabled. It is also the only auth method that has no login capability -- all actions require existing authenticated tokens.

### Root tokens

Root tokens are tokens that have the `root` policy attached to them. Root tokens can do anything in Vault. *Anything*. In addition, they are the only type of token within Vault that can be set to never expire without any renewal needed. As a result, it is purposefully hard to create root tokens; in fact there are only three ways to create root tokens:

* The initial root token generated at `vault operator init` time -- this token has no expiration
    
* By using another root token; a root token with an expiration cannot create a root token that never expires
    
* By using `vault operator generate-root` ([example](https://www.vaultproject.io/guides/operations/generate-root)) with the permission of a quorum of unseal key holders
    

Root tokens are useful in development but should be extremely carefully guarded in production. In fact, the Vault team recommends that root tokens are only used for just enough initial setup (usually, setting up auth methods and policies necessary to allow administrators to acquire more limited tokens) or in emergencies, and are revoked immediately after they are no longer needed. If a new root token is needed, the `operator generate-root` command and associated [API endpoint](https://www.vaultproject.io/api/system/generate-root) can be used to generate one on-the-fly.

### Token hierarchies and orphan tokens

Normally, when a token holder creates new tokens, these tokens will be created as children of the original token; tokens they create will be children of them; and so on. When a parent token is revoked, all of its child tokens -- and all of their leases -- are revoked as well. This ensures that a user cannot escape revocation by simply generating a never-ending tree of child tokens.

Often this behavior is not desired, so users with appropriate access can create **orphan** tokens. These tokens have no parent, meaning they are the root of their own token tree. These orphan tokens can be created:

* Via `write` access to the `auth/token/create-orphan` endpoint
    
* By having `sudo` or `root` access to the `auth/token/create` and setting the `no_parent` parameter to true
    
* Via token store roles
    
* By logging in with any other (non-`token`) auth method
    

Users with appropriate permissions can also use the `auth/token/revoke-orphan` endpoint, which revokes the given token but rather than revoke the rest of the tree, it instead sets the tokens' immediate children to be orphans. Use with caution!

### Token accessors

When tokens are created, a token accessor is also created and returned. This accessor is a value that acts as a reference to a token and can only be used to perform limited actions:

* Look up a token's properties (not including the actual token ID)
    
* Look up a token's capabilities on a path
    
* Renew the token
    
* Revoke the token
    

The token *making the call*, not the token associated with the accessor, must have appropriate permissions for these functions.

There are many useful workflows around token accessors. As an example, a service that creates tokens on behalf of another service (such as the [Nomad](https://www.nomadproject.io/) scheduler) can store the accessor correlated with a particular job ID. When the job is complete, the accessor can be used to instantly revoke the token given to the job and all of its leased credentials, limiting the chance that a bad actor will discover and use them.

Audit devices can optionally be set to not obfuscate token accessors in audit logs. This provides a way to quickly revoke tokens in case of an emergency. However, it also means that the audit logs can be used to perform a larger-scale denial of service attack.

Finally, the only way to "list tokens" is via the `auth/token/accessors` command, which actually gives a list of token accessors. While this is still a dangerous endpoint (since listing all of the accessors means that they can then be used to revoke all tokens), it also provides a way to audit and revoke the currently-active set of tokens.

### Token time-to-live, periodic tokens, and explicit max TTLs

Every non-root token has a time-to-live (TTL) associated with it, which is a current period of validity since either the token's creation time or last renewal time, whichever is more recent. (Root tokens may have a TTL associated, but the TTL may also be 0, indicating a token that never expires). After the current TTL is up, the token will no longer function——it, and its associated leases, are revoked.

If the token is renewable, Vault can be asked to extend the token validity period using `vault token renew` or the appropriate renewal endpoint. At this time, various factors come into play. What happens depends upon whether the token is a periodic token (available for creation by `root`/`sudo` users, token store roles, or some auth methods), has an explicit maximum TTL attached, or neither.

For more information on TTLs, you can check out the [Token Time-To-Live, Periodic Tokens, and Explicit Max TTLs documentation](https://www.vaultproject.io/docs/concepts/tokens#token-time-to-live-periodic-tokens-and-explicit-max-ttls).

## Task 3. Service tokens

Tokens allow Vault clients to read or write secrets from Vault; therefore, it is critical to use a specific type of token based on the use case. In this section, you will learn about the lifecycle of different token types and how to manage them.

### Service token lifecycle

Every non-root token has a time-to-live (TTL). When a token expires, Vault automatically revokes it. If you create a new token, the token you used to create the token becomes the parent token. Once the parent token expires, so do all its children regardless of their own TTLs.

Suppose a hierarchy exists with respective TTL as follows:

```apache
    s.b519c6aa... (1h)
    |___ s.6a2cf3e7... (4h)
    |___ s.1d3fd4b2... (2h)
          |___ s.794b6f2f... (3h)
```

In this scenario, the token `s.1d3fd4b2..` will expire in two hours. Although its child token (`s.794b6f2f...`) has TTL of three hours, Vault will revoke the child token when its parent expires.

When the top-level token (`s.b519c6aa...`) expires, Vault will revoke all tokens under the tree (`s.6a2cf3e7...`, `s.1d3fd4b2...`, and `s.794b6f2f...`) regardless of their TTL.

### TTL and max TTL

If the token is renewable, you can use `vault token renew` command to extend the token's TTL before it expires. You can repeatedly renew a token until it reaches its maximum TTL.

For example, if a token's TTL is 30 minutes and the maximum TTL is 24 hours, you can renew the token before reaching the 30 minutes. You can renew the token multiple times if you are using it. However, once the token reaches the 24 hours of its first creation, you can no longer renew the token.

**Note:** If you do not explicitly set the token's TTL or maximum TTL, it takes the system max TTL which is **32 days** by default. (You can change the system default in the Vault server configuration file.) This means that Vault stores the token in its storage backend for 32 days even if you are not using it.

### Token types

The following table details the different types of service tokens and their associated usages:

| **Token type** | **Usage** |
| --- | --- |
| [Use limit tokens](https://learn.hashicorp.com/tutorials/vault/tokens?in=vault/tokens#tokens-with-use-limit) | Tokens that are only good to invoke a specific number of operations. |
| [Periodic service tokens](https://learn.hashicorp.com/tutorials/vault/tokens?in=vault/tokens#periodic-service-tokens) | Tokens that can be renewed indefinitely. |
| [Short-lived tokens](https://learn.hashicorp.com/tutorials/vault/tokens?in=vault/tokens#short-lived-tokens) | Tokens that are valid for a short time to avoid keeping unused tokens. |
| [Orphan tokens](https://learn.hashicorp.com/tutorials/vault/tokens?in=vault/tokens#orphan-tokens) | Tokens that are root of their own token tree. |

### Tokens with use limit

In addition to TTL and max TTL, you can set the *number of uses* for tokens. The tokens with a use limit expire at the end of their last use regardless of their remaining TTLs. On the same note, use limit tokens expire at the end of their TTLs regardless of their remaining uses.

To create tokens with a use limit, set the number of uses when you create them.

1. Navigate to your open Cloud Shell tab.
    
2. To view optional parameters to create tokens, run the command with `-help` flag:
    

```apache
vault token create -help
```

Copied!

There are a number of parameters you can set.

3. Create a token with TTL of 1 hour and a use limit of 2. Attach the `default` policy:
    

```apache
vault token create -ttl=1h -use-limit=2 -policy=default
```

Copied!

Your output should resemble the following:

```apache
Key                  Value
---                  -----
token                s.v7jiYCOCEyNiCItzK7YgLkPi
token_accessor       zwAyJ8Fu4tZs54Tda8tBWeq1
token_duration       1h
token_renewable      true
token_policies       ["default"]
identity_policies    []
policies             ["default"]
```

4. Store the generated token in an environment variable, `USE_LIMIT_TOKEN`:
    

```apache
export USE_LIMIT_TOKEN=<your-token>
```

Copied!

5. Set the `VAULT_TOKEN` value to the token you just generated, and invoke any CLI command:
    

```apache
VAULT_TOKEN=$USE_LIMIT_TOKEN vault token lookup
```

Copied!

```apache
Key                 Value
---                 -----
accessor            zwAyJ8Fu4tZs54Tda8tBWeq1
creation_time       1630475278
creation_ttl        1h
display_name        token
entity_id           n/a
expire_time         2021-08-31T23:47:58.323126-07:00
explicit_max_ttl    0s
id                  s.v7jiYCOCEyNiCItzK7YgLkPi
issue_time          2021-08-31T22:47:58.32313-07:00
meta                <nil>
num_uses            1
...
```

Notice that the `num_uses` is now `1`.

6. Run another CLI command using the token:
    

```apache
VAULT_TOKEN=$USE_LIMIT_TOKEN vault write cubbyhole/token value=1234567890
```

Copied!

```apache
Success! Data written to: cubbyhole/token
```

7. Try to read the value now using the same token:
    

```apache
VAULT_TOKEN=$USE_LIMIT_TOKEN vault read cubbyhole/token
```

Copied!

You should see the following error:

```apache
Error reading cubbyhole/token: Error making API request.

URL: GET http://127.0.0.1:8200/v1/cubbyhole/token
Code: 403. Errors:

permission denied
```

The first command read the token's properties and then wrote a value to the cubbyhole secrets engine. This exhausted the use limit of 2 for this token. Therefore, the attempt to read the secret from the cubbyhole failed.

### Periodic service tokens

**Root** or **sudo** users have the ability to generate **periodic tokens**. Periodic tokens have a TTL (validity period), but no max TTL; therefore, they may live for an infinite duration of time so long as they are renewed within their TTL. This is useful for long-running services that cannot handle regenerating a token.

**Note:** When you set period, it becomes the token renewal period (TTL). When a period and an explicit max TTL were both set on a token, it behaves as a periodic token. However, once the explicit max TTL is reached, the token will be revoked. Refer to the [renew service](https://learn.hashicorp.com/tutorials/vault/tokens?in=vault/tokens#renew-service-tokens) tokens to learn more about the period and the maximum TTL.

1. Start by creating a token with 24 hours period with the `default` policy attached:
    

```apache
vault token create -policy="default" -period=24h
```

Copied!

Your output should resemble the following:

```apache
Key                  Value
---                  -----
token                s.s7bMPX51JesC1VYJwdZf8ylt
token_accessor       my4H9wd1P7OSuWeUoAlnQL1h
token_duration       24h
token_renewable      true
token_policies       ["default"]
identity_policies    []
policies             ["default"]
```

You can see the generated token's metadata. In this example, the generated token value is `s.s7bMPX51JesC1VYJwdZf8ylt`.

2. Lookup your token:
    

```apache
vault token lookup <your-token>
```

Copied!

```apache
....
orphan              false
path                auth/token/create
period              24h
policies            [default]
renewable           true
ttl                 23h59m10s
type                service
```

Notice the `period 24h` and `renewable true` metadata. You can renew the generated token indefinitely for as long as it does not expire. If you do not renew, the token expires after 24 hours.

### Renew service tokens

You can **renew** the service token's TTL as long as it has not expired.

1. Run the following command to create a new token:
    

```apache
vault token create -ttl=45 -explicit-max-ttl=120
```

Copied!

The generated token has a **TTL** of 45 seconds, and **max TTL** of 2 minutes (120 seconds).

2. Set an environment variable `$TOKEN` to your token you just created:
    

```apache
export TOKEN=<your-token>
```

Copied!

3. Use the `vault token renew` command to renew the service token's TTL before the token expires:
    

```apache
vault token renew $TOKEN
```

Copied!

You should see the following output:

```apache
Key                  Value
---                  -----
token                s.bETmMLCJfYwCg5r7SxgNJ3NZ
token_accessor       ZVd00AFdYzVRzG5MSjbXgTe6
token_duration       45s
token_renewable      true
token_policies       ["default"]
identity_policies    []
policies             ["default"]
```

4. Now, renew and extend the token's TTL to 60 seconds:
    

```apache
vault token renew -increment=60 $TOKEN
```

Copied!

```apache
Key                  Value
---                  -----
token                s.bETmMLCJfYwCg5r7SxgNJ3NZ
token_accessor       ZVd00AFdYzVRzG5MSjbXgTe6
token_duration       1m
token_renewable      true
token_policies       ["default"]
identity_policies    []
policies             ["default"]
```

Notice that the token TTL (`token_duration`) is now 1 minute instead of 45 seconds. Because the explicit max TTL is set to 2 minutes, you will not be able to renew the token after 2 minutes.

5. Run the renew command again:
    

```apache
vault token renew -increment=60 $TOKEN
```

Copied!

As time passes, Vault returns a message such as `TTL of "26s" exceeded the effective max_ttl of "10s"`; TTL value is capped accordingly to indicate that **the token TTL cannot exceed 2 minutes from its creation time**. Eventually, the token expires and Vault automatically revokes it. Once the token expires, the renew command returns token not found message.

6. Once the TTL has run out, execute a the following command to verify the revocation:
    

```apache
vault token renew -increment=60 $TOKEN
```

Copied!

You should see the following error:

```apache
Error renewing token: Error making API request.

URL: PUT http://127.0.0.1:8200/v1/auth/token/renew
Code: 400. Errors:

* token not found
```

### Short-lived tokens

In this section you will create a new service token with TTL of 60 seconds which means that the token gets automatically revoked after 60 seconds.

1. Create a token with TTL of 60 seconds:
    

```apache
vault token create -ttl=60s
```

Copied!

You should see the following output:

```apache
Key                  Value
---                  -----
token                s.cvWqKW1ELa11uBWZghFPXURK
token_accessor       ZhjXFP7nL30a2wmtWdJrXkbC
token_duration       1m
token_renewable      true
token_policies       ["root"]
identity_policies    []
policies             ["root"]
```

2. Lookup the generated token's metadata:
    

```apache
vault token lookup <your-token>
```

Copied!

Your output should resemble:

```apache
Key                 Value
---                 -----
accessor            0j0plH3OA3ampcXpxZBhmjzI
creation_time       1630641524
creation_ttl        1m
display_name        token
entity_id           n/a
expire_time         2021-09-02T20:59:44.342613-07:00
explicit_max_ttl    0s
id                  s.cvWqKW1ELa11uBWZghFPXURK
issue_time          2021-09-02T20:58:44.342616-07:00
meta                <nil>
num_uses            0
orphan              false
path                auth/token/create
policies            [root]
renewable           true
ttl                 38s
type                service
```

**Note:** The `vault token lookup` command returns the token's properties. In this example, it shows that this token has 38 more seconds before it expires.

When you execute a Vault command using the new token immediately following its creation, it should work. Wait for 60 seconds and try again. It returns a 403 error, which indicates a forbidden API call due to expired token usage:

```apache
Error looking up token: Error making API request.

URL: POST http://127.0.0.1:8200/v1/auth/token/lookup
Code: 403. Errors:

* bad token
```

### Orphan tokens

Orphan tokens are not children of their parent; therefore, orphan tokens do **not** expire when their parent does. Note that orphan tokens *still* expire when their own max TTL is reached.

1. Run the following command to create an `orphan` token. Note that the following CLI command requires root token or sudo capability on the `auth/token/create` path:
    

```apache
vault token create -orphan
```

Copied!

2. Lookup the generated token's metadata:
    

```apache
vault token lookup <your-token>
```

Copied!

You should see the following output:

```apache
Key                 Value
---                 -----
accessor            MkVetJZ8Z7ex5LKUrGuqIZAP
creation_time       1630642672
creation_ttl        0s
display_name        token
entity_id           n/a
expire_time         <nil>
explicit_max_ttl    0s
id                  s.I8VVstekovTt6u5gqFLlo6MD
issue_time          2021-09-02T21:17:52.637177-07:00
meta                <nil>
num_uses            0
orphan              true
path                auth/token/create
policies            [root]
renewable           false
ttl                 0s
type                service
```

Notice the `orphan` key is set to **true**.

### Token role

Instead of passing a number of parameters, you can create a role with a set of parameter values set. Roles enforce specific behavior when creating tokens that allow token functionality that is otherwise not available or would require `sudo` / `root` privileges to access. Role parameters, when set, override any provided options to the create endpoints.

1. Create a token role named `zabbix`:
    

```apache
vault write auth/token/roles/zabbix \
    allowed_policies="policy1, policy2, policy3" \
    orphan=true \
    period=8h
```

Copied!

2. Create a token for `zabbix` role:
    

```apache
vault token create -role=zabbix
```

Copied!

**Note:** You can ignore warnings for the policies not existing.

You should receive the following output:

```apache
Key                  Value
---                  -----
token                s.AhpekHyJaDqU4VZCM1BvmRla
token_accessor       hFs4UW9CttwHEMDAvmV18Z8m
token_duration       8h
token_renewable      true
token_policies       ["default" "policy1" "policy2" "policy3"]
identity_policies    []
policies             ["default" "policy1" "policy2" "policy3"]
```

### Revoke service tokens

If a user or machine needs a temporal access to Vault, you can set a short TTL or a number of uses to a service token so the token is automatically revoked at the end of its life. But if any suspicious activity was detected, Vault has built-in support for revocation of service tokens before reaching its TTL.

You can revoke service tokens using the `vault token revoke` command or the `auth/token/revoke` API endpoint.

In this section, you are going to create tokens with the following hierarchy and inspect the token lifecycle.

```apache
 parent_token (1 minute)
    |___ child_token (3 minutes)
    |___ orphan_token (3 minutes)
```

1. Create a test policy:
    

```apache
vault policy write test -<<EOF
path "auth/token/create" {
   capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}
EOF
```

Copied!

2. Create a token and save its value in a file, `parent_token.txt`:
    

```apache
vault token create -ttl=60 -policy=test -format=json \
    | jq -r ".auth.client_token" > parent_token.txt
```

Copied!

The generated token has a TTL of 1 minute (60 seconds).

3. Create a token using the parent token and save its value in a file, `child_token.txt`:
    

```apache
VAULT_TOKEN=$(cat parent_token.txt) \
   vault token create -ttl=180 -policy=default -format=json \
    | jq -r ".auth.client_token" > child_token.txt
```

Copied!

The generated token has a TTL of 3 minute (180 seconds) while its parent token's TTL is 1 minute.

4. Create an orphan token using the parent token and save its value in a file, `orphan_token.txt`:
    

```apache
VAULT_TOKEN=$(cat parent_token.txt) \
   vault token create -orphan -ttl=180 -policy=default -format=json \
    | jq -r ".auth.client_token" > orphan_token.txt
```

Copied!

The generated token is an orphan token with a TTL of 3 minute (180 seconds).

5. Now, revoke the parent token:
    

```apache
vault token revoke $(cat parent_token.txt)
```

Copied!

```apache
Success! Revoked token (if it existed)
```

6. Verify that the token no longer exists by looking it up:
    

```apache
vault token lookup $(cat parent_token.txt)
```

Copied!

Vault returns an error message.

```apache
Error looking up token: Error making API request.

URL: POST http://127.0.0.1:8200/v1/auth/token/lookup
Code: 403. Errors:

* bad token
```

7. Look up the child token:
    

```apache
vault token lookup $(cat child_token.txt)
```

Copied!

Vault returns the `bad token` error because Vault revoked the child token along with its parent token.

8. Look up the orphan token:
    

```apache
vault token lookup $(cat orphan_token.txt)
```

Copied!

Because each orphan token is the root of its own token tree, it exists until it expires. Therefore, the command displays the detail information about the orphan token.

**Note:** Instead of revoking using a token value, revoke tokens with a token accessor using the `-accessor` flag.

### Apply token types

In the previous sections, you've learned how you can set the token's lifecycle. The next step is to apply this to generate tokens for your applications. Vault clients first authenticate with Vault using an **auth method** to acquire a token. There are auth methods aimed to authenticate applications or machines. Once its identity was verified, Vault server will return a token with appropriate policies attached.

You will be using the [AppRole](https://learn.hashicorp.com/tutorials/vault/approle) auth method to demonstrate this.

1. First, unset the `VAULT_TOKEN` environment variable you created when setting up Vault:
    

```apache
unset VAULT_TOKEN
```

Copied!

2. Enable the `approle` auth method:
    

```apache
vault auth enable approle
```

Copied!

3. Create a role for your app specifying that the generated token type is periodic and expires after 24 hours if not renewed:
    

```apache
vault write auth/approle/role/jenkins policies="jenkins" period="24h"
```

Copied!

This example defines a role named, "jenkins". The tokens generated for this role will be a periodic token with `jenkins` policy attached.

4. Retrieve the **RoleID** for the `jenkins` role and save it in a file, `role_id.txt`:
    

```apache
vault read -format=json auth/approle/role/jenkins/role-id \
    | jq -r ".data.role_id" > role_id.txt
```

Copied!

5. Generate a **SecretID** for the `jenkins` role and save it in a file, `secret_id.txt`:
    

```apache
vault write -f -format=json auth/approle/role/jenkins/secret-id | jq -r ".data.secret_id" > secret_id.txt
```

Copied!

6. Authenticate with Vault using the generated `role_id` and `secret_id`:
    

```apache
vault write auth/approle/login role_id=$(cat role_id.txt) \
     secret_id=$(cat secret_id.txt)
```

Copied!

Your output should be similar to the following:

```apache
Key                     Value
---                     -----
token                   s.Hebs2ofuKL3RKjAVLoVkIsWq
token_accessor          CruzydNdIuct1OYYHXb86wwI
token_duration          24h
token_renewable         true
token_policies          ["default" "jenkins"]
identity_policies       []
policies                ["default" "jenkins"]
token_meta_role_name    jenkins
```

7. View the token details:
    

```apache
vault token lookup <your-token>
```

Copied!

Your output should resemble the following:

```apache
...
orphan              true
path                auth/approle/login
period              24h
policies            [default jenkins]
renewable           true
ttl                 23h58m12s
type                service
```

The output shows the `period` of 24 hours, and the `jenkins` policy is attached.

8. Run the following command to copy the values of the policies associated with the token to a text file:
    

```apache
vault token lookup -format=json <your-token> | jq -r .data.policies > token_policies.txt
```

Copied!

9. Run the following command to copy this file to a pre-created Cloud Storage bucket to track your progress:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp token_policies.txt gs://$PROJECT_ID
```

Copied!

Click **Check my progress** to verify that you've performed the above task.

Service Token

### Service tokens overview

This section walked through the Vault token fundamentals. In the real world, you would rarely create tokens using the `vault token create` commands or the `/auth/token/create` endpoint. In most cases, you specify the type of token in the context of *auth methods* as demonstrated in the Apply token type section.

Integrating your application to read or write secrets to Vault may require you to:

* Authenticate with Vault using an auth method
    
* Maintain the token
    
* Renew or revoke the token if necessary
    

Vault Agent can help to simplify the introduction of Vault to your applications. The [App Integration](https://learn.hashicorp.com/collections/vault/app-integration) collection lists tutorials that introduce different approaches.

But first, go through the next section on Batch tokens to understand the difference between the service tokens and batch tokens so that you can decide which token type is best suited for your use case.

## Task 4. Batch tokens

Batch tokens are encrypted blobs that carry enough information for them to be used for Vault actions, but they require no storage on disk to track them. As a result they are extremely lightweight and scalable, but lack most of the flexibility and features of service tokens. Batch tokens are *not* persisted and cannot be listed or manually revoked. In this section you will create, test, and apply batch tokens to demonstrate their capabilities.

### Service tokens vs. batch tokens

As the number of machines and apps using Vault for secret management scales, Vault must manage the growing number of client tokens. The creation of service tokens can affect Vault performance since they must be replicated across the primary and secondary clusters. On the other hand, batch tokens are neither persisted to disk nor live in memory; they are not a part of the data replication process.

Due to the lack of features with batch tokens, it's preferable to use service tokens in most use cases. However, think of a scenario where you have a large number of containers (e.g. 100,000s) start up and all request a token from Vault. The use of batch tokens can reduce the stress on the storage backend and improve the overall performance.

Batch tokens are designed to be lightweight with limited flexibility. The following [Batch Tokens documentation](https://learn.hashicorp.com/tutorials/vault/batch-tokens#service-tokens-vs-batch-tokens) highlights the differences between batch tokens and service tokens.

### Create batch tokens

1. Create a test policy:
    

```apache
vault policy write test -<<EOF
path "auth/token/create" {
   capabilities = ["create", "read", "update", "delete", "list"]
}
EOF
```

Copied!

2. Create a batch token with the `test` policy attached, and set a TTL so the token is valid for 20 minutes:
    

```apache
vault token create -type=batch -policy=test -ttl=20m
```

Copied!

You should receive the following output:

```apache
Key                  Value
---                  -----
token                b.AAAAAQKLjWtYmIon8PUDgpDw...snipped...ESlaPkxWFsMqqjaxTetLMRQTHw
token_accessor       n/a
token_duration       20m
token_renewable      false
token_policies       ["default" "test"]
identity_policies    []
policies             ["default" "test"]
```

**Note:** The generated token value starts with `b`. to indicate that it is a batch token.

3. Lookup the token details:
    

```apache
vault token lookup <batch_token>
```

Copied!

Your output should resemble:

```apache
Key                 Value
---                 -----
accessor            n/a
creation_time       1614125453
creation_ttl        20m
display_name        token
entity_id           n/a
expire_time         2021-02-23T16:30:53-08:00
explicit_max_ttl    0s
id                  b.AAAAAQKLjWtYmIon8PUDgpDw...snipped...ESlaPkxWFsMqqjaxTetLMRQTHw
issue_time          2021-02-23T16:10:53-08:00
meta                <nil>
num_uses            0
orphan              false
path                auth/token/create
policies            [default test]
renewable           false
ttl                 11m42s
type                batch
```

**Note:** Notice that `renewable` is set to `false`.

### Test batch tokens

1. Log in with the generated batch token:
    

```apache
vault login <batch_token>
```

Copied!

2. Create some secrets in the Cubbyhole secrets engine:
    

```apache
vault write cubbyhole/token value="1234567890"
```

Copied!

You should see the following output. As you can see, batch tokens do not have a cubbyhole associated with it:

```apache
Error writing data to cubbyhole/token: Error making API request.

URL: PUT $VAULT_ADDR/v1/cubbyhole/token
Code: 400. Errors:

cubbyhole operations are only supported by "service" type tokens
```

3. Create a child token:
    

```apache
vault token create -policy=default
```

Copied!

You should see the following output. As you can see, batch tokens cannot create child tokens *even if their policies have the capabilities to do so*.

```apache
Error creating token: Error making API request.

URL: POST $VAULT_ADDR/v1/auth/token/create
Code: 400. Errors:

batch tokens cannot create more tokens
```

4. Log back in as `root`. Use your **root token** from the setup section:
    

```apache
vault login <your-root-token>
```

Copied!

5. Try revoking the batch token:
    

```apache
vault token revoke <batch_token>
```

Copied!

You'll see the following error:

```apache
Error revoking token: Error making API request.

URL: PUT $VAULT_ADDR/v1/auth/token/revoke
Code: 400. Errors:

Batch tokens cannot be revoked.
```

The TTL values of batch tokens are fixed. In this example, the TTL is set to 20 minutes. After 20 minutes, the token expires and Vault will revoke it. Batch tokens cannot be renewed.

**Note:** There are some trade-offs for using batch tokens; however, depending on your use case, batch tokens can significantly improve the performance of your Vault environment.

### Apply batch tokens

Similar to what you did in the previously in the Tokens section, use the AppRole auth method as an example to generate a batch token upon a successful login.

1. Create a role called "shipping", which generates a batch token with a TTL of 20 minutes:
    

```apache
vault write auth/approle/role/shipping policies="shipping" \
     token_type="batch" \
     token_ttl="20m"
```

Copied!

2. Retrieve the **RoleID** for the `shipping` role and save it to a file:
    

```apache
vault read -format=json auth/approle/role/shipping/role-id \
    | jq -r ".data.role_id" > role_id.txt
```

Copied!

3. Generate a **SecretID** for the `shipping` role and save it to a file as well:
    

```apache
vault write -f -format=json auth/approle/role/shipping/secret-id | jq -r ".data.secret_id" > secret_id.txt
```

Copied!

4. Authenticate with Vault using the generated `role_id` and `secret_id`:
    

```apache
vault write auth/approle/login role_id=$(cat role_id.txt) \
     secret_id=$(cat secret_id.txt)
```

Copied!

Your output should resemble:

```apache
Key                     Value
---                     -----
token                   b.AAAAAQJz7UPU8bJXbp0...snipped...tZMmz-tS3r53z8m8AWp92an0_Hn5q
token_accessor          n/a
token_duration          20m
token_renewable         false
token_policies          ["default" "shipping"]
identity_policies       []
policies                ["default" "shipping"]
token_meta_role_name    shipping
```

5. View the token details:
    

```apache
vault token lookup <your token>
```

Copied!

Example output:

```apache
Key                 Value
---                 -----
accessor            n/a
creation_time       1614146558
creation_ttl        20m
display_name        approle
entity_id           da7e0043-d576-00ae-b609-45eb3c4b2b79
expire_time         2021-02-23T22:22:38-08:00
explicit_max_ttl    0s
id                  b.AAAAAQJz7UPU8bJXbp0...snipped...tZMmz-tS3r53z8m8AWp92an0_Hn5q
issue_time          2021-02-23T22:02:38-08:00
meta                map[role_name:shipping]
num_uses            0
orphan              true
path                auth/approle/login
policies            [default shipping]
renewable           false
ttl                 18m27s
type                batch
```

Great! The output shows the type is `batch`. In this section you learned the characteristics of batch tokens. In the next section you will learn about Token Management and the basic operational tasks for the Token auth method.

## Task 5. Token management

The previous sections demonstrated the lifecycle of Vault tokens. Remember that Vault persists the service tokens in the storage backend until they expire and Vault revokes them. Depending on the auth method, the generated service token varies in its size due to the amount of metadata attached to it. To avoid unused tokens from overtaking the storage memory, set an explicit token time-to-live (TTL) so that Vault will automatically revoke expired tokens.

### Configure the token TTL

When you create tokens or leases with no specific TTL values, the default value applies to them.

1. Create a token with no specific TTL value and attach the `default` policy:
    

```apache
vault token create -policy=default
```

Copied!

Your output should resemble:

```apache
Key                  Value
---                  -----
token                s.RsKLTeSqOxri9EcqjuyhPg42
token_accessor       LJOzPKkGAGNmfFyptUVoUm9v
token_duration       768h
token_renewable      true
token_policies       ["default"]
identity_policies    []
policies             ["default"]
```

Notice that the token TTL (`token_duration`) is **768** hours although you did not provide the TTL value.

2. View the token auth method settings:
    

```apache
vault auth list -detailed
```

Copied!

```apache
Path      Plugin    Accessor               Default TTL    Max TTL    Token Type    ...
----      ------    --------               -----------    -------    ----------
token/    token     auth_token_03fa2d1f    system         system     default-service ...
```

The `token` auth method is the core method of authentication with Vault; therefore, Vault enables it by default while other auth methods must be enabled explicitly. Notice that the `token_type` is `default-service`.

**Note:** The **Default TTL** and **Max TTL** of the `token` auth method is set to `system`.

3. Read the default TTL settings for the **token** auth method:
    

```apache
vault read sys/auth/token/tune
```

Copied!

```apache
Key                  Value
---                  -----
default_lease_ttl    768h
description          token based credentials
force_no_cache       false
max_lease_ttl        768h
token_type           default-service
```

The default token TTL (`default_lease_ttl`) and the max TTL (`max_lease_ttl`) is set to **32 days** (768 hours). This implies that the tokens are valid for 32 days from its creation whether an app is using the token or not.

The previous sections demonstrated various parameters to control the token lifecycle; however, users often neglect to specify the token TTL.

You can override the default TTL on the `token` auth method itself so that Vault will revoke expired token in a reasonable amount of time.

4. Run the following command to set the **default TTL** to 8 hours and **max TTL** to 30 days (720 hours):
    

```apache
vault write sys/auth/token/tune default_lease_ttl=8h max_lease_ttl=720h
```

Copied!

5. Read the configuration to verify:
    

```apache
vault read sys/auth/token/tune
```

Copied!

```apache
Key                  Value
---                  -----
default_lease_ttl    8h
description          token based credentials
force_no_cache       false
max_lease_ttl        720h
token_type           default-service
```

Now you will verify the default TTL and max TTL of your tokens.

6. Again, create a new token without specifying its TTL:
    

```apache
vault token create -policy=default
```

Copied!

Your output should look like the following:

```apache
Key                  Value
---                  -----
token                s.RolWeRqHZgJRCHyWdS0IHDlp
token_accessor       vD4f2fFrT3X9rDBeEQ0oboUY
token_duration       8h
token_renewable      true
token_policies       ["default"]
identity_policies    []
policies             ["default"]
```

**Note:** You can tune any of the auth method configurations using the `/sys/auth//tune` endpoint to override the system defaults.

### Get the token count

If the token TTL is set reasonably, Vault should not be storing many unused tokens.

* Get the service token counts:
    

```apache
vault read sys/internal/counters/tokens
```

Copied!

Your output should read:

```apache
Key         Value
---         -----
counters    map[service_tokens:map[total:7]]
```

The example output shows that there are 7 service tokens. In reality, you may have hundreds of app instances connecting to Vault. Then it becomes more important to know how many tokens exist in the Vault's storage backend.

**Note:** Remember that Vault does not persist batch tokens. Therefore, the `sys/internal/counters/tokens` endpoint returns the number of *service tokens* in Vault.

#### API call using cURL

You can also get the service token counts using the `sys/internal/counters/tokens` endpoint.

* Replace `<your root token>` with your root token:
    

```apache
curl --header "X-Vault-Token:<your root token>" \
       $VAULT_ADDR/v1/sys/internal/counters/tokens | jq .data
```

Copied!

Your output should resemble:

```json
{
  "counters": {
    "service_tokens": {
      "total": 7
    }
  }
}
```

---

## Solution of Lab

%[https://youtu.be/zGlPDywaosw] 

```apache
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update
sudo apt-get install vault -y
vault
vault server -dev
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755420945078/3007208b-d3b0-4cb2-8bf5-4b40eb831649.png align="center")

```apache
export VAULT_ADDR='http://127.0.0.1:8200'
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755421006802/cd42cee6-a14a-41f2-95b2-222c668f3ac5.png align="center")

```apache
export VAULT_TOKEN="<REPLACE WITH YOUR ROOT TOKEN>"
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755421069575/bf341bea-dd0b-4119-bc48-a157282b032c.png align="center")

```apache
vault status
unset VAULT_TOKEN
vault auth enable approle
vault write auth/approle/role/jenkins policies="jenkins" period="24h"
vault read -format=json auth/approle/role/jenkins/role-id \
    | jq -r ".data.role_id" > role_id.txt
vault write -f -format=json auth/approle/role/jenkins/secret-id | jq -r ".data.secret_id" > secret_id.txt
vault write auth/approle/login role_id=$(cat role_id.txt) \
     secret_id=$(cat secret_id.txt)
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755421279600/f43d1a7b-67ba-40b3-b9b7-b96e35bebad6.png align="center")

```apache
vault token lookup <your-token>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755421338132/e0fc701c-5d3f-41b8-a10c-537e1fa3709b.png align="center")

```apache
vault token lookup -format=json <your-token> | jq -r .data.policies > token_policies.txt
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755421454787/a506137a-fb1a-4512-bba9-9f3b5564a7b4.png align="center")

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp token_policies.txt gs://$PROJECT_ID
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755421491080/6ad2f01e-0111-4aec-8774-53b46eac5783.png align="center")