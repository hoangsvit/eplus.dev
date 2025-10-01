---
title: "Develop and Secure APIs with Apigee X: Challenge Lab - GSP363"
seoTitle: "Develop and Secure APIs with Apigee X: Challenge Lab - GSP363"
seoDescription: "Master Apigee X challenge lab by developing secure APIs with hands-on tasks. Test skills, earn feedback, and explore Apigee functionalities"
datePublished: Wed Oct 01 2025 04:01:31 GMT+0000 (Coordinated Universal Time)
cuid: cmg7gm0f2000002la76qmbrsi
slug: develop-and-secure-apis-with-apigee-x-challenge-lab-gsp363
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759291259006/3fed9c8b-a9ec-420f-9efd-4d523c6609aa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759291273828/451102b9-94f9-470d-9660-dbd8a34a6f6b.png
tags: develop-and-secure-apis-with-apigee-x-challenge-lab-gsp363, develop-and-secure-apis-with-apigee-x-challenge-lab, gsp363

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have completed the labs in the [Develop and Secure APIs with Apigee X](https://www.cloudskillsboost.google/course_templates/714) course. Are you ready for the challenge?

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are a Cloud Engineer for Cymbal Shops, a national retailer. Cymbal Shop is focused on global sales, and translation services have been identified as a key tool to help expand the global business. You are responsible for creating the first version of a translation API.

You are expected to have the skills and knowledge for these tasks, so step-by-step guides are not provided.

### Your challenge

You will create a new Apigee API proxy and other resources in the project's Apigee organization. Read through each task description, and create the required functionality.

### Save errors

When you save changes to your API proxy, you might encounter a `Could not save new revision` error. If you use the Save dropdown button (), and then select *Save as new revision*, you should see an error message that tells you what is invalid.

## Task 1. Proxy the Cloud Translation API

Cymbal Shops has decided to use Google Cloud's [Translation API](https://cloud.google.com/translate/docs/quickstarts/) as the backend service for the API proxy.

**Requirements:**

1. In the [Google Cloud Console](https://console.cloud.google.com/), confirm that the **Cloud Translation API** is enabled in the [API Library](https://console.cloud.google.com/apis/library).
    
2. Create a service account for the API proxy named `apigee-proxy`, and grant it the role **Logging &gt; Logs Writer**.
    
3. In the [Google Cloud Console](https://console.cloud.google.com/),from the Navigation menu, select **Apigee** to open the Apigee UI and create your [API proxy](https://cloud.google.com/apigee/docs/api-platform/fundamentals/understanding-apis-and-api-proxies).
    
4. The API proxy should be a [reverse proxy](https://cloud.google.com/apigee/docs/api-platform/fundamentals/build-simple-api-proxy#creatingareverseproxyforanhttpservice) named **translate-v1**, with a base path of **/translate/v1**.
    
5. The API proxy's target is the HTTP URL for the [basic version](https://cloud.google.com/translate/docs/basic/quickstart) of the Cloud Translation API (`https://translation.googleapis.com/language/translate/v2`).
    
6. Do **not** add authorization, CORS, or a quota using the Common Policies page of the proxy wizard.
    
7. On the summary page, create the API proxy by leaving the settings at their defaults.
    
8. Add an [Authentication section](https://cloud.google.com/apigee/docs/api-platform/reference/api-proxy-configuration-reference#authentication-element-usage) to the **default TargetEndpoint**, causing an access token to be sent with every backend request. Use a **GoogleAccessToken** element with a *Scope* of `https://www.googleapis.com/auth/cloud-translation`.
    

**Note:** Edit the proxy and in the **Develop** tab, under *Target endpoints* section, edit the default.xml file.

9. Use the following Cloud Shell script to confirm that the Apigee runtime is completely installed:
    

```apache
export INSTANCE_NAME=eval-instance; export ENV_NAME=eval; export PREV_INSTANCE_STATE=; echo "waiting for runtime instance ${INSTANCE_NAME} to be active"; while : ; do export INSTANCE_STATE=$(curl -s -H "Authorization: Bearer $(gcloud auth print-access-token)" -X GET "https://apigee.googleapis.com/v1/organizations/${GOOGLE_CLOUD_PROJECT}/instances/${INSTANCE_NAME}" | jq "select(.state != null) | .state" --raw-output); [[ "${INSTANCE_STATE}" == "${PREV_INSTANCE_STATE}" ]] || (echo; echo "INSTANCE_STATE=${INSTANCE_STATE}"); export PREV_INSTANCE_STATE=${INSTANCE_STATE}; [[ "${INSTANCE_STATE}" != "ACTIVE" ]] || break; echo -n "."; sleep 5; done; echo; echo "instance created, waiting for environment ${ENV_NAME} to be attached to instance"; while : ; do export ATTACHMENT_DONE=$(curl -s -H "Authorization: Bearer $(gcloud auth print-access-token)" -X GET "https://apigee.googleapis.com/v1/organizations/${GOOGLE_CLOUD_PROJECT}/instances/${INSTANCE_NAME}/attachments" | jq "select(.attachments != null) | .attachments[] | select(.environment == \"${ENV_NAME}\") | .environment" --join-output); [[ "${ATTACHMENT_DONE}" != "${ENV_NAME}" ]] || break; echo -n "."; sleep 5; done; echo "***ORG IS READY TO USE***";
```

When the script returns `ORG IS READY TO USE`, you can proceed to next steps.

**Note:** If you are waiting for the runtime to install, you may read ahead and plan your development for Task 2.

10. Save and deploy the *translate-v1* proxy to the *eval* environment using the following service account:
    

```apache
apigee-proxy@qwiklabs-gcp-01-e45040d21deb.iam.gserviceaccount.com
```

11. Test the API proxy.
    

The eval environment in the Apigee organization can be called using the hostname *eval.example.com*. This DNS entry is only available in the internal network, so you must use a VM that has been created for you.

12. In Cloud Shell, open an SSH connection to **apigeex-test-vm**:
    

```apache
TEST_VM_ZONE=$(gcloud compute instances list --filter="name=('apigeex-test-vm')" --format "value(zone)")
gcloud compute ssh apigeex-test-vm --zone=${TEST_VM_ZONE} --force-key-file-overwrite
```

13. If asked to authorize, click **Authorize**. For each question asked in the gcloud command, click **Enter** or **Return** to specify the default input.
    
14. Once you have successfully completed Task 1, the following curl command should translate the text:
    

```apache
curl -i -k -X POST "https://eval.example.com/translate/v1" -H "Content-Type: application/json" -d '{ "q": "Translate this text!", "target": "es" }'
```

The response should look similar to this:

```apache
{
  "data": {
    "translations": [
      {
        "translatedText": "¡Traduce este texto!",
        "detectedSourceLanguage": "en"
      }
    ]
  }
}
```

**Note:** For a few minutes, you may receive a 502 error response until your API proxy is fully deployed.

Click *Check my progress* to verify the objective.

Proxy the Cloud Translation API

**Note:** If a green check mark isn't displayed, click the score fly-out on the upper-right, and then click **Check my progress** on the relevant step. A pop-up box will give you advice.

## Task 2. Change the API request and response

Cymbal Shops wants to create an API that is different from the interface provided by the Translation API. There are two Translation API calls that should be modified.

The first call [retrieves a list of valid languages](https://cloud.google.com/translate/docs/basic/discovering-supported-languages#listing_supported_languages_in_target_language).

Cloud Translation API request:

```apache
REQUEST:
POST https://translation.googleapis.com/language/translate/v2/languages
Authorization: Bearer ACCESSTOKEN
Content-Type: application/json

{
  "target": "en"
}
```

Cloud Translation API response:

```apache
Content-Type: application/json

{
  "data": {
    "languages": [
      {
        "language": "af",
        "name": "Afrikaans"
      },
      {
        "language": "sq",
        "name": "Albanian"
      },
      ...
    ]
  }
}
```

translate-v1 request:

```apache
GET https://eval.example.com/translate/v1/languages
```

translate-v1 response:

```apache
Content-Type: application/json

[{"language":"af","name":"Afrikaans"},{"language":"sq","name":"Albanian"}, ... ]
```

The API proxy must replace the GET with a POST, remove the *data* and *languages* response fields, and get the target language code from a [property set](https://cloud.google.com/apigee/docs/api-platform/cache/property-sets). The access token was added automatically by the *Authentication* section in Task 1.

The second call [translates text to a specified language](https://cloud.google.com/translate/docs/basic/translating-text#translating_input_strings).

Cloud Translate API request:

```apache
POST https://translation.googleapis.com/language/translate/v2
Authorization: Bearer ACCESSTOKEN
Content-Type: application/json

{
  "q": "Hello world!",
  "target": "de"
}
```

Cloud Translate API response:

```apache
Content-Type: application/json

{
  "data": {
    "translations": [
      {
        "translatedText": "Hallo Welt!",
        "detectedSourceLanguage": "en"
      }
    ]
  }
}
```

translate-v1 request:

```apache
POST https://eval.example.com/translate/v1?lang=de
Content-Type: application/json

{
  "text": "Hello world!"
}
```

translate-v1 response:

```apache
Content-Type: application/json

{
  "translated": "Hallo Welt!"
}
```

The API proxy must take the target language from the *lang* query parameter, and change the field names for the incoming and translated text. The *lang* query parameter may optionally be omitted from the translate-v1 request, in which case the target language will be taken from a property in the property set.

**Note:** The Translation API accepts either a single string or an array of strings for the 'q' field. Your API should only support a single string.

**Requirements:**

1. Within the API proxy, create a [property set](https://cloud.google.com/apigee/docs/api-platform/cache/property-sets) named **language.properties**. The property set should have two properties: *output* with a value of `es`, and *caller* with a value of `en`. The *caller* property will be used to specify the target language when listing languages (the language used for the *name* field). *output* will specify the default target language to be used if the *lang* query parameter is not provided.
    
2. In the proxy endpoint, create a path and verb conditional flow for the `POST /` resource. Name it `translate`.
    
3. In the proxy endpoint, create a path (no verb) conditional flow for the `/languages` resource. Name it `getLanguages`. (Do not include a verb. You will be modifying the request's verb from `GET` (for the input to the proxy) to `POST` (required by the backend). If you include a verb in the condition, response policies in the flow would not execute because `request.verb` is no longer equal to `GET`.)
    
4. Create an [AssignMessage policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/assign-message-policy) named `AM-BuildTranslateRequest` to create the backend request used in the *translate* conditional flow.
    

The policy should include:

* An [AssignVariable](https://cloud.google.com/apigee/docs/api-platform/reference/policies/assign-message-policy#example-3) with a template to create variables which will be used later in a logged message. The variable named `text` should use the [jsonPath message template function](https://cloud.google.com/apigee/docs/api-platform/reference/message-template-intro#json-path-function) to extract the `text` field from the request.
    
* The variable named `language` should be created by using the [firstnonnull message template function](https://cloud.google.com/apigee/docs/api-platform/reference/message-template-intro#null-coalescing-function). This variable should contain the *lang* query parameter value if it exists, and the language property set's *output* property for the target language if the *lang* query parameter has not been specified.
    
* A [Set](https://cloud.google.com/apigee/docs/api-platform/reference/policies/assign-message-policy#set) section should be used to set the JSON payload required by the backend service. Both variables you have created will be used in the payload.
    
* The \[AssignTo\] element should use the existing request message.
    
    The *AssignVariable* sections in the *AssignMessage* policy should look similar to this:
    
    ```apache
      <AssignVariable>
        <Name>...</Name>
        <Template>...</Template>
      <AssignVariable>
    ```
    

5. Create an *AssignMessage* policy named `AM-BuildTranslateResponse` under *translate* conditional flow to create the response for the caller using the Translation API response.
    

The policy should include:

* An *AssignVariable* with a *jsonPath* template to create a variable named `translated`, extracting the *translatedText* field from the Translation API response. **Hint**: the JSONPath expression to extract this field is `$.data.translations[0].translatedText`.
    
* Set *createNew* to true.
    
* The new JSON payload will use the *translated* variable.
    
    The *AssignVariable* sections in the *AssignMessage* policy should look similar to this:
    
    ```apache
      <AssignVariable>
        <Name>...</Name>
        <Template>...</Template>
      <AssignVariable>
    ```
    

6. Create an *AssignMessage* policy named `AM-BuildLanguagesRequest` to create the backend request used in the *getLanguages* conditional flow.
    

The policy should include:

* Use *Set* to set the correct verb and payload for the backend request.
    
* The *caller* property in the *language* property set should be used for the *target* field in the backend payload.
    
* Set *createNew* to true.
    
* Set the backend request payload to have a content type of *application/json*.
    
    The *AssignVariable* sections in the *AssignMessage* policy should look similar to this:
    
    ```apache
      <AssignVariable>
        <Name>...</Name>
        <Set>
          ...
        </Set>
      </AssignVariable>
    ```
    

7. Create a [JavaScript policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/javascript-policy) named `JS-BuildLanguagesResponse` under *getLanguages* conditional flow to create the response for the caller. The JavaScript code should use these steps:
    

* Use [context.getVariable](https://cloud.google.com/apigee/docs/api-platform/reference/javascript-object-model#contextobjectreference-contextobjectmethods) to retrieve the `response.content` variable.
    
* Use [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) to convert the *response.content* JSON into an object.
    
* Use [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to convert the *data.languages* field in the object into JSON.
    
* Use [context.setVariable](https://cloud.google.com/apigee/docs/api-platform/reference/javascript-object-model#contextobjectreference-contextobjectmethods) to replace `response.content` with the JSON from step 3.
    

Your JavaScript code should look similar to this:

```apache
var payload = ...;
var payloadObj = JSON.parse(...);
var newPayload = JSON.stringify(...);
context.setVariable(...);
```

**Note:** Make sure to create the desired policies under their correct conditional flows and edit the desired policy configurations in respective .xml files.

8. Test the API. From the **apigeex-test-vm** virtual machine, use the following curl commands to test the examples shown above:
    

* List of languages:
    
    ```apache
    curl -i -k -X GET "https://eval.example.com/translate/v1/languages"
    ```
    
* Translate to specified language (German):
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1?lang=de" -H "Content-Type:application/json" -d '{ "text": "Hello world!" }'
    ```
    
* Translate to default language (Spanish):
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1" -H "Content-Type:application/json" -d '{ "text": "Hello world!" }'
    ```
    

Click *Check my progress* to verify the objective.

Change the API request and response

**Note:** If a green check mark isn't displayed, click the score fly-out on the upper-right, and then click **Check my progress** on the relevant step. A pop-up box will give you advice.

## Task 3. Add API key verification and quota enforcement

Access to this API should be limited to approved applications, so you will add a VerifyAPI key policy, as well as a Quota policy to limit the number of requests.

**Requirements:**

1. Create an [API product](https://cloud.google.com/apigee/docs/api-platform/publish/create-api-products) with a name and display name of `translate-product`. This API product should have public access, automatically approve access requests, and be available in the eval environment.
    
2. Add an operation to the `translate-product` API product. The operation should allow access to the *translate-v1* proxy and use a path of `/`, which [allows access to any request](https://cloud.google.com/apigee/docs/api-platform/publish/create-api-products#behavior-resource-path), including **/**. Allowed methods are *GET* and *POST*. Add an operation quota setting of 10 requests per 1 minute.
    
3. Create a developer with the email `joe@example.com`. Choose your own first name, last name, and username.
    
4. Create an app called `translate-app`, and enable the `translate-product` API product for it. You will need to associate it with your `joe@example.com` developer.
    
5. Add a [VerifyAPIKey policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/verify-api-key-policy) named `VA-VerifyKey` to the proxy endpoint preflow. The API key should be required for every request, and should be sent in using the **Key** header.
    
6. Add a [Quota policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/quota-policy) named `Q-EnforceQuota` to the proxy endpoint preflow.
    

The policy should include the steps:

* Use a type of `calendar`. The *calendar* type requires a `StartTime` element.
    
* Specify `UseQuotaConfigInAPIProduct` to use the quota from the API product, with a default quota of 5 requests every one hour if the API product does not specify quota settings.
    
* Set *Distributed* and *Synchronous* to true, and remove the *AsynchronousConfiguration* element.
    

Once these changes have been made, the request should return an error if a valid API key is not specified in the Key header.

7. From the **apigeex-test-vm** virtual machine, use the following curl commands to test the API key functionality:
    

* Fails (no API key):
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1?lang=de" -H "Content-Type:application/json" -d '{ "text": "Hello world!" }'
    ```
    
* Fails (invalid API key):
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1?lang=de" -H "Content-Type:application/json" -H "Key: ABC123" -d '{ "text": "Hello world!" }'
    ```
    
* Succeeds (when KEY variable is set to a valid API key `KEY=<get this from the earlier step when setting up a Developer App>`):
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1?lang=de" -H "Content-Type:application/json" -H "Key: $KEY" -d '{ "text": "Hello world!" }'
    ```
    

Click *Check my progress* to verify the objective.

Add API key verification and quota enforcement

**Note:** If a green check mark isn't displayed, click the score fly-out on the upper-right, and then click **Check my progress** on the relevant step. A pop-up box will give you advice.

## Task 4. Add message logging

To understand how the translation service is being used, a MessageLogging policy will log each translated message.

**Requirements:**

1. Add a [MessageLogging policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/message-logging-policy) named `ML-LogTranslation` to the `translate` conditional flow. The policy must execute after the `AM-BuildTranslateResponse` step.
    

**Note:** Don't add it to the PostClientFlow because logs are only created for the translation operation.

2. The policy should log to [Cloud Logging](https://cloud.google.com/logging). Use this [policy documentation](https://cloud.google.com/apigee/docs/api-platform/reference/policies/message-logging-policy#cloudloggingelement).
    

* The `LogName` value should be:
    
    ```apache
    projects/{organization.name}/logs/translate
    ```
    
* The logged message should have a *contentType* of `text/plain`, and the message contents should be:
    
    ```apache
    {language}|{text}|{translated}
    ```
    

This message requires the *language*, *text*, and *translated* variables that were created in the `AM-BuildTranslateRequest` and `AM-BuildTranslateResponse` policies.

3. Validate the logged messages in the **Logging** page of the Google Cloud Console. Use the query `logName : "translate"` to see only the translated logs.
    
4. Once the MessageLogging policy has been successfully added, use the following curl command:
    

```apache
curl -i -k -X POST "https://eval.example.com/translate/v1?lang=de" -H "Content-Type:application/json" -H "Key: $KEY" -d '{ "text": "Hello world!" }'
```

* That curl command should create a log message with the following contents:
    
    ```apache
    de|Hello world!|Hallo Welt!
    ```
    

**Note:** There is a short delay before a logged message appears in the logs.

Click *Check my progress* to verify the objective.

Add message logging

**Note:** If a green check mark isn't displayed, click the score fly-out on the upper-right, and then click **Check my progress** on the relevant step. A pop-up box will give you advice.

## Task 5. Rewrite a backend error message

When the *target* parameter sent to the Translation API is invalid, a 400 Bad Request error message is returned:

```apache
{
  "error": {
    "code": 400,
    "message": "Invalid Value",
    "errors": [
      {
        "message": "Invalid Value",
        "domain": "global",
        "reason": "invalid"
      }
    ]
  }
}
```

This error message would be confusing to the caller, so you will rewrite the error message.

**Requirements:**

1. Add a [FaultRules](https://cloud.google.com/apigee/docs/api-platform/fundamentals/fault-handling#creatingfaultrules) section to the *default* target endpoint. When the backend returns a 400 response, it will automatically evaluate any matching fault rules in the target endpoint.
    

**Note:** The UI Navigator menu on the left cannot be used to add a FaultRules section. You must add it in the target endpoint's XML configuration.

2. Add a *FaultRule* to the FaultRules section. The *Condition* of this FaultRule should be set so that it executes if `fault.name` is `ErrorResponseCode`.
    
3. Create an *AssignMessage* policy named `AM-BuildErrorResponse` and attach it to the FaultRule. Use the following policy configuration:
    

```apache
<AssignMessage name="AM-BuildErrorResponse">
  <Set>
      <Payload contentType="application/json">{ "error": "Invalid request. Verify the lang query parameter." }</Payload>
  </Set>
</AssignMessage>
```

Once the policy is attached, your *FaultRules* section in the target endpoint should look similar to this:

```apache
<FaultRules>
  <FaultRule name="...">
    <Step>
      <Name>...</Name>
    </Step>
    <Condition>...</Condition>
  </FaultRule>
</FaultRules>
```

**Note:** You need to manually edit the Target Endpoint XML (make sure it is the TargetEndpoint, not the ProxyEndpoint).

4. Test the API.
    

* A valid request like this should still work:
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1?lang=de" -H "Content-Type:application/json" -H "Key: $KEY" -d '{ "text": "Hello world!" }'
    ```
    
* An invalid language query parameter like this should return the rewritten error message:
    
    ```apache
    curl -i -k -X POST "https://eval.example.com/translate/v1?lang=invalid" -H "Content-Type:application/json" -H "Key: $KEY" -d '{ "text": "Hello world!" }'
    ```
    

Click *Check my progress* to verify the objective.

Rewrite a backend error message

**Note:** If a green check mark isn't displayed, click the score fly-out on the upper-right, and then click **Check my progress** on the relevant step. A pop-up box will give you advice.

---

## Solution of Lab

%[https://youtu.be/DQPZsyge3vk] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP363/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Cloud-Wala-Banda/Labs-Solutions/refs/heads/main/Develop%20and%20Secure%20APIs%20with%20Apigee%20X%20Challenge%20Lab/gsp363.sh
sudo chmod +x gsp363.sh
./gsp363.sh
```

### **🛠️ Proxy Configuration Details:**

<table>
    <tr>
        <td>**Property**</td>
        <td>**Value**</td>
    </tr>
    <tr>
        <td>Name</td>
        <td>translate-v1</td>
    </tr>
    <tr>
        <td>Base Path</td>
        <td>/translate/v1</td>
    </tr>
</table>

### **📥 Download Required Files:**

* **translate-v1**: [⬇️ Download Here](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP363/translate-v1.zip) / [File Backup](https://drive.google.com/uc?export=download&id=1IxJMjqAJ-FVKWOdg2HnJ79wY7BBlbjbJ)
    

### **🛠️ App Configuration Details:**

<table>
    <tr>
        <td>**Property**</td>
        <td>**Value**</td>
    </tr>
    <tr>
        <td>Name</td>
        <td>translate-app</td>
    </tr>
</table>