const { ipcRenderer } = require("electron");

var username;
var gold_value
getCookies()

function info(username) {
    var obama = document.getElementById("text-obama")
    var gold = document.getElementById("text-gold")
    fetch(`http://localhost:5001/user/${username}`)
        .then((res) => res.json())
        .then((data) => {
            var gold_div = document.getElementById("gold");
            gold_value = data["gold"]
            gold_div.innerHTML += gold_value;
            has_gold_skin = false
            has_obama_skin = false
            fetch(`http://localhost:5001/inventory/${username}`, { method: "GET", }).then(
                value => value.json()).then(
                    (data) => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].cosmetic_id === "obama") {
                                has_obama_skin = true
                            } else if (data[i].cosmetic_id === "gold") {
                                has_gold_skin = true
                            }
                        }
                        if(has_gold_skin === false) {
                            document.getElementById("text-gold").innerHTML = '<p class="card-title">Price : <span style="color: gold;">10 000</span></p>'
                            document.getElementById("button-gold").innerHTML = 'Buy'
                        }
                        if(has_obama_skin === false) {
                            document.getElementById("text-obama").innerHTML = '<p class="card-title">Price : <span style="color: gold;">30 000</span></p>'
                            document.getElementById("button-obama").innerHTML = 'Buy'
                        }
                    }
                )
            current = document.getElementById(`button-${data.current_skin}`)
            current.innerHTML = "Current skin"
            current.disabled = true
        })
}

async function getCookies() {
    const { ipcRenderer } = require("electron");
    await ipcRenderer.send("getCookies")
}

ipcRenderer.on("cookieok", (e, cookies) => {
    username = cookies[0]["name"]
    info(username)
})

ipcRenderer.on("nocookie", (e, cookies) => {
    window.location.href = './index.html'
})


async function buy_obama() {
    let has_obama = false
    await fetch(`http://localhost:5001/inventory/${username}`, { method: "GET", }).then(
        value => value.json()).then(
            (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].cosmetic_id === "obama") {
                        has_obama = true
                    }
                }
            }
        )
    if (has_obama) {
        fetch(`http://localhost:5001/user/${username}`, {
            method: `PATCH`,
            headers: { current_skin: "obama" },
        })
    } else {
        if (gold_value >= 30000) {
            fetch(`http://localhost:5001/user/${username}`, {
                method: `PATCH`,
                headers: { gold: gold_value - 30000, current_skin: "obama" },
            })
            fetch(`http://localhost:5001/inventory/${username}`, {
                method: `POST`,
                headers: { cosmetic_id: "obama" },
            })
        }
    }
    window.location.reload()
}

async function buy_gold() {
    var has_gold = false
    await fetch(`http://localhost:5001/inventory/${username}`, { method: "GET", }).then(
        value => value.json()).then(
            (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].cosmetic_id === "gold") {
                        has_gold = true
                    }
                }
            }
        )
    if (has_gold) {
        fetch(`http://localhost:5001/user/${username}`, {
            method: `PATCH`,
            headers: { current_skin: "gold" },
        })
    } else {
        if (gold_value >= 10000) {
            fetch(`http://localhost:5001/user/${username}`, {
                method: `PATCH`,
                headers: { gold: gold_value - 10000, current_skin: "gold" },
            })
            fetch(`http://localhost:5001/inventory/${username}`, {
                method: `POST`,
                headers: { cosmetic_id: "gold" },
            })
        }
    }
    window.location.reload()
}

function choose_basic() {
    fetch(`http://localhost:5001/user/${username}`, {
        method: `PATCH`,
        headers: { current_skin: "basic" },
    })
    window.location.reload()
}