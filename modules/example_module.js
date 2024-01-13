class Example extends Module {
    constructor() {
        super('exampleName', 1000);
    }
    /*
        All of the following are required functions
    */
    start = async function() {
        // code to run at startup
        this.count = 1;
    };
    update = async function() {
        this.count = this.updater.innerText;
        this.confirmUpdated();
    };
    createDom = function() {
        const wrapper = document.createElement("div");
        wrapper.style.display = "block";

        const counterWrapper = document.createElement("div");
        counterWrapper.classList.add(this.moduleName); // For categorization between modules
        counterWrapper.classList.add("count"); // Required for distinction between divs within module, otherwise updateDom might always default to the update div
        counterWrapper.style.color = "white";

        const position = document.getElementsByClassName("UR");
        position[0].appendChild(wrapper).appendChild(counterWrapper);

        this.update();
    };
    updateDom = async function() {
        const counterWrapper = document.querySelector("." + this.moduleName + ".count");
        this.count++;
        counterWrapper.innerText = this.count;
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const exampleModule = new Example();
    exampleModule.init();
});