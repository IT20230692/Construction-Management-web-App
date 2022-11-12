$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function() {
    load_item();
});

function initSlider() {
    $('.num-in span').click(function () {
        var input = $(this).parents('.num-block').find('input.in-num');
        if($(this).hasClass('minus')) {
            var count = parseFloat(input.val()) - 1;
            count = count < 1 ? 1 : count;
            if (count < 2) {
                $(this).addClass('dis');
            }
            else {
                $(this).removeClass('dis');
            }
            input.val(count);
        }else {
            var count = parseFloat(input.val()) + 1
            input.val(count);
            if (count > 1) {
                $(this).parents('.num-block').find(('.minus')).removeClass('dis');
            }
        }

        input.change();
        return false;
    });
}

function load_item(){
    $('#cart_item tbody').html("");
    $.ajax({
        type:'GET',
        url: '/CartShow',
        success: (response) => {

            if (response) {
                let tot_price=0.00;
                $.each(response, function(key,value) {
                    let num=value.price;
                    let button='';
                    let plsbutton='';
                    if (value.qty <= 1){
                        button='<span class="minus dis" disabled></span>';
                    }else{
                        button='<span class="minus dis" onclick="minus_qty('+value.itemsize.ID+')"></span>';
                    }
                    console.log(value.itemsize);
                    // if (parseFloat(value.itemsize.Qty) <= parseFloat(value.qty)){
                    //     plsbutton='<span class="plus" disabled></span>';
                    // }else{
                    //     plsbutton='<span class="plus" onclick="plus_qty('+value.itemsize.ID+')"></span>';
                    // }
                    if (value.qty <= 0){

                    }else{
                        $('#cart_item tbody').append('<tr>\n' +
                            ' <td class=\"kenne-product-remove\"><a href=\"javascript:void(0)\" onclick="remove_item('+value.itemsize.ID+')" id=\"remove_from_cart\"><i class=\"fa fa-trash\" title=\"Remove\"></i></a></td>\n' +
                            ' <td class=\"kenne-product-thumbnail\"><a href=\"javascript:void(0)\"><img style="max-height: 250px !important;" src="storage/' + value.item.zoom_img + '" class="test" alt=\"Uren\'s Cart Thumbnail\" ></a></td>\n' +
                            ' <td class=\"kenne-product-name\">' + value.item.Name + '<br>(Size-'+ value.itemsize.Size_idSize +') (Clr-'+ value.itemsize.Colours_idColours +')<a href=\"javascript:void(0)\"></a>\n' +
                            ' </td>\n' +
                            ' <td class=\"kenne-product-price\"><span class=\"amount\">' + value.item.Sell_price + '</span></td>' +
                            ' <td class="quantity">\n' +
                            ' <div class="num-block skin-2">\n' +
                            '                <div class="num-in">\n' +
                            '                    '+button+'\n' +
                            '                    <input type="text" class="in-num" value="' + value.qty + '" readonly="">\n' +
                            '                    <span class="plus" onclick="plus_qty('+value.itemsize.ID+')"></span>\n' +
                            '                </div>\n' +
                            '            </div>' +
                            ' </td>\n' +
                            ' <td class="product-subtotal"><span class="amount">'+num.toFixed(2)+'</span></td>');
                        initSlider();
                        tot_price=tot_price+num;
                        tot_price.toFixed(2);
                    }

                });

                $('#sub_tot_amount').text("LKR "+tot_price.toFixed(2));



            }
        },

    });
}

function remove_item(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this item ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type:'GET',
                url: '/remove-item/'+id,
                success: (response) => {
                    load_item();
                },

            });
            load_qty();
        }
    })
}

function plus_qty(val){
    $.ajax({
        type:'GET',
        url: '/add-to-cart/'+val,
        success: (response) => {
            let tot_price=0.00;
            $.each(response, function(key,value) {
                let num=parseFloat(value.price);
                tot_price=tot_price+num;
            });
            $('#sub_tot_amount').text("LKR "+tot_price.toFixed(2));
            load_item();
            load_qty();
        },
    });

}
function minus_qty(val){
    $.ajax({
        type:'GET',
        url: '/remove-from-cart/'+val,
        success: (response) => {
            let tot_price=0.00;
            $.each(response, function(key,value) {
                let num=parseFloat(value.price);
                tot_price=tot_price+num;
            });
            $('#sub_tot_amount').text("LKR "+tot_price.toFixed(2));
            load_item();
            load_qty();
        },
    });
}

function load_qty(){
    $('#tot_qty').html("");
    $('#tot_qty_01').html("");
    $('#tot_price').html("");
    $('#tot_qty_cart_01').html("");
    $.ajax({
        type:'GET',
        url: '/CartShow',
        success: (response) => {
            let totalQty=0.0;
            let price=0.0;
            $.each(response, function(key,value) {
                totalQty=totalQty+value.qty;
                price=price+value.price;
            });
            $('#tot_qty').append(totalQty);
            $('#tot_qty_01').append(totalQty);
            $('#tot_qty_cart_01').append(totalQty);
            $('#tot_price').append("LKR "+price.toFixed(2));

        },

    });
}
