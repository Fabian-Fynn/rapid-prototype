let markers = [];
let chosenUser = {};
let map;

const chosenPreference = localStorage.getItem('prefid');
const userId = localStorage.getItem('userid');

DB.init();

const addMarker = user => {
    const markerSize = 40;

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
            icon: image,
            class: "my-marker-style"
        });
        if (markers.length > 0) {
            markers[markers.length - 1].addListener('click', toggleBounce);
            markers[markers.length - 1].addListener('click', function(event) {
              chosenUser[user.id] = user;
            });
        }
        markers.push(marker);
    });

};

DB.getUsersByPref(chosenPreference, users => {
    for (let idx in users) {
        if (users[idx].id != userId) {
            addMarker(users[idx]);
        }
    }
});

function initMap() {
    const myLatLng = {
        lat: 47.722942,
        lng: 13.089094
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        disableDefaultUI: true,
        zoom: 16
    });

    map.setOptions({
        styles
    });
};

function toggleBounce() {
    if (this.getAnimation() !== null) {
        this.setAnimation(null);
    } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
    }
}

const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
