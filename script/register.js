

function registerFormSubmit() {

    const usernameData = document.getElementById("username").value
    const passwordData = document.getElementById("password").value

    const data = JSON.stringify({
        username: usernameData,
        password: passwordData,
        highest_score: 0,
        gold: 0,
        elo: 0,
        connected: false,
        last_connection: new Date().toLocaleDateString()
      })
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      
      
      xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
      console.log(this.responseText)
      }
      })
      
      
      xhr.open('POST', 'http://localhost:5001/users')
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.setRequestHeader('authorization', 'Bearer 123abc456def')
      
      
      xhr.send(data)
    
    
    document.getElementById('myFormId').action="./index.html"
}
 
