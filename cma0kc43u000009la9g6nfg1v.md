---
title: "Open Source UI-TOOLS for Designer/Developer"
seoTitle: "Open Source UI-TOOLS for Designer/Developer"
seoDescription: "UI Tools is an open-source ui-tools for design engineers and developers. It's a creative toolbox featuring shadow, SVG, gradient, background pattern generat"
datePublished: Mon Apr 28 2025 04:13:10 GMT+0000 (Coordinated Universal Time)
cuid: cma0kc43u000009la9g6nfg1v
slug: open-source-ui-tools-for-designerdeveloper
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745813255866/df17aa0e-86c1-4634-9592-c34e4dc79193.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745813566117/2b02af80-011e-4549-9764-59b6c0128591.jpeg
tags: opensource, designer, developer, open-source-ui-tools-for-designerdeveloper

---

UI Tools is an open-source ui-tools for design engineers and developers. It's a creative toolbox featuring shadow, SVG, gradient, background pattern generators, and color. Open-source, fast, and made for builders.

## **Installation**

You must install `tailwindcss`. As most of our components use `motion` install it too.

```apache
npm install motion clsx tailwind-merge
```

Must add it in the `utils.ts`:

```apache
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use these hooks for mediaQueries:

```javascript
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
```

## **Tools**

* [Mesh-Gradients](https://tools.ui-layouts.com/mesh-gradients)
    
* [Shadows](https://tools.ui-layouts.com/shadows)
    
* [Svg Clip-Path](https://tools.ui-layouts.com/clip-paths)
    
* [BG Snippets](https://tools.ui-layouts.com/background-snippets)
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745813380961/580295e9-6152-4b45-9465-689c96624266.png align="center")