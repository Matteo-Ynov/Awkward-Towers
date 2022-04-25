function setCookies() {

    const {ipcRenderer} = require("electron");
    
    
    ipcRenderer.send("setCookie", (document.getElementById("email").value))

    /* document.getElementById('myFormId').action="./menu.html" */
}

function getCookies() {
    const {ipcRenderer} = require("electron");
    
    
    ipcRenderer.send("getCookies")
}