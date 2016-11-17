//define, encapsulate, ___?, DOM variables as jquery-dynamic:
	var $form = $('#form-container');

	function loadData() {
		var $body = $('body');
		var $wikiElem = $('#wikipedia-links');
		var $nytHeaderElem = $('#nytimes-header');
		var $nytElem = $('#nytimes-articles');
		var $greeting = $('#greeting');
		var $flashyVAR = $('#flashyBOX');

		//clear out old data before new request by setting these values to an empty string
      	$wikiElem.text("");
      	$nytElem.text("");

    var $cityString=$('#street').val(); //collect the value of DOM element with id=street, in this case a form input
		var $streetString=$('#city').val(); //" " " "
		var address = $streetString + ', ' + $cityString;

		$greeting.text('So you want to live at ' + address + '?');

		// var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

		// $body.append(streetviewURL);
	};

//define functions
    function initMap() {
      var focus = {lat: 39.74, lng: -104.99};
      var map = new google.maps.Map($('#map').get(0), {
        zoom: 4,
        center: focus
      });
      var marker = new google.maps.Marker({
        position: focus,
        map: map
      });
    };

  // define JS-feature-containing DOM elements as jquery objects
   var $body = $('body');

  loadData();

