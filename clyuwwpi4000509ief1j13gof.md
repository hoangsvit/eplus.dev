---
title: "Make and change directories and files"
seoTitle: "Make and change directories and files"
seoDescription: "Make and change directories and files"
datePublished: Sun Jul 21 2024 02:01:44 GMT+0000 (Coordinated Universal Time)
cuid: clyuwwpi4000509ief1j13gof
slug: make-and-change-directories-and-files
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721527215788/00502333-6480-476f-a958-7ee4020408f9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721527290637/fa790732-ba1e-4eac-b899-b0ff9e1a0c8f.png
tags: git, git-version-control

---

Instructions

Step 1: Open Terminal in your VS code editor.

Step 2: Type the command mkdir lab and press Enter

Step 3: Change to the lab directory by typing cd lab and pressing Enter

Step 4: Type the command touch file1.txt and press Enter to create a file named file1.txt

Step 5: Type the command mkdir dir1 and press Enter

Step 6: Type the command mv file1.txt dir1/ and press Enter to move file1.txt to the dir1 directory

Step 7: Type the command touch file2.txt and press Enter to create a file named file2.txt

Step 8: Type the command mkdir -p dir2/dir3 and press Enter. We're using the -p flag to create the parent directories if they do not exist. In this case it will create the dir2 directory and then create the dir3 directory inside of dir2.

Step 9: Type the command mv file2.txt dir2/dir3/ and press Enter to move file2.txt to the dir3 directory

Step 10: Change to the dir2 directory by typing cd dir2

Step 11: Type the command touch file3.txt and press Enter to create a file named file3.txt

Step 12: Type the command mv file3.txt ../ and press Enter to move file3.txt to the lab directory

Step 13: Type the command cd .. and press Enter to navigate back to the lab directory

Step 14: Type the command cd dir1 and press Enter.

Step 15: Type the command ls -l and press Enter. Note how many files and directories are in the dir1 directory.

Step 16: Type the command cd ../dir2 and press Enter.

Step 17: Type the command ls -l and press Enter. Note how many files and directories are in the dir2 directory.

Step 18: Type the command cd dir3 and press Enter.

Step 19: Type the command ls -l and press Enter. Note how many files and directories are in the dir3 directory.

---

Here's a step-by-step guide based on your instructions:

### Step-by-Step Guide

1. **Open Terminal in VS Code:**
    
    * Open VS Code.
        
    * Open the terminal by navigating to `View` &gt; `Terminal` or by using the shortcut `Ctrl+` \` (Control + Backtick).
        
2. **Create a Directory named** `lab`:
    
    * In the terminal, type:
        
        ```bash
        mkdir lab
        ```
        
    * Press `Enter`.
        
3. **Change to the** `lab` Directory:
    
    * Type:
        
        ```bash
        cd lab
        ```
        
    * Press `Enter`.
        
4. **Create a File named** `file1.txt`:
    
    * Type:
        
        ```bash
        touch file1.txt
        ```
        
    * Press `Enter`.
        
5. **Create a Directory named** `dir1`:
    
    * Type:
        
        ```bash
        mkdir dir1
        ```
        
    * Press `Enter`.
        
6. **Move** `file1.txt` to `dir1`:
    
    * Type:
        
        ```bash
        mv file1.txt dir1/
        ```
        
    * Press `Enter`.
        
7. **Create a File named** `file2.txt`:
    
    * Type:
        
        ```bash
        touch file2.txt
        ```
        
    * Press `Enter`.
        
8. **Create Nested Directories** `dir2` and `dir3`:
    
    * Type:
        
        ```bash
        mkdir -p dir2/dir3
        ```
        
    * Press `Enter`.
        
9. **Move** `file2.txt` to `dir3`:
    
    * Type:
        
        ```bash
        mv file2.txt dir2/dir3/
        ```
        
    * Press `Enter`.
        
10. **Change to the** `dir2` Directory:
    
    * Type:
        
        ```bash
        cd dir2
        ```
        
    * Press `Enter`.
        
11. **Create a File named** `file3.txt`:
    
    * Type:
        
        ```bash
        touch file3.txt
        ```
        
    * Press `Enter`.
        
12. **Move** `file3.txt` to the Parent Directory (`lab`):
    
    * Type:
        
        ```bash
        mv file3.txt ../
        ```
        
    * Press `Enter`.
        
13. **Navigate Back to the** `lab` Directory:
    
    * Type:
        
        ```bash
        cd ..
        ```
        
    * Press `Enter`.
        
14. **Change to the** `dir1` Directory:
    
    * Type:
        
        ```bash
        cd dir1
        ```
        
    * Press `Enter`.
        
15. **List Files and Directories in** `dir1`:
    
    * Type:
        
        ```bash
        ls -l
        ```
        
    * Press `Enter`.
        
    * Note the files and directories listed.
        
16. **Change to the** `dir2` Directory:
    
    * Type:
        
        ```bash
        cd ../dir2
        ```
        
    * Press `Enter`.
        
17. **List Files and Directories in** `dir2`:
    
    * Type:
        
        ```bash
        ls -l
        ```
        
    * Press `Enter`.
        
    * Note the files and directories listed.
        
18. **Change to the** `dir3` Directory:
    
    * Type:
        
        ```bash
        cd dir3
        ```
        
    * Press `Enter`.
        
19. **List Files and Directories in** `dir3`:
    
    * Type:
        
        ```bash
        ls -l
        ```
        
    * Press `Enter`.
        
    * Note the files and directories listed.
        

By following these steps, you will create directories and files, move them around, and list their contents to verify the changes.