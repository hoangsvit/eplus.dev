---
title: "Create a complex form"
seoTitle: "Create a complex form"
seoDescription: "Create a complex form"
datePublished: Sun Jul 21 2024 13:34:41 GMT+0000 (Coordinated Universal Time)
cuid: clyvlnutu000309jo845p504o
slug: create-a-complex-form
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721568791471/c2e84f05-86e1-4757-8eaf-2f5ca04405e4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721568868466/b4281482-fee8-4d9a-9a8b-2b68d3084fdb.png

---

# Summary

In this exercise, you’ll create a table booking form for the Little Lemon website. The form will contain four fields; email address, date of booking, number of people and a checkbox to confirm agreement with the cancellation policy. The form will also have a submit button.

# Instructions

**Step 1:** First add a form element to the main element of the HTML document.

**Step 2:** Next, add four div elements; one for each input field.

**Step 3:** In the first div element, add a label element and an input element for the email address. Ensure that you use the correct type attribute to the input element to apply client-side validation.

**Step 4:** In the second div element, add a label element and an input element for the date of booking. Set the type attribute to date to allow for a date picker to appear when the user interacts with the form. Note that if using Live Preview, the date picker will not appear. However, if you launch the web page in a new web browser tab, it will appear.

**Step 5:** In the third div element, add a label element and an input element for the number of people. Set the type attribute to number and apply the appropriate attributes so that the minimum value is 1 and the maximum value is 8.

**Step 6:** In the fourth div element, add a label element. Set the text of the label element to "I agree to the cancellation policy".

**Step 7:** Add an input element to the label and set its type attribute to checkbox. Apply the required attribute to the element.

**Step 8:** After the fourth div element, add a button element and set its text to "Book Now". Set its type attribute to submit.

**Step 9:** For each input element, add a name attribute.

**Step 10:** Save the HTML document and open it in Live Preview.

**Step 11:** Click the date of booking field. Note the result.

**Step 12:** Type the word "hello" into the email address field. Set the date field to today and the number of people to 1.

**Note** The date picker element is not supported in the Live Preview.

**Step 13:** Click the checkbox and then click the Book Now button. Note the result.

## Tips

* Refer to your cheat sheets and glossary from previous lessons.
    

---

```xml
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Little Lemon</title>

    <meta property="og:title" content="Our Menu">
    <meta property="og:type" content="website">
    <meta property="og:image" content="logo.png">
    <meta property="og:url" content="https://littlelemon/">
    <meta property="og:description" content="Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="Little Lemon">

    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <header>
        <img src="logo.png">
    </header>
    <main>
        <form method="post">

            <div>
                <label for="email">Enter Email</label>
                <input type="email" name="email" id="email">
            </div>
            <div>
                <label for="dob">Enter Booking Date</label>
                <input type="date" name="date_of_booking" id="dob">
            </div>
            <div>
                <label for="nop">Enter Number Of people</label>
                <input type="range" name="no_of_people" id="nop" min="1" max="8" value="4" oninput="this.nextElementSibling.value = this.value">
                <output>4</output>
            </div>
            <div>
                <label for="pol">I agree to the cancellation policy</label>
                <input type="checkbox" name="policy" id="pol">
            </div>
            <button type="submit">Book Now</button>
        </form>
    </main>
</body>

</html>
```