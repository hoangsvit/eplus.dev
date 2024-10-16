---
title: "The Difference Between self::, static::, and parent:: in PHP"
seoTitle: "The Difference Between self::, static::, and parent:: in PHP"
seoDescription: "When working with PHP code, you may often come across parent::, static::, and self::. But when you're first starting out as a developer, it can sometimes be"
datePublished: Thu Jan 12 2023 02:15:21 GMT+0000 (Coordinated Universal Time)
cuid: clcsgkky1000008l07trf70je
slug: the-difference-between-self-static-and-parent-in-php
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1673489439535/de9ebb2d-8de2-47f3-9954-2bb92794afb0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1673489476600/2d22a16f-8f93-4759-8572-9d2c1a8c5a92.png

---

## **Introduction**

When working with PHP code, you may often come across `parent::`, `static::`, and `self::`. But when you're first starting out as a developer, it can sometimes be confusing to know what they do and the differences between them.

I'll hold my hand up and admit that for quite a long time after I first started as a developer, I thought `static::` and `self::` were the exact same thing.

So in this article, we're going to cover what each of these can be used for and the differences between them all.

## **What is** `parent::`?

Let's start off with talking about `parent::`.

To get an idea of what it does, we're probably best off with looking at some code examples first.

Let's imagine that we have a `BaseTestCase` class that has a `setUp` method:

```php
class BaseTestCase
{
    public function setUp(): void
    {
        echo 'Run base test case set up here...';
    }
}
 
(new BaseTestCase())->setUp();
 
// Output is: "Run base test case set up here...';
```

As we can see, when we call the `setUp` method, it runs as expected and outputs the text.

Now, let's imagine that we want to create a new `FeatureTest` class that inherits the `BaseTestCase` class. If we wanted to run the `setUp` method of the `FeatureTest` class, we could do so like this:

```php
class FeatureTest extends BaseTestCase
{
    //
}
 
(new FeatureTest())->setUp();
 
// Output is: "Run base test case set up here...";
```

As we can see, we haven't defined the `setUp` method in our `FeatureTest`, so the one defined in the `BaseTestCase` will be run instead.

Now, let's say that we want to run some extra logic when we run the `setUp` method in our `FeatureTest`. For instance, if these classes were test cases that were being used as part of a PhpUnit test, we may want to do things such as creating models in the database, or setting test values.

At first, you might (incorrectly) think that you can just define the `setUp` method in your `FeatureTest` method and call `$this->setUp()`. I'll be honest, I always used to fall into this trap when I was first learning about programming!

So our code may look something like this:

```php
class FeatureTest extends BaseTestCase
{
    public function setUp(): void
    {
        $this->setUp();
 
        echo 'Run extra feature test set up here...';
    }
}
 
(new FeatureTest())->setUp();
```

But, you'll find that if we were to run this code, we'd end up in an loop that would cause your application to crash. This is because we're recursively asking `setUp` to call itself over and over. You'd likely get an output similar to this:

```plaintext
Fatal error: Out of memory (allocated 31457280 bytes) (tried to allocate 262144 bytes) in /in/1MXtt on line 15
mmap() failed: [12] Cannot allocate memory
mmap() failed: [12] Cannot allocate memory
Process exited with code 255.
```

So instead of using `$this->setUp()`, we need to tell PHP to use the `setUp` method in the `BaseTestCase` instead. To do this, we can replace `$this->setUp()` with `parent::setUp()` like so:

```php
class FeatureTest extends BaseTestCase
{
    public function setUp(): void
    {
        parent::setUp();
 
        echo 'Run extra feature test set up here...';
    }
}
 
(new FeatureTest())->setUp();
 
// Output is: "Run base test case set up here... Run extra feature test set up here...";
```

Now, as you can see, when we run the `setUp` method in the `FeatureTest` class, we're first running the code in the `BaseTestCase` and then continuing with the rest of the code defined in our child class.

It's worth noting that you don't always need to place the `parent::` call at the top of the method. In fact, you can place it in the method wherever you'd like that best fits the purpose of the code. For example, if you wanted to run your code in the `FeatureTest` class first then the `BaseTestCase`, you could move the `parent::setUp()` call to the bottom of the method like so:

```php
class FeatureTest extends BaseTestCase
{
    public function setUp(): void
    {
        echo 'Run extra feature test set up here...';
 
        parent::setUp();
    }
}
 
(new FeatureTest())->setUp();
 
// Output is: "Run extra feature test set up here... Run base test case set up here...";
```

## **What is** `self::`?

Now, let's take a look at `self::`.

Let's imagine that we have a `Model` class that has a static `connection` property and a `makeConnection` method. We'll also imagine that we have a `User` class that inherits the `Model` class and overrides the `connection` property.

The two classes may look something like so:

```php
class Model
{
    public static string $connection = 'mysql';
 
    public function makeConnection(): void
    {
        echo 'Making connection to: '.self::$connection;
    }
}
 
class User extends Model
{
    public static string $connection = 'postgres';
}
```

Now let's run the `makeConnection` method on both classes and see what output we'd get:

```php
(new Model())->makeConnection();
 
// Output is: "Making connection to mysql"
 
(new User())->makeConnection();
 
// Output is: "Making connection to mysql";
```

As we can see, both calls resulted in the `Model` class' `connection` property being used. This is because `self` uses the property that is defined on the class where the method exists. In both cases, the `makeConnection` method is on on the `Model` class because one doesn't exist on the `User` class.

To further show this, we'll add the `makeConnection` method to our `User` class like so:

```php
class Model
{
    public static string $connection = 'mysql';
 
    public function makeConnection(): void
    {
        echo 'Making connection to: '.self::$connection;
    }
}
 
class User extends Model
{
    public static string $connection = 'postgres';
 
    public function makeConnection(): void
    {
        echo 'Making connection to: '.self::$connection;
    }
}
```

Now if we were to call both methods again, we'd get the following output:

```php
(new Model())->makeConnection();
 
// Output is: "Making connection to mysql"
 
(new User())->makeConnection();
 
// Output is: "Making connection to postgres";
```

As you can see, the call to `makeConnection` would now use the `connection` field on the `User` class because that's what where the method exists.

## **What is** `static::`?

Now that we have an idea of what `self::` does, let's take a look at `static::`.

To better understand what it does, let's update our code example above to use `static::` instead of `self::` like so:

```php
class Model
{
    public static $connection = 'mysql';
 
    public function makeConnection()
    {
        echo 'Making connection to: '.static::$connection;
    }
}
 
class User extends Model
{
    public static $connection = 'postgres';
}
```

If we were to run the `makeConnection` method on both classes, we'd get the following output:

```php
(new Model())->makeConnection();
 
// Output is: "Making connection to mysql"
 
(new User())->makeConnection();
 
// Output is: "Making connection to postgres";
```

As we can see, this output is different to when we used `self::$connection` earlier. The call to the `makeConnection` method on the `User` class has used the `connection` property on the `User` class rather than the `Model` class (where the method actually belongs). This is due to a feature in PHP called "late static binding".

If you're interested in reading more about late static binding, you can [check out the PHP documentation here](https://www.php.net/manual/en/language.oop5.late-static-bindings.php).

According to the PHP docs:

"*This feature was named "late static bindings" with an internal perspective in mind. "Late binding" comes from the fact that static:: will not be resolved using the class where the method is defined but it will rather be computed using runtime information. It was also called a "static binding" as it can be used for (but is not limited to) static method calls.*"

So in the case of our example, the `connection` property on the `User` class is used because we're calling the `makeConnection` method on that very same class.

However, it's worth noting that if the `connection` property didn't exist on the `User` class, it would fallback to using the one on the `Model` class instead.

## **When to use "self::" or "static::"?**

Now that we have a general idea of the difference between `self::` and `static::`, let's quickly cover how to decide which of these to use in your own code.

It all really comes down the use-case of the code that you're writing.

In general, I'd typically use `static::` instead of `self::` because I'd want my classes to be extendable and provide support for if they're inherited from.

For example, let's say that I want to write a class that I fully intend to be inherited from by a child class (such as the `BaseTestCase` class in our example above). Unless I really wanted to prevent the child class from overriding the property or method, I'd want to use `static::`.

It would mean that I could have confidence that if I override any of the static methods or fields that my child class would use my overrides. I can't tell you how many times I've run into bugs in my code when I've used `self::` in a parent class and then couldn't figure out why my child class wasn't using my override!

On the flip side, some developers may argue that you should stick to using `self::` because you shouldn't really be inheriting from classes. They might suggest that you should be following the principle of "[composition over inheritance](https://www.amitmerchant.com/reasons-use-composition-over-inheritance-php/)" instead. I won't delve too much into this topic because that's for another blog post in the future. But in broad, simple terms, this principle states that you should avoid adding functionality to your classes by putting all your logic in a parent class, and instead add the functionality by building your class up with lots of smaller classes.

This means if you followed this principle, you wouldn't need to use `static::` because you wouldn't ever be extending your parent class. If you wanted to ensure that the class couldn't be extended, you could even take the code one step further and use the [`final` keyword](https://www.php.net/manual/en/language.oop5.final.php) when defining a class. Using the `final` keyword prevents a class from being inherited from, so it could reduce any worry in your mind that the class might accidentally be extended and introduce any potential bugs.

In general, it's usually best for you to decide on a case-by-case basis at the time of writing your code whether you should use `static::` or `self::`.

## **Conclusion**

Hopefully, this post should have given you an insight into the difference between `static::`, `self::`, and `parent::`.

If you enjoyed reading this post, I'd love to hear about it. Likewise, if you have any feedback to improve the future ones, I'd also love to hear that too.

You might also be interested in checking out my 220+ page ebook "[Battle Ready Laravel](https://battle-ready-laravel.com/)" which covers similar topics in more depth.

If you're interested in getting updated each time I publish a new post, feel free to sign up for my newsletter below.

Keep on building awesome stuff! 🚀

Source:

%[https://ashallendesign.co.uk/blog/the-difference-between-self-static-and-parent-in-php]