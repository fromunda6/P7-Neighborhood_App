
function loadData(){

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