const Server = require("server");

function Core () {
    this.start = async function () {
        //LOAD MODULES

        httpSever = new Server();
        const {app, io} = await httpServer.open();
    }
}