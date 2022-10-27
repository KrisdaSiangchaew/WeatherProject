const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {   
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    const endpoint = "api.openweathermap.org/data/2.5/weather";
    const query = req.body.cityName;
    const unit = "metric";
    const auth = "ba3e2e5807fe83d153bbe802fede1753";
    const url = `https://${endpoint}?q=${query}&units=${unit}&appid=${auth}`;

    https.get(url, (response) => {
        // console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)

            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The temperature is ${temp} degrees Celsius.</h1>`)
            res.write(`<p>The weather in ${query.toUpperCase()} is ${description}.</p>`)
            res.write(`<img src = ${imageURL}>`)
            res.send()

            // res.write enable writing multiple lines.
            // You can send only 1 res.send()
            // Safari issue: Cannot do inline string interpoloation plus html symbol with res.write()
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
});