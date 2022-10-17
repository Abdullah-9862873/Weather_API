const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const unit = 'metric';
    const apikey = `3265874a2c77ae4a04bb96236a642d2f`;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric";
    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temprature in " + query + "  is " + temp + " degree celcius </h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Listening to the port 3000: ");
})