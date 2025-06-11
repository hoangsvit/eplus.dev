---
title: "Entity and Sentiment Analysis with the Natural Language API - GSP038"
seoTitle: "Entity and Sentiment Analysis with the Natural Language API - GSP038"
seoDescription: "The Cloud Natural Language API lets you extract entities from text, perform sentiment and syntactic analysis, and classify text into categories."
datePublished: Wed Jun 11 2025 04:09:28 GMT+0000 (Coordinated Universal Time)
cuid: cmbrfktus000502l1945zcxz7
slug: entity-and-sentiment-analysis-with-the-natural-language-api-gsp038
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749614926592/ca5147e3-8c8b-44f1-8671-4cad9691bd9f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749614942734/e32f1f93-c203-4efc-aa11-d411dac40898.png
tags: entity-and-sentiment-analysis-with-the-natural-language-api-gsp038, entity-and-sentiment-analysis-with-the-natural-language-api, gsp038

---

## Overview

The Cloud Natural Language API lets you extract entities from text, perform sentiment and syntactic analysis, and classify text into categories.

In this lab, you learn how to use the Natural Language API to analyze entities, sentiment, and syntax.

## Objectives

In this lab, you will learn how to:

* Create a Natural Language API request and calling the API with curl
    
* Extract entities and running sentiment analysis on text with the Natural Language API
    
* Perform linguistic analysis on text with the Natural Language API
    
* Create a Natural Language API request in a different language
    

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
    student-03-8cf9a9ab8f11@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    fyMJXeQD3omC
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

## Task 1. Create an API key

Since you use `curl` to send a request to the Natural Language API, you must generate an API key to pass in your request URL.

1. To create an API key, in the Cloud Console, select **Navigation menu** &gt; **APIs & Services** &gt; **Credentials**.
    
2. Click **Create credentials** and select **API key**.
    
3. Copy the generated API key and click **Close**.
    

Click **Check my progress** to verify the objective.

Create an API Key

**Check my progress**

In order to perform next steps please connect to the instance provisioned for you via **SSH**.

1. Click **Navigation menu &gt; Compute Engine**. You should see the provisioned linux instance, `linux-instance`, in the **VM instances** list.
    
2. Click on the **SSH** button. You will be brought to an interactive shell.
    
3. In the command line, enter in the following, replacing `<YOUR_API_KEY>` with the key you just copied:
    

```apache
export API_KEY=<YOUR_API_KEY>
```

## Task 2. Make an entity analysis request

The first Natural Language API method you use is `analyzeEntities`. With this method, the API can extract entities (like people, places, and events) from text. To try it out the API's entity analysis, use the following sentence:

*Joanne Rowling, who writes under the pen names J. K. Rowling and Robert Galbraith, is a British novelist and screenwriter who wrote the Harry Potter fantasy series.*

You build your request to the Natural Language API in the file, `request.json`.

1. Use nano (a code editor) to create the file `request.json`:
    

```apache
nano request.json
```

2. Type or paste the following code into `request.json`:
    

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"Joanne Rowling, who writes under the pen names J. K. Rowling and Robert Galbraith, is a British novelist and screenwriter who wrote the Harry Potter fantasy series."
  },
  "encodingType":"UTF8"
}
```

3. Press **CTRL+X** to exit nano, then **Y** to save the file, then **ENTER** to confirm.
    

In the request, you're telling the Natural Language API about the text being sent. Supported type values are `PLAIN_TEXT` or `HTML`. In content, you pass the text to send to the Natural Language API for analysis.

The Natural Language API also supports sending files stored in Cloud Storage for text processing. If you wanted to send a file from Cloud Storage, you would replace `content` with `gcsContentUri` and give it a value of the text file's uri in Cloud Storage.

`encodingType` tells the API which type of text encoding to use when processing our text. The API will use this to calculate where specific entities appear in our text.

Click **Check my progress** to verify the objective.

Make an Entity Analysis Request

**Check my progress**

## Task 3. Call the Natural Language API

1. You can now pass your request body, along with the API key environment variable you saved earlier, to the Natural Language API with the following `curl` command (all in one single command line):
    

```apache
curl "https://language.googleapis.com/v1/documents:analyzeEntities?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json > result.json
```

2. In order to check the response run:
    

```apache
cat result.json
```

The beginning of your response should look like this:

```json
            "content": "Joanne Rowling",
            "beginOffset": 0
          },
          "type": "PROPER"
        },
        {
          "text": {
            "content": "Rowling",
            "beginOffset": 53
          },
          "type": "PROPER"
        },
        {
          "text": {
            "content": "novelist",
            "beginOffset": 96
          },
          "type": "COMMON"
        },
        {
          "text": {
            "content": "Robert Galbraith",
            "beginOffset": 65
          },
          "type": "PROPER"
        }
      ]
    },

    ...
  ]
}
```

For each entity in the response, you get the entity `type`, the associated Wikipedia URL if there is one, the `salience`, and the indices of where this entity appeared in the text. Salience is a number in the \[0,1\] range that refers to the centrality of the entity to the text as a whole.

The Natural Language API can also recognize the same entity mentioned in different ways. Take a look at the `mentions` list in the response: ​the API is able to tell that "Joanne Rowling", "Rowling", "novelist" and "Robert Galbriath" all point to the same thing.​

Click **Check my progress** to verify the objective.

Check the Entity Analysis response

**Check my progress**

## Task 4. Sentiment analysis with the Natural Language API

In addition to extracting entities, the Natural Language API also lets you perform sentiment analysis on a block of text. This JSON request will include the same parameters as the request above, but this time change the text to include something with a stronger sentiment.

1. Use nano to replace the code in `request.json` with the following, and feel free to replace the `content` below with your own text:
    

```json
 {
  "document":{
    "type":"PLAIN_TEXT",
    "content":"Harry Potter is the best book. I think everyone should read it."
  },
  "encodingType": "UTF8"
}
```

2. Press **CTRL+X** to exit nano, then **Y** to save the file, then **ENTER** to confirm.
    
3. Next you send the request to the API's `analyzeSentiment` endpoint:
    

```apache
curl "https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json
```

Your response should look like this:

```json
{
  "documentSentiment": {
    "magnitude": 1.9,
    "score": 0.9
  },
  "language": "en",
  "sentences": [
    {
      "text": {
        "content": "Harry Potter is the best book.",
        "beginOffset": 0
      },
      "sentiment": {
        "magnitude": 0.9,
        "score": 0.9
      }
    },
    {
      "text": {
        "content": "I think everyone should read it.",
        "beginOffset": 31
      },
      "sentiment": {
        "magnitude": 0.9,
        "score": 0.9
      }
    }
  ]
}
```

**Note:** Don't be alarmed if your scores differ slightly than the example output.

Notice that you get two types of sentiment values: sentiment for the document as a whole, and sentiment broken down by sentence. The sentiment method returns two values:

* `score` - is a number from -1.0 to 1.0 indicating how positive or negative the statement is.
    
* `magnitude` - is a number ranging from 0 to infinity that represents the weight of sentiment expressed in the statement, regardless of being positive or negative.
    

Longer blocks of text with heavily weighted statements have higher magnitude values. The score for the first sentence is positive (0.7), whereas the score for the second sentence is neutral (0.1).

## Task 5. Analyzing entity sentiment

In addition to providing sentiment details on the entire text document, the Natural Language API can also break down sentiment by the entities in the text. Use this sentence as an example:

*I liked the sushi but the service was terrible*.

In this case, getting a sentiment score for the entire sentence as you did above might not be so useful. If this was a restaurant review and there were hundreds of reviews for the same restaurant, you'd want to know exactly which things people liked and didn't like in their reviews. Fortunately, the Natural Language API has a method that lets you get the sentiment for each entity in the text, called `analyzeEntitySentiment`. Let's see how it works!

1. Use nano to update `request.json` with the sentence below:
    

```json
 {
  "document":{
    "type":"PLAIN_TEXT",
    "content":"I liked the sushi but the service was terrible."
  },
  "encodingType": "UTF8"
}
```

2. Press **CTRL+X** to exit nano, then **Y** to save the file, then **ENTER** to confirm.
    
3. Then call the `analyzeEntitySentiment` endpoint with the following curl command:
    

```apache
curl "https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json
```

In the response you get back two entity objects: one for "sushi" and one for "service". Here's the full JSON response:

```json
{
  "entities": [
    {
      "name": "sushi",
      "type": "CONSUMER_GOOD",
      "metadata": {},
      "salience": 0.51064336,
      "mentions": [
        {
          "text": {
            "content": "sushi",
            "beginOffset": 12
          },
          "type": "COMMON",
          "sentiment": {
            "magnitude": 0,
            "score": 0
          }
        }
      ],
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "service",
      "type": "OTHER",
      "metadata": {},
      "salience": 0.48935664,
      "mentions": [
        {
          "text": {
            "content": "service",
            "beginOffset": 26
          },
          "type": "COMMON",
          "sentiment": {
            "magnitude": 0.7,
            "score": -0.7
          }
        }
      ],
      "sentiment": {
        "magnitude": 0.7,
        "score": -0.7
      }
    }
  ],
  "language": "en"
}
```

You can see that the score returned for "sushi" was a neutral score of 0, whereas "service" got a score of -0.7. Cool! You also may notice that there are two sentiment objects returned for each entity. If either of these terms were mentioned more than once, the API would return a different sentiment score and magnitude for each mention, along with an aggregate sentiment for the entity.

**Note:** Don't be alarmed if your scores differ slightly than the example output.

## Task 6. Analyzing syntax and parts of speech

Use **syntactic analysis**, another of the Natural Language API's methods, to dive deeper into the linguistic details of the text. `analyzeSyntax` extracts linguistic information, breaking up the given text into a series of sentences and tokens (generally, word boundaries), to provide further analysis on those tokens. For each word in the text, the API tells you the word's part of speech (noun, verb, adjective, etc.) and how it relates to other words in the sentence (Is it the root verb? A modifier?).

Try it out with a simple sentence. This JSON request will be similar to the ones above, with the addition of a features key. This tells the API to perform syntax annotation.

1. Use nano to replace the code in `request.json` with the following:
    

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content": "Joanne Rowling is a British novelist, screenwriter and film producer."
  },
  "encodingType": "UTF8"
}
```

2. Press **CTRL+X** to exit nano, then **Y** to save the file, then **ENTER** to confirm.
    
3. Then call the API's `analyzeSyntax` method:
    

```apache
curl "https://language.googleapis.com/v1/documents:analyzeSyntax?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json
```

The response should return an object like the one below for each token in the sentence:

```json
{
      "text": {
        "content": "is",
        "beginOffset": 15
      },
      "partOfSpeech": {
        "tag": "VERB",
        "aspect": "ASPECT_UNKNOWN",
        "case": "CASE_UNKNOWN",
        "form": "FORM_UNKNOWN",
        "gender": "GENDER_UNKNOWN",
        "mood": "INDICATIVE",
        "number": "SINGULAR",
        "person": "THIRD",
        "proper": "PROPER_UNKNOWN",
        "reciprocity": "RECIPROCITY_UNKNOWN",
        "tense": "PRESENT",
        "voice": "VOICE_UNKNOWN"
      },
      "dependencyEdge": {
        "headTokenIndex": 2,
        "label": "ROOT"
      },
      "lemma": "be"
    },
```

Let's break down the response:

* `partOfSpeech` tells you that "Joanne" is a noun.
    
* `dependencyEdge` includes data that you can use to create a [dependency parse tree](https://en.wikipedia.org/wiki/Parse_tree#Dependency-based_parse_trees) of the text. Essentially, this is a diagram showing how words in a sentence relate to each other. A dependency parse tree for the sentence above would look like this:
    

![Dependency parse tree](https://cdn.qwiklabs.com/Xh7b1inigZEjOOGzkM2OtVQFK9PLn0SdY3wM9tdZLUU%3D align="left")

**Note:** You can create your own dependency parse trees in the browser with the Natural Language demo available in the [Natural Language AI Guide](https://cloud.google.com/natural-language/)

* `headTokenIndex` is the index of the token that has an arc pointing at "Joanne". Think of each token in the sentence as a word in an array.
    
* `headTokenIndex` of 1 for "Joanne" refers to the word "Rowling", which it is connected to in the tree. The label `NN` (short for noun compound modifier) describes the word's role in the sentence. "Joanne" modifies "Rowling", the subject of the sentence.
    
* `lemma` is the canonical form of the word. For example, the words *run*, *runs*, *ran*, and *running* all have a lemma of *run*. The lemma value is useful for tracking occurrences of a word in a large piece of text over time.
    

## Task 7. Multilingual natural language processing

The Natural Language API also supports languages other than English (full list can be found in the [Language Support Guide](https://cloud.google.com/natural-language/docs/languages)).

1. Modify the code in `request.json` with a sentence in Japanese:
    

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"日本のグーグルのオフィスは、東京の六本木ヒルズにあります"
  }
}
```

2. Press **CTRL+X** to exit nano, then **Y** to save the file, then **ENTER** to confirm.
    

Notice that you didn't tell the API which language the text is, it can automatically detect it!

3. Next, you send it to the `analyzeEntities` endpoint:
    

```apache
curl "https://language.googleapis.com/v1/documents:analyzeEntities?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json
```

And you get the following response:

```json
{
  "entities": [
    {
      "name": "日本",
      "type": "LOCATION",
      "metadata": {
        "mid": "/m/03_3d",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Japan"
      },
      "salience": 0.23854347,
      "mentions": [
        {
          "text": {
            "content": "日本",
            "beginOffset": 0
          },
          "type": "PROPER"
        }
      ]
    },
    {
      "name": "グーグル",
      "type": "ORGANIZATION",
      "metadata": {
        "mid": "/m/045c7b",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Google"
      },
      "salience": 0.21155767,
      "mentions": [
        {
          "text": {
            "content": "グーグル",
            "beginOffset": 9
          },
          "type": "PROPER"
        }
      ]
    },
    ...
  ]
  "language": "ja"
}
```

The wikipedia URLs even point to the Japanese Wikipedia pages - so cool!

---

## Solution of Lab

%[https://youtu.be/t4zprxScLbE]