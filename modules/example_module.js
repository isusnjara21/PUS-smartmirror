const Module = require("./module");

class Example extends Module {
    constructor() {
        super('name', 50, 100);
    }
    /*
        All of the following are required functions
    */
    start = async function() {
        // code to run at startup
        this.update();
        return this;
    };
    update = async function() {
        setTimeout(() => {
            // example code to update module information
        }, this.updateTime);
        this.scheduleUpdate();
    };
    scheduleUpdate = async function() {
        setTimeout(() => {
            this.update();
        }, this.time);
    };
    setDom = function() {

    };
    getDom = function() {

    };
};