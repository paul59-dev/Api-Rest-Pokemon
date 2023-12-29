const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require("./src/db/sequelize")

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDB()

// Terminaison points
require('./src/routes/findAllPokemon')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// Add error manager 404
app.use(({res}) => {
    const message = "Impossible de trouver le ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(401).json({message})
})

app.listen(port, () => console.log(`Notre app Nodejs est démaré sur:  http://localhost:${port}`))