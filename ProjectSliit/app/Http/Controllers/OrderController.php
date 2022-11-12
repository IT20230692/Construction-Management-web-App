<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use domain\Facades\ViewOrderFacade;

class OrderController extends Controller
{
    public function store(Request $request)
    {

        $order=new Order();
//        idProduct, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax, Active_Status
        $order->Item_1 = $request->Item_1;
        $order->Item_2 = $request->Item_2;
        $order->Item_3 = $request->Item_3;
        $order->site_Name = $request->site_Name;
        $order->site_Address = $request->site_Address;
        $order->Supplier = $request->Supplier;
        $order->Delivery_Date = $request->Delivery_Date;
        $order->Total =  $request->Total;
        $order->Bank_Acc = $request->Bank_Acc;
        $order->Notes = $request->Notes;
        // $order->Delivery_status = $request->Delivery_status;
        // $order->Approval_status = $request->Approval_status;
        //dd($order);
         $order->save();
        return  redirect()->back();
    }

    public function showorder()
    {    
        // $all=Product::all();
        // dd($all);
        $response['orders'] = Order::all();
        return view('Admin.ViewOrder')->with($response);  
    }

}
