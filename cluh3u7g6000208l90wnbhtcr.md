---
title: "VPC Networks - Controlling Access"
seoTitle: "VPC Networks - Controlling Access"
seoDescription: "In the real-world you need to protect sensitive data and ensure the continued availability of your web applications at all times. Learn how to use the Googl"
datePublished: Mon Apr 01 2024 15:28:09 GMT+0000 (Coordinated Universal Time)
cuid: cluh3u7g6000208l90wnbhtcr
slug: vpc-networks-controlling-access
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711985233804/d247b28d-e6c3-4d77-932b-3929c696122e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711985270645/1343bab3-0ee0-42b2-a58b-e8c9e8811e3e.png

---

## Overview

In the real-world you need to protect sensitive data and ensure the continued availability of your web applications at all times. Learn how to use the Google Cloud VPC network to create a more secure, scalable, and manageable web server deployment within your Google Cloud environment.

In this lab, you create two nginx web servers on the default VPC network and control external HTTP access to the web servers using tagged firewall rules. Then, you explore IAM roles and service accounts.

* Two web servers gives you redundancy - if one web server fails, the other can continue serving web traffic, preventing downtime.
    
* Tagged firewall rules provide granular control over which traffic is allowed to reach specific web servers.
    
* By assigning a service account permission to perform tasks, you're upholding the principal of least priviledge, keeping your Cloud resources safe.
    

---

%[https://www.youtube.com/watch?v=VOFHTWfn1D0] 

```apache
export ZONE=

#Set the PROJECT_ID variable to the current Google Cloud project
export PROJECT_ID=$(gcloud config get-value project)

#Creating Blue server
gcloud compute instances create blue \
  --zone=$ZONE \
  --machine-type=e2-medium \
  --tags=web-server

#Creating Green server
gcloud compute instances create green \
  --zone=$ZONE \
  --machine-type=e2-medium 

#Creating firewall rules
gcloud compute firewall-rules create allow-http-web-server \
  --network=default \
  --action=ALLOW \
  --direction=INGRESS \
  --source-ranges=0.0.0.0/0 \
  --target-tags=web-server \
  --rules=tcp:80,icmp

#Creating test-vm
gcloud compute instances create test-vm --machine-type=e2-micro --subnet=default --zone=$ZONE


----------------------------------------------------------------------------------------------------------------------------------------------------


gcloud iam service-accounts keys create key.json --iam-account=network-admin@$PROJECT_ID.iam.gserviceaccount.com
gcloud compute ssh blue --zone=$ZONE --quiet

---------------------------------------------------------------------------------------------------------------------------------------------------------


sudo apt-get install nginx-light -y
sudo sed -i 's#<h1>Welcome to nginx!</h1>#<h1>Welcome to the blue server!</h1>#' /var/www/html/index.nginx-debian.html
cat /var/www/html/index.nginx-debian.html
exit

---------------------------------------------------------------------------------------------------------------------------------------------------------


gcloud beta compute ssh green --zone=$ZONE --quiet

---------------------------------------------------------------------------------------------------------------------------------------------------------


sudo apt-get install nginx-light -y
sudo sed -i 's#<h1>Welcome to nginx!</h1>#<h1>Welcome to the Green server!</h1>#' /var/www/html/index.nginx-debian.html
cat /var/www/html/index.nginx-debian.html
```