---
title: "Programming Assignment: Functions, loops and data structures"
seoTitle: "Programming Assignment: Functions, loops and data structures"
seoDescription: "In this lab you will be presented with a menu ordering system which will allow users to input three choices for a select menu. You are tasked with completin"
datePublished: Fri Nov 08 2024 07:18:23 GMT+0000 (Coordinated Universal Time)
cuid: cm38enmqe000a08l1enfb7rvt
slug: programming-assignment-functions-loops-and-data-structures
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731050231446/061c166c-821d-4e50-b69c-64046b1a369d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731050242749/e62aeb04-33de-42c5-a846-919f47d936a6.png
tags: programming-assignment-functions-loops-and-data-structures

---

### Introduction

In this lab you will be presented with a menu ordering system which will allow users to input three choices for a select menu. You are tasked with completing the menu system so that it returns and calculates the final bill for the user.

### Objectives

* Create new functions to solve specific problems.
    
* Gain experience of using for loops to iterate over different data collections.
    
* Create and use data structures to store, retrieve and loop over data.
    

### Instructions

**Step 1:** Open the script **ordering\_**[**system.py**](http://system.py) present inside the project folder.

**Step 2:** Run the script and, when requested, enter in the three products of your choice based on the menu - 1 = espresso, 2 = coffee etc.

**Step 3**: To run the script, open the terminal and execute the command below.

**python3** **ordering\_**[**system.py**](http://system.py)

![Open the terminal to run the script.](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/F6pl0Um5SFmqZdFJuahZmA_6f38191ff9c344c7870cf7c23e02b1a1_Screenshot-2022-05-30-145117.png?expiry=1731196800000&hmac=PuFwv05TtSPl_AJYm1Fkhjw-R7lpd-ws6n0x6B9JoaI align="left")

**Step 4:** Extend the script to have a new function called calculate\_subtotal. It should accept one argument which is the order list and return the sum of the prices of the items in the order list.

**Step 5:** Implement **calculate\_tax()** which calculates the tax of the subtotal. The tax percentage is 15% of overall bill.

**Step 6:** Implement **summarize\_order()** which returns a list of the names of the items that the customer ordered and the total amount (including tax) that they have to pay. The orders should show the name and price.

---

```python
menu = {
    1: {"name": 'espresso',
        "price": 1.99},
    2: {"name": 'coffee', 
        "price": 2.50},
    3: {"name": 'cake', 
        "price": 2.79},
    4: {"name": 'soup', 
        "price": 4.50},
    5: {"name": 'sandwich',
        "price": 4.99}
}

def calculate_subtotal(order):
    """ Calculates the subtotal of an order

    [IMPLEMENTED] 
        1. Add up the prices of all the items in the order and return the sum

    Args:
        order: list of dicts that contain an item name and price

    Returns:
        float = The sum of the prices of the items in the order
    """
    print('Calculating bill subtotal...')
    ### WRITE SOLUTION HERE
    subtotal = 0 # initialize a variable to store the sum
    for item in order: # loop over the list of dictionaries
        subtotal += item["price"] # add the price of each item to the sum
    return subtotal # return the sum

def calculate_tax(subtotal):
    """ Calculates the tax of an order

    [IMPLEMENTED] 
        1. Multiply the subtotal by 15% and return the product rounded to two decimals.

    Args:
        subtotal: the price to get the tax of

    Returns:
        float - The tax required of a given subtotal, which is 15% rounded to two decimals.
    """
    print('Calculating tax from subtotal...')
    ### WRITE SOLUTION HERE
    tax = subtotal * 0.15 # multiply the subtotal by 0.15
    tax = round(tax, 2) # round the result to two decimal places
    return tax # return the tax

def summarize_order(order):
    """ Summarizes the order

    [IMPLEMENTED]
        1. Calculate the total (subtotal + tax) and store it in a variable named total (rounded to two decimals)
        2. Store only the names of all the items in the order in a list called names
        3. Return names and total.

    Args:
        order: list of dicts that contain an item name and price

    Returns:
        tuple of names and total. The return statement should look like 
        
        return names, total
    """
    print('Summarizing order...')
    ### WRITE SOLUTION HERE
    subtotal = calculate_subtotal(order) # call calculate_subtotal function
    tax = calculate_tax(subtotal) # call calculate_tax function
    total = round(subtotal + tax, 2) # calculate total by adding subtotal and tax and rounding to two decimals
    names = [] # initialize an empty list to store names
    for item in order: # loop over the list of dictionaries
        names.append(item["name"]) # append the name of each item to the list
    return names, total # return a tuple of names and total
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731050295813/7102765e-7c1d-453a-8ae3-9edca9af9df3.png align="center")