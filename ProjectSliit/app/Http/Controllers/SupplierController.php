<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $supplier=new Supplier();
//        idSupplier, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax, Active_Status
        $supplier->Name = $request->f_name;
        $supplier->Address = $request->address;
        $supplier->Contact_no = $request->con;
        $supplier->Contact_person = $request->con_person;
        $supplier->Mobile_No = $request->mobile;
        $supplier->Email = $request->email;
        $supplier->Fax = $request->fax;



        $supplier->save();
        return response()->json($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $supplier)
    {
        $Home01 = DB::select('select * from Supplier');
        return response()->json($Home01);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Supplier $supplier)
    {
//        idSupplier, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax, Active_Status
        $idSupplier = $request->input('b_id');

        $Name=$request->input('f_name');
        $Address=$request->input('address');
        $Contact_no=$request->input('con');
        $Contact_person=$request->input('con_person');
        $Mobile_No=$request->input('mobile');
        $Email=$request->input('email');
        $Fax=$request->input('fax');

        $update=DB::update('update Supplier set Name= ?,Address= ?,Contact_no= ?,Contact_person= ?,Mobile_No= ?,Email= ?,Fax= ? where idSupplier = ?', [$Name,$Address,$Contact_no,$Contact_person,$Mobile_No,$Email,$Fax, $idSupplier]);
        return response()->json($Email);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier,$id)
    {
        $response = DB::delete('delete from Supplier where idSupplier = ?', [$id]);
        return response()->json($response);
    }
}
