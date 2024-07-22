---
title: "Create a grid layout"
seoTitle: "Create a grid layout"
seoDescription: "Create a grid layout"
datePublished: Mon Jul 22 2024 14:05:01 GMT+0000 (Coordinated Universal Time)
cuid: clyx26pjf000209l79ekg6b2i
slug: create-a-grid-layout
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721656909016/08f212ff-c073-42c5-b1fc-1739d680424a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721657071953/ec9f230c-7d7f-4d77-9f85-c76bf1965ad8.png
tags: flexbox, css3, css, flex-css

---

Initial code for the HTML is already provided.

The rules for different areas within the grid template area are already provided in the CSS code.

You have to add the rules for the container class as per the instructions provided.

The two set of rules to be added for the container class will have one set for regular ‘container’ class and another using media query for a different size.

Follow the instructions below:

Make sure you check the output at every step.

First, write rules by adding properties for the ‘container’ class as below:

**Step 1:** Add a display property that will create a grid.

```css
display: grid;
```

**Step 2:** It will have a maximum width of 900 pixels.

```css
max-width: 900px;
```

**Step 3:** The minimum height for it will be the length of 50 viewport height

```css
min-height: 50vh;
```

**Step 4:** Now you will first add rule for grid template columns that will span 100 % of the width.

```css
grid-template-columns: 100%;
```

**Step 5:** You will then add rule for grid template values for five rows, of which the middle one will have value of 1 fractional area and the rest will be set to auto.

```css
grid-template-rows: auto auto 1fr auto auto;
```

**Step 6:** Finally, you will create a grid template area that will contain five values viz. ‘header’, ‘left’, ‘main’, ‘right’ and ‘footer’

```css
grid-template-areas: "header" "left" "main" "right" "footer";
```

Similar to the rules you have defined above, you will again add different set of rules inside the media query when the minimum width of the viewport is 440 pixels.

The rules to be added for the container ‘class’ will be as below:

**Step 7:** The three grid template columns will have respective values of 150 pixels, 1 fractional area and again 150 pixels.

```css
grid-template-columns: 150px 1fr 150px;
```

**Step 8:** The three grid template rows will have the middle value of 1 fractional are, while the two others will be set to auto

```css
grid-template-rows: auto 1fr auto;
```

**Step 9:** Finally this time, you will be creating a 3 x 3 grid template area that will have only header in the first row. It will have  ‘left’, ‘main’ and ‘right’ in the second row and finally have only ‘footer’ in the last row.

```css
grid-template-areas: "header header header" 
                     "left main right" 
					 "footer footer footer";
```

Open index.html in Live Preview.

---

```css
.container {
  display: grid;
  max-width: 900px;
  min-height: 50vh;
  grid-template-columns: 100%;
  grid-template-rows: auto auto 1fr auto auto;
  grid-template-areas: "header" "left" "main" "right" "footer";
}

@media (min-width: 440px) {
  .container {
    grid-template-columns: 150px 1fr 150px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "header header header" "left main right" "footer footer footer";
  }
}

.header {
  grid-area: header;
  padding: 10px;
  background-color: black;
  color: #fff;
  text-align: center;
}

.main {
  grid-area: main;
  padding: 25px;
}

.left {
  grid-area: left;
  background-color: peachpuff;
}

.right {
  grid-area: right;
}

.footer {
  grid-area: footer;
  padding: 10px;
  background-color: black;
  color: #fff;
  text-align: center;
}

.sidebar {
  padding: 25px;
  background-color: darkcyan;
}
```