---
title: "Nuxt 3.5.0: Introducing Vue 3.3, New Defaults, Interactive Server Components, Typed Pages, and More"
seoTitle: "Nuxt 3.5.0: Introducing Vue 3.3, New Defaults, Interactive Server Comp"
seoDescription: "Nuxt 3.5.0 is a significant release that brings several new features and enhancements. It includes Vue 3.3, which introduces exciting features and improved"
datePublished: Wed May 17 2023 15:40:45 GMT+0000 (Coordinated Universal Time)
cuid: clhrvdtml00000amc2a4nec4r
slug: nuxt-3-5-0-introducing-vue-3-3-new-defaults-interactive-server-components-typed-pages-and-more
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1684337586584/25195fb5-9e88-432c-b036-1d1de8aaaafa.webp
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1684337981737/21abac56-e423-41aa-8601-e9dfdc28d230.webp

---

## ⚡️ [Vue 3.3 released](https://nuxt.com/blog/v3-5#%EF%B8%8F-vue-33-released)

Vue 3.3 has been released, with lots of exciting features, particularly around type support.

* new `defineOptions` macro
    
* 'generic' components
    
* typed slots and using external types in defineProps
    
* ... and more
    

This also brings a significant improvement to data fetching when navigating between nested pages ([#20777](https://github.com/nuxt/nuxt/pull/20777)), thanks to [@antfu](https://github.com/antfu) and [@baiwusanyu-c](https://github.com/baiwusanyu-c).

Read [**the full release announcement**](https://blog.vuejs.org/posts/vue-3-3) for more details.

### 🙌 [Nitropack v2.4](https://nuxt.com/blog/v3-5#nitropack-v24)

We've been working on lots of improvements to Nitro and these have landed already in Nitro v2.4 - you may already have this upgrade, which contains a lot of bug fixes, updates to the module worker format for Cloudflare, Vercel KV support and more.

One note: if you're deploying to Vercel or Netlify and want to benefit from incremental static regeneration, you should now update your route rules:

```javascript
routeRules: {
--  '/blog/**': { swr: 3000 },
++  '/blog/**': { isr: 3000 },
}
```

Read [**the full release notes**](https://github.com/unjs/nitro/releases/tag/v2.4.0).

### 💖 [Rich JSON payloads](https://nuxt.com/blog/v3-5#rich-json-payloads)

**Rich JSON payload serialisation** is now enabled by default ([#19205](https://github.com/nuxt/nuxt/pull/19205), [#20770](https://github.com/nuxt/nuxt/pull/20770)). This is both faster and allows serialising complex objects in the payload passed from the Nuxt server to client (and also when extracting payload data for prerendered sites).

This now means that **various rich JS types are supported out-of-the-box**: regular expressions, dates, Map and Set and BigInt as well as NuxtError - and Vue-specific objects like `ref`, `reactive`, `shallowRef` and `shallowReactive`.

You can find [an example](https://github.com/nuxt/nuxt/blob/main/test/fixtures/basic/pages/json-payload.vue) in our test suite.

This is all possible due to [Rich-Harris/devalue#58](https://github.com/Rich-Harris/devalue/pull/58). For a long time, Nuxt has been using our own fork of devalue owing to issues serialising Errors and other non-POJO objects, but we now have transitioned back to the original.

You can even register your own custom types with a new object-syntax Nuxt plugin:

plugins/custom-payload-type.ts

```javascript
export default definePayloadPlugin(() => {
  definePayloadReducer('BlinkingText', data => data === '<original-blink>' && '_')
  definePayloadReviver('BlinkingText', () => '<revivified-blink>')
})
```

You can read more about how this works [here](https://github.com/rich-harris/devalue#custom-types).

## 🛝 [Interactive server components](https://nuxt.com/blog/v3-5#interactive-server-components)

This feature should be considered highly experimental, but thanks to some great work from [@huang-julien](https://github.com/huang-julien) we now support interactive content within server components via *slots* ([#20284](https://github.com/nuxt/nuxt/pull/20284)).

You can follow the server component roadmap at [#19772](https://github.com/nuxt/nuxt/issues/19772).

## ⏰ [Environment config](https://nuxt.com/blog/v3-5#environment-config)

You can now configure fully typed, per-environment overrides in your `nuxt.config`:

```javascript
export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {
    //
  }
})
```

Copy to clipboard

If you're authoring layers, you can also use the `$meta` key to provide metadata that you or the consumers of your layer might use.

Read more [about per-environment overrides](https://github.com/nuxt/nuxt/pull/20329).

## 💪 [Fully typed pages](https://nuxt.com/blog/v3-5#fully-typed-pages)

You can benefit from fully typed routing within your Nuxt app via this experimental integration with [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) - thanks to some great work from [@posva](https://github.com/posva)!

Out of the box, this will enable typed usage of [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to), [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), `router.push()` and more.

You can even get typed params within a page by using `const route = useRoute('route-name')`.

Enable this feature directly in your `nuxt.config`:

nuxt.config.ts

```javascript
export default defineNuxtConfig({
  experimental: {
    typedPages: true
  }
})
```

Copy to clipboard

## 🔎 ['Bundler' module resolution](https://nuxt.com/blog/v3-5#bundler-module-resolution)

We now have full support within Nuxt for the `bundler` strategy of [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html).

We would recommend adopting this if possible. It has type support for subpath exports, for example, but more exactly matches the behaviour of build tools like Vite and Nuxt than `Node16` resolution.

nuxt.config.ts

```javascript
export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler'
      }
    }
  }
})
```

Copy to clipboard

This turns on TypeScript's ability to 'follow' Node subpath exports. For example, if a library has a subpath export like `mylib/path` that is mapped to `mylib/dist/path.mjs` then the types for this can be pulled in from `mylib/dist/path.d.ts` rather than requiring the library author to create `mylib/path.d.ts`.

## ⚗️ [Separate server types](https://nuxt.com/blog/v3-5#%EF%B8%8F-separate-server-types)

We plan to improve clarity within your IDE between the 'nitro' and 'vue' part of your app, we've shipped the first part of this via a separate generated `tsconfig.json` for your [`~/server`](https://nuxt.com/docs/guide/directory-structure/server) directory ([#20559](https://github.com/nuxt/nuxt/pull/20559)).

You can use by adding an additional `~/server/tsconfig.json` with the following content:

```json
{  
    "extends": "../.nuxt/tsconfig.server.json"
}
```

Copy to clipboard

Although right now these values won't be respected when type checking (`nuxi typecheck`), you should get better type hints in your IDE.

## 💀 [Deprecations](https://nuxt.com/blog/v3-5#deprecations)

Although we have not typed or documented the `build.extend` hook from Nuxt 2, we have been calling it within the webpack builder. We are now explicitly deprecating this and will remove it in a future minor version.

## ✅ [Upgrading](https://nuxt.com/blog/v3-5#upgrading)

As usual, our recommendation for upgrading is to run:

```apache
nuxi upgrade --force
```

Copy to clipboard

This will refresh your lockfile as well, and ensures that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

## 📃 [Full changelog](https://nuxt.com/blog/v3-5#full-changelog)

Read the full release note on [https://github.com/nuxt/nuxt/releases/tag/v3.5.0](https://github.com/nuxt/nuxt/releases/tag/v3.5.0)

Source:

%[https://nuxt.com/blog/v3-5]