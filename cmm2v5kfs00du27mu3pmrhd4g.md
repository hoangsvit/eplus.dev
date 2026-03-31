---
title: "Respond to a Security Incident (Solution)"
seoDescription: "You're the cloud architect for a cybersecurity firm. One of your client's virtual machines (VM) in a Google Cloud VPC network (client-vpc) has been co"
datePublished: 2026-02-26T02:48:01.721Z
cuid: cmm2v5kfs00du27mu3pmrhd4g
slug: respond-to-a-security-incident-solution
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/ed1b3e9f-fae1-437d-8e93-72aa512fb7dc.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/0551c62c-c7ed-4610-be7c-426c8e62bb66.png
tags: respond-to-a-security-incident-solution, respond-to-a-security-incident

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included cloud terminal is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

You're the cloud architect for a cybersecurity firm. One of your client's virtual machines (VM) in a Google Cloud VPC network (client-vpc) has been compromised by a sophisticated attacker. The attacker is attempting to pivot laterally to other VMs within the network. Your task is to:

1.  **Isolate the compromised VM**: Immediately isolate the VM (**compromised-vm**) from the rest of the client-vpc network by denying the traffic to prevent further lateral movement by removing all ingress access in the existing firewall rule called `critical-fw-rule`.
    

Click **Check my progress** to verify the objective.

Update the firewall rule.

2.  **Maintain Limited Access**: Allow SSH access to the compromised-vm from a specific bastion host (**bastion-host**) so that your incident response team can investigate the attack. Create this as a new firewall rule called `allow-ssh-from-bastion`.
    

Click **Check my progress** to verify the objective.

Create the firewall rule.

3.  **Log and Monitor**: Enable `VPC flow logs` for the subnet `my-subnet` to capture all network traffic to and from the isolated VM for further analysis.
    

Click **Check my progress** to verify the objective.

Enable VPC flow logs for the subnet.

* * *

## Solution of Lab

<iframe type="youtube" src="https://www.youtube.com/watch?v=2kGzFmy6NkQ" data-node-type="hn-embed"></iframe>

```shell
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/respond-to-a-security-incident-solution/lab.sh
source lab.sh
```

**Script Alternative**

```shell

gcloud compute firewall-rules delete critical-fw-rule --quiet 2>/dev/null; gcloud compute firewall-rules create critical-fw-rule --network=client-vpc --direction=INGRESS --priority=1000 --action=DENY --rules=tcp:80,tcp:22 --target-tags=compromised-vm --enable-logging 
gcloud compute firewall-rules delete allow-ssh-from-bastion --quiet 2>/dev/null; gcloud compute firewall-rules create allow-ssh-from-bastion --network=client-vpc --action allow --direction=ingress --rules tcp:22 --source-ranges=$(gcloud compute instances describe bastion-host --zone=$(gcloud compute instances list --filter="name=bastion-host" --format="get(zone)") --format="get(networkInterfaces[0].accessConfigs[0].natIP)") --target-tags=compromised-vm
gcloud compute networks subnets update my-subnet --region=$(gcloud compute networks subnets list --filter="name=my-subnet" --format="get(region)") --enable-flow-logs
```