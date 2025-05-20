---
title: "Using the Natural Language API from Google Docs - GSP126"
seoTitle: "Using the Natural Language API from Google Docs - GSP126"
seoDescription: "The Natural Language API is a pretrained machine learning model that can analyze syntax, extract entities, and evaluate the sentiment of text. You can call "
datePublished: Tue May 20 2025 10:34:32 GMT+0000 (Coordinated Universal Time)
cuid: cmawdna4o000p08lb5mma1dke
slug: using-the-natural-language-api-from-google-docs-gsp126-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747737204292/7ff75294-e8aa-47c6-a342-e24476a1a506.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747737223938/fbd8f1b2-97f1-4452-8029-e688138ced0a.png
tags: using-the-natural-language-api-from-google-docs-gsp126, gsp1262, using-the-natural-language-api-from-google-docs

---

## Overview

The [Natural Language API](https://cloud.google.com/natural-language/) is a pretrained machine learning model that can analyze syntax, extract entities, and evaluate the sentiment of text. You can call the Natural Language API from Google Docs to perform all of these functions.

This lab focuses on calling the Natural Language API from Google Docs. You use the Natural Language API to recognize the sentiment of selected text in a Google Doc and highlight it based on that sentiment.

When you complete this lab, you are able to select text in a document and mark its sentiment, using a menu choice, as shown below.

![The Google doc, Natural Language Sample displaying the Mark Sentiment menu option](https://cdn.qwiklabs.com/vXt7L2%2BkcNJro4KFPO%2FrCeF4d%2FAyzY437h%2BZCU4G15A%3D align="left")

Text is highlighted in red for negative sentiment, green for positive sentiment, and yellow for neutral sentiment.

### What you'll learn

In this lab, you learn how to:

* Call the Natural Language API from Google Docs
    
* Add menus to Google Docs
    
* Recognize and work with selected text in Google Docs
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-fb9be0d6cd1a@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    Yi2GGczRRtvD
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

## Task 1. Enable the Natural Language API

Before you start, make sure that the Natural Language API is enabled.

1. In the Google Cloud console, select **Navigation menu &gt; APIs & Services &gt; Library**.
    
2. Search for **Cloud Natural Language API** and click on the API to enable it or to confirm that the API is enabled.
    

## Task 2. Get an API key

Generate an API user key to pass in the request URL.

1. To create an API key, select **Navigation menu &gt; APIs & Services &gt; Credentials**.
    
2. Click **Create credentials** at the top and select **API key**:
    
3. Copy the API key to a text file or a Google Doc to use in a later step. Click **Close**.
    

Once you have the API key, you are ready to move into Google Docs.

Click *Check my progress* to verify the objective.

Get an API Key

**Check my progress**

## Task 3. Set up your Google Doc

Before you call the Natural Language API, make an Apps Script program to create the menu, link it to a function to mark the text, and extract the text from the user selection.

1. Create a [new Google Doc](https://docs.google.com/document/create).
    
2. From within your new document, select the menu item **Extensions &gt; Apps Script**.
    
3. Delete any code in the script editor and paste in the code below. This code creates a menu item, extracts the text from the current selected text, and highlights the text based on its sentiment. It does not call the Natural Language API yet.
    

```apache
/**
* @OnlyCurrentDoc
*
* The above comment directs Apps Script to limit the scope of file
* access for this add-on. It specifies that this add-on will only
* attempt to read or modify the files in which the add-on is used,
* and not all of the user's files. The authorization request message
* presented to users will reflect this limited scope.
*/

/**
* Creates a menu entry in the Google Docs UI when the document is
* opened.
*
*/
function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Natural Language Tools')
    .addItem('Mark Sentiment', 'markSentiment')
    .addToUi();
}
/**
* Gets the user-selected text and highlights it based on sentiment
* with green for positive sentiment, red for negative, and yellow
* for neutral.
*
*/
function markSentiment() {
  var POSITIVE_COLOR = '#00ff00';  //  Colors for sentiments
  var NEGATIVE_COLOR = '#ff0000';
  var NEUTRAL_COLOR = '#ffff00';
  var NEGATIVE_CUTOFF = -0.2;   //  Thresholds for sentiments
  var POSITIVE_CUTOFF = 0.2;

  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var string = getSelectedText();

    var sentiment = retrieveSentiment(string);

    //  Select the appropriate color
    var color = NEUTRAL_COLOR;
    if (sentiment <= NEGATIVE_CUTOFF) {
      color = NEGATIVE_COLOR;
    }
    if (sentiment >= POSITIVE_CUTOFF) {
      color = POSITIVE_COLOR;
    }

    //  Highlight the text
    var elements = selection.getSelectedElements();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().editAsText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive();
        element.setBackgroundColor(startIndex, endIndex, color);

      } else {
        var element = elements[i].getElement().editAsText();
        foundText = elements[i].getElement().editAsText();
        foundText.setBackgroundColor(color);
      }
    }
  }
}
/**
 * Returns a string with the contents of the selected text.
 * If no text is selected, returns an empty string.
 */
function getSelectedText() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  var string = "";
  if (selection) {
    var elements = selection.getSelectedElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().asText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive() + 1;
        var text = element.getText().substring(startIndex, endIndex);
        string = string + text;

      } else {
        var element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip
        // images and other non-text elements.
        if (element.editAsText) {
          string = string + element.asText().getText();
        }
      }
    }
  }
  return string;
}

/** Given a string, will call the Natural Language API and retrieve
  * the sentiment of the string.  The sentiment will be a real
  * number in the range -1 to 1, where -1 is highly negative
  * sentiment and 1 is highly positive.
*/
function retrieveSentiment (line) {
//  TODO:  Call the Natural Language API with the line given
//         and return the sentiment value.
  return 0.0;
}
```

**Note:** To learn more about Apps Script, refer to the [Google Apps Script reference](https://developers.google.com/apps-script/).

4. On the menu bar, click **Save project to Drive** (
    
    ![Save project button](https://cdn.qwiklabs.com/cNTYfuPAFsxBep4CDLj6rgqKSXDkOfaYf1hQ2rjgmPk%3D align="left")
    
    ). (The script's name is shown to end users in several places, including the authorization dialog.)
    
5. Return to your document. Add text to your document. You can use the sample that comes from [Alice in Wonderland on Project Gutenberg](http://www.gutenberg.org/files/11/11-h/11-h.htm#link2HCH0002) (copy and paste the `Plain Text UTF-8` version into the document), but feel free to use any text you wish.
    
6. Reload the document to see the new menu, **Natural Language Tools**, which you created, appear in the Google Docs toolbar.
    
7. Select text and then the **Mark Sentiment** option from the Natural Language Tools menu. The first time you select this option, you are prompted to authorize the script to run. Click **OK**, and then confirm your account.
    
8. **Allow** Natural Language Tools to view and manage documents that this application has been installed in.
    
9. Once the script is authorized, the selected text is highlighted in yellow, since the stub for sentiment analysis always returns 0.0, which is neutral.
    

![Description of The Project Gutenberg eBook of Alice's Adventures in Wonderland, by Lewis Carroll with the selected text highlighted](https://cdn.qwiklabs.com/oQ0MFxHfrM5MQRhjX5EDuDRRp7cHnNdPHUm%2FXn%2F8CLA%3D align="left")

Click *Check my progress* to verify the objective.

Set up your Google Doc

**Check my progress**

## Task 4. Call the Natural Language API

Once your program can extract text from the selection and highlight it, it's time to call the Natural Language API. All of this is done in the body of the `retrieveSentiment` function.

**Note:** To learn more about the Natural Language API, refer to the [Cloud Natural Language API reference](https://cloud.google.com/natural-language/docs/reference/rest/).

1. Return to the **Extensions** &gt; **Apps Script** in Google Docs.
    
2. In the `retrieveSentiment` function, replace "your key here" with your actual API key from the Google Cloud Console.
    

```apache
var apiKey = "your key here"; // Replace with your actual API key
```

3. Create a variable to hold the URL of the Natural Language API with your API key appended to it (do not modify this line):
    

```apache
var apiEndpoint = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;
```

4. Build a structure from the line passed into the function that holds the text of the line, along with its type and language. Currently the only supported language is English.
    

```apache
  var docDetails = {
    language: 'en-us',
    type: 'PLAIN_TEXT',
    content: line
  };
```

5. Build the entire data payload from the document details by adding the encoding type:
    

```apache
  var nlData = {
    document: docDetails,
    encodingType: 'UTF8'
  };
```

6. Create a structure containing the payload and the necessary header information:
    

```apache
  var nlOptions = {
    method : 'post',
    contentType: 'application/json',
    payload : JSON.stringify(nlData)
  };
```

7. Make the call, saving the response:
    

```apache
  var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
```

8. The response is returned in JSON format; parse it and extract the score field, if it exists. Return either that field or 0.0.
    

```apache
  var data = JSON.parse(response);

  var sentiment = 0.0;
  //  Ensure all pieces were in the returned value
  if (data && data.documentSentiment
          && data.documentSentiment.score){
     sentiment = data.documentSentiment.score;
  }

  return sentiment;
```

The complete code to retrieve the sentiment is below:

```apache
function retrieveSentiment (line) {
  var apiKey = "your key here"; // Replace with your actual API key
  var apiEndpoint = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;

  //  Create a structure with the text, its language, its type,
  //  and its encoding
  var docDetails = {
    language: 'en-us',
    type: 'PLAIN_TEXT',
    content: line
  };

  var nlData = {
    document: docDetails,
    encodingType: 'UTF8'
  };

  //  Package all of the options and the data together for the call
  var nlOptions = {
    method : 'post',
    contentType: 'application/json',
    payload : JSON.stringify(nlData)
  };

  //  And make the call
  var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);

  var data = JSON.parse(response);

  var sentiment = 0.0;
  //  Ensure all pieces were in the returned value
  if (data && data.documentSentiment
          && data.documentSentiment.score){
     sentiment = data.documentSentiment.score;
  }

  return sentiment;
}
```

9. Save your script, reload the document, and try out the full program. You may need to re-authorize with your credentials to enable the new functionality. Select different sections of your document to see how the sentiment may differ over its parts.
    

![Text from Down the Rabbit-Hole](https://cdn.qwiklabs.com/IoyZgJNSn%2BYd1xXs0cZebDMilMdNEcTxSNsP2EiEobM%3D align="left")

10. (Optional) Type and then analyze your own words. For example, type and analyze "I'm mad", and then type and analyze "I'm happy". Experiment to see how the Natural Language API interprets different groups, for example if you analyze "I'm happy. I'm happy. I'm sad.". What happens if you add another "I'm sad."?
    

---

## Solution of Lab

%[https://youtu.be/3Ws4llOptr8] 

### **🚨 Copy and run the below commands in** [**Cloud Shell**](https://console.cloud.google.com/home/dashboard?project=&pli=1&invt=AbuATQ&cloudshell=true)

```apache
gcloud services enable language.googleapis.com && gcloud alpha services api-keys create --display-name="techcps"
```

---

### **🚨 Create a new** [**Google Doc**](https://docs.google.com/document/create)

* **Extensions** &gt; **Apps Script**
    

```apache

/**
* @OnlyCurrentDoc
*
* The above comment directs Apps Script to limit the scope of file
* access for this add-on. It specifies that this add-on will only
* attempt to read or modify the files in which the add-on is used,
* and not all of the user's files. The authorization request message
* presented to users will reflect this limited scope.
*/

/**
* Creates a menu entry in the Google Docs UI when the document is
* opened.
*
*/
function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Natural Language Tools')
    .addItem('Mark Sentiment', 'markSentiment')
    .addToUi();
}
/**
* Gets the user-selected text and highlights it based on sentiment
* with green for positive sentiment, red for negative, and yellow
* for neutral.
*
*/
function markSentiment() {
  var POSITIVE_COLOR = '#00ff00';  //  Colors for sentiments
  var NEGATIVE_COLOR = '#ff0000';
  var NEUTRAL_COLOR = '#ffff00';
  var NEGATIVE_CUTOFF = -0.2;   //  Thresholds for sentiments
  var POSITIVE_CUTOFF = 0.2;

  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var string = getSelectedText();

    var sentiment = retrieveSentiment(string);

    //  Select the appropriate color
    var color = NEUTRAL_COLOR;
    if (sentiment <= NEGATIVE_CUTOFF) {
      color = NEGATIVE_COLOR;
    }
    if (sentiment >= POSITIVE_CUTOFF) {
      color = POSITIVE_COLOR;
    }

    //  Highlight the text
    var elements = selection.getSelectedElements();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().editAsText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive();
        element.setBackgroundColor(startIndex, endIndex, color);

      } else {
        var element = elements[i].getElement().editAsText();
        foundText = elements[i].getElement().editAsText();
        foundText.setBackgroundColor(color);
      }
    }
  }
}
/**
 * Returns a string with the contents of the selected text.
 * If no text is selected, returns an empty string.
 */
function getSelectedText() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  var string = "";
  if (selection) {
    var elements = selection.getSelectedElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().asText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive() + 1;
        var text = element.getText().substring(startIndex, endIndex);
        string = string + text;

      } else {
        var element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip
        // images and other non-text elements.
        if (element.editAsText) {
          string = string + element.asText().getText();
        }
      }
    }
  }
  return string;
}

/** Given a string, will call the Natural Language API and retrieve
  * the sentiment of the string.  The sentiment will be a real
  * number in the range -1 to 1, where -1 is highly negative
  * sentiment and 1 is highly positive.
*/
function retrieveSentiment (line) {
//  TODO:  Call the Natural Language API with the line given
//         and return the sentiment value.
  return 0.0;
}
```

---

### **Congratulations, you're all done with the lab 😄**