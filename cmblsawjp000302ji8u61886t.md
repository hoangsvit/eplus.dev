---
title: "It Speaks! Create Synthetic Speech Using Text-to-Speech - GSP222"
seoTitle: "It Speaks! Create Synthetic Speech Using Text-to-Speech - GSP222"
seoDescription: "The Text-to-Speech API lets you create audio files of machine-generated, or synthetic, human speech. You provide the content as text or Speech Synthesis Mar"
datePublished: Sat Jun 07 2025 05:19:03 GMT+0000 (Coordinated Universal Time)
cuid: cmblsawjp000302ji8u61886t
slug: it-speaks-create-synthetic-speech-using-text-to-speech-gsp222
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749272535385/9e3d75be-6bfb-47b4-a563-aadc4015ebeb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749273533105/281edfe4-9519-4e80-b761-fa1e8fb7066d.png
tags: it-speaks-create-synthetic-speech-using-text-to-speech-gsp222, it-speaks-create-synthetic-speech-using-text-to-speech, gsp222

---

## Overview

The Text-to-Speech API lets you create audio files of machine-generated, or *synthetic*, human speech. You provide the content as text or [Speech Synthesis Markup Language (SSML)](https://www.w3.org/TR/speech-synthesis/), specify a *voice* (a unique 'speaker' of a language with a distinctive tone and accent), and configure the output; the Text-to-Speech API returns to you the content that you sent as spoken word, audio data, delivered by the voice that you specified.

In this lab you will create a series of audio files using the Text-to-Speech API, then listen to them to compare the differences.

### What you'll learn

In this lab you use the Text-to-Speech API to do the following:

* Create a series of audio files
    
* Listen and compare audio files
    
* Configure audio output
    

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
    student-04-9cb5400a7e4b@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    QwWX4pQrWkji
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-7d01004200c3`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-7d01004200c3
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-9cb5400a7e4b@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-7d01004200c3
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region for your project

In Cloud Shell, enter the following command to set the region to run your project in this lab:

```apache
gcloud config set compute/region us-west1
```

## Task 1. Enable the Text-to-Speech API

1. In the Navigation menu (), click **APIs and Services &gt; Enable APIs and Services**.
    
2. On the top of the Dashboard, click **+Enabled APIs and Services**.
    
3. Enter "text-to-speech" in the search box.
    
4. Click **Cloud Text-to-Speech API**.
    
5. Click **Enable** to enable the Cloud Text-to-Speech API.
    

Wait for a few seconds for the API to be enabled for the project. Once enabled, the Cloud Text-to-Speech API page shows details, metrics and more.

Click **Check my progress** to verify the objective.

Enable the Text-to-Speech API

**Check my progress**

## Task 2. Create a virtual environment

Python virtual environments are used to isolate package installation from the system.

1. Install the `virtualenv` environment:
    

```apache
sudo apt-get install -y virtualenv
```

2. Build the virtual environment:
    

```apache
python3 -m venv venv
```

3. Activate the virtual environment:
    

```apache
source venv/bin/activate
```

## Task 3. Create a service account

You should use a service account to authenticate your calls to the Text-to-Speech API.

1. To create a service account, run the following command in Cloud Shell:
    

```apache
gcloud iam service-accounts create tts-qwiklab
```

2. Now generate a key to use that service account:
    

```apache
gcloud iam service-accounts keys create tts-qwiklab.json --iam-account tts-qwiklab@qwiklabs-gcp-01-7d01004200c3.iam.gserviceaccount.com
```

3. Finally, set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the location of your key file:
    

```apache
export GOOGLE_APPLICATION_CREDENTIALS=tts-qwiklab.json
```

Click **Check my progress** to verify the objective.

Create a service account

**Check my progress**

## Task 4. Get a list of available voices

As mentioned previously, the Text-to-Speech API provides many different voices and languages that you can use to create audio files. You can use any of the [available voices](https://cloud.google.com/text-to-speech/docs/voices) as the speaker for your content.

**Note:** The Text-to-Speech API includes several premium voices, known as [WaveNet voices](https://cloud.google.com/text-to-speech/docs/wavenet#wavenet_voices), that generate more natural-sounding synthetic speech. These voices are also a bit more expensive than other available voices. Refer to the [Cloud Text-to-Speech pricing page](https://cloud.google.com/text-to-speech/pricing) for more details.

1. The following `curl` command gets the list of all the voices you can select from when creating synthetic speech using the Text-to-Speech API:
    

```apache
curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
    -H "Content-Type: application/json; charset=utf-8" \
    "https://texttospeech.googleapis.com/v1/voices"
```

The Text-to-Speech API returns a JSON-formatted result that looks similar to the following:

```json
{
  "voices": [
    {
      "languageCodes": [
        "es-ES"
      ],
      "name": "es-ES-Standard-A",
      "ssmlGender": "FEMALE",
      "naturalSampleRateHertz": 24000
    },
    {
      "languageCodes": [
        "ja-JP"
      ],
      "name": "ja-JP-Standard-A",
      "ssmlGender": "FEMALE",
      "naturalSampleRateHertz": 22050
    },
    {
      "languageCodes": [
        "pt-BR"
      ],
      "name": "pt-BR-Standard-A",
      "ssmlGender": "FEMALE",
      "naturalSampleRateHertz": 24000
    },
    ...
  ]
}
```

Looking at the results from the `curl` command, notice that each voice has four fields:

* `name`: The ID of the voice that you provide when you request that voice.
    
* `ssmlGender`: The gender of the voice to speak the text, as defined in the [SSML W3 Recommendation](https://www.w3.org/TR/speech-synthesis11/#edef_voice).
    
* `naturalSampleRateHertz`: The sampling rate of the voice.
    
* `languageCodes`: The list of language codes associated with that voice.
    

Also notice that some languages have several voices to choose from.

2. To scope the results returned from the API to just a single language code, run:
    

```apache
curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
    -H "Content-Type: application/json; charset=utf-8" \
    "https://texttospeech.googleapis.com/v1/voices?language_code=en"
```

## Task 5. Create synthetic speech from text

Now that you've seen how to get the names of voices to speak your text, it's time to create some synthetic speech!

For this, you build your request to the Text-to-Speech API in a text file titled `synthesize-text.json`.

1. Create this file in Cloud Shell by running the following command:
    

```apache
touch synthesize-text.json
```

2. Using a line editor (for example `nano`, `vim`, or `emacs`) or the Cloud Shell code editor, add the following code to `synthesize-text.json`:
    

```apache
{
    'input':{
        'text':'Cloud Text-to-Speech API allows developers to include
           natural-sounding, synthetic human speech as playable audio in
           their applications. The Text-to-Speech API converts text or
           Speech Synthesis Markup Language (SSML) input into audio data
           like MP3 or LINEAR16 (the encoding used in WAV files).'
    },
    'voice':{
        'languageCode':'en-gb',
        'name':'en-GB-Standard-A',
        'ssmlGender':'FEMALE'
    },
    'audioConfig':{
        'audioEncoding':'MP3'
    }
}
```

3. Save the file and exit the line editor.
    

The JSON-formatted request body provides three objects:

* The `input` object provides the text to translate into synthetic speech.
    
* The `voice` object specifies the voice to use for the synthetic speech.
    
* The `audioConfig` object tells the Text-to-Speech API what kind of audio encoding to send back.
    

4. Use the following code to call the Text-to-Speech API using the `curl` command:
    

```apache
curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @synthesize-text.json "https://texttospeech.googleapis.com/v1/text:synthesize" \
  > synthesize-text.txt
```

The output of this call is saved to a file called `synthesize-text.txt`.

5. Open the `synthesize-text.txt` file. Notice that the Text-to-Speech API provides the audio output in base64-encoded text assigned to the `audioContent` field, similar to what's shown below:
    

```apache
{
  "audioContent": "//NExAASGoHwABhGudEACdzqFXfRE4EY3AACkD/zX4ADf/6J/[...]"
}
```

To translate the response into audio, you need to select the audio data it contains and decode it into an audio file - for this lab, MP3. Although there are many ways that you can do this, in this lab you'll use some simple Python code. Don't worry if you're not a Python expert; you need only create the file and invoke it from the command line.

6. Create a file named `tts_decode.py`:
    

```apache
touch tts_decode.py
```

7. Using a line editor (for example `nano`, `vim`, or `emacs`) or the Cloud Shell code editor, add the following code into `tts_decode.py`:
    

```apache
import argparse
from base64 import decodebytes
import json

"""
Usage:
        python tts_decode.py --input "synthesize-text.txt" \
        --output "synthesize-text-audio.mp3"

"""

def decode_tts_output(input_file, output_file):
    """ Decode output from Cloud Text-to-Speech.

    input_file: the response from Cloud Text-to-Speech
    output_file: the name of the audio file to create

    """

    with open(input_file) as input:
        response = json.load(input)
        audio_data = response['audioContent']

        with open(output_file, "wb") as new_file:
            new_file.write(decodebytes(audio_data.encode('utf-8')))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Decode output from Cloud Text-to-Speech",
        formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--input',
                       help='The response from the Text-to-Speech API.',
                       required=True)
    parser.add_argument('--output',
                       help='The name of the audio file to create',
                       required=True)

    args = parser.parse_args()
    decode_tts_output(args.input, args.output)
```

8. Save `tts_decode.py` and exit the line editor.
    
9. Now, to create an audio file from the response you received from the Text-to-Speech API, run the following command from Cloud Shell:
    

```apache
python tts_decode.py --input "synthesize-text.txt" --output "synthesize-text-audio.mp3"
```

This creates a new MP3 file named `synthesize-text-audio.mp3`.

Of course, since the `synthesize-text-audio.mp3` lives in the cloud, you can't just play it directly from Cloud Shell! To listen to the file, you create a Web server hosting a simple web page that embeds the file as playable audio (from an HTML &lt;`audio>` control).

10. Create a new file called `index.html`:
    

```apache
touch index.html
```

11. Using a line editor (for example `nano`, `vim`, or `emacs`) or the Cloud Shell code editor, add the following code into `index.html`:
    

```xml
<html>
  <body>
  <h1>Cloud Text-to-Speech codelab</h1>
  <p>
  Output from synthesizing text:
  </p>
  <audio controls>
  <source src="synthesize-text-audio.mp3" />
  </audio>
  </body>
</html>
</ql-code-block>
```

12. Save the file and exit the line editor.
    
13. Back in Cloud Shell, start a simple Python HTTP server from the command prompt:
    

```apache
python -m http.server 8080
```

14. Finally, click **Web Preview** ().
    
15. Then select **Preview on port 8080** from the displayed menu.
    

In the new browser window, you should see something like the following:

![The Cloud Text-to-Speech Demo audio of the output from synthesizing text](https://cdn.qwiklabs.com/gdrAGkNrpxbuerbp2QpVr5%2FCB9Y%2B1WundH5lROcMGCA%3D align="left")

16. Play the audio embedded on the page. You'll hear the synthetic voice speak the text that you provided to it!
    
17. When you're done listening to the audio files, you can shut down the HTTP server by pressing **CTRL**+**C** in Cloud Shell.
    

## Task 6. Create synthetic speech from SSML

In addition to using text, you can also provide input to the Text-to-Speech API in the form of [Speech Synthesis Markup Language (SSML)](https://cloud.google.com/text-to-speech/docs/ssml). SSML defines an XML format for representing synthetic speech. Using SSML input, you can more precisely control pauses, emphasis, pronunciation, pitch, speed, and other qualities in the synthetic speech output.

1. First, build your request to the Text-to-Speech API in a text file titled `synthesize-ssml.json`. Create this file in Cloud Shell by running the following command:
    

```apache
touch synthesize-ssml.json
```

2. Using a line editor (for example `nano`, `vim`, or `emacs`) or the Cloud Shell code editor, paste the following JSON into `synthesize-ssml.json`:
    

```plaintext
{
    'input':{
        'ssml':'<speak><s>
           <emphasis level="moderate">Cloud Text-to-Speech API</emphasis>
           allows developers to include natural-sounding
           <break strength="x-weak"/>
           synthetic human speech as playable audio in their
           applications.</s>
           <s>The Text-to-Speech API converts text or
           <prosody rate="slow">Speech Synthesis Markup Language</prosody>
           <say-as interpret-as=\"characters\">SSML</say-as>
           input into audio data
           like <say-as interpret-as=\"characters\">MP3</say-as> or
           <sub alias="linear sixteen">LINEAR16</sub>
           <break strength="weak"/>
           (the encoding used in
           <sub alias="wave">WAV</sub> files).</s></speak>'
    },
    'voice':{
        'languageCode':'en-gb',
        'name':'en-GB-Standard-A',
        'ssmlGender':'FEMALE'
    },
    'audioConfig':{
        'audioEncoding':'MP3'
    }
}
```

Notice that the `input` object of the JSON payload to send includes some different stuff this time around. Rather than a `text` field, the `input` object has a `ssml` field instead. The `ssml` field contains XML-formatted content with the `<speak>` element as its root. Each of the elements present in this XML representation of the input affects the output of the synthetic speech.

Specifically, the elements in this sample have the following effects:

* `<s>` contains a sentence.
    
* `<emphasis>` adds stress on the enclosed word or phrase.
    
* `<break>` inserts a pause in the speech.
    
* `<prosody>` customizes the pitch, speaking rate, or volume of the enclosed text, as specified by the `rate`, `pitch`, or `volume` attributes.
    
* `<say-as>` provides more guidance about how to interpret and then say the enclosed text, for example, whether to speak a sequence of numbers as ordinal or cardinal.
    
* `<sub>` specifies a substitution value to speak for the enclosed text.
    

**Note:** You can see the full list of SSML elements supported by Cloud Text-to-Speech by reviewing the [SSML reference](https://cloud.google.com/text-to-speech/docs/ssml).

3. In Cloud Shell use the following code to call the Text-to-Speech API, which saves the output to a file called `synthesize-ssml.txt`:
    

```apache
curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @synthesize-ssml.json "https://texttospeech.googleapis.com/v1/text:synthesize" \
  > synthesize-ssml.txt
```

Again, you need to decode the output from the Text-to-Speech API before you can hear the audio.

4. Run the following command to generate an audio file named `synthesize-ssml-audio.mp3` using the `tts_decode.py` utility that you created previously:
    

```apache
python tts_decode.py --input "synthesize-ssml.txt" --output "synthesize-ssml-audio.mp3"
```

5. Next, open the `index.html` file that you created earlier. Replace the contents of the file with the following HTML:
    

```xml
<html>
  <body>
  <h1>Cloud Text-to-Speech Demo</h1>
  <p>
  Output from synthesizing text:
  </p>
  <audio controls>
    <source src="synthesize-text-audio.mp3" />
  </audio>
  <p>
  Output from synthesizing SSML:
  </p>
  <audio controls>
    <source src="synthesize-ssml-audio.mp3" />
  </audio>
  </body>
</html>
```

6. Then, start a simple Python HTTP server from the Cloud Shell command prompt:
    

```apache
python -m http.server 8080
```

7. As before, click **Web Preview**
    
    ![Web Preview icon](https://cdn.qwiklabs.com/7b9oXblGsiFuNK7hmDZjFB%2B7Lrwdv5T64bbmo8X9FAo%3D align="left")
    
    and then select the port number from the displayed menu. In the new browser window, you should see something like the following:
    

![The Cloud Text-to-Speech Demo audio files of the output from synthesizing text and output from synthesizing SSML](https://cdn.qwiklabs.com/lqa0Z0ndU31x8dFLEm2ersx8Vr19w2AhBvgTGQxG3cE%3D align="left")

8. Play the two embedded audio files. Notice the differences in the SSML output: although both audio files say the same words, the SSML output speaks them a bit differently, adding pauses and different pronunciations for abbreviations.
    

## Task 7. Configure audio output and device profiles

Going beyond SSML, you can provide even more customization to your synthetic speech output created by the Text-to-Speech API. You can specify other audio encodings, change the pitch of the audio output, and even request that the output be optimized for a specific type of hardware.

Build your request to the Text-to-Speech API in a text file titled `synthesize-with-settings.json`:

1. Create this file in Cloud Shell by running the following command:
    

```apache
touch synthesize-with-settings.json
```

2. Using a line editor (for example `nano`, `vim`, or `emacs`) or the Cloud Shell code editor, paste the following JSON into `synthesize-with-settings.json`:
    

```apache
{
    'input':{
        'text':'The Text-to-Speech API is ideal for any application
          that plays audio of human speech to users. It allows you
          to convert arbitrary strings, words, and sentences into
          the sound of a person speaking the same things.'
    },
    'voice':{
        'languageCode':'en-us',
        'name':'en-GB-Standard-A',
        'ssmlGender':'FEMALE'
    },
    'audioConfig':{
      'speakingRate': 1.15,
      'pitch': -2,
      'audioEncoding':'OGG_OPUS',
      'effectsProfileId': ['headphone-class-device']
    }
}
```

3. Save the file and exit the line editor.
    

Looking at this JSON payload, you notice that the `audioConfig` object contains some additional fields now:

* The `speakingRate` field specifies a speed at which the speaker says the voice. A value of 1.0 is the normal speed for the voice, 0.5 is half that fast, and 2.0 is twice as fast.
    
* The `pitch` field specifies a difference in tone to speak the words. The value here specifies a number of semitones lower (negative) or higher (positive) to speak the words.
    
* The `audioEncoding` field specifies the audio encoding to use for the data. The accepted values for this field are `LINEAR16`, `MP3`, and `OGG_OPUS`.
    
* The `effectsProfileId` field requests that the Text-to-Speech API optimizes the audio output for a specific playback device. The API applies an [predefined audio profile](https://cloud.google.com/text-to-speech/docs/audio-profiles) to the output that enhances the audio quality on the specified class of devices.
    

**Note:** The Audio Profiles feature is in Beta release status. Review the [guide](https://cloud.google.com/text-to-speech/docs/audio-profiles) for details about how to use it in your application. All other settings described here are generally available for normal use in your application.

4. Use the following code to call the Text-to-Speech API using the `curl` command:
    

```apache
curl -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @synthesize-with-settings.json "https://texttospeech.googleapis.com/v1beta1/text:synthesize" \
  > synthesize-with-settings.txt
```

The output of this call is saved to a file called `synthesize-with-settings.txt`.

5. Run the following command to generate an audio file named `synthesize-with-settings-audio.mp3` from the output received from the Text-to-Speech API:
    

```apache
python tts_decode.py --input "synthesize-with-settings.txt" --output "synthesize-with-settings-audio.ogg"
```

6. Next open the `index.html` file that you created earlier and replace the contents of the file with the following HTML:
    

```apache
<html>
  <body>
  <h1>Cloud Text-to-Speech Demo</h1>
  <p>
  Output from synthesizing text:
  </p>
  <audio controls>
    <source src="synthesize-text-audio.mp3" />
  </audio>
  <p>
  Output from synthesizing SSML:
  </p>
  <audio controls>
    <source src="synthesize-ssml-audio.mp3" />
  </audio>
  </body>
  <p>
  Output with audio settings:
  </p>
  <audio controls>
    <source src="synthesize-with-settings-audio.ogg" />
  </audio>
</html>
```

7. Now, restart the Python HTTP server from the Cloud Shell command prompt:
    

```apache
python -m http.server 8080
```

8. As before, click **Web Preview**
    
    ![Web Preview icon](https://cdn.qwiklabs.com/7b9oXblGsiFuNK7hmDZjFB%2B7Lrwdv5T64bbmo8X9FAo%3D align="left")
    
    then select the port number from the displayed menu.
    

In the new browser window, you should see something like the following:

![The Cloud Text-to-Speech Demo audio files of the output from synthesizing text, output from synthesizing SSML, and output with audio settings](https://cdn.qwiklabs.com/p4y0fBiRh%2FcrLgumYzZz2zAa%2Fp2WgSlhJfPtPUEUgvY%3D align="left")

9. Play the third embedded audio file. Notice that the voice on the audio speaks a bit faster and lower than the previous examples.
    

---

## Solution of Lab

%[https://youtu.be/Pj5ye1DYwZ4] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP222/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/It%20Speaks%20Create%20Synthetic%20Speech%20Using%20Text%20to%20Speech/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```