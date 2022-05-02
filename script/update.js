var passwordHash = require('password-hash');
const { BrowserWindow, ipcRenderer } = require('electron')

function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var password_confirm = document.getElementById("password_confirm").value;
  var req_headers = {}
  var send = false
  if (username != ""){
    req_headers['username'] = username;
    send = true;
  }
  if (password != ""){
    if (password_confirm != ""){
      if (password == password_confirm){
        req_headers['password'] = passwordHash.generate(password);
        send = true;
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Please confirm your password");
    }
  }
  if (send === true){
    updateCookies(req_headers)
  }

}

async function updateCookies(req_headers) {
  const {ipcRenderer} = require("electron");
  await ipcRenderer.send("updateCookies", req_headers)
}

ipcRenderer.on("updateCookieok", (e, cookies, req_headers) => {
  username = cookies[0]["name"]
  console.log(username)
  fetch(`http://localhost:5001/user/${username}`, {
    method: `PATCH`,
    headers: req_headers,
  }).then((response) => {
    const { ipcRenderer } = require("electron");
    ipcRenderer.send("deleteCookies")
    ipcRenderer.send("setCookie", req_headers['username'])
    window.location.href = "profile.html"
  })
})

ipcRenderer.on("updateNocookie", (e, cookies) => {
  window.location.href = './index.html'
})
