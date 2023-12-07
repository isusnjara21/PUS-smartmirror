const express = require('express');

class Module {
    constructor(name, initialTime, time) {
        this.moduleName = name;
        this.initialUpdateTime = initialTime;
        this.updateTime = time;
    }
    setApp = function(app) {
        this.app = app;
    }
    setSocket = function(io) {
        this.io = io;

        io.of(this.moduleName).on("connection", (socket) => {
            const onevent = socket.onevent;
            socket.onevent = function(packet) {
                const args = packet.data || [];
				onevent.call(this, packet);
				packet.data = ["*"].concat(args);
				onevent.call(this, packet);
            };
        });
    };
};

module.exports = Module;