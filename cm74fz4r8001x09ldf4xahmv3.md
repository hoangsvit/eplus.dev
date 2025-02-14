---
title: "Internal Load Balancer - GSP041"
seoTitle: "Internal Load Balancer - GSP041"
seoDescription: "Google Cloud's Internal Load Balancer lets you load balance TCP/UDP traffic without exposing your VM's public IP to the Internet.

This example uses a distr"
datePublished: Fri Feb 14 2025 07:23:04 GMT+0000 (Coordinated Universal Time)
cuid: cm74fz4r8001x09ldf4xahmv3
slug: internal-load-balancer-gsp041
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739517550174/9d4dd3ce-dc86-467e-b781-a6df38106fb3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1739517766464/e609a192-f9cf-4dac-83d3-f254f9bb7131.png
tags: internal-load-balancer-gsp041, internal-load-balancer, gsp041

---

## **Overview**

Google Cloud's Internal Load Balancer lets you load balance TCP/UDP traffic without exposing your VM's public IP to the Internet.

This example uses a distributed architecture; a Web Tier service connects to an Internal Tier which is distributed across several machines:

![The distributed architecture diagram](https://cdn.qwiklabs.com/KFYvcbILa4EIQuP7aFi3kFn5MRx3bhi%2Bi8ENJxOfPrY%3D align="left")

In this lab, you create a public-facing web server to serve the result of several "complex" calculations, in this case, calculating prime numbers. The prime numbers are each calculated by a micro service that is run on a managed instance group and scaled automatically.

### What you'll do

* Learn about the components of an Internal Load Balancer
    
* Create a managed instance group of backends
    
* Point an internal load balancer to the backends
    
* Test the internal load balancer, and call it from a public facing web server
    

### Prerequisites

* Basic knowledge of Compute Engine
    
* Basic networking and TCP/IP knowledge
    
* Basic Unix/Linux command line knowledge
    
* Some knowledge about VPCs is helpful, for example from the other labs in this series
    

## **Setup and requirements**

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
    student-04-a32477924760@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    EdrvOy65h7lE
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-785599275a9d`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-785599275a9d
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-a32477924760@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-785599275a9d
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region and zone

1. Set the project region and zone for this lab:
    

```apache
gcloud config set compute/region us-west1
gcloud config set compute/zone us-west1-a
```

2. Create a variable for region:
    

```apache
export REGION=us-west1
```

3. Create a variable for zone:
    

```apache
export ZONE=us-west1-a
```

Learn more from the [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/regions-zones).

**Note:** When you run `gcloud` on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.

## **Task 1. Create a virtual environment**

Python virtual environments are used to isolate package installation from the system.

1. Install the `virtualenv` environment:
    

```apache
sudo apt-get install -y virtualenv
```

2. Build the virtual environment:
    

```apache
python3 -m venv venv
```

3. Activate the virtual environment:
    

```apache
source venv/bin/activate
```

## **Task 2. Create Backend Managed Instance Group**

Use `gcloud` in Cloud Shell to set up the Managed Instance Group for calculating the prime numbers.

Create the startup script which includes a simple web server in Python that will return True or False depending on if a number is prime or not.

1. Start by creating your `backend.sh` script in the home directory:
    

```apache
touch ~/backend.sh
```

2. Click the **Open Editor** by clicking the icon at the top of the Cloud Shell. If prompted click **Open in a new window**.
    

![The Open Editor icon highlighted in the UI](https://cdn.qwiklabs.com/N4C5%2BZX%2BUzFoTDik3XuHU%2BT1Q0Hk%2B9m%2Bzw17AK9I8JA%3D align="left")

**Note:** If you don't see the Code Editor icon, close the left panel by clicking the Navigation menu icon.

![Navigation menu icon highlighted in the UI](https://cdn.qwiklabs.com/te%2FJd8uZSM%2FRVylW70HLwqSA%2BfI6t48%2BnmnE2iSiekU%3D align="left")

Launching the Code Editor moves Cloud Shell to a new window and opens the Code Editor. After a few seconds the workspace comes up.

3. Select the `backend.sh` file in the left pane.
    
4. Now add the following script into the editor on the right:
    

```apache
sudo chmod -R 777 /usr/local/sbin/
sudo cat << EOF > /usr/local/sbin/serveprimes.py
import http.server

def is_prime(a): return a!=1 and all(a % i for i in range(2,int(a**0.5)+1))

class myHandler(http.server.BaseHTTPRequestHandler):
  def do_GET(s):
    s.send_response(200)
    s.send_header("Content-type", "text/plain")
    s.end_headers()
    s.wfile.write(bytes(str(is_prime(int(s.path[1:]))).encode('utf-8')))

http.server.HTTPServer(("",80),myHandler).serve_forever()
EOF
nohup python3 /usr/local/sbin/serveprimes.py >/dev/null 2>&1 &
```

5. Click **File** &gt; **Save**.
    
6. Click **Open Terminal** on the toolbar of Cloud Shell. Enter the following command to create the instance template for a simple instance with no external IP address:
    

```apache
gcloud compute instance-templates create primecalc \
--metadata-from-file startup-script=backend.sh \
--no-address --tags backend --machine-type=e2-medium
```

7. Now open the firewall to port `80`:
    

```apache
gcloud compute firewall-rules create http --network default --allow=tcp:80 \
--source-ranges 10.138.0.0/20 --target-tags backend
```

Click **Check my progress** below to verify you're on track in this lab.

Create instance template and open firewall on port 80

Check my progress

8. Next create the instance group:
    

```apache
gcloud compute instance-groups managed create backend \
--size 3 \
--template primecalc \
--zone $ZONE
```

9. And set it to auto scale based on the CPU:
    

```apache
gcloud compute instance-groups managed set-autoscaling backend \
--target-cpu-utilization 0.8 --min-num-replicas 3 \
--max-num-replicas 10 --zone $ZONE
```

10. When this finishes running, go back to the Console tab. Navigate to the VM instance: **Compute Engine** &gt; **VM instances**. You now see three backends:
    

![The three backends listed on the Instances tabbed page](https://cdn.qwiklabs.com/08WnJ%2BS22pLGEhCXuZCcONuU41NXAdPdYbZAKiYe8Dg%3D align="left")

The backends are now ready to serve traffic.

Click **Check my progress** below to verify you're on track in this lab.

Create the instance group and set it to auto-scale based on the CPU

Check my progress

## **Task 3. Setup internal load balancer**

Now set up the Internal Load Balancer and link it with the instance group created earlier.

An internal load balancer consists of a:

* Forwarding rule which binds an internal IP address.
    
* Backend service (which is regional) linking to one or more backend instance groups (which are zonal).
    
* Health check attached to the backend service that determines which instances can receive new connections.
    

The following diagram shows how instances are load balanced using multiple instances in multiple backend groups in different zones.

![The load balancing diagram](https://cdn.qwiklabs.com/T65P3C60nkaqN%2FRQOvlfQaZp8TByJRKw%2FjVISJW9yMM%3D align="left")

You create a single backend service in this lab.

A health check is needed to balance between healthy instances only.

1. Since the HTTP service is provided, see if a 200 response on a specific URL path (in this case /2 to check if 2 is prime) is populated:
    

```apache
gcloud compute health-checks create http ilb-health --request-path /2
```

2. Create a backend service:
    

```apache
gcloud compute backend-services create prime-service \
--load-balancing-scheme internal --region=$REGION \
--protocol tcp --health-checks ilb-health
```

3. Add the instance group:
    

```apache
gcloud compute backend-services add-backend prime-service \
--instance-group backend --instance-group-zone=$ZONE \
--region=$REGION
```

4. Now create the forwarding rule to finalize the load balancer setup with a static IP of `10.138.0.10`:
    

```apache
gcloud compute forwarding-rules create prime-lb \
--load-balancing-scheme internal \
--ports 80 --network default \
--region=$REGION --address 10.138.0.10 \
--backend-service prime-service
```

The service is now able to be queried via the internal address `10.138.0.10`.

Click **Check my progress** below to verify you're on track in this lab.

Setup internal load balancer

Check my progress

## **Task 4. Test the load balancer**

*Duration is 1 min*

To test the load balancer, you need to create a new instance in the same network as the internal load balancer and SSH into it. That is because the cloud shell lives outside the project network you created.

1. Using `gcloud` in Cloud Shell, create the new instance:
    

```apache
gcloud compute instances create testinstance \
--machine-type=e2-standard-2 --zone $ZONE
```

2. Then SSH into it:
    

```apache
gcloud compute ssh testinstance --zone $ZONE
```

If prompted, type **Y** and press **Enter** twice to proceed.

3. Check if a few numbers are prime by querying the IP of the load balancer with the curl command:
    

```apache
curl 10.138.0.10/2
```

```apache
curl 10.138.0.10/4
```

```apache
curl 10.138.0.10/5
```

The output does not come with a carriage return, so you see it straight in front of the next command line like this:

```apache
user@testinstance:~$ curl 10.138.0.10/2
Trueuser@testinstance:~$ curl 10.138.0.10/4
Falseuser@testinstance:~$ curl 10.138.0.10/5
Trueuser@testinstance:~$ exit
```

The service responded correctly: that 2 and 5 are prime numbers, but 4 is not.

4. Leave the test instance:
    

```apache
exit
```

5. Then delete it:
    

```apache
gcloud compute instances delete testinstance --zone=$ZONE
```

6. Type in **Y** to confirm the deletion.
    

## **Task 5. Create a public facing web server**

*Duration is 8 min*

Create a public facing web server that returns a matrix based on a bunch of prime number calculations balanced via the internal load balancer.

You could make this an auto-scaling managed instance group load balanced by the external HTTP(S) load balancer, but for the sake of simplicity, create a single serving instance.

First, create the startup script for the front end.

1. Start by creating your `frontend.sh` script in the home directory:
    

```apache
touch ~/frontend.sh
```

2. You should still see the Code Editor open. But if not, launch the **Code Editor** by selecting it in the shell:
    

![The Open Editor button highlighted in the UI](https://cdn.qwiklabs.com/N4C5%2BZX%2BUzFoTDik3XuHU%2BT1Q0Hk%2B9m%2Bzw17AK9I8JA%3D align="left")

After a few seconds the workspace comes up.

3. Now add this script into the editor on the right:
    

```apache
sudo chmod -R 777 /usr/local/sbin/
sudo cat << EOF > /usr/local/sbin/getprimes.py
import urllib.request
from multiprocessing.dummy import Pool as ThreadPool
import http.server
PREFIX="http://10.138.0.10/" #HTTP Load Balancer
def get_url(number):
    return urllib.request.urlopen(PREFIX+str(number)).read().decode('utf-8')
class myHandler(http.server.BaseHTTPRequestHandler):
  def do_GET(s):
    s.send_response(200)
    s.send_header("Content-type", "text/html")
    s.end_headers()
    i = int(s.path[1:]) if (len(s.path)>1) else 1
    s.wfile.write("<html><body><table>".encode('utf-8'))
    pool = ThreadPool(10)
    results = pool.map(get_url,range(i,i+100))
    for x in range(0,100):
      if not (x % 10): s.wfile.write("<tr>".encode('utf-8'))
      if results[x]=="True":
        s.wfile.write("<td bgcolor='#00ff00'>".encode('utf-8'))
      else:
        s.wfile.write("<td bgcolor='#ff0000'>".encode('utf-8'))
      s.wfile.write(str(x+i).encode('utf-8')+"</td> ".encode('utf-8'))
      if not ((x+1) % 10): s.wfile.write("</tr>".encode('utf-8'))
    s.wfile.write("</table></body></html>".encode('utf-8'))
http.server.HTTPServer(("",80),myHandler).serve_forever()
EOF
nohup python3 /usr/local/sbin/getprimes.py >/dev/null 2>&1 &
```

4. Click **File** &gt; **Save**.
    
5. In Cloud Shell create an instance running this web server:
    

```apache
gcloud compute instances create frontend --zone=$ZONE \
--metadata-from-file startup-script=frontend.sh \
--tags frontend --machine-type=e2-standard-2
```

6. Open the firewall for the front end:
    

```apache
gcloud compute firewall-rules create http2 --network default --allow=tcp:80 \
--source-ranges 0.0.0.0/0 --target-tags frontend
```

7. In the Navigation menu, click **Compute Engine** &gt; **VM instances**. Refresh your browser if you don't see the frontend instance.
    
8. Open the **External IP** for the frontend in your browser:
    

![The VM instances page displaying the IP address of the selected frontend](https://cdn.qwiklabs.com/N8W%2BVCPATqfjQ9DibnvQtba4juXWqVC9E1mJ1a6OdCI%3D align="left")

You should see a matrix like this, showing all prime numbers, up to 100, in green:

![The Matrix diagram displaying prime numbers in green](https://cdn.qwiklabs.com/hfIdl8Z%2FEfqZrwZeLR4DPg1RIO4CiYb3ClmDbCEyuyA%3D align="left")

9. Try adding a number to the path, like http://your-ip/10000, to see all prime numbers starting from that number.
    

![The Matrix diagram displaying prime numbers starting with 100 in green](https://cdn.qwiklabs.com/kUgT%2BzbInrKniQvWT8t3kvCP7%2FuwNtQLqJi86Dsoblc%3D align="left")

**Note:** The example startup script is not effectively calculating prime numbers. It also doesn't have error detection or correction algorithms. Adding large numbers to the path will make the service time out.

Click **Check my progress** below to verify you're on track in this lab.

Create a public facing web server

---

## Solution of Lab

%[https://youtu.be/refjyguVMYQ] 

```apache
export ZONE=
export STATIC_IP=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739517996279/8fd1a42d-e748-4fb5-bc95-c37513eb349a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739518002695/eafec326-5ef1-43f2-a084-705db3b630f7.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Internal%20Load%20Balancer/gsp041.sh
sudo chmod +x gsp041.sh
./gsp041.sh
```