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

// Fonction that creates page content
function displayShoes() {
    container.innerHTML = ""
    filteredshoes.forEach(shoe => {
        let shoeCtn = document.createElement("div")
        let shoeInfoCtn = document.createElement("div")
        shoeInfoCtn.classList.add("shoe-item")
        let formattedShoeName = shoe.name.replace(/\s+/g, '')
        shoeInfoCtn.innerHTML = `
            <img class="shoe-img" src="../backend/assets/img/${formattedShoeName}1.png" alt="${shoe.name}"/>
            <div class="shoe-name">${shoe.name}</div>
        `

        shoeCtn.appendChild(shoeInfoCtn)
        shoeCtn.appendChild(displayPrice(shoe))
        container.appendChild(shoeCtn)
    })
    let srcImage = document.querySelectorAll(".shoe-img")
    for (let img of srcImage) {
        img.addEventListener("mouseover", function() {
            let rawPath = img.getAttribute("src")
            let partiallyFormattedShoeName = rawPath.replace('../backend/assets/img/', '')
            let formattedShoeName = partiallyFormattedShoeName.replace('1.png', '')
            UpdateImageIn(img, formattedShoeName)
        })

        img.addEventListener("mouseout", function() {
            let rawPath = img.getAttribute("src")
            let partiallyFormattedShoeName = rawPath.replace('../backend/assets/img/', '')
            let formattedShoeName = partiallyFormattedShoeName.replace('2.png', '')
            UpdateImageOut(img, formattedShoeName)
        })
    }
}

function UpdateImageIn(srcImage, formattedShoeName) {
    srcImage.src = `../backend/assets/img/${formattedShoeName}2.png`
}

function UpdateImageOut(srcImage, formattedShoeName) {
    srcImage.src = `../backend/assets/img/${formattedShoeName}1.png`
}

// Price after reduction
function priceAfterReduc(basePrice, reduc) {
    return basePrice - basePrice*reduc/100
}

function displayPrice(shoe) {
    let priceCtn = document.createElement("div")
    priceCtn.classList.add("price-ctn")
    if (shoe.reduction === 0) {
        priceCtn.innerHTML = `
            <div>${shoe.price} €</div>
        `
    } else {
        priceCtn.innerHTML = `
            <div style="text-decoration: line-through; margin-right:8px">${shoe.price} €</div> <div>${priceAfterReduc(shoe.price, shoe.reduction)} €</div>
        `
    }

    return priceCtn
}

pickers.forEach(picker => {
    picker.addEventListener("click", selectItem)
})

function selectItem(e) {
    let picker = e.target
    let color = e.target.classList[2]
    let genre = e.target.classList[2]
    pickers.forEach((e) => {
        e.classList.remove("selected")
    })
    picker.classList.add("selected")
    filterByColor(color)
    filterByGenre(genre)
}

function filterByColor(color) {
    if (color === "all") {
        filteredshoes = shoes
        loadshoes()
    }
    filteredshoes = shoes.filter(shoes => shoes.colors === color)
    if (filteredshoes.length <= 0) {
        container.innerHTML = "Résultat non trouvé"
        return
    }
    displayShoes()
}

function filterByGenre(genre) {
    if (genres === "all") {
        filteredshoes = shoes
        loadshoes()
    }
    filteredshoes = shoes.filter(shoes => shoes.genre === genres)
    if (filteredshoes.length <= 0) {
        container.innerHTML = "Résultat non trouvé"
        return
    }
    displayShoes()
}

// Sort by price

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
