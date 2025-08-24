---
title: "Implementing Page Navigation in a Flutter Application - GSP1012"
seoTitle: "Implementing Page Navigation in a Flutter Application - GSP1012"
seoDescription: "Learn to create a Flutter app, utilize multiple pages, and implement a TabView and Drawer for navigation"
datePublished: Sun Aug 24 2025 04:31:16 GMT+0000 (Coordinated Universal Time)
cuid: cmep6xw98000r02l4eohc4yzw
slug: implementing-page-navigation-in-a-flutter-application-gsp1012
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756008573119/603c9cee-ed10-45ad-851a-46e7ceccbca8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756008593103/1bce4664-e5bc-4117-8fed-cad9dce81bf5.png
tags: flutter, implementing-page-navigation-in-a-flutter-application-gsp1012, gsp1012

---

Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Flutter works with existing code, is used by developers and organizations around the world, and is free and open source.

In this lab, you will create a Flutter app using generated template code. The basic Flutter interface provides a simple example to get started programming in Flutter.

![The Flutter interface displayed on a mobile phone screen](https://cdn.qwiklabs.com/qlQInBOenU%2B%2BZ5YwMdI3MBkl0oq0eKVDKSfbPLB1xBQ%3D align="left")

### What you'll learn

* How to write a Flutter app that looks natural on iOS, Android, and the web
    
* Basic structure of a Flutter app
    
* Using multiple pages
    
* Using hot reload for a quicker development cycle
    

### Prerequisites

Based on the content, it is recommended to have some familiarity with:

* Flutter
    
* Dart
    

## Task 1. Open the Code Server Editor

In this lab, you will use a custom editor that includes the Flutter and Dart extensions. From the initial lab panel:

![The Lab Details panel displaying the IDE and Live Server links](https://cdn.qwiklabs.com/mhXhBxVqjY04ylNNU3jyeqXuyFxr6NpAbClJAmTbijE%3D align="left")

1. Copy the Flutter Editor address displayed.
    
2. Paste the Editor address into a Browser tab.
    

## Task 2. Creating a Flutter template

In this section create a Flutter Web application called first\_app.

1. Click the hamburger button (i.e. Left hand side, three horizontal lines
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ).
    
2. Open a Terminal within the browser by selecting New Terminal.
    

![The navigation path to the New Terminal option in the Terminal submenu of the expanded naviagtion menu](https://cdn.qwiklabs.com/OT1O6e0jMpk2kH4l7As2GAPLdXD1GDK%2Fse908wrGNDo%3D align="left")

3. In the terminal enter the following command:
    

```apache
flutter create first_app
```

4. Move to the first\_app directory:
    

```apache
cd first_app
```

5. Close the terminal window:
    

```apache
exit
```

The `first_app` directory and template code have now been created.

## Task 3. Opening the new app

In this section explore the Flutter Web application called first\_app.

1. Open the folder `first_app`.
    
2. Acknowledge the on-screen notifications.
    

At this point you will have the Flutter application open in the current workspace.

## Task 4. Running the Flutter web application

In this section run the Flutter Web application from the command line.

1. In the editor, open a Terminal.
    
2. Ensure the terminal directory is set to `first_app`.
    
3. Run the Flutter web server:
    

```apache
fwr
```

4. The running web server should look similar to below:
    

![The running web server output](https://cdn.qwiklabs.com/KumcS%2BFTd5wF7eaee%2FARj%2F6Oc2hTg3E9UwYNERfTKvI%3D align="left")

5. Copy the Flutter Live Server address from the lab Panel.
    
6. Paste the address into a new browser tab.
    

The browser will render the web application e.g.

![The Flutter Demo Home Page displayed on a mobile phone screen](https://cdn.qwiklabs.com/vQHThflLRdWN4D30tlmdFKrHClP2kiAznEUwmCQpAKg%3D align="left")

**Note:** Rendering of the web application can take up to ten seconds. The view will show the application based on the code in the editor.

Feel free to interact with the running application.

## Task 5. Adding boilerplate code

In this section, replace the Flutter starter code with the example for this lab.

1. Replace the contents of `lib\main.dart` with the code below:
    

```apache
import 'package:flutter/material.dart';

// TODO: Embedded List
class GoogleProducts {
  final List<String> items = [
    'Cloud Functions',
    'App Engine',
    'Kubernetes Engine',
    'Compute Engine',
    'Bare Metal',
    'Pre-emtible VMs',
    'Shielded VMs',
    'Sole-tenet Nodes',
    'VMWare Engine',
    'Cloud Firestore',
    'Cloud Storage',
    'Persistent Disk',
    'Local SSD',
    'Cloud Bigtable',
    'Cloud Firestore',
    'Cloud Memorystore',
    'Cloud Spanner',
  ];
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    const title = 'Google Products';
    return const MaterialApp(
      title: title,
      debugShowCheckedModeBanner: false,
      home: ProductHomeWidget(title),
    );
  }
}

// TODO: ProductHomeWidget
class ProductHomeWidget extends StatelessWidget {
  final String title;

  const ProductHomeWidget(this.title, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(
          color: Colors.grey, //change your color here
        ),
        actions: const [
          AppBarActionsShare(),
        ],
        title: Text(title, style: const TextStyle(color: Colors.black)),
      ),
      body: ProductListView(),
      // TODO: Add Drawer
      // drawer: const MyDrawerWidget(),
    );
  }
}

// TODO: AppBarLeading
class AppBarLeading extends StatelessWidget {
  const AppBarLeading({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const IconButton(
      icon: Icon(
        Icons.menu,
      ),
      onPressed: null,
    );
  }
}

// TODO: AppBarActionsShare
class AppBarActionsShare extends StatelessWidget {
  const AppBarActionsShare({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IconButton(
        icon: const Icon(
          Icons.share,
        ),
        onPressed: () {
          const snackBar =
              SnackBar(content: Text('You selected the Action: Share'));
          ScaffoldMessenger.of(context).showSnackBar(snackBar);
        });
  }
}


// TODO: Enable Drawer
class MyDrawerWidget extends StatelessWidget {
  const MyDrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: const [
          DrawerHeader(
            child: Icon(Icons.flutter_dash, size: 35),
          ),
        ],
      ),
    );
  }
}

// TODO: ProductListView
class ProductListView extends StatelessWidget {
  final googleProducts = GoogleProducts();

  ProductListView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: googleProducts.items.length,
      itemBuilder: (context, index) {
        return ProductListTile(googleProducts.items[index]);
      },
    );
  }
}

// TODO: ProductListTile
class ProductListTile extends StatelessWidget {
  final String? productLabel;

  const ProductListTile(this.productLabel, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text('$productLabel', style: const TextStyle(color: Colors.black)),
      subtitle: const Text('SubTitle', style: TextStyle(color: Colors.black)),
      leading: const Icon(Icons.info, color: Colors.black),
      // When the child is tapped, show a snackbar.
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const MyDetails()),
        );
      },
    );
  }
}

// TODO: Add a details page
class MyDetails extends StatelessWidget {
  final title = 'Details Page';

  const MyDetails({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: DefaultTabController(
        length: 4,
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            elevation: 0,
            iconTheme: const IconThemeData(
              color: Colors.grey, //change your color here
            ),
            title: Text(title, style: const TextStyle(color: Colors.grey)),
            actions: const [
              AppBarActionsShare(),
            ],
            // TODO: Add TabBar
            // bottom: const TabBar(
            //   indicatorColor: Colors.black,
            //   tabs: [
            //     Tab(
            //       icon: Icon(Icons.home, color: Colors.grey),
            //       child: Text('Overview',
            //           style: TextStyle(
            //               color: Colors.grey, fontWeight: FontWeight.bold)),
            //     ),
            //     Tab(
            //       icon: Icon(Icons.favorite, color: Colors.grey),
            //       child: Text('Docs',
            //           style: TextStyle(
            //               color: Colors.grey, fontWeight: FontWeight.bold)),
            //     ),
            //     Tab(
            //       icon: Icon(Icons.list, color: Colors.grey),
            //       child: Text('Information',
            //           style: TextStyle(
            //               color: Colors.grey, fontWeight: FontWeight.bold)),
            //     ),
            //     Tab(
            //       icon: Icon(Icons.info, color: Colors.grey),
            //       child: Text('Other',
            //           style: TextStyle(
            //               color: Colors.grey, fontWeight: FontWeight.bold)),
            //     ),
            //   ],
            // ),
          ),
          // TODO: Add TabBarView
          // body: const TabBarView(
          //   children: [
          //     SizedBox(
          //       child: Center(
          //         child: Text('Tab Page 1'),
          //       ),
          //     ),
          //     SizedBox(
          //       child: Center(
          //         child: Text('Tab Page 2'),
          //       ),
          //     ),
          //     SizedBox(
          //       child: Center(
          //         child: Text('Tab Page 3'),
          //       ),
          //     ),
          //     SizedBox(
          //       child: Center(
          //         child: Text('Tab Page 4'),
          //       ),
          //     ),
          //   ],
          // ),
        ),
      ),
    );
  }
}
```

2. Perform a `hot restart` to review the changes to the Flutter user interface.
    
3. After updating `lib\main.dart` with the boilerplate code, refresh the application.
    

The Flutter app should now look similar to the image below:

![A mobile phone screen displaying a list of subtitles below the Google Products title](https://cdn.qwiklabs.com/37UW9N8E%2FhrNz5cCxf9M2iE0AGeaIYBRXObRL3dvyc8%3D align="left")

In the next section, we outline the application we will build in this lab.

## Task 6. Designing our application

In this section use widgets to enhance our basic two screen application.

1. First we will update the details page to incorporate a TabView.
    
    ![A list view to tab view illustration](https://cdn.qwiklabs.com/MYfL%2BeGckOTMxV1hAETbyIQeACiVKT8tyA1S0aPoVVs%3D align="left")
    

From the above sketch we note that our application uses the following types of widgets:

| **Widget** | **Description** |
| --- | --- |
| TabView | Tabbed page view for information |
| RichText | Enhanced text for displaying information |
| Image | Image display |

2. Then we will add a drawer navigation to provide quick access to information.
    

![A drawer navigation illustration](https://cdn.qwiklabs.com/%2BL1T89NP%2BvsOiXoyBy8dpRt5mVECm5wacto7Mm5YB1Q%3D align="left")

From the above sketch we note that our application uses the following types of widgets:

| **Widget** | **Description** |
| --- | --- |
| Drawer | Application navigation |
| Icon | Add an avatar to the Drawer |

In the next section, we discuss Adding the TabView to the application.

## Task 7. Including a TabView

Update the TabView setting to reference in the function `MyDetails`.

1. Find the following line(s) and uncomment the code (i.e. remove the `//` characters):
    

```javascript
  // TODO: Add TabBar
  // bottom: const TabBar(
  //   indicatorColor: Colors.black,
  //   tabs: [
  //     Tab(
  //       icon: Icon(Icons.home, color: Colors.grey),
  //       child: Text('Overview',
  //           style: TextStyle(
  //               color: Colors.grey, fontWeight: FontWeight.bold)),
  //     ),
  //     Tab(
  //       icon: Icon(Icons.favorite, color: Colors.grey),
  //       child: Text('Docs',
  //           style: TextStyle(
  //               color: Colors.grey, fontWeight: FontWeight.bold)),
  //     ),
  //     Tab(
  //       icon: Icon(Icons.list, color: Colors.grey),
  //       child: Text('Information',
  //           style: TextStyle(
  //               color: Colors.grey, fontWeight: FontWeight.bold)),
  //     ),
  //     Tab(
  //       icon: Icon(Icons.info, color: Colors.grey),
  //       child: Text('Other',
  //           style: TextStyle(
  //               color: Colors.grey, fontWeight: FontWeight.bold)),
  //     ),
  //   ],
  // ),
```

Your code should now look like this:

```javascript
 // TODO: Add TabBar
 bottom: const TabBar(
   indicatorColor: Colors.black,
   tabs: [
     Tab(
       icon: Icon(Icons.home, color: Colors.grey),
       child: Text('Overview',
           style: TextStyle(
               color: Colors.grey, fontWeight: FontWeight.bold)),
     ),
     Tab(
       icon: Icon(Icons.favorite, color: Colors.grey),
       child: Text('Docs',
           style: TextStyle(
               color: Colors.grey, fontWeight: FontWeight.bold)),
     ),
     Tab(
       icon: Icon(Icons.list, color: Colors.grey),
       child: Text('Information',
           style: TextStyle(
               color: Colors.grey, fontWeight: FontWeight.bold)),
     ),
     Tab(
       icon: Icon(Icons.info, color: Colors.grey),
       child: Text('Other',
           style: TextStyle(
               color: Colors.grey, fontWeight: FontWeight.bold)),
     ),
   ],
 ),
```

2. Perform a `hot restart` to review the changes to the Flutter user interface.
    

**Note:** TabBar provides a tab interface in your application. In the above code we add four tabs that will be used to show diffferent information. The tabs are functional and you can switch between them.

![A mobile phone screen diaplying the following tabs on the Details page: Overview, Docs, Information, and Other](https://cdn.qwiklabs.com/6rJyYClDlL%2Bw9wz9x9MVjgpcanvUTfzQ7vWg2pXAIg4%3D align="left")

At this point you will be able to move between the pages using the onscreen navigation.

In the next section, we add a TabBarView to the application.

## Task 8. Adding a TabBarView

Update the TabBarView setting referenced in the function `MyDetails`.

1. Find the following line(s) and uncomment the code (i.e. remove the `//` characters):
    

```javascript
 // body: const TabBarView(
 //   children: [
 //     SizedBox(
 //       child: Center(
 //         child: Text('Tab Page 1'),
 //       ),
 //     ),
 //     SizedBox(
 //       child: Center(
 //         child: Text('Tab Page 2'),
 //       ),
 //     ),
 //     SizedBox(
 //       child: Center(
 //         child: Text('Tab Page 3'),
 //       ),
 //     ),
 //     SizedBox(
 //       child: Center(
 //         child: Text('Tab Page 4'),
 //       ),
 //     ),
 //   ],
 // ),
```

Your code should now look like this:

```dart
 body: const TabBarView(
   children: [
     SizedBox(
       child: Center(
         child: Text('Tab Page 1'),
       ),
     ),
     SizedBox(
       child: Center(
         child: Text('Tab Page 2'),
       ),
     ),
     SizedBox(
       child: Center(
         child: Text('Tab Page 3'),
       ),
     ),
     SizedBox(
       child: Center(
         child: Text('Tab Page 4'),
       ),
     ),
   ],
 ),
```

2. Perform a `hot restart` to review the changes to the Flutter user interface.
    

**Note:** TabBarView provides a view per tab defined. As the application has four tabs, we create four TabBarViews that represent a unique page for displaying tab information.

![A mobile phone screen open on the Overview tabbed page which displays the follwoing text: Tab Page 1](https://cdn.qwiklabs.com/0MKEb%2B1Vw9tYZEpirfypuKz6cnDOxXUtCMhU%2B2t9Xbg%3D align="left")

Now as the tabs are selected, the associated page view is displayed

In the next section, we add a Drawer to perform application navigation.

## Task 9. Adding a drawer

Update the main menu icon to open a custom drawer in `ProductHomeWidget`.

1. Find the following line(s) and uncomment the code (i.e. remove the `//` characters):
    

```apache
  drawer: const MyDrawerWidget(),
```

Your code should now look like this:

```dart
class ProductHomeWidget extends StatelessWidget {
  final String title;

  const ProductHomeWidget(this.title, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(
          color: Colors.grey, //change your color here
        ),
        actions: const [
          AppBarActionsShare(),
        ],
        title: Text(title, style: const TextStyle(color: Colors.black)),
      ),
      body: ProductListView(),
      // TODO: Add Drawer
      drawer: const MyDrawerWidget(),
    );
  }
}
```

2. Perform a `hot restart` to review the changes to the Flutter user interface.
    

**Note:** Selecting the main menu now opens the Drawer. However it doesnt link to any of the existing pages as we havent told it to.

![A mobile phone screen displaying a blank page with an icon](https://cdn.qwiklabs.com/XScOEw%2Ftx25YzuM%2BBYlkzbadec2H%2F4nfm9EEQwaRmHE%3D align="left")

In the next section, update the Drawer to route to the home page.

## Task 10. Routing to Home

Update the custom drawer in `MyDrawerWidget` Route the Home drawer item to `MyApp` page.

1. Update the `DrawerHeader` and add a ListTile in the MyDrawerWidget build method:
    

```dart
  children: [
    const DrawerHeader(
      child: Icon(Icons.flutter_dash, size: 35),
    ),
    ListTile(
      leading: const Icon(Icons.home),
      title: const Text('Home'),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(builder: (context) => const MyApp()),
        );
      },
    ),
```

Your code should now look like this:

```dart
class MyDrawerWidget extends StatelessWidget {
  const MyDrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            child: Icon(Icons.flutter_dash, size: 35),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const MyApp()),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

2. Perform a `hot restart` to review the changes to the Flutter user interface.
    

![A mobile phone screen displaying a blank page with an icon and a Home button](https://cdn.qwiklabs.com/uJOnsvhAHgvWj2QAsqGN5k%2Bpipcvd%2FPS%2FjGG4%2FIQsek%3D align="left")

**Note:** Now when the home option is selected the Home page will open.

In the next section, update the Drawer to route to the Details page.

## Task 11. Routing to Details

Update the custom drawer in `MyDrawerWidget` and route the other Drawer items to the MyDetails page.

1. Add the following line(s) in the MyDrawerWidget build method:
    

```apache
  onTap: () {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (context) => const MyDetails()),
    );
  },
```

Your code should now look like this:

```dart
class MyDrawerWidget extends StatelessWidget {
  const MyDrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            child: Icon(Icons.flutter_dash, size: 35),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const MyApp()),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.info),
            title: const Text('Details'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const MyDetails()),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

2. Perform a `hot restart` to review the changes to the Flutter user interface.
    

![A mobile phone screen displaying a blank page with an icon, Home button, and Details button.](https://cdn.qwiklabs.com/s%2BHNkLN2QFR3JfjiwC1uJsj9%2F5NLH%2BoU4lPmc%2BQ%2BOgA%3D align="left")

**Note:** Now when the other options are selected the Details page will open.

Click *Check my progress* to verify the objective.

Assess my progress

---

## Solution of Lab

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756008563439/bf15e08f-a907-49d1-81be-5bcc30ca7a20.png align="center")