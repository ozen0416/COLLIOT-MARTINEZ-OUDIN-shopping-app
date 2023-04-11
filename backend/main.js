const express = require('express')

const app = express()

const cors = require('cors')

app.use(cors( {
    origin : '*'
}))

const sneakerRoutes = require('./routes/sneakers')

app.use(sneakerRoutes)

const port = 3000

app.listen(port, () => console.log(`listening on port ${port}`))