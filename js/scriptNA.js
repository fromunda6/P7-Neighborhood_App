var mapView;
    function initMap() {
      //google constructor creates a new map - center and zoom values must be provided
      mapView = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.4850, lng: -106.8317},
        zoom: 15
      });
	var model = [
		{name: 'Lithium Spring', location: {lat: 40.4883, lng: -106.8484}},
		{name: "Johhny B Good's", location: {lat: 40.4860, lng: -106.8341}},
		{name: 'CMC Frolf Course', location: {lat: 40.5016, lng: -106.8360}},
		{name: 'Howelsen Hill', location: {lat: 40.4825, lng: -106.8348}},
		{name: 'Bud Werner Memorial Library', location: {lat: 40.4890, lng: -106.8402}}
	];

var markers = [];
//create an array of markers
for (var i=0; i<model.length; i++) {
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
	//create an onclick event to open an infowindow at each marker:
	marker.addListener('click',  function(){
		populateInfoWindow(this, largeInfowindow);
	});
}

var largeInfowindow = new google.maps.InfoWindow();
}

// var mapView = {};

// var listView = {};

// var viewModel = {};