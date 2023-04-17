const express = require('express')

const app = express();
const port = 3000;

const cors = require('cors')

app.use(cors({
    origin: '*'
}))

const sneakersRoute = require('./routes/sneakers')

app.use(sneakersRoute)

app.listen(port, () => console.log(`listening on port ${port}`))