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

    sendNotification = function(string) {
        console.log("notification recieved: " + string);
        this.recieveNotification(string);
    };

    recieveNotification = async function(string) {
        switch(string) {
            case "updated": {
                this.scheduleUpdate();
                break;
            }
        }
    }

    update = async function() {};
    scheduleUpdate = async function() {
        setTimeout(() => {
            this.update();
        }, this.time);
    };
};

module.exports = Module;