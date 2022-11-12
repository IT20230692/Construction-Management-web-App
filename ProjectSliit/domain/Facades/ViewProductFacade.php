<?php

namespace domain\Facades;

use domain\Services\ViewProductService;
use Illuminate\Support\Facades\Facade;

class ViewProductFacade extends Facade 
{
    protected static function getFacadeAccessor() 
    {
        return ViewProductService::class;
    }
}