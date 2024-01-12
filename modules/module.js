console.log('open: ');
var ws = new WebSocket("ws://127.0.0.1:8081");
ws.onopen = function (event) {
    console.log('Connection is open ...');
};
ws.onerror = function (err) {
    console.log('err: ', err);
};
ws.onmessage = function (event) {
    var data = event.data.split("$$");
    var module = data[0];
    var update = data[1];
    const updater = document.querySelector('head.' + module + '.update');
    if(updater != null) {
        updater.innerText = update;
    }
};
ws.onclose = function() {
    console.log("Connection is closed...");
};

class Module {
    constructor(name, time) {
        this.moduleName = name;
        this.updateTime = time;
        this.update = document.createElement('div');
        this.update.classList.add(this.moduleName);
        this.update.classList.add('update');
        const head = document.querySelector('head');
        head.appendChild(this.update);

        ws.send('!' + this.moduleName);
    };

    /*
        Should be called when update is finished to update the DOM on the server, automatically schedules next update.
    */
    confirmUpdated = async function() {
        ws.send('#' + this.moduleName)
        console.log("Updated " + this.moduleName);
        await this.updateDom();
        this.scheduleUpdate();
    };

    /*
        Schedules next update, defaults to immediatelly updating unless given a time after which it will start the next update.
    */
    scheduleUpdate = async function(time = null) {
        if(!this.scheduled) {
            this.scheduled = true;
            setTimeout(() => {
                if(!this.suspension) { this.update(); };
                this.scheduled = false;
            }, time != null ? time : this.updateTime);
            
        }
    };

    /*
        Functions should be implemented within the module itself.
        updateDom gets called when update is confirmed.
        update gets called on time for the next scheduled update.
    */
    updateDom = async function() {};
    update = async function() {};
};