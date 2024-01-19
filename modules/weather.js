class Weather extends Module {
    constructor() {
        super('weatherModule', 90000); 
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
        wrapper.className = this.moduleName;

        const weatherWrapper = document.createElement("div");
        weatherWrapper.classList.add(this.moduleName);
        weatherWrapper.classList.add("weather");

        const tempWrapper = document.createElement("div");
        tempWrapper.classList.add(this.moduleName);
        tempWrapper.classList.add("temp");
        const tempDisplay = document.createElement("div");
        tempDisplay.classList.add(this.moduleName);
        tempDisplay.classList.add("temp");
        tempDisplay.classList.add("display");
        const celsiusDisplay = document.createElement("div");
        celsiusDisplay.innerText = '°C';
        celsiusDisplay.style.fontSize = '17px';
        celsiusDisplay.style.float = 'right';

        const dateTimeDisplay = document.createElement("div");
        dateTimeDisplay.classList.add(this.moduleName);
        dateTimeDisplay.classList.add("dateTime");
        dateTimeDisplay.classList.add("display");

        const descriptorWrapper = document.createElement("div");
        descriptorWrapper.classList.add(this.moduleName);
        descriptorWrapper.classList.add("desc");

        const dayDescDisplay = document.createElement("div");
        dayDescDisplay.classList.add(this.moduleName);
        dayDescDisplay.classList.add("day");
        dayDescDisplay.classList.add("display");

        const alertDescDisplay = document.createElement("div");
        alertDescDisplay.classList.add(this.moduleName);
        alertDescDisplay.classList.add("alert");
        alertDescDisplay.classList.add("display");

        const humidityDisplay = document.createElement("div");
        humidityDisplay.classList.add(this.moduleName);
        humidityDisplay.classList.add("humidity");
        humidityDisplay.classList.add("display");
        
        const positionBM = document.getElementsByClassName("BM");
        positionBM[0].appendChild(wrapper).appendChild(weatherWrapper);
        weatherWrapper.appendChild(tempWrapper);
        tempWrapper.appendChild(tempDisplay);
        tempWrapper.appendChild(celsiusDisplay);

        weatherWrapper.appendChild(humidityDisplay);
        weatherWrapper.appendChild(dateTimeDisplay);
        
        weatherWrapper.appendChild(descriptorWrapper);
        descriptorWrapper.appendChild(dayDescDisplay);
        descriptorWrapper.appendChild(alertDescDisplay);

        this.update();
    };
    updateDom = async function() {
        const tempDisplay = document.querySelector("." + this.moduleName + ".temp.display");
        //tempDisplay.innerText = "30";
        tempDisplay.innerText = this.temp;

        const dateTimeDisplay= document.querySelector("." + this.moduleName + ".dateTime.display");
        //dateTimeDisplay.innerText = "Varaždin" + ", " + "1-1-2024".replaceAll('-', '.');
        dateTimeDisplay.innerText = this.address + ", " + this.dateTime.replaceAll('-', '.');

        const dayDescDisplay = document.querySelector("." + this.moduleName + ".day.display");
        //dayDescDisplay.innerText = "Lorum ipsum 1";
        dayDescDisplay.innerText = this.dayDesc;

        const alertDescDisplay = document.querySelector("." + this.moduleName + ".alert.display");
        //alertDescDisplay.innerText = "Lorum ipsum 2";
        alertDescDisplay.innerText = this.alertDesc;

        const humidityDisplay = document.querySelector("." + this.moduleName + ".humidity.display");
        //humidityDisplay.innerText = "Humidity: " + "30" + '%';
        humidityDisplay.innerText = "Humidity: " + this.humidity + '%';
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const weatherModule = new Weather();
    weatherModule.init();
});

