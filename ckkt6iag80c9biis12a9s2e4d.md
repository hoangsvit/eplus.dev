# How I built Realtime in Laravel + VueJS

In this article, I will introduce the simplest integration of Realtime, after many learning and optimization in the most effective way.

Technologies used in the article:

* [Backend Laravel 6x](https://laravel.com/docs/6.x/installation) 
* [Fronent VueJS 2x](https://laravel.com/docs/6.x/frontend#writing-vue-components)
* [GraphQL - Lighthouse (A framework for serving GraphQL from Laravel)](https://lighthouse-php.com)
* [Pusher Channels](https://pusher.com/channels)

I will skip the steps to install **Laravel + VueJS** and to register **Pusher**, you can learn how to set up at the paths I quoted above.

### #Fontend VueJS

I will guide the setup on the fontend VueJS side.
Install the support package from the pusher + laravel echo side provided.

```bash
npm install --save laravel-echo pusher-js
``` 

Here I install a package named [vue-echo
](https://www.npmjs.com/package/vue-echo-laravel/).

```bash
npm install vue-echo-laravel --save
``` 
Next add the below configs to the **main.js**, **app.js** or **bootstrap.js** file (depending on your file).

```javascript
import Pusher from "pusher-js";
import VueEcho from "vue-echo-laravel";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

Vue.use(VueEcho, {
  broadcaster: "pusher",
  key: "xxxxxxxxxxxxx",
  cluster: "ap3",
  forceTLS: true,
  authEndpoint: "/broadcasting/auth",
  auth: {
    headers: {
      // authorization: token ? `Bearer ${token}` : null // Enabled - If you are using Bearer for authentication
    }
  }
});
```
This is the content I added to my project

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612587378336/mN4j0_bLz.png)

Once vue-echo is registered, every vue instance is able to subscribe to channels and listen to events through the this.$echo property on the connection you specified earlier.

```javascript
var vm = new Vue({
    mounted() {
        // Listen for the 'NewMessageNotification' event in the 'synchronized' private channel
        this.$echo.private('synchronized').listen('NewMessageNotification', (payload) => {
            console.log(payload);
        });
    }
});
```
This is the content I added to my project
![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612587299888/xxvYQla9_.png)

### #Backend Laravel

Terminal
```bash
composer require pusher/pusher-php-server
``` 

At **config/app.php** you need to unhide or add this line 

```php
App\Providers\BroadcastServiceProvider::class
``` 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612587794102/VsG3kVLjr.png)

Finally, you will need to change your broadcast driver to pusher in your **.env** file:

```ini
PUSHER_APP_ID=xxxxxxxx
PUSHER_APP_KEY=xxxxxxxxxx
PUSHER_APP_SECRET=xxxxxxxxxxx
PUSHER_APP_CLUSTER=xxxxxx

BROADCAST_DRIVER=pusher
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
``` 

#### #Create Event - From Backend
* [Document Events - Laravel](https://laravel.com/docs/6.x/events)
* [Document  Pusher Channels Events](https://pusher.com/docs/channels/using_channels/events)

I will quickly create an Events named `NewMessageNotification` at `app\Events`

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612588328179/TqTLB9mkT.png)

```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NewMessageNotification implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('synchronized');
    }

}
```

Register channels at `routes/channels.php` with`return Auth::check(); ` . I force the **Client-side** to log in to listen to the event.


```php
Broadcast::channel('synchronized', function ($user) {
    return Auth::check();
});
``` 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612588622699/AnXUa1Hoh.png)

Check the dashboard in Pusher, if successful connection will be displayed.

![image (1).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612588795065/-hQheAw-j.png)

I'm going to use the Debug console function in Pusher to do the event quick send.

![image (2).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612588827452/ctO8mpZcd.png)

Or you can also use the Laravel Backend to post events, I will guide you in the following post, or [refer here](https://laravel.com/docs/6.x/events#dispatching-events). 

And this is the result
![image (3).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612589093926/nBzvBVr0s.png)

Have any questions, please comment below. Good luck.