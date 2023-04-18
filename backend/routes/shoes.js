const express = require('express')
const router = express.Router()
const controller = require("../controllers/shoes")

router.get('/shoes', controller.getShoes)
router.get('/shoes/:id', controller.getShoes)

module.exports = router