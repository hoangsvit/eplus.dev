---
title: "Linux Essentials: Command Line Primer - gem-basics-linux"
seoTitle: "Linux Essentials: Command Line Primer - gem-basics-linux"
seoDescription: "Learn Linux shell basics: navigate filesystems, manipulate files, and perform basic operations using Cloud Shell tools"
datePublished: Mon Sep 15 2025 07:39:19 GMT+0000 (Coordinated Universal Time)
cuid: cmfktcgpa000402kz7w58gec8
slug: linux-essentials-command-line-primer-gem-basics-linux
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757921836902/96f460f0-a493-43ba-97d1-85a1fb5d7b60.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757921941946/bcc10e4d-5ef7-4bd1-b97f-83d2d868b9e1.png
tags: linux-essentials-command-line-primer-gem-basics-linux, linux-essentials, command-line-primer-gem-basics-linux, gem-basics-linux, linux-essentials-command-line-primer

---

### Activate Cloud Shell### Activate Cloud Shell

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

This lab provides a hands-on introduction to fundamental Linux shell commands. You'll learn how to navigate the filesystem, manipulate files, and understand basic shell operations, equipping you with essential skills for interacting with Linux environments. Prior knowledge of Linux shell commands is expected.

## Task 1. Navigating the Filesystem

In this task, you'll learn to move around the Linux filesystem using essential commands.

1. Use the `pwd` command to print the current working directory.
    

```apache
pwd
```

**Note:**  
This command displays the absolute path of your current location.

2. Change directories using the `cd` command. First, navigate to the home directory.
    

```apache
cd ~
```

**Note:**  
The `~` represents the home directory.

3. Now, create a directory named `my_project` within your home directory.
    

```apache
mkdir my_project
```

**Note:**  
This command creates a new directory.

4. Navigate into the `my_project` directory.
    

```apache
cd my_project
```

**Note:**  
Now you are inside the newly created directory.

5. Use `cd ..` to go back to the parent directory (your home directory).
    

```apache
cd ..
```

**Note:**  
This command moves you one level up in the directory structure.

## Task 2. File Manipulation

This task covers basic file creation, copying, moving, and deletion operations.

1. Create an empty file named `hello.txt` using the `touch` command.
    

```apache
touch hello.txt
```

**Note:**  
This command creates an empty file if it doesn't exist.

2. Write some text into `hello.txt` using the `echo` command and redirection.
    

```apache
echo "Hello, world!" > hello.txt
```

**Note:**  
The `>` redirects the output of the echo command to the file.

3. Display the contents of `hello.txt` using the `cat` command.
    

```apache
cat hello.txt
```

**Note:**  
This command displays the contents of a file.

4. Copy `hello.txt` to `goodbye.txt` using the `cp` command.
    

```apache
cp hello.txt goodbye.txt
```

**Note:**  
This command duplicates the file.

5. Move `goodbye.txt` to `my_project` directory.
    

```apache
mv goodbye.txt my_project/
```

**Note:**  
This command moves or renames files.

6. Delete the `hello.txt` file using the `rm` command.
    

```apache
rm hello.txt
```

**Note:**  
This command permanently deletes files. Use with caution.

## Task 3. Working with Directories

This task focuses on listing directory contents and removing directories.

1. List the contents of the current directory using the `ls` command.
    

```apache
ls
```

**Note:**  
This command lists files and directories in the current directory.

2. List the contents of the `my_project` directory, including hidden files, using `ls -la`. First navigate to home directory.
    

```apache
cd ~ && ls -la my_project/
```

**Note:**  
The `-l` option provides a detailed listing, and `-a` includes hidden files.

3. Remove the `my_project` directory and its contents using the `rm -r` command. First navigate to home directory.
    

```apache
cd ~ && rm -r my_project/
```

**Note:**  
The `-r` option is necessary to remove directories recursively. Use with caution.

4. Verify that the `my_project` directory has been removed. First navigate to home directory.
    

```apache
cd ~ && ls
```

**Note:**  
The directory should no longer be listed.

## Task 4. Basic Shell Operations

This task introduces command chaining and output redirection.

1. Use command chaining to create a directory and then navigate into it using `&&`.
    

```apache
mkdir my_new_project && cd my_new_project
```

**Note:**  
If the first command (mkdir) succeeds, the second command (cd) will execute.

2. Use output redirection to save the output of the `ls -l` command to a file named `listing.txt`.
    

```apache
ls -l > listing.txt
```

**Note:**  
The `>` redirects the output of the ls command to the file.

3. Append the output of the `pwd` command to `listing.txt` using `>>`.
    

```apache
pwd >> listing.txt
```

**Note:**  
The `>>` appends the output to the file instead of overwriting it.

4. Display the contents of `listing.txt` to confirm the appended output.
    

```apache
cat listing.txt
```

**Note:**  
This command displays the contents of the file.

---

## Solution of Lab

%[https://youtu.be/TODZhL8xzwU]