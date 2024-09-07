$(".date-of-birth-picker").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: new Date(),
});
function Discount() {
    $("#DiscountModal").modal("show");
    $('.discountVal').focus();
}
function addDiscount(id) { 
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
        url: '/Home/ProductDiscount?id=' + id + '&discount=' + discount + '&disccountEndDate=' + disccountEndDate,  
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


$(document).on('click', '.increaseQty', function () {
    var discount = $('.discountVal').val(); 
    var val = parseFloat(discount);
    val = (isNaN(val)) ? 0 : val;
    val++;
    $('.discountVal').val(val);
});
$(document).on('click', '.decreaseQty', function () {
    var discount = $('.discountVal').val();
    var val = parseFloat(discount);
    val = (isNaN(val)) ? 0 : val;
    if (val > 0) {
        val--;
    }
    $('.discountVal').val(val);
});