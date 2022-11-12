<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AddProductController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Dashboard', function () {
    return view('Admin.dashboard');
});

Route::get('/Login', function () {
    return view('Admin.login');
});

Route::get('/Supplier', function () {
    return view('Admin.AddSupplier');
});

Route::get('/ViewSuppliers', function () {
    return view('Admin.ViewSupplier');
});

Route::get('/AddProduct', function () {
    return view('Admin.AddProduct');
});

// Route::get('/ViewProduct', function () {
//     return view('Admin.ViewProduct');
// });

Route::get('/AddOrder', function () {
    return view('Admin.AddOrder');
});

// Route::get('/ViewOrder', function () {
//     return view('Admin.ViewOrder');
// });

Route::POST('supplier_save', [SupplierController::class, 'store']);
Route::POST('sup_update', [SupplierController::class, 'update']);
Route::get('/load_supplier', [SupplierController::class,'show']);
Route::get('supplier_delete/{id}', [SupplierController::class, 'destroy']);



Route::POST('product_save', [AddProductController::class, 'storeProduct'])->name('storeProduct');
Route::POST('pro_update', [AddProductController::class, 'update']);
// Route::get('/load_product', [AddProductController::class,'showproduct'])->name('showproduct');;
Route::get('product_delete/{id}', [AddProductController::class, 'destroy']);

Route::get('/ViewProduct', [AddProductController::class,'showproduct'])->name('showproduct');

Route::POST('order_save', [OrderController::class, 'store'])->name('storeOrders');
Route::POST('order_update', [OrderController::class, 'updateorder'])->name('updateorder');
// Route::get('/load_supplier', [OrderController::class,'showq']);
// Route::get('supplier_delete/{id}', [OrderController::class, 'destroy']);

Route::get('/ViewOrder', [OrderController::class,'showorder'])->name('showorder');