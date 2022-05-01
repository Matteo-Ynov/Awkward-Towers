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
      fetch(`http://localhost:5001/user/a`, {
        method: `PATCH`,
        headers: req_headers,
      }).then((response) => {
        const { ipcRenderer } = require("electron");
        ipcRenderer.send("deleteCookies")
        ipcRenderer.send("setCookie", req_headers['username'])
        window.location.href = "profile.html"
      })
  }

}
