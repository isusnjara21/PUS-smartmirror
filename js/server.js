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
                    
                }
            });
            ws.send('exampleName$$' + 3);
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