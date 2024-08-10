---
title: "Dialogflow CX: Enable IVR Features for your Voice Agent - GSP967"
seoTitle: "Dialogflow CX: Enable IVR Features for your Voice Agent - GSP967"
seoDescription: "Dialogflow CX provides a simple, visual bot building approach to virtual agent design. For a full voice experience, your Dialogflow CX Agent can be integrat"
datePublished: Sat Aug 10 2024 03:03:26 GMT+0000 (Coordinated Universal Time)
cuid: clznjx3e6000109kza6lv7io9
slug: dialogflow-cx-enable-ivr-features-for-your-voice-agent-gsp-967
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723260544980/d76ffad9-1594-41e6-b60a-624ff22f9a65.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723261330072/96f35592-e601-46c5-8827-f842fd4aa53c.png
tags: dialogflow-cx-enable-ivr-features-for-your-voice-agent-gsp967, gsp967

---

## **Overview**

Dialogflow CX provides a simple, visual bot building approach to virtual agent design. For a full voice experience, your Dialogflow CX Agent can be integrated with various conversational platforms, including telephony providers. In this lab, you'll explore these Interactive Voice Response (IVR) features as well as two additional features - *conversation repair* and *Speech Synthesis Markup Language (SSML)* - that help end users feel as though they're having a natural, interactive, and cooperative conversation.

This lab will show you how to enable various IVR features, but you will only be able to test some of them with the Dialogflow CX Phone Gateway. Features like DTMF (Dual-Tone Multi-Frequency) and Barge-in (where the user can interrupt the bot) are not supported in Dialogflow Telephony and can only be tested with your telephony provider.

In this lab you will continue building a conversational agent, exploring and adding the IVR features that Dialogflow CX provides.

Voice and telephony features such as DTMF, Barge-in, and End of speech sensitivity (so the bot can accommodate for pauses in a phrase, such as a number or ID) can all be configured in Dialogflow CX.

*Conversation repair* is the practice of fixing misunderstandings, mishearings, and misarticulations to resume a conversation. Repairing a conversation can help build a user's trust by showing that the voice agent is listening to their request. Situations where conversations might fail are handled in a more graceful manner, such as when a voice agent cannot find an intent using the NoMatch event, or when the agent detects no verbal response using the NoInput event feature. You'll configure these events to rephrase a prompt up to a maximum of 3 times and then escalate to a live agent to avoid trapping users in a loop of handling errors.

*SSML - Speech Synthesis Markup Language* helps make the Text-to-Speech voice interaction sound more natural.

To do this work efficiently you'll restore a provided agent. This agent will have 2 new pages and an additional intent that will jumpstart your exploration of the new conversational features.

In this lab you will do the following

* Enable and configure IVR features
    
* Add in NoMatch and NoInput handling scenarios to escalate to an Agent
    
* Add in rich voice responses with SSML
    

---

### **Task 1. Create your Dialogflow CX agent**

1. Navigate to the [Dialogflow CX console](https://dialogflow.cloud.google.com/cx/projects), then select your Cloud Project name. Your Cloud Project name should match your Project ID for your lab like: ***qwiklabs-gcp-xx-xxxxxxxxxxx***.
    
2. Select **Create agent**. If you do not see this page, refresh your browser.
    
3. When prompted, Get started with Dialogflow CX, click **Build your own**.
    
4. Call your agent "Flight Booker". Create your agent in the Global region. Google Dialogflow CX Phone Gateway currently only supports agents created in the Global region.
    
5. After creating the agent, navigate to **Agent Settings &gt; General &gt; Logging settings** and check the boxes next to **Enable Cloud Logging** option. It will generate logs for this agent.
    
6. Click **Save**.
    

Click *Check my progress* to verify the objective.

Create the agent

**Check my progress**

### **Task 2. Restore the base Flight booker agent**

1. Download the sample virtual agent, [gsp967-start-agent](https://storage.googleapis.com/spls/DialogflowCX_agents/exported_agent_skillbadge_lab3_start-baseimport.blob), to your local hard drive.
    
2. Select **View all agents** in the **Agent** dropdown menu at the top of the Dialogflow CX UI.
    
3. Click the context menu (three vertical dots) to the right of your virtual agent.
    
4. Select **Restore** from the expanded menu options.
    

![Expanded menu](https://cdn.qwiklabs.com/AwyhojSAv7lNBU9k4Lf%2B7Jl7QPz445VpvZPkwP009gc%3D align="left")

5. Select the **Upload** radio button.
    
6. Click on **select file** and select the file we downloaded earlier then, click **Restore**.
    

Your agent should now look like this:

![Agent flow diagram](https://cdn.qwiklabs.com/GZJYLsffV2YQH3y2tm0C6pdYUs42rmyHqPTmMfZOb1I%3D align="left")

Click *Check my progress* to verify the objective.

Restore the agent

**Check my progress**

### **Task 3. Review the base Agent**

The base Agent you restored has a few items to jumpstart your IVR exploration. Take a quick review of what the agent can do before enabling IVR and other features.

**Look up Flight intent**

An intent called `main.look_up_flight` will be used to check for an existing reservation.

* To view this Intent, select the **Manage** tab, then the Intents list on the left menu. This Intent has a few training phrases to indicate that the user wants to look up existing Flight information.
    

![Intent page](https://cdn.qwiklabs.com/LuXJbI2oF1BoZlYqa4SFYl4kgM9Cc9g0eX90BBGeAFE%3D align="left")

This Intent will direct to the **Find paid ticket** page.

**Find paid ticket page**

1. Navigate to the **Build** tab. The Visual Builder shows the **Start page** connected to the **Find paid ticket** page.
    
2. Select the **Start page** to see that a new Route has been added using the `main.look_up_flight` Intent.
    

![Start page](https://cdn.qwiklabs.com/Enx7pYMaDxCh57nKaEBHbUMn6NRVRIFmVYHnMmMQzBo%3D align="left")

3. Select the Route **main.look\_up\_flight** to see that this Intent routes to Find paid ticket page in the Transition section.
    

![Route page](https://cdn.qwiklabs.com/uxMzjFbIDR%2FLTMczVPi6GzuZg5z2P%2B5OuQrao7aNWYM%3D align="left")

4. Explore the configuration of the **Find paid ticket** page - it will look up a confirmation number by collecting a required confirmation number and then provide a mock response of the flight details.
    

To do this, a parameter has been added, as well as a route, to validate that all the parameters have been captured.

**Confirmation Number Parameter**

1. Select the **Find paid ticket** page and notice that the base agent already has a parameter named **confirmation\_number**.
    

![Find paid ticket page](https://cdn.qwiklabs.com/4nI5nmgWQhnIpVBal3sA5UEbB7B0kPqN7dRhskZ7z%2B0%3D align="left")

2. Select the **confirmation\_number** parameter to see that its configuration has the following:
    
    * **Display name:** confirmation\_number
        
    * **Entity type:** @sys.number
        
    * The **Required** checkbox checked
        
    * In the Fulfillment section, the Agent asks `What is your flight confirmation number?`
        

![Parameter page](https://cdn.qwiklabs.com/KwfWdbZeuUVRxi2ooFC5jteT3XpJfSI56aWM9%2Fn6T8o%3D align="left")

3. Now look how the parameter is handled once it's been gathered - the response with a mock reservation number.
    

**Route on collected parameter**

1. From the **Find paid ticket** page, select the new route named `$page.params.status = "FINAL"`
    

![Find paid ticket page](https://cdn.qwiklabs.com/bom1a67uW7SwsSnvZ0ADnKeBK1NfR%2FMXoD9N4wX9334%3D align="left")

2. In the Condition section:
    

* Match **At Least One** rule option is selected.
    

![Condition section](https://cdn.qwiklabs.com/Pq3q9sX%2FIgm3qq0uU4GpB34XuUlgxJ3e1xtrQXt5RXE%3D align="left")

For this lab, in the Fulfillment section of this Route, the Agent says will only have two responses to be returned.

First, a response that thanks the user for the confirmation number. Second, a mock response of the result of a flight information lookup.

In a production scenario where there is an existing datasource of flights, you'd configure a Webhook in Dialogflow CX to connect to that backend system which stores flight information to retrieve the appropriate data. Creating a webhook and configuring it for this Page is outside the scope of this lab.

![Agent responses text](https://cdn.qwiklabs.com/13NBpFQ9yWJu3sm7h%2B1gYGyZcrbBVCRLw%2FaPbn%2B3b9s%3D align="left")

Now, test this agent to see what the user should expect so far.

3. Open the Simulator by selecting the **Test Agent** button at the upper right of the Dialgoflow console.
    
4. Enter a phrase like `I'd like to look up my flight` and then a number, such as `12345`.
    

You should receive two sentences, a thank you and the mock flight lookup.

![Simulator](https://cdn.qwiklabs.com/mNw%2BO%2BbrQPIx7pDr2HFbZf9vHgx72njxIH9qSmtzQgU%3D align="left")

**Note:** If you typed "lookup", you will not see the correct flow! To properly train your agent, you'll need to anticipate how users will interact with it. Bookmark [this link to Training phrases](https://cloud.google.com/dialogflow/cx/docs/concept/intent?hl=en#tp) to learn more.

Great! Now you're all set to configure IVR and other features!

### **Task 4. Enable IVR features**

The Speech and IVR Settings in Dialogflow can be enabled at three different levels: Agent level, Flow level and Page level.

To enable the settings at different levels, the Agent level settings have to be enabled first. You'll do this in the next section.

The Agent level settings have three features to point out for Speech and IVR:

* **End of speech sensitivity**: helps determine how sensitive the speech endpointing should be when the caller finishes speaking, and it uses Google Cloud Speech.
    
* **Barge-in**: allows a speaker to interrupt the agent. This is helpful so that the caller doesn't have to wait to hear the full response from the agent in order to speak. Another way to understand this is, if Barge-in is disabled, the agent will only begin to listen to the user once the agent itself has finished playing its response.
    
* **Google Cloud Storage URI**: enables you to reference a path to access pre-recorded audio for playback.
    

After enabling IVR settings at the Agent level, you can customize IVR settings on a per Flow level and at the Page level. Enabling settings at the Flow level overrides the default Agent level IVR settings. This is important if you want to have different settings per Flow in a multi-flow Agent.

How you use Flow and Page level IVR settings depends on your use case. For example, if the user is dictating a number, the user will benefit from extending the timeout period so they're not cut off by the Agent at the Page level where this input occurs. If the user stays silent, because they may be searching for their flight number, this will allow the agent to help the user further by prompting on where to get that account number.

Agent level Speech and IVR settings are from Agent Settings.

![Agent Settings, Speech and IVR tabbed page](https://cdn.qwiklabs.com/Cf%2BL3HIGyTuV5JvTGp0xRYZub1ECWqpEsQU%2Bdk2LVZo%3D align="left")

Flow level IVR settings are available from the Flows list and the three dots that show a context menu.

![Flow settings page](https://cdn.qwiklabs.com/MtAjV8sMqxz2M6auPM%2BDAXL7k78qVcactFEuAbetl9w%3D align="left")

Page level IVR settings are available from the Pages list on the left of the console, also via the Page name's context menu.

![Page settings page](https://cdn.qwiklabs.com/NHrXqGZM7vKvhH9CWXkOtgB0PzJDW%2F%2BOenSfzuAzg%2Bk%3D align="left")

Start with enabling the Agent level Speech and IVR settings first in the Agent Settings.

**Enable Agent Settings**

1. Click on **Agent Settings** in the upper right.
    
2. Click the **Speech and IVR** tab.
    
3. Check the box to enable each of the following:
    
    * Enable auto speech adaptation
        
    * Enable advanced speech settings
        
    * Enable barge-in
        

![Agent Settings, Speech and IVR tabbed page](https://cdn.qwiklabs.com/sMdXy8o7MN1uPfjZp1xp%2BVYKxrcLSGmJde1C4PEXiqU%3D align="left")

4. Click **Save**.
    

**Enable DTMF**

**Dual-Tone Multi-Frequency (DTMF)** allows users to use the keypad on their phone to provide a response instead of using their voice. There are two types of DTMF implementations: **Single-digit DTMF** and **Multi-digit DTMF**. The Single-digit DTMF collects only one digit from a user response, while Multi-digit collects multiple digits in a response. In this lab, you will learn how to implement a multi-digit DTMF for collecting flight confirmation numbers.

1. Go to **Find paid ticket** Page and click on the Parameter **confirmation\_number**.
    
    ![Find paid ticket page](https://cdn.qwiklabs.com/eHvIdP%2BgX1NEvraEw%2BZaJHj%2BP5cJMzZiqIK0KouRq6o%3D align="left")
    
2. Scroll down to the **DTMF settings** and check the box to **Enable DTMF**. For now, assume the confirmation number is usually a 5 digit number such as "12345".
    
    Set the Max digits to **5**. You will not set a finish digit for this lab, but you should consider setting a finish digit for a production virtual agent as a sign that the user has finished entering digits - silence does not always mean that the user has finished typing. Also, a webhook is usually implemented to validate the numbers to make sure the user input matches the expected value in the customer database.
    
    ![Advanced speech settings page](https://cdn.qwiklabs.com/SvBhJnFLRshjP5O0%2B9gCbs5BQsIuabUIeYynYhFQwHY%3D align="left")
    
3. Click **Save**.
    
4. **Close** the Find paid ticket page.
    

> You will not be able to test this feature in the simulator.

What is DTMF?DTMF is used to help users escalate to a live agent fasterDTMF is used to collect feedback from callersDTMF can be used for situations where users are allowed to provide a response to a given agent question by entering a number in the keypadDTMF is used to generate dual-tone multi-frequency responses

**Enable/disable Barge-in**

Barge-in allows users to interrupt an agent in the middle of a response. This helps the user to move along the flow faster, if they are not interested in the content that the agent is providing.

Barge-in can be enabled through the **Advanced Settings** on the agent level settings, flow level settings and page level settings. Since you already enabled Barge-in at the agent level, you do not need to enable barge-in everywhere else in the agent. You can **disable** barge-in on the pages where you do not want users to skip for certain important information. For this lab, you'll disable the barge-in on the Confirm trip page.

1. Click on the **Confirm trip** page, then click on the entry fulfillment.
    

![Confirm trip page](https://cdn.qwiklabs.com/xvtq9QfUQh35RABK%2Fp6VAlHJ9%2BEOwKMxCcs01L99v%2Bk%3D align="left")

2. On the Fulfillment page, scroll down to **Advanced settings** and find Barge-in. Since this fulfillment provides the key information for the passenger who books the flight ticket, you do not want users to exit the flow in the middle of this response. Deselect the **Enable barge-in** option here by clicking **Customize**, which overrides the flow level barge-in setting.
    
    ![Fulfillment page and Advanced speech settings highlighted](https://cdn.qwiklabs.com/QPwX%2ByLyHZXihf%2BWKPrco6LWtvWnJwhDC8UF91ILWYw%3D align="left")
    
3. Click **Save**.
    
4. **Close** the Confirm trip page.
    

**Knowledge Check**

What can you do to allow callers to interrupt a voice agent and ask questions?Add more pagesAdd NoInput event handlerMake parameters requiredAllow barge-inAdjust end of speech sensitivity

**Submit**

### **Task 5. Handling error scenarios**

To improve the user experience for callers with a voice agent, it's important to have a graceful way to handle conditions where the agent may have misunderstood, misheard, or is unable to collect the expected information - this is called *conversation repair*. Repairing a conversation can help build trust with the user by showing that the voice agent is listening to the request and attempting to understand.

Common conversation failures include inability to detect a verbal response from the user and the inability to match the intent of the user. In these cases, you'll implement the built-in events NoInput and NoMatch, respectively, to handle these, as well as make sure you're not stuck in an error loop by escalating to an Agent Handoff page after 3 errors.

Dialogflow CX has built-in events for NoInput and NoMatch that are available at the flow, page, and parameter levels. Additionally, there are up to 6 numerically ordered events, such as `sys.no-match-1`, `sys.no-match-2`, etc., where you will be able to decide on the number of attempts that users can make for each type of event and create customized agent responses.

* **Flow-level** event handlers apply to a whole Flow and are useful in the case where there are broad event requirements that need to be fulfilled when using a Flow, such as transitioning from one Flow to another.
    
* **Page-level** event handlers apply when there are unexpected end-user inputs or other errors in transitioning between Pages.
    
* **Parameter-level** event handlers are useful within a Page when capturing a single or a series of parameters that are needed.
    

This lab will focus on Parameter-level events around capturing the ticket confirmation number.

**Handling silence/noise with NoInput**

Sometimes, especially in a voice scenario, the end user might not say a confirmation number quickly enough, or there is a long silence. Also, background noise or static that is not recognized as any text is considered as no-input instead of no-match.

When the Agent registers this as a NoInput event, the built-in feature of Dialogflow can gracefully handle this and keep the user engaged and move along the flow.

State Handler events, such as NoInput and NoMatch can be added at a variety of levels, at the Flow, on the Page itself, and also on specific Parameters.

For this exercise, you'll add the No-Input and No-Match events to the ticket confirmation number parameter.

1. Open the Find paid ticket page and open the Parameter **confirmation\_number**.
    
2. Scroll to the **Reprompt Event handlers** section of the Parameter and click the **Add event handler** link.
    
3. In the Event dropdown menu, select **No-input 1**.
    
4. In the Fulfillment section, in the Agent response, add the text `Sorry, I didn't get that. Please enter or say your ticket confirmation number.`
    
    ![Event handler page with Event handler and Fulfillment options highlighted ](https://cdn.qwiklabs.com/V3bEAi8kLC2lU7cUB5oiQwCXe91VxGTOyyBPHStLw2E%3D align="left")
    
5. Click **Save** to save this Event.
    
6. Repeat above steps with the following to set up two more events.
    
    | **Event** | **Fulfillment** | **Transition** |
    | --- | --- | --- |
    | No-input 2 | In order to look up your flight information, we would need your ticket confirmation number. Please say or enter the confirmation number. |  |
    | No-input 3 | You have not provided a confirmation number yet. Let me transfer you to a live agent to further assist you. | Agent handoff |
    
7. On the third, No-input 3, scroll down to the Transition section and configure the Transition to a new Page called **Agent handoff**.
    
    ![Transition section](https://cdn.qwiklabs.com/MkL3jYrkx04OUPat5Dwpro8ciopynzucBblrsJNunUg%3D align="left")
    
8. Click **Save**. Close the Event handler and Find paid ticket pages.
    
    Your agent should now look like this
    
    ![Agent flow diagram](https://cdn.qwiklabs.com/DkBwFpbwxa%2B%2FGuzfx8tAya%2BbJDQp00WyF7cdDFTxnAk%3D align="left")
    
9. Test this by opening up the simulator via the **Test Agent** button, located at the upper right of the Dialogflow CX console.
    

![Test Agent button](https://cdn.qwiklabs.com/5RBxUkHokal6hJYh6GYrEaGxCB7N0IBHqQnrAG%2B412c%3D align="left")

10. Type in a request for flight information, such as "I'd like to look up my flight information". When the agent asks for a confirmation number, instead of entering anything, press **Enter** a few times to simulate no input by the user.
    
    You'll see that the Agent has transitioned to the **Agent handoff** page after three no inputs:
    
    ![Simulator](https://cdn.qwiklabs.com/LybH7wRgs5C8fWjVl8cQE4fRn0UII9MktcMvL9ACsLQ%3D align="left")
    

**Knowledge Check**

How do you keep users engaged when they remain silent for too long? Select all that apply.Enable NoMatch events and create engaging promptsEnable barge-inRoute them to an operatorEnable NoInput events and create engaging promptsTrain intents more to improve NLU accuracyEnable IVR-control custom payload and configure no speech timeout

**Submit**

Select if the following statement is true or false:

Since the No-Input Default is on the Start page of a flow, it can be triggered anywhere in the flowTrueFalse

**Handling unrecognized input with No-Match**

Add NoMatch events in the case that there's input received, but the agent is unable to match the `confirmation_number` parameter.

1. From the Find paid ticket's Page, in the Parameter **confirmation\_number**'s panel, add 3 new events, with the third No-match 3 transitioning to the **Agent handoff** page.
    
    | **Event** | **Fulfillment** | **Transition** |
    | --- | --- | --- |
    | No-match 1 | Sorry, I didn't get that. Can you rephrase that? |  |
    | No-match 2 | I'm still having trouble. Can you try again? |  |
    | No-match 3 | Let me transfer you to someone else who can help. | Agent handoff |
    
    Your screen should look like this:
    
    ![Event handlers section displaying list of events](https://cdn.qwiklabs.com/8FcPq2bQc0s8zAvHkQsAPGtimLNpqSN%2BrWLk9RSa0og%3D align="left")
    
2. Test this by opening the simulator (**Test Agent** button) and asking the Agent to look up flight information. Since you defined the flight number as a `@sys.number`, the Agent will be expecting all numbers. If you respond to the Agent with letters, that'll be registered as a NoMatch. After three attempts, you'll see the NoMatch handler transition to the Agent handoff page.
    
    ![Simulator page with Agent handoff page highlighted](https://cdn.qwiklabs.com/HAQT7GqwaaXYXiOjKDzUG1aXNdcGm0IsnHozMFDZB8I%3D align="left")
    

**Knowledge Check**

Select if the following statement is true or false:

Agent says prompts for sys.no-match-default and sys.no-input-default cannot be customized.TrueFalse

**A note on Agent Handoff**

For this example we've added a page called **Agent handoff** which is used as the destination for the expected transfer to a live agent in the case this virtual agent is unable to detect a response or determine the correct confirmation number.

For this lab, while there is no target destination for a live agent, you can see where this would be configured. Dialgoflow CX provides a Fulfillment type that can be used to signal to the telephony or chat client to perform the required transfer.

1. To see where this is located, open the **Agent handoff** page and select the **Entry** fulfillment.
    
2. Select **Live agent handoff** from the **Add dialogue option** dropdown.
    
    ![Add dialogue option dropdown menu](https://cdn.qwiklabs.com/IpB96UR0M6rNuZeXtJf1REMEmC1tq2XuXzRgT1vdm58%3D align="left")
    

This will result in an area to provide a custom JSON message.

![Live agent handoff text field](https://cdn.qwiklabs.com/8p7xOCZuTNwya%2BjpfiQNzDkej58ItR6wqv9zi%2FUelrM%3D align="left")

Every target live agent system is different. Refer to the system's documentation as to what message format will be necessary to add to provide the proper communication parameters.

As an example, if you're using [Business Messages](https://developers.google.com/business-communications/business-messages), the format that you'd enter here would look something like this:

```json
{
   "userStatus": {

    "requestedLiveAgent": true

}
}
```

Please check the Business Messages documentation for the precise JSON message.

For more information on Business Messages live agent handoff formats, see [Handoff from bot to live agent](https://developers.google.com/business-communications/business-messages/guides/how-to/message/conversations/bot-live-agent-handoff?hl=en).

### **Task 6. Add SSML support to your agent**

Speech Synthesis Markup Language (SSML) enables you to customize your audio responses by providing details on pauses, audio formatting for numbers, dates, or text. This allows for your agent to have a more natural conversation.

`<speak>`is the root element of SSML response. Without this element, your text cannot talk. Implement them on the **Find paid ticket** page.

1. From the **Find paid ticket** page, click on the **$page.params.status="FINAL"** route and scroll down to the fulfillment.
    
2. Add the `<speak>` element to the entire text of the second fulfillment. Remember to close the text with `</speak>`.
    
    ![Second fulfillment field](https://cdn.qwiklabs.com/E0STSK0plwPMK05W%2F1SqVA%2FxaylnFUT59uvMqc6S35g%3D align="left")
    
    Now, increase the pause after "Here is the flight information". You can use the empty element `<break time>` to control the pausing between words or sentences. The length of the break time can be either seconds or milliseconds.
    
3. Add a pause after "Here is the flight information" with the following:
    

```xml
<break time = "1s"/>
```

This is what it will look like after you add the break time.

![Second fulfillment field](https://cdn.qwiklabs.com/tfyPr905iT1Y0a4hIXCP4z8iPzaj5PDQbAAlexF8jMA%3D align="left")

4. You can also adjust the speed of the response by using the `<prosody>` element.
    
5. Add the following before "Here is the flight information" so that this response will be rendered at a slower speech rate to allow users to take notes of their flight details:
    

```apache
<prosody rate="slow">
```

When you finish adding the above mentioned SSML, this is what your fulfillment will look like.

![Second fulfillment field](https://cdn.qwiklabs.com/OWcFvU9B3X419Ua73SN6amFr2mVUi4i19t9MwyRgW5Y%3D align="left")

In the next section you'll have an opportunity to test some of the settings you've created for your Agent. If you're running out of time, go as far as you can. The next section will not be part of your lab's score.

### **Task 7. Optional: Testing the agent with Dialogflow CX phone gateway**

Dialogflow CX can be integrated with various conversation and telephony providers either directly through the 1-click Integrations in the Dialogflow Console or via the Dialogflow CX API.

Dialogflow CX includes a preview feature called the Dialogflow CX Phone Gateway that provides a telephone interface to your agent. For this lab, you'll use the Dialogflow CX Phone Gateway.

Please note that this feature has limited functionality. Current limitations are as follows:

* Agents must be in the global region
    
* Only US phone numbers are supported
    
* Features NOT supported relevant to this lab are: DTMF
    

### **Task 8. Set up a phone gateway**

1. From the **Manage** tab in the Dialogflow CX console, select **Integrations**.
    
2. In the big **CX Phone Gateway** screen, click the **Manage** button.
    

![CX Phone Gateway screen](https://cdn.qwiklabs.com/K53RPqyHydk%2BcDYFHd6q0Kj%2BodhMVyEQVaBVgE14siI%3D align="left")

3. Click **Create new**.
    

![Create new button](https://cdn.qwiklabs.com/ZT2sWV1mZxiYU7OqgDFWjL%2BxhgkWyJ2qYHPPpGpwVXw%3D align="left")

4. In Country Code, choose **United States**.
    
5. Enter an **Area code** of your choice, or leave it blank.
    
6. Then click **Request**.
    

![Request button](https://cdn.qwiklabs.com/TQrH5ZLD0W%2BLAS2RzdA6wIFoloHlAZT0ZduR%2BhSowfI%3D align="left")

7. Select a phone number option, then add a display name.
    
8. Press **Save**.
    

You've reserved a number!

![Phone numbers page with the new number listed](https://cdn.qwiklabs.com/WdmEz0jTI627MimJMsc3Uq7FUp6GL5Dk6OQew1WMdTs%3D align="left")

Click *Check my progress* to verify the objective.

Set up a phone number for agent

**Check my progress**

**Test your agent**

* On your personal phone, call in to the phone number you created and follow the voice prompts. Try out the no-match, no-input, and barge-in features you enabled during this lab. (DTMF is not currently supported by the CX Gateway.)
    

If the agent reaches the end session state, the call ends.

### **Task 9. (Optional) Exporting your agent**

When you build an agent for one project, you can export it to use in a different project. You can export your agent to continue building upon it in your own personal project!

1. In the **Agent** drop down at the top of the Dialogflow CX console, click **View all agents**.
    

![Agent drop down menu](https://cdn.qwiklabs.com/Hlt5hyDBmrAFkIOJDuNPs9sjF7O81CnAmCFzv7MP2wk%3D align="left")

2. On the **Agent list** screen, click the context menu next to your agent and then click **Export**.
    

![Context menu](https://cdn.qwiklabs.com/CHi8XdAigfNGdUu7dLc4i2XGKvBpm6GnuGtlSeeJ3r8%3D align="left")

3. On the Export Agent screen, choose **Download** to local file, then click **Export**.
    

![Export Agent screen](https://cdn.qwiklabs.com/q8jJMY2f8ffmMBlME1x8Qx3LEIwurQo%2B%2BuGePediwts%3D align="left")

---

### Solution of Lab

%[https://www.youtube.com/watch?v=fgp8l0QSH-Y] 

Download file: [exported\_agent\_skillbadge\_lab3\_start-baseimport.blob](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP967/exported_agent_skillbadge_lab3_start-baseimport.blob)