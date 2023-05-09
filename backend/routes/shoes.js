const express = require('express')
const router = express.Router()
const controller = require("../controllers/shoes")

router.get('/shoes', controller.getShoe)
router.get('/shoes/:id', controller.getShoes)

module.exports = router