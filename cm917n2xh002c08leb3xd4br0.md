---
title: "Cloud Speech API 3 Ways: Challenge Lab - ARC132"
seoTitle: "Cloud Speech API 3 Ways: Challenge Lab - ARC132"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Apr 03 2025 10:25:51 GMT+0000 (Coordinated Universal Time)
cuid: cm917n2xh002c08leb3xd4br0
slug: cloud-speech-api-3-ways-challenge-lab-arc132
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743675059843/ef3b77a9-f7b5-44a3-aa0a-99832b8ad170.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743675937137/db54cdd9-0fa4-4cd2-995e-023137cac852.png
tags: cloud-speech-api-3-ways-challenge-lab-arc132, cloud-speech-api-3-ways-challenge-lab, arc132

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are starting your career as a junior cloud architect. In this role, you have been assigned to work on a team project that requires you to use the Cloud Speech API services in Google Cloud.

You are expected to have the skills and knowledge to complete the tasks that follow.

### Your challenge

For this challenge, you are required to transcribe speech to text in different languages using the Cloud Speech API.

You need to:

* Create synthetic speech from text using the Text-to-Speech API.
    
* Create an API key.
    
* Perform speech to text transcription with the Cloud Speech API.
    
* Translate text with the Cloud Translation API.
    
* Detect a language with the Cloud Translation API.
    

For this challenge lab, a virtual machine (VM) instance named `lab-vm` has been configured for you to complete tasks 2 through 5.

Each task is described in detail below, good luck!

## Task 1. Create an API key

1. For this task, you need to create an API key to use in this and other tasks when sending a request to the Speech-to-Text API.
    

**Click here for hint!**

2. Save the API key to use in other tasks.
    

Click **Check my progress** to verify the objective.

Create an API key

**Check my progress**

## Task 2. Create synthetic speech from text using the Text-to-Speech API

1. For this task, connect to the VM instance `lab-vm` provisioned for you via **SSH**.
    
2. Activate the virtual environment using the `source venv/bin/activate` command.
    
3. Using a text editor (such as `nano` or `vim`), create a file named `synthesize-text.json` and paste the following into the file:
    

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

4. Call the Text-to-Speech API to synthesize the text of the `synthesize-text.json` file, and store the result in a file named `synthesize-text.txt`.
    
5. Using a text editor (such as `nano` or `vim`), create a file named `tts_decode.py` and paste the following code into that file:
    

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

6. Now, to create an audio file using the response you received from the Text-to-Speech API, run the following command from Cloud Shell:
    

```apache
python tts_decode.py --input "synthesize-text.txt" --output "synthesize-text-audio.mp3"
```

This creates a new MP3 file named `synthesize-text-audio.mp3`.

7. Finally, download the audio file via the `DOWNLOAD FILE` option of the VM instance's SSH session in order to listen to it.
    

Click **Check my progress** to verify the objective.

Create synthetic speech from text using the Text-to-Speech API

**Check my progress**

## Task 3. Perform speech to text transcription with the Cloud Speech API

**Note:** This lab uses a pre-recorded file that's available on Cloud Storage: `gs://cloud-samples-data/speech/corbeau_renard.flac`. You can [listen to this file](https://storage.cloud.google.com/cloud-samples-data/speech/corbeau_renard.flac).

**Click here for hint!**

1. For this task, connect to the VM instance `lab-vm` provisioned for you via **SSH**.
    
2. Using a text editor (such as `nano` or `vim`), create a file named `speech_request.json` as your API request to transcribe the audio file available at the `gs://cloud-samples-data/speech/corbeau_renard.flac` location to French.
    
3. Call `speech_request.json` and store the result in a file named `speech_response_fr.json`.
    

Click **Check my progress** to verify the objective.

Create the API request for transcription in French language

**Check my progress**

## Task 4. Translate text with the Cloud Translation API

1. For this task, connect to the VM instance `lab-vm` provisioned for you via **SSH**.
    
2. Translate the `これは日本語です。` sentence to the `English` language by calling the Cloud Translation API and store the result in the `translation_response.txt` file.
    

Click **Check my progress** to verify the objective.

Translate text with the Cloud Translation API

**Check my progress**

## Task 5. Detect a language with the Cloud Translation API

1. For this task, connect to the VM instance `lab-vm` provisioned for you via **SSH**.
    
2. Detect the language of the `Este%é%japonês.` sentence by calling the Cloud Translation API and store the result in the `detected_response.txt` file.
    

Click **Check my progress** to verify the objective.

Detect a language with the Cloud Translation API

---

## Solution of Lab

%[https://youtu.be/eQIWNzs-0NA] 

```apache
# Get the zone of your lab VM
export ZONE=$(gcloud compute instances list lab-vm --format 'csv[no-heading](zone)')

# SSH into the lab VM
gcloud compute ssh lab-vm --project=$DEVSHELL_PROJECT_ID --zone=$ZONE --quiet
```

* Go to `Credentials` from [he](https://console.cloud.google.com/apis/credentials)[re](https://console.cloud.google.com/apis/credentials)
    
    ```apache
    export API_KEY=
    export task_2_file_name=""
    export task_3_request_file=""
    export task_3_response_file=""
    export task_4_sentence=""
    export task_4_file=""
    export task_5_sentence=""
    export task_5_file=""
    ```
    

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC132/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743675293637/79e11431-88c0-4152-a1e3-f0a62228faa1.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743675393405/f1ac1fb5-e453-482c-9320-afe050799917.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743675613047/ddda9835-5946-41a4-9d6f-fd1584f8064d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743675753135/fac49eb8-8c15-4013-a55c-72ef626874bb.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743675850146/07c853e0-cafd-4697-8e49-36ccca6798c2.png align="center")