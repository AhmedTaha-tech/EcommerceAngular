
function ReviewFilter() {
    var reviewsAs =  $('#reviewsAs').val();
    var reviewstype = $('#reviewstype').val();
    $.ajax({
        url: "/Home/UserRatePartial?ReviewsAs=" + reviewsAs + "&ReviewsType=" + reviewstype,
        type: 'POST',
        success: function (data) {
            $(".rates").html(data);
        },
        error: function (data) { 
        }
    });
}