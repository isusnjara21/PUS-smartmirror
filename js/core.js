const Server = require("./server");
const ExampleModule = require("/modules/example_module.js");
let example = new ExampleModule();

function Core () {
    let httpServer;
    let modules = [];

    this.start = async function () {
        httpServer = new Server();
        const {app, io} = await httpServer.open();

        //example module
        example.setApp(app);
        example.setSocket(io);
        modules.push(example.start());

    };
    this.stop = async function() {
        return httpServer.close();
    };
};

module.exports = new Core();