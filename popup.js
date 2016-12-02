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
				var img_src = json['current_observation']['icon_url'];
				var temp_f = json['current_observation']['temp_f'];
				var chancePrecipitation = json['forecast']['txt_forecast']['forecastday'][0]['pop'];
				var feelsLike = json['current_observation']['feelslike_f'];
				var humidity = json['current_observation']['relative_humidity'];
				var wind = json['current_observation']['wind_gust_mph'];

				$('#img_src').attr("src", img_src);
				document.getElementById('city,state').innerHTML = city + ", " + state;
				document.getElementById('temperature').innerHTML = "Temperature (F): " + temp_f + "\xB0, feels like " + feelsLike + "\xB0";
				document.getElementById('humidity').innerHTML = "Humidity: " + humidity;
				document.getElementById('CoP').innerHTML = "Precipitation: " + chancePrecipitation + "%";
				document.getElementById('wind').innerHTML = "Wind: " + wind + " mph";


				var top;
				var bot;
				var jacket;
				var str;
				var precip;

				// top layer
				if (feelsLike >= 60) {
					top = "T-shirt";
				}
				else if (feelsLike >= 50) {
					top = "long sleeve";
				}
				else {
					top = "sweater/fleece pullover";
				}
				// bottom layer
				if (feelsLike >= 65) {
					bot = "shorts";
				}
				else if (feelsLike >= 30) {
					bot = "long pants";
				}
				else {
					bot = "long pants, baselayer";
				}
				// jacket
				if (feelsLike >= 60) {
					jacket = "";
				}
				else if (feelsLike >= 45) {
					jacket = "light jacket";
				}
				else if (feelsLike >= 30) {
					jacket = "heavy jacket";
				}
				else {
					jacket = "snow jacket";
				}

				if (feelsLike >= 90) {
					str = "really hot";
				}
				else if (feelsLike >= 70) {
					str = "hot";
				}
				else if (feelsLike >= 60) {
					str = "moderate";
				}
				else if (feelsLike >= 50) {
					str = "chilly";
				}
				else if (feelsLike >= 30) {
					str = "cold";
				}
				else {
					str = "really cold";
				}

				document.getElementById('string').innerHTML = "It's " + str + "! Wear a " + top + ", " + bot + ", and a " + jacket + ".";
			})
	 
			.fail(function( xhr, status, errorThrown ) {
			    alert( "Sorry, there was a problem!" );
			    console.log("Error");
			})
		})
	};



};


