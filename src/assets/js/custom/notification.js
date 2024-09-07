var page = 2; 


$("#showMore").click(function () {
     

    $.ajax({
        url: "/Home/GetMoreNotifications",
        type: 'Post',
        data: { 
            pageIndex: page, 
        },
        success: function (result) {

            $(".notif").append(result);
            if (isShowMore == 0) {
                $("#showMore").css('display','none');
            } else {
                $("#showMore").show();
                page++;
            }
        }
    });
});
