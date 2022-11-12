<?php 

namespace domain\Services; 

use App\Models\Order;


class ViewOrderService
{
    protected $order;

    public function __construct() {
        $this->order = new Order();
    } 

    public function all() {
        return $this->order->all();
    } 
}