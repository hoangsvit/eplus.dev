---
title: "Identify Application Vulnerabilities with Security Command Center -"
seoTitle: "Identify Application Vulnerabilities with Security Command Center"
seoDescription: "In this lab, you will use Web Security Scanner—one of Security Command Center's built-in services—to scan a Python Flask application for vulnerabilities. We"
datePublished: Thu Aug 22 2024 04:48:57 GMT+0000 (Coordinated Universal Time)
cuid: cm04sz0ka001109lc4hhk70vy
slug: identify-application-vulnerabilities-with-security-command-center
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724301450181/4531e5a8-dac0-4b90-94d8-180738ec2f1b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724302126657/d115c579-91c6-445c-8e22-66f5aaaa06b9.png
tags: identify-application-vulnerabilities-with-security-command-center

---

## **Overview**

### Introduction

In this lab, you will use Web Security Scanner—one of [Security Command Center's](https://cloud.google.com/security-command-center) built-in services—to scan a Python Flask application for vulnerabilities. Web Security Scanner identifies security vulnerabilities in your App Engine, Google Kubernetes Engine (GKE), and Compute Engine web applications.

This service crawls your application, following all links within the scope of your starting URLs, and attempts to exercise as many user inputs and event handlers as possible. It can automatically scan and detect four common vulnerabilities, including cross-site-scripting (XSS), flash injection, mixed content (HTTP in HTTPS), and outdated/insecure libraries.

Web Security Scanner enables early identification of vulnerabilities and delivers very low false positive rates. You can easily set up, run, schedule, and manage security scans.

### Scenario

![Cymbal Bank logo](https://cdn.qwiklabs.com/7HNsRbL5DC5fTizZUhMXIP9PpTe%2F03j3kzaLp2KOqmI%3D align="left")

Cymbal Bank is an American retail bank with over 2,000 branches in all 50 states. It offers comprehensive debit and credit services that are built on top of a robust payments platform. Cymbal Bank is a digitally transforming legacy financial services institution.

Cymbal Bank was founded in 1920 under the name Troxler. Cymbal Group acquired the company in 1975 after it had been investing heavily in Cymbal Group's proprietary ATMs. As the bank grew into a national leader, they put strategic emphasis on modernizing the customer experience both in-person at their branches and digitally through an app they released in 2014. Cymbal Bank employs 42,000 people nationwide and, in 2019, reported $24 billion in revenue.

Cymbal Bank is interested in developing a new banking application for their corporate clients using Google Cloud technology. Application security is critical, and the CTO wants to see how Google Cloud can identify and mitigate application security vulnerabilities. As a Cloud Security Engineer, you are tasked with demonstrating Security Command Center's cutting-edge application vulnerability scanning features.

### Objectives

In this lab, you will perform the following tasks:

* Launch a vulnerable Python Flask application on a Compute Engine instance
    
* Use Web Security Scanner to scan the application and find vulnerabilities
    
* Fix the application vulnerability
    
* Scan the application again and verify vulnerabilities no longer exist
    

## **Setup and requirements**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

## **Task 1. Launch a Virtual machine and deploy a vulnerable application**

In this task, you will set up the infrastructure to demonstrate an application vulnerability to Cymbal Bank's CTO. More specifically, you will deploy a virtual machine, obtain the application code and introduce a vulnerability that will be detected by Web Security Scanner. This application is a simple form that receives a user's input and outputs it without any changes.

1. On the Google Cloud Console title bar, click **Activate Cloud Shell** (). If prompted, click **Continue**.
    
2. Create a static IP address that will be used for scanning a vulnerable web application:
    

```apache
gcloud compute addresses create xss-test-ip-address --region=us-central1
```

3. Run the following command to output the static IP address you just generated:
    

```apache
gcloud compute addresses describe xss-test-ip-address \
--region=us-central1 --format="value(address)"
```

4. Copy the IP address (a single line of the output) and save it in a notepad.
    
5. Run the following command to create a VM instance to run the vulnerable application:
    

```apache
gcloud compute instances create xss-test-vm-instance \
--address=xss-test-ip-address --no-service-account \
--no-scopes --machine-type=e2-micro --zone=us-central1-a \
--metadata=startup-script='apt-get update; apt-get install -y python3-flask'
```

The startup script will install python-flask, a Web Application Framework, which is used for running a simple Python application demonstrating cross-site scripting (XSS) vulnerability, which is a common web application security vulnerability.

6. Open a firewall rule for Web Security Scanner to access a vulnerable application. Note the source ranges from which Web Security Scanner scans applications.
    

```apache
gcloud compute firewall-rules create enable-wss-scan \
--direction=INGRESS --priority=1000 \
--network=default --action=ALLOW \
--rules=tcp:8080 --source-ranges=0.0.0.0/0
```

Click **Check my progress** to verify the objective.

Create the VM with desired configurations

**Check my progress**

7. Open the navigation menu and select **Compute Engine &gt; VM Instances**.
    
8. Then click on the **SSH** button next to your instance:
    

![SSH button in Cloud Console](https://cdn.qwiklabs.com/18AiGcc4NgZ78wIbJX3fPQOk4aECAx2liEiwXEEvhiQ%3D align="left")

9. A pop-up may appear asking you to allow SSH in-browser to connect to VMs. Click **Authorize**.
    

This will open an SSH connection to your VM instance in a new window.

10. In this SSH window (***Not in Cloud Shell***), run the following command to download and extract the vulnerable web application files:
    

```apache
gsutil cp gs://cloud-training/GCPSEC-ScannerAppEngine/flask_code.tar  . && tar xvf flask_code.tar
```

11. Now run the following command to deploy your application:
    

```apache
python3 app.py
```

12. Soon after, you should receive a message that indicates your application is up and running:
    

```apache
 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
```

13. Find the static IP address of the VM you copied into your notepad earlier.
    
14. Replace `YOUR_EXTERNAL_IP` in the URL field below with that IP address, and open the URL in a new browser tab:
    

```apache
http://<YOUR_EXTERNAL_IP>:8080
```

**Note:** You can also find the external IP address in the Google Cloud Console, where it's listed as a field associated with your VM instance.

15. A Cymbal Bank corporate banking portal with a web form should appear.
    
16. In the web form enter the following string:
    

```xml
<script>alert('This is an XSS Injection')</script>
```

17. Now press the **POST** button.
    

You should see the following alert window:

![Alert window in browser](https://cdn.qwiklabs.com/2JDmvcyzlCfFS71m72VCY%2BEXkNpwbZbxGUnWSWIHnCo%3D align="left")

This is a common vulnerability in web applications: a cross-site scripting vulnerability. Cross-site scripting (XSS) is a vulnerability that enables attackers to run malicious scripts in users' browsers in the context of your application. Your browser interprets a string as a legitimate Javascript and executes it.

An attacker who uses an XSS bug to inject JavaScript into an HTML page gains virtually unlimited access to the logged-in sessions of the victims who visit the page: they may steal user data, tamper with it, change privacy or security settings, or even completely alter the way the product looks and operates. Even more, an XSS vulnerability in one application, no matter how inconsequential, may jeopardize other content within the same domain.

This is one of many application vulnerabilities that Web Security Scanner can help you identify.

Click **Check my progress** to verify the objective.

Download vulnerable web application files on the VM

**Check my progress**

## **Task 2. Scan the application with Web Security Scanner**

Now that we've launched our vulnerable application, it's time to demonstrate Web Security Scanner's abilities to the CTO. In this task, you will configure and set up a scan of the application to find security vulnerabilities.

1. Switch back to the browser tab displaying the Cloud console.
    
2. Open the Navigation menu and select **APIs & Services** &gt; **Library**.
    
3. In Search for APIs and services type **Web Security Scanner** and press **Enter**.
    
4. Select **Web Security Scanner API**.
    
5. Click **Enable** to enable the Web Security Scanner API.
    

Click **Check my progress** to verify the objective.

Enable the Web Security Scanner API

**Check my progress**

6. Open the Navigation menu and select **Security** &gt; **Web Security Scanner**.
    
7. Click **\+ New Scan**.
    
8. In the **Starting URLs** section, the **Starting URL 1** field should be pre-populated with your static IP address.
    
9. Add the port number **8080**, so that the Starting URL looks like the following:
    

```apache
  http://<EXTERNAL_IP>:8080
```

10. If present, delete **Starting URL 2**.
    
11. Take a minute to review the remaining fields on the **Create a new scan** screen:
    

* **Authentication:** a property that can be used to provide application credentials to allow the scanner to authenticate to an app while scanning.
    
* **Schedule:** a property that can be used to schedule scans to run automatically.
    
* **Export to Security Command Center:** a property that allows you to automatically export scan configurations and scan results to Cloud Security Command Center after scans are finished.
    

12. Verify the **Authentication** is still set to **None** and that **Schedule** is set to **Never**.
    
13. Click **Show More** to investigate the remaining settings.
    
14. Click **Save** to create the scan.
    

**Note:** This creates the scan, but do not run it yet. It must currently be run manually since you did not create a schedule yet.

15. Click **Run** to start the scan
    

**Note:** Given the number of possible tests, this can take a little over **10 minutes** to scan.

16. Return to your SSH session in your separate window.
    

If the session timed out, run the following command to restart your application:

```apache
python3 app.py
```

In your SSH Window, you will begin to see logs generated similar to the example below—this is Web Security Scanner testing all possible URLs for potential vulnerabilities:

```json
34.29.3.21 - - [23/Mar/2023 23:30:41] "GET /output HTTP/1.1" 200 -
35.184.129.44 - - [23/Mar/2023 23:31:06] "GET /output HTTP/1.1" 200 -
35.184.129.44 - - [23/Mar/2023 23:31:07] "GET /favicon.ico HTTP/1.1" 404 -
34.68.231.45 - - [23/Mar/2023 23:31:09] "POST / HTTP/1.1" 302 -
34.68.231.45 - - [23/Mar/2023 23:31:09] "GET /output HTTP/1.1" 200 -
34.68.231.45 - - [23/Mar/2023 23:31:09] "GET /favicon.ico HTTP/1.1" 404 -
35.184.129.44 - - [23/Mar/2023 23:31:17] "POST / HTTP/1.1" 302 -
35.184.129.44 - - [23/Mar/2023 23:31:17] "GET /output HTTP/1.1" 200 -
```

You may see log statements with the following HTTP status codes:

* **200:** A successful request, where the HTTP server answered with an OK response.
    
* **302:** Indicates a resource is temporarily located elsewhere according to the Location header.
    
* **404:** indicates that one or more resources were not found.
    

Check out [this documentation](https://cloud.google.com/storage/docs/json_api/v1/status-codes#standardcodes) for more information on HTTP status and error codes.

While the scan is running, feel free to explore the **Results**, **URLs Crawled**, and **Details** tabs. You can also check out this [getting started video](https://www.youtube.com/watch?v=1BengAd2_cI), or this [vulnerability scanning video](https://www.youtube.com/watch?v=ai5Hr5zkn50) to learn more about Web Security Scanner.

17. When the scan is done running, the **Results** tab should indicate the cross-site vulnerabilities.
    

![Web Security Scanner results with vulnerabilities](https://cdn.qwiklabs.com/zNjWH7Ajz8Vkduyrzuzfqd2sWL7fMuUdx%2BKGyE9zHNg%3D align="left")

The Web Security Scanner was able to scan all starting URLs and detect the XSS vulnerabilities in Cymbal Bank's application. The ability to automate the detection of these critical vulnerabilities is a major benefit for security-minded organizations like Cymbal Bank. You will now fix the vulnerability in Cymbal Bank's application code and test once again.

Click **Check my progress** to verify the objective.

Run a Web Security Scanner scan and detect application vulnerabilities

**Check my progress**

## **Task 3. Correct the vulnerability and scan again**

Now that you have demonstrated Web Security Scanner can detect a XSS vulnerability, you will remediate the vulnerability and run the application scan again.

1. Return to your SSH window that's connected to your VM instance.
    
2. Stop the running application by pressing **CTRL + C.**
    
3. Edit the **app.py** file using the nano editor by running the following command:
    

```apache
nano app.py
```

4. locate the two lines that set the output string:
    

```apache
#  output_string = "".join([html_escape_table.get(c, c) for c in input_string])
  output_string = input_string
```

5. Remove the ‘#' symbol from the first line and add it to the beginning of the next line (*ensure that you indent your code properly!*)
    

Your final lines must look like the following:

```apache
@app.route('/output')
def output():
  output_string = "".join([html_escape_table.get(c, c) for c in input_string])
  # output_string = input_string
  return flask.render_template("output.html", output=output_string)
```

**Note:** `html_escape_table` is a dictionary that contains one-to-one pairings of special HTML characters like "&lt;" to their text representation. We use this table to escape special HTML characters so our form ingests and interprets submissions as raw text only. You can find more information [here](https://www.lambdatest.com/free-online-tools/html-escape#:~:text=What%20is%20HTML%20Escape%3F,HTML%20entities%20to%20plain%20text).

6. Now type **CTRL+X &gt; Y &gt; Enter** to save your changes.
    
7. Now re-run the application:
    

```apache
python3 app.py
```

8. Return to the Google Cloud Console (you should still have the Web Security Scanner page open):
    
9. Click **Run** at the top of the page.
    

In your SSH Window, you will start to see logs where Web Security Scanner tests application URLs for potential vulnerabilities:

```bash
34.29.3.21 - - [23/Mar/2023 23:30:41] "GET /output HTTP/1.1" 200 -
35.184.129.44 - - [23/Mar/2023 23:31:06] "GET /output HTTP/1.1" 200 -
35.184.129.44 - - [23/Mar/2023 23:31:07] "GET /favicon.ico HTTP/1.1" 404 -
34.68.231.45 - - [23/Mar/2023 23:31:09] "POST / HTTP/1.1" 302 -
34.68.231.45 - - [23/Mar/2023 23:31:09] "GET /output HTTP/1.1" 200 -
34.68.231.45 - - [23/Mar/2023 23:31:09] "GET /favicon.ico HTTP/1.1" 404 -
35.184.129.44 - - [23/Mar/2023 23:31:17] "POST / HTTP/1.1" 302 -
35.184.129.44 - - [23/Mar/2023 23:31:17] "GET /output HTTP/1.1" 200 -
```

10. While you are waiting for the results of the scan, login to the URL `http://<EXTERNAL_IP>:8080` using your browser in a separate tab.
    
11. You should see the web form once again.
    
12. In the web form enter the same string that you entered in before:
    

```xml
<script>alert('This is an XSS Injection')</script>
```

13. Now press the **POST** button.
    
14. Verify that this time you see the string displayed in the browser:
    

![Input displayed as text string](https://cdn.qwiklabs.com/UuSnBBO%2BKVOGv47KPpzEBSOoa%2F%2FghXxJ8znqMt9TzL0%3D align="left")

**Note:** Although this technique works in this simple scenario, for proper protection of your web application you need to use more advanced techniques and frameworks which are out of scope of this lab.

Explore the links below for more resources:

* [Angular Security](https://angular.io/guide/security)
    
* [Google XSS Game](https://xss-game.appspot.com/)
    
* [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
    

15. Return to the Google Cloud Console, where you left off on the Web Security Scanner page.
    
16. Click **Run** at the top of the page to re-scan your application.
    
17. Soon after, you will see that the results yield no more XSS vulnerabilities:
    

![Web Security Scanner output with no vulnerabilities](https://cdn.qwiklabs.com/nfsc%2B30HZrnOWepWCagx3F5tZlFOWKm03XuwQDa2kzQ%3D align="left")

Well done! You have successfully demonstrated to the Cymbal Bank CTO how to identify and remediate XSS vulnerabilities with Google Cloud's powerful Web Security Scanner solution.

Click **Check my progress** to verify the objective.

Correct vulnerabilities and rescan your application using Web Security Scanner

---

## Solution of Lab

%[https://www.youtube.com/watch?v=uBscsgvn4AI] 

**Run the following Commands in CloudShell**

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724301658458/9024daf6-8ffd-460a-ba5a-1459fd9e5e09.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Identify%20Application%20Vulnerabilities%20with%20Security%20Command%20Center/shell-1.sh
sudo chmod +x shell-1.sh
./shell-1.sh
```

* Go to `Cloud Web Security Scanner` from [here](https://console.cloud.google.com/security/web-scanner/scanConfigs?)
    
* #### NOTE : Check All Score Upto `Task 2`
    

**Run a**[**g**](https://console.cloud.google.com/security/web-scanner/scanConfigs?)**ain the following Commands in CloudShell**

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Identify%20Application%20Vulnerabilities%20with%20Security%20Command%20Center/shell-2.sh
sudo chmod +x shell-2.sh
./shell-2.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724302110289/2e1c9d0a-a903-4e48-bb2e-335068ddd7dc.png align="center")

Congratulations 🎉 for completing the Lab !

##### You Have Successfully Demonstrated Your Skills And Determination.

#### Well done!