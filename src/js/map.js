DB.init();
var map;
var markers = [];

function addMarker(user) {
    var marker = new google.maps.Marker({
        position: {
            lat: user.lat,
            lng: user.lng
        },
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'User: ' + user

    });
    markers.push(marker);
}

DB.getAllUsers(function(users) {
  for (var idx in users) {
    console.log(users[idx].lat);
    addMarker(users[idx]);
  }
});

function initMap() {
    var myLatLng = {
        lat: 47.722942,
        lng: 13.089094
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        disableDefaultUI: true,
        zoom: 16
    });

    map.setOptions({
      styles: map_style
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
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
