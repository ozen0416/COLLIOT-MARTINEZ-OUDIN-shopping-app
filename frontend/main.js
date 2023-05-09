const url = "http://localhost:3000"

const btn = document.querySelector('.btn')
const container = document.querySelector(".shoes-ctn")
const pickers = document.querySelectorAll(".picker")

let shoes = []
let filteredshoes = []

function loadshoes() {
    fetch(`${url}/shoes`)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            shoes = data
            filteredshoes = data
            console.log(filteredshoes)
            displayShoes()
        })
}

function displayShoes() {
    container.innerHTML = ""
    filteredshoes.forEach(shoes => {
        let nike1Ctn = document.createElement("div")
        let jordanCtn = document.createElement("div")
        nike1Ctn.classList.add("nike1-item")
        jordanCtn.classList.add("jordan-item")
        nike1Ctn.innerHTML = `
            <img class="nike1-img" src="../backend/assets/img/NikeAirForce1.png" alt="nike1"/>
            <div class="nike1-name">${shoes.name}</div>
            <div> ${shoes.price} €</div>
        `
        jordanCtn.innerHTML = `
        <img class="jordan-img" src="../backend/assets/img/AirJordan1Mid1.png" alt="nike"/>
        <div class="shoes-name">${shoes.name}</div>
        <div> ${shoes.price}€ </div>
    `
        container.appendChild(nike1Ctn)
        container.appendChild(jordanCtn)
    })
}

pickers.forEach(picker => {
    picker.addEventListener("click", selectItem)
})

function selectItem(e) {
    let picker = e.target
    let color = e.target.classList[2]
    pickers.forEach((e) => {
        e.classList.remove("selected")
    })
    picker.classList.add("selected")
    filterByColor(color)
}

function filterByColor(color) {
    if (color === "all") {
        filteredshoes = shoes
        loadshoes()
    }
    filteredshoes = shoes.filter(shoes => shoes.colors === color)
    if (filteredshoes.length <= 0) {
        container.innerHTML = "R trouvé mon frère"
        return
    }
    displayShoes()
}

// tri par prix

const priceBtn = document.querySelector(".price-btn")
priceBtn.addEventListener("click", sortByPrice)

function comparedByPrice(a, b) {
    return a.price - b.price
}

function sortByPrice() {
    filteredshoes.sort(comparedByPrice)
    displayShoes()
}

loadshoes()