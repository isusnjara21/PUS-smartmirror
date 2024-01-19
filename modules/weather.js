class Weather extends Module {
    constructor() {
        super('weatherModule', 1000); 
            // reads from weather API every x number of sec
    }
    start = async function() {
        this.address = "";
        this.dateTime = "";
        this.temp = ""; 
        this.humidity = "";
        this.dayDesc = "";
        this.alertDesc = "";
    };
    update = async function() {
        var updateInfo = this.updater.innerText.split(",");
        if (updateInfo.length > 1) {
            console.log(updateInfo);
            this.address = updateInfo[0];
            this.dateTime = updateInfo[1];
            this.temp = updateInfo[2]; 
            this.humidity = updateInfo[3];
            this.dayDesc = updateInfo[4];
            this.alertDesc = updateInfo[5];
        }
        this.confirmUpdated();  
    };
    createDom = function() {
        const wrapper = document.createElement("div");
        const weatherWrapper = document.createElement("div");
        const addressWrapper = document.createElement("div");
        const dateTimeWrapper = document.createElement("div");
        const tempWrapper = document.createElement("div");
        const humidityWrapper = document.createElement("div");
        const dayDescWrapper = document.createElement("div");
        const alertDescWrapper = document.createElement("div");

        wrapper.className = this.moduleName;

        weatherWrapper.classList.add(this.moduleName);
        weatherWrapper.classList.add("weather");
        addressWrapper.classList.add(this.moduleName);
        addressWrapper.classList.add("address");
        dateTimeWrapper.classList.add(this.moduleName);
        dateTimeWrapper.classList.add("dateTime");
        tempWrapper.classList.add(this.moduleName);
        tempWrapper.classList.add("temp");
        humidityWrapper.classList.add(this.moduleName);
        humidityWrapper.classList.add("humidity");
        dayDescWrapper.classList.add(this.moduleName);
        dayDescWrapper.classList.add("dayDesc");
        alertDescWrapper.classList.add(this.moduleName);
        alertDescWrapper.classList.add("alertDesc");
        
        const position = document.getElementsByClassName("BM");
        position[0].appendChild(wrapper).appendChild(weatherWrapper);
        weatherWrapper.appendChild(addressWrapper); // ?
        weatherWrapper.appendChild(dateTimeWrapper);
        weatherWrapper.appendChild(tempWrapper);
        weatherWrapper.appendChild(humidityWrapper);
        weatherWrapper.appendChild(dayDescWrapper);
        weatherWrapper.appendChild(alertDescWrapper);

        this.update();
    };
    updateDom = async function() {
        const weatherWrapper = document.querySelector("." + this.moduleName + ".weather");
        const addressWrapper = document.querySelector("." + this.moduleName + ".address");
        const dateTimeWrapper= document.querySelector("." + this.moduleName + ".dateTime");
        const tempWrapper = document.querySelector("." + this.moduleName + ".temp");
        const humidityWrapper = document.querySelector("." + this.moduleName + ".humidity");
        const dayDescWrapper = document.querySelector("." + this.moduleName + ".dayDesc");
        const alertDescWrapper = document.querySelector("." + this.moduleName + ".alertDesc");

        addressWrapper.innerText = this.address;
        dateTimeWrapper.innerText = this.dateTime;
        tempWrapper.innerText = this.temp;
        humidityWrapper.innerText = this.humidity;
        dayDescWrapper.innerText = this.dayDesc;
        alertDescWrapper.innerText = this.alertDesc;

    };
};

document.addEventListener("DOMContentLoaded", () => {
    const weatherModule = new Weather();
    weatherModule.init();
});

