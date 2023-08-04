---
title: "The GraphOS Studio Explorer"
seoTitle: "The GraphOS Studio Explorer"
seoDescription: "Today, we’re introducing Apollo Sandbox – the quickest way to navigate and test your GraphQL endpoints."
datePublished: Fri Aug 04 2023 08:58:25 GMT+0000 (Coordinated Universal Time)
cuid: clkwcspvk001108jr28vpgijh
slug: the-graphos-studio-explorer
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1691139692558/c286662b-3e54-48ef-a26f-accda1377e2c.png
tags: graphql

---

---

1. One-click query building in Explorer
    

[![One-click query building in Explorer](https://github.com/hoangsvit/graphql-studio/raw/main/assets/img/1.gif align="left")](https://graphql-studio.eplus.dev/)

Typing out GraphQL queries by hand is time-consuming at best and a frustrating minefield of confusing paths, missed brackets, and incorrect variables at worst. Explorer offers no-code query-building to eliminate syntax errors and help you be more productive. Of course, if you still need to add hand-written code, you can do just that with Explorer’s editor with query linting and autocomplete.

1. ⌘ + K field and path search
    

[![⌘ + K field and path search](https://github.com/hoangsvit/graphql-studio/raw/main/assets/img/2.gif align="left")](https://graphql-studio.eplus.dev/)

Your graph may be very deep and have thousands of fields and types. You know what data you’re looking for but the more your graph scales, the more difficult it becomes to navigate the graph to get there. Explorer’s ⌘ + K intelligent search shows you all of the possible paths to a field or type. Choose the path you want to use, and our one-click query builder will add your query to the sandbox without writing a single line of code.

1. Flexible response formatting Once you’ve built your query, Explorer shows you the response in an interactive JSON or table format with collapsible sections and data sorting by clicking on table headers. You can also copy the response to your clipboard, download it as a CSV, or download the JSON.
    
2. Explore and test your local GraphQL server
    

Just because you’re working on your schema locally doesn’t mean that you shouldn’t have the best tools for the job. You can point Sandbox at any local GraphQL server and use it just as easily as other tools like GraphiQL or GraphQL Playground with zero setup. If you want to, you can even use Sandbox with production GraphQL APIs, although introspection needs to be enabled, and APIs that enforce CORS will need to allow our URL. That being said, here are a few public endpoints that you can try with Sandbox:

* [https://graphql-studio.eplus.dev/?endpoint=https://rickandmortyapi.com/graphql](https://graphql-studio.eplus.dev/?endpoint=https://rickandmortyapi.com/graphql)
    
* [https://graphql-studio.eplus.dev/?endpoint=https://graphql-demo.mead.io](https://graphql-studio.eplus.dev/?endpoint=https://graphql-demo.mead.io)
    
* [https://graphql-studio.eplus.dev/?endpoint=https://demo.saleor.io/graphql/](https://graphql-studio.eplus.dev/?endpoint=https://demo.saleor.io/graphql/)
    

1. No login required You can use the Schema Reference and Explorer in Sandbox with your GraphQL endpoint just by going to [graphql-studio.eplus.dev](https://graphql-studio.eplus.dev). You’ll never have to create an account or log in, though if you do we can show you your query history and open up some additional customization settings.