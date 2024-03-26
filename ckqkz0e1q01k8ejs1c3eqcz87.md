---
title: "How did I build a free status page for my website?"
datePublished: Thu Jul 01 2021 13:33:58 GMT+0000 (Coordinated Universal Time)
cuid: ckqkz0e1q01k8ejs1c3eqcz87
slug: how-did-i-build-a-free-status-page-for-my-website
canonical: https://dev.to/hoangit/how-did-i-build-a-free-status-page-for-my-website-1i19
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1625147748932/bb2ravAg8.png

---

In the days of the Covid-19 lockdown in Ho Chi Minh, Vietnam. I have been working from home for the past 2 months. In my free time, I share how to create a status statistics page, although it seems quite new or there are paid packages with great features, but for personal needs I choose free services.

You can see my site demo at http://status.eplus.dev

![image](https://cdn.hashnode.com/res/hashnode/image/upload/v1625147736658/_abt7D_CZ.png)

[You can register here](https://updown.io/r/5Rnx7 "You can register here")
 
Sign up for an account
![image](https://cdn.hashnode.com/res/hashnode/image/upload/v1625147738619/9IVzxQE2Q.png)

Enter the website address you need to track
![image](https://cdn.hashnode.com/res/hashnode/image/upload/v1625147740635/rhupv_9Q2.png)

See the stats page we just created will have the format https://updown.io/xxxx . Example: https://updown.io/2yy9
![Screenshot 2021-07-01 202037](https://cdn.hashnode.com/res/hashnode/image/upload/v1625147742810/OHjk3AKhl.png)

Don't forget to make your page public
![Screenshot 2021-07-01 203150](https://cdn.hashnode.com/res/hashnode/image/upload/v1625147744921/ikM36-dtG.png)

#### Custom domain status page
In order to have your status page available under your own subdomain,
you need to create a CNAME record from your subdomain to xxxx.status.updown.io
(xxxx being your check token, visible in your status page URL).

For example, in order to direct https://status.example.com to https://updown.io/2yy9,
you need to create a CNAME entry status.example.com pointing to 2yy9.status.updown.io.
Example: https://status.eplus.dev

An SSL certificate will automatically be generated for your custom domains.
Also, your status page must be PUBLIC, otherwise you'll get a 404.

![Screenshot 2021-07-01 203028](https://cdn.hashnode.com/res/hashnode/image/upload/v1625147746879/f19WGzokE.png)

Good luck
 