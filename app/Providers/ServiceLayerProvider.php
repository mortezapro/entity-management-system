<?php

namespace App\Providers;

use App\Services\Entity\EntityService;
use App\Services\Entity\EntityServiceInterface;
use Illuminate\Support\ServiceProvider;

class ServiceLayerProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            EntityServiceInterface::class,
            EntityService::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
