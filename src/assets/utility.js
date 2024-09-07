
var basicAPI = localStorage.getItem("basicAPI");
var token = localStorage.getItem("jwttoken");
var providerId = localStorage.getItem("loggedIn");
var lang = localStorage.getItem("lang");
var isAr = false;

function requestHeaders() {

    var headers = {
        'Authorization': 'Bearer ' + token,
        'Provider-Id': providerId,
        'User-Language': lang,
        'Application-Source': 'Website',
    };
    return headers;
}

function checkForm(form) {
    var input = form.find('input:visible,select:visible,textarea:visible'), t = 0;
    form.find('.error').remove();
    for (var i = 0; i < input.length; i++) {
        if ($(input[i]).attr('required')) {
            var val = $(input[i]).val();
            var err = $(input[i]).attr('data-errorMessage');
            val = (val == null) ? '' : val;
            if (!$.isArray(val)) {
                if (val.trim() == '' || val.trim() == '-0') {

                    if (!$(input[i]).is("select")) {

                        if ($(input[i])[0].type == 'file') {
                            var elm = $(input[i]).closest('form');
                            elm.addClass('required');
                            if (err != undefined) {
                                $('<span class="error">' + err + '</span>').insertAfter(elm);
                            }

                        }
                        else {
                            $(input[i]).addClass('required');
                            if (err != undefined) {
                                $('<span class="error">' + err + '</span>').insertAfter(input[i]);
                            }

                        }
                    }
                    else {
                        var _this = $(input[i]);
                        $(_this).addClass('required');
                        var select2 = $(_this).next('.select2');
                        select2.addClass('required');
                        if (err != undefined) {
                            $('<span class="error">' + err + '</span>').insertAfter(select2);
                        }
                    }
                    t++;
                }
                else if (val.trim() == 'Select Country' || val.trim() == 'Select Region' || val.trim() == 'Select City') {
                    var _this = $(input[i]);

                    $(_this).addClass('required');
                    var select2 = $(_this).next('.select2');

                    select2.addClass('required');
                    if (err != undefined) {
                        $('<span class="error">' + err + '</span>').insertAfter(select2);
                    }

                    t++;
                }
                else {
                    var _this = $(input[i]);
                    $(input[i]).next('.error').remove();
                    $(input[i]).removeClass('required');
                    var elem = $(input[i]).closest('form');
                    elem.removeClass('required');
                    var select2 = $(_this).next('.select2');
                    select2.removeClass('required');
                }
            }
            else if ($(input[i]).is("select")) {
                var _this = $(input[i]);
                $(input[i]).next('.error').remove();
                var select2 = $(_this).next('.select2');
                select2.removeClass('required');
            }
        }
        if ($(input[i]).attr('name') == 'email') {
            if ($(input[i]).val() != '') {
                if (!validateEmail($(input[i]).val())) {
                    $(input[i]).next('.error').remove();
                    $(input[i]).addClass('required');
                    if (err != undefined) {
                        $('<span class="error">' + err + '</span>').insertAfter(input[i]);
                    }
                    t++;
                }
                else {
                    $(input[i]).removeClass('required');
                }
            }
        }
    }
    if (t > 0)
        return false;

    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showAlert(title, message, icon) {

    swal.fire({
        title: title,
        text: message,
        icon: icon,
    });
}
function CheckUserLogin() {
    if ($.cookie("id") == undefined || $.cookie("id") == null || $.cookie("id") == '') {
        $("#AurhorizationModal").modal("show");
        return false;
    }
    return true;
}

function getCookie(product) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[product];
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var globalLat = 30.044536875545; //'@Model.lat';
var globalLong = 31.23522274102; //'@Model.lon';

function initMap(lat, lng) {

    lat = (lat > 0) ? lat : globalLat;
    lng = (lng > 0) ? lng : globalLong;

    _globMap = new google.maps.Map
        (document.getElementById('xmap'), {
            center: { lat: lat, lng: lng },
            zoom: 12,
            panControl: false,
            zoomControl: false,
            scaleControl: false,
            disableDefaultUI: true,
            styles: map_style
        });
    geocoder = new google.maps.Geocoder();

    address_input = document.getElementById('xaddress');

    if (address_input) {
        var glob_searchBox = new google.maps.places.Autocomplete(address_input);

        glob_searchBox.bindTo('bounds', _globMap);

        glob_searchBox.setFields(['address_components', 'geometry', 'icon', 'name']);

        var markers = [];
        setMarker(null, lat, lng);
        glob_searchBox.addListener('place_changed', function () {
            var place = glob_searchBox.getPlace();


            if (marker != null)
                marker.setMap(null);


            var bounds = new google.maps.LatLngBounds();


            setMarker(place.geometry.location);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
                _globMap.setZoom(17); // Why 17? Because it looks good.
            }

            _globMap.fitBounds(bounds);

        });
        google.maps.event.addListener(_globMap, 'click', function (event) {
            setMarker(event.latLng);
        });
    }


    google.maps.event.addListenerOnce(_globMap, 'idle', function () {

    });
    function setMarker(coords = null, lat = null, lng = null) {

        //console.log(coords);
        if (marker != null)
            marker.setMap(null);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat == null ? coords.lat() : lat, lng == null ? coords.lng() : lng),
            draggable: true,
            map: _globMap
        });
        if (coords)
            geocodePosition(coords, function (result) {
                address_input.value = result;
            });
        _clientLat = coords != null ? coords.lat() : lat;
        _clientLng = coords != null ? coords.lng() : lng;

        google.maps.event.addListener(marker, 'dragend', function (event) {
            _clientLat = this.getPosition().lat();
            _clientLng = this.getPosition().lng();
            geocodePosition(this.getPosition(), function (result) {
                address_input.value = result;
            });
        });

        marker.setMap(_globMap);
    }
    function geocodePosition(pos, callback) {
        geocoder.geocode({
            latLng: pos
        }, function (responses) {
            if (responses && responses.length > 0) {
                callback(responses[0].formatted_address);
                checkAddress(responses);

            } else {
                callback('Cannot determine address at this location.');
            }
        });
    }
    function checkAddress(address) {
        for (var i = 0; i < address.length; i++) {
            if (address[i].types.indexOf("sublocality") > -1) {
                $('input[name=address_area]').val(address[i].address_components[0].long_name);
                break;
            }
            else if (address[i].types.indexOf("administrative_area_level_2") > -1) {
                $('input[name=address_area]').val(address[i].address_components[0].long_name);
                break;
            }
            else if (address[i].types.indexOf("locality") > -1) {
                $('input[name=address_area]').val(address[i].address_components[0].long_name);
                break;
            }
            $('input[name=address_area]').val('');
        }
    }
};
function renderGMaps() {
    loadScript('GM_SCRIPT', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1twMizzLu89MA-29YLortHNCmKIDRHM4&libraries=places,geometry&callback=initMap&language=Language');
}
var _globMap = null, marker, map_style = [];
function loadScript(_class, url) {
    let isLoaded = document.querySelectorAll('.' + _class);
    if (isLoaded.length > 0) {
        initMap(0, 0);
        return;
    }

    let myScript = document.createElement("script");
    myScript.src = url;
    myScript.className = _class;
    document.body.appendChild(myScript);
};

$(document).on('keypress', '.float', function (event) {
    return isFloatKey(event, this);
});
$(document).on('keypress', '.number', function (event) {
    return isNumberKey(event, this);
});
function isFloatKey(evt, _this) {
    var round = $(_this).attr('data-round'),
        isNegative = $(_this).attr('data-negative'),
        min = $(_this).attr('data-min'),
        max = $(_this).attr('data-max'),
        val = $(_this).val();
    var highestBidPrice = $('#highestBidPrice').val();
    //if (val < bidStartPrice) {
    //    return false;
    //}
    inputMsgDisplay(_this); // clear error messages
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (isNegative == 'true')
        if (charCode == 45)/*minus symbol*/ {
            if ($(_this).val().length == 0)
                return true;
        };
    if (charCode == 32) return false;// space char
    if (charCode == 46) {
        if ($(_this).val().lastIndexOf('.') > -1) return false;
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    if (val.lastIndexOf('.') > -1)
        if (val.substr(val.lastIndexOf('.') + 1).length == round) return false;

    var keyVal = String.fromCharCode(charCode);
    val = parseFloat(val.concat(keyVal));
    if (val > 0) {
        if (max)
            if (val > max) { inputMsgDisplay(_this, 'Max ' + max + ''); }
        if (min)
            if (val < min) { inputMsgDisplay(_this, 'Min ' + min + ''); }
    }
    else
        if (min)
            if (val < min) { inputMsgDisplay(_this, 'Min ' + min + ''); }
    return true;
}
function inputMsgDisplay(_this, msg) {
    $(_this).parent().find('span.error').remove();
    $(_this).removeClass('required');
    if (msg) {
        $(_this).after('<span class="error q-err">' + msg + '</span>');
        $(_this).addClass('required');
    }
}
function isNumberKey(evt, _this) {
    var max = parseInt($(_this).attr('data-max'));
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    if ($(_this).val().length > max)
        return false;
    return true;

}
function CheckPassword(input) {
    //var passwformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    var passwformat = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (input.match(passwformat)) {
        return true;
    }
    else {
        return false;
    }
}
function ValidateEmail(input) {
    var mailformat = /\S+@\S+\.\S+/;;
    if (input.match(mailformat)) {

        return true;
    }
    else {
        return false;
    }
}

$("#password,#cPassword").on("copy cut paste drop", function () {
    return true;
});

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function showConfirmationPassword() {
    var x = document.getElementById("cPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

$(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

function CheckUserName(input) {
    var passwformat = /^[a-zA-Z\-]+.{1,200}$/;
    var passwformatArabic = "^[\u0621-\u064A]+ ?[\u0621-\u064A]+$";
    if (input.match(passwformat)) {
        return true;
    }
    else if (input.match(passwformatArabic)) {
        return true;
    }
    else {
        return false;
    }
}


function renderCountryList(selectorId, callback) {
    var _listData = [];
    $.ajax({ url: eCommerceAPIUrl + '/api/v1/ListCountryDDL', type: 'GET', dataType: "json" }).done(function (json) {
        i = 0;
        
        $.each(json.data, function (index, item) {
            _listData.push({ id: item.id, text: '<div class="rel">' + item.countryCode + ' <img src="' + item.countryFlag + '"></div>', title: item.countryCode });
        });
        $(selectorId).select2({
            data: _listData.sort(function (a, b) {
                if (a.text < b.text) return -1;
                if (a.text > b.text) return 1;
                return 0;
            }),
            templateResult: function (d) { return $(d.text); },
            templateSelection: function (d) { return $(d.text); },
        });
        if (callback)
            callback();
    }).fail(function (err) { //
    });
};
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