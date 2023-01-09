# CRUD Operations Using Laravel Livewire

***This is a guest post from Bacancy***

Tired of creating boring and tiring Interfaces using traditional methods? Bring in all your attention here as we come up with a tech tutorial on executing the CRUD operations using Laravel Livewire. It is the simple things that matter; these steps to create, update, and delete records with the Livewire package make it a piece of cake to create Interfaces.

## **Introduction to Laravel Livewire**

Before we begin with the Laravel Livewire CRUD tutorial, let us get to the basic understanding of Livewire, and what and how is it used.

### **What is Livewire?**

Laravel Livewire enables you to build interfaces with the convenience of Laravel. Livewire is a fullstack framework that simplifies the complexity that Vue or React brings up. The first livewire version was released in February 2020.

In this blog, we are going to present **CRUD operations using Laravel Livewire** including all the necessary steps which are required to implement livewire in Laravel 9. Before that, you might want to [**upgrade from Laravel 8 to 9**](https://www.bacancytechnology.com/blog/whats-new-in-laravel-9).

## **Prerequisites and Setup for Laravel Livewire CRUD Operations**

Composer installed on your system (Just hit the “composer” command in the terminal to check whether the composer is properly installed or not). You may get Composer here ([https://getcomposer.org/](https://getcomposer.org/)) if you don’t already have it.

## **How to Execute CRUD Operations Using Laravel Livewire?**

Here we have depicted how you can implement Livewire package with the latest Laravel version (v 9.19), and consecutively operate the create, update, and delete functions using the package.

### **1\. Create a laravel Application**

As you are familiar with creating a laravel application using a terminal, open a terminal and run the below command, then create a new laravel application in your directory.

```apache
composer create-project --prefer-dist laravel/laravel application_name_here
```

### **2\. Configure Database Details**

Open .env file which is located in the root folder, if .env is not existed then run the below command to make a copy from the .env-example

```apache
cp .env .env-example
```

You need to create a new database, same database name you need to mention in DB\_DATABASE, and also replace the rest of the .env variable based on your system

```apache
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<DATABASE NAME>
DB_USERNAME=<DATABASE USERNAME>
DB_PASSWORD=<DATABASE PASSWORD>
```

### **3\. Now Turn to Install the Livewire Package**

Move to your application root directory and run the below command to install the livewire package

```apache
composer require livewire/livewire
```

We need to include the livewire style and script (on every page that will be using Livewire).

```xml
<head>
        # other styles here
        @livewireStyles
    </head>
    <body>
        # other body parts here
        @livewire(‘<component name here>’)/You can include component anywhere in your app
       @livewireScripts
    <script src="https://www.bacancytechnology.com/blog/wp-content/cache/min/1/b810c1e775732c06a03141e7fcdf81a0.js" data-minify="1" defer></script></body>
```

### **4\. Create Migration and Model**

We need to create migration for the “posts” table and also we will create a model for posts table.

Please run the below command to make a migration file. After executing the below command, new file will be created under the database/migrations folder

```apache
php artisan make:migration create_posts_table
```

Replace the below code in the `create_posts_table` migration file:

```php
<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }
 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
```

Run the below command to create a table in the database with mentioned columns in migration, after executing the below command, you can able to see new **“posts”** table in the database.

```apache
php artisan migrate
```

Now, we will create a post model using the below command. After executing the below, you can able to view a new model file under *app/Models* folder:

```apache
php artisan make:model Post
```

Open `app/Models/Post.php` and replace with below code

```php
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'description'
    ];
      public $timestamps = true;
}
```

### **5\. Create Post component**

Now we are going to create a post component using the below command

```apache
php artisan make:livewire post
```

After executing the above command you can able to see a new Livewire folder under app/Http and resources/views folder.

Output of the above command is:

```apache
COMPONENT CREATED
CLASS: app/Http/Livewire/Post.php
VIEW:  resources/views/livewire/post.blade.php
```

Now, open **app\\Http\\Livewire\\Post.php** and update the following code into that file:

```php
<?php
 
namespace App\Http\Livewire;
 
use Livewire\Component;
use App\Models\Post as Posts;
 
class Post extends Component
{
 
    public $posts, $title, $description, $postId, $updatePost = false, $addPost = false;
 
    /**
     * delete action listener
     */
    protected $listeners = [
        'deletePostListner'=>'deletePost'
    ];
 
    /**
     * List of add/edit form rules
     */
    protected $rules = [
        'title' => 'required',
        'description' => 'required'
    ];
 
    /**
     * Reseting all inputted fields
     * @return void
     */
    public function resetFields(){
        $this->title = '';
        $this->description = '';
    }
 
    /**
     * render the post data
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function render()
    {
        $this->posts = Posts::select('id', 'title', 'description')->get();
        return view('livewire.post');
    }
 
    /**
     * Open Add Post form
     * @return void
     */
    public function addPost()
    {
        $this->resetFields();
        $this->addPost = true;
        $this->updatePost = false;
    }
     /**
      * store the user inputted post data in the posts table
      * @return void
      */
    public function storePost()
    {
        $this->validate();
        try {
            Posts::create([
                'title' => $this->title,
                'description' => $this->description
            ]);
            session()->flash('success','Post Created Successfully!!');
            $this->resetFields();
            $this->addPost = false;
        } catch (\Exception $ex) {
            session()->flash('error','Something goes wrong!!');
        }
    }
 
    /**
     * show existing post data in edit post form
     * @param mixed $id
     * @return void
     */
    public function editPost($id){
        try {
            $post = Posts::findOrFail($id);
            if( !$post) {
                session()->flash('error','Post not found');
            } else {
                $this->title = $post->title;
                $this->description = $post->description;
                $this->postId = $post->id;
                $this->updatePost = true;
                $this->addPost = false;
            }
        } catch (\Exception $ex) {
            session()->flash('error','Something goes wrong!!');
        }
 
    }
 
    /**
     * update the post data
     * @return void
     */
    public function updatePost()
    {
        $this->validate();
        try {
            Posts::whereId($this->postId)->update([
                'title' => $this->title,
                'description' => $this->description
            ]);
            session()->flash('success','Post Updated Successfully!!');
            $this->resetFields();
            $this->updatePost = false;
        } catch (\Exception $ex) {
            session()->flash('success','Something goes wrong!!');
        }
    }
 
    /**
     * Cancel Add/Edit form and redirect to post listing page
     * @return void
     */
    public function cancelPost()
    {
        $this->addPost = false;
        $this->updatePost = false;
        $this->resetFields();
    }
 
    /**
     * delete specific post data from the posts table
     * @param mixed $id
     * @return void
     */
    public function deletePost($id)
    {
        try{
            Posts::find($id)->delete();
            session()->flash('success',"Post Deleted Successfully!!");
        }catch(\Exception $e){
            session()->flash('error',"Something goes wrong!!");
        }
    }
}
```

Now, Create **resources/views/home.blade.php** and update the following code into that file:

```xml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Livewire Crud</title>
    <link data-minify="1" href="https://www.bacancytechnology.com/blog/wp-content/cache/min/1/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css?ver=1672663261" rel="stylesheet" crossorigin="anonymous">
    @livewireStyles
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Livewire CRUD Blog</a>
        </div>
    </nav>
    <div class="container">
        <div class="row justify-content-center mt-3">
            @livewire('post')
        </div>
    </div>
 
    @livewireScripts
  </body>
</html>
```

Now, Open **resources/views/livewire/post.blade.php** and update the following code into that file:

```php-template
<div>
    <div class="col-md-8 mb-2">
        @if(session()->has('success'))
            <div class="alert alert-success" role="alert">
                {{ session()->get('success') }}
            </div>
        @endif
        @if(session()->has('error'))
            <div class="alert alert-danger" role="alert">
                {{ session()->get('error') }}
            </div>
        @endif
        @if($addPost)
            @include('livewire.create')
        @endif
        @if($updatePost)
            @include('livewire.update')
        @endif
    </div>
    <div class="col-md-8">
        <div class="card">
            <div class="card-body">
                @if(!$addPost)
                <button wire:click="addPost()" class="btn btn-primary btn-sm float-right">Add New Post</button>
                @endif
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if (count($posts) > 0)
                                @foreach ($posts as $post)
                                    <tr>
                                        <td>
                                            {{$post->title}}
                                        </td>
                                        <td>
                                            {{$post->description}}
                                        </td>
                                        <td>
                                            <button wire:click="editPost({{$post->id}})" class="btn btn-primary btn-sm">Edit</button>
                                            <button onclick="deletePost({{$post->id}})" class="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                @endforeach
                            @else
                                <tr>
                                    <td colspan="3" align="center">
                                        No Posts Found.
                                    </td>
                                </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
```

We need to create two more files under **resources/views/livewire/** one is create.blade.php and second is update.blade.php.

After creating create.blade.php can you replace it with the below content

```php-template
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group mb-3">
                <label for="title">Title:</label>
                <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter Title" wire:model="title">
                @error('title')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>
            <div class="form-group mb-3">
                <label for="description">Description:</label>
                <textarea class="form-control @error('description') is-invalid @enderror" id="description" wire:model="description" placeholder="Enter Description"></textarea>
                @error('description')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>
            <div class="d-grid gap-2">
                <button wire:click.prevent="storePost()" class="btn btn-success btn-block">Save</button>
                <button wire:click.prevent="cancelPost()" class="btn btn-secondary btn-block">Cancel</button>
            </div>
        </form>
    </div>
</div>
```

After creating update.blade.php can you replace it with the below content

```php-template
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group mb-3">
                <label for="title">Title:</label>
                <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" placeholder="Enter Title" wire:model="title">
                @error('title')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>
            <div class="form-group mb-3">
                <label for="description">Description:</label>
                <textarea class="form-control @error('description') is-invalid @enderror" id="description" wire:model="description" placeholder="Enter Description"></textarea>
                @error('description')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>
            <div class="d-grid gap-2">
                <button wire:click.prevent="updatePost()" class="btn btn-success btn-block">Update</button>
                <button wire:click.prevent="cancelPost()" class="btn btn-secondary btn-block">Cancel</button>
            </div>
        </form>
    </div>
</div>
```

### **6\. Define Routes**

Open **routes/web.php** and update the following code into that file:

```php
Route::get('/',function(){
   return view('home');
});
```

### **7\. Run Project**

Now, it’s time to check the above demo in the browser, so open your terminal and execute the below command from the project root directory.

```apache
php artisan serve
```

The output of the above command will be like below:

Starting Laravel development server: [`http://127.0.0.1:8000`](http://127.0.0.1:8000)

So now open your browser and hit the above-generated link.

(Note: URL may be very based on an available port in your system).

Here is the github repository link [**https://github.com/kishanpatelbacancy/laravel-livewire-demo**](https://github.com/kishanpatelbacancy/laravel-livewire-demo)

## **Conclusion**

As we come to the end of this blog, do share your thoughts and feedback on these CRUD operations using Laravel Livewire tutorial. If you are considering Laravel Livewire for developing Interfaces for your business ideas, [**hire Laravel developer**](https://www.bacancytechnology.com/hire-laravel-developer?utm_source=blog&utm_medium=hire_laravel_developer&utm_campaign=crud-operations-using-laravel-livewire#form) from us as we have the top 1% tech talent in the world. Our developers are skilled with the latest upgrades, features, and implementations in Laravel, and we follow the Agile development processes for your convenient success.

Source:

%[https://laravel-news.com/crud-operations-using-laravel-livewire]