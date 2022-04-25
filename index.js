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
    window.webContents.openDevTools();

    

    
      
    window.loadFile("./static/index.html");

    ipcMain.on("setCookie", (e, email) => {
      const cookie = { url: 'http://awkward-towers', name: email, value: email }
      session.defaultSession.cookies.set(cookie)
        .then(() => {
          // success
        }, (error) => {
          console.error(error)
        })
      
    });

    ipcMain.on("getCookies", () => {
      // Query all cookies.
      session.defaultSession.cookies.get({ url: 'http://awkward-towers' })
      .then((cookies) => {
        console.log(cookies)
      }).catch((error) => {
        console.log(error)
      })
    })

    



    /* const cookie = { url: 'http://localhost:5000/', name: 'dummy_name', value: 'dummy' }
    session.defaultSession.cookies.set(cookie)
      .then(() => {
        // success
        console.log("good")
      }, (error) => {
        console.error(error)
      }) */
      

    window.maximize();

    window.on("closed", () => {
        app.quit();
    });
});