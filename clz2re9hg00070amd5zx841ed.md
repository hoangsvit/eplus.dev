---
title: "API Gateway: Qwik Start - GSP872"
seoTitle: "API Gateway: Qwik Start - GSP872"
seoDescription: "API Gateway enables you to provide secure access to your services through a well-defined REST API that is consistent across all of your services, regardless"
datePublished: Fri Jul 26 2024 13:49:35 GMT+0000 (Coordinated Universal Time)
cuid: clz2re9hg00070amd5zx841ed
slug: api-gateway-qwik-start-gsp872
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744951587043/33045b82-f8a4-4c0a-a818-7666cfcc18d9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744951608343/ea9fabc2-0cb9-4e6a-9d4c-f86fdc056d37.png
tags: api-gateway-qwik-start-gsp872, gsp872, api-gateway-qwik-start

---

## **Overview**

API Gateway enables you to provide secure access to your services through a well-defined REST API that is consistent across all of your services, regardless of service implementation. A consistent API:

* Makes it easy for app developers to consume your services.
    
* Enables you to change the backend service implementation without affecting the public API.
    
* Enables you to take advantage of the scaling, monitoring, and security features built into the Google Cloud.
    

In this lab, you will deploy an API on API Gateway to secure traffic to a backend service.

## **Task 1. Deploying an API backend**

API Gateway sits in front of a deployed backend service and handles all incoming requests. In this lab, API Gateway routes incoming calls to a Cloud Function backend named **helloGET** that contains the function shown below:

```apache
/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *  More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *  More info: https://expressjs.com/en/api.html#res
 */
exports.helloGET = (req, res) => {
    res.send('Hello World!');
};
```

1. In Cloud Console, clone the Cloud Function sample repository:
    

```apache
git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git
```

2. Change to the directory that contains the Cloud Functions sample code:
    

```apache
cd nodejs-docs-samples/functions/helloworld/helloworldGet
```

[3.To](http://3.To) deploy the function with an HTTP trigger, run the following command in the directory containing your function:

```apache
gcloud functions deploy helloGET --runtime nodejs14 --trigger-http --allow-unauthenticated --region us-central1
```

**Note:** If you receive a request to permit the gcloud command with your credentials click **Authorize**. It will take a few minutes to deploy the cloud function. **Wait for the operation to complete before proceeding**.

**Warning:** If you receive an Error as **IamPermissionDeniedException** rerun the above command.

Click **Check my progress** to verify the objective.

Deploying an API Backend

**Check my progress**

## **Task 2. Test the API backend**

1. When the function finishes deploying, take note of the `httpsTrigger`'s url property or find it using the following command:
    

```apache
gcloud functions describe helloGET --region us-central1
```

The output should look similar to the URL below where PROJECT\_ID is a value specific to your project.

2. Set your PROJECT\_ID as a variable:
    

```apache
export PROJECT_ID=qwiklabs-gcp-00-aea100445879
```

3. Visit the URL to invoke the Cloud Function. You should see the message `Hello World!` as the response:
    

```apache
curl -v https://us-central1-qwiklabs-gcp-00-aea100445879.cloudfunctions.net/helloGET
```

Click **Check my progress** to verify the objective.

Test the API Backend

**Check my progress**

### Create the API definition

API Gateway uses an API definition to route calls to the backend service. You can use an OpenAPI spec that contains specialized annotations to define the desired API Gateway behavior. The OpenAPI spec for this quickstart contains routing instructions to the Cloud Function backend.

1. From Cloud Shell, navigate back to your home directory:
    

```apache
cd ~
```

2. Create a new file named `openapi2-functions.yaml`:
    

```apache
touch openapi2-functions.yaml
```

3. Copy and paste the contents of the OpenAPI spec shown below into the newly created file:
    

```apache
# openapi2-functions.yaml
swagger: '2.0'
info:
  title: API_ID description
  description: Sample API on API Gateway with a Google Cloud Functions backend
  version: 1.0.0
schemes:
  - https
produces:
  - application/json
paths:
  /hello:
    get:
      summary: Greet a user
      operationId: hello
      x-google-backend:
        address: https://us-central1-qwiklabs-gcp-00-aea100445879.cloudfunctions.net/helloGET
      responses:
       '200':
          description: A successful response
          schema:
            type: string
```

4. Set the following environment variables:
    

```apache
export API_ID="hello-world-$(cat /dev/urandom | tr -dc 'a-z' | fold -w ${1:-8} | head -n 1)"
```

5. Run the following commands to replace the variables set in the last step in the OpenAPI spec file:
    

```apache
sed -i "s/API_ID/${API_ID}/g" openapi2-functions.yaml
sed -i "s/PROJECT_ID/$PROJECT_ID/g" openapi2-functions.yaml
```

## **Task 3. Creating a gateway**

Now you are ready to create and deploy a gateway on API Gateway.

1. In the top search bar enter **API Gateway** and select it from the options that appear.
    
2. Click **Create Gateway**. Then, in the **APIs** section:
    

* Ensure the **Select an API** input is set to **Create new API**.
    
* For **Display Name** enter `Hello World API`
    
* For **API ID**, run the following command to once again obtain the API ID and enter it into the **API ID** field:
    

```apache
export API_ID="hello-world-$(cat /dev/urandom | tr -dc 'a-z' | fold -w ${1:-8} | head -n 1)"
echo $API_ID
```

3. In the **API Config** section:
    

* Ensure the **Select a Config** input is set to **Create new API config**.
    
* Do the following to upload the `openapi2-functions.yaml` file previously created.
    

4. In Cloud Shell, run the following command:
    

```apache
cloudshell download $HOME/openapi2-functions.yaml
```

5. Click **Download**.
    

**Note:** The file `openapi2-functions.yaml` is now downloaded to your local machine.

6. Select **Browse** and select the file from the browser's download location:
    

* Enter `Hello World Config` in the **Display Name** field.
    
* Ensure the **Select a Service Account** input is set to **Compute Engine default service account**.
    

7. In the **Gateway details** Section:
    

* Enter `Hello Gateway` in the **Display Name** field.
    
* Set the **Location** drop down to `us-central1`.
    

8. Click **Create Gateway**.
    

**Note: It will take several minutes (~10 minutes) for the Create Gateway operation to complete.** To check the status of the creation and deployment process, you can click the Notification icon in the main navigation bar to display a status notification, as shown in the image below. Please ensure that the icon status has a green check next to it before proceeding.

Click **Check my progress** to verify the objective.

Creating a Gateway

**Check my progress**

### Testing your API Deployment

Now you can send requests to your API using the URL generated upon deployment of your gateway.

1. In Cloud Shell, enter the following command to retrieve the `GATEWAY_URL` of the newly created API hosted by API Gateway:
    

```apache
export GATEWAY_URL=$(gcloud api-gateway gateways describe hello-gateway --location us-central1 --format json | jq -r .defaultHostname)
```

2. Run the following command to ensure that the GATEWAY\_URL environment variable is set:
    

```apache
echo $GATEWAY_URL
```

If it is not, that means you will need to **wait longer** for the API Gateway to be deployed.

3. Run the following curl command and validate that the response returned is `Hello World!`:
    

```apache
curl -s -w "\n" https://$GATEWAY_URL/hello
```

## **Task 4. Securing access by using an API key**

To secure access to your API backend, you can generate an API key associated with your project and grant that key access to call your API. To create an API Key you must do the following:

1. In the Cloud Console, navigate to **APIs & Services** &gt; **Credentials**.
    
2. Select **Create credentials**, then select **API Key** from the dropdown menu. The **API key created** dialog box displays your newly created key.
    

![Create credential drop-down menu.](https://cdn.qwiklabs.com/TUNLf6b4oPs2LZb%2F7ZFd%2B1GxsU853TN3c2AbATntAnA%3D align="left")

Click **Check my progress** to verify the objective.

Securing Access by Using an API Key

**Check my progress**

3. Copy the API Key from the dialog, then click on **close**.
    
4. Store the API Key value in Cloud Shell by running the following command:
    

```apache
export API_KEY=REPLACE_WITH_COPIED_API_KEY
```

Now, enable the API Key support for your service.

1. In Cloud Shell, obtain the name of the `Managed Service` you just created using the following command:
    

```apache
MANAGED_SERVICE=$(gcloud api-gateway apis list --format json | jq -r .[0].managedService | cut -d'/' -f6)
echo $MANAGED_SERVICE
```

2. Then, using the `Managed Service` name of the API you just created, run this command to **enable** API key support for the service:
    

```apache
gcloud services enable $MANAGED_SERVICE
```

### Modify the OpenAPI Spec to leverage API Key Security

In this section, modify the API config of the deployed API to enforce an API key validation security policy on all traffic.

1. Add the `security` type and `securityDefinitions` sections to a new file called `openapi2-functions2.yaml` file as shown below:
    

```apache
touch openapi2-functions2.yaml
```

2. Copy and paste the contents of the OpenAPI spec shown below into the newly created file:
    

```apache
# openapi2-functions.yaml
swagger: '2.0'
info:
  title: API_ID description
  description: Sample API on API Gateway with a Google Cloud Functions backend
  version: 1.0.0
schemes:
  - https
produces:
  - application/json
paths:
  /hello:
    get:
      summary: Greet a user
      operationId: hello
      x-google-backend:
        address: https://us-central1-qwiklabs-gcp-00-aea100445879.cloudfunctions.net/helloGET
      security:
        - api_key: []
      responses:
       '200':
          description: A successful response
          schema:
            type: string
securityDefinitions:
  api_key:
    type: "apiKey"
    name: "key"
    in: "query"
```

3. Run the following commands to replace the variables set in the last step in the OpenAPI spec file:
    

```apache
sed -i "s/API_ID/${API_ID}/g" openapi2-functions2.yaml
sed -i "s/PROJECT_ID/$PROJECT_ID/g" openapi2-functions2.yaml
```

4. Download the updated API spec file, you will use it to update the Gateway config in the next step:
    

```apache
cloudshell download $HOME/openapi2-functions2.yaml
```

5. Click **Download**.
    

## **Task 5. Create and deploy a new API config to your existing gateway**

1. Open the **API Gateway** page in Cloud Console. (Click **Navigation Menu &gt; API Gateway**.)
    
2. Select your API from the list to view details.
    
3. Select the **Gateways** tab.
    
4. Select `Hello Gateway` from the list of available **Gateways**.
    
5. Click on `Edit` at the top of the Gateway page.
    
6. Under **API Config** change the drop down to `Create new API config`.
    
7. Click **Browse** in the **Upload an API Spec** input box and select the `openapi2-functions2.yaml` file.
    
8. Enter `Hello Config` for **Display Name**.
    
9. Select `Qwiklabs User Service Account` for **Select a Service Account**.
    
10. Click **Update**.
    

**Note: It may take a few minutes for the Update Gateway operation to complete.** To check the status of the creation and deployment process, you can click the Notification icon in the main navigation bar to display a status notification, as shown in the image below. Please ensure that the icon status has a green check next to it before proceeding.

Click **Check my progress** to verify the objective.

Create and deploy a new API config to your existing gateway

**Check my progress**

## **Task 6. Testing calls using your API key**

1. To test using your API key run the following command:
    

```apache
export GATEWAY_URL=$(gcloud api-gateway gateways describe hello-gateway --location us-central1 --format json | jq -r .defaultHostname)
curl -sL $GATEWAY_URL/hello
```

You should see a response similar to the following error as an API key was not supplied with the `curl` call: `UNAUTHENTICATED:Method doesn't allow unregistered callers (callers without established identity). Please use API Key or other form of API consumer identity to call this API.`

2. Run the following curl command with the `key` query parameter and use the API key previously created to call the API:
    

```apache
curl -sL -w "\n" $GATEWAY_URL/hello?key=$API_KEY
```

If you do not have the `API_KEY` environment variable set you can get your API key from the left menu by navigating **APIs & Services** &gt; **Credentials**. The key will be available under the **API Keys** section.

The response returned from the API should now be `Hello World!`.

**Note:** You may need to run this command more than once to obtain the desired result.

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=6M_v3x-L4bA&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722001608892/0f2bea3b-afc6-4c3b-ac6f-7e9b89b38278.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/API%20Gateway%20Qwik%20Start/quicklabgsp872.sh
sudo chmod +x quicklabgsp872.sh
./quicklabgsp872.sh
```