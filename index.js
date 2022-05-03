const { app, BrowserWindow, session, ipcMain } = require("electron");

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
    // window.webContents.openDevTools();

    window.loadFile("./static/index.html");

    ipcMain.on("setCookie", (e, username) => {
        const cookie = { url: "http://awkward-towers", name: username };
        session.defaultSession.cookies.set(cookie).then(
            () => {
                session.defaultSession.cookies.get({}).then((cookie) => {
                    console.log(cookie);
                });
            },
            (error) => {
                console.error(error);
            }
        );
    });

    ipcMain.on("getCookies", () => {
        session.defaultSession.cookies
            .get({ url: "http://awkward-towers" })
            .then((cookies) => {
                if (cookies.length !== 0) {
                    window.webContents.send("cookieok", cookies);
                } else {
                    window.webContents.send("nocookie");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    ipcMain.on("updateCookies", (e, req_headers) => {
        session.defaultSession.cookies
            .get({ url: "http://awkward-towers" })
            .then((cookies) => {
                if (cookies.length !== 0) {
                    window.webContents.send("updateCookieok", cookies, req_headers);
                } else {
                    window.webContents.send("updateNocookie");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    ipcMain.on("deleteCookies", () => {
        session.defaultSession.clearStorageData({
            options: { origin: "XXX", storages: ["cookies"] },
        });
    });

    window.maximize();

    window.on("closed", () => {
        app.quit();
    });
});