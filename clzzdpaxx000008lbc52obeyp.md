---
title: "User Authentication: Identity-Aware Proxy - GSP499"
seoTitle: "User Authentication: Identity-Aware Proxy - GSP499"
seoDescription: "In this lab, you build a minimal web application with Google App Engine, then explore various ways to use Identity-Aware Proxy (IAP) to restrict access to t"
datePublished: Sun Aug 18 2024 09:42:39 GMT+0000 (Coordinated Universal Time)
cuid: clzzdpaxx000008lbc52obeyp
slug: user-authentication-identity-aware-proxy-gsp499
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747467501163/1dd722a3-3427-4100-8e8c-374f4b1e4b4b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747467641433/a312b401-fc86-48ae-8611-21cd6ccee684.png
tags: user-authentication-identity-aware-proxy-gsp499, gsp499, user-authentication-identity-aware-proxy

---

## **Overview**

In this lab, you build a minimal web application with Google App Engine, then explore various ways to use Identity-Aware Proxy (IAP) to restrict access to the application and provide user identity information to it. Your app will:

* Display a welcome page
    
* Access user identity information provided by IAP
    
* Use cryptographic verification to prevent spoofing of user identity information
    

### What you'll learn

* How to write and deploy a simple App Engine app using Python
    
* How to enable and disable IAP to restrict access to your app
    
* How to get user identity information from IAP into your app
    
* How to cryptographically verify information from IAP to protect against spoofing
    

### Prerequisites

A basic knowledge of the Python programming language will enhance your learning experience.

This lab is focused on Google App Engine and IAP. Non-relevant concepts and code blocks are glossed over and are provided for you to simply copy and paste.

## **Introduction to Identity-Aware Proxy**

Authenticating users of your web app is often necessary, and usually requires special programming in your app. For Google Cloud apps you can hand those responsibilities off to the [Identity-Aware Proxy](https://cloud.google.com/iap/) service. If you only need to restrict access to selected users there are no changes necessary to the application. Should the application need to know the user's identity (such as for keeping user preferences server-side) Identity-Aware Proxy can provide that with minimal application code.

### What is Identity-Aware Proxy?

Identity-Aware Proxy (IAP) is a Google Cloud service that intercepts web requests sent to your application, authenticates the user making the request using the Google Identity Service, and only lets the requests through if they come from a user you authorize. In addition, it can modify the request headers to include information about the authenticated user.

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-bf64ebf7597e@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    0zPhiy2zyr1y
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-19dedccfdb3b`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-19dedccfdb3b
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-bf64ebf7597e@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-19dedccfdb3b
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Download the code

Click the command line area in the Cloud Shell so you can type commands.

Download the code from a public storage bucket and then change to the code folder:

```apache
gsutil cp gs://spls/gsp499/user-authentication-with-iap.zip .
```

```apache
unzip user-authentication-with-iap.zip
```

```apache
cd user-authentication-with-iap
```

This folder contains one subfolder for each step of this lab. You will change to the correct folder to perform each step.

## **Task 1. Deploy the application and protect it with IAP**

This is an App Engine Standard application written in Python that simply displays a "Hello, World" welcome page. We will deploy and test it, then restrict access to it using IAP.

### Review the application code

* Change from the main project folder to the `1-HelloWorld` subfolder that contains code for this step.
    

```apache
cd 1-HelloWorld
```

The application code is in the `main.py` file. It uses the [Flask](http://flask.pocoo.org/) web framework to respond to web requests with the contents of a template. That template file is in `templates/index.html`, and for this step contains only plain HTML. A second template file contains a skeletal example privacy policy in `templates/privacy.html`.

There are two other files: `requirements.txt` lists all the non-default Python libraries the application uses, and `app.yaml` tells Google Cloud that this is a Python App Engine application.

You can list each file in the shell using the cat command, as in:

```apache
cat main.py
```

Or you can launch the Cloud Shell code editor by clicking the Pencil icon at the top right-hand side of the Cloud Shell window, and examine the code that way.

You do not need to change any files for this step.

### Deploy to App Engine

1. Update python runtime to `python39`.
    

```apache
sed -i 's/python37/python39/g' app.yaml
```

2. Deploy the app to the App Engine Standard environment for Python.
    

```apache
gcloud app deploy
```

3. Select a region `us-west1`.
    
4. When you are asked if you want to continue, enter **Y** for yes.
    

**Note:** If you get a **Gaia propagation** related error message, re-run the `gcloud app deploy` command.

In a few minutes the deployment completes. You will see a message that you can view your application with `gcloud app browse`.

5. Enter that command:
    

```apache
gcloud app browse
```

6. Click the displayed link to open it in a new tab, or copy it to a manually opened new tab if necessary. Since this is the first time this app is run, it will take a few seconds to appear while a cloud instance is started, and you should see the following window.
    

![IAP Hello World tabbed page](https://cdn.qwiklabs.com/BUrEJObysrNmE%2FqmU234RAj3kMiAvwOswH%2FAmSdJ%2FNY%3D align="left")

You can open that same URL from any computer connected to the Internet to see that web page. Access is not yet restricted.

Click **Check my progress** to verify the objective.

Deploy an App Engine application

**Check my progress**

### Restrict access with IAP

1. In the cloud console window, click the **Navigation menu** &gt; **Security** &gt; **Identity-Aware Proxy**.
    
2. Click **ENABLE API**.
    
3. Click **GO TO IDENTITY-AWARE PROXY**.
    
4. Click **CONFIGURE CONSENT SCREEN**.
    
5. Select **Internal** under User Type and click **Create**.
    
6. Fill in the required blanks with appropriate values:
    

| **Field** | **Value** |
| --- | --- |
| App name | IAP Example |
| User support email | *Select your lab student email address from the dropdown.* |
| Application home page | *The URL you used to view your app. You can find this again by running the gcloud app browse command in cloud shell again.* |
| Application privacy Policy link | *The privacy page link in the app, same as the homepage link with* `/privacy` added to the end |
| Authorized domains | *Click* ***\+ ADD DOMAIN****The hostname portion of the application's URL, e.g. iap-example-999999.appspot.com. You can see this in the address bar of the Hello World web page you previously opened. Do not include the starting* `https://` *or trailing* `/` *from that URL.* |
| Developer Contact Information | *Enter at least one email* |

7. Click **Save and Continue**.
    
8. For **Scopes**, click **Save and Continue**.
    
9. For **Summary**, click **Back to Dashboard**.
    

You might be prompted to create credentials. You do not need to create credentials for this lab, so you can simply close this browser tab.

10. In Cloud Shell, run this command to disable the Flex API:
    

```apache
gcloud services disable appengineflex.googleapis.com
```

**Note:** App Engine has its standard and flexible environments which are optimized for different application architectures. Currently, when enabling IAP for App Engine, if the Flex API is enabled, Google Cloud will look for a Flex Service Account. Your lab project comes with a multitude of APIs already enabled for the purpose of convenience. However, this creates a unique situation where the Flex API is enabled without a Service Account created.

11. Return to the Identity-Aware Proxy page and refresh it. You should now see a list of resources you can protect.
    

Click the toggle button in the IAP column in the **App Engine app** row to turn **IAP** on.

12. The domain will be protected by IAP. Click **Turn On**.
    

### Test that IAP is turned on

1. Open a browser tab and navigate to the URL for your app. A Sign in with Google screen opens and requires you to log in to access the app.
    
2. Sign in with the account you used to log into the console. You will see a screen denying you access.
    

You have successfully protected your app with IAP, but you have not yet told IAP which accounts to allow through.

3. Return to the Identity-Aware Proxy page of the console, select the checkbox next to **App Engine app**, and see the App Engine sidebar to the right.
    

Each email address (or Google Group address, or Workspace domain name) that should be allowed access needs to be added as a Member.

4. Click **Add Principal**.
    
5. Enter your **Student** email address.
    
6. Then, pick the **Cloud IAP** &gt; **IAP-Secured Web App User** role to assign to that address.
    

You may enter more addresses or Workspace domains in the same way.

![Add principals to "App Engine App" dialog box, Cloud IAP > IAP-secured Web App User](https://cdn.qwiklabs.com/%2B%2Bz37ggBAGLOnH5bbMnE0u70erSWgzXVTqLcsPK%2F1z0%3D align="left")

7. Click **Save**.
    

The message "Policy Updated" will appear at the bottom of the window.

Click **Check my progress** to verify the objective.

Enable and add policy to IAP

**Check my progress**

### Test access

Navigate back to your app and reload the page. You should now see your web app, since you already logged in with a user you authorized.

If you still see the "You don't have access" page, IAP did not recheck your authorization. In that case, do the following steps:

1. Open your web browser to the home page address with `/_gcp_iap/clear_login_cookie` added to the end of the URL, as in `https://iap-example-999999.appspot.com/_gcp_iap/clear_login_cookie`.
    
2. You will see a new Sign in with Google screen, with your account already showing. Do not click the account. Instead, click Use another account, and re-enter your credentials.
    

**Note:** It takes a minute for the role change to take effect. If the page still shows the "You don't have access" message after following the previous steps, wait a minute and try refreshing the page.

These steps cause IAP to recheck your access and you should now see your application's home screen.

If you have access to another browser or can use Incognito Mode in your browser, and have another valid Gmail or Workspace account, you can use that browser to navigate to your app page and log in with the other account. Since that account has not been authorized, it will see the "You Don't Have Access" screen instead of your app.

## **Task 2. Access user identity information**

Once an app is protected with IAP, it can use the identity information that IAP provides in the web request headers it passes through. In this step, the application will get the logged-in user's email address and a persistent unique user ID assigned by the Google Identity Service to that user. That data will be displayed to the user in the welcome page.

* In Cloud Shell, change to the folder for this step:
    

```apache
cd ~/user-authentication-with-iap/2-HelloUser
```

### Deploy to App Engine

1. Update python runtime to `python39`.
    

```apache
sed -i 's/python37/python39/g' app.yaml
```

2. Since deployment takes a few minutes, start by deploying the app to the App Engine Standard environment for Python:
    

```apache
gcloud app deploy
```

3. When you are asked if you want to continue, enter **Y** for yes.
    

In a few minutes the deployment should complete. While you are waiting you can examine the application files as described below.

Click **Check my progress** to verify the objective.

Access User Identity Information

**Check my progress**

### Examine the application files

This folder contains the same set of files as seen in the previous app you deployed, `1-HelloWorld`, but two of the files have been changed: `main.py` and `templates/index.html`. The program has been changed to retrieve the user information that IAP provides in request headers, and the template now displays that data.

There are two lines in `main.py` that get the IAP-provided identity data:

```apache
user_email = request.headers.get('X-Goog-Authenticated-User-Email')
user_id = request.headers.get('X-Goog-Authenticated-User-ID')
```

The **X-Goog-Authenticated-User-** headers are provided by IAP, and the names are case-insensitive, so they could be given in all lower or all upper case if preferred. The render\_template statement now includes those values so they can be displayed:

```apache
page = render_template('index.html', email=user_email, id=user_id)
```

The index.html template can display those values by enclosing the names in double curly braces:

```apache
Hello, {{ email }}! Your persistent ID is {{ id }}.
```

As you can see, the provided data is prefixed with `accounts.google.com`, showing where the information came from. Your application can remove everything up to and including the colon to get the raw values if desired.

### Test the updated IAP

Going back to the deployment, when it is ready, you will see a message that you can view your application with `gcloud app browse`.

1. Enter that command:
    

```apache
gcloud app browse
```

2. If a new tab does not open on your browser, copy the displayed link and open it in a new tab normally. You should see a page similar to the following:
    

![IAP Hello User tabbed page](https://cdn.qwiklabs.com/fe3%2F6PJvDcVemwODFLnePjFaHoMPvNhbWWsNmuJQC4s%3D align="left")

You may need to wait a few minutes for the new version of your application to replace the prior version. Refresh the page if needed to see a page similar to the above.

### Turn off IAP

What happens to this app if IAP is disabled, or somehow bypassed (such as by other applications running in your same cloud project)? Turn off IAP to see.

1. In the cloud console window, click **Navigation menu** &gt; **Security** &gt; **Identity-Aware Proxy**.
    
2. Click the **IAP** toggle switch next to App Engine app to turn **IAP** off. Click **TURN OFF**.
    

You will be warned that this will allow all users to access the app.

3. Refresh the application web page. You should see the same page, but without any user information:
    

![IAP Hello User tabbed page with no user information](https://cdn.qwiklabs.com/60irmGWAbgzDgFX1H3yCFeBha4t3oo%2F%2B2HmbxvVa2vQ%3D align="left")

Since the application is now unprotected, a user could send a web request that appeared to have passed through IAP. For example, you can run the following curl command from the Cloud Shell to do that (replace `<your-url-here>` with the correct URL for your app):

```apache
curl -X GET <your-url-here> -H "X-Goog-Authenticated-User-Email: totally fake email"
```

The web page will be displayed on the command line, and look like the following:

```xml
<!doctype html>
<html>
<head>
  <title>IAP Hello User</title>
</head>
<body>
  <h1>Hello World</h1>

  <p>
    Hello, totally fake email! Your persistent ID is None.
  </p>

  <p>
    This is step 2 of the <em>User Authentication with IAP&lt;/em&gt;
    codelab.
 &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;
</em>
```

There is no way for the application to know that IAP has been disabled or bypassed. For cases where that is a potential risk, Cryptographic Verification shows a solution.

## **Task 3. Use Cryptographic Verification**

If there is a risk of IAP being turned off or bypassed, your app can check to make sure the identity information it receives is valid. This uses a third web request header added by IAP, called `X-Goog-IAP-JWT-Assertion`. The value of the header is a cryptographically signed object that also contains the user identity data. Your application can verify the digital signature and use the data provided in this object to be certain that it was provided by IAP without alteration.

Digital signature verification requires several extra steps, such as retrieving the latest set of Google public keys. You can decide whether your application needs these extra steps based on the risk that someone might be able to turn off or bypass IAP, and the sensitivity of the application.

* In Cloud Shell, change to the folder for this step:
    

```apache
cd ~/user-authentication-with-iap/3-HelloVerifiedUser
```

### Deploy to App Engine

1. Update python runtime to `python39`.
    

```apache
sed -i 's/python37/python39/g' app.yaml
```

2. Deploy the app to the App Engine Standard environment for Python:
    

```apache
gcloud app deploy
```

3. When you are asked if you want to continue, enter **Y** for yes.
    

In a few minutes the deployment should complete. While you are waiting you can examine the application files as described below.

Click **Check my progress** to verify the objective.

Use Cryptographic Verification

**Check my progress**

### Examine the application files

This folder contains the same set of files as seen in `2-HelloUser`, with two files altered and one new file. The new file is `auth.py`, which provides a `user()` method to retrieve and verify the cryptographically signed identity information. The changed files are `main.py` and `templates/index.html`, which now use the results of that method. The unverified headers as found in the last deployment are also shown for comparison.

* The new functionality is primarily in the `user()` function:
    

```apache
def user():
    assertion = request.headers.get('X-Goog-IAP-JWT-Assertion')
    if assertion is None:
        return None, None

    info = jwt.decode(
        assertion,
        keys(),
        algorithms=['ES256'],
        audience=audience()
    )

    return info['email'], info['sub']
```

The `assertion` is the cryptographically signed data provided in the specified request header. The code uses a library to validate and decode that data. Validation uses the public keys that Google provides for checking data it signs, and knowing the audience that the data was prepared for (essentially, the Google Cloud project that is being protected). Helper functions `keys()` and `audience()` gather and return those values.

The signed object has two pieces of data we need: the verified email address, and the unique ID value (provided in the `sub`, for subscriber, standard field).

This completes Step 3.

### Test the Cryptographic Verification

When the deployment is ready you will see a message that you can view your application with `gcloud app browse`.

* Enter that command:
    

```apache
gcloud app browse
```

If a new tab does not open on your browser, copy the displayed link and open it in a new tab normally.

Recall that you previously disabled IAP, so the application provides no IAP data. You should see a page similar to the following:

![IAP Hello Verified tabbed page ID is None](https://cdn.qwiklabs.com/12FJLOT7gwhCPABz0vIPhRKHeE9UwzkCkhPywu5XULw%3D align="left")

As before, you may need to wait a few minutes for the newest version to be live to see the new version of the page.

Since IAP is disabled, no user information is available. Now turn IAP back on.

1. In the cloud console window, click the **Navigation menu** &gt; **Security** &gt; **Identity-Aware Proxy**.
    
2. Click the **IAP** toggle switch next to App Engine app to turn IAP on again. Click **TURN ON**.
    
3. Refresh the page. The page should look like the following:
    

![Hello Verified User tabbed page, you have an ID](https://cdn.qwiklabs.com/UsOXUWd8w0x29naS7Dgiii1kedVbpV5BGxi7PLKFR98%3D align="left")

Notice that the email address provided by the verified method does not have the `accounts.google.com:` prefix.

If IAP is turned off or bypassed, the verified data would either be missing, or invalid, since it cannot have a valid signature unless it was created by the holder of Google's private keys.

---

## Solution of Lab

### Quick

%[https://youtu.be/m3lgM8YXHPA] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/User%20Authentication%20Identity-Aware%20Proxy/gsp499.sh
sudo chmod +x *.sh
./*.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747470362982/a275b5f8-d8d6-4d60-a1df-7723f47b01d1.png align="center")

---

### Manual

%[https://www.youtube.com/watch?v=BMKPS7EeD0A] 

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP/master/User%20Authentication%3A%20Identity-Aware%20Proxy/techcps499.sh
sudo chmod +x techcps499.sh
./techcps499.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723973850661/d9a2a36a-2cde-44f8-804e-addf2bf793fe.png align="center")

**Numeric choice value - Go to Task 1:**

* Point No.2 and Select a **region** value using lab instructions
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723973830340/d6286fa6-a04a-4406-86c9-71c5ffdff360.png align="center")

**Provide your confirmation type:** `Y` **and** `Enter` **(follow same process <mark>3 times</mark>)**

**Under: Task 1**

* "Restrict access with IAP" perform using lab instructions
    
* "Test that IAP is turned on" perform using lab instructions
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723974308833/75ee69d6-f54a-4d25-ad4e-50ea82f013ef.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723974421710/d9dd3e27-1cd7-414b-ad23-b783f7c4a056.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723974478018/55936335-96c7-4c77-bce5-041bbaf3712d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723974782966/ded7ba07-857a-4cb4-8d6e-b5e35b5d0075.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723974731688/e6194bbc-1d87-4e3a-b039-0474abf62bb3.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723974922243/1d76d873-5a27-4237-b3ec-61af07d8a72c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723975031812/9ef71d49-2295-4bfa-81bf-f893d3bb412c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723975006500/58f7e93d-b748-485f-973d-3c79292a965e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723975112788/8d3e1d50-aa33-491f-9f0a-a8b27ecae495.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723975129429/28a10120-f4dd-4360-a312-c59a24f50ae0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723975165017/a7fb5e42-b3f9-4aed-a419-f7ca04055afa.png align="center")

**Congratulations, you're all done with the lab 😄**