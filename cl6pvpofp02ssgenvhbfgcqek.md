---
title: "iHateRegex - a regex cheatsheet for the haters - don't just use; understand."
seoTitle: "iHateRegex - a regex cheatsheet for the haters - don't just use; under"
seoDescription: "Visual representation of regular expressions - Matched strings - the Testing area -  Embed regular expression visualization on your sites - Regex code high"
datePublished: Fri Aug 12 2022 02:57:40 GMT+0000 (Coordinated Universal Time)
cuid: cl6pvpofp02ssgenvhbfgcqek
slug: ihateregex-a-regex-cheatsheet-for-the-haters-dont-just-use-understand
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1660272137543/zIuB4ynVR.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1660272957129/dhIdTpWz0.png
tags: regex, ihateregex

---

# iHateRegex 😈

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1660271914145/dY7KpoKZK.png align="center")

**don't just use; understand.**

[**iHateRegex.io**](https://ihateregex.io) - a regex cheatsheet for the haters.

## Features 😎

* \[x\] Visual representation of regular expressions
    
* \[x\] Matched strings - the Testing area
    
* \[x\] Embed regular expression visualization on your sites
    
* \[x\] Regex code highlighting and validation
    
* \[x\] Regex description with markdown support
    
* \[ \] [Playground page](https://ihateregex.io/playground) where you can create your own expression and link to it.
    
* \[ \] User login and save the regex
    

## Setup 🚀

1. Install [yarn](https://yarnpkg.com/)
    
2. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this repo
    
3. Install dependencies ⚙️
    

```bash
$ yarn install
```

1. Test on localhost 🛠
    

```bash
# serve with hot reload at localhost:3600
$ yarn dev
```

1. Build and Start nuxt server 🚀
    

```bash
# build for production and launch server
$ yarn build
$ yarn start
```

This project is built with Nuxt.js 🙌

For a detailed explanation of how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Contribute Regex 🙏

Contribute to this project and make this the largest collection of useful expressions 😍

You can also submit regex via this [google form](https://forms.gle/Cwo3VupujQJzeoYQ9)

### To contribute:

- Add your regex to `/static/regex/data.json`
    
```json
    {
      "id": "username",
      "title": "username",
      "tagline": "match a username",
      "description": "Alphanumeric string that may include _ and - having a length of 3 to 16 characters.",
      "regex": "^[a-z0-9_-]{3,15}$",
      "flag": "gm",
      "matchText": [
        "lorem",
        "ipsum",
        "gr3at",
        "a",
        "ab",
        "abcd",
        "abcde",
        "john doe",
        "johnny",
        "abcdefghijklmnopqrst"
      ],
      "cheatRegex": [
        "/^/",
        "/$/",
        "/[a-zA-Z0-9]/",
        "/(hello){1,3}/"
      ],
      "embedHeight": 300,
      "tags": [
        "name",
        "slug"
      ]
    }
    ```

| Property | Definition |
|------|------------|
|  id|  this is the slug and also the short name of the regex. cannot contain spaces and only contain url-safe characters|
|  title |  Title of the page. |
| tagline  |  Tagline |
| description  | First line under the tagline and also the meta description |
|  regex |  The actual regex string |
| flag  |  regex flags associated with the expression. eg; g |
| matchText  | Array(line by line) of strings to be included in the string matching are  |
|  cheatRegex | refer `static/regex/cheatsheet.json` and see what all cheats are relevent to this expression. (you can also add your own cheats into cheatsheet.json and refer to that) |
|  embedHeight | Height in pixels of the regex visualization embed  |
| tags  | tags related to the expression (to be used later)  | 

- Create a markdown file in `/static/regex/markdown/` named `<regex-id>.md` for longer description and explanation
    
    *&lt;regex-id&gt; is the* ***id*** *from* ***data.json***
    

That's it 🙌 Go ahead and shoot a new pull request✨✨

### Descriptions

There are 2 descriptions for each regex.

* One is the **description** property inside `/static/regex/data.json`.
    
    * This is used for page **meta description** as well.
        
    * This is the **first description**
        
* Second is a dedicated **markdown file** in `/static/regex/markdown/<file>.md`
    
    * This should explain how the expression works in detail.
        
    * This is the **long description**
        

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1660272893736/0siiEuAHF.png align="center")

| Property | Definition | example |
| --- | --- | --- |
| **description** property inside `data.json` | This should explain about what the target match is in a few lines. It should not contain any html or markdown | A username is a unique identifier given to accounts in websites and social media |
| dedicated **markdown file** | Explain about the expression and how it works | ip addresses are of the range 0.0.0.0 - 255.255.255.255. The expression matches the ....(more) |