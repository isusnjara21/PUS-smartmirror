const fs = require('fs');
const { spawn } = require('child_process');

function Camera() {

    this.delay = function (time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }

    this.runPythonScript = async function () {
        const pythonScriptPath = '/home/smartmirror/Desktop/PUS-smartmirror/py/face-detector.py';

        const pythonProcess = spawn('python', [pythonScriptPath]);
    };

    this.enable = async function(ws) {
        ws.send("cam?");
        this.runPythonScript();
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

    this.checkFaceDetection = function () {
        const content = fs.readFileSync('/home/smartmirror/Desktop/PUS-smartmirror/face_detection_result.txt', 'utf8');
        return content.trim() === '1';
    };

    this.start = async function() {
        let counter = 0;
        console.log("cam started");
        while(counter < 3) {
            
            await this.delay(500).then(() => {
                if(this.checkFaceDetection()) {
                    console.log(counter);
                    counter++;
                }
                
            });
            
        }
        console.log("finished start");
    };

    this.end = async function() {
        let counter = 20;
        console.log("cam ended");
        while(counter >= 0) {
            
            await this.delay(500).then(() => {
                if(this.checkFaceDetection()) {
                    console.log(counter);
                    counter = 20;
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