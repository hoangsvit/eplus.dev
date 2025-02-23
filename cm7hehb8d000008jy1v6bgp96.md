---
title: "Build Apps with Gemini Code Assist (Solution)"
seoTitle: "Build Apps with Gemini Code Assist (Solution)"
seoDescription: "In this lab, you'll use Gemini Code Assist, an AI-powered app development collaborator for Google Cloud, to explain, test, document, and improve an app."
datePublished: Sun Feb 23 2025 09:02:13 GMT+0000 (Coordinated Universal Time)
cuid: cm7hehb8d000008jy1v6bgp96
slug: build-apps-with-gemini-code-assist-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740301027430/971f91ce-9ae5-4d86-8b54-21ffd5c83a02.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740301301474/313a6167-435f-448d-a8f8-e58d36ba80c5.png
tags: build-apps-with-gemini-code-assist-solution, build-apps-with-gemini-code-assist

---

## **Overview**

In this lab, you'll use [Gemini Code Assist](https://cloud.google.com/products/gemini/code-assist), an AI-powered app development collaborator for Google Cloud, to explain, test, document, and improve an app.

You'll use [Cloud Workstations](https://cloud.google.com/workstations/docs/overview) to create a development environment that uses [Code OSS](https://github.com/microsoft/vscode) as the integrated development environment (IDE).

This lab is intended for developers of any experience level who build apps. You do not need to be familiar with cloud app development.

**Note:** As an early-stage technology, Gemini can generate output that seems plausible but is factually incorrect. We recommend that you validate all output from Gemini before you use it. For more information, see [Gemini for Google Cloud and responsible AI](https://cloud.google.com/gemini/docs/discover/responsible-ai).

## **Objectives**

In this lab, you'll learn how to perform the following tasks:

* Create a cloud-based app development environment using Cloud Workstations.
    
* Use Gemini Code Assist to explain code.
    
* Generate unit tests with Gemini Code Assist.
    
* Prompt Gemini to improve how an app looks.
    
* Use Gemini Code Assist to make code more readable.
    
* Use Gemini Code Assist to add comments to code, in English or another language.
    

## **Setup**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

### Activate Cloud Shell

Cloud Shell is a virtual machine that contains development tools. It offers a persistent 5-GB home directory and runs on Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources. `gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab completion.

1. Click the **Activate Cloud Shell** button () at the top right of the console.
    
2. Click **Continue**.  
    It takes a few moments to provision and connect to the environment. When you are connected, you are also authenticated, and the project is set to your *PROJECT\_ID*.
    

#### **Sample commands**

* List the active account name:
    

```apache
gcloud auth list
```

(Output)

```apache
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
```

(Example output)

```apache
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

* List the project ID:
    

```apache
gcloud config list project
```

(Output)

```apache
[core]
project = <project_ID>
```

(Example output)

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** Full documentation of **gcloud** is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Configure your environment and account**

In this task, you enable the Cloud AI Companion API for Gemini and grant necessary roles to a user account.

### Configure APIs and roles

1. Sign in to the Google Cloud console with your lab credentials, and open the **Cloud Shell** terminal window.
    
2. To set your project ID, user, and region environment variables, in Cloud Shell, run the following commands:
    
    ```apache
    export PROJECT_ID=$(gcloud config list project --format="value(core.project)")
    export USER=$(gcloud config list account --format "value(core.account)")
    export REGION=set at lab start
    echo "PROJECT_ID=${PROJECT_ID}"
    echo "USER=${USER}"
    echo "REGION=${REGION}"
    ```
    
3. To enable the Cloud AI Companion API for Gemini and grant necessary roles to your user account, run the following commands:
    
    ```apache
    gcloud services enable cloudaicompanion.googleapis.com --project ${PROJECT_ID}
    gcloud projects add-iam-policy-binding ${PROJECT_ID} --member user:${USER} --role=roles/cloudaicompanion.user
    gcloud projects add-iam-policy-binding ${PROJECT_ID} --member user:${USER} --role=roles/serviceusage.serviceUsageViewer
    ```
    

To verify the objective, click **Check my progress**.

Enable relevant APIs, and set IAM roles.

Check my progress

## **Task 2. Create a Cloud Workstation**

This lab uses Gemini assistance to develop an app with the Cloud Code plugin for Cloud Workstations IDE. Cloud Workstations is a fully managed integrated development environment that includes native integration with Gemini.

In this task, you configure and provision your Cloud Workstation environment and enable the Cloud Code plugin for Gemini.

### View the workstation cluster

A workstation cluster named `my-cluster` has been pre-created for this lab. This cluster is used to configure and create a workstation.

1. To open the Workstations page, type `/` to start a search, then type `Workstations`, and then click **Cloud Workstations**.
    
2. If **Cloud Workstations** is not pinned (
    
    ![pin button for pinned product](https://cdn.qwiklabs.com/iGasWjSV7tFbdQKn9Wb5OvDCxyWuDCMNANiBAuYKOhQ%3D align="left")
    
    ), in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Pin** (
    
    ![pin button for unpinned product](https://cdn.qwiklabs.com/f4u4qQNN%2BOx29FYF9AsUvgTkZ5bzdkKxmr7iW0fnjf0%3D align="left")
    
    ).
    
3. In the **Navigation pane**, click **Cluster management**.
    
4. Check the **Status** of the cluster. If the status of the cluster is `Reconciling` or `Updating`, periodically refresh and wait until it becomes `Ready` before moving to the next step.
    

### Create a configuration and workstation

1. To create the workstation configuration and workstation, in Cloud Shell, run the following commands:
    
    ```apache
    export CLUSTER_NAME=my-cluster
    export CONFIG_NAME=my-config
    export WS_NAME=my-workstation
    export REGION=set at lab start
    gcloud workstations configs create ${CONFIG_NAME} --cluster=${CLUSTER_NAME} --region=${REGION} --machine-type="e2-standard-4" --pd-disk-size=200 --pd-disk-type="pd-standard" --pool-size=1
    gcloud workstations create ${WS_NAME} --cluster=${CLUSTER_NAME} --config=${CONFIG_NAME} --region=${REGION}
    ```
    
    Wait for the commands to finish.
    
2. In the **Navigation pane**, click **Workstations**.
    
    Once the workstation is created, it is listed under **My workstations** with a status of `Stopped`.
    
3. To start the workstation, click **Start**.
    
    As the workstation starts up, the status changes to `Starting`. Wait for the status to change to `Running` indicating that it is ready to be used.
    

### Launch the IDE

To function properly, some extensions need third-party cookies to be enabled in your browser.

1. To enable third-party cookies in Chrome, in the **Chrome** menu, click **Settings**.
    
2. In the search bar, type **Third-party cookies**.
    
3. Click the **Third-party cookies** setting, and select **Allow third-party cookies**.
    
    **Note:** If you want to restore your browser to its current settings after the lab, note the original setting for third-party cookies.
    
4. To launch the Code OSS IDE on the workstation, from the **Workstations** page in the Google Cloud console, click **Launch**.
    
    The IDE opens in another browser tab.
    
    ![OSS IDE with highlighted activity and status bars](https://cdn.qwiklabs.com/M0bN8rT29%2BQPOc3aUSoxgBktWS3n5pwxuZyfS0XRE3c%3D align="left")
    

To verify the objective, click **Check my progress**.

Create and start a Cloud Workstation.

Check my progress

## **Task 3. Update the Cloud Code extension to enable Gemini**

In this task, you enable Gemini in Cloud Code for your Workstation IDE.

### Connect to Google Cloud

To connect to Google Cloud in your workstation, perform these steps:

1. On the status bar at the bottom of the window, click **Cloud Code - Sign In**.
    
    A link is displayed in the terminal.
    
2. To launch the Cloud Code sign-in flow, hold **Control** (for Windows and Linux) or **Command** (for MacOS) and then click the link in the terminal.
    
3. If you are asked to confirm the opening of the external website, click **Open**.
    
4. Click the student email address, and then click **Sign in**.
    
    Your verification code is displayed in the browser tab.
    
    **Note:** You may see a warning that you ran a gcloud auth login command. This process is normal. The IDE ran this command for you.
    
5. Click **Copy**.
    
6. Back in the IDE, in the terminal, where it says **Enter authorization code**, paste the code.
    
7. If asked to approve copying from the clipboard, click **Allow**.
    
8. Click **Enter**, and then wait for the status bar to show **Cloud Code - No Project**.
    
    You're now connected to Google Cloud.
    

### Enable Gemini in Cloud Code

To enable Gemini in Cloud Code for your workstation IDE, perform these steps:

1. In your workstation IDE, click the menu (), and then navigate to **File &gt; Preferences &gt; Settings**.
    
2. In **Search settings**, enter `Gemini`.
    
3. On the **User** tab of the Settings dialog, select **Extensions &gt; Gemini Code Assist**.
    
4. On the Qwiklabs lab credentials panel, to copy the Project ID, click **Copy**.
    
    ![Copy button for Project ID is highlighted](https://cdn.qwiklabs.com/HQNEsxIwv%2B1NfXUePwPSg2QifSApfXMoa4Nz6yE2xNI%3D align="left")
    
5. On the Cloud Code settings page, for **Cloudcode &gt; Duet AI: Project**, paste the Google Cloud project ID.
    
    **Note:** Duet AI was the previous name for Gemini.
    
6. Confirm that **Cloudcode &gt; Duet AI: Enable** is enabled.
    
7. In the IDE status bar, click **Cloud Code - No Project**.
    
8. Click **Select a Google Cloud Project**, and then click your project ID.
    
    The project ID is now shown in the status bar. Gemini is now ready to use.
    

## **Task 4. Download, examine, and run a Python Flask app**

Code for a Python Flask app has been saved for you in a Cloud Storage bucket.

In this task, you download, examine, and run a Python Flask app in the IDE. Gemini Code Assist explains the code.

### Log in to the terminal

1. From the IDE menu (), select **Terminal &gt; New Terminal**.
    
2. In the terminal, run the following command:
    
    ```apache
    gcloud auth login
    ```
    
    A link is displayed in the terminal.
    
3. To launch the sign-in flow for the terminal, press **Control** (for Windows and Linux) or **Command** (for MacOS) and click the link in the terminal.
    
4. If you are asked to confirm the opening of the external website, click **Open**.
    
5. Click the student email address, and then click **Continue**.
    
6. Click **Allow**.
    
7. Click **Copy**.
    
8. Back in the IDE, in the terminal, where it says **Enter authorization code**, paste the code, and then click **Enter**.
    
    Your terminal session is now logged in to Google Cloud.
    

### Install python virtual environment

1. To install Python locally in a virtual environment, run the following commands:
    
    ```apache
    sudo apt update
    sudo apt -y upgrade
    sudo apt install -y python3-venv
    python3 -m venv ~/env
    source ~/env/bin/activate
    ```
    
2. To check the python location that will be used, run the following commands:
    
    ```apache
    which python3
    ```
    

### Copy the code

1. To copy the app code, in the terminal, run the following command:
    
    ```apache
    export PROJECT_ID=Project ID
    export BUCKET_NAME=$PROJECT_ID-code
    gcloud storage cp -r gs://$BUCKET_NAME/* .
    ```
    
    The code has been copied into a subdirectory named `codeassist-demo`.
    
2. In the IDE activity bar, click **Explorer** (), and then click **Open Folder**.
    
3. In the **Open Folder** dialog, click **codeassist-demo**, and then click **OK**.
    
    The directory structure is displayed.
    

### Examine the code

1. Select **main.py**.
    
    The Python file opens in an editor window.
    
2. In the IDE activity bar, click **Gemini Code Assist** ().
    
    [Gemini Code Assist](https://cloud.google.com/workstations/docs/write-code-gemini) is an AI-powered collaborator to help with app development tasks.
    
3. In the Gemini Code Assist chat pane, type the following prompt, and then click **Send** ():
    
    ```apache
    Explain this
    ```
    
    Prompts are questions or statements describing the help you need. Prompts can include context from existing code that Google Cloud analyzes to provide more useful or complete responses. For more information on writing prompts to generate good responses, see [Write better prompts for Gemini for Google Cloud](https://cloud.google.com/gemini/docs/discover/write-prompts).
    
    Gemini will explain the code in `main.py`. The response might explain these sections:
    
    * Dependencies
        
    * Application setup
        
    * Routes
        
    * Application execution
        
    
    When you select code, the same prompt will cause Gemini Code Assist to explain only the selected code.
    
    **Note:** Chat history state is kept in memory only, and doesn't persist when you switch to another workspace or when you close your IDE. Gemini doesn't use your prompts or its responses as data to train its model. For more information, see [How Gemini for Google Cloud uses your data](https://cloud.google.com/gemini/docs/discover/data-governance).
    
4. In the editor, select the `app.route` and function definition for the `POST /convert` route, click the bulb (), and then click **Gemini: Explain this**.
    
    Gemini will explain the selected code in detail.
    

### Run the app

1. If the terminal has closed, from the IDE menu (), select **Terminal &gt; New Terminal**.
    
2. In the terminal, run the following commands:
    
    ```apache
    cd ~/codeassist-demo
    source ~/env/bin/activate
    python3 main.py
    ```
    
    The command returns an error saying there is no module named `flask`. You can use Gemini Code Assist to help you understand the issue.
    
3. In the Gemini Code Assist chat pane, type the following prompt:
    
    ```apache
    How do you install Python requirements?
    ```
    
    Gemini Code Assist will likely mention that you can use the **pip** package installer and a `requirements.txt` file to install Python requirements.
    
4. In the IDE activity bar, click **Explorer** (), and then click **requirements.txt**.
    
    Flask and its required version are listed in the `requirements.txt` file.
    
5. In the terminal, run the following command:
    
    ```apache
    pip install -r requirements.txt
    ```
    
    Flask is now installed.
    
6. In the terminal, run the following command:
    
    ```apache
    python3 main.py
    ```
    
    A dialog indicates that the service listening on port 8080 is now available for web preview.
    
7. Click **Open Preview**, and then click **Open**.
    
    The Roman Numerals web app opens in a new tab.
    
8. In the number box, enter `123`, and then click **Convert**.
    
    The number returned is `CXXIII`. `C` is 100, `X` is 10, and `I` is 1. This looks correct.
    
9. Click **Return to home page**, then enter `45`, and then click **Convert**.
    
    The number returned is `XXXXV`. Technically this is correct mathematically (4 times 10, plus 5), but the normal representation of 40 is `XL` (10 less than 50), and therefore the more traditional Roman numeral representation is `XLV`.
    
    More on this later.
    
10. In the IDE activity bar, click **Explorer** (), and then click **calendar.py**.
    
    The `number_to_roman` function converts a number to a Roman numeral.
    

To verify the objective, click **Check my progress**.

Copy code and run a Python Flask app.

Check my progress

## **Task 5. Add unit tests**

In this task, you use Gemini Code Assist to generate unit tests for your code.

1. In the IDE activity bar, click **Gemini Code Assist** (), then enter the following prompt:
    
    ```apache
    Create unit tests for a fixed version of number_to_roman
    ```
    
    Gemini Code Assist recognizes the code in the open tab for `calendar.py`. It should provide example code that is similar to this:
    
    ```apache
    import unittest
    import calendar
    
    class TestNumberToRoman(unittest.TestCase):
    
        def test_basic_conversions(self):
            self.assertEqual(calendar.number_to_roman(1), "I")
            self.assertEqual(calendar.number_to_roman(5), "V")
            self.assertEqual(calendar.number_to_roman(10), "X")
            self.assertEqual(calendar.number_to_roman(50), "L")
            self.assertEqual(calendar.number_to_roman(100), "C")
            self.assertEqual(calendar.number_to_roman(500), "D")
            self.assertEqual(calendar.number_to_roman(1000), "M")
    
        def test_combinations(self):
            self.assertEqual(calendar.number_to_roman(4), "IV")
            self.assertEqual(calendar.number_to_roman(9), "IX")
            self.assertEqual(calendar.number_to_roman(14), "XIV")
            self.assertEqual(calendar.number_to_roman(40), "XL")
            self.assertEqual(calendar.number_to_roman(90), "XC")
            self.assertEqual(calendar.number_to_roman(400), "CD")
            self.assertEqual(calendar.number_to_roman(900), "CM")
            self.assertEqual(calendar.number_to_roman(1994), "MCMXCIV")
            self.assertEqual(calendar.number_to_roman(3888), "MMMDCCCLXXXVIII")
    
        def test_edge_cases(self):
            self.assertEqual(calendar.number_to_roman(0), "") #  Should handle zero
            self.assertRaises(TypeError, calendar.number_to_roman, "abc") # Should handle invalid input
    
        def test_large_numbers(self):
            self.assertEqual(calendar.number_to_roman(3000), "MMM")
            self.assertEqual(calendar.number_to_roman(3999), "MMMCMXCIX")
    
    if __name__ == '__main__':
        unittest.main()
    ```
    
    **Note:** Gemini may create unit tests that pass for your code as it as currently implemented, instead of creating tests that pass when the code correctly follows the standard implementation of roman numerals. For the purposes of this lab, you will use a correct version of the unit tests.
    
2. To stop the running app, in the terminal, press CTRL-C.
    
3. To create unit tests for the convert function, in the terminal, run the following commands:
    
    ```apache
    cat > ~/codeassist-demo/test_calendar.py <<EOF
    import unittest
    import calendar
    
    class TestNumberToRoman(unittest.TestCase):
    
        def test_basic_conversions(self):
            self.assertEqual(calendar.number_to_roman(1), "I")
            self.assertEqual(calendar.number_to_roman(5), "V")
            self.assertEqual(calendar.number_to_roman(10), "X")
            self.assertEqual(calendar.number_to_roman(50), "L")
            self.assertEqual(calendar.number_to_roman(100), "C")
            self.assertEqual(calendar.number_to_roman(500), "D")
            self.assertEqual(calendar.number_to_roman(1000), "M")
    
        def test_combinations(self):
            self.assertEqual(calendar.number_to_roman(4), "IV")
            self.assertEqual(calendar.number_to_roman(9), "IX")
            self.assertEqual(calendar.number_to_roman(14), "XIV")
            self.assertEqual(calendar.number_to_roman(40), "XL")
            self.assertEqual(calendar.number_to_roman(90), "XC")
            self.assertEqual(calendar.number_to_roman(400), "CD")
            self.assertEqual(calendar.number_to_roman(900), "CM")
            self.assertEqual(calendar.number_to_roman(1994), "MCMXCIV")
            self.assertEqual(calendar.number_to_roman(3888), "MMMDCCCLXXXVIII")
    
        def test_edge_cases(self):
            self.assertEqual(calendar.number_to_roman(0), "") #  Should handle zero
            self.assertRaises(TypeError, calendar.number_to_roman, "abc") # Should handle invalid input
    
        def test_large_numbers(self):
            self.assertEqual(calendar.number_to_roman(3000), "MMM")
            self.assertEqual(calendar.number_to_roman(3999), "MMMCMXCIX")
    
    if __name__ == '__main__':
        unittest.main()
    
    EOF
    ```
    
4. To run the tests, in the terminal, run the following commands:
    
    ```apache
    cd ~/codeassist-demo
    python3 test_calendar.py
    ```
    
    The tests will fail:
    
    ```apache
    ======================================================================
    ERROR: test_edge_cases (__main__.TestNumberToRoman.test_edge_cases)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
    File "/home/user/codeassist-demo/test_calendar.py", line 28, in test_edge_cases
        self.assertRaises(TypeError, calendar.number_to_roman, "abc") # Should handle invalid input
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "/usr/lib/python3.12/unittest/case.py", line 778, in assertRaises
        return context.handle('assertRaises', args, kwargs)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    File "/usr/lib/python3.12/unittest/case.py", line 238, in handle
        callable_obj(*args, **kwargs)
    File "/home/user/codeassist-demo/calendar.py", line 16, in number_to_roman
        number = int(number)
                ^^^^^^^^^^^
    ValueError: invalid literal for int() with base 10: 'abc'
    
    ======================================================================
    FAIL: test_combinations (__main__.TestNumberToRoman.test_combinations)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
    File "/home/user/codeassist-demo/test_calendar.py", line 16, in test_combinations
        self.assertEqual(calendar.number_to_roman(4), "IV")
    AssertionError: 'IIII' != 'IV'
    - IIII
    + IV
    
    ======================================================================
    FAIL: test_large_numbers (__main__.TestNumberToRoman.test_large_numbers)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
    File "/home/user/codeassist-demo/test_calendar.py", line 33, in test_large_numbers
        self.assertEqual(calendar.number_to_roman(3999), "MMMCMXCIX")
    AssertionError: 'MMMDCCCCLXXXXVIIII' != 'MMMCMXCIX'
    - MMMDCCCCLXXXXVIIII
    + MMMCMXCIX
    
    ----------------------------------------------------------------------
    Ran 4 tests in 0.004s
    
    FAILED (failures=2, errors=1)
    ```
    
    The failures were:
    
    * `abc` was not handled correctly.
        
    * 4 returned `IIII` instead of `IV`.
        
    * 3999 returned `MMMDCCCCLXXXXVIIII` instead of `MMMCMXCIX`.
        
    
    In each test function, the first error encountered causes the function to end.
    
    **Note:** Your results may be different if your test code is different.
    

To verify the objective, click **Check my progress**.

Create unit tests for the convert function.

Check my progress

## **Task 6. Fix the code and make it more readable**

In this task, you use Gemini Code Assist to fix the code and make it more readable.

1. In the IDE activity bar, click **Explorer** (), and then click **calendar.py**.
    
2. In the IDE activity bar, click **Gemini Code Assist** (), then enter the following prompt:
    
    ```apache
    Make my code more readable and fix any errors
    ```
    
    Gemini Code Assist will provide code with readability enhancements, and likely fix the issue. Here is an example:
    
    ```apache
    def number_to_roman(number):
        """Converts an integer to its Roman numeral equivalent.
    
        Args:
            number: An integer between 0 and 3999.
    
        Returns:
            A string representing the Roman numeral equivalent of the number.
            Returns an empty string if the input is 0.
            Raises TypeError if the input is not an integer or is out of range.
        """
        try:
            number = int(number)
        except ValueError:
            raise TypeError("Input must be an integer.")
    
        if not 0 <= number <= 3999:
            raise TypeError("Input must be between 0 and 3999.")
    
        if number == 0:
            return ""
    
        roman_map = { 1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC',
                    50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'}
    
        result = ""
        for value, numeral in roman_map.items():
            while number >= value:
                result += numeral
                number -= value
        return result
    ```
    
    Gemini Code Assist also explains the changes that have been made:
    
    ```apache
    Key improvements:
    
    1. Error Handling: Added TypeError for non-integer input and values outside the range 0-3999. This makes the function more robust.
    
    2. Docstring: A clear docstring explains the function's purpose, arguments, return value, and error handling. This significantly improves readability and maintainability.
    
    3. Efficiency and Correctness: Uses a roman_map dictionary and a more efficient algorithm to construct the Roman numeral. This handles subtractive notation (like "IV" for 4, "IX" for 9, etc.) correctly. The previous version had issues with these cases and was less efficient.
    
    4. Zero Handling: Explicitly handles the case where the input number is 0, returning an empty string as expected.
    
    5. Clarity: The code is now more concise and easier to understand. The logic is clearer and the variable names are more descriptive.
    
    This revised version addresses the limitations and errors of the original implementation and adheres to best practices for Python code. It's more robust, readable, and efficient.
    ```
    
    In this example, Gemini Code Assist provided an algorithm that made the code more readable, and also fixed issues in the original code.
    
3. To compare the code in a new file, in the code pane inside Gemini Code Assist, click **Diff with Open File** ().
    
4. To accept the changes, click **Accept**.
    
    The updated code is accepted.
    
5. Click the menu (), and then navigate to **File &gt; Save**.
    
6. In the terminal, run the following commands:
    
    ```apache
    cd ~/codeassist-demo
    python3 test_calendar.py
    ```
    
    If the tests do not pass, try running them a few times to make sure the tests are not using a cached version of the calendar module.
    
    If Gemini has not fixed the roman numeral issue, some tests will fail. If this happens, you may fix the code yourself until the test passes, or you can replace `calendar.py` with a known working version.
    
7. If some tests fail, to fix the code and re-run the unit tests, run the following commands:
    
    ```apache
    cat > ~/codeassist-demo/calendar.py <<EOF
    def number_to_roman(number):
        """Converts an integer to its Roman numeral equivalent.
    
        Args:
            number: An integer between 0 and 3999.
    
        Returns:
            A string representing the Roman numeral equivalent of the number.
            Returns an empty string if the input is 0.
            Raises TypeError if the input is not an integer or is out of range.
        """
        try:
            number = int(number)
        except ValueError:
            raise TypeError("Input must be an integer.")
    
        if not 0 <= number <= 3999:
            raise TypeError("Input must be between 0 and 3999.")
    
        if number == 0:
            return ""
    
        roman_map = { 1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC',
                    50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'}
    
        result = ""
        for value, numeral in roman_map.items():
            while number >= value:
                result += numeral
                number -= value
        return result
    EOF
    cd ~/codeassist-demo
    python3 test_calendar.py
    ```
    
    The tests should now pass.
    

To verify the objective, click **Check my progress**.

Update calendar.py to fix issues in the original code.

Check my progress

## **Task 7. Enhance code readability for non-native English speakers**

If you're a non-native English speaker who relies on translation app, you can use Gemini Code Assist to generate comments in other languages.

In this task, you use Gemini Code Assist to add comments to code, including in a different language.

1. In the IDE activity bar, click **Explorer** (), and then click **main.py**.
    
2. In the IDE activity bar, click **Gemini Code Assist** (), then enter the following prompt:
    
    ```apache
    Add comments to main.py
    ```
    
    Gemini Code Assist will add comments that help explain the code:
    
    ```apache
    import os  # Import the os module for environment variables
    from flask import Flask, render_template, request  # Import Flask framework components
    import calendar  # Import the calendar module for Roman numeral conversion
    
    # Create a Flask app instance
    app = Flask(__name__)
    
    # Define a route for the home page
    @app.route("/", methods=["GET"])
    def home_page():
        # Render the index.html template
        return render_template("index.html")
    
    # Define a route for the conversion endpoint
    @app.route("/convert", methods=["POST"])
    def convert():
        # Get the number from the form data
        number = request.form["number"]
        # Convert the number to Roman numerals using the calendar module
        roman = calendar.number_to_roman(number)
        # Render the convert.html template with the number and its Roman numeral equivalent
        return render_template("convert.html", number=number, roman=roman)
    
    # Run the Flask app if this script is executed directly
    if __name__ == "__main__":
        # Run the app in debug mode, listening on all interfaces (0.0.0.0)
        # and using the port specified in the environment variable PORT or defaulting to 8080
        app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
    ```
    
    But what if English is not your first language?
    
3. In the Gemini Code Assist pane, enter the following prompt:
    
    ```apache
    Add Spanish comments to main.py
    ```
    
    Gemini Code Assist can provide comments in different languages to help with code readability.
    
4. To verify that only comments were added, in the code pane inside Gemini Code Assist, click **Diff with Open File** ().
    
    The updates are compared to the existing code:
    
    ![Diff showing Spanish comments](https://cdn.qwiklabs.com/tWUQZ5MzGFgdfHzt8AnbVODAV6TmPJNCF%2BMgbOv8mA8%3D align="left")
    
5. To reject the changes, click **Decline**.
    

## **Task 8. Improve how the app looks**

Gemini Code Assist can also help you make your app look nicer.

In this task, you use Gemini Code Assist to improve the visual design of your app.

1. In the terminal, run the following command:
    
    ```apache
    cd ~/codeassist-demo
    python3 main.py
    ```
    
    A dialog indicates that the service listening on port 8080 is now available for web preview.
    
2. Click **Open Preview**, and then click **Open**.
    
    The Roman Numerals web app opens in a new tab.
    
    ![Simple UI](https://cdn.qwiklabs.com/ngKbP4MZlPuvr9FAEpuRplCp2WM%2BLd1aYbfoT%2F1vAUk%3D align="left")
    
3. In the IDE activity bar, click **Explorer** (), and then select **templates/index.html**.
    
    The HTML template for this app is extremely simple.
    
4. In the IDE activity bar, click **Gemini Code Assist** (), then enter the following prompt:
    
    ```apache
    Make this HTML template look better
    ```
    
    Gemini Code Assist will update the code to improve how the app's entry page looks.
    
5. To accept the changes, in the code pane inside Gemini Code Assist, click **Diff with Open File** (), and then click **Accept**.
    
6. Return to the Roman Numerals app browser tab, and click **Refresh**.
    
    The app should look nicer. In this example, the dialog is centered on the page and colors have been added.
    
    ![Improved UI](https://cdn.qwiklabs.com/ZQ1eEQq0N0%2BLycv0ZALF402oELaSKLKo%2BS8QLSQnw0I%3D align="left")
    
    **Note:** The changes made by *Gemini Code Assist* may look different for you.
    
7. In the IDE activity bar, click **Explorer** (), and then click **templates/convert.html**.
    
8. In the IDE activity bar, click **Gemini Code Assist** (), then enter the following prompt:
    
    ```apache
    Make the convert.html template look similar to the index.html template
    ```
    
    Gemini Code Assist will update the results template to match the index template.
    
9. To accept the changes, in the code pane inside Gemini Code Assist, click **Diff with Open File** (), and then click **Accept**.
    
10. Return to the Roman Numerals app browser tab, enter `45`, and then click **Enter**.
    
    The new results page should match the style of the index page:
    
    ![Improved results page](https://cdn.qwiklabs.com/eKbkK2P4%2BBx5J71fo1zRhjTmgjxGEao7ofYoQqvGR3o%3D align="left")
    

To verify the objective, click **Check my progress**.

Use Gemini Code Assist to improve the visual design of your app.

Check my progress

## **End your lab**

When you have completed your lab, click **End Lab**. Qwiklabs removes the resources you’ve used and cleans the account for you.

You will be given an opportunity to rate the lab experience. Select the applicable number of stars, type a comment, and then click **Submit**.

The number of stars indicates the following:

* 1 star = Very dissatisfied
    
* 2 stars = Dissatisfied
    
* 3 stars = Neutral
    
* 4 stars = Satisfied
    
* 5 stars = Very satisfied
    

You can close the dialog box if you don't want to provide feedback.

For feedback, suggestions, or corrections, please use the **Support** tab.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=yxH8mwpcc-8&ab_channel=CodinggMafiya]