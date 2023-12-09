const Server = require("./server");

function Core () {
    let httpServer;

    this.start = async function () {
        //code for wifi goes here
        //code for camera goes here
        
        httpServer = new Server();
        httpServer.open();

        
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