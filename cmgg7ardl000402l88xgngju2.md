---
title: "Arcade Chatbot: Interactive Film-bot - arc107-genai"
seoTitle: "Arcade Chatbot: Interactive Film-bot - arc107-genai"
seoDescription: "Learn prompt engineering and explore Generative AI using an AI chatbot focused on Academy Award winners in this interactive lab"
datePublished: Tue Oct 07 2025 06:50:45 GMT+0000 (Coordinated Universal Time)
cuid: cmgg7ardl000402l88xgngju2
slug: arcade-chatbot-interactive-film-bot-arc107-genai
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759819795459/9291f2c7-b2c4-40ea-a01c-e9575418f890.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759819813372/84d4b45a-9eff-4b0b-abd1-933648b68fdf.png
tags: arcade-chatbot-interactive-film-bot-arc107-genai, arcade-chatbot-interactive-film-bot, arc107-genai

---

## Overview

In this lab you will learn the fundamentals of prompt engineering using Generative AI and Google Cloud. During the lab you will have access to a chatbot that will act as a `Academy Award Winners knowledge agent`.

If you are new to Generative AI or looking for an overview of how to get started, you are in the right place. Read on to learn about the specifics of this lab and areas that you will get hands-on practice with.

In this lab learn use a chat application to interact and learn:

* The basics of prompt engineering
    
* Why context in relation to AI is important
    
* How to work with Generative AI
    

### Prerequisites

Over the course of this lab the following elements are required:

* Vertex AI
    
* Generative AI models
    

## Task 1. Access the Chat Application

Open the [`genai-chatbot-179061491669.us-west1.run.app`](http://genai-chatbot-179061491669.us-west1.run.app) to gain access to the lab chat application.

**Note:** The chat bot link works in both a normal browser tab and an incognito window. An initial loading screen will appear while the lab data is being prepared.

From here you will be able to interact with a Generative AI model during the course of this lab.

![Chatbot main screen](https://cdn.qwiklabs.com/T7BDe9tpwytpv8%2BgYjkhfcjoOy9UJ5g%2BNs1EHH00CwM%3D align="left")

**Note:** The above image is the main chat screen. The chat screen includes multiple personas reflecting different knowledge domains. Each persona has specific but limited abilities to demonstrate the functionality of generative ai on a defined topic.

The lab mimics a chat application interface to provide access to a generative ai model. Select a persona from the contacts list to initiate a discussion on a specified topic.

**Note:** The application uses a simplified version of the **Gemini Flash model**. In this demo, each query is distinct and therefore, the user must input the full context per query.

The application allows the user to perform interactions with the generative ai from Google Cloud. From here you will be able to sample the power of generative ai in a scenario reflecting real-world usage.

## Task 2. Using Prompt Engineering

In this lab we will interact with a Generative AI model to discuss `Oscar winners`. Don't worry, if you don't know much about this, use it as a learning exercise.

Generative AI is a type of artificial intelligence that can be used to create new information, such as text, images, or music. This makes it a powerful tool for learning about `Oscar winners`, as it can be used to generate realistic new content.

Generative AI can be used in competitive activities in a number of ways, including:

* **Generating new training routines:** Generative AI can be used to generate new training routines for participants. This could be done by providing the AI with a set of parameters, such as the desired skill to be trained, the level of difficulty, and the number of participants involved. The AI could then generate a routine that meets these requirements.
    
* **Creating new strategic approaches:** Generative AI can be used to create new strategic approaches for teams or individuals. This could be done by providing the AI with a set of parameters, such as the strengths and weaknesses of the team/individual, the strengths and weaknesses of the opponents, and the desired outcome. The AI could then generate a strategy that meets these requirements.
    
* **Improving existing strategic approaches:** Generative AI can be used to improve existing strategic approaches for teams or individuals. This could be done by providing the AI with a set of parameters, such as the desired outcome, the strengths and weaknesses of the team/individual, and the strengths and weaknesses of the opponents. The AI could then generate suggestions for how to improve the strategy.
    
* **Personalizing the training experience:** Generative AI can be used to personalize the training experience for participants. This could be done by providing the AI with a set of parameters, such as the participant's skill level, strengths and weaknesses, and desired areas of improvement. The AI could then generate a personalized training plan for the participant.
    

Here are some examples of how generative AI is being used in competitive environments today:

* Professional organizations are using generative AI to develop new training routines for their participants. The AI is being used to generate routines that are tailored to the individual needs of each participant.
    
* Competitive teams are using generative AI to create new strategic approaches. The AI is being used to generate strategies that are based on the strengths and weaknesses of the team and the opposing teams/individuals.
    
* Organizations are using generative AI to improve their existing strategic approaches. The AI is being used to generate suggestions for how to improve their offense and defense.
    
* Training facilities are using generative AI to personalize the training experience for their participants. The AI is being used to generate personalized training plans for each participant based on their individual needs.
    

Overall, generative AI has the potential to revolutionize competitive activities. By generating new training routines, creating new strategic approaches, improving existing strategic approaches, and personalizing the training experience, generative AI can help participants to train more effectively, compete more intelligently, and achieve better results.

## Task 3. Context is Key

Generative AI Chat Bot needs context to answer questions. In the demo lab bot we have taken away some of its smarts to show the importance of context.

In the application we can put our questions to the AI model. To start, let's establish some basics around the importance of context relating to crafting questions.

1. Click on the `Mathilde` persona
    

**Note:** Clicking on the chatbot persona will open the chat interface. From this interface you can interact with the generative ai model.

2. Start by saying hello to the chat bot, enter the following text
    

```apache
Hello what is your name?
```

Copied!

**Note:** The chatbot will respond to this initial interaction with a helpful message to let you know it's ready to interact with you.

3. Let's start by asking a broad question to the AI
    

```apache
What can you tell me about Oscar winners?
```

Copied!

4. Let's try a more specific question
    

```apache
Who is Mathilde?
```

Copied!

5. Let's try to test the chatbots breadth of knowledge
    

```apache
What can you tell me about Vivien Leigh?
```

Copied!

Amazingly, we have just set the context for our `Oscar winners` journey. The Generative AI model has knowledge on lots of subjects. Here we are interested in finding out more about `Oscar winners`.

## Task 4. Improving `Oscar winners` knowledge

Now that we have learned the basics, let's improve our knowledge of `Oscar winners`.

**Note:** Remember generative ai models are based on data taken from a point in time. The models need to be continually generated when working with time based information.

In the following section, we use Generative AI to create questions. Pay attention, you will be tested on these later in the lab!

1. Can you use the chatbot to answer the following question?
    

```apache
Who won Best Director for The Hurt Locker?
```

Copied!

2. Can you use the chatbot to answer the following question?
    

```apache
Who won Best Actor for Training Day?
```

Copied!

3. Can you use the chatbot to answer the following question?
    

```apache
Who won Best Actress for On Golden Pond?
```

Copied!

4. Can you use the chatbot to answer the following question?
    

```apache
Bong Joon Ho and Jin Won Han won Best Screenplay for which movie?
```

Copied!

**Note:** Want to learn more? Ask the chatbot more questions and see if it can help.

Great, it looks like you really know your stuff. Let's move onto the final assessment.

## Task 5. Taking the Assessment

Finally, answer the assessment question based on `Oscar winners`.

**Note:** The lab assessment is accessed using the bottom navigation bar. Click on the **Assess** option to move to this screen. Answer correctly to pass the assessment. Once done, you can return from the chatbot application to the lab interface.

Click on the assess bottom navigation button to reveal the lab question. Select the correct answer to successfully complete the lab.

![Chatbot assessment.](https://cdn.qwiklabs.com/T9MvUdknHU7NUHw1CbXX3f94oD3XqJVVgWku7ePlRfc%3D align="left")

To successfully complete the lab assessment, each question presented must be answered correctly.

**Note:** The lab assessment is accessed using the bottom navigation bar. Click on the **Assess** option to move to this screen. Answer correctly to pass the assessment. Once done, you can return from the chatbot application to the lab interface.

Click *Check my progress* to verify the objective.

---

## Solution of Lab

%[https://youtu.be/n028ryeAn8U]