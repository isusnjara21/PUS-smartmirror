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

        console.log("Modules loaded");
        
    };
    this.stop = async function() {
        return httpServer.close();
    };


    process.on("SIGINT", async () => {
		await this.stop();
		process.exit(0);
	});
	process.on("SIGTERM", async () => {
		await this.stop();
		process.exit(0);
	});
};

module.exports = new Core();