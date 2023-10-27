---
title: "[Vue packages] - viselect Visual dom-selection library"
seoTitle: "[Vue packages] - viselect Visual dom-selection library"
seoDescription: "Viselect - A high-performance and lightweight library to add a visual way of selecting elements, just like on your Desktop. Zero dependencies, super small"
datePublished: Fri Oct 27 2023 14:53:10 GMT+0000 (Coordinated Universal Time)
cuid: clo8qghjm000809l56wx5fk32
slug: vue-packages-viselect-visual-dom-selection-library
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1698418412844/05e59716-0497-41e3-8bb7-b5a2977ba38d.gif
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1698418335733/e94e6cc1-1117-4b43-9651-91463b6c6e1a.png
tags: library, vuejs, packages, viselect

---

### [Features](https://github.com/Simonwep/selection#features-) 🤘

* 🌟 Modern bundle
    
* 🔩 Ultra tiny (~4kb)
    
* 👌 Simple usage
    
* ⚡ Highly optimized
    
* ✔ Zero dependencies
    
* 📱 Mobile/touch support
    
* 🖱 Vertical and horizontal scroll support
    
* 💪 Hardened (over 3 years old and used in many apps)
    
* 🖼 Support for major frameworks (WIP)
    

### [Getting started](https://github.com/Simonwep/selection#getting-started)

Check out the documentation for the package you want to use:

* [@viselect/vanilla](https://github.com/simonwep/selection/blob/master/packages/vanilla) ([demo](https://codesandbox.io/s/viselectvanilla-kt332?file=/src/main.ts)) - To be used with plain [JavaScript](http://vanilla-js.com/) or [TypeScript](https://www.typescriptlang.org/).
    
* [@viselect/preact](https://github.com/simonwep/selection/blob/master/packages/preact) ([demo](https://codesandbox.io/s/viselectpreact-kjo9e?file=/src/app.tsx)) - [Preact](https://preactjs.com/) wrapper.
    
* [@viselect/react](https://github.com/simonwep/selection/blob/master/packages/react) ([demo](https://codesandbox.io/s/viselectreact-sbn83?file=/src/App.tsx)) - [React](https://reactjs.org/) wrapper.
    
* [@viselect/vue](https://github.com/simonwep/selection/blob/master/packages/vue) ([demo](https://codesandbox.io/s/viselectvue-x13g6?file=/src/App.vue)) - [Vue3](https://v3.vuejs.org/) wrapper.
    
* @viselect/lit - TBA (planned).
    
* @viselect/svelte - TBA (planned).
    
* @viselect/angular - TBA (planned).
    

> Check out [recipes](https://github.com/simonwep/selection/blob/master/packages/vanilla/recipes.md) for commonly asked questions and how to solve them using the standart library! For information about events and more check out the [vanilla readme](https://github.com/simonwep/selection/blob/master/packages/vanilla/README.md)!

### [Browser support](https://github.com/Simonwep/selection#browser-support)

This library will always have the previous year as its target. For 2021 for example the target will be ES2020. It always provides both a `UMD` (`.js`) and `.mjs` version. If you want to support legacy browsers, please use the feature of your bundler to transpile dependencies. In the case of Webpack and Babel (give [Vite](https://vitejs.dev/) a try, it's awesome) you'll have to install corresponding plugins such as [babel-plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining) and include the dependency from `node_modules` which is normally entirely excluded from being processed.

I do this to provide maximum flexibility and give those who target ESNext a chance to make full use of how this library is bundled. Everything else is just a matter of configuration :)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698418305570/b374627f-f20f-4505-a73d-b27b02caa220.gif align="center")

%[https://codesandbox.io/s/viselectvue-x13g6?file=/src/App.vue] 

### [Is this library the right choice for me?](https://github.com/Simonwep/selection#is-this-library-the-right-choice-for-me)

Viselect primarily focuses on being a high-performant engine to select elements with various boundaries, behaviors, and modes in your browser. Viselect is to "full-blown libraries" what is [popper.js](https://popper.js.org/) to [tippy.js](https://atomiks.github.io/tippyjs/) - the *core* of your feature / of another library.

### [Development](https://github.com/Simonwep/selection#development)

Use the following commands to work on this locally (we use [Lerna](https://lerna.js.org/) to manage this):

* `npm run dev` *\- Spawns a dev server for all packages. Every framework-dependent package is bundled with the vanilla version.*
    
* `npm run build` *\- Builds all packages in parallel.*
    
* `npm run lint:fix` *\- Lints and fixes all errors in all packages.*
    

For the development servers, [vite](https://vitejs.dev/) is used. It's superb, you should give it a try. To bundle it we use [rollup](https://rollupjs.org/) (which is btw also used by Vite behind the scenes) to have full control over how the bundle looks.

### [Releasing a new version](https://github.com/Simonwep/selection#releasing-a-new-version)

This project is managed via [Lerna](https://lerna.js.org/). To bump the version and publish a new one run the following commands:

* `lerna version`
    
* `lerna publish from-package`