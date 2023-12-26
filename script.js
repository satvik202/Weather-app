import {apiKey} from "./key.js"
let Weather = {
    apiKey :  `${apiKey}`,
    fetchWeather : function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city+
            "&units=metric&appid="
            + this.apiKey
        ).then(Response => Response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather : function (data){
        const {name}= data;
        const {temp, humidity} = data.main ;
        const {icon, description} = data.weather[0];
        const {speed} = data.wind;
        console.log(name,temp, icon, description, speed, humidity);
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')";
        document.querySelector('.city').innerText= name;
        document.querySelector('.temp').innerText= temp+"°C";
        document.querySelector('.humidity').innerText="Humidity: " + humidity + "%";
        document.querySelector('.wind').innerText="Wind speed: " + speed + " km/h";
        document.querySelector('.icon').src="https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText= description;
    },

    search : function (){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-btn").addEventListener("click", function (){
    Weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if( event.key=="Enter")
    Weather.search();
});
let lat=-1,lng=-1;
let city;
// navigator.geolocation.getCurrentPosition(
//     function(success) {
//       // Handle successful retrieval of the current position
//       lat= success.coords.latitude;
//       lng= success.coords.longitude;
//     },
//     function(error) {
//       // Handle errors
//       console.error('Error getting geolocation:', error);
//     }
//   );
     
 Weather.fetchWeather("delhi");
