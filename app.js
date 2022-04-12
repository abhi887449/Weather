const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(request,response){
    response.sendFile(__dirname+'/views/index.html');
});

app.post("/",function(request,response){
    
    
const state = request.body.cityName;
console.log(state);
// at the place of apikey insert openweathermap api key
const apid = "apikey"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+state+"&appid="+apid+"&units=metric";
https.get(url,function(res){
    res.on('data', function(data) {
        const weatherdata = JSON.parse(data);
        if(weatherdata.cod != 200){
                const cod =weatherdata.cod;
            response.render('Error_page',{code:cod});
            
        }
        else{
        const temperature = weatherdata.main.temp;
        const icon = weatherdata.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        const des = weatherdata.weather[0].description;
        const feeltemp = weatherdata.main.feels_like;
        const cityname = weatherdata.name;
        const countryname = weatherdata.sys.country;
        const humi = weatherdata.main.humidity;
        const speed = weatherdata.wind.speed;
        const presu = weatherdata.main.pressure;
        response.render('Weather_information',{temp:temperature,descrip:des,feelslike:feeltemp,iconurl:imgurl,city:cityname,country:countryname,humidity:humi,pressure:presu,windspeed:speed});

           
        }
      });
});

});


app.listen(3000,function() {
    console.log("server is running at port 3000");
})
