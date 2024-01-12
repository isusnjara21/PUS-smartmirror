class Example extends Module {
    constructor() {
        super('exampleName', 1000);
    }
    /*
        All of the following are required functions
    */
    start = async function() {
        // code to run at startup

        this.count = 0;

    };
    update = async function() {
        this.count = this.update.innerText;
        /*
        fetch("/serverCounter")
        .then(x => x.text())
        .then(y =>this.count = y === undefined ? 0 : y);*/
        this.confirmUpdated();
    };
    createDom = function() {
        const wrapper = document.createElement("div");
        wrapper.style.display = "block";

        const counterWrapper = document.createElement("div");
        counterWrapper.className = this.moduleName;
        counterWrapper.innerText = this.count;
        counterWrapper.style.color = "white";

        const position = document.getElementsByClassName("UR");
        position[0].appendChild(wrapper).appendChild(counterWrapper);

        this.update();
    };
    updateDom = async function() {
        const counterWrapper = document.querySelector("." + this.moduleName);
        counterWrapper.innerText = this.count;
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const exampleModule = new Example();
    exampleModule.start();
    exampleModule.createDom();
});