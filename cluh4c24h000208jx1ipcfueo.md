---
title: "HTTP Load Balancer with Cloud Armor"
seoTitle: "HTTP Load Balancer with Cloud Armor"
seoDescription: "Google Cloud HTTP(S) load balancing is implemented at the edge of Google's network in Google's points of presence (POP) around the world. User traffic direc"
datePublished: Mon Apr 01 2024 15:42:02 GMT+0000 (Coordinated Universal Time)
cuid: cluh4c24h000208jx1ipcfueo
slug: http-load-balancer-with-cloud-armor
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711986063431/ff046929-0b3f-4126-8da6-f3eb9fc98cb9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711986075148/6b6cd179-40b1-4570-9d29-47e1e4a072e0.png

---

## **Overview**

Google Cloud HTTP(S) load balancing is implemented at the edge of Google's network in Google's points of presence (POP) around the world. User traffic directed to an HTTP(S) load balancer enters the POP closest to the user and is then load balanced over Google's global network to the closest backend that has sufficient capacity available.

Cloud Armor IP allowlist/denylist enable you to restrict or allow access to your HTTP(S) load balancer at the edge of the Google Cloud, as close as possible to the user and to malicious traffic. This prevents malicious users or traffic from consuming resources or entering your Virtual Private Cloud (VPC) networks.

In this lab, you configure an HTTP Load Balancer with global backends, as shown in the diagram below. Then, you stress test the Load Balancer and denylist the stress test IP with Cloud Armor.

---

%[https://www.youtube.com/watch?v=wG27PYdRZ2c] 

```apache
export REGION1=
export REGION2=
export VM_ZONE=

#creating firewall rules
gcloud compute --project=$DEVSHELL_PROJECT_ID firewall-rules create default-allow-http \
--direction=INGRESS \
--priority=1000 \
--network=default \
--action=ALLOW \
--rules=tcp:80 \
--source-ranges=0.0.0.0/0 \
--target-tags=http-server
gcloud compute firewall-rules create default-allow-health-check \
--project=$DEVSHELL_PROJECT_ID \
--direction=INGRESS \
--priority=1000 \
--network=default \
--action=ALLOW \
--rules=tcp \
--source-ranges=130.211.0.0/22,35.191.0.0/16 \
--target-tags=http-server
gcloud compute instance-templates create $REGION1-template \
--project=$DEVSHELL_PROJECT_ID \
--machine-type=e2-micro \
--network-interface=network-tier=PREMIUM,subnet=default \
--metadata=startup-script-url=gs://cloud-training/gcpnet/httplb/startup.sh,enable-oslogin=true \
--maintenance-policy=MIGRATE \
--provisioning-model=STANDARD \
--region=$REGION1 \
--tags=http-server,https-server \
--create-disk=auto-delete=yes,boot=yes,device-name=$REGION1-template,image=projects/debian-cloud/global/images/debian-11-bullseye-v20230629,mode=rw,size=10,type=pd-balanced \
--no-shielded-secure-boot \
--shielded-vtpm \
--shielded-integrity-monitoring \
--reservation-affinity=any
gcloud compute instance-templates create $REGION2-template \
--project=$DEVSHELL_PROJECT_ID \
--machine-type=e2-micro \
--network-interface=network-tier=PREMIUM,subnet=default \
--metadata=startup-script-url=gs://cloud-training/gcpnet/httplb/startup.sh,enable-oslogin=true \
--maintenance-policy=MIGRATE \
--provisioning-model=STANDARD \
--region=$REGION2 \
--tags=http-server,https-server \
--create-disk=auto-delete=yes,boot=yes,device-name=$REGION2-template,image=projects/debian-cloud/global/images/debian-11-bullseye-v20230629,mode=rw,size=10,type=pd-balanced \
--no-shielded-secure-boot \
--shielded-vtpm \
--shielded-integrity-monitoring \
--reservation-affinity=any
gcloud beta compute instance-groups managed create $REGION1-mig \
--project=$DEVSHELL_PROJECT_ID \
--base-instance-name=$REGION1-mig \
--size=1 \
--template=$REGION1-template \
--region=$REGION1 \
--target-distribution-shape=EVEN \
--instance-redistribution-type=PROACTIVE \
--list-managed-instances-results=PAGELESS \
--no-force-update-on-repair
gcloud beta compute instance-groups managed set-autoscaling $REGION1-mig \
--project=$DEVSHELL_PROJECT_ID \
--region=$REGION1 \
--cool-down-period=45 \
--max-num-replicas=2 \
--min-num-replicas=1 \
--mode=on \
--target-cpu-utilization=0.8
gcloud beta compute instance-groups managed create $REGION2-mig \
--project=$DEVSHELL_PROJECT_ID \
--base-instance-name=$REGION2-mig \
--size=1 \
--template=$REGION2-template \
--region=$REGION2 \
--target-distribution-shape=EVEN \
--instance-redistribution-type=PROACTIVE \
--list-managed-instances-results=PAGELESS \
--no-force-update-on-repair
gcloud beta compute instance-groups managed set-autoscaling $REGION2-mig \
--project=$DEVSHELL_PROJECT_ID \
--region=$REGION2 \
--cool-down-period=45 \
--max-num-replicas=2 \
--min-num-replicas=1 \
--mode=on \
--target-cpu-utilization=0.8
gcloud compute health-checks create tcp http-health-check \
--description="Hello there" \
--check-interval=5s \
--timeout=5s \
--unhealthy-threshold=2 \
--healthy-threshold=2 \
--port=80 \
--proxy-header=NONE
TOKEN=$(gcloud auth application-default print-access-token)
cat > 1.json <<EOF
{
  "backends": [
    {
      "balancingMode": "RATE",
      "capacityScaler": 1,
      "group": "projects/$DEVSHELL_PROJECT_ID/regions/$REGION1/instanceGroups/$REGION1-mig",
      "maxRatePerInstance": 50
    },
    {
      "balancingMode": "UTILIZATION",
      "capacityScaler": 1,
      "group": "projects/$DEVSHELL_PROJECT_ID/regions/$REGION2/instanceGroups/$REGION2-mig",
      "maxRatePerInstance": 80,
      "maxUtilization": 0.8
    }
  ],
  "cdnPolicy": {
    "cacheKeyPolicy": {
      "includeHost": true,
      "includeProtocol": true,
      "includeQueryString": true
    },
    "cacheMode": "CACHE_ALL_STATIC",
    "clientTtl": 3600,
    "defaultTtl": 3600,
    "maxTtl": 86400,
    "negativeCaching": false,
    "serveWhileStale": 0
  },
  "compressionMode": "DISABLED",
  "connectionDraining": {
    "drainingTimeoutSec": 300
  },
  "description": "Hello there
",
  "enableCDN": true,
  "healthChecks": [
    "projects/$DEVSHELL_PROJECT_ID/global/healthChecks/http-health-check"
  ],
  "loadBalancingScheme": "EXTERNAL",
  "logConfig": {
    "enable": true,
    "sampleRate": 1
  },
  "name": "http-backend"
}
EOF
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d @1.json \
"https://compute.googleapis.com/compute/v1/projects/$DEVSHELL_PROJECT_ID/global/backendServices"
sleep 25
gcloud compute url-maps create http-lb \
--default-service=projects/$DEVSHELL_PROJECT_ID/global/backendServices/http-backend
gcloud compute target-http-proxies create http-lb-target-proxy \
--url-map=projects/$DEVSHELL_PROJECT_ID/global/urlMaps/http-lb
gcloud compute target-http-proxies create http-lb-target-proxy-2 \
--url-map=projects/$DEVSHELL_PROJECT_ID/global/urlMaps/http-lb
cat > 2.json <<EOF
{
    "IPProtocol": "TCP",
    "ipVersion": "IPV4",
    "loadBalancingScheme": "EXTERNAL",
    "name": "http-lb-forwarding-rule",
    "networkTier": "PREMIUM",
    "portRange": "80",
    "target": "projects/$DEVSHELL_PROJECT_ID/global/targetHttpProxies/http-lb-target-proxy"
}
EOF
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d @2.json \
"https://compute.googleapis.com/compute/v1/projects/$DEVSHELL_PROJECT_ID/global/forwardingRules"
cat > 3.json <<EOF
{
    "IPProtocol": "TCP",
    "ipVersion": "IPV6",
    "loadBalancingScheme": "EXTERNAL",
    "name": "http-lb-forwarding-rule-2",
    "networkTier": "PREMIUM",
    "portRange": "80",
    "target": "projects/$DEVSHELL_PROJECT_ID/global/targetHttpProxies/http-lb-target-proxy-2"
}
EOF
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d @3.json \
"https://compute.googleapis.com/compute/v1/projects/$DEVSHELL_PROJECT_ID/global/forwardingRules"
gcloud compute instance-groups set-named-ports $REGION1-mig \
--named-ports="http:80" \
--region=$REGION1
gcloud compute instance-groups set-named-ports $REGION2-mig \
--named-ports="http:80" \
--region=$REGION2
gcloud compute instances create siege-vm \
--project=$DEVSHELL_PROJECT_ID \
--zone=$VM_ZONE \
--machine-type=e2-medium \
--network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default \
--metadata=enable-oslogin=true \
--maintenance-policy=MIGRATE \
--provisioning-model=STANDARD \
--create-disk=auto-delete=yes,boot=yes,device-name=siege-vm,image=projects/debian-cloud/global/images/debian-11-bullseye-v20230629,mode=rw,size=10,type=projects/$DEVSHELL_PROJECT_ID/zones/us-central1-c/diskTypes/pd-balanced \
--no-shielded-secure-boot \
--shielded-vtpm \
--shielded-integrity-monitoring \
--labels=goog-ec-src=vm_add-gcloud \
--reservation-affinity=any
export SIEGE_VM_IP=$(gcloud compute instances describe siege-vm --project=$DEVSHELL_PROJECT_ID --zone=$VM_ZONE --format="value(networkInterfaces[0].accessConfigs[0].natIP)")
cat > 4.json <<EOF
{
    "adaptiveProtectionConfig": {
      "layer7DdosDefenseConfig": {
        "enable": false
      }
    },
    "description": "",
    "name": "denylist-siege",
    "rules": [
      {
        "action": "deny(403)",
        "description": "",
        "match": {
          "config": {
            "srcIpRanges": [
               "$SIEGE_VM_IP"
            ]
          },
          "versionedExpr": "SRC_IPS_V1"
        },
        "preview": false,
        "priority": 1000
      },
      {
        "action": "allow",
        "description": "Default rule, higher priority overrides it",
        "match": {
          "config": {
            "srcIpRanges": [
              "*"
            ]
          },
          "versionedExpr": "SRC_IPS_V1"
        },
        "preview": false,
        "priority": 2147483647
      }
    ],
    "type": "CLOUD_ARMOR"
  }
EOF
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" \
-d @4.json \
"https://compute.googleapis.com/compute/v1/projects/$DEVSHELL_PROJECT_ID/global/securityPolicies"
cat > 5.json <<EOF
{
    "securityPolicy": "projects/$DEVSHELL_PROJECT_ID/global/securityPolicies/denylist-siege"
}
EOF
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" \
-d @5.json \
"https://compute.googleapis.com/compute/v1/projects/$DEVSHELL_PROJECT_ID/global/backendServices/http-backend"
export RULE_IP=$(gcloud compute forwarding-rules describe http-lb-forwarding-rule --global --format="value(IPAddress)")
gcloud compute ssh --zone "$VM_ZONE" "siege-vm"

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

sudo apt-get -y install siege
```