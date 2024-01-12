class Clock extends Module {
    constructor() {
        super('clockModule', 1000);
    }
    start = async function() {
        this.hour = 0;
        this.minute = 0; 
    };
    update = async function() {
        this.hour = new Date().getHours().toString();
        this.minute = new Date().getMinutes().toString();
        this.confirmUpdated(); 
    };
    createDom = function() {
        const wrapper = document.createElement("div");        
        const hourWrapper = document.createElement("div");
        wrapper.className = this.moduleName;

        const minuteWrapper = document.createElement("div");
        hourWrapper.classList.add(this.moduleName);
        minuteWrapper.classList.add(this.moduleName);
        hourWrapper.classList.add("hour");
        minuteWrapper.classList.add("minute");

        const position = document.getElementsByClassName("UM");
        position[0].appendChild(wrapper).appendChild(hourWrapper);
        wrapper.appendChild(minuteWrapper);

        this.update();
    };
    updateDom = async function() {
        const hourWrapper = document.querySelector("." + this.moduleName + ".hour");
        const minuteWrapper = document.querySelector("." + this.moduleName + ".minute");
        hourWrapper.innerText = String(this.hour).padStart(2, '0');
        minuteWrapper.innerText = String(this.minute).padStart(2, '0');
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const clockModule = new Clock();
    clockModule.init();
});

