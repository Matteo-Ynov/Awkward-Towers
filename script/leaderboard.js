
fetch(`http://localhost:5001/users`)
  .then((res) => res.json())
  .then((data) => {
    data?.sort((a, b) => (a.highest_score > b.highest_score ? -1 : 1))
    mydiv = document.getElementById("leaderboard")
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const p = document.createElement('p');
        p.className = 'card-title';
        p.innerHTML = (data[i].username + " : " + data[i].highest_score)
        mydiv.appendChild(p);   
    }
  })
