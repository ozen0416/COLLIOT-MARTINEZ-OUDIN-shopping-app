const url = "http://localhost:3000"

const btn = document.querySelector('.btn')
const container = document.querySelector(".sneakers-ctn")
const pickers = document.querySelectorAll(".picker")

let sneakers = []
let filteredSneakers = []

function loadSneakers() {
    fetch(`${url}/sneakers`)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            sneakers = data
            filteredSneakers = data
            console.log(filteredSneakers)
            displaySneakers()
        })
}

function displaySneakers() {
    container.innerHTML = ""
    filteredSneakers.forEach(sneaker => {
        let sneakersCtn = document.createElement("div")
        sneakersCtn.classList.add("sneakers-item")
        sneakersCtn.innerHTML = `
            <img class="sneakers.img" src="" alt="sneaker"/>
            <div class="sneakers-name">${sneaker.name}</div>
            <div> ${sneaker.price}$ </div>
        `
        container.appendChild(sneakersCtn)
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
        filteredSneakers = sneakers
        loadSneakers()
    }
    filteredSneakers = sneakers.filter(sneaker => sneaker.colors === color)
    if (filteredSneakers.length <= 0) {
        container.innerHTML = "R trouvé mon frère"
        return
    }
    displaySneakers()
}

// tri par prix

const priceBtn = document.querySelector(".price-btn")
priceBtn.addEventListener("click", sortByPrice)

function comparedByPrice(a, b) {
    return a.price - b.price
}

function sortByPrice() {
    filteredSneakers.sort(comparedByPrice)
    displaySneakers()
}

loadSneakers()