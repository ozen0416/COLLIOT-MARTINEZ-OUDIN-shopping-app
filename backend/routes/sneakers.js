const express = require('express')
const router = express.Router()
const controller = require("../controller/sneaker")

router.get('/sneakers', controller.getSneakers)
router.get('/sneakers/:id', controller.getSneaker)

module.exports = router