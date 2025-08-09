---
title: "Running a Dedicated Ethereum RPC Node in Google Cloud - GSP1116"
seoTitle: "Running a Dedicated Ethereum RPC Node in Google Cloud - GSP1116"
seoDescription: "Deploy a dedicated Ethereum RPC node on Google Cloud for secure, scalable blockchain development"
datePublished: Thu Aug 07 2025 12:07:19 GMT+0000 (Coordinated Universal Time)
cuid: cme1cqwqe000a02ju88e6djxg
slug: running-a-dedicated-ethereum-rpc-node-in-google-cloud-gsp1116
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754568363141/3726e58e-a32e-4988-931b-f1ce3bc78468.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754568387921/8affab73-d2d9-40ed-8726-2dd93a24bd9d.png
tags: ethereum, running-a-dedicated-ethereum-rpc-node-in-google-cloud, gsp1116, ethereum-rpc-node

---

## Overview

Hosting your own blockchain nodes may be required for security, compliance, performance or privacy. And a decentralized, resilient and sustainable network is a critical foundation for any blockchain protocol. Web3 developers can use [Google Cloud's Blockchain Node Engine](https://cloud.google.com/blog/products/infrastructure-modernization/introducing-blockchain-node-engine), a fully managed node-hosting solution for Web3 development. Organizations can also configure and manage their own nodes in Google Cloud. As the trusted partner for Web3 infrastructure, Google Cloud offers secure, reliable, and scalable node hosting infrastructure. To learn more about Hosting nodes on Google Cloud, visit blog post [**Introducing Blockchain Node Engine: fully managed node-hosting for Web3 development**](https://cloud.google.com/blog/products/infrastructure-modernization/introducing-blockchain-node-engine).

To learn more about technical considerations and architectural decisions you need to make when you deploy self-managed blockchain nodes to the cloud; please visit blog post [**Google Cloud for Web3**](https://cloud.google.com/web3).

![The dedicated node hosting diagram, which includes the blockchain network and your dApp's.](https://cdn.qwiklabs.com/oR%2B1KqlVAHvjZHg4XCrXIhn%2B8JsUHpoLDRdNrY7T2nU%3D align="left")

In this lab, you create a virtual machine (VM) to deploy an Ethereum RPC node. An Ethereum RPC node is capable of receiving blockchain updates from the network and processing RPC API requests. You use a e2-standard-4 machine type that includes a 20-GB boot disk, 4 virtual CPUs (vCPU) and 16 GB of RAM. To ensure there is enough room for the blockchain data, you attach a 200GB SSD disk to the instance. You use Ubuntu 20.04 and deploy two services: Geth, the "execution layer" and Lighthouse, the "consensus layer". Both of these services work together to form an Ethereum RPC node.

### Objectives

In this lab, you learn how to perform the following tasks:

* Create a Compute Engine instance with a persistent disk.
    
* Configure a static IP address and network firewall rules.
    
* Schedule regular backups.
    
* Deploy Geth, the execution layer for Ethereum.
    
* Deploy Lighthouse, the consensus layer for Ethereum.
    
* Make Ethereum RPC calls.
    
* Configure Cloud Logging.
    
* Configure Cloud Monitoring.
    
* Configure uptime checks.
    

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
    student-03-63e83aa85b87@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    SjrnbJpQdP69
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

In this lab, you use the following tools:

* Ubuntu 24.04
    
* Geth
    
* Lighthouse
    
* Curl
    
* Gcloud
    

## Task 1. Create infrastructure for the Virtual Machine

Create a public static IP address, firewall rule, service account, snapshot schedule and a virtual machine with the new IP address. This is the infrastructure that Ethereum is deployed to.

### Create a public static IP address

In this section, you set up the public IP address used for the virtual machine.

1. From the Navigation menu, under the **VPC Network** section, click **IP Addresses**.
    
2. Click on **RESERVE EXTERNAL STATIC IP ADDRESS** in the action bar to create the static IP address.
    
3. For the static address configuration, use the following:
    

| **Property** | **Value** (type or select) |
| --- | --- |
| Name | eth-mainnet-rpc-ip |
| Network Service Tier | Premium |
| IP version | IPv4 |
| Type | Regional |
| Region | `us-west1` |
| Attached to | None |

![The static address configuration page, which includes the aforementioned fields.](https://cdn.qwiklabs.com/6aqltlSkZbSQ34heDvJ5CkRIHDWqm0kBAJscJsw1Zfw%3D align="left")

4. Click **RESERVE**.
    

### Create a firewall rule

Create Firewall rules so that the VM can communicate on designated ports.

Geth P2P communicates on TCP and UDP on port 30303. Lighthouse P2P communicates on TCP and UDP on port 9000. Geth RPC uses TCP 8545.

1. From the Navigation menu, under the **VPC Network** section, click **Firewall**.
    
2. Click on **CREATE FIREWALL RULE** in the action bar to create the firewall rules.
    
3. For the firewall configuration, use the following:
    

| **Property** | **Value** (type or select) |
| --- | --- |
| Name | eth-rpc-node-fw |
| Logs | Off |
| Network | default |
| Priority | 1000 |
| Direction | Ingress |
| Action on match | Allow |
| Targets | Specified target tags |
| Target Tags | eth-rpc-node (hit enter after typing in value) |
| Source Filter | IPv4 ranges |
| Source IPv4 ranges | 0.0.0.0/0 (hit enter after typing in value) |
| Specified protocols and ports: | TCP: 30303, 9000, 8545 UDP: 30303, 9000 |

![The Create a firewall rule page, which includes the aforementioned fields](https://cdn.qwiklabs.com/H6RMnJGm8mSplWPocuUOUZiWSPfSpvTqzEAIRNCAYR8%3D align="left")

4. Click **CREATE**.
    

### Create a service account

Create a service account for the VM to operate under.

1. From the Navigation Menu, under the **IAM & Admin** section, click **Service Accounts**.
    
2. Click on **CREATE SERVICE ACCOUNT** in the action bar to create the service account.
    
3. For the service account configuration, use the following:
    

| **Property** | **Value** (type or select) |
| --- | --- |
| Service account name | eth-rpc-node-sa |
| Service account ID | eth-rpc-node-sa |

![The Create service account page, which includes the aforementioned fields](https://cdn.qwiklabs.com/0Kl737qJnk1Dd5TLtQYMbrum%2B6ER8m%2FcG1Vd1FK%2FJkQ%3D align="left")

4. Click **CREATE AND CONTINUE**.
    
5. Add the following roles:
    

| **Property** | **Value** (type or select) |
| --- | --- |
| Roles | `Compute OS Login`, `Service Controller`, `Logs Writer`, `Monitoring Metric Writer`, `Cloud Trace Agent`, `Compute Network User` |

![The Grant this service account access to project page, with the aformentioned roles displayed.](https://cdn.qwiklabs.com/v1hfiZZ6TIVcmaysieezDbZ2WB%2BN0d8Fkf26zCQP19k%3D align="left")

6. Click **CONTINUE**.
    
7. Click **DONE**.
    

### Create a snapshot schedule

In this section, you set up the snapshot schedule used for the virtual machine's attached disk, which contains the blockchain data. This will backup the chain data.

1. From the Navigation Menu, under the **Compute Engine** section, click **Snapshots**.
    
2. Click **CREATE SNAPSHOT SCHEDULE** to create the snapshot schedule.
    
3. For the snapshot schedule, use the following:
    

| **Property** | **Value** (type or select) |
| --- | --- |
| Name | eth-mainnet-rpc-node-disk-snapshot |
| Region | `us-west1` |
| Regional | `us-west1` |
| Schedule Options | Schedule frequency: `Daily`, Start time (UTC): `6:00 PM - 7:00 PM`, Autodelete snapshots after: `7` |
| Deletion rule | Keep snapshots |

4. Click **CREATE**.
    

![The Create a snapshot schedule page, which includes the aforementioned fields](https://cdn.qwiklabs.com/XhK3NjGRm6edcvxmZl5iN8HP%2F0r%2FFS1E%2BC9U4W%2B17bk%3D align="left")

### Create a Virtual Machine

In this section, you set up the virtual machine used for the Ethereum deployment.

1. From the **Navigation Menu**, under the **Compute Engine** section, click **VM Instances**.
    
2. Click on **Create Instance** to create the VM.
    
3. In the **Machine configuration**
    
    Enter the value for the following field:
    
    | **Property** | **Value** (type or select) |
    | --- | --- |
    | **Name** | eth-mainnet-rpc-node |
    | **Region** | `us-west1` |
    | **Zone** | `us-west1-a` |
    | **Series** | `E2` |
    | **Machine type** | `e2-standard-4` |
    
4. Click **OS and Storage**
    
    Click **Change** and select the following values:
    
    | **Property** | **Value**(type or select) |
    | --- | --- |
    | **Operating System** | Ubuntu |
    | **Version** | Ubuntu 24.04 LTS (x86/64) |
    | **Boot disk type** | SSD persistent disk |
    | **Size** | 50GB |
    
    Click **Select**.
    
    In **Additional disks**, click **Add New Disk**
    
    | **Property** | **Value**(type or select) |
    | --- | --- |
    | **Name** | eth-mainnet-rpc-node-disk |
    | **Disk source type** | Blank disk |
    | **Disk Type** | SSD persistent disk |
    | **Size** | 200GB (Alternatively 2,000GB for larger installations) |
    
    Click **Save**.
    
5. Click **Data protection**
    
    For Snapshot schedules select `eth-mainnet-rpc-node-disk-snapshot`
    
6. Click **Networking**
    
    | **Property** | **Value** (type or select) |
    | --- | --- |
    | **Network tags** | eth-rpc-node (hit enter after typing in value - matches with firewall setting) |
    
    * In **Network Interfaces** click **default**:
        
    * Under **Network interface card** select **gVNIC**
        
    * **External IPv4 address**: `eth-mainnet-rpc-ip` (select the static IP address created earlier)
        
        Click **DONE**.
        
7. Click **Security**
    
    * Under **Identity and API Access**, SELECT the service account `eth-rpc-node-sa`.
        
    * Click **CREATE**.
        

Click **Check my progress** to verify the objective.

Create Infrastructure for the Virtual Machine

## Task 2. Setup and Installation on the Virtual Machine

Now, ssh into the VM and run the commands to install the software.

### SSH into the VM

1. From the navigation menu, under the **Compute Engine** section, click **VM Instances**.
    
2. On the same row as **eth-mainnet-rpc-node**, click **SSH** to open a ssh window.
    
3. If prompted **Allow SSH-in-browser to connect to VMs**, click **Authorize**.
    

### Create a Swap File on the VM

To give the processes extra RAM, you'll create a swap file. This is to increase the amount of RAM that the VM can use if it needs to.

1. To create a 40GB swap file, execute the following command:
    

```apache
sudo dd if=/dev/zero of=/swapfile bs=1MiB count=40KiB
```

Note that the first command will take a little time to execute.

2. Update the permissions on the swap file:
    

```apache
sudo chmod 0600 /swapfile
```

3. Designate the file to be used as a swap partition:
    

```apache
sudo mkswap /swapfile
```

4. Add the swap file configuration to /etc/fstab, which allows the mounted drive to be recognized upon reboot:
    

```apache
echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab
```

5. Enable the swap file:
    

```apache
sudo swapon -a
```

6. Confirm the swap has been recognized:
    

```apache
free -g
```

You should see a message with a line similar to this:

**Output:**

```apache
           total  used   free  shared  buff/cache   available
Mem:          15     0      0     0            15          15
Swap:         24     0     24
```

### Mount the attached disk on the VM

During the VM setup, you created an attached disk. The VM will not automatically recognize this. It needs to be formatted and "mounted" before it can be used.

1. View the attached disk. You should see an entry for **sdb** with the size as 200GB:
    

```apache
sudo lsblk
```

2. Format the attached disk:
    

```apache
sudo mkfs.ext4 -m 0 -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/sdb
```

3. Create the folder and mount the attached disk:
    

```apache
sudo mkdir -p /mnt/disks/chaindata-disk
sudo mount -o discard,defaults /dev/sdb /mnt/disks/chaindata-disk
```

4. Update the permissions for the folder so processes can read/write to it:
    

```apache
sudo chmod a+w /mnt/disks/chaindata-disk
```

5. Retrieve the disk ID of the mounted drive to confirm that the drive was mounted:
    

```apache
sudo blkid /dev/sdb
```

You should see a message similar to the one displayed in the output box below:

**Output:**

```apache
/dev/sdb: UUID="7fa9c421-0054-4555-b0ca-b470a97a3d84" TYPE="ext4"
```

6. Retrieve the disk ID of the mounted disk and append it to the /etc/fstab file. This file ensures that the drive will still be mounted if the VM restarts.
    

```apache
export DISK_UUID=$(findmnt -n -o UUID /dev/sdb)
echo "UUID=$DISK_UUID /mnt/disks/chaindata-disk ext4 discard,defaults,nofail 0 2" | sudo tee -a /etc/fstab
```

7. Run the df command to confirm that the disk has been mounted, formatted and the correct size has been allocated:
    

```apache
df -h
```

You should see a message with a line similar to this, which shows the new mounted volume and the size:

**Output:**

```apache
/dev/sdb        196G   28K  196G   1% /mnt/disks/chaindata-disk
```

If you need to resize the disk later, follow [these instructions](https://cloud.google.com/compute/docs/disks/resize-persistent-disk#increase_the_size_of_a_disk).

Click **Check my progress** to verify the objective.

Create a Swap File on the VM and Mount the Attached Disk on the VM

### Create a user on the VM

Create a user to run the processes under.

1. To create a user named ethereum, execute the following commands:
    

```apache
sudo useradd -m ethereum
sudo usermod -aG sudo ethereum
sudo usermod -aG google-sudoers ethereum
```

2. Switch to the ethereum user:
    

```apache
sudo su ethereum
```

3. Start the bash command line:
    

```apache
bash
```

4. Change to the ethereum user's home folder:
    

```apache
cd ~
```

### Install the Ethereum software

1. Update the Operating System:
    

```apache
sudo apt update -y
sudo apt-get update -y
```

2. Install common software:
    

```apache
sudo apt install -y dstat jq
```

3. Install the Google Cloud Ops Agent:
    

```apache
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
```

4. Remove the script file that was downloaded:
    

```apache
rm add-google-cloud-ops-agent-repo.sh
```

5. Create folders for the logs and chaindata for the Geth and Lighthouse clients:
    

```apache
mkdir /mnt/disks/chaindata-disk/ethereum/
mkdir /mnt/disks/chaindata-disk/ethereum/geth
mkdir /mnt/disks/chaindata-disk/ethereum/geth/chaindata
mkdir /mnt/disks/chaindata-disk/ethereum/geth/logs
mkdir /mnt/disks/chaindata-disk/ethereum/lighthouse
mkdir /mnt/disks/chaindata-disk/ethereum/lighthouse/chaindata
mkdir /mnt/disks/chaindata-disk/ethereum/lighthouse/logs
```

6. Install Geth from the package manager:
    

```apache
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get -y install ethereum
```

7. Confirm that Geth is available and is the latest version:
    

```apache
geth version
```

You should see a message with a line similar to this:

**Output:**

```apache
Geth
Version: 1.14.11-stable
Git Commit: ea9e62ca3db5c33aa7438ebf39c189afd53c6bf8
Architecture: amd64
Go Version: go1.23.1
Operating System: linux
GOPATH=
GOROOT=
```

8. Download the Lighthouse client. This script will download the latest release from GitHub.
    

```apache
# Fetch the latest release information from GitHub API
RELEASE_URL="https://api.github.com/repos/sigp/lighthouse/releases/latest"
LATEST_VERSION=$(curl -s $RELEASE_URL | jq -r '.tag_name')

# Download the latest release using curl
DOWNLOAD_URL=$(curl -s $RELEASE_URL | jq -r '.assets[] | select(.name | endswith("x86_64-unknown-linux-gnu.tar.gz")) | .browser_download_url')

curl -L "$DOWNLOAD_URL" -o "lighthouse-${LATEST_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
```

9. Extract the lighthouse tar file and remove:
    

```apache
# Extract the tar file
tar -xvf "lighthouse-${LATEST_VERSION}-x86_64-unknown-linux-gnu.tar.gz"

# Remove the tar file
rm "lighthouse-${LATEST_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
```

10. Move the lighthouse binary to the /usr/bin folder and update the permissions:
    

```apache
sudo mv lighthouse /usr/bin
```

11. Confirm that lighthouse is available and is the latest version:
    

```apache
lighthouse --version
```

You should see a message with a line similar to this, note that the version number might be different:

**Output:**

```apache
Lighthouse v5.3.0-d6ba8c3
BLS library: blst-portable
BLS hardware acceleration: true
SHA256 hardware acceleration: false
Allocator: jemalloc
Profile: maxperf
Specs: mainnet (true), minimal (false), gnosis (true)
```

12. Create the shared JWT secret. This JWT secret is used as a security mechanism that restricts who can call the execution client's RPC endpoint.
    

```apache
cd ~
mkdir ~/.secret
openssl rand -hex 32 > ~/.secret/jwtsecret
chmod 440 ~/.secret/jwtsecret
```

Click **Check my progress** to verify the objective.

Create a User on the VM and Install the Ethereum software

## Task 3. Start the Ethereum Execution and Consensus Clients

Ethereum has two clients: Geth - the execution layer, and Lighthouse - the consensus layer. They run in parallel with each other and work together. Geth will then establish an authrpc endpoint and port that Lighthouse will call. This endpoint is protected by a common security token saved locally. Lighthouse connects to Geth using the execution endpoint and security token.

For information on how Geth connects to the consensus client, read the [Connecting to Consensus Clients documentation](https://geth.ethereum.org/docs/getting-started/consensus-clients). For more information on how lighthouse connects to the execution client, take a look at the [Merge Migration - Lighthouse Book documentation](https://lighthouse-book.sigmaprime.io/merge-migration.html#connecting-to-an-execution-engine).

### Start Geth

The following starts the Geth execution client.

1. First, authenticate in gcloud. Inside the SSH session, run:
    

```apache
gcloud auth login
```

Press ENTER when you see the prompt Do you want to continue (Y/n)?

2. Navigate to the link displayed in a new tab.
    
3. Click on your active username (`student-03-63e83aa85b87@qwiklabs.net`), and click Allow.
    
4. When you see the prompt **Enter the following verification code in gcloud CLI on the machine you want to log into**, click on the copy button then go back to the SSH session, and paste the code into the prompt **Enter authorization code:**.
    
5. Set the external IP address environment variable:
    

```apache
export CHAIN=eth
export NETWORK=mainnet
export EXT_IP_ADDRESS_NAME=$CHAIN-$NETWORK-rpc-ip
export EXT_IP_ADDRESS=$(gcloud compute addresses list --filter=$EXT_IP_ADDRESS_NAME --format="value(address_range())")
```

6. Run the following command to start Geth as a background process. In this lab, you use the "snap" sync mode, which is a light node. To sync as a full node, use "full" as the sync mode. You can run this at the command line or save this to a .sh file first and then run it. You can also configure it to run as a service with systemd.
    

```apache
nohup geth --datadir "/mnt/disks/chaindata-disk/ethereum/geth/chaindata" \
--http.corsdomain "*" \
--http \
--http.addr 0.0.0.0 \
--http.port 8545 \
--http.corsdomain "*" \
--http.api admin,debug,web3,eth,txpool,net \
--http.vhosts "*" \
--gcmode full \
--cache 2048 \
--mainnet \
--metrics \
--metrics.addr 127.0.0.1 \
--syncmode snap \
--authrpc.vhosts="localhost" \
--authrpc.port 8551 \
--authrpc.jwtsecret=/home/ethereum/.secret/jwtsecret \
--txpool.accountslots 32 \
--txpool.globalslots 8192 \
--txpool.accountqueue 128 \
--txpool.globalqueue 2048 \
--nat extip:$EXT_IP_ADDRESS \
&> "/mnt/disks/chaindata-disk/ethereum/geth/logs/geth.log" &
```

Click **Check my progress** to verify the objective.

Start Geth as a background process and use the snap sync mode

7. To see the process id, run this command:
    

```apache
ps -A | grep geth
```

8. Check the logs to see if the process started correctly:
    

```apache
tail -f /mnt/disks/chaindata-disk/ethereum/geth/logs/geth.log
```

You should see a message similar to the one displayed in the output box below. The Geth client won't continue until it pairs with a consensus client.

**Output:**

```apache
Looking for peers                        peercount=1 tried=27 static=0
Post-merge network, but no beacon client seen. Please launch one to follow the chain!
```

9. Enter **Ctrl+C** to break out of the log monitoring.
    

### Start Lighthouse

Now, you'll start the lighthouse consensus client.

1. Run the following command to launch lighthouse as a background process. You can run this at the command line or save this to a .sh file first and then run it. You can also configure it to run as a service with systemd.
    

```apache
nohup lighthouse bn \
--network mainnet \
--http \
--metrics \
--datadir /mnt/disks/chaindata-disk/ethereum/lighthouse/chaindata \
--execution-jwt /home/ethereum/.secret/jwtsecret \
--execution-endpoint http://localhost:8551 \
--checkpoint-sync-url https://sync-mainnet.beaconcha.in \
--disable-deposit-contract-sync \
&> "/mnt/disks/chaindata-disk/ethereum/lighthouse/logs/lighthouse.log" &
```

2. To see the process id, run the following command:
    

```apache
ps -A | grep lighthouse
```

3. Check the log file to see if the process started correctly. This may take a few minutes to show up:
    

```apache
tail -f /mnt/disks/chaindata-disk/ethereum/lighthouse/logs/lighthouse.log
```

You should see a message similar to the following:

**Output:**

```apache
INFO Syncing
INFO Synced
INFO New block received
```

4. Enter **Ctrl+C** to break out of the log monitoring.
    
5. Check the Geth log again to confirm that the logs are being generated correctly.
    

```apache
tail -f /mnt/disks/chaindata-disk/ethereum/geth/logs/geth.log
```

You should see a message similar to the one displayed in the output box below.

**Output:**

```apache
Syncing beacon headers
```

#### Verify node has been synced with the blockchain

Determine if the node is still syncing. It will take some time for the node to sync. (Note that you don't need to wait for the node to sync to complete the lab) There are two ways to find out the sync status: Geth and an RPC call.

1. Run the following Geth command to check if the node is still syncing. Output of "false" means that it is synced with the network.
    

```apache
geth attach /mnt/disks/chaindata-disk/ethereum/geth/chaindata/geth.ipc
```

2. At the Geth console execute:
    

```apache
eth.syncing
```

You should see something similar to the following:

**Output:**

```apache
#If not synced:

{
currentBlock: 5186007,
healedBytecodeBytes: 0,
healedBytecodes: 0,
healedTrienodeBytes: 0,
healedTrienodes: 0,
healingBytecode: 0,
healingTrienodes: 0,
highestBlock: 16193909,
startingBlock: 0,
syncedAccountBytes: 2338698797,
syncedAccounts: 9417189,
syncedBytecodeBytes: 302598044,
syncedBytecodes: 58012,
syncedStorage: 42832820,
syncedStorageBytes: 9263550660
}

#If synced:

false
```

3. Type **exit** to exit out of the Geth console.
    
4. Run the following curl command to check if the node is still syncing. The command line tool ‘jq' will format the json output of the curl command. Output of "false" means that it is synced with the network.
    

```apache
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","id":67}' http://localhost:8545 | jq
```

**Output:**

```json
#If not synced:
{
  "jsonrpc": "2.0",
  "id": 67,
  "result": {
    "currentBlock": "0x4d70e9",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0xf71975",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x8b65b62d",
    "syncedAccounts": "0x8fb1e5",
    "syncedBytecodeBytes": "0x1209479c",
    "syncedBytecodes": "0xe29c",
    "syncedStorage": "0x28d93b4",
    "syncedStorageBytes": "0x2282690c4"
  }
}

#If synced:
{"jsonrpc":"2.0","id":67,"result":false}
```

5. Run the following curl command to check if the node is accessible through the external IP address:
    

```apache
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","id":67}' http://$EXT_IP_ADDRESS:8545 | jq
```

**Output:**

```json
#If not synced:
{
  "jsonrpc": "2.0",
  "id": 67,
  "result": {
    "currentBlock": "0x4d70e9",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0xf71975",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x8b65b62d",
    "syncedAccounts": "0x8fb1e5",
    "syncedBytecodeBytes": "0x1209479c",
    "syncedBytecodes": "0xe29c",
    "syncedStorage": "0x28d93b4",
    "syncedStorageBytes": "0x2282690c4"
  }
}

#If synced:
{"jsonrpc":"2.0","id":67,"result":false}
```

## Task 4. Configure Cloud operations

Google Cloud has several operation services to manage your Ethereum node. This section walks through configuring Cloud Logging, Managed Prometheus, Cloud Monitoring and Cloud Alerts.

### Configure Cloud logging

By default, Geth and Lighthouse will be logging to their declared log file. You'll want to bring the log data into Cloud Logging. Cloud Logging has powerful search capabilities and [alerts](https://cloud.google.com/logging/docs/alerting/log-based-alerts) can be created for specific log messages.

1. Update permissions of the Cloud Ops config file so you can update it:
    

```apache
sudo chmod 666 /etc/google-cloud-ops-agent/config.yaml
```

2. Configure Cloud Ops agent to send log data to Cloud Logging. Update the file "/etc/google-cloud-ops-agent/config.yaml" to include this [Ops Agent configuration](https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration#logging-config). This config file defines the Geth and Lighthouse log files for import into Cloud Logging:
    

```apache
sudo cat << EOF >> /etc/google-cloud-ops-agent/config.yaml
logging:
  receivers:
    syslog:
      type: files
      include_paths:
      - /var/log/messages
      - /var/log/syslog

    ethGethLog:
      type: files
      include_paths: ["/mnt/disks/chaindata-disk/ethereum/geth/logs/geth.log"]
      record_log_file_path: true

    ethLighthouseLog:
      type: files
      include_paths: ["/mnt/disks/chaindata-disk/ethereum/lighthouse/logs/lighthouse.log"]
      record_log_file_path: true

    journalLog:
      type: systemd_journald

  service:
    pipelines:
      logging_pipeline:
        receivers:
        - syslog
        - journalLog
        - ethGethLog
        - ethLighthouseLog
EOF
```

3. After saving, run these commands to restart the agent and pick up the changes:
    

```apache
sudo systemctl stop google-cloud-ops-agent
sudo systemctl start google-cloud-ops-agent
sudo systemctl status google-cloud-ops-agent
```

4. Enter **Ctrl+C** to exit out of the status screen.
    
5. If there is an error in the status, use this command to see more details:
    

```apache
sudo journalctl -xe | grep "google_cloud_ops_agent_engine"
```

6. Check Cloud logging to confirm that log messages are appearing in the console. From the Navigation Menu, under the **Logging** section, click **Logs Explorer**. You should see messages similar to these:
    

![The Query results page, which lists several messages and their previews.](https://cdn.qwiklabs.com/jdKmGR57LSquunjHO3dIbBDiLapfxryxhEJok1pqpOA%3D align="left")

### Configure Managed Prometheus

Since we started the `geth` and `lighthouse` clients with the `--metrics` flag, both clients will output metrics on http port. These metrics can be stored in a time series database like [Prometheus](https://prometheus.io/) and used to supply data to insightful [grafana](https://grafana.com/) dashboards. Normally you would need to install Prometheus on the VM, but a small configuration in the Cloud Ops agent can capture the metrics and store them in the [Managed Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus) service in Google Cloud.

1. On the command line of the VM, confirm the Geth metrics endpoint is active.
    

```apache
curl http://localhost:6060/debug/metrics/prometheus
```

**Output:**

```apache
......
# TYPE vflux_server_clientEvent_deactivated gauge
vflux_server_clientEvent_deactivated 0

# TYPE vflux_server_clientEvent_disconnected gauge

vflux_server_clientEvent_disconnected 0

# TYPE vflux_server_inactive_count gauge

vflux_server_inactive_count 0
```

2. On the command line of the VM, confirm the Lighthouse metrics endpoint is active.
    

```apache
curl http://localhost:5054/metrics
```

**Output:**

```apache
......
gossipsub_heartbeat_duration_bucket{le="300.0"} 5679573
gossipsub_heartbeat_duration_bucket{le="350.0"} 5679573
gossipsub_heartbeat_duration_bucket{le="400.0"} 5679573
gossipsub_heartbeat_duration_bucket{le="450.0"} 5679573
gossipsub_heartbeat_duration_bucket{le="+Inf"} 5679573
......
```

3. Configure Cloud Ops agent to send the metrics data to Managed Prometheus. Update the file "/etc/google-cloud-ops-agent/config.yaml" to include this [Ops Agent configuration](https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration#metrics-config). This config file defines the Geth and Lighthouse metrics endpoint for import into Managed Prometheus:
    

```apache
sudo cat << EOF >> /etc/google-cloud-ops-agent/config.yaml
metrics:
  receivers:
    prometheus:
        type: prometheus
        config:
          scrape_configs:
            - job_name: 'geth_exporter'
              scrape_interval: 10s
              metrics_path: /debug/metrics/prometheus
              static_configs:
                - targets: ['localhost:6060']
            - job_name: 'lighthouse_exporter'
              scrape_interval: 10s
              metrics_path: /metrics
              static_configs:
                - targets: ['localhost:5054']

  service:
    pipelines:
      prometheus_pipeline:
        receivers:
        - prometheus
EOF
```

4. After saving, run these commands to restart the agent and pick up the changes:
    

```apache
sudo systemctl stop google-cloud-ops-agent
sudo systemctl start google-cloud-ops-agent
sudo systemctl status google-cloud-ops-agent
```

5. Enter **Ctrl+C** to exit out of the status screen.
    
6. If there is an error in the status, use this command to see more details:
    

```apache
sudo journalctl -xe | grep "google_cloud_ops_agent_engine"
```

7. Check Cloud logging to confirm that the metrics are appearing in the console. From the Navigation Menu, under the **Monitoring** section, click **Metrics Explorer**. Select the **&lt;&gt; PromQL** option. In the query box, enter a lighthouse metric `gossipsub_heartbeat_duration_bucket`. Click **RUN QUERY**. You should see results similar to this:
    

![The PROMQL query results page, which lists the requested data metrics and their values.](https://cdn.qwiklabs.com/xDOtQqHG7YxfHGCoIBrmU21Rkbtlnj1gF6rSRC58o4M%3D align="left")

You can do the same for a Geth metric (example `rpc_duration_eth_blockNumber_success_count`) to confirm that Geth metrics are shown.

### View Cloud monitoring

Cloud monitoring should already be active for your virtual machine.

1. From the Navigation Menu, under the **Compute Engine** section, click **VM Instances**.
    
2. Click on the VM **eth-mainnet-rpc-node**.
    
3. Click on the tab **OBSERVABILITY**.
    
4. All sections should be showing a graph of different metrics from the VM.
    

![The Observability tabbed page, which includes several graphs for the metrics, such as Network Traffic and CPU Utilization.](https://cdn.qwiklabs.com/%2BfKiaHzuT0Jnmpk6R2ou32nRnPqs1aH%2BIsZaACoYZ9s%3D align="left")

5. Click around the different sub-menus and timeframes to check out the different types of metrics that are captured directly from the VM.
    

#### Configure notification channel

Configure a notification channel that alerts will be sent to:

1. From the Navigation Menu, under the **Monitoring** section, click **Alerting.**
    
2. Click **EDIT NOTIFICATION CHANNELS**.
    
3. Under **Email**, click **ADD NEW**.
    
4. Type in Email address and Display Name of the person who should receive the notifications.
    

#### Configure metrics alerts

Configure alerts based on VM metrics:

1. From the Navigation Menu, under the **Monitoring** section, click **Alerting**.
    
2. Click **CREATE POLICY**.
    
3. Click **SELECT A METRIC**.
    
4. Click **VM Instance** &gt; **Disk** &gt; **Disk Utilization** and click **Apply**.
    
5. Add filters:
    

| **Property** | **Value** (type or select) |
| --- | --- |
| device | /dev/sdb |
| state | used |

![The Create Policy page, which includes the aforementioned fields.](https://cdn.qwiklabs.com/vPDOneFXgQQBWOqrBR%2FpycHrm7eJwXEkIAyhpK05h%2FA%3D align="left")

6. Click **NEXT**.
    
7. Enter the Threshold value: 90%
    

![The Configure alert trigger page, which includes the aforementioned field.](https://cdn.qwiklabs.com/eqK7cx4%2B%2BwG9Df6YS3qwHQBIg5w6z2rdQsnxSVj0Wzs%3D align="left")

8. Click **NEXT,** select the following values:
    

| **Property** | \*\*Value  
\*\*(type or select) | | --- | --- | | Use notification channel | select | | Notification Channels | Select notification channel created previously | | Notify on incident closure | check | | Incident autoclose duration | 2 days | | Documentation | Check the disk space of the VM | | Name | VM - Disk space alert - 90% utilization |

![The Configure notifications and finalize alert page, which includes the aforementioned fields.](https://cdn.qwiklabs.com/EJzsQyNLzvhTRVspTp8dp%2BGIeHaDmfoUYELlX7AEIco%3D align="left")

![The documention and Name the alert policy text fields and the Next button.](https://cdn.qwiklabs.com/jAfYjIJLfG3qsjK22fur4aut4t3a%2BJ1IBpC5QJrQOCk%3D align="left")

9. Click **NEXT**.
    
10. Click **CREATE POLICY**.
    

### Configure Uptime checks

Configure uptime checks for the HTTP endpoint:

1. From the Navigation Menu, under the **Monitoring** section, click **Uptime checks**.
    
2. Click **CREATE UPTIME CHECK**.
    
3. Configure the uptime check with the following values:
    

| **Property** | \*\*Value  
\*\*(type or select) | | --- | --- | | Protocol | HTTP | | Resource Type | Instance | | Applies to single: Instance | eth-mainnet-rpc-node | | Path | / | | Expand More target options | | | Request Method | GET | | Port | 8545 | | Click Continue | accept defaults | | Click Continue | accept defaults | | Choose notification channel | Select notification channel created previously | | Title | eth-mainnet-rpc-node-uptime-check |

4. Click **TEST** (should show success of 200 OK).
    
5. Click **CREATE**.
    

Click **Check my progress** to verify the objective.

Please update the config.yaml file.

Configure Cloud Operations

*Please update the config.yaml file*

---

## Solution of Lab

### Quick

%[https://youtu.be/fJ9RiEI664k] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Running%20a%20Dedicated%20Ethereum%20RPC%20Node%20in%20Google%20Cloud/techcps1116.sh
sudo chmod +x techcps1116.sh
./techcps1116.sh
```

**💡 After scoring** <mark>90/100</mark> **in the lab, run the below commands and follow the video instructions**

```apache
export ZONE=$(gcloud compute project-info describe \
--format="value(commonInstanceMetadata.items[google-compute-default-zone])")

gcloud compute instances stop eth-mainnet-rpc-node --project=$DEVSHELL_PROJECT_ID --zone=$ZONE && gcloud compute instances set-machine-type eth-mainnet-rpc-node --project=$DEVSHELL_PROJECT_ID --zone=$ZONE --machine-type=n2-standard-4 && gcloud compute instances start eth-mainnet-rpc-node --project=$DEVSHELL_PROJECT_ID --zone=$ZONE
```

---

### Manual

**Option 1**

%[https://youtu.be/ys-tg37bfvg] 

**Option 2**

%[https://youtu.be/iPj3lNxkOFw]