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
        this.sendSocketNotification("started");
        return this;
    };
    update = async function() {
        setTimeout(() => {
            console.log("updating");
            // example code to update module information
            this.sendSocketNotification("updated");
        }, this.updateTime);
    };
    setDom = function() {

    };
    getDom = function() {

    };
};

module.exports = Example;