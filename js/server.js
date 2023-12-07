const express = require('express');
const http = require('http');

function Server() {
    const app = express();
    const port = 5200;
    let server = null;

    this.open = async function () {
        return new Promise((resolve) => {
            server = http.Server(app);

            server.listen(port, "localhost");
            app.use("/js", express.static(__dirname));
            
            server.on("listening", () => {
                resolve({
                    app
                });
            });
        });
    };
    this.close = function() {
        return new Promise((resolve) => {
            server.close(resolve);
        });
    }
}

module.exports = Server;