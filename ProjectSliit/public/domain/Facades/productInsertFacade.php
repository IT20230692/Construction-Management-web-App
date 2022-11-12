<?php
namespace domain\Facades;

use domain\Services\ProductInsertService;
use Illuminate\Support\Facades\Facade;

class productInsertFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ProductInsertService::class;
    }
}
