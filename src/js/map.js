var map;

function initMap() {
    var myLatLng = {
        lat: 47.722942,
        lng: 13.089094
    };
    var markersLatLng = {
        0: {
            lat: 47.732942,
            lng: 13.099094
        },
        1: {
            lat: 47.712942,
            lng: 13.079094
        },
        2: {
            lat: 47.712942,
            lng: 13.11094
        },
        3: {
            lat: 47.762942,
            lng: 13.059094
        }
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        disableDefaultUI: true,
        zoom: 16
    });

    // // Try HTML5 geolocation.
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Location found.');
    //         map.setCenter(pos);
    //     }, function() {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }

    for (var idx in markersLatLng) {
        console.log(markersLatLng[idx].lat)
        var newMarker = new google.maps.Marker({
            position: {
              lat: markersLatLng[idx].lat,
              lng: markersLatLng[idx].lng
            },
            title: 'Marker Nr: ' + idx
        });
        newMarker.setMap(map);
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
