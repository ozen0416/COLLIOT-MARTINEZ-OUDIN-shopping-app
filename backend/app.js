const express = require('express')

const app = express();
const port = 3000;

const cors = require('cors')

app.use(cors({
    origin: '*'
}))

const shoesRoute = require('./routes/shoes')

app.use(shoesRoute)

app.listen(port, () => console.log(`listening on port ${port}`))