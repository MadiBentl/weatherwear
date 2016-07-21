$(document).ready(function() {

  getLocation();

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
      console.log(location);
      
      $('.location')
        .append(location.city + ", ")
        .append(location.region);

      var units = getUnits(location.country);
      getWeather(location.loc, units);

      //return weather;

    }, "jsonp");

  }

  function getWeather(loc, units) {
    lat = loc.split(",")[0] //.toString();
    lon = loc.split(",")[1] //.toString();

    //var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units;
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + '&appid=7341f66d131be4663e75d126e95b4ed0';

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
      var windDir = convertWindDirection(weather.wind.deg);
      var temperature = weather.main.temp;
      var unitLabel;

      //label based in imperial vs metric units
      if (units === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }

      temperature = parseFloat((temperature).toFixed(1));
      var newTemp = Math.round(temperature);
      var conditions = weather.weather[0].description;
	  pickClothing(newTemp, conditions);

      console.log(weather);

      $('#icon')
        .append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

      $('#temp').append(temperature + " " + unitLabel);
      $('#conditions').append(weather.weather[0].description);
      $('#wind').append(windDir + " " + weather.wind.speed + " knots");
      $('#postal').append(postal);

    }, "jsonp");

  };

  function convertWindDirection(dir) {
    var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var eightPoint = Math.floor(dir / 45);
    return rose[eightPoint];
  }

  function getUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
      var units = 'metric';
    } else {
      units = 'imperial';
    }

    console.log(country, units);
    return units;
  }
  function pickClothing(temp, cond){
	  pickHead(temp, cond);
	  pickBody(temp, cond);
	  pickLegs(temp);
	  $('#clothing').append('<img src = "images/m_feet_shoes.png">');
  }
  function pickHead(temperature, cond){
	  if (temperature > 10){
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_head_hat.png">'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_head_bare_sunglasses.png">'); 
		  }
	  }
	  else{
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_head_wintercap.png">'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_head_wintercap_sunglasses.png">'); 
		  }
	  }
  }
  function pickBody(temperature, cond){
	  if (temperature > 30){
		  $('#clothing').append('<img src = "images/m_torso_bare.png">');
	  }
	  else if (temperature > 25){
		  $('#clothing').append('<img src = "images/m_torso_singlet.png">');
	  }
	  else if (temperature > 20){
		  $('#clothing').append('<img src = "images/m_torso_ss.png">');
	  }
	  else if (temperature > 10){
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_torso_ls.png">'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_torso_ss.png">'); 
		  }
	  }
	  else if (temperature > 0){
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_torso_lightjacket.png">'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_torso_lsgloves.png">'); 
		  }

	  }
	  else{
		  $('#clothing').append('<img src = "images/m_torso_heavyjacket.png">');
	  }
  }
  function pickLegs(temperature){
	  if (temperature > 15){
		  $('#clothing').append('<img src = "images/m_legs_shorts.png">');
	  }
	  else{
		  $('#clothing').append('<img src = "images/m_legs_tights.png">');
	  }
  }

});