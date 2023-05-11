const url = "http://localhost:3000"

const btn = document.querySelector('.btn')
const container = document.querySelector(".shoes-ctn")
const pickers = document.querySelectorAll(".picker")
const sexe = document.querySelectorAll(".picker2")
const disponibility = document.querySelectorAll(".picker3")


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
        if (shoe.available === "true") {
            shoeInfoCtn.innerHTML = `
            <img class="shoe-img ${shoe.id}" src="../backend/assets/img/${formattedShoeName}1.png" alt="${shoe.name}"/>
            <div class="shoe-name">${shoe.name}</div>
            <button class="${shoe.id} add-btn">Add to card</button>
        `
        }
        if (shoe.available === "false") {
            shoeInfoCtn.innerHTML = `
            <img class="shoe-img ${shoe.id}" src="../backend/assets/img/${formattedShoeName}1.png" alt="${shoe.name}"/>
            <div class="shoe-name">${shoe.name}</div>
        `
        }
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
    
    let addToCardBtnList = document.querySelectorAll(".add-btn")
    for (let btn of addToCardBtnList) {
        btn.addEventListener("click", function (ev) {
            let shoe
            console.log(ev.target.classList[0])
            fetch(`${url}/shoes/${ev.target.classList[0]}`)
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    shoe = data["shoe"]
                    if (localStorage.getItem(shoe.id) === null) {
                        let shoeInfo = {
                            "quantity": 1,
                            "price": shoe.price
                        }
                        localStorage.setItem(shoe.id, JSON.stringify(shoeInfo))
                    } else {
                        changeQuant(shoe.id, 1)
                    }

                })
        })

    }
}

<<<<<<< HEAD
function changeQuant(id, value) {
    let shoeJson = JSON.parse(localStorage.getItem(id))
    shoeJson["quantity"] = shoeJson["quantity"] + value
    console.log(shoeJson["quantity"])
    localStorage.setItem(id, JSON.stringify(shoeJson))
}

=======
>>>>>>> 96db0be93f9c0baf8bce615f51b9becc22fd35a1
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
    picker.addEventListener("click", selectColor)
})

sexe.forEach(picker => {
    picker.addEventListener("click", selectGenre)
})

disponibility.forEach(picker => {
    picker.addEventListener("click", selectDispo)
})


function selectColor(e) {
    let picker = e.target
    let color = e.target.classList[2]
    pickers.forEach((e) => {
        e.classList.remove("selected")
    })
    picker.classList.add("selected")
    filterByColor(color)

}

function selectGenre(e) {
    let picker = e.target
    let genre = e.target.classList[2]
    sexe.forEach((e) => {
        e.classList.remove("selected")
    })
    picker.classList.add("selected")
    filterByGenre(genre)
}

function selectDispo(e) {
    let picker = e.target
    let dispo = e.target.classList[2]
    disponibility.forEach((e) => {
        e.classList.remove("selected")
    })
    picker.classList.add("selected")
    filterByDispo(dispo)
}

function filterByColor(color) {
    if (color === "all") {
        filteredshoes = shoes
        loadshoes()
    }
    filteredshoes = shoes.filter(shoe => shoe.colors === color)
    if (filteredshoes.length <= 0) {
        container.innerHTML = "Résultat non trouvé"
        return
    }
    displayShoes()
}

function filterByGenre(genre) {
    filteredshoes = shoes.filter(shoe => shoe.genre === genre)
    if (filteredshoes.length <= 0 ) {
        container.innerHTML = "Résultat non trouvé"
        return
    }
    displayShoes()
}

function filterByDispo(dispo) {
    filteredshoes = shoes.filter(shoe => shoe.available === dispo)
    if (filteredshoes.length <= 0 ) {
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