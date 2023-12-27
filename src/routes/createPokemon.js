const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons/', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemons => {
                const message = `Un pokemon ${req.body.name} a bien été crée`
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = "Le pokemon n'a pas pu être ajouté. Réessayer dans quelque instants"
                res.status(500).json({message, data: error})
            })
    })
}