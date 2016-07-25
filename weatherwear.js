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
	  addShoes();
  }
  function addShoes(){
	  $('#clothing').append('<img src = "images/m_feet_shoes.png">');
	  $('#descr').append('<h4>Running Shoes</h4>').append('<p>A good pair of running shoes and socks is exactly what you need.</p>');
  }
  function pickHead(temperature, cond){
	  if (temperature > 10){
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_head_hat.png">'); 
			 $('#descr').append('<h4>Baseball cap</h4>').append('<p>Protect yourself from the elements with a hat that has a brim, or even a visor!</p>');
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_head_bare_sunglasses.png">');
			 $('#descr').append('<h4>Sunglasses</h4>').append('<p>It looks bright out there! Protect yourself from harmful UV rays with a pair of sports sunglasses</p>');
		  }
	  }
	  else{
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_head_wintercap.png">');
			 $('#descr').append('<h4>Toque</h4>').append('<p>Stay warm with a winter cap - look for one that covers your ears for ultimate protection</p>'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_head_wintercap_sunglasses.png">');
			 $('#descr').append('<h4>Toque & Sunglasses</h4>').append('<p>Protect your eyes from UV rays with a pair of sunnies and grab a warm hat for your head</p>'); 
		  }
	  }
  }
  function pickBody(temperature, cond){
	  if (temperature > 30){
		  $('#clothing').append('<img src = "images/m_torso_bare.png">');
		  $('#descr').append('<h4>Shirtless</h4>').append('<p>With this kind of heat, why wear a shirt?</p>');
	  }
	  else if (temperature > 25){
		  $('#clothing').append('<img src = "images/m_torso_singlet.png">');
		  $('#descr').append('<h4>Singlet</h4>').append('<p>Throw on a tanktop to let your arms breathe.</p>');
	  }
	  else if (temperature > 20){
		  $('#clothing').append('<img src = "images/m_torso_ss.png">');
		  $('#descr').append('<h4>Short-Sleeved Shirt</h4>').append('<p>A short-sleeved tee in a good technical fabric is perfect for this kind of weather!</p>');
	  }
	  else if (temperature > 10){
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_torso_ls.png">');
			 $('#descr').append('<h4>Long-Sleeved Shirt</h4>').append('<p>A long-sleeved tee in a technical fabric is a good bet for today.</p>'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_torso_ss.png">');
			 $('#descr').append('<h4>Short-Sleeved Shirt</h4>').append('<p>A short-sleeved tee in a good technical fabric is perfect for this kind of weather!</p>'); 
		  }
	  }
	  else if (temperature > 0){
		  if (cond != "clear sky"){
			 $('#clothing').append('<img src = "images/m_torso_lightjacket.png">');
			 $('#descr').append('<h4>Light Jacket</h4>').append('<p>It looks pretty chilly and cold out there - grab yourself a light jacket to protect against the elements.</p>'); 
		  }
		  else{
			 $('#clothing').append('<img src = "images/m_torso_lsgloves.png">');
			 $('#descr').append('<h4>Gloves</h4>').append('<p>A pair of light gloves is exactly what you need</p>');
			 $('#descr').append('<h4>Long-Sleeved Shirt</h4>').append('<p>Stay warm is a light-weight long-sleeved tee in a spandex-blend</p>'); 
		  }

	  }
	  else{
		  $('#clothing').append('<img src = "images/m_torso_heavyjacket.png">');
		  $('#descr').append('<h4>Heavy Jacket</h4>').append('<p>Dress as warm as you can in your toastiest padded jacket in a high-performance fabric built for running.</p>');
	  }
  }
  function pickLegs(temperature){
	  if (temperature > 15){
		  $('#clothing').append('<img src = "images/m_legs_shorts.png">');
		  $('#descr').append('<h4>Shorts</h4>').append('<p>Wear a pair of shorts, you will not regret it!</p>');
	  }
	  else{
		  $('#clothing').append('<img src = "images/m_legs_tights.png">');
		  $('#descr').append('<h4>Leggings</h4>').append('<p>Keep your legs covered to protect against the cold</p>');
	  }
	  
  }

});