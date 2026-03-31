---
title: "Create Firewall Rule to Enable SSH Access (Solution)"
seoTitle: "Create Firewall Rule to Enable SSH Access (Solution)"
seoDescription: "Labs are timed and cannot be paused. The timer starts when you click Start Lab.



The included cloud terminal is preconfigured with the gcloud SDK.

"
datePublished: 2026-02-25T09:27:45.068Z
cuid: cmm1tzrfu000727p0d89i4em7
slug: create-firewall-rule-to-enable-ssh-access-solution
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/465af724-8f99-4f1b-a3a3-fdac237fea17.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/16875aa0-b6f3-4997-80b5-ac6f7734d53b.png
tags: create-firewall-rule-to-enable-ssh-access-solution, create-firewall-rule-to-enable-ssh-access

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included cloud terminal is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

*   Your colleague created a custom VPC network with a compute instance in that network. You have to connect to the compute instance through ssh, but you are facing an error while connecting to the instance. After investigation, you discovered an issue with the firewall. There is no firewall at this movement which allows SSH to this instance.
    
*   Your task is to create a firewall rule so that you can connect to the instance through ssh.
    

Click **Check my progress** to verify the objective.

* * *

## Solution of Lab

<iframe type="youtube" src="https://www.youtube.com/watch?v=O1f2URsyVBo" data-node-type="hn-embed"></iframe>

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/create-firewall-rule-to-enable-ssh-access-solution/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
VPC=$(gcloud compute instances describe $(gcloud compute instances list --format="value(name)") --zone=$(gcloud compute instances list --format="value(zone)") --format="value(networkInterfaces[0].network.basename())"); gcloud compute firewall-rules create allow-ssh --network=$VPC --allow=tcp:22 --source-ranges=0.0.0.0/0 --target-tags=http-server # drabhishek ji ka code copy karta hu mai
```