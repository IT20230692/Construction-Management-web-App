<?php 

namespace domain\Services; 

use App\Models\Product;


class ViewProductService
{
    protected $product;

    public function __construct() {
        $this->product = new Product();
    } 

    public function all() {
        return $this->product->all();
    } 
}