var passwordHash = require('password-hash');
const {BrowserWindow} = require('electron')

function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  fetch(`http://localhost:5001/user/${username}`)
    .then((res) => res.json())
    .then((data) => {
      if (passwordHash.verify(password, data.password)) {
        alert("Login successfully");
        window.location.href = './game.html'
      }
    })
}


