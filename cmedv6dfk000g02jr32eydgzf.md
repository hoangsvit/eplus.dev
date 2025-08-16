---
title: "Getting started with Flutter Development - GSP885"
seoTitle: "Getting started with Flutter Development - GSP885"
seoDescription: "Learn how to build cross-platform apps with Flutter, Google's UI toolkit. Master the basics in this hands-on lab with real cloud resources"
datePublished: Sat Aug 16 2025 06:16:28 GMT+0000 (Coordinated Universal Time)
cuid: cmedv6dfk000g02jr32eydgzf
slug: getting-started-with-flutter-development-gsp885
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755324828216/98ffd79f-682b-4e93-9ed5-0a67991d5f57.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755324901974/78e2ad97-e9b2-46ea-b17d-813aa596a5a7.png
tags: flutter, flutter-development, getting-started-with-flutter-development-gsp885, getting-started-with-flutter-development, gsp885

---

## Overview

Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Flutter works with existing code, is used by developers and organizations around the world, and is free and open source.

In this lab, you will create a Flutter app using generated template code. The basic Flutter interface provides a simple example to get started programming in Flutter.

![A mobile, with the Welcome to Flutter app open and displaying the text 'Hello World'.](https://cdn.qwiklabs.com/9KgcabOndUea0OelurDmmQ7MNFTVwtKmwqqDk6QGctM%3D align="left")

### What you'll learn

* How to write a Flutter app that looks natural on iOS, Android, and the web
    
* Basic structure of a Flutter app
    
* Finding and using packages to extend functionality
    
* Using hot reload for a quicker development cycle
    

### Prerequisites

Based on the content, it is recommended to have some familiarity with:

* Flutter
    
* Dart
    

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Task 1. Open the Code Server editor

In this lab, we will use a custom editor that includes the Flutter and Dart extensions. From the initial Qwiklabs panel:

![The Qwiklabs panel, wherein the IDE and Live Server links are listed, along with the Copy icons.](https://cdn.qwiklabs.com/jynAoryvD3TXGyvyOBDiQPH8dm5SiLaemaxWhyhHerM%3D align="left")

1. Copy the IDE value displayed.
    
2. Paste the IDE value into the a new browser window.
    

**Note:**

Code Server Editor:

* Based on VS Code
    
* Supports Extensions
    

## Task 2. Flutter extensions

Flutter extensions have been installed within the editor.

* In the editor select the extensions icon:
    
    ![The Extensions panel, which includes a warning message and a list of installed extensions.](https://cdn.qwiklabs.com/PtV7%2BHdCdmpBkfxTZCYKnns0b6I0CVsrH%2BCyaL3CBt8%3D align="left")
    

**Note:**

* Flutter extension provides support for developing with the Flutter Framework
    
* Dart language extension will automatically be installed as part of the Flutter extension
    

## Task 3. Create a Flutter template

**Note:** The Flutter Framework enables the creation of multi-platform applications e.g. Android, iOS, Windows and Web.

In this section create a Flutter Web application called startup\_namer.

1. Click the navigation menu button (i.e. left hand side, three horizontal lines).
    
2. Open a Terminal within the browser by selecting New Terminal:
    

![The navigation path to the option New Terminal.](https://cdn.qwiklabs.com/OT1O6e0jMpk2kH4l7As2GAPLdXD1GDK%2Fse908wrGNDo%3D align="left")

3. In the terminal enter the following command:
    

```apache
flutter create startup_namer
```

**Note:**

Flutter Create:

* Generates a sample application based on a template.
    
* Provides support for different platforms (e.g. Android, iOS and Web)
    
* Hierarchy includes all the files required for a basic Flutter application
    

4. Move to the startup namer directory:
    

```apache
cd startup_namer
```

5. Close the terminal window:
    

```apache
exit
```

The `startup_namer` directory and template code have now been created.

## Task 4. Exploring the Flutter code

In this section edit the Flutter Web application. Use the editor to open the `startup_namer` directory created in the previous step.

**Note:** The editor will make helpful suggestions in relation to the extensions selected. These suggestions should be accepted.

1. From the main panel select the `Explorer` Icon:
    
2. Select the `Open Folder` option.
    
3. Open the `startup_namer` folder:
    

```apache
/home/ide-dev/startup_namer/
```

4. The editor view will change to the Folder view.
    

![The Explorer panel, which now displays the STARTUP_NAMER folder and lists its contents.](https://cdn.qwiklabs.com/IJnLEmSQjwBLfScai3fA9B92sPFQijlz%2Br4pbc13Wm0%3D align="left")

5. Explore the template code, especially the `lib/main.dart` and `pubspec.yaml` files.
    

At this point it is worth pointing out some information about the editor:

**Note:**

Code Server:

* Generates a sample application based on a template.
    
* Provides support for different platforms (e.g. Android, iOS and Web)
    
* Hierarchy includes all the files required for a basic Flutter application
    
* The lab focuses on building a Web application
    

## Task 5. Running the Flutter Web application

In this section run the Flutter Web application from the command line.

1. In the editor, open a terminal.
    
2. Ensure the directory is set to `startup_namer`.
    

**Note:**

Flutter Web:

* Uses a web server
    
* Application will be run in the browser
    
* Application will bind to the machine **IP/PORT**
    

3. Run the Flutter web server:
    

```apache
fwr
```

4. The running web server should look similar to below:
    

![The running web server, which includes its status and requirements for debugging.](https://cdn.qwiklabs.com/Vhvu%2F6F1Oh%2Bp45xl%2F5r7sY7%2FBTYJ7imEJIlmqtBIhP4%3D align="left")

5. Copy the `Live Server` from the Qwiklabs panel.
    
6. Paste the address into a new browser tab.
    
7. The browser will render the web application:
    

![A mobile with the Flutter Demo Home Page displayed.](https://cdn.qwiklabs.com/lEa%2FsQN9Th6z3NoPSIf9Dbrm%2BW8hbEz%2BDQgHT73vWSg%3D align="left")

Feel free to interact with the running application.

## Task 6. Flutter Hot reload

Flutter supports `Hot reload` which means changes can be made to the application dynamically.

**Note:**

Hot Reload:

* Support for different platforms (e.g. Android, iOS and Web)
    
* Watch the YouTube video [Hot reload?! | Decoding Flutter](https://www.youtube.com/watch?v=sgPQklGe2K8)
    

In this section we use the `Hot reload` function to change the Title.

1. In the editor, amend the file `lib/main.dart`.
    
2. Look for `class MyApp` and find the Title field `Flutter Demo Home Page`.
    

![The lib/main.dart code, which includes the homepage title in the class MyApp.](https://cdn.qwiklabs.com/nsFm%2Bnczt957gp3QGtDtWLwOoA%2B6CGT47PkgJ5jR6hk%3D align="left")

3. Amend the HomePage `title` value on `line 34` to the following:
    

```apache
Flutter is awesome!
```

4. Save the editor changes made i.e. `CTRL+S`.
    
5. The `lib/main.dart` code should now look similar to below:
    

![The updated lib/main.dart code, which includes 'Flutter is awesome' as the title.](https://cdn.qwiklabs.com/3HKkGgjI6GQIueteiREkTogh82D3G0ZOwORoAP3PoPk%3D align="left")

6. Click in the open Terminal window, and press r:
    

![The hot restart confirmation message.](https://cdn.qwiklabs.com/ds1GqZ6M8J01o2SfxSzwqvwqbLjpQER4fkpnByUHHFY%3D align="left")

7. Switch to the `Live Server` browser tab.
    
8. Press `CTRL+R` to reload the page.
    

Awesome work getting started with Flutter.

Click *Check my progress* to verify the objective.

Assess my progress

---

## Solution of Lab

%[https://youtu.be/MszH378NlJk] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">You don't need to perform this lab, spend more than <mark>3 minutes</mark> to complete</div>
</div>