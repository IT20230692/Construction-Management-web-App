<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use domain\Facades\ViewProductFacade;
use Illuminate\Support\Facades\DB;

class AddProductController extends Controller
{
    public function storeProduct(Request $request)
    {

        $imageName = time() . "." . $request->p_img->getClientOriginalName();
        $request->p_img->move(public_path('thumbnails'), $imageName);

        $product=new Product();
//        idProduct, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax, Active_Status
        $product->Product_Name = $request->p_name;
        $product->Description = $request->description;
        $product->Product_Cat = $request->category;
        $product->Qty_Type = $request->size;
        $product->Rate = $request->price;
        $product->Stock =  $imageName;

         $product->save();
        return  redirect()->back();
    }

    public function showproduct()
    {    
        // $all=Product::all();
        // dd($all);
        $response['products'] = Product::all();
        return view('Admin.ViewProduct')->with($response);  
    }
}
