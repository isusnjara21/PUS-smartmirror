'use strict';
const express = require('express');
const http = require('http');
const path = require('path');

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