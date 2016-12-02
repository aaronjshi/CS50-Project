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
		var API_key = "6e62c94aa3edb1a5"; // alternate API_key = "8e89558cffdf7c1a
		var url = "http://api.wunderground.com/api/" + API_key + "/geolookup/forecast/conditions/q/" + lat + "," + long + ".json";

		$(document).ready(function() {
			$.ajax({
			// The URL for the request
			url: url,
			// Whether this is a POST or GET request
			type: "GET",
			// The type of data we expect back
			dataType : "json",
			})

			// Code to run if the request succeeds (is done);
			// the response is passed to the function
			.done(function(json) {
				var state = json['location']['state'];
				var city = json['location']['city'];
				//var img_src = json['current_observation']['icon_url'];
				var temp_f = json['current_observation']['temp_f'];
				var chancePrecipitation = json['forecast']['txt_forecast']['forecastday'][0]['pop'];
				var feelsLike = json['current_observation']['feelslike_f'];

				//document.getElementById('img_src').src = img_src;
				document.getElementById('city,state').innerHTML = city + ", " + state;
				document.getElementById('temperature').innerHTML = "Temperature (F): " + temp_f + "\xB0, feels like " + feelsLike + "\xB0";
				document.getElementById('CoP').innerHTML = "Chance of precipitation: " + chancePrecipitation + "%";

			})
	 
			.fail(function( xhr, status, errorThrown ) {
			    alert( "Sorry, there was a problem!" );
			})
		})
	};



};


