const data = require("../data.json");

exports.getShoe = (req, res) => {
    const shoes = data.shoes
    if (!shoes) {
        res.status(404).send('Not found')
    }
    res.json(shoes)
}

exports.getShoes = (req, res) => {
    const id = parseInt(req.params.id)
    const shoes = data.shoes
    const shoe = shoes.find(s => s.id === id)
    if (!shoe) {
        res.status(404).send('Not found')
    }

    res.status(200).json({
        message: "Chaussure trouvée",
        shoe
    })
}