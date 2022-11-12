<?php

namespace domain\Facades;

use domain\Services\ProductViewService;
use Illuminate\Support\Facades\Facade;

class ProductViewFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ProductViewService::class;
    }
}
