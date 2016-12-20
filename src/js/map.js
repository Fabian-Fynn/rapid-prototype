let markers = [];
let map;
const chosenPreference = localStorage.getItem('prefid');
const userId = localStorage.getItem('userid');
console.log(userId)

DB.init();

const addMarker = user => {
    const markerSize = 30;

    DB.getAllPrefs(prefs => {
        const image = {
            url: `assets/icons/${chosenPreference}.png`,
            size: new google.maps.Size(markerSize, markerSize),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(markerSize, markerSize),
        };
        const marker = new google.maps.Marker({
            position: {
                lat: user.lat,
                lng: user.lng
            },
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'User: ' + user.username,
            icon: image
        });

        markers.push(marker);
    });
};

DB.getUsersByPref(chosenPreference, users => {
    for (let idx in users) {
      if(users[idx].id != userId){
        addMarker(users[idx]);
      }
    }
});

function initMap () {
    const myLatLng = {
        lat: 47.722942,
        lng: 13.089094
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        disableDefaultUI: true,
        zoom: 16
    });

    map.setOptions({ styles });

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
};

const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
