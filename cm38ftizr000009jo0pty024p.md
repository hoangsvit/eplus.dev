---
title: "Programming Assignment: Mapping key-values to Dictionary data structures - Module 3"
seoTitle: "Programming Assignment: Mapping key-values to Dictionary data structur"
seoDescription: "So far you have learned that Python has different techniques to modify a given iterator sequence such as list or dictionary using comprehensions, map() func"
datePublished: Fri Nov 08 2024 07:50:58 GMT+0000 (Coordinated Universal Time)
cuid: cm38ftizr000009jo0pty024p
slug: programming-assignment-mapping-key-values-to-dictionary-data-structures-module-3
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731052226668/7ca22e97-c906-436b-86f3-801ab5847c72.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731052239613/82e7d77e-d391-4e1c-9e5f-227f4c4f48b4.png
tags: programming-assignment-mapping-key-values-to-dictionary-data-structures-module-3

---

## Introduction

So far you have learned that Python has different techniques to modify a given iterator sequence such as list or dictionary using comprehensions, map() function and so on. Now you will be utilising what you have learned. Let’s say you have a list of employee data for the Little Lemon company. You want to create login accounts for the employees and you will create usernames for these employees in the first example. 

You also want to update the roster for these employees on the calendar and want easy access to their initials and employee IDs, as they are all unique. To get that, in the second example, you will create a dictionary with the required information. 

## Instructions

**Step 1:** Open the [**comprehensions.py**](http://comprehensions.py) file

**Step 2:** Implement the **to\_mod\_list()** function by using the map() function to apply **mod()** to all elements within **employee\_list**. Assign the result of it to a new variable called **map\_emp**. Convert **map\_emp** to a list and return it.

The mod() function returns a string value for example such as *“Lisa\_Cold Storage”* from the dictionary passed to it. 

**Step 3:** At this point you should have a list of the values such as: *“Lisa\_Cold Storage”* mentioned above. But that is no good for a username with the whitespace present in it. Implement the **generate\_usernames()** method by using list comprehension and the **replace()** over mod\_list to replace all spaces (" ") with underscores ("\_"). Return the resulting list.

**Step 4:** We want to create a dictionary that stores employees' first initials and IDs. Implement **map\_id\_to\_initial()** by using dictionary comprehension over the **employee\_list** to create a dictionary where each key is the first letter of an employee's name and the value is the employee's ID.

**Step 5:** Run the script by opening the terminal and executing the command

**python3** [**comprehensions.py**](http://comprehensions.py)

---

## **Solution**

```python
# Input data: List of dictionaries
employee_list = [
   {"id": 12345, "name": "John", "department": "Kitchen"},
   {"id": 12456, "name": "Paul", "department": "House Floor"},
   {"id": 12478, "name": "Sarah", "department": "Management"},
   {"id": 12434, "name": "Lisa", "department": "Cold Storage"},
   {"id": 12483, "name": "Ryan", "department": "Inventory Mgmt"},
   {"id": 12419, "name": "Gill", "department": "Cashier"}
]

# Function to be passed to the map() function. Do not change this.
def mod(employee_list):
   temp = employee_list['name'] + "_" + employee_list["department"]
   return temp

def to_mod_list(employee_list):
   """ Modifies the employee list of dictionaries into list of employee-department strings

   [IMPLEMENT ME] 
      1. Use the map() method to apply mod() to all elements in employee_list

   Args:
      employee_list: list of employee objects

   Returns:
      list - A list of strings consisting of name + department.
   """
   map_emp = map(mod, employee_list)
   return list(map_emp)

def generate_usernames(mod_list):
   """ Generates a list of usernames 

   [IMPLEMENT ME] 
      1. Use list comprehension and the replace() function to replace space
         characters with underscores

      List comprehension looks like:
      list = [ function() for <item> in <list> ]

      The format for the replace() function is:

      test_str.replace(“a”, “z”) # replaces every “a” in test_str with “z”

   Args:
      mod_list: list of employee-department strings

   Returns:
      list - A list of usernames consisting of name + department delimited by underscores.
   """
   return [name.replace(" ", "_") for name in mod_list]

def map_id_to_initial(employee_list):
   """ Maps employee id to first initial

   [IMPLEMENT ME] 
      1. Use dictionary comprehension to map each employee's id (value) to the first letter in their name (key)

      Dictionary comprehension looks like:
      dict = { key : value for <item> in <list> }

   Args:
      employee_list: list of employee objects

   Returns:
      dict - A dictionary mapping an employee's id (value) to their first initial (key).
   """
   return {employee["name"][0]: employee["id"] for employee in employee_list}

def main():
   mod_emp_list = to_mod_list(employee_list)
   print("Modified employee list: " + str(mod_emp_list) + "\n")

   print(f"List of usernames: {generate_usernames(mod_emp_list)}\n")

   print(f"Initials and ids: {map_id_to_initial(employee_list)}")

if __name__ == "__main__":
   main()
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731052215836/a96cbd11-dadd-454f-87ac-7e0a6491a04e.png align="center")