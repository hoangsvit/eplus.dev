---
title: "Docker Essentials: Container Volumes - gem-docker-volumes"
seoTitle: "Docker Essentials: Container Volumes - gem-docker-volumes"
seoDescription: "Learn about Docker volumes, essential for data persistence in containers, including types, usage, and implementation with Docker Compose"
datePublished: Mon Sep 15 2025 06:44:30 GMT+0000 (Coordinated Universal Time)
cuid: cmfkrdzk5000102labrlmfwlb
slug: docker-essentials-container-volumes-gem-docker-volumes
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757918524345/1fc5b6ca-ce86-4433-a82c-1a5b780f94f7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757918647893/ef04122c-b5aa-4559-a94f-22a8c2757442.png
tags: docker-essentials, docker-essentials-container-volumes-gem-docker-volumes, container-volumes-gem-docker-volumes, gem-docker-volumes, container-volumes

---

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **PROJECT\_ID**. The output contains a line that declares the **PROJECT\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to YOUR_PROJECT_ID
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    
4. Your output should now look like this:
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-01-xxxxxxxxxxxx@qwiklabs.net

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
project = <project_ID>
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Overview

This lab explores Docker volumes, a critical mechanism for data persistence in containerized applications. You'll learn how volumes work, the different types available, and how to use them to ensure your data survives container restarts and removals. This lab assumes a basic understanding of Docker and Linux.

## Task 1. Understanding Docker Volumes

This task will cover the fundamentals of docker volumes.

1. What are Docker Volumes? Docker volumes are directories (or files) that are external to the container's filesystem. This means that the data within a volume persists even if the container is stopped, removed, or recreated. Why are they important? By default, data inside a container is ephemeral, meaning it's lost when the container is stopped or removed. Volumes provide a way to store persistent data, such as databases, configuration files, or user uploads.
    

```apache
# No code required for this step. This is a conceptual overview.
```

2. Types of Volumes: Docker offers three primary types of volumes: named volumes, bind mounts, and tmpfs mounts. Named volumes are managed by Docker and stored in a Docker-managed directory on the host machine. They are the preferred way to persist data. Bind mounts map a directory or file on the host machine directly into the container. They offer more flexibility but can also introduce security risks if not used carefully. tmpfs mounts are stored in the host's memory and are not persisted across container restarts. They are useful for storing temporary data that doesn't need to be saved.
    

```apache
# No code required for this step. This is a conceptual overview.
```

## Task 2. Creating and Using Named Volumes

This task demonstrates how to create and use named volumes to persist data.

1. Create a named volume called 'mydata'.
    

```apache
docker volume create mydata
```

2. Inspect the volume to see its details. Note the Mountpoint; this is where the volume data is stored on the host.
    

```apache
docker volume inspect mydata
```

3. Run a container that uses the 'mydata' volume. This example uses a simple Alpine Linux container and mounts the volume to the `/data` directory inside the container.
    

```apache
docker run -it -v mydata:/data alpine ash
```

3. Create a file inside the active container.
    

```apache
cd /data
echo "Hello from inside the container!" > myfile.txt
exit
```

4. Stop the container.
    

```apache
docker stop $(docker ps -aq)
```

5. Remove the container.
    

```apache
docker rm $(docker ps -aq)
```

6. Run a *new* container using the same volume.
    

```apache
docker run -it -v mydata:/data alpine ash
```

7. Verify that the 'myfile.txt' file still exists in the `/data` directory.
    

```apache
cd /data
ls -l
cat myfile.txt
exit
```

8. Clean up the volume (optional).
    

```apache
docker volume rm mydata
```

## Task 3. Using Bind Mounts

This task demonstrates how to use bind mounts to share data between the host and a container.

1. Create a directory on your host machine.
    

```apache
mkdir ~/host_data
```

2. Create a file in the directory.
    

```apache
echo "Hello from the host!" > ~/host_data/hostfile.txt
```

3. Run a container and bind-mount the directory to `/data` inside the container.
    

```apache
docker run -it -v /home/$USER/host_data:/data alpine ash
```

4. Modify the file from *inside* the container.
    

```apache
echo "This line added from container" >> /data/hostfile.txt
cat /data/hostfile.txt
exit
```

5. Check the file on the host machine. The changes made inside the container should be reflected on the host.
    

```apache
cat ~/host_data/hostfile.txt
```

6. Clean up the directory (optional).
    

```apache
rm -rf ~/host_data
```

## Task 4. Using Volumes with Docker Compose

This task demonstrates how to define and use volumes within a Docker Compose file.

1. Create a `docker-compose.yml` file with the following content. This example defines a simple web server using the `nginx` image and mounts a volume to the `/usr/share/nginx/html` directory to serve static content.
    

```apache
version: "3.3"
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - web_data:/usr/share/nginx/html
volumes:
  web_data:
```

2. Create an `index.html` file in the same directory as the `docker-compose.yml` file with some basic HTML content.
    

```apache
<html>
<head>
  <title>Docker Compose Volume Example</title>
</head>
<body>
  <div><strong>Hello from Docker Compose!</strong></div>
  <p>This content is served from a Docker volume.</p>
</body>
</html>
```

3. Start the application using Docker Compose.
    

```apache
docker-compose up -d
```

4. Access the application in your browser at `http://localhost:8080`. You should see the content from the `index.html` file.
    

```apache
curl http://localhost:8080
```

5. Stop and remove the application.
    

```apache
docker-compose down
```

---

## Solution of Lab

%[https://youtu.be/-M6r-TJixwo]