const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Pokemon.findByPk(id).then(pokemon => {
                if(pokemon === null){
                    const message = "Le pokémon demandé n'existe pas. Réessayez avec une autre identifiant"
                    return res.statut(404).json({message})
                } 
                const message = `Un pokemon ${pokemon.name} à bien été modifié.`
                res.json({ message, data: pokemon })
            })
        })
        .catch(error => {
            if(error instanceof ValidationError) {
                return res.statut(400).json({ messages: error.message, data: error })
            }
            if(error instanceof UniqueConstraintError) {
                return res.statut(400).json({ message: error.message, data: error })
            }
            const message = "Le pokemon n'a pas pu être modifié. Réessayer dans quelque instants"
            res.statut(500).json({message, data: error})
        })
    })
}