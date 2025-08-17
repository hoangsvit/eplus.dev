---
title: "Getting Started with Vault - GSP1003"
seoTitle: "Getting Started with Vault - GSP1003"
seoDescription: "Learn Hashicorp Vault fundamentals in this hands-on lab: manage secrets, encryption, authentication, and data security with Vault's CLI and web UI"
datePublished: Sun Aug 17 2025 07:52:27 GMT+0000 (Coordinated Universal Time)
cuid: cmefe1nvu000802iegooh2mnr
slug: getting-started-with-vault-gsp1003
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755417109637/1abf1507-be3d-40c7-9679-b4fee8a51848.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755417128011/d7df6593-62d2-49b8-b7e8-4f48ba807e5a.png
tags: vault, getting-started-with-vault-gsp1003, getting-started-with-vault, gsp1003

---

## Overview

In this hands-on lab you'll learn some of the fundamentals of [Hashicorp Vault](https://www.vaultproject.io/), an identity-based secrets and encryption management system. You will use the Vault development server to enable secret engines, manage authentication methods, encrypt/decrypt data, and create secrets using the CLI and web UI.

### What is Vault?

Vault is an identity-based **secrets** and encryption management system. A secret is anything that you want to tightly control access to, such as API encryption keys, passwords, or certificates. Vault provides encryption services that are gated by authentication and authorization methods. Using Vault’s UI, CLI, or HTTP API, access to secrets and other sensitive data can be securely stored and managed, tightly controlled (restricted), and auditable.

A modern system requires access to a multitude of secrets: database credentials, API keys for external services, credentials for service-oriented architecture communication, etc. Understanding who is accessing what secrets is already very difficult and platform-specific. Adding on key rolling, secure storage, and detailed audit logs is almost impossible without a custom solution. This is where Vault steps in.

Vault comes with various pluggable components called **secrets engines** and **authentication methods** allowing you to integrate with external systems. The purpose of those components is to manage and protect your secrets in dynamic infrastructure (e.g. database credentials, passwords, API keys).

![The Vault components and features diagram](https://cdn.qwiklabs.com/gK%2B7fMXfmpSh0cWXLo%2Fz8w0zTCb82Vs%2F4fFFxpViqA4%3D align="left")

The key features of Vault are:

* **Secure Secret Storage**: Arbitrary key/value secrets can be stored in Vault. Vault encrypts these secrets prior to writing them to persistent storage, so gaining access to the raw storage isn't enough to access your secrets. Vault can write to disk, Consul, and more.
    
* **Dynamic Secrets**: Vault can generate secrets on-demand for some systems, such as AWS or SQL databases. For example, when an application needs to access an S3 bucket, it asks Vault for credentials, and Vault will generate an AWS key-pair with valid permissions on demand. After creating these dynamic secrets, Vault will also automatically revoke them after the lease is up.
    
* **Data Encryption**: Vault can encrypt and decrypt data without storing it. This allows security teams to define encryption parameters and developers to store encrypted data in a location such as SQL without having to design their own encryption methods.
    
* **Leasing and Renewal**: All secrets in Vault have a lease associated with them. At the end of the lease, Vault will automatically revoke that secret. Clients are able to renew leases via built-in renew APIs.
    
* **Revocation**: Vault has built-in support for secret revocation. Vault can revoke not only single secrets, but a tree of secrets, for example all secrets read by a specific user, or all secrets of a particular type. Revocation assists in key rolling as well as locking down systems in the case of an intrusion.
    

### Objectives

In this lab, you will:

* Deploy the Vault development server
    
* Enable secrets engines
    
* Manage authentication methods
    
* Version, create, get, and destroy secrets
    
* Create and revoke authorization tokens
    
* Enable and use the `userpass` auth method
    
* Use the Vault web UI
    
* Use the transit secret engine to encrypt/decrypt data
    

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
    
    ```java
    student-03-894786abfaee@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```java
    WtU4iiWVOTSA
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-d6d77750d9d5`. The output contains a line that declares the **Project\_ID** for this session:

```java
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-d6d77750d9d5
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```java
gcloud auth list
```

Copied!

4. Click **Authorize**.
    

**Output:**

```java
ACTIVE: *
ACCOUNT: student-03-894786abfaee@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```java
gcloud config list project
```

Copied!

**Output:**

```java
[core]
project = qwiklabs-gcp-02-d6d77750d9d5
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Install Vault

1. In Cloud Shell, add the HashiCorp GPG key:
    

```java
sudo apt update && sudo apt install -y curl gnupg lsb-release
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

Copied!

2. Add the official HashiCorp Linux repository:
    

```java
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

Copied!

3. Update and install Vault:
    

```java
sudo apt-get update
sudo apt-get install vault
```

Copied!

### Verify the installation

After installing Vault, verify the installation worked by checking that the Vault binary is available.

* Execute the `vault` command to verify the installation:
    

```java
vault
```

Copied!

You should see help output similar to the following:

```java
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

**Warning:** Never run a "dev" mode server in production. It is insecure and will lose data on every restart (since it stores data in-memory). It is only made for development or experimentation.

### Starting the dev server

First, start a Vault *dev server*. The dev server is a built-in, pre-configured server that is not very secure but useful for playing with Vault locally.

1. To start the Vault dev server, run:
    

```java
vault server -dev
```

Copied!

You should see output relating to your Vault server configuration. Notice that **Unseal Key** and **Root Token** values are displayed.

```java
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
    
3. Copy and run the export `VAULT_ADDR ..` command from the **terminal output**. This will configure the Vault client to talk to the dev server.
    

```java
export VAULT_ADDR='http://127.0.0.1:8200'
```

Copied!

The Vault CLI determines which Vault servers to send requests using the `VAULT_ADDR` environment variable.

4. Save the unseal key somewhere. Don't worry about *how* to save this securely. For now, just save it anywhere.
    
5. Set the `VAULT_TOKEN` environment variable value to the generated **Root Token** value displayed in the **terminal output**:
    

```java
export VAULT_TOKEN="<REPLACE WITH YOUR ROOT TOKEN>"
```

Copied!

To interact with Vault, you must provide a valid token. Setting this environment variable is a way to provide the token to Vault via CLI. In another lab you will learn to use the `vault login <token_value>` command to authenticate with Vault.

### Verify the server is running

* Verify the server is running by issuing the `vault status` command:
    

```java
vault status
```

Copied!

If it ran successfully, the output should look like the following:

```java
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

Great! You've started your first Vault development server. In the next section you will learn how to store secrets in Vault.

## Task 3. Create your first secret

Now that the dev server is up and running, read and write your first secret.

### Key/Value secrets engine

When running Vault in dev mode, [Key/Value v2 secrets engine](https://www.vaultproject.io/docs/secrets/kv/kv-v2) is enabled at `secret/ path`. Key/Value secrets engine is a generic key-value store used to store arbitrary secrets within the configured physical storage for Vault. Secrets written to Vault are encrypted and then written to backend storage. Therefore, the backend storage mechanism *never* sees the unencrypted value and doesn't have the means necessary to decrypt it without Vault.

Key/Value secrets engine has **version 1** and **2**. The difference is that v2 provides *versioning* of secrets and v1 does not.

* Use the vault `kv <subcommand> [options] [args]` command to interact with K/V secrets engine.
    

| **Subcommand** | **kv v1** | **kv v2** | **Description** |
| --- | --- | --- | --- |
| delete | x | x | Delete versions of secrets stored in K/V |
| destroy |  | x | Permanently remove one or more versions of secrets |
| enable-versioning |  | x | Turns on versioning for an existing K/V v1 store |
| get | x | x | Retrieve data |
| list | x | x | List data or secrets |
| metadata |  | x | Interact with Vault's Key-Value storage |
| patch |  | x | Update secrets **without** overwriting existing secrets |
| put | x | x | Sets or update secrets (this **replaces** existing secrets) |
| rollback |  | x | Rolls back to a previous version of secrets |
| undelete |  | x | Restore the deleted version of secrets |

**Note:** To learn more about Key/Value v1 secrets engine, go through the [Static Secrets: Key/Value Secrets Engine](https://learn.hashicorp.com/tutorials/vault/static-secrets) tutorial.

### Write a secret

1. Before you begin, check to verify that no secrets exists at `secret/hello`:
    

```java
vault kv get secret/hello
```

Copied!

You should get the following output:

```java
No value found at secret/data/hello
```

2. Now, write a secret `foo` with value of `world` to the path `secret/hello` using the `vault kv put` command. This command creates a new version of the secrets and replaces any pre-existing data at the path if any.
    

```java
vault kv put secret/hello foo=world
```

Copied!

You should get the following output:

```java
Key              Value
---              -----
created_time     2022-01-06T21:58:06.160925771Z
deletion_time    n/a
destroyed        false
version          1
```

You will learn paths in more detail later, but for now it is important that the path is prefixed with `secret/`, otherwise this example won't work. The `secret/` prefix is where arbitrary secrets can be read and written.

3. You can even write multiple pieces of data. Execute the following command to write secrets `foo` and `excited` with the values of `world` and `yes`, respectively, to the path `secret/hello`:
    

```java
vault kv put secret/hello foo=world excited=yes
```

Copied!

You should get the following output:

```java
Key              Value
---              -----
created_time     2020-09-02T21:41:17.568155Z
deletion_time    n/a
destroyed        false
version          2
```

Notice that the `version` is now `2`.

**Warning:** The examples in this lab use the `=` input to send secrets to Vault. However, sending data as a part of the CLI command often end up in the shell history unencrypted. To avoid this, refer to the [Static Secrets: Key/Value Secrets Engine](https://learn.hashicorp.com/tutorials/vault/static-secrets) tutorial to learn different approaches.

### Get a secret

As you might expect, secrets can be retrieved with the command `vault kv get <path>`.

1. Execute the following command to retrieve the secret at the path `secret/hello`:
    

```java
vault kv get secret/hello
```

Copied!

Vault returns the latest version (in this case version `2`) of the secrets at `secret/hello`.

```java
====== Metadata ======
Key              Value
---              -----
created_time     2020-09-02T21:41:17.568155Z
deletion_time    n/a
destroyed        false
version          2

===== Data =====
Key        Value
---        -----
excited    yes
foo        world
```

2. To print only the value of a given field, use the `-field=<key_name>` flag:
    

```java
vault kv get -field=excited secret/hello
```

Copied!

```java
vault kv get -field=foo secret/hello
```

Copied!

3. Optional JSON output is very useful for scripts. For example, you can use the `jq` tool to extract the value of the `excited` secret:
    

```java
vault kv get -format=json secret/hello | jq -r .data.data.excited
```

Copied!

4. Run the following command to copy the value of the `excited` secret to a text file:
    

```java
vault kv get -format=json secret/hello | jq -r .data.data.excited > secret.txt
```

Copied!

5. Run the following command to copy this file to a pre-created Cloud Storage bucket to track your progress:
    

```java
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp secret.txt gs://$PROJECT_ID
```

Copied!

Click *Check my progress* to verify the objective.

Create Your First Secret

### Delete a secret

Now that you've learned how to read and write a secret, delete the secret using the `vault kv delete` command.

* Run the following command to delete the secret at the path `secret/hello`:
    

```java
vault kv delete secret/hello
```

Copied!

You should receive the following output:

```java
Success! Data deleted (if it existed) at: secret/hello
```

### Secret versions

In this section, you will learn how to read and delete specific versions, undelete them, and permanently delete them.

1. Run the following commands to create multiple versions of a secret defined at the path `secret/example`:
    

```java
vault kv put secret/example test=version01
vault kv put secret/example test=version02
vault kv put secret/example test=version03
```

Copied!

What if you want to read a specific version of a secret? You can do so by using the `-version` flag.

2. Run the following command to get secret version `2` from the `secret/example` path:
    

```java
vault kv get -version=2 secret/example
```

Copied!

Your output should resemble the following:

```java
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-06T22:18:54.685917586Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            2

==== Data ====
Key     Value
---     -----
test    version02
</nil>
```

3. You can also delete a specific version of a secret. Run the following command to delete version `2` of the secret:
    

```java
vault kv delete -versions=2 secret/example
```

Copied!

**Note:** If you run a `vault kv get` on that version of the secret, you can see that the data has been deleted. However, you can see that the `destroyed` value is still **false**.

4. You can also **undelete** a specific version of a secret. Run the following command to undelete version `2` of the secret:
    

```java
vault kv undelete -versions=2 secret/example
```

Copied!

**Note:** If you run a `vault kv get` on that version of the secret, you can see that the data now shows up again!

Lastly, if you want to permanently delete a version of a secret, you can use the `destroy` command.

5. Run the following command to permanently delete version `2` of the secret:
    

```java
vault kv destroy -versions=2 secret/example
```

Copied!

6. Now, try to fetch that version of the secret:
    

```java
vault kv get -version=2 secret/example
```

Copied!

You should receive the following output. Notice the `destroyed` key has been set to **true**.

```java
======= Metadata =======
Key                Value
---                -----
created_time       2022-01-06T22:18:54.685917586Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          true
version            2
</nil>
```

Great! You just learned how to interact with versioned secrets. For more information on this topic, check out the [Versioned Key/Value Secrets Engine](https://learn.hashicorp.com/tutorials/vault/versioned-kv) tutorial.

## Task 4. Secrets engines

In the previous section, you used key/value v2 secrets engine to store data. Secrets engines are Vault components which store, generate or encrypt secrets. Secrets engines are incredibly flexible, so it is easiest to think about them in terms of their function. Secrets engines are provided some set of data, they take some action on that data, and they return a result.

Some secrets engines simply store and read data - like encrypted Redis/Memcached. Some secrets engines connect to other services and generate dynamic credentials on demand. Other secrets engines provide encryption as a service, totp generation, certificates, and much more.

Secrets engines are enabled at a "path" in Vault. When a request comes to Vault, the router automatically routes anything with the route prefix to the secrets engine. In this way, each secrets engine defines its own paths and properties. To the user, secrets engines behave similar to a virtual filesystem, supporting operations like read, write, and delete.

There are a number of [secrets engines](https://www.vaultproject.io/docs/secrets) available. You can think of them as a **plugin**. Enable the secrets engine that meets your security needs.

### Secrets engines lifecycle

Most secrets engines can be enabled, disabled, tuned, and moved via the CLI or API. Previous versions of Vault called these "mounts", but that term was overloaded.

* **Enable** - This enables a secrets engine at a given path. With few exceptions, secrets engines can be enabled at multiple paths. Each secrets engine is isolated to its path. By default, they are enabled at their "type" (e.g. "gcp" enables at "gcp/").
    
* **Disable** - This disables an existing secrets engine. When a secrets engine is disabled, all of its secrets are revoked (if they support it), and all of the data stored for that engine in the physical storage layer is deleted.
    
* **Move** - This moves the path for an existing secrets engine. This process revokes all secrets, since secret leases are tied to the path they were created at. The configuration data stored for the engine persists through the move.
    
* **Tune** - This tunes global configuration for the secrets engine such as the TTLs.
    

Once a secrets engine is enabled, you can interact with it directly at its path according to its own API. Use `vault path-help` to determine the paths it responds to.

**Note:** Mount points cannot conflict with each other in Vault. There are two broad implications of this fact.

The first is that you cannot have a mount which is prefixed with an existing mount. The second is that you cannot create a mount point that is named as a prefix of an existing mount.

As an example, the mounts `foo/bar` and `foo/baz` can peacefully coexist with each other whereas `foo` and `foo/baz` cannot.

### Barrier view

Secrets engines receive a barrier view to the configured Vault physical storage. This is a lot like a [chroot](https://en.wikipedia.org/wiki/Chroot).

When a secrets engine is enabled, a random UUID is generated. This becomes the data root for that engine. Whenever that engine writes to the physical storage layer, it is prefixed with that UUID folder. Since the Vault storage layer doesn't support relative access (such as `../`), this makes it impossible for an enabled secrets engine to access other data.

This is an important security feature in Vault - even a malicious engine cannot access the data from any other engine.

### Enable a secrets engine

In the previous section, all requests started with `secret/`.

1. Try the following command which will result an error:
    

```java
vault kv put foo/bar a=b
```

Copied!

You should receive the following error:

```java
Error making API request.

URL: GET http://localhost:8200/v1/sys/internal/ui/mounts/foo/bar
Code: 403. Errors:

* preflight capability check returned 403, ... grant access to path "foo/bar/"
```

The path prefix tells Vault which secrets engine to which it should route traffic. When a request comes to Vault, it matches the initial path part using a longest prefix match and then passes the request to the corresponding secrets engine enabled at that path. Vault presents these secrets engines similar to a filesystem.

By default, Vault enables [Key/Value version2 secrets](https://www.vaultproject.io/docs/secrets/kv/kv-v2/) engine (kv-v2) at the path secret/ when running in dev mode. The key/value secrets engine reads and writes raw data to the backend storage. Vault supports many other secrets engines, and this feature makes Vault flexible and unique.

**Note:** The key/value secrets engine has two versions: `kv` (version 1) and `kv-v2` (version 2). The kv-v2 is versioned kv secrets engine which can retain a number of secrets versions.

2. Now enable the `kv` secrets engine. Each path is completely isolated and cannot talk to other paths. For example, a `kv` secrets engine enabled at `foo` has no ability to communicate with a `kv` secrets engine enabled at `bar`.
    

```java
vault secrets enable -path=kv kv
```

Copied!

The path where the secrets engine is enabled defaults to the name of the secrets engine. Thus, the following command is equivalent to executing the above command.

```java
vault secrets enable kv
```

Copied!

Executing the command will throw the following error:

```java
Error enabling: Error making API request.

URL: POST http://127.0.0.1:8200/v1/sys/mounts/kv
Code: 400. Errors:

* path is already in use at kv/
```

3. To verify your success and get more information about the secrets engine, use the `vault secrets list` command:
    

```java
vault secrets list
```

Copied!

You should receive the following output:

```java
Path          Type         Accessor              Description
----          ----         --------              -----------
cubbyhole/    cubbyhole    cubbyhole_78189996    per-token private secret storage
identity/     identity     identity_ac07951e     identity store
kv/           kv           kv_15087625           n/a
secret/       kv           kv_4b990c45           key/value secret storage
sys/          system       system_adff0898       system endpoints used for control, policy and debugging
```

This shows there are five enabled secrets engines on this Vault server. You can see the type of the secrets engine, the corresponding path, and an optional description (or "n/a" if none was given).

**Note:** The `sys/` path corresponds to the system backend. These paths interact with Vault's core system and are not required for beginners.

4. Take a few moments to read and write some data to the new `kv` secrets engine enabled at `kv/`. To create secrets, use the `kv put` command:
    

```java
vault kv put kv/hello target=world
```

Copied!

5. To read the secrets stored in the `kv/hello` path, use the `kv get` command:
    

```java
vault kv get kv/hello
```

Copied!

You should receive the following output:

```java
===== Data =====
Key       Value
---       -----
target    world
```

6. Create secrets at the `kv/my-secret` path:
    

```apache
vault kv put kv/my-secret value="s3c(eT"
```

7. Read the secrets at `kv/my-secret`:
    

```apache
vault kv get kv/my-secret
```

You should receive the following output:

```apache
==== Data ====
Key      Value
---      -----
value    s3c(eT
```

8. Run the following command to copy the value of the `excited` secret to a text file:
    

```apache
vault kv get -format=json kv/my-secret | jq -r .data.value > my-secret.txt
```

9. Run the following command to copy this file to a pre-created Cloud Storage bucket to track your progress:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp my-secret.txt gs://$PROJECT_ID
```

10. Delete the secrets at `kv/my-secret`:
    

```apache
vault kv delete kv/my-secret
```

11. List existing keys at the `kv` path:
    

```apache
vault kv list kv/
```

You should receive the following output:

```apache
Keys
----
hello
```

Click *Check my progress* to verify the objective.

Secrets Engines

### Disable a secrets engine

When a secrets engine is no longer needed, it can be disabled. When a secrets engine is disabled, all secrets are revoked and the corresponding Vault data and configuration is removed.

* Disable the `kv` secrets engine:
    

```apache
vault secrets disable kv/
```

Note that this command takes a **path** to the secrets engine as an argument, not the **type** of the secrets engine.

Any requests to route data to the original path would result in an error, but another secrets engine could now be enabled at that path.

As mentioned earlier, Vault behaves similarly to a virtual filesystem. The read/write/delete/list operations are forwarded to the corresponding secrets engine, and the secrets engine decides how to react to those operations.

This abstraction is incredibly powerful. It enables Vault to interface directly with physical systems, databases, HSMs, etc. But in addition to these physical systems, Vault can interact with more unique environments like Google Cloud IAM, dynamic SQL user creation, etc. all while using the same read/write interface.

## Task 5. Authentication

Authentication in Vault is the process by which user or machine supplied information is verified against an internal or external system. Vault supports multiple [auth methods](https://www.vaultproject.io/docs/concepts/auth#:~:text=Vault%20supports%20multiple-,auth%20methods,-including%20GitHub%2C%20LDAP) including GitHub, LDAP, AppRole, and more. Each auth method has a specific use case.

Before a client can interact with Vault, it must *authenticate* against an **auth method**. Upon authentication, a token is generated. This token is conceptually similar to a session ID on a website. The token may have attached policy, which is mapped at authentication time. This process is described in detail in the [policies concepts](https://www.vaultproject.io/docs/concepts/policies) documentation.

In this section, you'll learn about Authentication in Vault.

### Token authentication

Token authentication is automatically enabled. When you started the dev server, the output displayed a root token. The Vault CLI read the root token from the `$VAULT_TOKEN` environment variable. This root token can perform any operation within Vault because it is assigned the `root` policy. One capability is to create new tokens.

1. Run the following command to create a new token:
    

```apache
vault token create
```

You should see the following output:

```apache
Key                  Value
---                  -----
token                s.iyNUhq8Ov4hIAx6snw5mB2nL
token_accessor       maMfHsZfwLB6fi18Zenj3qh6
token_duration       ∞
token_renewable      false
token_policies       ["root"]
identity_policies    []
policies             ["root"]
```

The token is created and the output describes this token a table of keys and values. The created `token` is displayed here as `s.iyNUhq8Ov4hIAx6snw5mB2nL`.

This token is a child of the *root token*, and by default, it inherits the policies from its parent. Token is the core authentication method. You can use the generated token to login with Vault.

2. Run the following command to log in to Vault with the generated token:
    

```apache
vault login <your token>
```

You should see the following output:

```apache
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again. Future Vault requests will automatically use this token.

Key                  Value
---                  -----
token                s.iyNUhq8Ov4hIAx6snw5mB2nL
token_accessor       maMfHsZfwLB6fi18Zenj3qh6
token_duration       ∞
token_renewable      false
token_policies       ["root"]
identity_policies    []
policies             ["root"]
```

**Note:** If you see a warning about the `VAULT_TOKEN` environment variable being set, you can safely ignore it for the purposes of this lab.

3. Create another token:
    

```apache
vault token create
```

```apache
Key                  Value
---                  -----
token                s.TsKT5ubouZ7TF26Eg7wNIl3k
token_accessor       b1d0curWHYqmgCndk0G1cM6R
token_duration       ∞
token_renewable      false
token_policies       ["root"]
identity_policies    []
policies             ["root"]
```

The token is created and displayed here as `s.TsKT5ubouZ7TF26Eg7wNIl3k`. Each `token` that Vault creates is unique.

When a token is no longer needed it can be **revoked**.

4. Run the following command to revoke the first token you created:
    

```apache
vault token revoke <your token>
```

```apache
Success! Revoked token (if it existed)
```

The token has been revoked.

5. An attempt to log in with the revoked token will result in an error. Run the following command to try it out:
    

```apache
vault login <your token>
```

```apache
Error authenticating: error looking up token: Error making API request.

URL: GET http://127.0.0.1:8200/v1/auth/token/lookup-self
Code: 403. Errors:

* permission denied
```

Revoking a token will also revoke all tokens that were created by the token.

## Task 6. Auth methods

Auth methods are the components in Vault that perform authentication and are responsible for assigning identity and a set of policies to a user. In all cases, Vault will enforce authentication as part of the request processing. In most cases, Vault will delegate the authentication administration and decision to the relevant configured external auth method (e.g., Amazon Web Services, GitHub, Google Cloud Platform, Kubernetes, Microsoft Azure, Okta, etc.).

Having multiple auth methods enables you to use an auth method that makes the most sense for your use case of Vault and your organization.

For example, on developer machines, the [GitHub auth method](https://www.vaultproject.io/docs/auth/github) is easiest to use. But for servers the [AppRole](https://www.vaultproject.io/docs/auth/approle) method is the recommended choice.

To learn more about authentication, see the [authentication concepts page](https://www.vaultproject.io/docs/concepts/auth).

### Enabling/Disabling auth methods

1. Auth methods can be enabled/disabled using the CLI or the API. Start by enabling the `userpass` auth method:
    

```apache
vault auth enable userpass
```

When enabled, auth methods are similar to [secrets engines](https://www.vaultproject.io/docs/secrets): they are mounted within the Vault mount table and can be accessed and configured using the standard read/write API. All auth methods are mounted underneath the `auth/` prefix.

By default, auth methods are mounted to `auth/<type>`. For example, if you enable "github", then you can interact with it at `auth/github`. However, this path is customizable, allowing users with advanced use cases to mount a single auth method multiple times.

For example:

```apache
vault auth enable -path=my-login userpass
```

2. Disable the `userpass` auth method:
    

```apache
vault auth disable userpass
```

### External auth method considerations

When using an external auth method (e.g., GitHub), Vault will call the external service at the time of authentication and for any subsequent token renewals. This means that issued tokens are valid for their entire duration, and are not invalidated until a renewal or user re-authentication occurs. Operators should ensure appropriate token TTLs are set when using these auth methods.

### Userpass auth method

The `userpass` auth method allows users to authenticate with Vault using a username and password combination. The username/password combinations are configured directly to the auth method using the `users/` path. This method cannot read usernames and passwords from an external source.

**Note:** The method lowercases all submitted usernames, e.g. `Mary` and `mary` are the same entry.

1. Start by re-enabling the `userpass` auth method:
    

```apache
vault auth enable userpass
```

2. Configure it with a user that is allowed to authenticate:
    

```apache
vault write auth/userpass/users/admin password=password! policies=admin
```

This creates a new user **admin** with the password **password!** that will be associated with the **admins** policy. This is the only configuration necessary.

**Note:** You haven't created any policies yet. Policies are covered in a [subsequent lab](https://www.cloudskillsboost.google/catalog_lab/4698).

3. Now, you can log in to Vault with your newly created username and password:
    

```apache
vault login -method=userpass username=admin password=password!
```

You should see the following output:

```apache
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again. Future Vault requests will automatically use this token.

Key                    Value
---                    -----
token                  s.SUdfbC2TPAemwRKvYP6NRlAz
token_accessor         XKJ9peHDgPwK9gGs3YZmYeFB
token_duration         768h
token_renewable        true
token_policies         ["admin" "default"]
identity_policies      []
policies               ["admin" "default"]
token_meta_username    admin
```

Great! You created a new user with the `userpass` auth method in Vault and successfully logged in. In the next section, you will use the Vault web UI to create secrets, add authentication methods, and use the Transit secrets engine.

## Task 7. Use the Vault web UI

1. First, click on the **web preview icon** on the toolbar of Cloud Shell.
    

![The web preview icon on the toolbar](https://cdn.qwiklabs.com/OLFGboKgKleMinJjp0qj8J713XImthsD7PvdxjmW9Uw%3D align="left")

2. Click **Change port**.
    
3. Change the Port Number to `8200` and click **Change and Preview**.
    

![The port number displayed in the Change Preview Port dialog](https://cdn.qwiklabs.com/9wLXL7KtGaMJ6KQ8VD24cIyD81m%2ByaxzfR3VDR0%2BztQ%3D align="left")

4. You should be redirected to the Vault sign in page.
    

![The Sign in to Vault dialog](https://cdn.qwiklabs.com/rZ9T%2BPXR2kK6uCui7Q2gyPyPCiBQUKx%2F8VeSeZQNlz8%3D align="left")

5. Enter the **Root Token** that you saved earlier in the lab and click **Sign In**.
    

Your Vault development server should resemble the following.

![The Secrets Engines page](https://cdn.qwiklabs.com/KwzoiYM4MGIRNuMwA%2BBvT%2BAD1lcLemfU4YWkxCPXS5Y%3D align="left")

Now that you're logged in to the development server web UI, you can continue on to the next section to enable a new secrets engine.

### Enable the transit secrets engine

The [transit secrets engine](https://www.vaultproject.io/docs/secrets/transit) handles cryptographic functions on data in-transit. Vault doesn't store the data sent to the secrets engine. It can also be viewed as "cryptography as a service" or "encryption as a service". The transit secrets engine can also sign and verify data; generate hashes and HMACs of data; and act as a source of random bytes.

The primary use case for transit is to encrypt data from applications while still storing that encrypted data in some primary data store. This relieves the burden of proper encryption/decryption from application developers and pushes the burden onto the operators of Vault.

In this section, you will enable the transit secrets engine in the UI and use it to encrypt example data.

1. From the left menu, select **Secrets Engines**.
    
2. Under **Secrets Engines**, select **Enable new engine**.
    
3. Under **Enable a Secrets Engine**, select **Transit**.
    

The minimal required configuration to enable the Transit secrets engine is a value for **Path**. Vault supports enabling multiple secrets engines at various paths so long as they are unique. If you have not previously configured a Transit secrets engine, then the default path "transit" is acceptable.

3. Keep the default `transit` path and click **Method Options**.
    

You can use these options to add a description, fine tune the mount configuration, adjust default time-to-live (TTL) values, filter keys in audit devices and allow specific headers.

The Vault API documentation for [/sys/mounts API Parameters](https://www.vaultproject.io/api-docs/system/mounts#parameters) is a great reference for learning more about these options and how they are configured.

For now, you won't be configuring any of these.

4. Select **Enable Engine** to enable the Transit secrets engine.
    

The Transit secrets engine is successfully enabled at the path `transit`. Before you can encrypt and decrypt data in Transit, you need to create a key that will be used for those purposes.

### Create encryption key

1. Click **Create key** to begin the key creation process.
    
2. Enter `my-key` into the **Name** field to name it.
    

Vault supports a range of key types; leave Type set to the default value "aes256-gcm96" for this tutorial.

For now, you also do not need to be concerned with the other options, **Exportable**, **Derived**, and **Enable** convergent encryption. You can learn more about key creation parameters, including details on key types from the [Create Key API documentation](https://www.vaultproject.io/api-docs/secret/transit#create-key).

3. Select **Create key** to create the key.
    

### Encrypt plaintext

1. Select **transit** to navigate back to the list of Transit secrets engine keys.
    
2. Select **my-key** from the list of transit keys to encrypt some plaintext.
    
3. Select **Encrypt** from the available **Key Actions**.
    
4. Enter `Learn Vault!` into the **Plaintext** area.
    
5. Click **Encrypt**.
    
6. The ciphertext is returned in a dialog that allows for copying it to the clipboard. Select **Copy & Close** to dismiss the dialog.
    

Keep the plaintext string handy; here is a ciphertext example:

```apache
vault:v1:VGCOXenNqz4gb4z7SLBHrqKB8FtKUhj8wmhVVEvT/lMd4FqlvzoQGA==
```

Copied!

**Note:** Since you created a Transit key with default options, it is expected to get different ciphertext output for the same plaintext, so your result will vary from the example shown. If you enable [Convergent Encryption](https://www.vaultproject.io/docs/secrets/transit#convergent-encryption) with certain key types however, you can produce the same ciphertext for the same plaintext on every encrypt operation.

### Decrypt ciphertext

1. Under **Key Actions**, select **Decrypt**.
    
2. Paste the ciphertext string from the previous step into the **Ciphertext** area.
    
3. Select **Decrypt**.
    

A dialog returns the base64 encoded plaintext (e.g. `TGVhcm4gVmF1bHQh`).

4. Select **Copy & Close**.
    
5. Navigate back to your open Cloud Shell terminal and run the following command to decrypt your base64 encoded plaintext string and write it out to a file:
    

```apache
echo '<your string>' | base64 --decode > decrypted-string.txt
```

6. **Verify** the expected output matches the original plaintext: `Learn Vault!`:
    

```apache
cat decrypted-string.txt
```

7. Copy this file to a pre-created Cloud Storage bucket to track your progress:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp decrypted-string.txt gs://$PROJECT_ID
```

**Note:** For more information on the transit secrets engine and how to use it in the CLI, you can check out the [documentation page](https://www.vaultproject.io/docs/secrets/transit).

Click *Check my progress* to verify the objective.

Use the Vault web UI

### Manage authentication methods

As mentioned earlier, authentication methods are the components in Vault that perform identity validation of Vault clients and responsible for assigning a set of policies to an authenticated client. In this section, you will enable an authentication method in the UI and generate login credentials.

1. Select the **Access** view from the left menu.
    

This view is the index and displays all authentication methods, entities, groups, and leases. The token authentication method was enabled when Vault was initialized and cannot be disabled.

2. Select the **Enable new method** action from within the view.
    

This view displays all of the authentication methods that this version of Vault supports.

3. Choose the **Username & Password** method.
    

This view displays the path and the ability to configure the auth method. The path defaults to "userpass."

4. Change the mount path to `userpass-ui` and click **Enable Method**.
    

The authentication method is created. The view displays its configuration page.

### Create credentials

The User and Password authentication method, abbreviated as userpass, enables the creation of credentials for individual users.

1. Select the **View method** action from within the view.
    
2. Select the **Create user** action from within the view. This view displays the ability to create a custom login for a user.
    
3. Enter `demo` in the **Username** field. Enter `password!` in the **Password** field.
    
4. Select **Save**.
    

### Authenticate with credentials

You are currently logged in with the root token. To log in with these user credentials requires you to log out first.

1. Open the **Profile** submenu. Select **Log Out**.
    

You are now logged out of the server.

2. Choose `Userpass` from the **Method** list. The view changes to show a username and password login interface.
    
3. Enter `demo` in the **Username** field. Enter `password!` in the **Password** field.
    
4. Click the **More Options** dropdown.
    
5. Enter `userpass-ui` for the **Mount Path** field.
    
6. Click **Sign In**.
    
7. You are now logged in through the userpass authentication method you just created!
    

The capabilities of this user are limited to the policies assigned to this user's auth method. Since you didn't assign any specific policies, the user has been given the *default* policy. You will learn about Vault policies in the following lab.

---

## Solution of Lab

%[https://youtu.be/CeLrwTixomo] 

```apache
sudo apt update && sudo apt install -y curl gnupg lsb-release
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt-get update
sudo apt-get install vault -y
vault
vault server -dev
```

```apache
export VAULT_ADDR='http://127.0.0.1:8200'
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755414367852/db64e1ea-177f-497c-8cd2-206c865a1262.png align="center")

```apache
export VAULT_TOKEN=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755414459437/57fc3de1-dc57-44b3-aac1-5a6ef12a80ca.png align="center")

```apache
vault status
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755414496650/e7178bec-6b5b-4a33-959e-b88ae69eb449.png align="center")

```apache
vault kv get secret/hello
vault kv put secret/hello foo=world
vault kv put secret/hello foo=world excited=yes
vault kv get secret/hello
vault kv get -field=excited secret/hello
vault kv get -field=foo secret/hello
vault kv get -format=json secret/hello | jq -r .data.data.excited
vault kv get -format=json secret/hello | jq -r .data.data.excited > secret.txt
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp secret.txt gs://$PROJECT_ID
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755414672397/19ad38a2-86cc-4b1e-9ae9-772d02725201.png align="center")

```apache
vault kv delete secret/hello
vault kv put secret/example test=version01
vault kv put secret/example test=version02
vault kv put secret/example test=version03
vault kv get -version=2 secret/example
vault kv delete -versions=2 secret/example
vault kv undelete -versions=2 secret/example
vault kv destroy -versions=2 secret/example
vault kv get -version=2 secret/example
vault kv put foo/bar a=b
vault secrets enable -path=kv kv
vault secrets enable kv
vault secrets list
vault kv put kv/hello target=world
vault kv get kv/hello
vault kv put kv/my-secret value="s3c(eT"
vault kv get kv/my-secret
vault kv get -format=json kv/my-secret | jq -r .data.value > my-secret.txt
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp my-secret.txt gs://$PROJECT_ID
vault kv delete kv/my-secret
vault kv list kv/
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755414988314/d5a1edbc-f467-45f5-8835-a9b7dad7d92e.png align="center")

```apache
vault secrets disable kv/
vault token create
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415113337/2deab11f-3a06-42c4-ac22-97be86be5025.png align="center")

```apache
vault login <your token>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415267470/1fc5c347-f239-4646-9cc3-4396f4139607.png align="center")

```apache
vault token revoke <your token>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415340702/c46e852b-b92a-4dcf-b6a7-8fcfe202434b.png align="center")

```apache
vault login <your token>
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415404303/ca2c050a-0904-480c-a00f-f7e2f05b2ba3.png align="center")

```apache
vault auth enable userpass
vault auth enable -path=my-login userpass
vault auth disable userpass
vault auth enable userpass
vault write auth/userpass/users/admin password=password! policies=admin
vault login -method=userpass username=admin password=password!
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415645079/81e4bea7-b510-4f0a-9904-107a8cc3b13b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415670334/0b5cc6b8-75d9-4f1e-8e55-78928b8160d4.png align="center")

**Change port**

```apache
8200
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415877465/61eb658c-df0f-4a37-a474-bc71df11db38.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415865919/787b6a87-d9ef-40b5-abfb-6051c5dc8ec5.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415924786/ce9e9443-0ffa-42b7-911c-26f404eba8d3.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415983356/21f337b1-ba5b-4085-9a84-7784d3f786bc.png align="center")

```apache
my-key
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755416420000/7e1d255e-c5da-4983-9240-8d715d8b2b44.png align="center")

```apache
Learn Vault!
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417003527/7f7ebf3a-f4b5-474b-a029-bcd7416d1aef.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755417042801/528dbef8-2cff-41e8-9194-f9a34bca2732.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755416966366/ae3442dc-7e40-44bc-9d6c-31bf700847c0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755416851033/b6548686-1232-4c51-8d63-80f723cd928b.png align="center")

```apache
echo '<your string>' | base64 --decode > decrypted-string.txt
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755416789422/3a2e36eb-1212-4aa1-b871-4a61302109e9.png align="center")

```apache
cat decrypted-string.txt
export PROJECT_ID=$(gcloud config get-value project)
gsutil cp decrypted-string.txt gs://$PROJECT_ID
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755416763196/f1f382a4-a5c9-46f3-bda4-7e05ff4920a6.png align="center")