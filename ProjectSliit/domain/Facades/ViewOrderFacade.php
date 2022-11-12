<?php

namespace domain\Facades;

use domain\Services\ViewOrderService;
use Illuminate\Support\Facades\Facade;

class ViewOrderFacade extends Facade 
{
    protected static function getFacadeAccessor() 
    {
        return ViewOrderService::class;
    }
}