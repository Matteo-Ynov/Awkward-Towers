function setCookies() {

    const {ipcRenderer} = require("electron");
    
    
    ipcRenderer.send("setCookie", (document.getElementById("email").value))
}

function getCookies() {
    const {ipcRenderer} = require("electron");
    
    
    ipcRenderer.send("getCookies")
}