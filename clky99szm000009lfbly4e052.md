---
title: "Working with Markdown in PHP"
seoTitle: "Working with Markdown in PHP"
seoDescription: "Markdown is a markup language that is quite useful for web developers. It can be used for writing technical documentation, blogs, books, and even writing co"
datePublished: Sat Aug 05 2023 16:55:16 GMT+0000 (Coordinated Universal Time)
cuid: clky99szm000009lfbly4e052
slug: working-with-markdown-in-php
canonical: https://ashallendesign.co.uk/blog/working-with-markdown-in-php
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1691254445101/863155b7-4afe-497e-bf80-e17a1111b588.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1691254484964/8d50643e-5314-4f3d-bf4f-6be4d2b2100b.png

---

Markdown is a markup language that is quite useful for web developers. It can be used for writing technical documentation, blogs, books, and even writing comments on websites, such as GitHub.

In this article, we’ll take a look at what Markdown is, the benefits of using it, and how to convert Markdown to HTML using PHP. We'll also cover how you can create your own CommonMark PHP extensions to add new features and syntax to your Markdown files.

## **What is Markdown?**

Before we touch any code, let's first take a look at what Markdown is, its history, and a few different examples of how you can use it.

Markdown is a markup language that you can use to create formatted text, such as HTML. For example, in a Markdown file, you can write `# Heading 1`, which can be converted to the following HTML: `<h1>Heading 1</h1>`. It allows you to write, for example, documentation without prior knowledge of the intended output format (in this case, HTML). It allows you to create other elements, such as the following:

* `## Heading 2` which would output: `<h2>Heading 2</h2>`
    
* `**Bold text**` which would output: `<strong>Bold text</strong>`
    
* `_Italic text_` which would output: `<em>Italic text</em>`
    

You can even write tables like this:

```markdown
| Name  | Age | Favorite Color |
|-------|-----|------------------|
| Joe   | 30  | Red              |
| Alice | 41  | Green            |
| Bob   | 52  | Blue             |
```

This table would be output as the following HTML:

```xml
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Favorite Color</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Joe</td>
            <td>30</td>
            <td>Red</td>
        </tr>
        <tr>
            <td>Alice</td>
            <td>41</td>
            <td>Green</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>52</td>
            <td>Blue</td>
        </tr>
    </tbody>
</table>
```

Markdown was initially created in 2004 by John Gruber and Aaron Swartz, with the main goal of readability. They intended for it to be a markup language that was easy to understand without it being rendered. For example, in general, you can clearly see the contents of a table in Markdown (like in the example shown above) without having to convert and render it first. Whereas, viewing a table in HTML isn't always as easy to understand at first glance.

When Markdown was first created, the initial specification for the language was built around a syntax description and a Perl script (called [Markdown.pl](http://Markdown.pl)). You could run your Markdown contents through the script, and it would output HTML. However, the initial script had some bugs and ambiguities in the original syntax description. Hence, as the script got ported over to different languages and software, it resulted in many implementations. This meant that running your Markdown contents through one converter would potentially lead to different output than running it through another converter.

Therefore, to address this issue, a specification named CommonMark was released in 2014. In [CommonMark's](https://commonmark.org/) own words, it's a "strongly defined, highly compatible specification of Markdown". The specification aims to remove ambiguity so that regardless of which CommonMark-compatible script you use to convert Markdown, the output is always the same.

CommonMark is used by various sites, such as GitHub, GitLab, Reddit, Discourse, Stack Overflow, and Stack Exchange. Thus, whenever you are writing Markdown on one these sites, they'll convert it using the site’s specification. Although, it is worth noting that some of these, such as GitHub, use their own "flavor" of Markdown. For example, GitHub uses "GitHub Flavored Markdown" (GFM) which is a superset of CommonMark with extra options (usually referred to as extensions). Hence, you can use the existing CommonMark features, but with added enrichment. To give this a bit of context, we'll take a quick look at an example of something that is supported in GFM but not in the regular CommonMark specification:

GFM allows you to add strikethrough text:

```markdown
~~This is strikethrough~~. This is not.
```

Using GFM, this would result in the following output:

```xml
<del>This is strikethrough</del>. This is not.
```

## **The Benefits of Using Markdown**

As a developer, using Markdown can be quite beneficial. It can be used when writing documentation for you project, package, or library. You can also use it for technical writing, such as for a blog. In fact, if you've ever read over a "README" file on GitHub for a package that you're using in your project, it has been written using Markdown.

As we've already seen above, Markdown can help provide semantic meaning to your content; and in most cases, it doesn't need to be rendered for you to understand it. This is useful when multiple people are contributing to a file because familiarity with the styling of the output is not required. For example, the contents of the Laravel documentation are contained within a repository on GitHub ([laravel/docs](https://github.com/laravel/docs)). It's completely open for anyone to contribute to it without needing to know about CSS classes or styling that the site will use during rendering. This means that anyone familiar with Markdown can jump right in and start contributing with a minimal amount of blockers.

Another significant benefit of using Markdown is its generally platform-agnostic nature. Have you ever created a document in Microsoft Word, opened it in Google Docs, and found that the document looks different? Maybe the tables aren't the same size? Alternatively, the text that goes perfectly to the end of the page in Word overflows onto the next page in Google Docs? Markdown reduces the likelihood of these issues by only worrying about structure, not styling. Instead, the styling would typically be placed on the HTML output.

Because Markdown usually only defines the structure and content rather than the styling, Markdown can be converted into many formats. Therefore, you can convert contents to both HTML and other formats, such as PDF, EPUB, and MOBI. You might want to use these formats if you're using Markdown to write an e-book that will be read on e-readers.

## **Rendering Markdown in PHP Using CommonMark in PHP**

Now that we've taken a brief look at what Markdown is and some of its benefits, let's explore ways to use it in our PHP projects.

To render Markdown files, we'll use the `league/commonmark` package. You can read the full [documentation for the package here](https://commonmark.thephpleague.com/).

### **Installing the Package**

To install the package using Composer, we'll use the following command:

```apache
composer require league/commonmark    
```

### **Basic Usage**

After you've installed the package, you'll be able to render HTML:

```php
use League\CommonMark\CommonMarkConverter;
 
$output = (new CommonMarkConverter())->convert('# Heading 1')->getContent();
 
// $output will be equal to: "<h1>Heading One</h1>"
```

As you can see, it's very easy to use!

The package also comes with a `GithubFlavoredMarkdownConverter` class that we can use to convert Markdown to HTML using the "GitHub Flavored Markdown" flavor. We can call it exactly the same as the `CommonMarkConvert` class:

```php
use League\CommonMark\GithubFlavoredMarkdownConverter;
 
$output = (new GithubFlavoredMarkdownConverter())->convert('~~This is strikethrough~~. This is not.')->getContent();
 
// $output will be equal to: "<del>This is strikethrough</del>. This is not."
```

It's worth noting that calling the `convert` method returns a class that implements the `League\CommonMark\Output\RenderedContentInterface` interface. As well as being able to call the `getContent` method to get the HTML, you can also cast the object to a string to achieve the same output:

```php
use League\CommonMark\GithubFlavoredMarkdownConverter;
 
$output = (string) (new GithubFlavoredMarkdownConverter())->convert('~~This is strikethrough~~. This is not.');
 
// $output will be equal to: "<del>This is strikethrough</del>. This is not."
```

### **Configuration and Security**

By default, the CommonMark PHP package was designed to be 100% compliant with the CommonMark specification. However, depending on your project and how you're using Markdown, you might want to change the configuration used for conversion to HTML.

For example, if we wanted to prevent `<strong>` HTML tags from being rendered, we could set our configuration and pass it to our convert:

```php
use League\CommonMark\CommonMarkConverter;
 
$config = [
    'commonmark' => [
        'enable_strong' => false,
    ]
];
 
$output = (new CommonMarkConverter($config))->convert('**This text is bold**')->getContent();
 
// $output will be equal to: "Heading One"
```

As you can see, we defined the config in a `$config` variable and then passed it to the `CommonMarkConverter`'s constructor. This resulted in the output text not being included the `<strong>` tag.

We can also use the configuration to improve the security of our output HTML.

For example, let's imagine that we have a blog, and we allow readers to comment on the blog posts using Markdown. Therefore, whenever a reader loads a blog post in their browser, the comments will also be displayed. Because Markdown can include HTML in it, malicious comments could create a cross-site scripting(XSS) attack.

To give this some context, let's take a look at how the CommonMark PHP package converts by default:

```php
use League\CommonMark\CommonMarkConverter;
 
$output = (new CommonMarkConverter())->convert('Before <script>alert("XSS Attack!");</script> After')->getContent();
 
// $output will be equal to: "Before <script>alert("XSS Attack!");</script> After"
```

As you can see, the `<script>` tags weren't removed or escaped! Thus, if this was rendered in a user's browser, whatever is inside the `<script>` tags will be run.

To prevent this from happening again, you can take two different approaches: escape the HTML, or remove it altogether.

To start, we could escape the HTML by setting the `html_input` configuration option to `escape`:

```php
use League\CommonMark\CommonMarkConverter;
 
$output = (new CommonMarkConverter(['html_input' => 'escape']))->convert('Before <script>alert("XSS Attack!");</script>')->getContent();
 
// $output will be equal to: "Before &lt;script&gt;alert("XSS Attack!");&lt;/script&gt; After"
```

Alternatively, if we wanted to completely remove the HTML, we could set the `html_input` configuration option as `strip`:

```php
use League\CommonMark\CommonMarkConverter;
 
$output = (new CommonMarkConverter(['html_input' => 'strip']))->convert('Before <script>alert("XSS Attack!");</script>')->getContent();
 
// $output will be equal to: "Before  After"
```

For a full list of the configuration and security options that the CommonMark PHP package offers, you can [check out the documentation](https://commonmark.thephpleague.com/2.3/configuration/).

## **Using CommonMark PHP Extensions**

One of the cool things about the CommonMark package is that it allows you to use extensions to enrich Markdown by adding new syntax and features that the parser can use.

The package ships with 18 extensions out-the-box that you can use immediately in your projects. To show you how to make use of one of these extensions, we'll take a look at how to use the "Table of Contents" extension to add a table of contents to our output HTML.

To start, we'll need to define our config using a `table_of_contents` field and pass it to a new Markdown environment so that we can convert out Markdown:

```php
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use League\CommonMark\Extension\TableOfContents\TableOfContentsExtension;
use League\CommonMark\MarkdownConverter;
 
// Define our config...
$config = [
    'table_of_contents' => [
        'html_class' => 'table-of-contents',
        'position' => 'placeholder',
        'placeholder' => '[TOC]',
    ],
];
 
// Create an environment using the config...
$environment = new Environment($config);
 
// Register the core CommonMark parsers and renderers...
$environment->addExtension(new CommonMarkCoreExtension());
 
// Register the Table of Contents extension (this extension requires the HeadingPermalinkExtension!)
$environment->addExtension(new HeadingPermalinkExtension());
$environment->addExtension(new TableOfContentsExtension());
 
$output = (new MarkdownConverter($environment))
    ->convert(file_get_contents(__DIR__.'/markdown/article.md'))
    ->getContent();
```

In our `$config` field that we passed to the environment, we've defined that anywhere the parser sees `[TOC]` in the Markdown, it will place a table of contents and give it a CSS class of `table-of-contents`. Using a CSS class allows us to style the table to fit our intended website's design. As a side note, by default, the extension will use a value of `top` for the `position`, which will place the table of contents directly at the top of the output without needing to include a placeholder (e.g., `[TOC]`). We've also added the `HeadingPermalinkExtension` extension because the `TableOfContentsExtension` extension requires it to generate links from the table of contents to the related headings.

To see the list full list of options that this extension provides, you can check out the [extension's documentation](https://commonmark.thephpleague.com/2.3/extensions/table-of-contents/).

Let's imagine that the [`article.md`](http://article.md) file that we passed to the converter contained the following contents:

```markdown
[TOC]
 
## Programming Languages
 
### PHP
 
### Ruby
 
### JavaScript
```

This would result in the following HTML output:

```xml
<ul class="table-of-contents">
    <li>
        <p><a href="#programming-languages">Programming Languages</a></p>
        <ul>
            <li>
                <p><a href="#php">PHP</a></p>
            </li>
        </ul>
        <ul>
            <li>
                <p><a href="#ruby">Ruby</a></p>
            </li>
        </ul>
        <ul>
            <li>
                <p><a href="#javascript">JavaScript</a></p>
            </li>
        </ul>
    </li>
</ul>
 
<h2 id="programming-languages">Programming Languages</h2>
 
<h3 id="php">PHP</h3>
 
<h3 id="ruby">Ruby</h3>
 
<h3 id="javascript">JavaScript</h3>
```

As you can see, it's very easy to get started with using extensions in the CommonMark package. The greatest benefit of using these extensions is that you can enrich your HTML without needing too much manual intervention. However, it's important to remember that if you are going to be sharing this Markdown file in multiple places, you should be careful with what (if any) extensions you use. For example, if you write a blog post in Markdown and then cross-post it to many sites, they likely won't support extra features that you've added to your own site, such as adding a table of contents. However, if you're using Markdown for your own purposes, such as building a documentation site, the extensions can be extremely powerful.

## **Creating Your Own CommonMark PHP Extensions**

Now that we've looked at how to use the CommonMark package along with extensions, let's take a look at how to create our own extensions. For the purpose of this article, we'll imagine that we have a documentation site and that we want to have "warning" sections to warn developers of common mistakes or security vulnerabilities. Therefore, we'll say that anywhere we see `{warning}` in our code, we’ll want to output a warning in the HTML.

First, to create the extension, we need to create a class that implements the CommonMark package's `League\CommonMark\Extension\ExtensionInterface` interface. This class will only contain a single `register` method that accepts an instance of `League\CommonMark\Environment\ConfigurableEnvironmentInterface`. Hence, the boilerplate of the class will look like this:

```php
namespace App\Markdown\Extensions;
 
use League\CommonMark\Environment\EnvironmentBuilderInterface;
use League\CommonMark\Extension\ExtensionInterface;
 
class WarningExtension implements ExtensionInterface
{
    public function register(EnvironmentBuilderInterface $environment): void
    {
        // ...
    }
}
```

Now that we've created our basic outline for our extension's class, we need to define two new things:

1. Parser - Here we will read the Markdown to find any blocks that start with the term: `{warning}`.
    
2. Renderer - Here we will define the HTML that should be used to replace `{warning}`.
    

We'll start by defining our parser class:

```php
namespace App\Markdown\Extensions;
 
use League\CommonMark\Parser\Block\BlockStart;
use League\CommonMark\Parser\Block\BlockStartParserInterface;
use League\CommonMark\Parser\Cursor;
use League\CommonMark\Parser\MarkdownParserStateInterface;
 
class WarningParser implements BlockStartParserInterface
{
    public function tryStart(Cursor $cursor, MarkdownParserStateInterface $parserState): ?BlockStart
    {
        // Does the block start with {warning}?
        if (!str_starts_with($cursor->getRemainder(), '{warning}')) {
            return BlockStart::none();
        }
 
        // The block starts with {warning}, so remove it from the string.
        $warningMessage = str_replace('{warning} ', '', $cursor->getRemainder());
 
        return BlockStart::of(new WarningBlockParser($warningMessage));
    }
}
```

Our `WarningParser` class will be used while looping through every block in the Markdown. It will check whether the block begins with `{warning}`. If it doesn't, we’ll return `null` (via the `BlockStart::none()` method). If the block does start with `{warning}`, we'll remove it from the string to find our warning message. For example, if our Markdown was `{warning} My warning here`, then the warning message would be `My warning here`.

We then pass the warning message to a `WarningBlockParser` class, which is then passed to the `BlockStart::of()` method. Our `WarningBlockParser` class implements the `BlockContinueParserInterface`, so we have to implement several methods. Our `WarningBlockParser` will look like this:

```php
namespace App\Markdown\Extensions;
 
use League\CommonMark\Node\Block\AbstractBlock;
use League\CommonMark\Parser\Block\BlockContinue;
use League\CommonMark\Parser\Block\BlockContinueParserInterface;
use League\CommonMark\Parser\Cursor;
 
class WarningBlockParser implements BlockContinueParserInterface
{
    private Warning $warning;
 
    public function __construct(string $warningMessage)
    {
        $this->warning = new Warning($warningMessage);
    }
 
    public function getBlock(): AbstractBlock
    {
        return $this->warning;
    }
 
    public function isContainer(): bool
    {
        return false;
    }
 
    public function canHaveLazyContinuationLines(): bool
    {
        return false;
    }
 
    public function canContain(AbstractBlock $childBlock): bool
    {
        return false;
    }
 
    public function tryContinue(Cursor $cursor, BlockContinueParserInterface $activeBlockParser): ?BlockContinue
    {
        return BlockContinue::none();
    }
 
    public function addLine(string $line): void
    {
        //
    }
 
    public function closeBlock(): void
    {
        //
    }
}
```

The important part of this method is that we are returning a `Warning` class that implements the `AbstractBlock` interface from the `getBlock` method. Our `Warning` class will look like this:

```php
namespace App\Markdown\Extensions;
 
use League\CommonMark\Node\Block\AbstractBlock;
 
class Warning extends AbstractBlock
{
    public function __construct(private string $warningMessage)
    {
        parent::__construct();
    }
 
    public function getHtml(): string
    {
        return '<div class="warning">'.$this->warningMessage.'</div>';
    }
}
```

As you can see, we're returning the HTML in the `getHtml` method. For the purpose of this example, the HTML only contains a single `<div>` with a class of `warning`, but you could change this to say whatever you'd prefer.

Now that we've created our parser and defined the HTML that should be returned, we need to create our renderer class:

```php
namespace App\Markdown\Extensions;
 
use League\CommonMark\Node\Node;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Renderer\NodeRendererInterface;
 
class WarningRenderer implements NodeRendererInterface
{
    /**
     * @param Warning $node
     *
     * {@inheritDoc}
     */
    public function render(Node $node, ChildNodeRendererInterface $childRenderer)
    {
        return $node->getHtml();
    }
}
```

The `render` method in the `WarningRenderer` class simply calls and returns the `getHtml` method from our `Warning` class. Hence, this renderer class will just return HTML as string.

Now that we've created our parser and renderer classes, we can add them to our `WarningExtension` extension class:

```php
namespace App\Markdown\Extensions;
 
use League\CommonMark\Extension\ExtensionInterface;
use League\CommonMark\Environment\ConfigurableEnvironmentInterface;
 
class WarningExtension implements ExtensionInterface
{
    public function register(ConfigurableEnvironmentInterface $environment): void
    {
        $environment->addInlineParser(new WarningParser())
            ->addInlineRenderer(new WarningRenderer());
    }
}
```

Now that we've finalized our extension, we can register it in our environment:

```php
use App\Markdown\Extensions\WarningExtension;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use League\CommonMark\Extension\TableOfContents\TableOfContentsExtension;
use League\CommonMark\MarkdownConverter;
 
$environment = new Environment();
 
// Register the core CommonMark parsers and renderers...
$environment->addExtension(new CommonMarkCoreExtension());
 
// Register our new WarningExtension
$environment->addExtension(new WarningExtension());
 
$output = (new MarkdownConverter($environment))
    ->convert(file_get_contents(__DIR__.'/markdown/article.md'))
    ->getContent();
```

Let's imagine that the [`article.md`](http://article.md) file that we passed to the converter contained the following contents:

```markdown
This is some text about a security-related issue.
 
{warning} This is the warning text
 
This is after the warning text.
```

This would result in the following HTML being output:

```xml
This is some text about a security-related issue.
 
<div class="warning">This is the warning text</div>
 
This is after the warning text.
```

## **Conclusion**

Hopefully, this article has helped you understand what Markdown is and its benefits. It should also have given you an insight into how to securely use Markdown in your PHP projects to render HTML using CommonMark PHP, as well as how to make use of extensions to further enrich your Markdown.

Source:

%[https://ashallendesign.co.uk/blog/working-with-markdown-in-php]