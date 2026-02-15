---
title: "Docker Essentials: Container Networking - gem-docker-networking"
seoTitle: "Docker Essentials: Container Networking - gem-docker-networking"
seoDescription: "Learn Docker networking: create custom networks, manage container communication, and explore default and bridge modes with hands-on tasks"
datePublished: Sun Feb 15 2026 09:02:28 GMT+0000 (Coordinated Universal Time)
cuid: cmlnioq9p000g02l8do0b0xmr
slug: docker-essentials-container-networking-gem-docker-networking-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771146007929/f9232612-8d2c-419c-8d81-87d7bd1955e4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771146121362/a90aecc2-07e2-4d9b-a496-4eb202bd170d.png
tags: docker-essentials-container-networking, gem-docker-networking, docker-essentials-container-networking-gem-docker-networking

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

This lab provides a practical exploration of Docker networking. You will learn how containers communicate with each other and the outside world using various networking modes. You'll also learn how to create custom networks and control container communication. We will use Artifact Registry to host the container images used in this lab.

## Task 1. Setting up the Environment

In this task, you will configure your environment and pull the necessary images from Artifact Registry.

1. Set your Project ID is: `qwiklabs-gcp-00-192ff2ed31f3`
    

```apache
gcloud config set project qwiklabs-gcp-00-192ff2ed31f3
```

**Note:**  
This command sets your active project identity.

2. Set your default region to `us-west1`
    

```apache
gcloud config set compute/region us-west1
```

**Note:**  
This command sets your active compute region.

3. Enable the Artifact Registry API.
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

**Note:**  
Enables the Artifact Registry service.

4. Create a Docker repository in Artifact Registry. Replace `lab-registry` with a name for your repository. It must be unique within the specified region.
    

```apache
gcloud artifacts repositories create lab-registry --repository-format=docker --location=us-west1 --description="Docker repository"
```

**Note:**  
Creates a Docker repository in Artifact Registry.

5. Configure Docker to authenticate with Artifact Registry.
    

```apache
gcloud auth configure-docker us-west1-docker.pkg.dev
```

**Note:**  
This command configures Docker to use your Google Cloud credentials for authentication with Artifact Registry.

6. Pull the `alpine/curl` image from Docker Hub and tag it for your Artifact Registry.
    

```apache
docker pull alpine/curl &&  docker tag alpine/curl us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/alpine-curl:latest
```

**Note:**  
This will pull the image from docker hub and tag it for Artifact Registry.

7. Push the `alpine/curl` image to Artifact Registry.
    

```apache
docker push us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/alpine-curl:latest
```

strong&gt;Note:  
This command pushes the tagged image to your Artifact Registry repository.

8. Pull the `nginx:latest` image from Docker Hub and tag it for your Artifact Registry.
    

```apache
docker pull nginx:latest && docker tag nginx:latest us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/nginx:latest
```

**Note:**  
This will pull the image from docker hub and tag it for Artifact Registry.

9. Push the `nginx:latest` image to Artifact Registry.
    

```apache
docker push us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/nginx:latest
```

**Note:**  
This command pushes the tagged image to your Artifact Registry repository.

## Task 2. Exploring Default Bridge Network

This task explores the default `bridge` network Docker creates. You will run containers and observe their communication within this network.

1. Run container1 using the `alpine/curl` image.
    

```apache
docker run -d --name container1 us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/alpine-curl:latest sleep infinity
```

2. Run container2 using the `alpine/curl` image.
    

```apache
docker run -d --name container2 us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/alpine-curl:latest sleep infinity
```

**Note:**  
This starts two containers in detached mode. The `sleep infinity` command keeps the containers running.

2. Inspect the default bridge network.
    

```apache
docker network inspect bridge
```

**Note:**  
This shows details of the `bridge` network, including connected containers and IP addresses.

3. From `container1`, ping `container2` using its name. Note that Docker uses embedded DNS for name resolution within the default bridge network.
    

```apache
docker exec -it container1 ping container2
```

**Note:**  
This executes the `ping` command within `container1`, targeting `container2`. The standard bridge network does not provide DNS resolution, so ping command cannot use the container name.

4. Stop container2 from runnning.
    

```apache
docker stop container2 && docker rm container2
```

5. Restart `container2` running as an HTTP server.
    

```apache
docker run -d --name container2 -p 8080:80 us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/nginx:latest
```

**Note:**  
Start a new container2 running nginx and exposing port 8080.

6. From `container1`, use `curl` to make an HTTP request to `container2`.
    

```apache
docker exec -it container1 curl container2:8080
```

**Note:**  
Send a curl request from container1 to container2 on port 8080. The standard bridge network does not provide DNS resolution, so curl command cannot use the container name.

## Task 3. Creating and Using Custom Networks

This task demonstrates how to create a custom network which supports DNS and connect containers to it, providing more control over network configuration.

1. Create a new network named `my-net`.
    

```apache
docker network create my-net
```

**Note:**  
Creates a new Docker network named `my-net`.

2. Run container 3 connecting it to the `my-net` network.
    

```apache
docker run -d --name container3 --network my-net us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/alpine-curl:latest sleep infinity
```

3. Run container 4 connecting it to the `my-net` network.
    

```apache
docker run -d --name container4 --network my-net us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/alpine-curl:latest sleep infinity
```

**Note:**  
Starts two containers connected to the `my-net` network.

4. Inspect the `my-net` network to see the connected containers and their IP addresses.
    

```apache
docker network inspect my-net
```

**Note:**  
Displays details about the `my-net` network.

5. From `container3`, ping `container4` using its name. Name resolution works within custom networks as well.
    

```apache
docker exec -it container3 ping container4
```

**Note:**  
Tests connectivity between containers within `my-net`.

6. Stop the active container 4 from running.
    

```apache
docker stop container4 && docker rm container4
```

7. Restart container 4.
    

```apache
docker run -d --name container4 --network my-net -p 8081:80 us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/nginx:latest
```

8. Run an `nginx` container on `my-net` and test connectivity.
    

```apache
docker exec -it container3 curl container4:80
```

**Note:**  
Starts an nginx container on my-net.

9. Stop the active container 4 from running.
    

```apache
docker stop container4 && docker rm container4
```

## Task 4. Publishing Ports and Accessing Containers from the Host

Learn how to publish container ports and access containerized services from the host machine.

1. Run an `nginx` container, publishing port 80 to the host's port 8080.
    

```apache
docker run -d --name container4 -p 8080:80 us-west1-docker.pkg.dev/qwiklabs-gcp-00-192ff2ed31f3/lab-registry/nginx:latest
```

**Note:**  
Publishes port 80 of the container to port 8080 on the host.

2. Access the `nginx` service from the host machine using `curl`.
    

```apache
curl localhost:8080
```

**Note:**  
This command sends an HTTP request to the published port on the host machine.

3. Use `docker port` to check the port mapping.
    

```apache
docker port container4 80
```

**Note:**  
This command shows the mapping for port 80 of the container.

## Task 5. Cleaning Up

Remove the created containers and networks.

1. Stop all containers.
    

```apache
docker stop container1 container2 container3 container4
```

2. Remove all containers.
    

```apache
docker rm container1 container2 container3 container4
```

**Note:**  
This stops and removes the containers created in the previous steps.

3. Remove the `my-net` network.
    

```apache
docker network rm my-net
```

**Note:**  
This removes the custom network.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=c_w7Utw7l50] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1771146201272/ac6b6d15-0b5f-4bc2-b502-adf7666093cf.png align="center")

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">The lab will automatically complete in approximately <strong>5 minutes</strong>. Just sit tight and let it finish 👍</div>
</div>

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1771146263829/ad3fdf9d-9a71-4e41-9fb4-fa1055f5e8e4.png align="center")