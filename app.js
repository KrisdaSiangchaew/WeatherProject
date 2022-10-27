const express = require('express');
const https = require('https');

const app = express();

app.get("/", function(req, res) {   
    const url = "https://api.openweathermap.org/data/2.5/weather?id=7759923&units=metric&appid=ba3e2e5807fe83d153bbe802fede1753";
    
    https.get(url, (response) => {
        console.log(response)
    });

    res.send("Hello from WeatherProject")
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.")
});