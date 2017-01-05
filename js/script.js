
// constraints/global objectives:
// 1) minimize # of connections between application 'organs'
// 2) coherently comment even slightly opaque code
// 3) do not forgo testing

var model = {

	neighborhoods: [{
		attr1: "",
		attr2: "",
		attr3: ""
	},
	{
		attr1: "",
		attr2: "",
		attr3: ""
	},
	{
		attr1: "",
		attr2: "",
		attr3: ""
	}]
};

var controller = {
	init: function(){},

	getData: function(model){},

	updateView: function(){}

};

var mapView = {

	init: function(){},

	loadData: function(){

		var $body = $('body');
		var street = $('#street').val();
		var city = $('#city').val();
		var address = street + ', ' + city;

		alert("So you want to live at " + address + '?');

		var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
		$body.append('<img class="bgimg" src="' + streetviewUrl + '">');

		return false;
	},
	render: function(){}
};

var infoView = {
	init: function(){
		//bind to DOM
	},
	render: function(){
		//display
	}
};

$("#form-container").submit(mapView.loadData);




// Outline/to-do/:
// This is a built-from-scratch application the objective of which (besides my learning) is to provide a promotional
// overview in data and pictures of at least five(5) neighborhoods.  Summary/markdown requirements:
	// correct(error-free) implementation of 3rd-party api's (google Maps, least); a static(local) or dynamic(external)
		// database(the 5 neighborhood's data); a search form, or dropdown menu with filtering capability; a list-view
		// of location names; a map displaying reactive(returning data sourced from addt'l 3PAPI) & animated location
		// markers (all & filtered).
	// Adherence to responsive design (in html/css), MVC patterns (in JS), performance-optimization (Async JS, jankless code)
	// and graceful error handling
