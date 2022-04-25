var passwordHash = require('password-hash');
const { BrowserWindow, ipcRenderer } = require('electron')

function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  fetch(`http://localhost:5001/user/${username}`)
    .then((res) => res.json())
    .then((data) => {
      if (passwordHash.verify(password, data.password)) {
        const { ipcRenderer } = require("electron");
        ipcRenderer.send("setCookie", (document.getElementById("username").value))
        window.location.href = './menu.html'
      } else {
        alert("Nom d'utilisateur ou mot de passe inccorect");
      }
    })
}


async function getCookies() {
  const {ipcRenderer} = require("electron");
  await ipcRenderer.send("getCookies")
}

ipcRenderer.on("nocookie", (e, cookies) => {
  window.location.href = './index.html'
})