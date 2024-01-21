const {StillCamera} = require('pi-camera-connect');
const camera = new StillCamera();

function Camera() {

    this.delay = function (time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }

    this.enable = async function(ws) {
        while(true) {
            await new Promise(async (resolve) => {
                await this.start();
                ws.send("cam!");
                await this.end();
                ws.send("cam?");
                resolve();
            });
        }
    };

    this.start = async function() {
        let counter = 0;
        console.log("cam started");
        while(counter < 3) {
            //const image = await camera.takeImage();
            await this.delay(500).then(() => {
                // HERE NEED TO TEST IF HAS FACE
                // IF YES ADD 1 TO COUNTER IF NO SUBTRACT 1
                console.log(counter);
                counter++;
            });
        }
        console.log("finished start");
    };

    this.end = async function() {
        let counter = 8;
        console.log("cam ended");
        while(counter >= 0) {
            //const image = await camera.takeImage();
            await this.delay(500).then(() => {
                // HERE NEED TO TEST IF HAS FACE
                // IF YES SUBTRACT 1 TO COUNTER
                console.log(counter);
                counter--;
            });
        }

        console.log("finished end");
    }
}

module.exports = Camera;