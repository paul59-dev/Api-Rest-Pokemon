const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
            .then(pokemons => {
                const message = `La liste des pokémons da bien été récupérée.`
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = "La liste des pokémoons n'a pas pu être récupéré. Réessayer dans quelque instants."
                res.status(500).json({ message, data: error })
            })
    })
}
