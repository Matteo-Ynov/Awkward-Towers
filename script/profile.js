const { ipcRenderer } = require("electron");

var username;
getCookies()


function info(username) {
    console.log(username)
    fetch(`http://localhost:5001/user/${username}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        var username_div = document.getElementById("player_name");
        var score_div = document.getElementById("player_score");
        var gold_div = document.getElementById("gold");
        username_div.innerHTML += data["username"];
        score_div.innerHTML += data["highest_score"];
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
  