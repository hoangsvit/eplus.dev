---
title: "Cloud Monitoring: Qwik Start - GSP089"
seoTitle: "Cloud Monitoring: Qwik Start - GSP089"
seoDescription: "Cloud Monitoring provides visibility into the performance, uptime, and overall health of cloud-powered applications. Cloud Monitoring collects metrics, even"
datePublished: Tue Apr 02 2024 15:02:31 GMT+0000 (Coordinated Universal Time)
cuid: cluiid3wa000c08l7dicg8qgk
slug: cloud-monitoring-qwik-start-gsp089
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1712069951337/15302f94-544e-4809-a727-35ab8077ee71.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1712070115546/8f0b1ee1-e254-4ac7-b8e7-e4928a66b617.png
tags: google-cloud, google-cloud-platform, cloud-monitoring

---

## **Overview**

Cloud Monitoring provides visibility into the performance, uptime, and overall health of cloud-powered applications. Cloud Monitoring collects metrics, events, and metadata from Google Cloud, Amazon Web Services, hosted uptime probes, application instrumentation, and a variety of common application components including Cassandra, Nginx, Apache Web Server, Elasticsearch, and many others. Cloud Monitoring ingests that data and generates insights via dashboards, charts, and alerts. Cloud Monitoring alerting helps you collaborate by integrating with Slack, PagerDuty, HipChat, Campfire, and more.

In this lab you'll install monitoring and logging agents to collect information from your instance, which could include metrics and logs from 3rd party apps.

---

```powershell
export ZONE=

curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Cloud%20Monitoring%20Qwik%20Start/quicklabgsp089.sh

sudo chmod +x quicklabgsp089.sh

./quicklabgsp089.sh
```

Alternate solution

```powershell
export ZONE=

# Create the instance with the necessary metadata and tags
gcloud compute instances create lamp-1-vm \
    --project=$DEVSHELL_PROJECT_ID \
    --zone=$ZONE \
    --machine-type=e2-small \
    --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default \
    --metadata=enable-oslogin=true \
    --maintenance-policy=MIGRATE \
    --provisioning-model=STANDARD \
    --tags=http-server \
    --create-disk=auto-delete=yes,boot=yes,device-name=lamp-1-vm,image=projects/debian-cloud/global/images/debian-10-buster-v20230629,mode=rw,size=10,type=projects/$DEVSHELL_PROJECT_ID/zones/$ZONE/diskTypes/pd-balanced \
    --no-shielded-secure-boot \
    --shielded-vtpm \
    --shielded-integrity-monitoring \
    --labels=goog-ec-src=vm_add-gcloud \
    --reservation-affinity=any

# Create firewall rule to allow incoming HTTP traffic on port 80
gcloud compute firewall-rules create allow-http \
    --project=$DEVSHELL_PROJECT_ID \
    --direction=INGRESS \
    --priority=1000 \
    --network=default \
    --action=ALLOW \
    --rules=tcp:80 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=http-server


# Generate SSH keys
gcloud compute config-ssh --project "$DEVSHELL_PROJECT_ID" --quiet

# SSH into the instance and run commands
gcloud compute ssh lamp-1-vm --project "$DEVSHELL_PROJECT_ID" --zone $ZONE --command "sudo apt-get update && sudo apt-get install -y apache2 php7.0 && sudo service apache2 restart"






cat > alert_config.json <<EOF
{
  "displayName": "Inbound Traffic Alert",
  "userLabels": {},
  "conditions": [
    {
      "displayName": "VM Instance - Network traffic",
      "conditionThreshold": {
        "filter": "resource.type = \"gce_instance\" AND metric.type = \"agent.googleapis.com/interface/traffic\"",
        "aggregations": [
          {
            "alignmentPeriod": "300s",
            "crossSeriesReducer": "REDUCE_NONE",
            "perSeriesAligner": "ALIGN_RATE"
          }
        ],
        "comparison": "COMPARISON_GT",
        "duration": "60s",
        "trigger": {
          "count": 1
        },
        "thresholdValue": 500
      }
    }
  ],
  "alertStrategy": {
    "autoClose": "604800s"
  },
  "combiner": "OR",
  "enabled": true
}
EOF

gcloud alpha monitoring policies create --policy-from-file=alert_config.json
```