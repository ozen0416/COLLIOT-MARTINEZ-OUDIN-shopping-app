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
            displayShoes()
        })
}

function displayShoes() {
    container.innerHTML = ""
    filteredshoes.forEach(shoe => {
        let shoeCtn = document.createElement("div")
        shoeCtn.classList.add("shoe-item")
        let formattedShoeName = shoe.name.replace(/\s+/g, '')
        shoeCtn.innerHTML = `
            <img class="nike1-img" src="../backend/assets/img/${formattedShoeName}1.png" alt="nike1"/>
            <div class="nike1-name">${shoe.name}</div>
            <div> ${shoe.price} €</div>
        `
        container.appendChild(shoeCtn)
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