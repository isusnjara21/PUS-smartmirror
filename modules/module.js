const express = require('express');

class Module {
    constructor(name, initialTime, time) {
        this.moduleName = name;
        this.initialUpdateTime = initialTime;
        this.updateTime = time;
    };
    setApp = function(app) {
        this.app = app;
    };
    setSocket = function(io) {
        this.socket = io;
        io.on(this.moduleName, () => {
            scheduleUpdate();
        });
    };

    sendSocketNotification = function(string) {
        this.socket.emit(string);
        console.log("emitted");
    };

    update = async function() {};
    scheduleUpdate = async function() {
        setTimeout(() => {
            this.update();
        }, this.time);
    };
};

module.exports = Module;