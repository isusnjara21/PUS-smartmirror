const express = require('express');

class Module {
    
    constructor(name, initialTime, time) {
        this.moduleName = name;
        this.initialUpdateTime = initialTime;
        this.updateTime = time;
    };

    /*
        Gives the module an access into the server its running on.
    */
    setApp = function(app) {
        this.app = app;
    };

    /*
        Should be called when update is finished to update the DOM on the server, automatically schedules next update.
    */
    confirmUpdated = async function() {
        console.log("Updated " + this.moduleName);
        await this.updateDom();
        this.scheduleUpdate();
    };

    /*
        Schedules next update, defaults to immediatelly updating unless given a time after which it will start the next update.
    */
    scheduleUpdate = async function(time = null) {
        if(!this.scheduled) {
            setTimeout(() => {
                if(!this.suspension) { this.update(0); };
                this.scheduled = false;
            }, time != null ? time : this.updateTime);
            this.scheduled = true;
        }
    };

    /*
        Functions should be implemented within the module itself.
        updateDom gets called when update is confirmed.
        update gets called on time for the next scheduled update.
    */
    updateDom = async function() {};
    update = async function() {};
};

module.exports = Module;