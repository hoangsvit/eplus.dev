---
title: "Programming Assignment: Read in data, store, manipulate and output new data to a file"
seoTitle: "Programming Assignment: Read in data, store, manipulate and output new"
seoDescription: "In this lab you must read the contents of a file and then write the contents to another file. You must also store the contents of a file into a list so that"
datePublished: Fri Nov 08 2024 07:24:05 GMT+0000 (Coordinated Universal Time)
cuid: cm38euysh000j09l38js83ucn
slug: programming-assignment-read-in-data-store-manipulate-and-output-new-data-to-a-file
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731050612844/f4fc034e-1753-4368-b247-0898005b57fa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731050632021/6d900788-2ccd-4f79-9624-88af5b1e85e1.png
tags: programming-assignment-read-in-data-store-manipulate-and-output-new-data-to-a-file

---

### Inroduction

In this lab you must read the contents of a file and then write the contents to another file. You must also store the contents of a file into a list so that it can be accessed in different ways. 

### Goal

* Use the open function for reading and writing files.
    

### Objectives

* Create a function for reading in a file.
    
* Create a function for writing files.
    

### Instructions

**Step 1:** Check that the **sampletext.txt** and **file\_**[**ops.py**](http://ops.py) files exist and are present inside the project folder. You can run the **file\_**[**ops.py**](http://ops.py) file by opening a terminal and executing the **python3 file\_**[**ops.py**](http://ops.py) command.

![Open the terminal to run the script.](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/Yf39zrzQSYu9_c680EmLsA_f466ffec75fc4c8cbf3d9db6b314d6a1_Screenshot-2022-05-30-145117.png?expiry=1731196800000&hmac=PWffSENMJpI5Dj99oRLUWAfUvRCY914eso2_dU0dE6c align="left")

**Step 2:** Complete the **read\_file()** function to read in the sampletext.txt file using the **open** function and return the entire contents of the file. 

**Step 3:** Complete the **read\_file\_into\_line()** function so that it returns a data structure of all the contents of the file in a line-by-line sequential order.

**Step 4:** Fill in the **write\_first\_line\_to\_file()** that accepts two arguments: the contents of a file to be written and the name of an output file, and writes only the first line of the file contents into the given output file.

**Step 5:** Complete the **read\_even\_numbered\_lines()** to return a list of the even-numbered lines of a file (2, 4, 6, etc.) 

**Step 6:** Fill in the **read\_file\_in\_reverse()** function to return a list of the lines of a file in reverse order. 

---

```python
def read_file(file_name):
    """ Reads in a file.

    [IMPLEMENT ME]
        1. Open and read the given file into a variable using the File read()
           function
        2. Print the contents of the file
        3. Return the contents of the file

    Args:
        file_name: the name of the file to be read

    Returns:
        string: contents of the given file.
    """
    with open(file_name, 'r') as f:
        contents = f.read()
        print(contents)
        return contents

def read_file_into_list(file_name):
    """ Reads in a file and stores each line as an element in a list

    [IMPLEMENT ME]
        1. Open the given file
        2. Read the file line by line and append each line to a list
        3. Return the list

    Args:
        file_name: the name of the file to be read

    Returns:
        list: a list where each element is a line in the file.
    """
    with open(file_name, 'r') as f:
        contents = f.readlines()
        return contents

def write_first_line_to_file(file_contents, output_filename):
    """ Writes the first line of a string to a file.

    [IMPLEMENT ME]
        1. Get the first line of file_contents
        2. Use the File write() function to write the first line into a file
           with the name from output_filename

        We determine the first line to be everything in a string before the
        first newline ('\n') character.

    Args:
        file_contents: string to be split and written into output file
        output_filename: the name of the file to be written to
    """
    with open(output_filename, 'w') as f:
        f.write(file_contents.split('\n')[0])

def read_even_numbered_lines(file_name):
    """ Reads in the even numbered lines of a file

    [IMPLEMENT ME]
        1. Open and read the given file into a variable
        2. Read the file line-by-line and add the even-numbered lines to a list
        3. Return the list

    Args:
        file_name: the name of the file to be read

    Returns:
        list: a list of the even-numbered lines of the file
    """
    with open(file_name, 'r') as f:
        lines = f.readlines()
        return [line.strip() for idx, line in enumerate(lines) if idx % 2 == 1]

def read_file_in_reverse(file_name):
    """ Reads a file and returns a list of the lines in reverse order

    [IMPLEMENT ME]
        1. Open and read the given file into a variable
        2. Read the file line-by-line and store the lines in a list in reverse order
        3. Print the list
        4. Return the list

    Args:
        file_name: the name of the file to be read

    Returns:
        list: list of the lines of the file in reverse order.
    """
    with open(file_name, 'r') as f:
        lines = f.readlines()
        rev_lines = list(reversed(lines))
        print(rev_lines)
        return rev_lines

'''
Here are some sample commands to help you run/test your implementations.
Feel free to uncomment/modify/add to them as you wish.
'''
def main():
    file_contents = read_file("sampletext.txt")
    print(read_file_into_list("sampletext.txt"))
    write_first_line_to_file(file_contents, "online.txt")
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731050602995/3e703601-31b8-43c3-ad83-19da17e516a0.png align="center")