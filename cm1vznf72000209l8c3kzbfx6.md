---
title: "Redacting Sensitive Data with the DLP API (Solution)"
seoTitle: "Redacting Sensitive Data with the DLP API (Solution)"
seoDescription: "For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

Sign in to Qwiklabs using an incognito window."
datePublished: Sat Oct 05 2024 10:05:23 GMT+0000 (Coordinated Universal Time)
cuid: cm1vznf72000209l8c3kzbfx6
slug: redacting-sensitive-data-with-the-dlp-api-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728122646864/aef3b343-47cb-41ec-826c-1f2d615607be.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1728122705544/cc3068ea-d9e9-4ba3-ad5e-9672c9d76ee4.png

---

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

## **Task 1. Enable the DLP API**

In this task, you enable the DLP API through APIs & Services.

1. Go to **Navigation menu &gt; APIs & Services**.
    
2. Click the **Enable APIs and Services** button.
    
3. In the **Search for APIs & Services** field, enter `DLP` and then click on the **Cloud Data Loss Prevention (DLP) API** title.
    

![Google Cloud Data Loss Prevention (DLP) API selection](https://cdn.qwiklabs.com/otwsQGvohnG3pFLCRITjLRpJswBTSdSHBHaBckvzoTw%3D align="left")

4. Click the **Enable** button to enable the DLP API. If the API is already enabled, you will see a **Manage** button instead, along with an *API enabled* message. In that case you do not need to do anything.
    

## **Task 2. Install the DLP API and Node JS samples**

In this task, you download the Node JS DLP API and samples and install the required dependencies.

1. On the Google Cloud Console tile bar, click **Activate Cloud Shell** () to open Cloud Shell. When prompted, click **Continue**. After a moment, in the lower part of the browser window, the Terminal appears.
    
2. Run the following command to create the `GCLOUD_PROJECT` environment variable and set it to the project ID:
    

```apache
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID
```

3. Run the following command in Cloud Shell to download the Node JS DLP API and samples:
    

```apache
git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples
```

4. Once the download is complete, change into the **nodejs-docs-samples/dlp** directory:
    

```apache
cd nodejs-docs-samples/dlp
```

There are several Node JS DLP sample programs in this folder. Before you run them, you need to install the dependencies.

5. Run the following command to install the required dependencies:
    

```apache
npm install @google-cloud/dlp
npm install yargs
npm install mime@2.5.2
```

## **Task 3. Inspect and redact sensitive data**

In this task, you inspect and mask sensitive information from the string also use the DLP API to redact sensitive data from an image.

### Inspect a string for sensitive information

1. In Cloud Shell run the command below. (If prompted, click **Authorize**.)
    

```apache
node inspectString.js $GCLOUD_PROJECT "My email address is joe@example.com."
```

You should receive the following output.

**Output:**

```apache
Findings:
        Info type: EMAIL_ADDRESS
        Likelihood: LIKELY
```

The result shows what sensitive data was found, what type of information it is, and how certain the API is about that info type.

2. In Cloud Shell, run the following command:
    

```apache
node inspectString.js $GCLOUD_PROJECT "My phone number is 555-555-5555."
```

You should receive the following output.

**Output:**

```apache
Findings:
        Info type: PHONE_NUMBER
        Likelihood: VERY_LIKELY
```

3. Feel free to experiment with different input to the **inspectString.js** program. For example, try passing in values like `1234-5678-9876-5432` or `123-45-6789`.
    

### Mask sensitive information from a string

* In Cloud Shell, run the following command:
    

```apache
node deidentifyWithMask.js $GCLOUD_PROJECT "My phone number is 555-555-5555."
```

You should receive the following output.

**Output:**

```apache
My phone number is ************.
```

### Redact sensitive data from images

You will now use the DLP API to redact sensitive data from an image.

1. Right-click on the image below and select **Save image as**. Save it locally on your computer as `dlp-input.png`.
    

![Image with sample text and an email address](https://cdn.qwiklabs.com/au1ucO0F7rzOgXmeZjuKq%2BO3TQsftlIdPT%2FIMpF7f%2B0%3D align="left")

2. In the bar above the terminal, click the button at the top right with three vertical dots and select **Upload**.
    

![Upload menu selection](https://cdn.qwiklabs.com/vo1KqPLevku8N4DrR8QQNGo2CgT90D5LVbF7O%2Fg%2FE24%3D align="left")

If **Upload** is not clickable ("grayed out"), then click **Restart**. After the Cloud Shell environment is restarted, the **Upload** Link should be active.

Execute these commands commands before starting the next step in the lab.

```apache
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID
```

3. Click **Choose Files**, select the downloaded **dlp-input.png** image file, and **Upload** it to Cloud Shell.
    
4. From **Cloud Shell**, click **Open Editor** . This will launch the Cloud Shell code editor, which includes a file browser.
    
5. In the Cloud Shell code editor, on the left, you should see the **dlp-input.png** file.
    
6. Click the **dlp-input.png** file to display the image and verify it was uploaded.
    
7. From **Cloud Shell**, click **Open Terminal** to return to the terminal window.
    
8. In the terminal, run the following command to redact the email address values from the image:
    

```apache
node redactImage.js $GCLOUD_PROJECT ~/dlp-input.png "" EMAIL_ADDRESS ~/dlp-redacted.png
```

9. Open **Editor**.
    
10. In the Cloud Shell code editor, on the left, click the **dlp-redacted.png** file.
    

You will see the image with the domain name redacted.

![Sample image has the email address redacted](https://cdn.qwiklabs.com/9gK7DmzeoUMro5IuFCXxSjIzAcDlgnyeyXeEOOvdKgU%3D align="left")

When calling the redact API, you specified `EMAIL_ADDRESS` as the infotype to redact. In the image, you should notice that the email address is no longer visible.

---

## Solution of Lab

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">Just open the lab for <mark>5-10 minutes</mark> and do not need to do anything</div>
</div>