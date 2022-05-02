
fetch(`http://localhost:5001/users`)
  .then((res) => res.json())
  .then((data) => {
    data?.sort((a, b) => (a.highest_score > b.highest_score ? -1 : 1))
    document.getElementById("first_place").innerHTML = (data[0].username + " : " + data[0].highest_score)
    data.length > 1 ? document.getElementById("second_place").innerHTML = (data[1].username + " : " + data[1].highest_score) : document.getElementById("second_place").innerHTML = ("")
    data.lenght > 2 ? document.getElementById("third_place").innerHTML = (data[2].username + " : " + data[2].highest_score) : document.getElementById("third_place").innerHTML = ("")
  })
