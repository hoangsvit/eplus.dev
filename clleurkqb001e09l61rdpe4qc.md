---
title: "Livewire Real-Time Presence"
seoTitle: "Livewire Real-Time Presence"
seoDescription: "I’ve always been interested in real-time technologies, especially when dealing with high traffic and complex issues. I once encountered a situation with an"
datePublished: Thu Aug 17 2023 07:41:16 GMT+0000 (Coordinated Universal Time)
cuid: clleurkqb001e09l61rdpe4qc
slug: livewire-real-time-presence
canonical: https://ahmedash.dev/blog/livewire/real-time-presence/?utm_source=eplus.dev
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1692257887549/90067cff-f66f-4ccd-bf38-e70771a1b00d.webp
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1692258046712/c5b56ecb-4fd5-4907-8605-7e16917b1ebb.webp

---

I’ve always been interested in real-time technologies, especially when dealing with high traffic and complex issues. I once encountered a situation with an e-commerce store’s operation team. They faced an issue where multiple operators would handle a single order. Their initial solution was to create an auto-assign system, which aimed to distribute orders equally among operators. However, this system faced challenges when operators went on vacation or when an operator had a few particularly difficult orders to manage. So the first solution I thought of is something similar to how google docs shows you who else is reading/modifying the content in realtime.

My suggestion was to begin by informing the team if someone else is already viewing an order when they open it. This way, they can assign orders to themselves without overlap.

I’ve set up a demo to show you how this can be done, and I’ll explain it step by step. But before we dive in, let’s give this feature a name. I’ve decided to call it “On this page.”

### **The Project**

The e-commerce admin pages are written in Blade and few little javascript. So I could’ve implemented it with a websocket server and few javascript to display the active users on every page. But Instead I used already the existing stack Laravel & Redis + Livewire.

### **The Idea**

The operations team isn’t very big, with about 50 people. We can use Redis to track which page each person is viewing. We’ll label this information with a unique page identifier. On the page, we can then show the pictures of the users viewing it. Additionally, we can set a regular interval to update and show any new users who start viewing the page.

We can bring this idea to life using a single Livewire component:

**“On this page” Livewire Component**

* **On Mount: Use the route name combined with its original parameters to create a unique key for the route.**
    
* **On Render: Do two things:**
    
    1. **Save the combination of the route identifier and user ID, setting it to automatically expire after a certain time.**
        
    2. **Retrieve all the route identifier keys, extract user IDs from them, and then gather details like names and profile photos of these users.**
        
* **Auto-refresh: Utilize Livewire’s** [**polling**](https://livewire.laravel.com/docs/polling) **feature to refresh the component every set interval.**
    

We chose Redis for this task. It’s perfect as it can handle a vast number of keys that auto-expire and offers the flexibility to retrieve keys on-the-go.

### **Install livewire**

As of writing this article, [Livewire 3](https://livewire.laravel.com/) is still in beta. However, the code I’ll share is compatible with both version 2 and 3 since we aren’t using any exclusive features from v3. For this tutorial, I’m using v3.

```apache
composer require livewire/livewire "^3.0@beta"
```

### **On this page component**

Now let’s start creating our new component

```apache
php artisan make:livewire OnThisPage
```

This will create 2 files

* **app/Livewire/OnThisPage.php**
    
* **resources/views/livewire/on-this-page.blade.php**
    

#### **OnThisPage.php**

Now, let’s dive into the main implementation. First, we’ll begin by obtaining the unique name for the route.

```php
class OnThisPage extends Component
{
    public $routeName;
    
    public $durationInSeconds = 10;

    public function mount(Request $request)
    {
        $this->routeName = sprintf(
            '%s:%s', 
            $request->route()->getName(),
            implode(':', $request->route()->originalParameters())
        );
    }
}
```

In our approach, we’ll get the unique route name in the `mount` method. If we try to do this in the `render` method, the route name will switch to `livewire.update`. This happens because when the component auto-refreshes using Livewire’s [polling](https://livewire.laravel.com/docs/polling) feature, Livewire sends a request to the `livewire.update` route to fetch the component’s details, avoiding a full page reload.

* **Let’s proceed by introducing the** `logOnThisPage` method:
    

```php
private function logOnThisPage(Request $request): void
{
    $userId = $request->user()->id;
    $page = $this->routeName;
    $key = "{$page}:{$userId}";

    Redis::setex($key, $this->durationInSeconds, $userId);
}
```

This method fetches the user ID and the unique route name. It then combines them to form a key for Redis, which is set to expire after 10 seconds.

* **Next, we’ll introduce the** `getUserIdsOnThisPage` helper method to retrieve the IDs of users currently viewing the page:
    

```php
/** @return array<int> */
private function getUserIdsOnThisPage(Request $request): array
{
    $page = $this->routeName;

    return collect(Redis::keys("{$page}:*"))
        ->map(fn($key) => str_replace("{$page}:", '', $key))
        ->toArray();
}
```

This method gathers all keys that begin with the route name as a prefix. It then extracts just the user ID from each key.

We opt for the `Redis::keys` method over `Redis::scan` because the maximum number of users on a page is 50 (the total number of operation team members). This is a manageable number for our app’s memory.

* **Here’s the** `render` method, which is the final method in our component:
    

```php
public function render(Request $request)
{
    $this->logOnThisPage($request);

    $users = User::query()
        ->select('id', 'name', 'username', 'avatar_url')
        ->whereIn('id', $this->getUserIdsOnThisPage($request))
        ->get();

    return view('livewire.on-this-page', [
        'users' => $users,
        'duration' => $this->durationInSeconds,
    ]);
}
```

First, we log the current user with the `OnThisPage` function. Then, we retrieve user details from the database for display.

### **on-this-page.blade.php**

Now, let’s tackle the frontend. In this section, we’ll loop through the list of users to display their photos. We’ll also utilize [polling](https://livewire.laravel.com/docs/polling) to automatically update the component every 20 seconds, based on the duration variable.

```php
<div wire:poll.{{ $duration }}s>
    <div class="flex overflow-hidden items-center">
        <div class="text-gray-400">
            On this page
        </div>
        <div class="ml-2 flex -space-x-2">
            @foreach($users as $user)
                <img class="inline-block h-8 w-8 rounded-full text-white shadow-solid border border-black"
                     src="{{ asset($user->avatar_url) }}" alt="{{ $user->name }}"/>
            @endforeach
        </div>
    </div>
</div>
```

This template simply showcases which users are currently on the page by displaying their profile photos.

### **How to use**

To use this component, just integrate it into the pages where you want the users to see who else is viewing the same page.

For demonstration, I integrated it into a basic CMS. In both the `posts.list` and [`posts.show`](http://posts.show) views, I added this component to the header:

```html
<div>
    <livewire:on-this-page />
</div>
```

This will allow team members to quickly see who else is looking at the same content.

### **Demo**

![](https://i.imgur.com/ePsSWPj.gif align="center")

### **Considerations and Implications**

* **Polling Overhead: We set a specific time for caching and for the Livewire component to check regularly. Even though checking every few seconds helps keep things up-to-date, it can also put extra work on the system. So, it’s essential to watch the set time and see how it impacts your system.**
    
* **Memory Consideration: The system is tailored for an operations team of about 50 members, but as the user base grows, so does memory consumption. This is particularly noticeable if the expiration time for Redis keys is lengthened. This growth in memory usage could impact the performance and cost-efficiency of the application if not adequately monitored and managed.**
    
* **UI Clutter: Displaying a full list of users can make the interface look congested, especially when there are more than five users. It might be beneficial to set a display limit or introduce a popup that shows the complete list only when necessary.**
    
* **Database Hits: The way our system is set up, it often asks the database for user info because of its regular checks. When lots of users are active, this can make the database work harder. If we don’t fix this over time, it can slow things down or cause other problems. A solution might be to store user data in Redis so we don’t have to ask the database so often.**
    

### **What Do You Think?**

How do you feel about this approach? Have you ever needed something similar? If so, how did you implement it? We’d love to hear your thoughts or any alternative methods you’ve tried. Share your experiences and feedback on this article with us!

Source:

%[https://ahmedash.dev/blog/livewire/real-time-presence/?utm_source=eplus.dev]