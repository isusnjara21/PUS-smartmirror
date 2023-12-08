const Module = require("./module");

class Example extends Module {
    constructor() {
        super('exampleName', 50, 1000);
    }
    /*
        All of the following are required functions
    */
    start = async function() {
        // code to run at startup
        this.update(this.initialUpdateTime);
        return this;
    };
    update = async function(time = null) {
        setTimeout(() => {
            
            this.confirmUpdated();
        }, time != null ? time : this.updateTime);
    };
    createDom = function() {

    };
    updateDom = async function() {

    }
    getDom = function() {

    };
};

module.exports = Example;