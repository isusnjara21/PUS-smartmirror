const {libcamera} = require('libcamera')
const faceapi = require('face-api.js');
const fs = require('fs');

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
                this.delay(500);
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
            libcamera
                .still({config: {nopreview: true, output: 'scan.jpg'},})
                //.then(result => console.log(result))
                .catch(err => console.log(err));
             
            await this.delay(500).then(() => {
                if(true) {
                    console.log(counter);
                    counter++;
                } else {
                    console.log(counter);
                    counter = 0;
                }
                
            });
            
        }
        console.log("finished start");
    };

    this.end = async function() {
        let counter = 8;
        console.log("cam ended");
        while(counter >= 0) {
            libcamera
                .still({config: {nopreview: true, output: 'scan.jpg'},})
                //.then(result => console.log(result))
                .catch(err => console.log(err));
            
            await this.delay(500).then(() => {
                if(false) {
                    console.log(counter);
                    counter = 8;
                } else {
                    console.log(counter);
                    counter--;
                }
                
            });
        }
        console.log("finished end");
    }
}

module.exports = Camera;