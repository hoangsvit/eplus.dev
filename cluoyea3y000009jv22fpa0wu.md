---
title: "Analyze Sentiment with Natural Language API: Challenge Lab - ARC130"
seoTitle: "Analyze Sentiment with Natural Language API: Challenge Lab - ARC130"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Apr 07 2024 03:17:57 GMT+0000 (Coordinated Universal Time)
cuid: cluoyea3y000009jv22fpa0wu
slug: analyze-sentiment-with-natural-language-api-challenge-lab-arc130
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1712459493423/6f44ac23-d7ec-4f94-899a-7b279d7d1813.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1712459499415/b385939c-9cfa-4c99-b28e-b3689c377c42.png

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

---

Link: [https://www.cloudskillsboost.google/course\_templates/667/labs/461611](https://www.cloudskillsboost.google/course_templates/667/labs/461611)

---

### **Task 1. Create an API key**

* *Navigation Menu* &gt; *APIs and Services* &gt; *Credentials* &gt; Click `+Create Credentials` &gt; Choose `API KEY`.
    

```apache
export API_KEY=
```

### Task 2. Set up Google Docs and call the Natural Language API

* Open this link in Incoginato Mode [Click Here](https://docs.google.com/document/create)
    
* Login using your Lab Credentials.
    
* Click `Externsion` &gt; then `Apps Script`.
    
* Paste the below code in the `code.js file`.
    

```javascript
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
  var apiKey = "your key here";
  var apiEndpoint =
'Enter the URL of Natural Language API to Analyze Entity Sentiment'
+ apiKey;
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

* In place of "*<mark>YOUR_API_KEY_HERE</mark>*", replace it with your created `API_KEY` which you make it in **task 1**.
    

### **Task 3. Analyze syntax and parts of speech with the Natural Language API**

```powershell
cat > analyze-request.json <<EOF
{
  "document":{
    "type":"PLAIN_TEXT",
    "content": "Google, headquartered in Mountain View, unveiled the new Android phone at the Consumer Electronic Show.  Sundar Pichai said in his keynote that users love their new Android phones."
  },
  "encodingType": "UTF8"
}
EOF

curl -s -H "Content-Type: application/json" \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://language.googleapis.com/v1/documents:analyzeSyntax" \
-d @analyze-request.json > analyze-response.txt

cat analyze-response.txt
```

### Task 4. Perform multilingual natural language processing

```powershell
cat > multi-nl-request.json <<EOF
{
  "document": {
    "type": "PLAIN_TEXT",
    "content": "Le bureau japonais de Google est situé à Roppongi Hills, Tokyo.",
    "language": "fr"
  }
}
EOF

curl -s -H "Content-Type: application/json" \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://language.googleapis.com/v1/documents:analyzeEntities" \
-d @multi-nl-request.json > multi-response.txt

cat multi-response.txt
```

Congratulations🎉!, You're all done with this Challenge lab.