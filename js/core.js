const Server = require("./server");
const ExampleModule = require("../modules/example_module");
let example = new ExampleModule();
function Core () {
    let httpServer;
    let modules = [];

    this.start = async function () {
        //code for wifi and camera goes here

        httpServer = new Server();
        const app = await httpServer.open();
        console.log("Server started.");
        //example module
        example.setApp(app);
        modules.push(example.start());


        
    };
    this.stop = async function() {
        return httpServer.close();
    };
};

module.exports = new Core();