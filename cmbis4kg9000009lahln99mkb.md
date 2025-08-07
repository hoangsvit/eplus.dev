---
title: "Getting Started with Liquid to Customize the Looker User Experience - GSP933"
seoTitle: "Getting Started with Liquid to Customize the Looker User Experience -"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Thu Jun 05 2025 02:50:49 GMT+0000 (Coordinated Universal Time)
cuid: cmbis4kg9000009lahln99mkb
slug: getting-started-with-liquid-to-customize-the-looker-user-experience-gsp933
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749091786970/5a26cb1a-914a-4262-b59e-3c67fdd7d522.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749091804303/82cbb6aa-2568-4d66-ba70-2c4149e2117c.png
tags: looker-studio, gsp933, getting-started-with-liquid-to-customize-the-looker-user-experience-gsp933, getting-started-with-liquid-to-customize-the-looker-user-experience

---

## Overview

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you will explore common use cases for [Liquid](https://shopify.github.io/liquid/) and learn how to use it to customize dimensions and measures.

## What you'll learn

In this lab, you will learn how to:

* List common use cases for Liquid in Looker
    
* Use Liquid to add links to dimensions (e.g. web searches, Looker dashboards and Explores, other company applications)
    
* Use Liquid to customize dimensions and measure values using the `html` parameter
    

### Prerequisites:

Familiarity with LookML is necessary. Completing the [Understanding LookML in Looker](https://www.cloudskillsboost.google/course_templates/774) course is recommended before you begin this lab.

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to Looker

1. When ready, click .
    
    A new panel will appear with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up will open for you to select your payment method.
    
2. Note your lab credentials in the left pane. You will use them to sign in to the Looker instance for this lab.
    
    **Note:** If you use other credentials, you will get **errors or incur charges**.
    
3. Click **Open Looker**.
    
4. Enter the provided Username and Password in the Email and Password fields.
    
    **Important:** You must use the credentials from the Connection Details panel on this page. Do not use your Google Cloud Skills Boost credentials. If you have your own Looker account, do not use it for this lab.
    
5. Click **Log In**.
    
    After a successful login, you will see the Looker instance for this lab.
    

## What is Liquid?

[Liquid](https://shopify.github.io/liquid/) is an open source, Ruby-based templating language created by Shopify. You can use it in conjunction with LookML to build more flexible, dynamic code.

There are 3 categories of Liquid code:

* **Objects** - tell Liquid where to show content on a page. They are essentially variables or placeholders, where values get plugged in at runtime. An object name is surrounded by double curly braces (except when referenced within a tag).
    
    * A real-life example of this might be found in e-commerce emails. Have you ever purchased online and received an order confirmation or promotional email that said, “Hello `{{ first_name }}` `{{ last_name }}`”? A lot of these email templates use Liquid, and if someone had made an error in that template, then those objects might be exposed when your actual first and last name failed to populate.
        
* **Tags** - create the logic and control flow for templates. Tags determine how logic should work. A tag starts with a curly brace and percent sign, and ends with a percent sign and curly brace. They mostly used to write if-then rules, though you can also do things like assign variables.
    
* **Filters** - manipulate the output of a Liquid object. You apply a filter by entering a vertical pipe `|`, and then the name of a supported keyword like `append`.
    
    * This can be confusing if you’ve been using Looker for a while but have never worked with Liquid. In Looker, filters reduce the search results, like “show me only clothes that are red” or “only products that have received at least an average rating of four stars out of five”.
        

### Using Liquid in Looker

You can only use Liquid in certain LookML parameters, as detailed in the [Liquid Variable Reference](https://docs.looker.com/reference/liquid-variables). The [Liquid Variable Definitions](https://docs.looker.com/reference/liquid-variables#liquid_variable_definitions) table in particular is very useful. The Usage column shows which LookML parameters support which variable type. Check it out before you spend half an hour troubleshooting why your flawless Liquid code doesn’t work in an unsupported area!

You may notice filters aren’t mentioned on this page, such as *append* or *concat*. You should look up Shopify’s own Liquid documentation to read more about those. Most, if not all, Liquid filters should also work in Looker.

Specifically, there are several places in LookML where Liquid can be used:

* The `action` parameter
    
    * The action parameter creates a data action that lets users perform field-level tasks in other tools, directly from Looker. For example, the action can cause an email to be sent, set values in other applications, or perform any other action that you can configure a receiving server to do. The receiving server must be able to accept a JSON POST.
        
* The `html` parameter
    
    * The html parameter enables you to specify the HTML that will be contained by a field. By using Liquid variables, you can get access to the values that would typically be in the field. This allows you to create a number of useful functions, including links to other related Looks, links to external websites, or images.
        
* The `label` parameter of a field
    
    * A string specifying the name of the action as it will appear to users in the Action menu.
        
* The `link` parameter
    
    * The link parameter allows you to add web links to dimensions and measures to enable users to easily navigate to related content directly from Looker. This will be discussed in more detail later in the lab.
        
* Parameters that begin with **sql**: `sql`, `sql_on`, `sql_table_name`
    

### Using Liquid variables

Basic usage of Liquid variables is straightforward. Once you’ve identified the variable you’d like to use, simply insert it into a valid LookML parameter. The specific Liquid variables that you can use in specific LookML parameters are defined in the [Liquid variable definitions documentation](https://docs.looker.com/reference/liquid-variables#liquid_variable_definitions).

There are two ways to make use of a Liquid variable:

1. **Output Syntax**: This type of usage can insert text and is probably the most common way to use Liquid in Looker. In this method, you enclose the Liquid variable in two curly braces. For example: `{{ value }}`.
    
2. **Tag Syntax**: This type of usage usually doesn’t insert text; instead, it is for logical comparisons and other Liquid operations. In this method, you enclose the Liquid variable in one curly brace and a single percent sign. For example: `{% if value > 10000 %}`.
    

#### Basic examples

In this example of HTML usage, a product ID is being inserted into an `<img>` tag to generate product images:

```apache
dimension: product_image {
  sql: ${product_id} ;;
  html: <img src="http://www.brettcase.com/product_images/{{ value }}.jpg" /> ;;
}
```

In this example of URL usage, an artist name is being inserted into a URL to produce a Google search for that artist.

```apache
dimension: artist_name {
  sql: ${TABLE}.artist_name ;;
  link: {
    label: "Google"
    url: "http://www.google.com/search?q={{ value }}"
    icon_url: "http://google.com/favicon.ico"
  }
}
```

### Accessing variables from other fields

Liquid variables are usually based on the field where they are being used. However, you can also access values from other fields if needed.

Use the format `{{ view_name.field_name._liquid-variable-name }}` to access other fields from the same row in the query result. Replace `_liquid-variable-name` with any of the Looker Liquid variables. Make sure the variable name is preceded by an underscore if it isn’t normally, like these:

* `{{ view_name.field_name._value }}`
    
* `{{ view_name.field_name._rendered_value }}`
    
* `{{ view_name.field_name._model._name }}`
    

This example shows this type of usage to access a website URL from a different field:

```apache
dimension: linked_name {
  sql: ${name} ;;
  html: <a href="{{ website.url._value }}" target="_new">{{ value }}</a> ;;
}
```

### Common use cases

Liquid can be used in a wide variety of ways in Looker. Some of the most popular use cases include:

* Creating dynamic links or rendering dynamic images
    
* Setting up custom drills
    
* Changing the label of a field based on the model being used
    
* Aggregate awareness
    
* Adding custom conditional formatting
    
* Integrating templated filters and parameters
    

### The link parameter

Most links are added to dimensions and measures using the `link` parameter. The `link` parameter creates a custom link or drill. This takes 3 sub-parameters:

![Highlighted link parameters](https://cdn.qwiklabs.com/Ib9aeGSvcawCEXdAIun0PVlwTZ6qMMN5WnXw119HutA%3D align="left")

* **label** - the name this link will have in the drill menu and how the link option should appear in the UI
    
* **url** - the target URL which often contains the dynamic `{{ value }}` object. It supports full Liquid (but not full HTML)
    
* **icon\_url** - the image URL to be used as an icon for this link. The `icon_url` parameter is not required if you do not want an icon. If you need corporate logos, try running a Google search with the pattern `http://www.google.com/s2/favicons?domain=[company website of interest]` to find images in the favicon (.ico) format
    

To learn more about the `link` parameter, refer to the Looker's [link Documentation](https://docs.looker.com/reference/field-params/link) parameter.

## Task 1. Add a linked web search to a dimension

In this section, you will add a link to the **City** dimension in the **Users** view that allows a user to click on a city in the user interface and link to a Google search for that city.

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    
2. Click the **Develop** tab and then select the **qwiklabs-ecommerce** LookML project. Navigate to the **Users** view file.
    
3. Within the **Users** view file, find the **city** dimension:
    

![users.view file displaying dimension: city {](https://cdn.qwiklabs.com/bCHXx7u%2FLL89kxJOqfYHl9QN6UPmOvc0bZQz9PTZnVk%3D align="left")

4. Under the existing city dimension, create a new **city\_link** dimension as follows, adding the **link** parameter. Click **Save Changes**.
    

```apache
dimension: city_link {
    type: string
    sql: ${TABLE}.city ;;
    link: {
      label: "Search the web"
      url: "http://www.google.com/search?q={{ value | url_encode }}"
      icon_url: "http://www.google.com/s2/favicons?domain=www.{{ value | url_encode }}.com"
      }
}
```

In the **link** parameter you just added, the sub-parameters are defined as the following:

* `label` - for the label here you use the string "Search the web" which simply conveys the action being done by clicking the link.
    
* `url` - here you use the city value from the dimension, with the [url\_encode](https://shopify.github.io/liquid/filters/url_encode/) filter applied to convert any URL-unsafe characters into percent-encoded characters.
    
* `icon_url` - this is the image URL to be used as an icon for the link. The URL used above finds favicon images for the city on the city's website (where applicable).
    

**Note:** Most of the Cities will have the generic web icon (e.g. Allentown), but some cities will have a custom icon that is found through the search (e.g. Abbeville).

Your new **city\_link** dimension should now resemble the following:

![users.view file displaying dimension: city_link {](https://cdn.qwiklabs.com/rVI24BXY1W1Mw%2FHi48n4g3jSQHJtaRn44FwXdk23%2BrA%3D align="left")

5. Navigate to the **Order Items** Explore.
    
6. Under the **Users** view, select the **City Link** dimension. Click **Run**.
    
7. Click on the three dots next to a City value (e.g. Abbeville).
    

![City value menu](https://cdn.qwiklabs.com/kEeF80C33mbITG4lkuNGSjd7Vi0Z3u4qyWUIAyq8cME%3D align="left")

8. Select **Search the web**. Great! You just added your first link to a dimension.
    
9. Navigate back to the **Users** view file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify that you've performed the above task.

Add a linked web search to a dimension

**Check my progress**

## Task 2. Use the html parameter to render dimension values as link buttons

Sometimes business users don’t like the three dots produced in the UI by the link parameter, or they have other requirements such as font styling or the way the link should be launched. The `html` parameter gives you greater flexibility for such cases. Using the `html` parameter allows for even more customized drilling and linking:

* The dimension value will be shown in Looker and will also be a hyperlink
    
* Clicking the value will take a user to the specified link within the html
    
* Additional adjustments can be made to customize the user experience
    

To learn more about the `html` parameter, refer to Looker's [html Documentation](https://docs.looker.com/reference/field-params/html)

In this section, you will create a new dimension whose values render as linked buttons to a pre-configured Explore of the order history for the selected user ID.

1. Click the **Develop** tab and then select the **qwiklabs-ecommerce** LookML project.
    

Navigate back to the **Users** view file.

2. Within the **Users** view, add a new dimension **order\_history\_button** as follows:
    

```apache
dimension: order_history_button {
  label: "Order History"
  sql: ${TABLE}.id ;;
  html: <a href="/explore/training_ecommerce/order_items?fields=order_items.order_item_id, users.first_name, users.last_name, users.id, order_items.order_item_count, order_items.total_revenue&f[users.id]={{ value }}"><button>Order History</button></a> ;;
}
```

3. Click **Save Changes**.
    

In the `html` parameter you just added, the Order History Button dimension’s values are all IDs, but instead of displaying each ID—which may not be meaningful for business users—we display the words “Order History”.

This links to the “Order Items” Explore in the Ecommerce Training model, with specific fields—note how we can use sets to make it easier to list multiple fields—and a filter on the selected User ID. Also, since the html parameter itself doesn’t generate any visual cues that the value contains a hyperlink, you can style it as a button with the `<button>` tag to make it obviously clickable. For reference: [Creating hyperlinked button dimensions](https://community.looker.com/lookml-5/creating-hyperlinked-button-dimensions-6742).

**Note:** The `href` parameter value could also be used as a URL value to create a link like in the previous section.

Your file should resemble the following:

![users.view](https://cdn.qwiklabs.com/NnClImpMnqQMmsbSI8qfv0VwMxmnUqSeU53zFGYW5Zg%3D align="left")

4. Navigate to the **Order Items** Explore.
    
5. From the **Users** view, select the **ID**, **First Name**, **Last Name**, and **Order History** dimensions. Click **Run**.
    

![Users view](https://cdn.qwiklabs.com/b8MEUvJx13laLbMW22Zo1icZnbu3LcJesd2ihr%2BuIz0%3D align="left")

6. Right-click on the **Order History** button for a user and open in a new tab. For example, if you click the button for Sam Aguilar, you can see that they have two past orders. Great! You have created a functional dimension with a linked button as the rendered values.
    
7. Navigate back to the **Users** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify that you've performed the above task.

Use the html parameter to render dimension values as link buttons

**Check my progress**

## Task 3. Use the html parameter to customize formatting of measure values

In Looker’s table visualization, business users can enable conditional formatting to create heat-maps. However, the feature only provides different fill colors for the table cells. For more flexibility to customize things like font colors or sizes, a LookML developer needs to employ the **html** parameter. Using this parameter, you can:

* Add custom colors to dimension labels or header backgrounds
    
* Include picture or icons as part of displayed values
    
* Change the size or font of displayed text
    
* Add custom details via a drop down into the cell of a table
    
* Build a progress bar into the cell of a table that compares the cell value against a goal
    

In this section, you will modify an existing measure to customize the formatting of the values based on whether the value is higher or lower than a defined amount.

1. Click the **Develop** tab and then select the **qwiklabs-ecommerce** LookML project. Navigate to the **Order Items** view file.
    
2. Within the **Order Items** view, find the **total\_revenue** measure.
    

![order-items.view](https://cdn.qwiklabs.com/zYv0RhPoQzmAcijjG6uXYwEqXitz3pzAF3vJusMxz2s%3D align="left")

3. Under the existing **total\_revenue** measure, create a **total\_revenue\_conditional** measure as follows, adding the `html` parameter:
    

```apache
measure: total_revenue_conditional {
  type: sum
  sql: ${sale_price} ;;
  value_format_name: usd
  html: {% if value > 1300.00 %}
    <p style="color: white; background-color: ##FFC20A; margin: 0; border-radius: 5px; text-align:center">{{ rendered_value }}</p>
    {% elsif value > 1200.00 %}
    <p style="color: white; background-color: #0C7BDC; margin: 0; border-radius: 5px; text-align:center">{{ rendered_value }}</p>
    {% else %}
    <p style="color: white; background-color: #6D7170; margin: 0; border-radius: 5px; text-align:center">{{ rendered_value }}</p>
    {% endif %}
    ;;
}
```

4. Click **Save Changes**.
    

In the `html` parameter you just added, the formatting of the measure is now customized based on the value. With if-then logic, you have defined the following:

* If the total revenue value is above $1300, then make the background color yellow
    
* If the total revenue value is above $1200, then make the background color blue
    
* Else (if the total revenue is under $1200), then make the background color gray
    

Your file should resemble the following:

![order_items.view displaying highlighted total_revenue_conditional html parameters](https://cdn.qwiklabs.com/1AwUhOepoVrYMLeMGVRuf3PNw0LNaSMO7HkyiKVjJM0%3D align="left")

5. Navigate to the **Order Items** Explore.
    
6. From the **Users** view, select the **ID**, **First Name**, and **Last Name**. From the **Order Items** view, select the **Total Revenue Conditional**. Click **Run**.
    

![Users view](https://cdn.qwiklabs.com/SadEpUJkuBMhTM9KhBx1%2BrVVbhrgYd0C2fZ3UwX8xyc%3D align="left")

Great! You just used the **html** parameter on the total revenue measure to color the values based on whether the value was higher or lower than a defined amount.

7. Navigate back to the **Order Items** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify that you've performed the above task.

Use the html parameter to customize formatting of measure values

**Check my progress**

## Task 4. Advanced linking with Liquid

For even more advanced use cases that require different links in different Explores, you can use Liquid tags to incorporate conditions into links. In this section, you will add a condition to a link to check the Explore name, which will then send the user to a specific link depending on where they start.

1. Click the **Develop** tab and then select the **qwiklabs-ecommerce** LookML project. Navigate back to the **Users** view file.
    
2. Within the **Users** view, find the **state** dimension.
    

![Users view displaying dimension: state {](https://cdn.qwiklabs.com/XlEqLfIHGGbFr4mOJuFBibMwel%2BMpS%2BSbWEAP1Go7C0%3D align="left")

3. Under the existing state dimension, create a new **state\_link** dimension as follows, adding the `html` parameter.
    

```apache
dimension: state_link {
  type: string
  sql: ${TABLE}.state ;;
  map_layer_name: us_states
  html: {% if _explore._name == "order_items" %}
    <a href="/explore/training_ecommerce/order_items?fields=order_items.detail*&f[users.state]= {{ value }}">{{ value }}</a>
  {% else %}
    <a href="/explore/training_ecommerce/users?fields=users.detail*&f[users.state]={{ value }}">{{ value }}</a>
  {% endif %} ;;
}
```

4. Click **Save Changes**.
    

This is a more advanced example incorporating Liquid tags for if-then logic. When someone clicks on a value in the State dimension, if they’re currently in the `order_items` Explore, then they should get redirected to the same Explore with some fields and a filter applied. If they’re in any other Explore that happens to include this view and dimension, then they get sent to the “Users” Explore with some other fields and a filter applied. For reference: [Conditional URL Links Depending on Explore](https://community.looker.com/lookml-5/conditional-url-links-depending-on-explore-9445).

5. Navigate to the **Order Items** Explore.
    
6. From the **Users** view, select the **ID**, **First Name**, **Last Name**, and **State Link**. Click **Run**.
    
7. Click one of the states, and see how it redirects you to the same Explore with some fields and a filter applied. Try following the same steps from a different Explore that includes the same views and dimensions, and see how the Liquid logic reacts.
    
8. Navigate back to the **Order Items** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify that you've performed the above task.

Advanced Linking with Liquid

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/JCNkB1Rp0Y4] 

### **🛠️ Looker Configuration Guide 🚀**

> 💡 **Pro Tip:** Follow along with the complete video tutorial to ensure you achieve full scores on all "Check My Progress" validation steps!

### **📊 Step 1: Update the** `user` View

Modify the `user` view with the following configuration:

```apache
view: users {
  sql_table_name: `cloud-training-demos.looker_ecomm.users`
    ;;
  drill_fields: [id]

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension: age {
    type: number
    sql: ${TABLE}.age ;;
  }

  dimension: city {
    type: string
    sql: ${TABLE}.city ;;
  }

  dimension: city_link {
    type: string
    sql: ${TABLE}.city ;;
    link: {
      label: "Search the web"
      url: "http://www.google.com/search?q={{ value | url_encode }}"
      icon_url: "http://www.google.com/s2/favicons?domain=www.{{ value | url_encode }}.com"
    }
  }

  dimension: order_history_button {
    label: "Order History"
    sql: ${TABLE}.id ;;
    html: <a href="/explore/training_ecommerce/order_items?fields=order_items.order_item_id, users.first_name, users.last_name, users.id, order_items.order_item_count, order_items.total_revenue&f[users.id]={{ value }}"><button>Order History</button></a> ;;
  }

  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }

  dimension_group: created {
    type: time
    timeframes: [
      raw,
      time,
      date,
      week,
      month,
      quarter,
      year
    ]
    sql: ${TABLE}.created_at ;;
  }

  dimension: email {
    type: string
    sql: ${TABLE}.email ;;
  }

  dimension: first_name {
    type: string
    sql: ${TABLE}.first_name ;;
  }

  dimension: gender {
    type: string
    sql: ${TABLE}.gender ;;
  }

  dimension: last_name {
    type: string
    sql: ${TABLE}.last_name ;;
  }

  dimension: latitude {
    type: number
    sql: ${TABLE}.latitude ;;
  }

  dimension: longitude {
    type: number
    sql: ${TABLE}.longitude ;;
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
    map_layer_name: us_states
  }
  
  dimension: state_link {
    type: string
    sql: ${TABLE}.state ;;
    map_layer_name: us_states
    html: {% if _explore._name == "order_items" %}
          <a href="/explore/training_ecommerce/order_items?fields=order_items.detail*&f[users.state]= {{ value }}">{{ value }}</a>
        {% else %}
          <a href="/explore/training_ecommerce/users?fields=users.detail*&f[users.state]={{ value }}">{{ value }}</a>
        {% endif %} ;;
  }

  dimension: traffic_source {
    type: string
    sql: ${TABLE}.traffic_source ;;
  }

  dimension: zip {
    type: zipcode
    sql: ${TABLE}.zip ;;
  }

  measure: count {
    type: count
    drill_fields: [id, last_name, first_name, events.count, order_items.count]
  }
}
```

### **📝 Step 2: Update the** `order_items` View File

Modify the `order_items` view file with the following configuration:

```apache
view: order_items {
    sql_table_name: `cloud-training-demos.looker_ecomm.order_items`
      ;;
    drill_fields: [order_item_id]
  
    dimension: order_item_id {
      primary_key: yes
      type: number
      sql: ${TABLE}.id ;;
    }
  
    dimension_group: created {
      type: time
      timeframes: [
        raw,
        time,
        date,
        week,
        month,
        quarter,
        year
      ]
      sql: ${TABLE}.created_at ;;
    }
  
    dimension_group: delivered {
      type: time
      timeframes: [
        raw,
        date,
        week,
        month,
        quarter,
        year
      ]
      convert_tz: no
      datatype: date
      sql: ${TABLE}.delivered_at ;;
    }
  
    dimension: inventory_item_id {
      type: number
      # hidden: yes
      sql: ${TABLE}.inventory_item_id ;;
    }
  
    dimension: order_id {
      type: number
      sql: ${TABLE}.order_id ;;
    }
  
    dimension_group: returned {
      type: time
      timeframes: [
        raw,
        time,
        date,
        week,
        month,
        quarter,
        year
      ]
      sql: ${TABLE}.returned_at ;;
    }
  
    dimension: sale_price {
      type: number
      sql: ${TABLE}.sale_price ;;
    }
  
    dimension_group: shipped {
      type: time
      timeframes: [
        raw,
        date,
        week,
        month,
        quarter,
        year
      ]
      convert_tz: no
      datatype: date
      sql: ${TABLE}.shipped_at ;;
    }
  
    dimension: status {
      type: string
      sql: ${TABLE}.status ;;
    }
  
    dimension: user_id {
      type: number
      # hidden: yes
      sql: ${TABLE}.user_id ;;
    }
  
  
    measure: average_sale_price {
      type: average
      sql: ${sale_price} ;;
      drill_fields: [detail*]
      value_format_name: usd_0
    }
  
    measure: order_item_count {
      type: count
      drill_fields: [detail*]
    }
  
    measure: order_count {
      type: count_distinct
      sql: ${order_id} ;;
    }
  
    measure: total_revenue {
      type: sum
      sql: ${sale_price} ;;
      value_format_name: usd
    }
  
    measure: total_revenue_conditional {
      type: sum
      sql: ${sale_price} ;;
      value_format_name: usd
      html: {% if value > 1300.00 %}
            <p style="color: white; background-color: ##FFC20A; margin: 0; border-radius: 5px; text-align:center">{{ rendered_value }}</p>
            {% elsif value > 1200.00 %}
            <p style="color: white; background-color: #0C7BDC; margin: 0; border-radius: 5px; text-align:center">{{ rendered_value }}</p>
            {% else %}
            <p style="color: white; background-color: #6D7170; margin: 0; border-radius: 5px; text-align:center">{{ rendered_value }}</p>
            {% endif %}
            ;;
    }
  
    measure: total_revenue_from_completed_orders {
      type: sum
      sql: ${sale_price} ;;
      filters: [status: "Complete"]
      value_format_name: usd
    }
  
  
    # ----- Sets of fields for drilling ------
    set: detail {
      fields: [
        order_item_id,
        users.last_name,
        users.id,
        users.first_name,
        inventory_items.id,
        inventory_items.product_name
      ]
    }
  }
```

> ⚡ **Note:** Save your changes after completing each step to ensure proper configuration.