$(document).ready(function() {
    change_color();
    load_qty();
});

function add_to_cart_now(val){
    $('#cart_item').html("");
    $('#new_cart').html("");
    let size=$('#size').val();
    let clr=$("#clr_c option:selected").text();

    $.ajax({
        type:'GET',
        url: '/add-to-cart-single/'+val+'/'+size+'/'+clr,
        success: (response) => {
            if (response) {
                let sub_tot=0.00;
                $('#cart_item').append('<div class="minicart-content" >\n' +
                    '                    <div class="minicart-heading">\n' +
                    '                        <h4>Shopping Cart</h4>\n' +
                    '                    </div>\n' +
                    '                    <ul class="minicart-list" id="new_cart"></ul>\n' +
                    '                    </div>\n' +
                    '                    <div class="minicart-item_total" id="sub_tot">' +
                    '</div>\n' +
                    '                    <div class="minicart-btn_area">\n' +
                    '                        <a href="/Cart" class="kenne-btn kenne-btn_fullwidth">Show Cart</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="minicart-btn_area">\n' +
                    '                        <a href="/Checkout" class="kenne-btn kenne-btn_fullwidth" id="checkout">Checkout</a>\n' +
                    '                    </div>');
                let count=0;
                $.each(response, function(key,value) {
                    if (value.qty <= 0){

                    }else{
                        count++;
                        let price=value.price
                        sub_tot=sub_tot+price;
                        $('#new_cart').append('<li class="minicart-product" id="rcorners2">\n' +
                            '                                <div class="product-item_img">\n' +
                            '                                    <img src="../storage/' + value.item.zoom_img + '" alt="Kenne\'s Product Image">\n' +
                            '                                </div>\n' +
                            '                                <div class="product-item_content">\n' +
                            '                                    <a class="product-item_title" href="shop-left-sidebar.html">' + value.item.Name + '<br>(Size-'+ value.itemsize.Size_idSize +') (Clr-'+ value.itemsize.Colours_idColours +')</a>\n' +
                            '                                    <span class="product-item_quantity">' + value.qty + ' x LKR' + value.item.Sell_price + '</span>\n' +
                            '                                </div>\n' +
                            '                            </li>');
                    }
                });
                $('#sub_tot').append('\n' +
                    '                        <span>Subtotal</span>\n' +
                    '                        <span class="ammount">LKR '+sub_tot.toFixed(2)+'</span>\n' +
                    '                    ');
                if(count>0){

                }else{
                    $("#checkout").attr("href", "javascript:void(0)")
                }
            }
            load_qty();
        },
    });
}

function change_color(){
    $("#clr_c").empty();
    let id=$("#size").val();
    let item_id=$("#item_id").val();

    $.ajax({
        type:'GET',
        url: '/clr/'+item_id+'/'+id,
        success: (response) => {
            $.each(response, function (i, colour) {
                $( "#clr_c" ).append("<option value="+colour.colour_code+">"+colour.Colours_idColours+"</option>");
            });
            clr_change();
        },

    });
}

function clr_change(){
    $(".color-list").empty();
    let color_code=$("#clr_c").val();;
    let color=$("#clr_c option:selected").text();;
    $( ".color-list" ).append( "<style>.color-list_area .color-list .single-color span.bg-"+color+"_color {\n" +
            "                                            background-color: "+color_code+";\n" +
            "                                            display: block;\n" +
            "                                        }</style><a href='javascript:void(0)' class='single-color active' data-swatch-color='red'>\n" +
            "                                                <span class='bg-"+color+"_color'></span>\n" +
            "                                            </a>" );

    let size=$("#size").val();
    let item_id=$("#item_id").val();
    availablity(item_id,color,size);
}

var new_qty=1;

function availablity(item_id,color,size){
    $("#available").empty();
    $.ajax({
        type:'GET',
        url: '/availability/'+item_id+'/'+color+'/'+size,
        success: (response) => {
            $.each(response, function (i, colour) {
                if (colour.qty>0){
                    new_qty=colour.qty;
                    $( "#available" ).append("<li>Availability: <a href=\"javascript:void(0)\" style='color: green'>In Stock</a><a style='color: red' id='qty_count'> ("+colour.qty+")</a></li>");
                }else{
                    new_qty=0;
                    $( "#available" ).append("<li>Availability: <a href=\"javascript:void(0)\" style='color: red' id='out_qty'>Out Of Stock</a></li>");
                }

            });
        },

    });

}


function add_to_cart(){
    $('#cart_item').html("");
    $('#new_cart').html("");
        $.ajax({
        type:'GET',
        url: '/CartShow',
        success: (response) => {
            if (response) {
                let sub_tot=0.00;
                $('#cart_item').append('<div class="minicart-content" >\n' +
                '                    <div class="minicart-heading">\n' +
                '                        <h4>Shopping Cart</h4>\n' +
                '                    </div>\n' +
                '                    <ul class="minicart-list" id="new_cart"></ul>\n' +
                '                    </div>\n' +
                '                    <div class="minicart-item_total" id="sub_tot">' +
                '</div>\n' +
                '                    <div class="minicart-btn_area">\n' +
                '                        <a href="/Cart" class="kenne-btn kenne-btn_fullwidth">Show Cart</a>\n' +
                '                    </div>\n' +
                '                    <div class="minicart-btn_area">\n' +
                '                        <a href="/Checkout" class="kenne-btn kenne-btn_fullwidth" id="checkout">Checkout</a>\n' +
                '                    </div>');
                let count=0;
                $.each(response, function(key,value) {
                    if (value.qty <= 0){

                    }else{
                        count++;
                        let price=value.price
                        sub_tot=sub_tot+price;
                        $('#new_cart').append('<li class="minicart-product" id="rcorners2"><div class="product-item_img">\n' +
                            '                                    <img src="../storage/' + value.item.zoom_img + '" alt="Kenne\'s Product Image">\n' +
                            '                                </div>\n' +
                            '                                <div class="product-item_content">\n' +
                            '                                    <a class="product-item_title" href="javascript:void(0)">' + value.item.Name + '<br>(Size-'+ value.itemsize.Size_idSize +') (Clr-'+ value.itemsize.Colours_idColours +')</a>\n' +
                            '                                    <span class="product-item_quantity">' + value.qty + ' x LKR ' + value.item.Sell_price + '</span>\n' +
                            '                                </div>\n' +
                            '                            </li>');
                    }
            });

                $('#sub_tot').append('\n' +
                '                        <span>Subtotal</span>\n' +
                '                        <span class="ammount">LKR '+sub_tot.toFixed(2)+'</span>\n' +
                '                    ');
                if(count>0){

                }else{
                    $('#cart_item').html("");
                    $('#cart_item').append('<div class="minicart-content" >\n' +
                        '                    <div class="minicart-heading">\n' +
                        '                        <h4>No Items In The Cart !</h4>\n' +
                        '                    </div></div>\n' +
                        '                    ');
                    $("#checkout").attr("href", "javascript:void(0)")
                }
        }
    },
    });
}

function load_qty(){
    $('#tot_qty').html("");
    $('#tot_qty_01').html("");
    $('#tot_price').html("");
    $('#tot_qty_cart').html("");
    $.ajax({
        type:'GET',
        url: '/CartShow',
        success: (response) => {
            let totalQty=0.0;
            let price=0.0;
            $.each(response, function(key,value) {
                totalQty=totalQty+value.qty;
                price=price+value.price;
                console.log(price);
            });
            $('#tot_qty').append(totalQty);
            $('#tot_qty_01').append(totalQty);
            $('#tot_qty_cart').append(totalQty);
            $('#tot_price').append("LKR "+price.toFixed(2));

        },

    });
}


