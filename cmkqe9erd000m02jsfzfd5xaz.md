---
title: "Flutter Startup Namer - GSP886"
seoTitle: "Flutter Startup Namer - GSP886"
seoDescription: "Learn to create a Flutter app generating startup names with an infinite scroll list, stateful widgets, and hot reload for efficient development"
datePublished: Fri Jan 23 2026 04:42:11 GMT+0000 (Coordinated Universal Time)
cuid: cmkqe9erd000m02jsfzfd5xaz
slug: flutter-startup-namer-gsp886
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769143291544/a4a638c9-4d37-47b6-8f5d-5d6e50009431.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1769143301326/1927f27b-3450-4818-a633-27050e9ed5c6.png
tags: flutter-startup-namer-gsp886, flutter-startup-namer, gsp886

---

## Overview

Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Flutter works with existing code, is used by developers and organizations around the world, and is free and open source.

You’ll implement a simple app that generates proposed names for a startup company. The user can select and unselect names, saving the best ones. The code lazily generates 10 names at a time. As the user scrolls, more names are generated. There is no limit to how far a user can scroll.

### What you'll learn

* How to write a Flutter app that looks natural on iOS, Android, and the web
    
* Basic structure of a Flutter app
    
* Finding and using packages to extend functionality
    
* Using hot reload for a quicker development cycle
    
* How to implement a stateful widget
    
* How to create an infinite, lazily loaded list
    

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

## Task 1. Open the Frontend Service

In this lab, we will use a custom editor that includes the Flutter and Dart extensions. The lab environment is preprovisioned.

**Note: Code Server editor**

* Based on VS Code
    
* Supports Extensions
    

1. Copy the `Flutter Editor` address from the Lab Details panel.
    

![The Lab Details panel displaying the IDE and Live Server links](https://cdn.qwiklabs.com/jynAoryvD3TXGyvyOBDiQPH8dm5SiLaemaxWhyhHerM%3D align="left")

2. Paste the IDE address into a Browser.
    

## Task 2. Create the starter Flutter app

In this section create a template Flutter application for the Web. Use the in-built terminal to set up a template codebase for the web application.

**Note: Lab environment**

* User account pre-provisioned
    
* Flutter and Dart extensions pre-loaded
    
* Clone code direct to the machine
    

1. Select the `Application Menu` button (i.e. three horizontal lines).
    

![The expanded Application menu](https://cdn.qwiklabs.com/soWOzwQXR2MEkL3OM7lBgd54axPxkjBro%2BFowvNyBzU%3D align="left")

2. Use the menu option to open a new Terminal.
    
3. In the terminal, create a new web application:
    

```apache
flutter create startup_namer
```

4. Change to the new application directory:
    

```apache
cd startup_namer
```

The Flutter application has now been created. In the next section explore the codebase.

## Task 3. Explore the Flutter app

In this section view the template Flutter application.

1. Select the `Explorer` button (highlighted in white).
    

![The Explorer button highlighted](https://cdn.qwiklabs.com/bU%2BX0ILWgvi3vfaPO4%2BnchhS%2FPmcMaYao2xCz4P2f%2BQ%3D align="left")

2. Select the `Open Folder` menu option.
    
3. Use the following folder location and click **Ok**:
    

```apache
/home/ide-dev/startup_namer
```

4. Confirm the on screen notification(s) to update packages and editor settings.
    

The editor has now been updated with the code and terminal window. In the next section run the code to view the template application.

## Task 4. Run the Flutter code

In this section run the Flutter Web application from the command line.

**Note: Web server**

* Building a Web application
    
* Flutter application will be run in the browser
    
* Tell Flutter to use the browser on a specific port
    
* Note reload can take approximately 20s on the Flutter device
    
* Leave the web-server running during development to take advantage of hot-restart
    

1. In the editor, open a Terminal, if not already available.
    
2. Ensure the directory is set to `startup_namer`.
    
3. Run the Flutter web server:
    

```apache
fwr
```

4. The running web server should look similar to below:
    

![Partial message: Waiting for connection from debug service on Web Server 25.1s...](https://cdn.qwiklabs.com/%2FkkKiwhvY57L9bLZ9YtIB1gvRNvYl%2FZ0qch6zUj4zqg%3D align="left")

5. Copy the `Flutter Device` and paste into a new Incognito Browser tab
    

![The Lab Details panel displaying the IDE and Live Server links](https://cdn.qwiklabs.com/jynAoryvD3TXGyvyOBDiQPH8dm5SiLaemaxWhyhHerM%3D align="left")

6. The Flutter device will show an image similar to below:
    

![The Flutter Demo Home Page displayed on a mobile phone](https://cdn.qwiklabs.com/nVko9AJaLZztdLkMiyhuR308o1zTEeDCz9%2BDwkKZTY8%3D align="left")

**Note: Flutter template application**

* This example creates a Material app. Material is a visual-design language that's standard on mobile and the web. Flutter offers a rich set of Material widgets.
    
* The main method uses arrow (=&gt;) notation. Use arrow notation for one-line functions or methods.
    
* The app extends StatelessWidget, which makes the app itself a widget. In Flutter, almost everything is a widget, including alignment, padding, and layout.
    
* The Scaffold widget, from the Material library, provides a default app bar, a title, and a body property that holds the widget tree for the home screen. The widget subtree can be quite complex.
    
* A widget's main job is to provide a build method that describes how to display the widget in terms of other, lower-level widgets.
    
* The body for this example consists of a Center widget containing a Text child widget. The Center widget aligns its widget subtree to the center of the screen.
    

With the template application up and running, it is time to make some alterations to the application. In the next section learn how to integrate an external package.

## Task 5. Using an external package

In this section learn how to integrate an open-source package named `english_words`. The package, as well as many other open-source packages are available at [pub.dev](https://pub.dev/).

| **File** | **Description** |
| --- | --- |
| lib/main.dart | This file contains the main entry point and the application widget. |
| lib/config.dart | This file contains the environment settings. |
| pubspec.yaml | This file contains the package configuration for the application. |

1. In the editor, open the pubspec.yaml file.
    
2. Append the following package to dependencies:
    

```apache
 english_words: ^4.0.0   # add this line
```

3. The dependencies section should look similar to below:
    

```apache
dependencies:
  flutter:
    sdk: flutter

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^1.0.2
  english_words: ^4.0.0   # add this line
```

4. Open the file `lib/main.dart`.
    
5. Delete the entire codebase and replace with the following code:
    

```apache
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random(); // Add this line.
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(                       // Drop the const, and
          //child: Text('Hello World'),     // Replace this text...
          child: Text(wordPair.asPascalCase),  // With this text.
        ),
      ),
    );
  }
}
```

In the above code, the original code has been replaced. The new application will present a new random word each time it is run. In the next section run the updated application to test the output.

## Task 6. Run the Flutter code

In this section run the updated Flutter Web application from the command line.

1. The running web server should look similar to below:
    

![Partial message: Waiting for connection from debug service on Web Server 25.1s...To hot resart changes while running, press 'r' or 'R'.](https://cdn.qwiklabs.com/%2FkkKiwhvY57L9bLZ9YtIB1gvRNvYl%2FZ0qch6zUj4zqg%3D align="left")

2. Press the `r` or `R` key to perform a hot restart
    
3. The Flutter device will show an image similar to below:
    

![The Welcome to Flutter page with the word 'StringWorld' displayed on a mobile phone screen](https://cdn.qwiklabs.com/HYimNe8v%2Fy6Ka4w2y5kCTmHhip2VATWTr2h1GXsFP88%3D align="left")

**Note: Hot reload**

* If the app is running, hot reload can be used to update the running app. (From the command line, you can enter r to hot reload.)
    
* Each time you click hot reload or save the project, you should see a different word pair, chosen at random, in the running app. That's because the word pairing is generated inside the build method, which runs each time the MaterialApp requires rendering, or when toggling the Platform in the Flutter Inspector.
    

Having successfully made basic changes to the Flutter application, it is time for the next step. In the next section add a stateful widget.

## Task 7. Adding a stateful widget

In this section, add a stateful widget, `RandomWords`, which creates its State class, `_RandomWordsState`. Then use RandomWords as a child inside the existing MyApp stateless widget.

**Note: Stateless widgets**

* Stateless widgets are immutable, meaning that their properties can't change all values are final.
    
* Stateful widgets maintain state that might change during the lifetime of the widget.
    
* Implementing a stateful widget requires at least two classes. A StatefulWidget that creates an instance of a State class. The StatefulWidget object is, itself, immutable and can be thrown away and regenerated, but the State object persists over the lifetime of the widget.
    

1. In the editor, open the `lib/main.dart`.
    
2. At the bottom of the file, add the following code:
    

```apache
class RandomWords extends StatefulWidget {
  @override
  _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  @override                                  
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();      // NEW
    return Text(wordPair.asPascalCase);      // NEW
  }                                         
}
```

3. In the `MyApp build method`, delete the following line:
    

```apache
    final wordPair = WordPair.random();  // DELETE
```

4. Replace the `child:Text(wordPair.asPascalCase)`:
    

```apache
     child: RandomWords(),                 // ...this line
```

The MyApp build method now looks like this:

```apache
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //final wordPair = WordPair.random();  // DELETE

    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          //child: Text(wordPair.asPascalCase), // REPLACE with... 
          child: RandomWords(),                 // ...this line
        ),
      ),
    );
  }
}
```

**Optional**: Running the application at this point, it shows two words combined.

![The Welcome to Flutter page with the word 'TopGood' displayed on a mobile phone screen](https://cdn.qwiklabs.com/QNV%2B10SMh%2FZe0XZaCqew94oLq2DiB9ALwPGxZvE%2Fljg%3D align="left")

Extending the random word generation has meant word combinations are easy to generate. In the next section, extend the application by introducing an infinite ListView.

## Task 8. Creating an infinite scrolling ListView

In this section, expand `_RandomWordsState` to generate and display a list of word pairings. As the user scrolls, the list (displayed in a ListView widget) grows infinitely. A builder factory constructor in ListView enables lazily building a list view on demand.

**Note: ListView**

* The ListView class provides a builder property, itemBuilder, that's a factory builder and callback function specified as an anonymous function.
    
* Two parameters are passed to the function the BuildContext and the row iterator, i. The iterator begins at 0 and increments each time the function is called, once for every suggested word pairing.
    
* This model allows the suggestion list to continue growing as the user scrolls.
    

1. Edit `lib/main.dart`.
    
2. Add the lines marked **NEW** to `_RandomWordsState`:
    

```apache
class _RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];                 // NEW
  final _biggerFont = const TextStyle(fontSize: 18); // NEW
  ...
}
```

3. Add a new Widget to the `_RandomWordsState` class:
    

```apache
  Widget _buildSuggestions() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      // The itemBuilder callback is called once per suggested 
      // word pairing, and places each suggestion into a ListTile
      // row. For even rows, the function adds a ListTile row for
      // the word pairing. For odd rows, the function adds a 
      // Divider widget to visually separate the entries. Note that
      // the divider may be difficult to see on smaller devices.
      itemBuilder: (BuildContext _context, int i) {
        // Add a one-pixel-high divider widget before each row 
        // in the ListView.
        if (i.isOdd) {
          return Divider();
        }

        // The syntax "i ~/ 2" divides i by 2 and returns an 
        // integer result.
        // For example: 1, 2, 3, 4, 5 becomes 0, 1, 1, 2, 2.
        // This calculates the actual number of word pairings 
        // in the ListView,minus the divider widgets.
        final int index = i ~/ 2;
        // If you've reached the end of the available word
        // pairings...
        if (index >= _suggestions.length) {
          // ...then generate 10 more and add them to the 
          // suggestions list.
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);
      }
    );
  }
```

4. Add `_buildRow` to the `_RandomWordsState` class:
    

```apache
  Widget _buildRow(WordPair pair) {
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  }
```

At this point the class `_RandomWordsState` should look like below:

```apache
class _RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    ...
  }

  Widget _buildSuggestions() {
    ...
  }

  Widget _buildRow(WordPair pair) {
    ...
  }

}
```

5. Replace the `_RandomWordsState` class build method:
    

```apache
  @override
  Widget build(BuildContext context) {
   return Scaffold (                     // Add from here... 
      appBar: AppBar(
        title: Text('Startup Name Generator'),
      ),
      body: _buildSuggestions(),
    );                                      // ... to here.
  }
```

6. Replace the `MyApp` class build method:
    

```apache
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      home: RandomWords(),
    );
  }
```

7. Perform a hot restart to see changes and refresh the Flutter device in the browser.
    

Click *Check my progress* to verify the objective.

Assess my progress

---

## Solution of Lab

%[https://youtu.be/TeASPjIN3Nk] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">You don't need to perform this lab, spend more than <mark>3 minutes</mark> to complete</div>
</div>