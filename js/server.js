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
            const cors = {
                cors: {
                    origin: /.$/,
                    credentials: true
                },
                allowEIO3: true
            };
            const io = socketio(server, cors);

            server.on("connection", (socket) => {
                console.log("connected");
                sockets.add(socket);
                socket.on("close", () => {
                    sockets.delete(socket);
                });
                socket.on("updated", () => {
                    console.log("recieved update");
                });
            });

            server.listen(port, "localhost");
            app.use("/js", express.static(__dirname));
            
            server.on("listening", () => {
                console.log("listening");
                resolve({
                    app,
                    io
                });
            });
        });
    };
    this.close = function() {
        return new Promise((resolve) => {
            sockets.forEach((socket) => {socket.destroy()});
            server.close(resolve);
        });
    }

    this.socketNotification = function(socket, notification) {
        console.log(notification);
    };
}

module.exports = Server;