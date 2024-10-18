---
title: "Fonts matter"
seoTitle: "Fonts matter"
seoDescription: "I like to think of my code as a book. Not just any book, I think of it as a precious, beautifully designed work of art. Something I want to WANT to read."
datePublished: Mon Jan 30 2023 02:46:19 GMT+0000 (Coordinated Universal Time)
cuid: cldi7lqv3000108l47djmhs7t
slug: fonts-matter
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1675046367203/47301240-4bac-4031-b8a3-ca1698138820.webp
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1675046729852/2b0c2d78-104b-46f2-bfd2-8953bb21e681.webp
tags: idees-pour-gagner-de-largent-pour-une-association-demande-de-don-idee-pour-recolter-des-fonds-pour-ecole-maternelle-idee-action-association-parents-deleves-exemple-de-lettre-de-demande-daide-pour-la-construction-dune-eglise

---

%[https://youtu.be/1UxQX00BZug] 

I like to think of my code as a book. Not just any book, I think of it as a precious, beautifully designed work of art. Something I want to *WANT* to read. You know why? Because programming is so much more about reading and understanding code, than it is about writing.

I would say that “writing code” is only the lesser part of my programming life. So naturally, I have much to gain by making the “reading part” as pleasant as possible.

So, let's work from an example:

```php
final class CodeController
{
    public function __construct(private MarkdownConverter $markdown) {}

    public function __invoke(string $slug)
    {
        $code = $this->markdown->convert(file_get_contents(__DIR__ . "/code/{$slug}.md"))->getContent();

        return view('code', [
            'code' => $code,
        ]);
    }
}
```

First things first, I choose a large font. My brain can only read so many characters per second, so I don’t need to try and fit as much code as possible on screen, at all times.

```php
final class CodeController
{
    public function __construct(private MarkdownConverter $markdown) {}

    public function __invoke(string $slug)
    {
        $code = $this->markdown->convert(file_get_contents(__DIR__ . "/code/{$slug}.md"))->getContent();

        return view('code', [
            'code' => $code,
        ]);
    }
}
```

I choose a font that’s pleasant to read, modern fonts suit me better than the ones that originated back in the 80s or 90s.

```php
final class CodeController
{
    public function __construct(private MarkdownConverter $markdown) {}

    public function __invoke(string $slug)
    {
        $code = $this->markdown->convert(file_get_contents(__DIR__ . "/code/{$slug}.md"))->getContent();

        return view('code', [
            'code' => $code,
        ]);
    }
}
```

I increase the line height, because it gives my code some room to breathe, and makes it even easier to read.

```php
final class CodeController
{
    public function __construct(private MarkdownConverter $markdown) {}

    public function __invoke(string $slug)
    {
        $code = $this->markdown->convert(file_get_contents(__DIR__ . "/code/{$slug}.md"))->getContent();

        return view('code', [
            'code' => $code,
        ]);
    }
}
```

Finally, I make sure that my code isn’t too wide. The less I need to move my eyes from left to right, the easier it is.

```php
final class CodeController
{
    public function __construct(
        private MarkdownConverter $markdown,
    ) {}

    public function __invoke(string $slug)
    {
        $path = file_get_contents(__DIR__ . "/code/{$slug}.md");
        
        $code = $this->markdown
            ->convert($path)
            ->getContent();

        return view('code', [
            'code' => $code,
        ]);
    }
}
```

Looking at typography guidelines, the maximum advised length is somewhere between 60 and 80 characters. I think somewhere between 80 and 100 works well, because code also includes lots of tabs.

Have you considered typography when programming? Give it a try, it’ll make a lasting impression.

Source:

%[https://stitcher.io/blog/fonts-matter]