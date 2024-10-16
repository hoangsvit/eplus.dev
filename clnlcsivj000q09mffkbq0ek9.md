---
title: "Laravel approved new Model data before it persisted"
seoTitle: "Laravel approved new Model data before it persisted"
seoDescription: "Approval is a Laravel package that provides a simple way to approve new Model data before it is persisted"
datePublished: Wed Oct 11 2023 06:11:55 GMT+0000 (Coordinated Universal Time)
cuid: clnlcsivj000q09mffkbq0ek9
slug: laravel-approved-new-model-data-before-it-persisted
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1697004490104/a8625b04-94b8-4470-9f70-f3fdba8dcb2e.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1697004691754/2a6ac7b4-daba-4920-a332-f92d7ffd6c17.jpeg

---

Approval is a Laravel package that provides a simple way to approve new Model data before it is persisted.

## Installation

You can install the package via Composer:

```apache
composer require cjmellor/approval
```

You can publish and run the migrations with:

```apache
php artisan vendor:publish --tag="approval-migrations"
php artisan migrate
```

You can publish the config file with:

```apache
php artisan vendor:publish --tag="approval-config"
```

This is the contents of the published config file:

```php
return [
    'approval' => [
        /**
         * The approval polymorphic pivot name
         *
         * Default: 'approvalable'
         */
        'approval_pivot' => 'approvalable',
    ],
];
```

The config allows you to change the polymorphic pivot name. It should end with `able` though.

## Usage

> The package utilises Enums, so both PHP 8.1 and Laravel 9 must be used.
> 
> **Note** This package does not approve/deny the data for you, it just stores the new/amended data into the database. It is up to you to decide how you implement a function to approve or deny the Model.

Add the `MustBeApproved` trait to your Model and now the data will be stored in an `approvals` table, ready for you to approve or deny.

For example, you add it to a `Post` Model and each time a Post is created or updated, all the *dirty* data will be stored in the database as JSON for you to do something with it.

```apache
<?php

use Cjmellor\Approval\Concerns\MustBeApproved;

class Post extends Model
{
    use MustBeApproved;

    // ...
}
```

All Models using the Trait will now be stored in a new table -- `approvals`. This is a polymorphic relationship.

Here is some info about the columns in the `approvals` table:

`approvalable_type` =&gt; The class name of the Model that the approval is for

`approvalable_id` =&gt; The ID of the Model that the approval is for

`state` =&gt; The state of the approval. This uses an Enum class. This column is cast to an `ApprovalStatus` Enum class

`new_data` =&gt; All the fields created or updated in the Model. This is a JSON column. This column is cast to the `AsArrayObject` [Cast](https://laravel.com/docs/9.x/eloquent-mutators#array-object-and-collection-casting)

`original_data` =&gt; All the fields in the Model before they were updated. This is a JSON column. This column is cast to the `AsArrayObject` [Cast](https://laravel.com/docs/9.x/eloquent-mutators#array-object-and-collection-casting)

If you want to check if the Model data will be bypassed, use the `isApprovalBypassed` method.

```php
return $model->isApprovalBypassed();
```

## Scopes

The package comes with some helper methods for the Builder, utilising a custom scope - `ApprovalStateScope`

By default, all queries to the `approvals` table will return all the Models' no matter the state.

There are three methods to help you retrieve the state of the Approval.

```php
<?php

use App\Models\Approval;

Approval::approved()->get();
Approval::rejected()->get();
Approval::pending()->count();
```

You can also set a state for approval:

```php
<?php

use App\Models\Approval;

Approval::where('id', 1)->approve();
Approval::where('id', 2)->reject();
Approval::where('id', 3)->postpone();
```

In the event you need to reset a state, you can use the `withAnyState` helper.

### Helpers

Conditional helper methods are used, so you can set the state of an Approval when a condition is met.

```php
$approval->approveIf(true);
$approval->rejectIf(false);
$approval->postponeIf(true);

$approval->approveUnless(false);
$approval->rejectUnless(true);
$approval->postponeUnless(false);
```

### Events

Once a Model's state has been changed, an event will be fired.

```php
ModelApproved::class
ModelPostponed::class
ModelRejected::class
```

### Persisting data

By default, once you approve a Model, it will be inserted into the database.

If you don't want to persist to the database on approval, set a `false` flag on the `approve` method.

```php
Approval::find(1)->approve(persist: false);
```

## Rollbacks

If you need to roll back an approval, you can use the `rollback` method.

```php
Approval::first()->rollback();
```

This will revert the data and set the state to `pending` and touch the `rolled_back_at` timestamp, so you have a record of when it was rolled back.

### Conditional Rollbacks

A roll-back can be conditional, so you can roll back an approval if a condition is met.

```php
Approval::first()->rollback(fn () => true);
```

### Events

When a Model has been rolled back, a `ModelRolledBack` event will be fired with the Approval Model that was rolled back, as well as the User that rolled it back.

```php
// ModelRolledBackEvent::class

public Model $approval,
public Authenticatable|null $user,
```

## Disable Approvals

If you don't want Model data to be approved, you can bypass it with the `withoutApproval` method.

```php
$model->withoutApproval()->update(['title' => 'Some Title']);
```

## Testing

```php
composer test
```