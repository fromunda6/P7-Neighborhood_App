//That which remains:

    //CSS is haphazardly implemented and not really in your control.
        //please refactor, building with more intent a responsive design
    //Error handling on wiki API does not exist.  Use 'error' callback below or at bottom of(?) wiki.success()

// First, provide request error and success messages based upon the presence of the 'google' variable
var apiErrorGoogle = function() {
    window.alert("So sorry - the Google resources failed to load.  Did you ask nicely?");
};

var apiErrorWiki = function() {
    window.alert("So sorry - the Wikipedia resources failed to load.  Did you ask nicely?");
};

//organize data into an array, make observable
var markers = [];

places = ko.observableArray([{
        name: 'Lithia Spring',
        location: {
            lat: 40.4883,
            lng: -106.8484
        },
        uniqueSrch: 'Lithia water'
    },
    {
        name: "Johnny B Good's",
        location: {
            lat: 40.4860,
            lng: -106.8341
        },
        uniqueSrch: 'Restaurant'
    },
    {
        name: 'CMC Frolf Course',
        location: {
            lat: 40.4952,
            lng: -106.8391
        },
        uniqueSrch: 'Disc golf'
    },
    {
        name: 'Howelsen Hill',
        location: {
            lat: 40.4825,
            lng: -106.8348
        },
        uniqueSrch: 'Howelsen Hill Ski Area'
    },
    {
        name: 'Bud Werner Memorial Library',
        location: {
            lat: 40.4890,
            lng: -106.8402
        },
        uniqueSrch: 'Buddy Werner'
    }
]);

//setup Place constructor function in adherence with good OOJS
var Place = function(data) {
    this.name = data.name; //data-bound to <li> within <ul>
    this.location = data.location;
    this.marker = data.marker;
};

//define viewModel, the functionality underlying the visible portion(<HTML>) of app
var ViewModel = function() {
    //assign to variable self the value of this, in effect making "self" a static reference to the viewModel
    var self = this;

    //define itemToSearch as observable array and viewModel method that simply retrieves itemToSearch
    self.itemToSearch = ko.observable('');

    // define filteredPlaces as viewModel method data-bound to <ul> and returning only the names of those child elements <li> satisfying the
    // following logic: IF(search is empty){return entire list}; ELSE{return those place names having strings in common with search term}
    self.filteredPlaces = ko.computed(function() {
        //thanks to Sarah M for following logic
        places().forEach(function(place) {
            if (place.marker) {
                place.marker.setVisible(true);
            }
        });

        if (self.itemToSearch() === "" || !self.itemToSearch()) {
            return places();

        } else {

            // ko.arrayFilter takes as input the array of interest and a fxn operating on each
            //element therein and returning that element IF fxn returns true
            return ko.utils.arrayFilter(places(), function(place) {
                var hit = place.name.toLowerCase().indexOf(self.itemToSearch().toLowerCase()) !== -1;
                place.marker.setVisible(hit);
                return hit;
            });
        }

    });

    //define as KO observable the <p> element 'wiki'
    self.wiki = ko.observable('');

    //creates a dependency whereby click events on list items behave as click event on associated map marker (which in turn invokes toggleBounce)
    self.markerClick = function(location) {
        google.maps.event.trigger(location.marker, 'click');
    };

    //create a styles array to use with the map
    var styles = [{
        featureType: 'water',
        stylers: [{
            color: '#737cee'
        }]
    }];

    // initialize map
    activate();

    function activate() {
    //this fxn is called above when the marker is clicked:
    //notice also that when p.I.W. is called in the loop , marker = this(=marker), & infowindow = largeInfoWindow.  Upshot here is that
    //functions allow us to 1) apply consistent programming to changing itemToSearch.
    function populateInfoWindow(marker, infowindow) {
        var wikiITem = marker.search;
        var CORSurl = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=" + wikiITem + "&format=json";

        //thx to Cameron @ UDacity for wiki error handling
        var wikiRequestTimeout = setTimeout(function(){
            $("#wikiElem").text("Failed to get wikipedia resources");
        }, 6000);

        $.ajax({
            url: CORSurl,
            dataType: 'jsonp',
            success: function(json) {
                var pages = json.query.pages;
                $.map(pages, function(page) {
                    wikiExtract = page.extract;
                    self.wiki(wikiExtract);
                });
            clearTimeout(wikiRequestTimeout);
            },
            //in the event of successful wiki call, do NOT call setTimeout block
        });

        //check to make sure the infowindow is not currently opened on a marker we've not clicked
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            //make sure the marker property is cleared if the infowindow is closed
            infowindow.addListener('closeclick', function() {
                infowindow.close();
                marker.setAnimation(null);
            });
        }
    }

        //google constructor creates a new map - center and zoom values must be provided
        var map = new google.maps.Map(document.getElementById('map'), {
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
        for (var i = 0; i < places().length; i++) {
            var position = places()[i].location; //remember scoping and local access-var's must be defined locally for the sake of Markers creation
            var name = places()[i].name;

            //declare marker property 'unique' as the unique search term from places array
            var unique = places()[i].uniqueSrch;

            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: name,
                id: i,
                search: unique,
                animation: null
            });

            markers.push(marker);
            //add markers as properties of self.places(), making them accessible to click event handler on list items (<h4>)
            places()[i].marker = marker;

            //extend the boundaries of the map for each marker
            bounds.extend(marker.position);

            //create an onclick event to open an infowindow at each marker-note the closure entailed in encapsulating an anonymous fxn and necessary
            //to associate a given click with the correct marker
            marker.addListener('click', function() {
                //CLARIFICATION:
                //helpful to maintain here the distinction between parameters and arguments - parameters are variables
                //named "whatever" and used within the fxn definition as placeholders for the arguments (resolvable values)
                //passed to the fxn at time of calling and determining its final output
                populateInfoWindow(this, largeInfowindow);
                toggleBounce(this);
            });

        }
    }
};



function initMap() {

    //locating this invocation here is not coincidence; in order to add markers to model, it is helpful to have the assignment
    //in place prior to executing the for loop that pushes the model items to the list, one at a time
    ko.applyBindings(new ViewModel());
}

function toggleBounce(marker, event) {
    for (var i = markers.length - 1; i >= 0; i--) {
        markers[i].setAnimation(null);
    }
    marker.setAnimation(google.maps.Animation.BOUNCE);
}





// Question: in generating an event listener for each item in a given array, I want to call a function upon click.