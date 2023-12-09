class Module {
    constructor(name, time) {
        this.moduleName = name;
        this.updateTime = time;
    };

    /*
        Should be called when update is finished to update the DOM on the server, automatically schedules next update.
    */
    confirmUpdated = async function() {
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