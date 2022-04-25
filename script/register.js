var passwordHash = require('password-hash');

function registerFormSubmit() {

  const usernameData = document.getElementById("username").value
  const passwordData = document.getElementById("password").value
  const HashedPassword = passwordHash.generate(passwordData)
  console.log(usernameData, HashedPassword)
  const data = JSON.stringify({
    username: usernameData,
    password: HashedPassword,
    highest_score: 0,
    gold: 0,
    elo: 0,
    connected: false,
  })
  console.log(data)
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


  document.getElementById('myFormId').action = "./index.html"
}
