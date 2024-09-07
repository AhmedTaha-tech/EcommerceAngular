function renderGMaps() {
    loadScript('GM_SCRIPT', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1twMizzLu89MA-29YLortHNCmKIDRHM4&libraries=places,geometry&callback=initMap&language=Language');
}
var _globMap = null, marker;
var globalLat = 30.044536;  
var globalLong = 31.235222; 

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