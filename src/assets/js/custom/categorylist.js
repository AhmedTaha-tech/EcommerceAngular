
function AddFollowList() {
    var selected = [];
    $('#categories input:checked').each(function () {
        selected.push($(this).val());
    });
    $('#subcategories input:checked').each(function () {
        selected.push($(this).val());
    });
    $.ajax({
        url: "/Home/AddFollowList",
        type: 'POST',
        data: { categoris: selected },
        dataType: "json",
        success: function (data) {
            if (data.status_code == 200) {
                window.location.href = '/User/Follow';
            } else if (data.message === 'Categories already exists') {
                $("#errorFollowCategory").modal("show");
            }  
        },
        error: function (data) {
        }
    });
}

$(".category").click(function () {
    var id = $(this).attr('data-id'); 
    if ($(this).is(":checked")) {
        $.ajax({
            url: "/Home/GetSubCategoryByMainCategory?id=" + id,
            type: 'GET',
            success: function (result) {

                $(".subCategory").append(result);
            }
        });
    } else {
        $(".subCategory").empty();
        $('#categories input:checked').each(function () {
            $.ajax({
                url: "/Home/GetSubCategoryByMainCategory?id=" + $(this).val(),
                type: 'GET',
                success: function (result) {

                    $(".subCategory").append(result);
                }
            }); 
        });
    }
});

