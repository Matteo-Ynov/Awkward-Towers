const { ipcRenderer } = require("electron");

var username;
getCookies()

async function deleteAccount() {
    var username = document.getElementById("player_name").innerHTML.split(" : ")[1];
    const response = await fetch(`http://localhost:5001/user/${username}`, {
        method: 'DELETE',
    });
    console.log(response)
    const {ipcRenderer} = require("electron");
    await ipcRenderer.send("deleteCookies")
    window.location.href = './index.html'
}

function info(username) {
    fetch(`http://localhost:5001/user/${username}`)
    .then((res) => res.json())
    .then((data) => {
        var gold_div = document.getElementById("gold");
        gold_div.innerHTML += data["gold"];
    })
}


async function getCookies() {
    const {ipcRenderer} = require("electron");
    await ipcRenderer.send("getCookies")
}

ipcRenderer.on("cookieok", (e, cookies) => {
    username = cookies[0]["name"]
    info(username)
})

ipcRenderer.on("nocookie", (e, cookies) => {
    window.location.href = './index.html'
  })
  