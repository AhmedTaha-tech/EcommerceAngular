var paymentOption = 0;
var shippingOption = 0;
var ProductOrderPaymentDetails = [];
var product = {};
var qty = getCookie("Qty");
var basicAPI = localStorage.getItem("basicAPI");
var token = localStorage.getItem("jwttoken");
var providerId = localStorage.getItem("loggedIn");
var lang = localStorage.getItem("lang");
var isAr = false;
function getLang() {
    var lang = getCookie('lang');
    if (lang == "ar") {
        isAr = true;
        return true;
    }
    else {
        isAr = false;
        return false;
    }
}

$(document).ready(function () {
    getLang();
});

var saudiRyal = (isAr) ? 'ر.س' : 'S.R';

function SelectAddress(addressId) {
    $("#address-" + addressId).prop("checked", true);
}
$("input[name='user-address']").change(function () {

});
$(".btn-details").click(function () {
    var id = getCookie("OrderId");
    window.location.href = '/User/OrderDetail?OrderNo=' + id;
    setCookie("OrderId", '', 90);
});
function AddOrder() {
    ProductOrderPaymentDetails = [];
    var shippingOptionId = $("#shippingDropDown").val();
    var paymentOption = $("#paymentOptionDropDown").val();

    if (paymentOption == 0) {
        $("#errorSelectPaymentOptionModal").modal("show");
        return;
    }
    if (shippingOptionId == 0) {
        $("#errorSelectShippingOptionModal").modal("show");
        return;
    }


    if ($('input[name="user-address"]:checked').data("addressid") == undefined) {
        $("#errorSelectAddressModal").modal("show");
        return;
    }
    $.ajax({
        url: addOrderUrl,
        type: "Post",
        dataType: "json",
        data: {
            cartMasterId: cartMasterId,
            pay: 1,
            shippingAddressId: $('input[name="user-address"]:checked').data("addressid"),
            buyWithFixedRpriceOrNegotiation: buyType,
            ProductOrderPaymentDetailsDto: ProductOrderPaymentDetails
        },
        success: function (result) {
            if (result.status == "Success") {
                $("#order-number").text('#' + result.data.data.item2);
                var total = $("#total-cart").val();
                $("#TotalPriceForCartFinal").text(total + ' S.R');
                $("#OrderCompletedSuccessfullyModal").modal("show");
                $("#invalid-user-address").hide();
                setCookie("MainCartID", '', 90);
                setCookie("OrderId", result.data.data.item2, 90);
                setCookie("Qty", '', 90);
                $("#addOrder").hide();
            }
            else if (result.status == "Failed") {
                if (result.data != "" || result.data != null) {
                    var res = JSON.parse(result.data);
                    if (res.status == "ProductsOutOfStock") {
                        $("#errorProductsOutOfStockModal").modal("show");
                    }
                    else {
                        showAlert("Error", res.message, "error");
                    }

                }
            }
        },
        error: function (e) {
            $("#addOrder").show();
        }
    });
}
function ApplyCouponOnCart(businessAccountId) {
    var code = '';
    if (businessAccountId == 0) {
        if ($('#coupon-code').val() == '') {
            $("#invalid-coupon-code").show();
            return;
        } else {
            code = $('#coupon-code').val();
        }
    }
    else {
        if ($('#BussinessAccountCoupon').val() == '') {
            $("#invalid-bussiness-account-coupon-code").show();
            return;
        } else {
            code = $('#BussinessAccountCoupon').val();
        }
    }

    $.ajax({
        url: applyCouponOnCartUrl,
        type: "Post",
        dataType: "json",
        data: {
            cartMasterId: cartMasterId,
            couponCode: code,
            couponForbusinessAccountId: businessAccountId,
            buyWithFixedRpriceOrNegotiation: buyType,
            couponForProviderId: providerId
        },
        success: function (result) {
            if (result.status_code == 200) {
                var html = '';
                $("#invalid-coupon-code").hide();
                $("#total-price-for-cart-before-discount").show();
                $("#total-cart-price").text(decodeEntities(result.data[0].totalPriceForCart));
                FinialTotal = result.data[0].totalPriceForCart;
                $("#total-cart").val(result.data[0].totalPriceForCart);
                showAlert("Coupon", result.message, "success");

                html = '<button onclick="UnApplyCouponOnCart(0)">UnApply</button>';
                $('.btnConfirm').html(html);
            } else {
                showAlert("Coupon", result.message, "error");
            }
        },
        error: function (e) {
        }
    });
}
function UnApplyCouponOnCart(businessAccountId) {
    var code = '';
    if (businessAccountId == 0) {
        if ($('#coupon-code').val() == '') {
            $("#invalid-coupon-code").show();
            return;
        } else {
            code = $('#coupon-code').val();
        }
    }
    else {
        if ($('#BussinessAccountCoupon').val() == '') {
            $("#invalid-bussiness-account-coupon-code").show();
            return;
        } else {
            code = $('#BussinessAccountCoupon').val();
        }
    }
    $.ajax({
        url: UnApplyCouponOnCartUrl,
        type: "Post",
        dataType: "json",
        data: {
            cartMasterId: cartMasterId,
            couponCode: code,
            couponForbusinessAccountId: businessAccountId,
            buyWithFixedRpriceOrNegotiation: buyType,
            couponForProviderId: providerId
        },
        success: function (result) {

            if (result.status_code == 200) {
                var html = '';
                $("#invalid-coupon-code").hide();
                $("#total-price-for-cart-before-discount").show();
                $("#total-cart-price").text(decodeEntities(result.data[0].totalPriceForCart));
                FinialTotal = result.data[0].totalPriceForCart;
                $("#total-cart").val(result.data[0].totalPriceForCart);
                showAlert("Coupon", result.message, "success");

                html = '<button onclick="ApplyCouponOnCart(0)">Apply</button>';
                $('.btnConfirm').html(html);
            } else {
                showAlert("Coupon", result.message, "error");
            }
        },
        error: function (e) {
        }
    });
}



$("#shippingDropDown").change(function () {

    var shippingOption = $(this).val();
    var productId = $(this).attr('data-proId');

    var pro = { productId: productId, shippingOption: shippingOption, paymentOption: 0 };
    var isExist = ProductOrderPaymentDetails.find(x => x.shippingOption === shippingOption);

    if (isExist == undefined) {
        ProductOrderPaymentDetails.push(pro);
    }
});


$("#paymentOptionDropDown").change(function () {

    var productId = $(this).attr('data-proId');
    var paymentOptionId = $(this).val();
    var pro = { productId: productId, paymentOption: paymentOptionId, shippingOption: 0 };
    var isExist = ProductOrderPaymentDetails.find(x => x.paymentOption === paymentOptionId);
    if (isExist == undefined) {
        ProductOrderPaymentDetails.push(pro);
    }

    if (paymentOptionId != 0 && (paymentOptionId == 3 || paymentOptionId == 4)) {
        $('.paymentMethod').show();
    } else {
        $('.paymentMethod').css('display', 'none');
    }

});



$("#AddAddress").click(function () {
    var _this = this;
    $("#AddressModal").modal("show");
});




var CountryOptions = '';
function GetCity(id) {
    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            'Provider-Id': providerId,
            'User-Language': lang,
            'Application-Source': 'Website',
        },
        type: 'GET',

        url: eCommerceAPIUrl + '/api/v1/ListNeighborhoodByRegionId?regionsIds=' + id + '&currentPage=1&lang=' + lang,
        success: function (data) {
            var Seletc = "<option value='0'>Select City</option>";
            $('#ddlCity').append(Seletc);
            var CityOptions = data;
            if (data.length != 0) {

                var options = '';
                $.each(CityOptions.data, function (index, value) {
                    options += '<option value="' + value.id + '">' + value.name + '</option>';
                });


                $('#ddlCity').append(options);

            }
            else {
            }

        },
        error: function () {

        }

    });
}
function GetRegion(id) {

    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            'Provider-Id': providerId,
            'User-Language': lang,
            'Application-Source': 'Website',
        },
        type: 'GET',

        url:  eCommerceAPIUrl + '/api/v1/ListRegionsByCountryId?countriesIds=' + id + '&currentPage=1&lang=' + lang,
        success: function (data) {
            var SeletcR = "<option value='0'>Select region</option>";
            $('#ddlRegoins').append(SeletcR);
            var SeletcC = "<option value='0'>Select City</option>";
            $('#ddlCity').append(SeletcC);

            CountryOptions = data;
            if (data.length != 0) {
                var options = '';
                $.each(CountryOptions.data, function (index, value) {
                    options += '<option value="' + value.id + '">' + value.name + '</option>';

                });
                $('#ddlRegoins').append(options);


            }
            else {
            }

        },
        error: function () {


        }

    });
}

$("#ddlCountries").change(function () {

    $("#ddlCity").empty();
    $("#ddlRegoins").empty();
    GetRegion(this.value);
    var delayInMilliseconds = 800; //1 second
    setTimeout(function () {
        if ($("#ddlRegoins").val != null) {
            $("#ddlCity").empty();
            var c = $("#ddlRegoins").val();
            GetCity(c);
        }
    }, delayInMilliseconds);
    var SeletcC = "<option value='0'>Select City</option>";
    $('#ddlCity').append(SeletcC);
});
$("#ddlRegoins").change(function () {
    $("#ddlCity").empty();
    GetCity(this.value);
});

function checkCountry() {
    var countryId = $('#ddlCountries').val();
    if (countryId == 0) {
        $(".error-messages-Country").show();
    }
    else {
        $(".error-messages-Country").hide();
    }
}
function checkRegion() {
    var regionId = $('#ddlRegoins').val();
    if (regionId == 0) {
        $(".error-messages-region").show();
    }
    else {
        $(".error-messages-region").hide();
    }
}
function checkCity() {
    var ddlCity = $('#ddlCity').val();
    if (ddlCity == 0) {
        $(".error-messages-City").show();
    }
    else {
        $(".error-messages-City").hide();
    }
};

var errorTitle = document.getElementById('title-error');
var errorLong = document.getElementById('long-error');
var errorname = document.getElementById('name-error');
var errorLat = document.getElementById('lat-error');

function SaveAddress() {

    var ddlCountries = $('#ddlCountries').val();
    var ddlRegoins = $('#ddlRegoins').val();
    var ddlCity = $('#ddlCity').val();
    var countryddl = $('#countryDDL').val();
    var phone = $('#txtphoneNum').val();

    var phoneWithDDL = (countryddl + phone);
    var firstChar = phoneWithDDL.charAt(0);
    if (firstChar === '+') {
        phoneWithDDL = phoneWithDDL.substring(1);
    }

    var formdata = {
        location: "" + $('#ddlCountries option:selected').text() + "/" + $('#ddlRegoins option:selected').text() + "/" + $('#ddlCity option:selected').text(),
        title: $('#txtTitle').val(),
        phone: phoneWithDDL,
        name: $('#txtfName').val(),
        street: $('#Street').val(),
        appartment: $('#appartment').val(),
        floor: $('#floor').val(),
        building: $('#Building').val(),
        lat: $('#txtLat').val(),
        lng: $('#txtLng').val(),
        defaultAddress: $('#ddldefaultAddress').val()
    };

    if (ddlCountries == 0) {
        $(".error-messages-Country").show();
    }
    else {
        $(".error-messages-Country").hide();
    }
    if (ddlRegoins == 0) {
        $(".error-messages-region").show();
    }
    else {
        $(".error-messages-region").hide();
    }
    if (ddlCity == 0) {
        $(".error-messages-City").show();
    }
    else {
        $(".error-messages-City").hide();
    }

    var name = $('#txtfName').val();
    if (name.length == 1) {
        $(".error-messages-name-two-letters").show();
        $(".error-messages-name").hide();
        errorname.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else if (!CheckUserName(name)) {
        $(".error-messages-name").show();
        $(".error-messages-name-two-letters").hide();
        errorname.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else {
        $(".error-messages-name-two-letters").hide();
        $(".error-messages-name").hide();
        errorname.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    }

    var title = $('#txtTitle').val();
    if (title == '') {
        $(".error-messages-title").show();
        errorTitle.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else {
        $(".error-messages-title").hide();
        errorTitle.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    }

    //var lat = $('#txtLat').val();
    //if (lat == '') {
    //    $(".error-messages-lat").show();
    //    errorLat.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    //}
    //else {
    //    $(".error-messages-lat").hide();
    //    errorLat.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    //}
    //var lot = $('#txtLng').val();
    //if (lot == '') {
    //    $(".error-messages-long").show();
    //    errorLong.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    //}
    //else {
    //    $(".error-messages-long").hide();
    //    errorLong.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    //}
    var phone = $('#txtphoneNum').val();
    if (phone == '') {
        $(".error-messages-phone").show();
    }
    else {
        $(".error-messages-phone").hide();
    }
    var Building = $('#Building').val();
    if (Building == '') {
        $(".error-messages-building").show();
    }
    else {
        $(".error-messages-building").hide();
    }
    var appartment = $('#appartment').val();
    if (appartment == '') {
        $(".error-messages-appartment").show();
    }
    else {
        $(".error-messages-appartment").hide();
    }
    var street = $('#Street').val();
    if (street == '') {
        $(".error-messages-street").show();
    }
    else {
        $(".error-messages-street").hide();
    }
    var floor = $('#floor').val();
    if (floor == '') {
        $(".error-messages-floor").show();
    }
    else {
        $(".error-messages-floor").hide();
    }
    if ($('#txtfName').val() != '' && $('#txtphoneNum').val() != '' && ddlCountries != 0 && ddlRegoins != 0 && ddlCity != 0 &&
        $('#txtTitle').val() != '' && $('#Street').val() != '' && $('#Building').val() != '' && $('#appartment').val() != '' && $('#floor').val() != '') {
        $.ajax({
            type: 'POST',
            dataType: 'multipart/form-data',
            url:  eCommerceAPIUrl + '/api/v1/AddAddressForUser',
            data: formdata,
            headers: {
                'Authorization': $('#Auth').val()
            },
            success: function (data) {
                $("#AddressModal").modal("hide");
                location.reload();
            },
            error: function (data) {

                if (data.status == 200) {
                    $("#AddressModal").modal("hide");
                    location.reload();
                }
                else {

                    var Response = jQuery.parseJSON(data.responseText);
                    var error = Response.errors;
                    var Arr = [];
                    Arr.push(error.title)
                    Arr.push(error.appartment)
                    Arr.push(error.building)
                    Arr.push(error.defaultAddress)
                    Arr.push(error.floor)
                    Arr.push(error.lat)
                    Arr.push(error.lng)
                    Arr.push(error.name)
                    Arr.push(error.phone)
                    Arr.push(error.street)
                    var Err = "";
                    for (var i = 0; i < Arr.length; i++) {
                        if (Arr[i] != undefined) {
                            Err += '<div class="alert alert - danger form-control"  style="background-color: #f8d7da" role="alert">' + Arr[i] + '</div>';

                        }
                    }
                    $('#ErrMsg').html(Err)

                }
                $(".success-messages").css("display", "none");
                $(".error-messages").css("display", "block");
                $(".error-messages").html("Card insert failed");
                setTimeout(function () { $(".error-messages").slideToggle(500); }, 3000);
            }
        });
    }

}
function checkName() {
    var name = $('#txtfName').val();
    if (name.length == 1) {
        $(".error-messages-name-two-letters").show();
        $(".error-messages-name").hide();
        errorname.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else if (!CheckUserName(name)) {
        $(".error-messages-name").show();
        $(".error-messages-name-two-letters").hide();
        errorname.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else {
        $(".error-messages-name-two-letters").hide();
        $(".error-messages-name").hide();
        errorname.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    }
}

function checkTitle() {
    var title = $('#txtTitle').val();
    if (title == '') {
        $(".error-messages-title").show();
        errorTitle.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else {
        $(".error-messages-title").hide();
        errorTitle.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    }
}
function checkPhone() {
    var phone = $('#txtphoneNum').val();
    if (phone == '') {
        $(".error-messages-phone").show();
    }
    else {
        $(".error-messages-phone").hide();
    }

}
function checkLatitude() {
    var lat = $('#txtLat').val();
    if (lat == '') {
        $(".error-messages-lat").show();
        errorLat.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else {
        $(".error-messages-lat").hide();
        errorLat.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    }
}

function checkLongitude() {
    var lot = $('#txtLng').val();
    if (lot == '') {
        $(".error-messages-long").show();
        errorLong.innerHTML = '<i class="far fa-times-circle" style="font-size:35px;color:red"></i>';
    }
    else {
        $(".error-messages-long").hide();
        errorLong.innerHTML = '<i class="far fa-check-circle" style="font-size:35px;color:seagreen"></i>';
    }
}
function checkStreet() {
    var street = $('#Street').val();
    if (street == '') {
        $(".error-messages-street").show();
    }
    else {
        $(".error-messages-street").hide();
    }
}
function checkBuilding() {
    var Building = $('#Building').val();
    if (Building == '') {
        $(".error-messages-building").show();
    }
    else {
        $(".error-messages-building").hide();
    }
}
function checkAppartment() {
    var appartment = $('#appartment').val();
    if (appartment == '') {
        $(".error-messages-appartment").show();
    }
    else {
        $(".error-messages-appartment").hide();
    }
}
function checkFloor() {
    var floor = $('#floor').val();
    if (floor == '') {
        $(".error-messages-floor").show();
    }
    else {
        $(".error-messages-floor").hide();
    }
}

var deletedShippmentIndex;
function showConfirmation(cartMasterId, providerId, businessAccountId, shipmentIndex) {
    deletedShippmentIndex = shipmentIndex;
    $('#cartMsterId').val(cartMasterId);
    $('#providerId').val(providerId);
    $('#businessAccountId').val(businessAccountId);
    $("#showConfirmationModal").modal("show");
}
function removeShippmentProductsFromCart() {
    var cartMasterId = $('#cartMsterId').val();
    var providerId = $('#providerId').val();
    var businessAccountId = $('#businessAccountId').val();

    $.ajax({
        url: "/OrderCheckout/RemoveShippmentProductsFromCart?cartMasterId=" + cartMasterId + "&providerId=" + providerId + "&businessAccountId=" + businessAccountId ,
        type: 'Delete',
        success: function (data) {
            if (data.status_code == 200) {
                $("#successremoveShippmentModal").modal("show");
                $(`#shipmentid_${deletedShippmentIndex}`).remove();
                if ($('div[id^="shipmentid_"]').length == 0)
                    window.location.href = '/Home/Index';
            }

        },
        error: function (data) {
        }
    });
}

/*Design scripts start*/
$("#visa-payment-method").click(function () {
    if ($(this).is(":checked")) {
        $(".payment-method-option-settings.visa-card-settings").addClass("payment-check-active");
        $("#visa-payment-method-dropdown").show('slow');
        $("#saudi-bank-payment-method-dropdown").hide('slow');
        $(".payment-method-option-settings.saudi-bank-setting").removeClass("payment-check-active");
    }
});
$("#saudi-bank-payment-method").click(function () {
    if ($(this).is(":checked")) {
        $(".payment-method-option-settings.saudi-bank-setting").addClass("payment-check-active");
        $(".payment-method-option-settings.visa-card-settings").removeClass("payment-check-active");
        $("#saudi-bank-payment-method-dropdown").show('slow');
        $("#visa-payment-method-dropdown").hide('slow');
    }
});


$("#visaCard").click(function () {
    if ($(this).is(":checked")) {
        $(".visa-card-checkbox-main-wrapper").addClass("visa-card-checkbox-main-active");
    } else {
        $(".visa-card-checkbox-main-wrapper").removeClass("visa-card-checkbox-main-active");
    }
});
/*Design scripts end*/


$(function () {
    var dd1 = new dropDownshipping($('#shippingDropDown'));
    $(document).click(function () {
        $('.accountDropDownWrapper').removeClass('active');
    });
});


function dropDownshipping(el) {

    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdownCard > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
dropDownshipping.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function () {
            $(this).toggleClass('active');
            return false;
        });
        obj.opts.on('click', function () {
            var opt = $(this);
            shippingOption = $(this).attr('data-val-ship');
            var productId = $(this).attr('data-proId');
            shippingOption = shippingOption != undefined ? shippingOption : 0;

            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            product.productId = productId;
            product.shippingOption = shippingOption;

            //if (Object.values(product).indexOf(shippingOption) == -1) {

            //}

            //ProductOrderPaymentDetails.push(product);

        });
    }
}
$(function () {
    var dd1 = new dropDown($('#paymenionDropDown'));
    $(document).click(function () {
        $('.accountDropDownWrapper').removeClass('active');
    });
});
function dropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdownCard > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
dropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function () {
            $(this).toggleClass('active');
            return false;
        });
        obj.opts.on('click', function () {
            var opt = $(this);
            paymentOption = $(this).attr('data-val');
            var productId = $(this).attr('data-proId');
            var paymentOptionId = $(this).attr('data-paymentOptionId');//1,2,3,4
            paymentOption = paymentOption != undefined ? paymentOption : 0;
            paymentOptionId = paymentOptionId != undefined ? paymentOptionId : 0;
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);

            product.productId = productId;
            product.paymentOption = paymentOption;

            //if (Object.values(product).indexOf(paymentOption) == -1) {

            //}
            //ProductOrderPaymentDetails.push(product);
            //console.log(ProductOrderPaymentDetails)

            if (paymentOptionId != 0 && (paymentOptionId == 3 || paymentOptionId == 4)) {
                $('.paymentMethod').show();
            } else {
                $('.paymentMethod').css('display', 'none');
            }
        });
    }
}


function IncreaseItemForCheckout(cartMsterId, id, qty, productQty) {
    qty = parseFloat(qty);
    qty = (isNaN(qty)) ? 0 : qty;
    productQty = parseFloat(productQty);
    productQty = (isNaN(productQty)) ? 0 : productQty;

    if (qty == null || productQty == qty) {
        $("#errorTheQuantityEqualCartProductQuantityModal").modal("show");
        return;
    }

        $.ajax({

            type: 'POST',
            url:  eCommerceAPIUrl + '/api/v1/IncreaseCartProductQuantity?cartproductId=' + id + '&quantity=1',
            success: function (response) {
                if (response.status_code == 200) {
                    $.ajax({
                        type: 'get',
                        url: mainCart,
                        data: {
                            MainCart: cartMsterId
                        },
                        success: function (data) {
                            $("#total").text(data.data.data.totalPriceForCartBeforeDiscount);
                            $("#totla-1").removeClass('d-none');
                            if (data.data.data != null) {
                                for (var i = 0; i < data.data.data.listCartProducts.length; i++) {
                                
                                    for (var x = 0; x < data.data.data.listCartProducts[i].listProduct.length; x++) {                                       
                                        var html = '';
                                        var qty = data.data.data.listCartProducts[i].listProduct[x].qty;
                                        var cartProductQuantity = data.data.data.listCartProducts[i].listProduct[x].cartProductQuantity;
                                        var cartproductId = data.data.data.listCartProducts[i].listProduct[x].cartproductId;

                                        html = ' <input type="text" class="shipments-order-inner-product-quantity Qty float" id="qty_' + cartproductId + '" value="' + cartProductQuantity + '" disabled>' +
                                            '<div class="decreaseQty decreaseQty-position" onclick="DecreaseItemForCheckout(' + cartMsterId + ', ' + cartproductId + ', ' + qty + ', ' + cartProductQuantity + ')">' +
                                            '<div class="inputValueMinusinner"><i class="w-icon-minus"></i></div>' +
                                            '</div >' +
                                            '<div class="increaseQty increaseQty-position" onclick="IncreaseItemForCheckout(' + cartMsterId + ', ' + cartproductId + ', ' + qty + ', ' + cartProductQuantity + ')">' +
                                            '<div class="inputValuePlusinner"><i class="w-icon-plus"></i></div>' +
                                            '</div>';    

                                        $('#increaseQty-decreaseQty_' + cartproductId).html(html);
                                    }
                                   
                                }

                                
                                $('#total-cart-price').text(data.data.data.totalPriceForCartFinal + ' ' + decodeEntities(saudiRyal));
                                $('#finalTotalPriceForBusinessAccount').text(data.data.data.totalPriceForCartFinal + ' ' + decodeEntities(saudiRyal));
                                $('#total-cart').val(data.data.data.totalPriceForCartFinal);
                            }

                        },
                        error: function (xhr, status) {
                        }
                    });
                }
            },
            error: function (response) {
            }

        });

}

function DecreaseItemForCheckout(cartMsterId, id, qty, productQty) {
    if (productQty == 1) {
        return;
    }
    qty = parseFloat(qty);
    qty = (isNaN(qty)) ? 0 : qty;
    productQty = parseFloat(productQty);
    productQty = (isNaN(productQty)) ? 0 : productQty;

        $.ajax({
            type: 'POST',
            url:  eCommerceAPIUrl + '/api/v1/DecreaseCartProductQuantity?cartproductId=' + id + '&quantity=1',
            success: function (response) {
                if (response.status_code == 200) {
                    $.ajax({
                        type: 'get',
                        url: mainCart,
                        data: {
                            MainCart: cartMsterId
                        },
                        success: function (data) {
                            $("#total").text(data.data.data.totalPriceForCartBeforeDiscount);
                            $("#totla-1").removeClass('d-none');

                            if (data.data.data != null) {
                                for (var i = 0; i < data.data.data.listCartProducts.length; i++) {
                                    
                                    for (var x = 0; x < data.data.data.listCartProducts[i].listProduct.length; x++) {                                        
                                        var html = '';
                                        var qty = data.data.data.listCartProducts[i].listProduct[x].qty;
                                        var cartProductQuantity = data.data.data.listCartProducts[i].listProduct[x].cartProductQuantity;
                                        var cartproductId = data.data.data.listCartProducts[i].listProduct[x].cartproductId;

                                        html += '<input type="text" class="shipments-order-inner-product-quantity Qty float" id="qty_' + cartproductId + '" value="' + cartProductQuantity + '" disabled>' +
                                            '<div class="decreaseQty decreaseQty-position" onclick="DecreaseItemForCheckout(' + cartMsterId + ', ' + cartproductId + ', ' + qty + ', ' + cartProductQuantity + ')">' +
                                            '<div class="inputValueMinusinner"><i class="w-icon-minus"></i></div>' +
                                            '</div >' +
                                            '<div class="increaseQty increaseQty-position" onclick="IncreaseItemForCheckout(' + cartMsterId + ', ' + cartproductId + ', ' + qty + ', ' + cartProductQuantity + ')">' +
                                            '<div class="inputValuePlusinner"><i class="w-icon-plus"></i></div>' +
                                            '</div>';  

                                        $('#increaseQty-decreaseQty_' + cartproductId).html(html);
                                    }
                                }
                            

                                $('#total-cart-price').text(data.data.data.totalPriceForCartFinal + ' ' + decodeEntities(saudiRyal));
                                $('#finalTotalPriceForBusinessAccount').text(data.data.data.totalPriceForCartFinal + ' ' + decodeEntities(saudiRyal));
                                $('#total-cart').val(data.data.data.totalPriceForCartFinal);
                            }

                        },
                        error: function (xhr, status) {
                        }
                    });
                }
            },
            error: function (response) {


            }

        });
}
