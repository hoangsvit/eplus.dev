---
title: "Programming Assignment: Import and Scope - Module 4"
seoTitle: "Programming Assignment: Import and Scope - Module 4"
seoDescription: "So far, you've learned the different ways in which you can use import statements to import other Python files, modules and packages. You have also seen the "
datePublished: Fri Nov 08 2024 08:19:25 GMT+0000 (Coordinated Universal Time)
cuid: cm38gu3xx000a0al9e0w11bkg
slug: programming-assignment-import-and-scope-module-4
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731053943858/331294f0-0394-44a9-8b36-0600ac500afe.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731053953461/6586eb7c-e28c-42a0-a957-fdde4a7c15bb.png
tags: programming-assignment-import-and-scope-module-4

---

### Introduction

So far, you've learned the different ways in which you can use import statements to import other Python files, modules and packages. You have also seen the different ways in which you can import specific functions using different formats of import.

### Goal

* Use the import statement to import a built-in package in Python.
    
* Use the import statement to call a function present in another Python file. 
    

### Objectives

* Learn how to use import to bring external code within direct scope of the project.
    

### Instructions:

**Step 1**: Open the file [**jsongenerator.py**](http://jsongenerator.py) present inside project folder.

**Step 2:** Import a built-in package called **json**. 

**Step 3:** Import the following from a file called [**employee.py**](http://employee.py):

* A function called **details** 
    
* Variables called **employee\_name**, **age** and **title**  
    

**Step 4:** Implement the **create\_dict()** function that returns a dictionary given employee information.

**4.1** Create and return a dictionary with three key-value pairs where 

* keys are string variables - “**first\_name**”, “**age**” and “**title**” and their respective values are employee\_name, age and title variables that we have imported from the employee module. Be sure to cast the values to the expected types.
    

**Step 5:**

Use a function called **dumps()** from the json module using dot notation and pass the *employee\_dict* dictionary that we have created to it. Return its value to a variable named ***json\_object****.* 

The format of the same should look like:

***variable = json.dumps(dict)*** 

**Step 6:** Complete the **write\_json\_to\_file()** function

**6.1** Use a built-in function called **open()** and pass the output\_file argument and “w” to it. Return the value of this function to a variable named ***newfile***.

 **6.2** Call a function called **write()** over this variable *newfile.* Pass the *json\_object* variable you created in **Step 5** inside it.

**6.3** Close this file by calling a built-in function **close()** directly on *newfile*. You don’t need to pass any arguments here. 

**Step 7:** Save the files.

**Step 8**: Open the terminal to execute the files.

![Open the terminal to run the script.](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/F6pl0Um5SFmqZdFJuahZmA_6f38191ff9c344c7870cf7c23e02b1a1_Screenshot-2022-05-30-145117.png?expiry=1731196800000&hmac=PuFwv05TtSPl_AJYm1Fkhjw-R7lpd-ws6n0x6B9JoaI align="left")

**Step 9:** Run the code using the command (within project directory)

**python3** [**jsongenerator.py**](http://jsongenerator.py)

---

## **Solution**

* **jsongenerator.py**
    
    ```python
    # Import statements
    import json
    from employee import details, employee_name, age, title
    
    def create_dict(name, age, title):
        """ Creates a dictionary that stores an employee's information
    
        1. Return a dictionary that maps "first_name" to name, "age" to age, and "title" to title
    
        Args:
            name: Name of employee
            age: Age of employee
            title: Title of employee
    
        Returns:
            dict - A dictionary that maps "first_name", "age", and "title" to the
                   name, age, and title arguments, respectively. Make sure that 
                   the values are typecasted correctly (name - string, age - int, 
                   title - string)
        """
        employee_dict = {
            "first_name": str(name),
            "age": int(age),
            "title": str(title)
        }
        return employee_dict
    
    def write_json_to_file(json_obj, output_file):
        """ Write json string to file
    
        1. Open a new file defined by output_file
        2. Write json_obj to the new file
    
        Args:
            json_obj: json string containing employee information
            output_file: the file the json is being written to
        """
        with open(output_file, "w") as newfile:
            newfile.write(json_obj)
    
    def main():
        # Print the contents of details() -- This should print the details of an employee
        details()
    
        # Create employee dictionary
        employee_dict = create_dict(employee_name, age, title)
        print("employee_dict: " + str(employee_dict))
    
        # Use a function called dumps from the json module to convert employee_dict
        # into a json string and store it in a variable called json_object.
        json_object = json.dumps(employee_dict)
    
        # Write out the json object to file
        write_json_to_file(json_object, "employee.json")
    
    if __name__ == "__main__":
        main()
    ```
    
* **employee.py**
    
    ```python
    employee_name = "Mario"
    age = "55"
    title = "owner"
    
    def details():
        print("Employee name is:  ", employee_name)
        print("Employee age is: ", age)
        print("Employee title is:  ", title)
    ```
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731053914997/7b43b0a4-cb2d-48e6-8b5b-8c94f671db2a.png align="center")