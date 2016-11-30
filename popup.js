// add listener for when icon is clicked?

// get user's location using chrome api
var geolocation_API_key = "AIzaSyBaHJ6Z-Xf7XeZ9wCcwBXXNADq6OPh8BOE";

window.onload = function() {
  var startPos;
  var geoOptions = {
    maximumAge: 5 * 60 * 1000,
    timeout: 10 * 1000,
  }
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

// look up weather info for that location

var API_key = "8e89558cffdf7c1a";

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/" + API_key + "/geolookup/conditions/q/IA/Cedar_Rapids.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
});

document.getElementById("demo").innerHTML = temp_f;