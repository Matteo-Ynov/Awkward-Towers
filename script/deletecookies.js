console.log("oefihybzuebhuo")
async function deleteCookies() {
    const {ipcRenderer} = require("electron");
    await ipcRenderer.send("deleteCookies")
}

ipcRenderer.on("cookiedelete", (e, cookies) => {
    window.location.href = './index.html'
})