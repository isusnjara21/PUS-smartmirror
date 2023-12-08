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

    confirmUpdated = async function() {
        console.log("Updated " + this.moduleName);
        await this.updateDom();
        this.scheduleUpdate();
    };

    updateDom = async function() {};
    update = async function() {};
    scheduleUpdate = async function(time = null) {
        setTimeout(() => {
            this.update(0);
        }, time != null ? time : this.updateTime);
    };
};

module.exports = Module;