function AddAndRemoveProductFavourit(element ,productId) {
    $.ajax({
        url: addFavouritProductUrl,
        type: "Post",
        dataType: "json",
        data: {
            productId: productId,
        },
        success: function (result) {
            if (result.status == "Success") {
                if (currentPageName == "FavouriteProducts")
                    $("#div_" + productId).hide();
                else
                    if ($(element).attr("data-isfavourite") == "True") {
                        $(".fav-icon_" + productId).css("background-color", "white");
                        $("#FavIco-" + productId).css("color", "black");
                        $(element).attr("data-isfavourite", "False");
                    }
                    else {
                        $(".fav-icon_" + productId).css("background-color", "#EE6C4D");
                        $("#FavIco-" + productId).css("color", "white");
                        $(element).attr("data-isfavourite", "True");
                    }
            } else {
               
                $("#AurhorizationModal").modal("show");
            }
               
        },
        error: function (e) { 
            $("#AurhorizationModal").modal("show");            
        }
    });
}

function ProductOptionModel(id, appearSendOffer, diffOfDates) {
    $("#productId").val(id); 
    $("#sendOffer").attr('data-id', id);
    $("#ShowOptionModal").modal("show");
 
    
    if (appearSendOffer == "True") {
        $(".showSendOffer").css("display", "block");
    }
    else
    {
        $(".showSendOffer").css("display", "none");
    }
     
}
function SendOffer() {
    var id = $("#sendOffer").attr('data-id');
    $.ajax({
        type: 'Get',
        dataType: "json",
        url: '/Advertisement/GetBids?productId=' + id,
        success: function (result) {
            if (result.data) {
                var html = '';
                if (result.data.length > 0) {
                    for (var i = 0; i < result.data.length; i++) {
                        $('#selected').text(result.data.length);
                        var bid = result.data[i];
                        const d = new Date(bid.createdAt);
                        html += '<li>' +
                            '<div class="checklist-user-single-wrapper">' +
                            '<div class="checklist-user-img">' +
                            '<img src="/assets/images/Dummy.png">' +
                            '</div>' +
                            '<div class="checklist-user-desc">' +
                            '<p>' + d.toLocaleDateString() + '</p>' +
                            '<h3>' + bid.userName + '</h3>' +
                            '<label>' + bid.bidPrice + ' L.E</label>' +
                            '</div>' +
                            '<div class="checklist-user-checkbox">' +
                            '<div class="single-filter-checkbox">' +
                            '<div class="custom-checkbox-wrapper">' +
                            '<input id="' + bid.userId + '" name="userbid" type="checkbox" class="checkBoxClass" value="' + bid.userId + '">' +
                            '<label for="' + bid.userId + '"></label>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</li>';

                    }

                    $('#bids').html(html); //
                    $('#sendOfferModal').modal('show');
                } else {
                    $('#NoDataFound').modal('show');
                }                
            }
        },
        error: function (response) {

        }
    });
    //var id = $("#productId").val();

}

function SendOfferNext() {
    $('#addPriceAndQtyModal').modal('show');
}
function SaveOffer() {
    var formData = new FormData();
    var users = [];
    var productId = $("#sendOffer").attr('data-id');
    var price = $('#offerPrice').val();
    var qty = $('#quantity').val();
    var offerExpireHours = $('#exipre-hours-select').val();
     
    $('#bids input:checked').each(function () { 
        users.push(this.value);
    });

    formData.append('productId', productId);
    formData.append('price', price);
    formData.append('quantity', qty);
    formData.append('offerExpireHours', offerExpireHours);
    formData.append('userIds', users);
    var total = price * qty;
    $.ajax({
        type: 'POST',
        url: '/Advertisement/AddProductBidOffers',
        contentType: false,
        processData: false,
        data: formData,
    
        success: function (result) {
            if (result.data) { 
                $('#price').val('');
                $('#quantity').val('');
                $(".negoationTotal").text('#' + total);
                $('#ResponseSendOfferModal').modal('show');
            }
        },
        error: function (response) {

        }
    });

  
}

function RepostProduct() {
    var id = $("#sendOffer").attr('data-id');
    window.location.href = '/Advertisement/GetProductInfo?id=' + id + '&type=2';// type=2 Repost
} 

function DiscountEditDeleteModal(id, price, isFixedPriceEnabled) {
    $("#productId").val(id);
    $("#price").val(price); 
    if (isFixedPriceEnabled == "True") {
        $(".showDiscount").css("display", "block");
    }
    else {
        $(".showDiscount").css("display", "none");
    }
    $("#ShowDiscountEditDeleteModal").modal("show");   
}


function Discount() { 
    $('.discountVal').text('');
    $('.discountVal').val('');
    $('.discountVal').focus();
    $("#DiscountModal").modal("show");
  
    var price = $("#price").val();
    $('#discountAmount').text(price + ' SR');
}
function addDiscount() {
    var productId = $("#productId").val();
    var discount = $('.discountVal').val();
    var disccountEndDate = $('#disccountEndDate').val();
    var price = $("#price").val();

    if (discount == '') {        
        $('.errorAddDiscountMessage').show();
        $('.errorDiscountGreaterThanZeroMessage').hide();
        $('.errorDiscountExpireDateMessage').hide();
        $('.errorDiscountGreaterThanMessage').hide();
        $('#DiscountModal').modal({ backdrop: 'static', keyboard: false });
        return;
    }
    
    if (parseFloat(price) <= parseFloat(discount)) {
       
        $('.errorAddDiscountMessage').hide();
        $('.errorDiscountGreaterThanZeroMessage').hide();
        $('.errorDiscountExpireDateMessage').hide();
        $('.errorDiscountGreaterThanMessage').show();
        $('#DiscountModal').modal({ backdrop: 'static', keyboard: false });
        return;
    }
    if (discount < 0) {
        $('.errorAddDiscountMessage').hide();
        $('.errorDiscountGreaterThanMessage').hide();
        $('.errorDiscountGreaterThanZeroMessage').show();
        $('.errorDiscountExpireDateMessage').hide();
        $('#DiscountModal').modal({ backdrop: 'static', keyboard: false });
        return;
    }
    if (disccountEndDate == '') {
        $('.errorDiscountExpireDateMessage').show();
        $('.errorDiscountGreaterThanZeroMessage').hide();
        $('.errorAddDiscountMessage').hide();
        $('.errorDiscountGreaterThanMessage').hide();
        $('#DiscountModal').modal({ backdrop: 'static', keyboard: false });
        return;
    }

    $.ajax({
        type: 'Post',
        url: '/Home/ProductDiscount?id=' + productId + '&discount=' + discount + '&disccountEndDate=' + disccountEndDate,
        dataType: "json",
        success: function (response) {
            if (response.status == "Success") {
                $("#DiscountModal").modal("hide");
                $("#AddedDisccountSuccessfullyModal").modal("show"); 
            }
        },
        error: function (error) {
        }

    });
}
function EditProduct() {
    var id = $("#productId").val();
    window.location.href = '/Advertisement/GetProductInfo?id=' + id + '&type=1';// type=1 Edit
}
function Delete() {
    var productId = $("#productId").val(); 
    $("#DeleteModal").modal("show");
    //$.ajax({
    //    url: '/User/DeleteProduct',
    //    type: "Post",
    //    data: {
    //        RecordID: productId
    //    },
    //    beforeSend: function () {
    //    },
    //    success: function (data) {
    //        $('#ActionModal2').html(data);
    //        $('#exampleModal2').modal('show');
    //    }
    //});
}
function ConfirmDelete() {
    var productId = $("#productId").val(); 
    $.ajax({
        url: '/User/Delete',
        type: "Post",
        data: {
            RecordID: productId
        },
        beforeSend: function () {
        },
        success: function (data) {
            $('#DeleteModal').modal('hide');
            $('#DeletedSuccessfullyModal').modal('show');
            window.location.href = '/Home/Index';
        }
    });
}

function increaseQty() {
    var discount = $('.discountVal').val();
    var val = parseFloat(discount);
    val = (isNaN(val)) ? 0 : val;
    val++;
    $('.discountVal').val(val);
}
function decreaseQty() {
    var discount = $('.discountVal').val();
    var val = parseFloat(discount);
    val = (isNaN(val)) ? 0 : val;
    if (val > 0) {
        val--;
    }
    $('.discountVal').val(val);
}

//$(document).on('click', '.increaseQty', function () {
//    var discount = $('.discountVal').val();
//    var val = parseFloat(discount);
//    val = (isNaN(val)) ? 0 : val;
//    if (val > 0) {
//        val--;
//    }
//    $('.discountVal').val(val);
//});
//$(document).on('click', '.decreaseQty', function () {
//    var discount = $('.discountVal').val();
//    var val = parseFloat(discount);
//    val = (isNaN(val)) ? 0 : val;
//    if (val > 0) {
//        val--;
//    }
//    $('.discountVal').val(val);
//});