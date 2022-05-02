var passwordHash = require('password-hash');

function registerFormSubmit() {

  const usernameData = document.getElementById("username").value
  const passwordData = document.getElementById("password").value
  const passwordConfirmData = document.getElementById("password_confirm").value
  const HashedPassword = passwordHash.generate(passwordData)
  const data = JSON.stringify({
    username: usernameData,
    password: HashedPassword,
    highest_score: 0,
    gold: 0,
    elo: 0,
    connected: false,
    current_skin: "basic"
  })
  console.log(data)

  var send = false
  if (usernameData != ""){
    send = true;
  }
  if (passwordData != ""){
    if (passwordConfirmData != ""){
      if (passwordData == passwordConfirmData){
        send = true;
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Please confirm your password");
    }
  }

  if (send === true){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true


    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText)
      }
    })


    xhr.open('POST', 'http://localhost:5001/users')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.setRequestHeader('authorization', 'Bearer 123abc456def')


    xhr.send(data)

    const { ipcRenderer } = require("electron");
    ipcRenderer.send("setCookie", (document.getElementById("username").value))
    document.getElementById('myFormId').action = "./menu.html"
  }
}
