const electron = require('electron');
const core = require("./core");
const { BrowserWindow } = require('electron/main');

const app = electron.app;

function createWindow() {
    let screen;
    try {
        screen = electron.screen.getPrimaryDisplay().workAreaSize;
    } catch {
        screen = (800,600);
    }

    const window = new BrowserWindow({
        width: screen.width,
        height: screen.height,
        x: 0,
        y: 0,
        darkTheme: true,
        backgroundColor: "#000000",
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
			nodeIntegration: false,
        }
    });

    window.loadURL('http://localhost:5200');

    if(process.argv.includes("dev")) {
        window.webContents.openDevTools();
    }
    window.webContents.on("dom-ready", (event) => {
		window.webContents.sendInputEvent({ type: "mouseMove", x: 0, y: 0 });
	});

    window.on("closed", function () {
        window.destroy();
    });

    window.once("ready-to-show", () => {
		window.show();
	});
}

app.on("window-all-closed", function() {
    app.quit();
});

app.on("before-quit", async (event) => {
	event.preventDefault();
	setTimeout(() => {
		process.exit(0);
	}, 3000);
    await core.stop();
	process.exit(0);
});

app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
	event.preventDefault();
	callback(true);
});

core.start().then(() => {
    if(!process.argv.includes("test")) {
        app.whenReady().then(() => {
            createWindow();
        });
    }
});