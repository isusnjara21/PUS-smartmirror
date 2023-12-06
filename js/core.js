const Server = require("./server");

function Core () {
    let httpServer;

    this.start = async function () {
        //LOAD MODULES

        httpServer = new Server();
        const {app, io} = await httpServer.open();
    };
    this.stop = async function() {
        return httpServer.close();
    };
};

module.exports = new Core();