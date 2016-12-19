var map;

function initMap() {
  var pos;
  var map;
  var markers = [];
  var marker_infobox = '<div class="row"><form class="col s12"><div class="row">' +
    '<div class="input-field col s6">' +
    '<input id="marker-title" type="text" class="validate">' +
    '<label for="marker-title">Title</label>' +
    '</div>' +
    '<div class="input-field col s12">' +
    '<textarea class="materialize-textarea" id="textarea-todo"></textarea>' +
    '<label for="textarea1">Description</label>' +
    '<a id="submit-todo" class="waves-effect waves-light btn">Create</a>' +
    '</div></div></form>' +
    '</div>';

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 47.722942,
      lng: 13.089094
    },
    zoom: 16
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: marker_infobox
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      title: ''

    });
    markers.push(marker);
    if (markers.length > 1) {
      if (markers[markers.length - 2].title === '') {
        markers[markers.length - 2].setMap(null)
      }
    }
    markers[markers.length - 1].addListener('click', function(event) {
      marker.title = $('textarea#textarea-todo').val('');
      infowindow.open(map, marker);
      console.log(this.position);
    });
    infowindow.open(map, marker);

  }

  map.addListener('click', function(event) {
    addMarker(event.latLng);
  });

  $(document).on('click', '#submit-todo', function() {
    console.log($('textarea#textarea-todo').val());

    var title = $('#marker-title').val();
    var todo = $('textarea#textarea-todo').val();

    $.ajax({
      url: 'http://localhost:1337/api/marker/createmarkertodos',
      data: {
        lat: markers[markers.length - 1].position.lat.call(this),
        long: markers[markers.length - 1].position.lng.call(this),
        userid: 1,
        childid: 2,
        title: title,
        todos: '["'+ todo +'"]'
      },
      method: 'POST',
      success: function(marker) {
      }
    });
  });
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}