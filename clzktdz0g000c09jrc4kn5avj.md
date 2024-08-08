---
title: "App Dev: Storing Image and Video Files in Cloud Storage - Python - GSP185"
seoTitle: "Storing Image and Video Files in Cloud Storage - Python - GSP185"
seoDescription: "Cloud Storage allows world-wide storage and retrieval of any amount of data at any time. You can use Cloud Storage for a range of scenarios including servin"
datePublished: Thu Aug 08 2024 05:05:12 GMT+0000 (Coordinated Universal Time)
cuid: clzktdz0g000c09jrc4kn5avj
slug: app-dev-storing-image-and-video-files-in-cloud-storage-python-gsp185
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723092777074/aa849ebd-9307-4c59-8292-cc3c3e58a8ae.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723093489907/ca360209-73e6-4598-aca2-2880e4295e3f.png
tags: app-dev-storing-image-and-video-files-in-cloud-storage-python-gsp185, gsp185

---

## **Overview**

Cloud Storage allows world-wide storage and retrieval of any amount of data at any time. You can use Cloud Storage for a range of scenarios including serving website content, storing data for archival and disaster recovery, or distributing large data objects to users via direct download.

In this lab you'll configure an application to use Cloud Storage to store and retrieve application data. The application is an online Quiz, the data is the form data, including an image you upload from your local machine.

**Objectives**

In this lab, you learn how to perform the following tasks:

* Set up Cloud Shell as your development environment
    
* Update the application code to integrate Cloud Datastore
    
* Use the Quiz application to upload an image file into Cloud Storage and view the image in the Quiz
    

---

### **Task 1. Prepare the quiz application**

In this section, you access Cloud Shell, clone the git repository containing the Quiz application, and run the application.

**Clone source code in Cloud Shell**

* To clone the repository for the class, execute the following command:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

**Configure and run the quiz application**

1. Change the working directory:
    
    ```apache
    cd ~/training-data-analyst/courses/developingapps/python/cloudstorage/start
    ```
    
2. Set the region using a variable:
    
    ```apache
    REGION=us-east1
    sed -i s/us-central/$REGION/g prepare_environment.sh
    ```
    
3. Configure the application:
    
    ```apache
    . prepare_environment.sh
    ```
    
    **Note:** Ignore any warnings.
    
    This script file:
    
    * Creates an App Engine application.
        
    * Exports an environment variable, `GCLOUD_PROJECT`.
        
    * Updates pip, then runs `pip install -r requirements.txt`.
        
    * Creates entities in Cloud Datastore.
        
    * Prints out the Project ID.
        
4. Run the application:
    
    ```apache
    python run_server.py
    ```
    
    The application is running when you see the following output:
    
    ```apache
    * Running on http://127.0.0.1:8080/ (Press CTRL+C to quit)
    * Restarting with stat
    * Debugger is active!
    * Debugger PIN: 502-577-323
    ```
    

**Review the quiz application**

1. To view the application, click **Web preview** &gt; **Preview on port 8080**.
    
2. Click the **Create Question** link in the toolbar.
    

You should see a simple form that contains textboxes for the question and answers and radio buttons to select the correct answer

![The Add question form, wherein the Choose File button is highlighted within the Image category.](https://cdn.qwiklabs.com/Td5rN%2BxXHfqI7yWAFNcW7J44rSXsNQ3i2c7Lkw6FRzE%3D align="left")

**Note:** The form has a new file upload field that will be used to upload either image or video files. In this lab you upload an image file; you use the same process to upload video file.

### **Task 2. Examine the quiz application code**

In this section, you review the case study application code.

In this lab you'll view and edit files. You can use the shell editors that are installed on Cloud Shell, such as `nano` or `vim` or the Cloud Shell code editor.

This lab uses the Cloud Shell code editor to review the Quiz application code.

**Examine the application code**

1. Navigate to the `/training-data-analyst/courses/developingapps/python/cloudstorage/start` folder using the file browser panel on the left side of the editor.
    
2. Select the `add.html` file in the `...quiz/webapp/templates/` folder.
    
    This file contains the template for the Create Question form.
    
    Notice how the form has been modified to use `multipart/form-data` as the `enc-type`, and there are two new form controls:
    
    * A file upload control called `image`
        
    * A hidden field called `imageUrl`
        
3. Select the `routes.py` file in the `...quiz/webapp` folder.
    
    This file contains the route for the POST handler that receives the form data. It has been modified to get the image file from the form.
    
4. Select the `questions.py` file in the `...quiz/webapp` folder.
    
    This file contains the handler that processes the form data extracted in the `routes.py` file. You will modify this file to use a new module that is a client for Cloud Storage.
    
5. Select the `...quiz/gcp/storage.py` file.
    
    This is the file where you will write code to save image file data into Cloud Storage.
    

### **Task 3. Create a Cloud Storage Bucket**

In this section, you create a Cloud Storage bucket and export an environment variable that references it.

1. Return to the Cloud Shell command line.
    
2. Stop the application by pressing **Ctrl+C**.
    
3. Create a Cloud Storage bucket named `<Project ID>-media`:
    
    ```apache
    gsutil mb gs://$DEVSHELL_PROJECT_ID-media
    ```
    
    You can create a bucket using the gsutil mb command, passing through the name of the bucket as gs://BUCKET\_NAME
    
    You can use $DEVSHELL\_PROJECT\_ID as the bucket name prefix followed by -media
    
4. To export the Cloud Storage bucket name as an environment variable named `GCLOUD_BUCKET`, execute the following command:
    

```apache
export GCLOUD_BUCKET=$DEVSHELL_PROJECT_ID-media
```

**Note:** Recall that the application makes use of environment variables for configuration. This allows the development team to deploy the application into development, test, staging, and production just by changing these variables.

### **Task 4. Adding objects to Cloud Storage**

In this section, you write code to save uploaded files into Cloud Storage.

**Note:** Update code within the sections marked as follows:

`# TODO`

`# END TODO`

To maximize your learning, review the code, inline comments, and related API documentation.

For information on API documentation for Cloud Storage, refer to the [APIs and reference reference](https://cloud.google.com/storage/docs/apis).

**Import and use the Python Cloud Storage module**

1. In code editor, move to the top of the `...quiz/gcp/storage.py` file.
    
2. Get the bucket name from the `GCLOUD_BUCKET` environment variable.
    
3. Import the storage module from the `google.client` package.
    
4. Create a Cloud Storage client.
    
5. Get a reference to the Cloud Storage bucket.
    

**quiz/gcp/storage.py**

```python
# TODO: Get the Bucket name from the
# GCLOUD_BUCKET environment variable

bucket_name = os.getenv('GCLOUD_BUCKET')

# END TODO

# TODO: Import the storage module

from google.cloud import storage

# END TODO

# TODO: Create a client for Cloud Storage

storage_client = storage.Client()

# END TODO

# TODO: Use the client to get the Cloud Storage bucket

bucket = storage_client.get_bucket(bucket_name)

# END TODO
```

**Write code to send a file to Cloud Storage**

1. Still in `storage.py`, in the the `upload_file(...)` function, remove the existing pass statement, then use the Cloud Storage client to upload a file to your Cloud Storage bucket and make it publicly available.
    
2. Get a reference to a Cloud Storage blob object in the bucket.
    
3. Use the blob object to upload the image.
    
4. Make the file public.
    
5. Return the blob's public URL.
    

**quiz/gcp/storage.py -** `upload)file(...)` function

```python
"""
Uploads a file to a given Cloud Storage bucket and returns the public url
to the new object.
"""
def upload_file(image_file, public):

    # TODO: Use the bucket to get a blob object

    blob = bucket.blob(image_file.filename)

    # END TODO

    # TODO: Use the blob to upload the file

    blob.upload_from_string(
        image_file.read(),
        content_type=image_file.content_type)

    # END TODO

    # TODO: Make the object public

    if public:
        blob.make_public()

    # END TODO


    # TODO: Modify to return the blob's Public URL

    return blob.public_url

    # END TODO
```

6. Save `storage.py`.
    

### Write code to use the Cloud Storage functionality

1. In the editor, move to the top of the `...quiz/webapp/questions.py` file.
    
2. Modify the import statement to use your storage client as well as the datastore client.
    
3. Move to the `upload_file(...)` function. Use your storage client to upload a file, and assign the returned public URL to a variable.
    
4. Modify the return statement to return the public URL.
    
5. Move to the `save_question(...)` function. Write an if test to see if the `image_file` is present.
    
6. If it is, then call the `upload_file(...)` function, and assign the public URL to a entity property named imageUrl.
    
7. If not, then assign an empty string to the entity imageUrl property.
    

**quiz/webapp/questions.py**

```python
# TODO: Import the storage module

from quiz.gcp import storage, datastore

# END TODO

"""
uploads file into google cloud storage
- upload file
- return public_url
"""
def upload_file(image_file, public):
    if not image_file:
        return None

    # TODO: Use the storage client to Upload the file
    # The second argument is a boolean

    public_url = storage.upload_file(
       image_file,
       public
    )

    # END TODO

    # TODO: Return the public URL
    # for the object

    return public_url

    # END TODO

"""
uploads file into google cloud storage
- call method to upload file (public=true)
- call datastore helper method to save question
"""
def save_question(data, image_file):

    # TODO: If there is an image file, then upload it
    # And assign the result to a new Datastore
    # property imageUrl
    # If there isn't, assign an empty string

    if image_file:
        data['imageUrl'] = str(
                  upload_file(image_file, True))
    else:
        data['imageUrl'] = u''

    # END TODO

    data['correctAnswer'] = int(data['correctAnswer'])
    datastore.save_question(data)
    return
```

8. Save `questions.py`.
    

**Run the application and create a Cloud Storage object**

1. Save the `...gcp/storage.py` and `...webapp/questions.py` files, and then return to the Cloud Shell command.
    
2. Return to Cloud Shell to run the application:
    

```apache
python run_server.py
```

3. Download an image file to your local machine from [Google storage](https://storage.googleapis.com/cloud-training/quests/Google_Cloud_Storage_logo.png).
    
4. In Cloud Shell, click **Web preview** &gt; **Preview on port 8080** to preview the Quiz application.
    
5. Click the **Create Question** link.
    
6. Complete the form with the following values, and then click **Save**.
    
    | **Form Field** | **Value** |
    | --- | --- |
    | Author | Your name |
    | Quiz | `Google Cloud Platform` |
    | Title | `Which product does this logo relate to?` |
    | Image | `Upload the Google_Cloud_Storage_logo.png file you previously downloaded` |
    | Answer 1 | `App Engine` |
    | Answer 2 | `Cloud Storage` (Select the Answer 2 radio button) |
    | Answer 3 | `Compute Engine` |
    | Answer 4 | `Container Engine` |
    
7. Return to the Cloud Console and navigate to **Navigation menu** &gt; **Cloud Storage**.
    
8. On the **Cloud Storage** &gt; **Browser** page, click the correct bucket (named `<Project ID>-media`).
    

You should see your new object named `Google_Cloud_Storage_logo.png`.

**Run the client application and test the Cloud Storage public URL**

1. Add `/api/quizzes/gcp` to the end of the application's URL.
    
    You should see that JSON data has been returned to the client corresponding to the Question you added in the web application.
    
    The imageUrl property should have a value corresponding to the object in Cloud Storage.
    
2. Return to the application home page and click the **Take Test** link.
    
3. Click **GCP**, and answer each question.
    
    When you get to the question you just added, you should see the image has been formatted inside the client-side web application!
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=1vhrypYAApw] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723093160293/c22755f6-05ab-4324-b46f-e0783a602e43.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/App%20Dev%20Storing%20Image%20and%20Video%20Files%20in%20Cloud%20Storage%20Python/quicklabgsp185.sh
sudo chmod +x quicklabgsp185.sh
./quicklabgsp185.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723093467890/27544cc5-bc86-43fe-a173-27720c016864.png align="center")