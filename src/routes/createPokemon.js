const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons/', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemons => {
                const message = `Un pokemon ${req.body.name} a bien été crée`
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                if(error instanceof ValidationError) {
                    return res.statut(400).json({ messages: error.message, data: error })
                }
                if(error instanceof UniqueConstraintError) {
                    return res.statut(400).json({ message: error.message, data: error })
                }
                const message = "Le pokemon n'a pas pu être ajouté. Réessayer dans quelque instants"
                res.statut(500).json({message, data: error})
            })
    })
}