'use strict';
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 8081});

function Server() {
    const app = express();
    const port = 5200;
    let server = null;

    this.fetchWeatherData = async function (ws) {
        let weatherData = "";

        fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Vara%C5%BEdin?unitGroup=metric&key=CPJEFE4NAQPHJQ9DCK8C6Z5HK&contentType=json", {
        method: 'GET', 
        headers: {},    
        }).then(response => {
        if (!response.ok) {
            throw response; //check the http response code and if isn't ok then throw the response as an error
        }
      
        return response.json(); //parse the result as JSON

        }).then(response => {
        // response now contains parsed JSON ready for use
        // let weather = "";
        weatherData = response.address + "," + 
                    response.days[0].datetime + "," + 
                    response.currentConditions.temp + "," + 
                    response.currentConditions.humidity + "," + 
                    response.days[0].description + "," + 
                    response.alerts[0].description;
        console.log(weatherData);
        ws.send("weatherModule$$" + weatherData);

        }).catch((errorResponse) => {
        if (errorResponse.text) { //additional error information
            errorResponse.text().then( errorMessage => {
            //errorMessage now returns the response body which includes the full error message
            })
        } else {
            //no additional error information 
        } 
        });

    }

    this.open = async function () {
        server = http.Server(app);
        
        //example
        this.counter = 0;
        app.get("/serverCounter", (req, res) => {
            res.set('Content-Type', 'text/plain');
            res.send(this.counter.toString());
            this.counter++;
        });
        //

        var modules = [];
        wss.on('connection', (ws) => {
            ws.on('message', (data) => {
                var string = data.toString();
                
                if(string.startsWith("!")) {
                    modules.push(string.substring(1));
                }
                else if(string.startsWith("#")) {
                    if (string.substring(1) == "weatherModule") {
                        this.fetchWeatherData(ws);
                    }
                    // if string.substring(1) == moduleName then call function for fetching online API data
                    // send data with ws.send("moduleName$$DATA_HERE")
                }
            });
        });

        app.use('/css', express.static(path.join(__dirname, '../smartmirror.css')));
        app.use("/js", express.static(__dirname));
        app.use("/modules", express.static(path.join(__dirname, "../modules")));
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "../index.html"));
        });
        server.listen(port, "localhost");
        
    };
    this.close = function() {
        return new Promise((resolve) => {
            server.close(resolve);
        });
    }
}

module.exports = Server;