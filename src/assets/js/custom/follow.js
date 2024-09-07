

function FollowCat(id) {

    $.ajax({
        url: "/Home/AddFollow?id=" + id,
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '<a href="JavaScript:void(0);" onclick="UnFollowCat(' + id + ')"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;"></span></a>' +
                    '<input type = "checkbox" id = "seller-notfication" name = "select" value = "seller  notfication" class="custom___checkbox__input__style_2" checked disabled>' +
                    '<label for="seller-notfication" onclick="UnFollowCat(' + id + ')" class="signUp__checkBox custom___checkbox__style_2">' +
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label>';
                $('.favoriteSeller').html(html);
            }
            else if (data.message === 'Categories already exists'){
                $("#errorFollowCategory").modal("show");
            } 
        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });

}
function UnFollowCat(id) {
    $.ajax({
        url: "/Home/RemoveFollow?id=" + id,
        type: 'Delete',
        success: function (data) {
            if (data.status_code == 200) {
                $("#unFollowCategory").modal("show");
                window.location.href = '/User/Follow';
                //var html = '<a href="JavaScript:void(0);" onclick="FollowCat(' + id + ')"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;"></span></a>' +
                //    '<input type = "checkbox" id = "seller-notfication" name = "select" value = "seller  notfication" class="custom___checkbox__input__style_2" disabled>' +
                //    '<label for="seller-notfication"  onclick="FollowCat(' + id + ')" class="signUp__checkBox custom___checkbox__style_2">' +
                //    '<div class="image-radio-wrapper">' +
                //    '<span class="notifcation-bg"></span>' +
                //    '</div>' +
                //    '</label>';

                //$('.favoriteSeller').html(html);
            }             

        },
        error: function (data) { 
        }
    });
}
 
function RemoveFavoriteSeller(id) {
    $.ajax({
        url: "/User/RemoveFavoriteSeller",
        type: 'POST',
        success: function (data) {
            if (data.status == "Success") {
                window.location.href = '/User/Follow';
                var removeFavorite = '#removeFavorite_' + id;
                $("#removeFavoriteSeller").modal("show");
                $(removeFavorite).hide();

               
            }
        },
        error: function (data) {
            
        }
    });
}

function RemoveSearch(id) {
    $.ajax({
        url: "/User/RemoveSavedSearch?savedSearchId=" + id,
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {  
                var savedSearchId = '#Saved_' + id;
                $("#removedSavedSearch").modal("show");
                $(savedSearchId).hide();
            }
        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });
}
