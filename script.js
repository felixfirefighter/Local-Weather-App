/**
 * Created by LEE on 2016/10/05.
 */
// API Key : 212c4c05b3b83f3d3cfc2caad60af394

// API call : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=1111111111

//sunrise 7AM - sunset 7PM

$(document).ready(function () {

    var lat, lon = 40;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = Math.floor(position.coords.latitude);
            lon = Math.floor(position.coords.longitude);

            getWeather(lat, lon);

        });
    } else {
        $(".off").text("Browser Geolocation Not Enabled :(");

        lat = lon = 0;

        getWeather(lat, lon);
    }


});

function getWeather(lat, lon){
    var url = "";

    var weatherCondition = "";

    var date = new Date();
    var hour = date.getHours();

    var text = $("#data");
    var pic = $("#pic");
    var test = $("#test");

    //url = "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=212c4c05b3b83f3d3cfc2caad60af394";

    //url = "http://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&APPID=212c4c05b3b83f3d3cfc2caad60af394";

    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=212c4c05b3b83f3d3cfc2caad60af394&units=metric";

    $.getJSON(url,function(data){

        var id = 0;

        var result = JSON.stringify(data);

        var jsonData = JSON.parse(result);

        for(key in result){
            if(result.hasOwnProperty("coord")){
                text.append(result["coord"] + "\n");
            }
        }

        //get current weather condition depending on id
        if((id>=200 && id<=232) || (id>=960 && id<=962)){
            weatherCondition = "stormy";
        }else if((id>=300 && id<=321) || (id>=500 && id<=531)){
            weatherCondition = "rainy";
        }else if(id>=600 && id<=622){
            weatherCondition = "snowy";
        }else if(id == 800){
            if(hour>=7 && hour<=19) {
                weatherCondition = "sunny";
            }else{
                weatherCondition = "starry";
            }
        }else if(id>=801 && id<=804){
            weatherCondition = "cloudy";
        }else{
            weatherCondition = "rainbow";
        }
    });
}