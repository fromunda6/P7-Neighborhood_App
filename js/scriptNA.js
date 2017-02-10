// per separating concerns, do not define your data within the view fxn, as is being done below; instead def outside and pass in
var model = [
		{
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

// a function expression/anonymous function.  Creates closure, which in turns ensures inter-method variable access within viewModel,
// where regular application of scope would otherwise prevent this access the alternate form, a fxn declaration/'normal' fxn, i.e.
// 1 function viewModel(){}, offers no such benefit...
var viewModel = function(){
	var self=this;
	//assign to observable the model name data; observable objects become functions to avoid browser compatibility issues
	self.name = ko.observable("");
	self.placeList = ko.observableArray([]);

	self.criteria = ko.observable(""); //set up monitoring of criteria, the value of wjat was typed into input box

	//creates a dependency wherby click events on list items behave as click event on associated map marker (which in turn invokes toggleBounce)
	self.markerClick = function(location){
		console.log(location);
		google.maps.event.trigger(location.marker,'click');
	}

	model.forEach(function(modelItem){
		self.placeList.push(modelItem);
	});

	viewModel.search=function(criteria) {
	alert("anything");
		for (var i=0; i<self.placeList.length; i++){
		if(self.placeList[i].toLowerCase().indexof(criteria.toLowerCase()) >=0) {
			self.placeList[i].visible(true);
		} else {
			self.placeList[i].visible(false);
		};
	};
}

		// filter a computed observable built of the conjunction of placeList and searchCriteria
};

// with help from the net community and jQuery- filter placelist in place upon submit button-click


var map;

function initMap() {

    //create a styles array to use with the map
    var styles = [{
        featureType: 'water',
        //no need for 'elementType' here as
        stylers: [{
            color: '#737cee'
        }]
    }]

    //google constructor creates a new map - center and zoom values must be provided
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.4850,
            lng: -106.8317
        },
        zoom: 14,
        styles: styles,
        mapTypeControl: false
    });

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    //create an array of markers
    for (var i = 0; i < model.length; i++) {
        var position = model[i].location; //remember scoping and local access-var's must be defined locally for the sake of Markers creation
        var name = model[i].name;

        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: name,
            id: i,
            animation: null
        });

        //add markers as properties of model, making them accessible to click event handler on list items (<h4>)
        model[i].marker = marker;
        // add 'visible' boolean to the model to aid in filtering
        model[i].visible = true;

        //extend the boundaries of the map for each marker
        bounds.extend(marker.position);

        //create an onclick event to open an infowindow at each marker-note the closure entailed in encapsulating an anonymous fxn and necessary
        //to associate a given click with the correct marker
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            toggleBounce(this);
        });
    }

    //locating this invocation here is not coincidence; in order to add markers to model, it is helpful to have the assignment
    //in place prior to executing the for loop that pushes the model items to the list, one at a time
    ko.applyBindings(new viewModel(), document.getElementById('view'));
}

//this fxn populates the infowindow when the marker is clicked:
//notice also that when p.I.W. is called in the loop , marker = this, & infowindow = largeInfoWindow.  Upshot here is that
//functions allow us to 1) apply consistent programming to changing inputs.
function populateInfoWindow(marker, infowindow) {
    //check to make sure the infowindow is not currently opened on a marker we've not clicked
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        //make sure the marker property is cleared if the infowindow is closed
        infowindow.addListener('closeclick', function() {
            infowindow.close();
        });
    }
}

function toggleBounce(marker, event){
	console.log(marker);
	if (marker.animation !== null) {
		marker.setAnimation(null);
		console.log(marker);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		console.log(marker);
	}
}

// First, provide request error and success messages based upon the presence of the 'google' variable
var apiError = function(){
	window.alert("So sorry - the requested resource failed to load.  Did you ask nicely?")
};



// Question: in generating an event listener for each item in a given array, I want to call a function upon click.