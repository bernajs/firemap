var map;
var markers = [];
var my_pos;
function initMap() {
    map = new google
        .maps
        .Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 15
        });
    var infoWindow = new google
        .maps
        .InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                my_pos = pos;
                // infoWindow.setPosition(pos);
                new google
                    .maps
                    .Marker({position: pos, map: map, icon: 'assets/poi.gif', optimized: false});
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    map
        .addListener('drag', function () {
            // 3 seconds after the center of the map has changed, pan back to the marker.
            var pos = new Object();
            setTimeout(function () {
                pos.lat = map
                    .getCenter()
                    .lat();
                pos.lng = map
                    .getCenter()
                    .lng();
                database.ref('users/' + localStorage.getItem('uid') + '/pos').set(pos);
            }, 1000);
            console.log(pos);
        });

}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google
        .maps
        .Marker({position: location, map: map});
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function getLocation() {
    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                posxy = pos;
            });
    }
    // return posxy;
}

function calcularDistancia(marker) {
    var distancia = google
        .maps
        .geometry
        .spherical
        .computeDistanceBetween(new google.maps.LatLng(my_pos.lat, my_pos.lng), new google.maps.LatLng(marker.lat, marker.lng));
        return distancia;
}