const { app, BrowserWindow } = require("electron");
const path = require("path");

let window;

app.on("ready", () => {
    window = new BrowserWindow({
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: false,
    });
    window.webContents.openDevTools();
    window.loadFile("./static/game.html");
    window.maximize();

    window.on("closed", () => {
        app.quit();
    });
});