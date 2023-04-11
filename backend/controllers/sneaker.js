const data = require('../data.json')

exports.getSneakers = (req, res) => {
    const id = parseInt(req.params.id)

    const sneakers = data.sneakers

    const sneaker = sneakers.find(s => s.id === id)

    if (!sneaker) {
        res.status(404).send('Sneaker not found')
    }
    res.status(200).json({
        message: "Sneaker found successfully",
        sneaker
    })
}

exports.getSneaker = (req, res) => {
    const id = parseInt(req.params.id)

    const sneakers = data.sneakers

    const sneaker = sneakers.find(s => s.id === id)

    if (!sneaker) {
        res.status(404).send('Sneaker not found')
    }
    res.status(200).json({
        message: "Sneaker found successfully",
        sneaker
    })

}