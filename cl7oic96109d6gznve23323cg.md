---
title: "[Packages] Beautiful Log Viewer for Laravel"
seoTitle: "[Packages] Beautiful Log Viewer for Laravel"
datePublished: Mon Sep 05 2022 08:35:15 GMT+0000 (Coordinated Universal Time)
cuid: cl7oic96109d6gznve23323cg
slug: packages-beautiful-log-viewer-for-laravel
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1662364757610/3sm3lcHbx.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1662366870896/tBZsKoHow.png

---

> Introducing the brand new Log Viewer for Laravel. Open-source with tons of features, fast and beautiful. What more do you need?

![log-viewer-screenshot.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662365283019/fCVOadK1z.png align="left")

Over the past month, I have been working on an improved and faster version of the log viewer that I released years ago. It really needed a refresh, especially after I've learned so much as a developer over the last few years. I knew I could do it better this time. So, without further ado...

Introducing, the brand new [Log Viewer for Laravel!](https://github.com/opcodesio/log-viewer) 🎉

Now, let's go over a few **key features** and changes to the updated Log Viewer.

### All Laravel logs in one place
Log Viewer supports single & daily [Laravel](https://laravel.com/) logs, as well as [Horizon](https://laravel.com/docs/9.x/horizon) logs!

![List of log files](https://cdn.hashnode.com/res/hashnode/image/upload/v1662365336149/bPv3_5RvA.png align="center")

If your log naming is different, or want to include additional files that don't get initially picked up, you can configure it in the `config/log-viewer.php` configuration:

![You can configure what files to include/exclude in Log Viewer](https://cdn.hashnode.com/res/hashnode/image/upload/v1662365373808/eZyMkgWSs.png align="center")

### Beautiful log previews

The logs are previewed in a clean way with subtle accents based on the severity of the log. This makes it easy to skim through the logs and find the right one.

Go ahead, and click on a log to show more details. While scrolling, the key log information stays sticky for convenience.

![Log entries for the selected log file](https://cdn.hashnode.com/res/hashnode/image/upload/v1662366547113/y8riyVzm2.png align="center")

The included **Search **and **Severity Filters** also help immensely with filtering out the logs to help you find what you're looking for. Click on a severity button to toggle it on/off.

### Links to individual logs

That's a wonderful feature when working in a team. Click on the index of the log on the right side and you will get the link to that individual log entry.

Share it with a team member, or put it on a project management ticket, bug report ticket, etc.

![Click on the log index to copy a link to it](https://cdn.hashnode.com/res/hashnode/image/upload/v1662366620804/_EqSSha6c.png align="center")

**Note:** be mindful of log rotation. These links point to a log file with a specific file name. If that file gets rotated by Laravel or other means, such as the default `laravel.log` file, the links may stop working or display a completely different log.

### Download and remove log files directly from the Log Viewer

Useful when managing tons of log files. It also allows you to download a log file from production, for example, for closer inspection locally.

![Download & delete log files easily](https://cdn.hashnode.com/res/hashnode/image/upload/v1662366690155/ZSot7IRot.png align="center")

### Clearer view with Shorter Stack Traces

Ever look at the logs and the stack traces are just difficult to read? Hundreds of lines of vendor method calls, make it hard to find what really matters.

![Enable shorter stack traces to reduce noise in the logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1662366722943/susDSCYSm.png align="center")

You can easily configure what stack trace lines get excluded from the log viewer in the `config/log-viewer.php` like so:

![Configure what lines get excluded from the stack traces](https://cdn.hashnode.com/res/hashnode/image/upload/v1662366752720/9uB4v02cj.png align="center")

Dark Mode

Log Viewer comes with a Dark Mode that looks beautiful. The selected mode is remembered in your browser and if you set it to "System", it will follow your system's preferred light/dark mode!

![Dark Mode](https://cdn.hashnode.com/res/hashnode/image/upload/v1662366781969/DIyKKqJSg.png align="center")

### And more...
 - Configurable log viewer URL & middleware
 - Display either the newest or the oldest logs first
 - Display up to 500 logs per page
 - Easy to use pagination
 - Quickly get back to your system/administration with a configurable link


