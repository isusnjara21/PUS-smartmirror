const express = require('express');
const socketio = require('socket.io');
const http = require('http');

function Server () {
    const app = express();
    const port = 5200;
    let server = null;

    this.open = async function () {
        return new Promise((resolve) => {
            server = http.Server(app);
            const cors = [{
                cors: {
                    origin: /.$/,
                    credentials: true
                }
            }];
            const io = socketio(server, cors);

            server.listen(port, "localhost");
            app.use("/js", express.static(__dirname));

            server.on("listening", () => {
                resolve({
                    app,
                    io
                });
            });
        });
    }
}

module.exports = new Server();