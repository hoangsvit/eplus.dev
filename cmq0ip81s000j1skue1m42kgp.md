---
title: "Build Global and Regional Load Balancing Solutions: Challenge Lab - GSP539"
seoTitle: "Build Global and Regional Load Balancing Solutions: Challenge Lab - GSP539"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-06-05T06:02:40.772Z
cuid: cmq0ip81s000j1skue1m42kgp
slug: build-global-and-regional-load-balancing-solutions-challenge-lab-gsp539
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/3fcecff1-e5b0-4f26-821d-fba83db0d4c1.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/2c920e4d-9932-437d-8645-983f47b22073.png
tags: build-global-and-regional-load-balancing-solutions-challenge-lab-gsp539, build-global-and-regional-load-balancing-solutions-challenge-lab, gsp539

---

## **Challenge overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the **Build Global and Regional Load Balancing Solutions** course. Are you ready for the challenge?

### Topics tested

*   Regional Internal Load Balancing: Configuring a secure, private Layer 4 solution (Proxy NLB).
    
*   Global External Load Balancing: Deploying a multi-region Layer 7 solution (ALB) with HTTPS.
    
*   Traffic Management: Observe global distribution.
    

## **Scenario**

You are a Cloud Infrastructure Engineer for Cymbal Cystems, a FinTech firm. You must configure two distinct services within the same VPC network, each with different security and performance demands, using both Layer 4 and Layer 7 load balancing models.

The Two Critical Needs:

*   Internal Transaction Processor: Requires a private, secure gateway for internal API calls, handled by a Regional Internal Proxy NLB.
    
*   Global Market Data Feed: Requires a secure, globally available, high-throughput endpoint for external clients, handled by a Global External Application Load Balancer (ALB) with HTTPS termination.
    

Review the resources that are available in the Google Cloud console.

## **Task 1. Secure internal transaction processor (regional internal proxy NLB)**

Cymbal Cystems’ internal Transaction Validation Service (TVS) processes sensitive trade requests. All intra-VPC communication within the `lb-network` must be secured, and the service must only be available on a private IP address.

1.  Deploy internal backends - Create a regional MIG in region B named **mig-proxy-internal** with template **template-proxy-internal** and named port **tcp80** with port to `80`.
    
2.  Define proxy firewall rules - Create 2 firewall rules that target the `tag-proxy-internal`:
    

*   one for health checks (TCP 80)
    
*   one for proxy-only subnet CIDR `10.129.0.0/23` (TCP 80).
    

Click **Check my progress** to verify the objective.

Create a regional MIG and 2 firewall rules

3.  Configure internal proxy - Reserve a regional static internal IP address named **ip-internal-proxy** in Region B, specify the purpose as **Shared\_loadbalancer\_vip** and a regional internal forwarding rule named **rule-internal-proxy** on TCP port 110.
    

Click **Check my progress** to verify the objective.

Create a regional internal proxy NLB

4.  Validate access - Deploy a client VM (**vm-client-internal**) in Region B with network tag `allow-ssh`. SSH into the VM and confirm the LB is reachable on the internal IP at port 110.
    

Click **Check my progress** to verify the objective.

Deploy a client VM and validate the access

## **Task 2. Global external market data feed (global external application Load Balancer)**

Cymbal Cystems provides a secure, high-volume external market data feed to third-party clients. This service must be globally available, use HTTPS for encryption, and serve backends located in two different regions to ensure high availability.

1.  Deploy Global Backends - Create two regional MIGs using the template `template-alb-api`:
    

*   One in Region A named **mig-alb-api-a** with named port **http80** (port to `80`).
    
*   One in Region B named **mig-alb-api-b** with named port **http80** (port to `80`).
    

Click **Check my progress** to verify the objective.

Create two regional MIGs

2.  Configure Backend Components - Create a global HTTP health check named **http-check-alb** on port 80. Create a Global Backend Service named **service-alb-global**.
    

*   Force Traffic Distribution: Add both MIGs as backends. Set the Balancing mode to Rate and set the Maximum RPS to 1.
    

**Note:** Setting the Maximum RPS to 1 ensures that the load balancer overflows traffic to the second region even under light testing loads, allowing you to verify global distribution.

3.  Configure the ALB Frontend
    

*   Preparation - Open Cloud Shell and run the following to create your certificate:
    

```plaintext

# Generate the private key
openssl genrsa -out key.pem 2048

# Generate the self-signed certificate
openssl req -new -x509 -key key.pem -out cert.pem -days 1 -subj "/CN=example.com"

# Create the Global SSL certificate resource in Google Cloud
gcloud compute ssl-certificates create cert-self-signed \
    --certificate=cert.pem \
    --private-key=key.pem \
    --global
```

*   Reserve a Global static external IP address named **ip-alb-global**. Configure an HTTPS Frontend (Port 443) using this IP and the `cert-self-signed` certificate.
    

4.  Define Firewall Security and Validate Access - Create a firewall ingress rule named **fw-allow-health-check-and-proxy** with the following settings:
    
    | **Property** | **Value** |
    | --- | --- |
    | Source Filter | IPv4 ranges 130.211.0.0/22 and 35.191.0.0/16 |
    | Protocols/Ports | tcp:80 |
    | Targets | All instances in the backend network (or specific target tags) |
    

Click **Check my progress** to verify the objective.

Create global external application load balancer

## **Task 3. Test failover and global distribution**

The Global Market Data Feed must remain available even if a regional failure occurs. Simulate a backend failure to test the ALB's health check and failover capabilities.

### Simulate a backend failure

1.  To observe global distribution, in Cloud Shell run the following:
    
    ```plaintext
    while true; do curl -k -s https://\[YOUR\_LOAD\_BALANCER\_IP\_ADDRESS\] | grep "Hello from"; sleep 0.5; done  
    ```
    
    Because you set Maximum RPS to 1, you should see responses alternating between Region A and Region B.
    
2.  To simulate a backend failure, SSH into a VM in `mig-alb-api-a` and stop the Nginx service by running:
    
    ```plaintext
    sudo systemctl stop nginx
    ```
    
3.  To observe the failover, navigate to **Network Services > Load Balancing**. Click your LB, then the **Monitoring** tab. You should see the request line for Region A drop to zero while Region B spikes.
    

### Restore backend

*   Restart the service:
    

```plaintext
sudo systemctl start nginx
```

Verify the regional traffic split resumes once the health check shows HEALTHY.

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=PpxxrCZ-dwo] 

**1\. Create Regional MIG**

Go to: **Compute Engine → Instance Groups → Create Instance Group** ([https://console.cloud.google.com/compute/instanceGroups/add](https://console.cloud.google.com/compute/instanceGroups/add))

Create:

*   **Name:** mig-proxy-internal
    
*   **Template:** template-proxy-internal
    
*   **Region:** Region B
    

**Add Named Port:**

*   tcp80 → 80
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5c694c98-76a0-4831-a013-20d0a44636b6.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/880ddc8e-6e33-4e74-914e-1fe01a99852b.png align="center")

* * *

**2\. Create Firewall Rules**

Go to: **VPC Network → Firewall (https://console.cloud.google.com/net-security/firewall-manager/firewall-policies/list)**

Create:

Rule 1:

```plaintext
gcloud compute firewall-rules create fw-allow-hc-proxy-internal \
  --network=lb-network \
  --action=ALLOW \
  --direction=INGRESS \
  --source-ranges=130.211.0.0/22,35.191.0.0/16 \
  --target-tags=tag-proxy-internal \
  --rules=tcp:80
```

Rule 2:

```plaintext
gcloud compute firewall-rules create fw-allow-proxy-subnet-internal \
  --network=lb-network \
  --action=ALLOW \
  --direction=INGRESS \
  --source-ranges=10.129.0.0/23 \
  --target-tags=tag-proxy-internal \
  --rules=tcp:80
```

* * *

**3\. Create Health Check**

```plaintext
read -p "Enter REGION_A: " REGION_A
read -p "Enter REGION_B: " REGION_B

echo "export REGION_A=$REGION_A" >> ~/.bashrc
echo "export REGION_B=$REGION_B" >> ~/.bashrc

source ~/.bashrc

gcloud compute health-checks create tcp hc-internal-proxy \
    --region=$REGION_B \
    --port=80
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/cdf19dd5-4815-4fd5-884c-1166799a04c1.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c7b68605-4f66-416d-a254-8a913ec0489d.png align="center")

* * *

**4\. Reserve Internal Static IP**

Go to: **VPC Network → IP Addresses → Reserve Internal (**[https://console.cloud.google.com/networking/addresses/add-internal](https://console.cloud.google.com/networking/addresses/add-internal)**)**

Create:

*   **Name:** ip-internal-proxy
    
*   **Region:** Region B
    
*   **Network:** lb-network
    
*   **Subnet:** lb-backend-subnet-region-b
    
*   **Purpose:** Shared Load Balancer VIP
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b75ed775-ef94-47ec-9893-836c4d37112f.png align="center")

* * *

**5\. Create Regional Internal Proxy Network Load Balancer**

```plaintext
gcloud compute backend-services create internal-proxy-backend \
    --load-balancing-scheme=INTERNAL_MANAGED \
    --protocol=TCP \
    --region=$REGION_B \
    --health-checks=hc-internal-proxy \
    --health-checks-region=$REGION_B

gcloud compute backend-services add-backend internal-proxy-backend \
    --instance-group=mig-proxy-internal \
    --instance-group-region=$REGION_B \
    --region=$REGION_B
```

Open: https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers

Frontend:

*   **Name:** rule-internal-proxy
    
*   **IP Address:** ip-internal-proxy
    
*   **Protocol:** TCP
    
*   **Port:** 110
    
*   **Global Access:** Disabled
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/34638ef9-48be-40ae-84ee-4e87e0c71b3a.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1e8c9dee-8132-441d-a6f8-43044bb060f3.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/032932cb-0628-4583-9919-2d5429dc54b4.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1c88f8fe-3403-4c8e-a9fb-8bca08ff6fe9.png align="center")

**6\. Create Client VM**

```plaintext
gcloud compute instances create vm-client-internal \
   --zone=${REGION_B}-b \
   --machine-type=e2-micro \
   --network=lb-network \
   --subnet=lb-backend-subnet-region-b \
   --tags=allow-ssh
```

* * *

**7\. Validate Access**

Open: https://console.cloud.google.com/compute/instances

Test:

```plaintext
# Get Internal LB IP
LB_IP=$(gcloud compute addresses describe ip-internal-proxy \
    --region=$REGION_B \
    --format="value(address)")

echo $LB_IP
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/903835b8-c21e-4ad6-a6cb-96fbcc38ed70.png align="center")

SSH into **vm-client-internal**

Run in SSH

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5df268c5-6fae-4886-b2c3-a4e95b8d3b6c.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/340e07a8-1bc0-4a8b-a112-4a5d14d1870e.png align="center")

```plaintext
curl http://[LB_IP]:110
```

```bash
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC116/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Build%20Global%20and%20Regional%20Load%20Balancing%20Solutions%3A%20Challenge%20Lab/drabhishek.sh
sudo chmod +x drabhishek.sh
./drabhishek.sh
```

```plaintext
curl http://[LB_IP]:110
```

Then click: Check my progress → Create a regional internal proxy NLB

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/ae05e918-1a07-4c7d-9554-d4f1bf6014e9.png align="center")