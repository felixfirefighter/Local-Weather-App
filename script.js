/**
 * Created by LEE on 2016/10/05.
 */
// API Key : 212c4c05b3b83f3d3cfc2caad60af394

// API call : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=1111111111

//sunrise 7AM - sunset 7PM

//orange : #FF9800;


var lat, lon = 0;
var arr = [];
var icon = new Skycons({"color":"white"});
var temp = 0;
var isCelsius = true;



$(document).ready(function () {
    getLocation();

    $("#degree").on("click",function () {
        degreeConvertion();
    });

});

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = Math.floor(position.coords.latitude);
            lon = Math.floor(position.coords.longitude);
            getWeather();
        });
    }
}

function getWeather(){
    var url = "";
    var weatherCondition = "";
    var date = new Date();
    var hour = date.getHours();

    var locationContent = $("#location");
    var degreeContent = $("#degree");
    var weatherContent = $("#weather-text");

    var body = $("body");

    //url = "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=212c4c05b3b83f3d3cfc2caad60af394";
    //url = "http://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&APPID=212c4c05b3b83f3d3cfc2caad60af394";
    //url = "http://api.openweathermap.org/data/2.5/weather?lat=3&lon=101&APPID=212c4c05b3b83f3d3cfc2caad60af394";

    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=212c4c05b3b83f3d3cfc2caad60af394&units=metric";

    $.getJSON(url,function(data){

        var id = data.weather[0].id;
        var weather = data.weather[0].main;
        var cityName = data.name;
        var country = data.sys.country;
        temp = data.main.temp.toFixed(0);

        //get current weather condition depending on id
        if((id>=200 && id<=232) || (id>=960 && id<=962)){
            weatherCondition = Skycons.SLEET;
        }else if((id>=300 && id<=321) || (id>=500 && id<=531)){
            weatherCondition = Skycons.RAIN;
        }else if(id>=600 && id<=622){
            weatherCondition = Skycons.SNOW;
        }else if(id == 800){
            if(hour>=7 && hour<=19) {
                weatherCondition = Skycons.CLEAR_DAY;
            }else{
                weatherCondition = Skycons.CLEAR_NIGHT;
            }
        }else if(id>=801 && id<=804){
            weatherCondition = Skycons.CLOUDY;
        }else if(id>=952 && id<=962){
            weatherCondition = Skycons.WIND;
        } else{
            weatherCondition = Skycons.FOG;
        }

        icon.set("weather-icon",weatherCondition);
        icon.play();

        locationContent.text(cityName + "," + country);
        degreeContent.text(temp + String.fromCharCode(176) + "C");
        weatherContent.text(weather);

        body.fadeIn(500);
    });
}

//T(°F) = T(°C) × 9/5 + 32
function degreeConvertion(){
    var degreeContent = $("#degree");

    if(isCelsius){
        temp = ((temp*9/5) + 32).toFixed(0);
        isCelsius = false;
        degreeContent.text(temp + String.fromCharCode(176) + "F");
    }else{
        temp = ((temp-32)*5/9).toFixed(0);
        isCelsius = true;
        degreeContent.text(temp + String.fromCharCode(176) + "C");
    }
}