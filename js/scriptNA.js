// per separating concerns, do not define your data within the view fxn, as is being done below; instead def outside and pass in
var model = [{
        name: 'Lithium Spring',
        location: {
            lat: 40.4883,
            lng: -106.8484
        }
    },
    {
        name: "Johhny B Good's",
        location: {
            lat: 40.4860,
            lng: -106.8341
        }
    },
    {
        name: 'CMC Frolf Course',
        location: {
            lat: 40.4952,
            lng: -106.8391
        }
    },
    {
        name: 'Howelsen Hill',
        location: {
            lat: 40.4825,
            lng: -106.8348
        }
    },
    {
        name: 'Bud Werner Memorial Library',
        location: {
            lat: 40.4890,
            lng: -106.8402
        }
    }
];

var mapView;

function initMap() {

    //create a styles array to use with the map
    var styles = [{
        featureType: 'water',
        //no need for 'elementType' here as
        stylers: [{
            color: '#de5222'
        }]
    }]
    //google constructor creates a new map - center and zoom values must be provided
    mapView = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.4850,
            lng: -106.8317
        },
        zoom: 14,
        styles: styles,
        mapTypeControl: false
    });

    document.getElementById('zoom-to-area').addEventListener('click', function() {
        zoomToArea();
    });

    var markers = [];
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    //create an array of markers
    for (var i = 0; i < model.length; i++) {
        var position = model[i].location; //remember scoping and local access-var's must be defined locally for the sake of Markers creation
        var name = model[i].name;

        var marker = new google.maps.Marker({
            map: mapView,
            position: position,
            title: name,
            animation: google.maps.Animation.DROP,
            id: i
        });
        //push the marker to array of markers for further use(?)
        markers.push(marker);
        //extend the boundaries of the map for each marker
        bounds.extend(marker.position);
        //create an onclick event to open an infowindow at each marker:
        //except that it's always opening at the last array item - closure needed i think
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow); //where 'this' refers here the doodad (trying to avoid infomral use of "object")
            // that was clicked
        });
    }

    //this fxn populates the infowindow when the marker is clicked:
    //notice also that when p.I.W. is called in the loop , marker = this, & infowindow = largeInfoWindow.  Upshot here is that
    //functions allow us to 1) apply consistent programming to changing inputs.
    function populateInfoWindow(marker, infowindow) {
        //check to make syre the infowindow is not currently opened on a marker we've not clicked
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(mapView, marker);
            //make sure the marker property is cleared if the infowindow is closed
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker(null);
            });
        }
    }
}

function zoomToArea() {
    var geocoder = new google.maps.Geocoder();
    var adrezz = document.getElementById('zoom-to-area-text').value;
    if (adrezz == '') {
        window.alert('you must enter an area, or address.  dipshit')
    } else {
        geocoder.geocode({
            address: adrezz,
            componentRestrictions: {
                locality: 'Steamboat Springs'
            }
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                mapView.setCenter(results[0].geometry.location);
                mapView.setZoom(15);
            } else {
                window.alert('We could not find that location - try' + //oh that's how we line jump?
                    'harder.');
            }
        });
    }
}


var viewModel = function(){
	var self=this;

	this.placeList = ko.observableArray([]);

	model.forEach(function(modelItem){
		self.placeList.push(modelItem);
	});
};

ko.applyBindings(new viewModel);