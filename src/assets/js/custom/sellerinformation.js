
function AddFavoriteSeller() {
    $.ajax({
        url: "/User/AddFavoriteSeller",
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '';
                html = '<input type="checkbox" id="seller-notfication"  name="select" value="seller  notfication" class="custom___checkbox__input__style_2" checked disabled>'+
                    '<label for= "seller-notfication" onclick = "RemoveFavoriteSeller()" class= "signUp__checkBox custom___checkbox__style_2">'+
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label >';
                 
                //var Inpt = '<a href="JavaScript:void(0);" onclick="RemoveFavoriteSeller()"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;">UnFollow</span></a>' +
                //    '<span style = "font-size: 23px;font-weight: bold;" > all ads in this section</span>' +
                //    '<input type="checkbox" id="seller-notfication" name="select" value="seller  notfication" class="custom___checkbox__input__style_2" checked disabled>' +
                //    '<label for="seller-notfication" onclick="RemoveFavoriteSeller()" class="signUp__checkBox custom___checkbox__style_2">' +
                //    '<div class="image-radio-wrapper">' +
                //    '<span class="notifcation-bg"></span>' +
                //    '</div>' +
                //    '</label>';
                $('.favoriteSeller').html(html);
            }
            else {
                $("#AurhorizationModal").modal("show");
            }
             
        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });
}

function RemoveFavoriteSeller() {
    $.ajax({
        url: "/User/RemoveFavoriteSeller",
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '';
                html = ' <input type="checkbox" id="seller-notfication" name="select" value="seller  notfication" class="custom___checkbox__input__style_2" disabled>' +
                    '<label for= "seller-notfication" onclick = "AddFavoriteSeller()" class= "signUp__checkBox custom___checkbox__style_2">' +
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label>';
                //var Inpt = '<a href="JavaScript:void(0);" onclick="AddFavoriteSeller()"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;">Follow</span></a>' +
                //    '<span style = "font-size: 23px;font-weight: bold;" > all ads in this section</span>' +
                //    '<input type="checkbox" id="seller-notfication" name="select" value="seller  notfication" class="custom___checkbox__input__style_2" disabled>' +
                //    '<label for="seller-notfication" onclick="AddFavoriteSeller()" class="signUp__checkBox custom___checkbox__style_2">' +
                //    '<div class="image-radio-wrapper">' +
                //    '<span class="notifcation-bg"></span>' +
                //    '</div>' +
                //    '</label>';
                $('.favoriteSeller').html(html);               
            }
        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });
}

var markers = [], infoWindows = [];
function SellerMap() {
    var latitude = $("#seller-map").attr('data-lat');
    var longitude = $("#seller-map").attr('data-lon');
    $.ajax({
        url: "/Home/Map",
        type: 'POST',
        success: function (data) { 
        },
        error: function (data) {
            
        }
    });

}
function SetScreenAndSeller(sellerId, businessAccountId) {
    setCookie("screen", 2, 30);
    setCookie("sellerId", sellerId, 30);
    setCookie("businessAccountId", businessAccountId, 30);
}

function setMarkers(pos) {
    var xmarker = new google.maps.Marker({
        position: pos,
        map: _globMap,
        title: ''
    });
    markers.push({ marker: xmarker });
    xmarker.setMap(_globMap);
    _globMap.setZoom(12);

    var infowindow = new google.maps.InfoWindow({
        content: '<div class="mr-3" style="min-width: 150px;"><img class="rounded-circle img-sm" src=""> ' +
            '<b class="text-truncate font-weight-bold"></b>' +
            '<br/>' +
            '<b class="text-truncate font-weight-bold"> Signin :</b>' +
            '<br/>' +
            '<b class="text-truncate font-weight-bold">Signout : </b>' +
            '</div>'
    });
    infoWindows.push(infowindow);
    infowindow.open(_globMap, xmarker);
    xmarker.addListener('click', function () {
        infowindow.open(_globMap, xmarker);
    });
}