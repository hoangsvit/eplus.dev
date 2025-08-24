---
title: "Introduction to Dart - GSP1013"
seoTitle: "Introduction to Dart - GSP1013"
seoDescription: "Learn Dart programming essentials with this beginner's guide. Explore variables, flow control, functions, and more in a real cloud environment"
datePublished: Sun Aug 24 2025 04:35:52 GMT+0000 (Coordinated Universal Time)
cuid: cmep73t97000102jo5mtfg0kq
slug: introduction-to-dart-gsp1013
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756010062331/05d9e514-4d4f-4c0f-8fa7-98a93ff65054.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756010128682/fca898f4-1e6d-47af-b9a5-faab76017dad.png
tags: dart, flutter, introduction-to-dart-gsp1013, gsp1013

---

## Overview

Dart is a client-optimized language for developing fast apps on any platform. Its goal is to offer the most productive programming language for multi-platform development, paired with a flexible execution runtime platform for app frameworks.

Languages are defined by their technical envelope — the choices made during development that shape the capabilities and strengths of a language. Dart is designed for a technical envelope that is particularly suited to client development, prioritizing both development (sub-second stateful hot reload) and high-quality production experiences across a wide variety of compilation targets (web, mobile, and desktop).

Dart also forms the foundation of Flutter. Dart provides the language and runtimes that power Flutter apps, but Dart also supports many core developer tasks like formatting, analyzing, and testing code.

In this lab, you will learn the basics of Dart in a prepared development environment.

### What you'll learn

* Variables
    
* Flow Control
    
* Functions
    

### Prerequisites

Based on the content, it is recommended to have some familiarity with:

General programming principles

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Task 1. Getting started

The lab environment includes an Editor and Browser pre-configured for Dart. Access these resources using the lab credentials panel.

* Copy the `IDE` link and paste it into a new browser.
    

## Task 2. Flutter repository

In the code editor clone the flutter repository and then access the relevant code sample.

1. In the editor select `Source Control`.
    

![The Source Control page displaying buttons for Open Folder and Clone Repository ](https://cdn.qwiklabs.com/42zcPi05iF0cIsknmcdwTay8TfsA43lRJ4ho%2FviWPuM%3D align="left")

2. Select `Clone Repository`.
    
3. Enter the following repository:
    

```apache
https://github.com/rosera/flutter_workshop.git
```

Copied!

4. Clone to the default directory.
    

**Note:** As the repository is cloned, the editor will raise helpful notifications. These are not required for this lab. Alternatively you may use the editor available at [dart.dev](https://dart.dev/#try-dart).

With the Repository now cloned onto your environment, the Flutter Workshop repository is now available.

For this lab use the dart folder to complete the exercises.

5. Select the `dart` folder.
    

A solution folder containing working examples is also available in the same repository.

| **Solution Directory** | **Contents** |
| --- | --- |
| dart/lab01/solutions | Variables |
| dart/lab02/solutions | Flow control |
| dart/lab03/solutions | Functions |

**Note:** Please refer to the correct directory if you need assistance with a solution.

## Task 3. Introduction to Dart

* Watch the [Introduction to Dart](https://www.youtube.com/watch?v=5KlnlCq2M5Q) video to get an overview of what Dart is and why it is important.
    

In addition, the following guidelines on [Effective Dart](https://dart.dev/guides/language/effective-dart) will be useful.

* [Style Guide](https://dart.dev/guides/language/effective-dart/style) – This defines the rules for laying out and organizing code, or at least the parts that [dart format](https://dart.dev/tools/dart-format) doesn’t handle for you. The style guide also specifies how identifiers are formatted: camelCase, using\_underscores, etc.
    
* [Documentation Guide](https://dart.dev/guides/language/effective-dart/documentation) – This tells you everything you need to know about what goes inside comments. Both doc comments and regular, run-of-the-mill code comments.
    
* [Usage Guide](https://dart.dev/guides/language/effective-dart/usage) – This teaches you how to make the best use of language features to implement behavior. If it’s in a statement or expression, it’s covered here.
    
* [Design Guide](https://dart.dev/guides/language/effective-dart/design) – This is the softest guide, but the one with the widest scope. It covers what you’ve learned about designing consistent, usable APIs for libraries. If it’s in a type signature or declaration, this goes over it.
    

### Dart: Hello World

To get started with Dart, write a traditional Hello World program and create an application based on the traditional Hello World code.

1. Create new file `hello-world.dart`.
    
2. Add the following code:
    

```apache
void main(){
  print('Hello World!');
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the Run option to execute the code.
    

The program output will be displayed in the debug console.

![The debug console displaying the output: Hello World!](https://cdn.qwiklabs.com/Y79sGQG3XR9K1rRSjMosqlqvO2n6Cplyp0603sqdO9g%3D align="left")

## Task 4. Variables

In this section learn how to declare different types of variables with Dart.

Learn about the following variables types and their use in Dart:

* Integer
    
* Double
    
* Strings
    
* Boolean
    

### Dart: Hello Integer

Create an application to use Integers.

1. Create new file `hello-integer.dart`.
    
2. Add the following code:
    

```apache
void main(){
  int maxNumberOfPeople = 35;
  print ('Hello $maxNumberOfPeople');
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

### Dart: Hello Double

Create an application to use Doubles.

1. Create new file `hello-double.dart`.
    
2. Add the following code:
    

```apache
void main(){
  double pieceOfPie = 3.142;
  print ('Hello $pieceOfPie');
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

### Dart: Hello String

Create an application to use Strings.

1. Create new file `hello-string.dart`.
    
2. Add the following code:
    

```apache
void main(){
  String getCourseName = "flutter bootcamp 21";
  print ('Hello $getCourseName');
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

### Dart: Hello Booleans

Create an application to use Booleans.

1. Create new file `hello-bool.dart`.
    
2. Add the following code:
    

```apache
void main(){
  bool isDartCool = true;
  print ('Hello $isDartCool');
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

## Task 5. Flow control

In this section learn how to apply conditional logic in Dart.

### IF statement

Create an IF statement.

1. Create new file `hello-if.dart`.
    
2. Add the following code:
    

```apache
void main() {
  bool isDartCool = false;

  if (isDartCool) {
    print('Hello $isDartCool');
  }
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

### IF/ELSE statement

Create an IF/ELSE statement.

1. Create new file `hello-else.dart`.
    
2. Add the following code:
    

```apache
void main() {
  bool isDartCool = false;

  if (isDartCool) {
    print('Hello $isDartCool');
  } else {
    print('Hmm I think Dart is pretty cool!');
  }
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

## Task 6. Functions

In this section learn how to declare functions and use them in Dart.

At a high level ypu need to know about the following:

* Declare a function return type
    
* Add function parameters
    
* Set a return statement
    

### Function without parameters

Create an application to use functions without parameters.

1. Create new file `hello-function.dart`.
    
2. Add the following code:
    

```apache
void main() {
  bool isDartCool = isDartCoolFunc();

  if (isDartCool) {
    print('Hello $isDartCool');
  } else {
    print('Hmm I think Dart is pretty cool!');
  }
}

bool isDartCoolFunc() {
  bool isDartCool = true;

  return isDartCool;
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

### Function with parameters

Create an application to use functions with parameters.

1. Create new file `hello-function2.dart`.
    
2. Add the following code:
    

```apache
void main() {
  bool isDartCool = isDartCoolFunc(true);

  if (isDartCool) {
    print('Hello $isDartCool');
  } else {
    print('Hmm I think Dart is pretty cool!');
  }
}

bool isDartCoolFunc(bool myParameter) {
  bool isDartCool = myParameter;

  return isDartCool;
}
```

Copied!

3. Save the code.
    

**Note:** Once the code is saved, a **Run|Debug** menu option will appear.

4. Select the **Run** option to execute the code.
    

The program output will be displayed in the debug console.

Awesome work getting started with Dart.

Click *Check my progress* to verify the objective.

Assess my progress

---

### Solution of Lab

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756010101908/af57bf7f-db64-48e6-b5c2-4b030f1ef8e1.png align="center")