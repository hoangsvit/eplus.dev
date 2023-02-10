# Export Eloquent Models to JSON Files

[**Model JSON**](https://github.com/vildanbina/laravel-model-json) for Laravel is a package that allows you to easily export data from specific models in your Laravel application to JSON format. It is based on the php artisan command and offers various options to customize the export process. This package helps export important data from your models in a convenient format:

```apache
php artisan model:export User 
# Or specify the exact model location
php artisan model:export App\Models\User 
# Exclude fields
php artisan model:export User --except-fields=id,deleted_at
```

This package also supports associated model data using the following flag:

```apache
php artisan model:export Product \  --with-relationships=category 
# Like before, specify which fields to export
# on the relationship
php artisan model:export Product \  --with-relationships=category:id,name
```

Lastly, you can import data from a JSON file and store it in your database:

```apache
php artisan model:import User path/to/Users.json
```

You can learn more about this package, get full installation instructions, and view the [**source code**](https://github.com/vildanbina/laravel-model-json) on GitHub.