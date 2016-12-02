// var geolocation_API_key = "AIzaSyBaHJ6Z-Xf7XeZ9wCcwBXXNADq6OPh8BOE";

window.onload = function() {
	
	var lat;
	var long;

	// get user's location using geolocation
	var startPos;
	var geoOptions = {
		maximumAge: 5 * 60 * 1000,
		timeout: 10 * 1000,
	}
	var geoSuccess = function(position) {
		startPos = position;
		lat = startPos.coords.latitude;
		long = startPos.coords.longitude;
		
		document.getElementById("startLat").innerHTML = lat;

		// call getWeather function (see below)
		getWeather(lat, long);
	};
	var geoError = function(error) {
		console.log('Error occurred. Error code: ' + error.code);
		// error.code can be:
		//   0: unknown error
		//   1: permission denied
		//   2: position unavailable (error response from location provider)
		//   3: timed out
	};
	
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

	// get weather conditions in current location
	function getWeather(lat, long) {
		var API_key = "8e89558cffdf7c1a";
		var url = "http://api.wunderground.com/api/" + API_key + "/geolookup/conditions/q/" + lat + "," + long + ".json";
		document.getElementById('demo').innerHTML = url;

		$(document).ready(function() {
			console.log("test");
			$.ajax({
		 
		    // The URL for the request
		    url: url,
		    //"http://api.wunderground.com/api/8e89558cffdf7c1a/geolookup/conditions/q/IA/Cedar_Rapids.json",
		 
		    // Whether this is a POST or GET request
		    type: "GET",
		 
		    // The type of data we expect back
		    dataType : "json",
			})
		  
			// Code to run if the request succeeds (is done);
			// the response is passed to the function
			.done(function(json) {
				var location = json['location']['city'];
				var temp_f = json['current_observation']['temp_f'];
				alert("Current temperature in " + location + " is: " + temp_f);

				document.getElementById('demo').innerHTML = temp_f;
			})
	 
			.fail(function( xhr, status, errorThrown ) {
			    alert( "Sorry, there was a problem!" );
			})
		})
	};

};


