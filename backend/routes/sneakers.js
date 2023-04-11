const express = require('express')

const router = express.Router()

const controller = require('../controllers/sneaker')

router.get('/sneakers', controller.getSneakers)
router.get('/sneaker/:id', controller.getSneaker)

module.exports = router