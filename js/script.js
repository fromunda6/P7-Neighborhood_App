
// constraints/global objectives:
// 1) minimize # of connections between application 'organs'
// 2) coherently comment even slightly opaque code
// 3) do not forgo testing

var view = {

	loadData: function(){

		var $body = $('body');
		var street = $('#street').val();
		var city = $('#city').val();
		var address = street + ', ' + city;

		alert("So you want to live at " + address + '?');

		var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
		$body.append('<img class="bgimg" src="' + streetviewUrl + '">');

		return false;

	};

	$('#form-container').submit(loadData);

};

var model = {
	//all location detail data here; all data here, in fact
};

var controller = {
	//all interaction between model and view should exist here
};