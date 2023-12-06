const express = require('express');
const socketio = require('socket.io');
const http = require('http');

function Server() {
    const app = express();
    const port = 5200;
    let server = null;
    let sockets = new Set();

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

            server.on("connection", (socket) => {
                sockets.add(socket);
                socket.on("close", () => {
                    sockets.delete(socket);
                });
            });

            server.listen(port, "localhost");
            app.use("/js", express.static(__dirname));

            server.on("listening", () => {
                resolve({
                    app,
                    io
                });
            });
        });
    };
    this.close = function() {
        return new Promise((resolve) => {
            for(const socket of sockets.value()) {
                socket.destroy();
            }
            server.close(resolve);
        });
    }
}

module.exports = Server;