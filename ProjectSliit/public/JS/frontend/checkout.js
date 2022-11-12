$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
function check_form(){
    let select_combo=$('#state').val();
    let cash_state=$('#cash_state').val();
    if (select_combo=="Select"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select state !',
        })
        return false;
    }

    return true;
}


function change_state(val){
    let amount=$('#order_total').text();
    $.ajax({
        type:'GET',
        url: '/DeliveryCost/'+val,
        success: (response) => {
            let tot_amount=0.0;
            if (response!=""){
                $.each(response, function(key,value) {
                    let price=value.price;
                    price=parseFloat(price);
                    amount=parseFloat(amount);
                    tot_amount=price+amount;
                    $('#delivery_charge').text("LKR "+price.toFixed(2));
                    $('#delivery_charge_n').val(price.toFixed(2));
                    $('#sub_total_final').text("LKR "+tot_amount.toFixed(2));
                    $('#price').val(tot_amount.toFixed(2));
                    $('#delivery_c').val(price.toFixed(2));
                });
            }else{
                amount=parseFloat(amount);
                $('#delivery_charge').text("LKR 0.00");
                $('#delivery_charge_n').val("0.00");
                $('#sub_total_final').text("LKR "+amount.toFixed(2));
                $('#price').val(amount.toFixed(2));
                $('#delivery_c').val("0.00");
            }


        },
    });
}

function check_cash(){
    if($('#cboxs').prop("checked") == true){
        $( "#without_cash_on_delivery" ).hide();
        $( "#cash_on_delivery" ).show();
    }
    else if($('#cboxs').prop("checked") == false){
        $( "#cash_on_delivery" ).hide();
        $( "#without_cash_on_delivery" ).show();
    }

}


function save_cashondeli(){

    var formData = new FormData($('#save_home_01').get(0));
    let email=$('#cash_email').val();
    let first_name=$('#cash_first_name').val();
    let last_name=$('#cash_last_name').val();
    let address_line_one=$('#cash_address_line_one').val();
    let city=$('#cash_city').val();
    let state=$('#cash_state').val();
    let postal_code=$('#cash_postal_code').val();
    let contact_number=$('#cash_contact_number').val();
    if (email==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter Email address !',
        })
    }else if (first_name==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter First Name !',
        })
    }else if (last_name==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter Last Name !',
        })
    }else if (address_line_one==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter Address !',
        })
    }else if (city==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter City !',
        })
    }else if (state=="Select"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select State !',
        })
    }else if (postal_code==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter Postal Code !',
        })
    }else if (contact_number==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter Contact Number !',
        })
    }else{
        Swal.fire({
            title: 'Are you sure to order?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Oder it!'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    type: 'POST',
                    url: "/check_save",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: (response) => {

                        $.each(response, function (i, item) {

                            $.ajax({
                                type: "GET",
                                url: "/Save_Item_Qty/" + item.itemsizeid + "/" + item.price + "/" + item.qty,
                                success: (response) => {

                                },
                            });
                        });


                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully',
                            showCancelButton: false,
                            showConfirmButton: true,
                            text: 'We will contact you as soon as possible !',
                        }).then((result) => {
                            $.ajax({
                                type: "GET",
                                url: "/cart_session_clear",
                                success: (response) => {
                                    window.location="/";
                                },
                            });

                        })


                    },

                });
            }
        })
    }





}

function terms(){
    var isChecked = $("#terms_and_condition").is(":checked");
    if (isChecked) {
        $('#cash_on_delivery').removeAttr("disabled");
        $('#without_cash_on_delivery').removeAttr("disabled");
    }else{
        $('#cash_on_delivery').prop("disabled", true);
        $('#without_cash_on_delivery').prop("disabled", true);
    }
}
