const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Pokemon.findByPk(id).then(pokemon => {
                if(pokemon === null){
                    const message = "Le pokémon demandé n'existe pas. Réessayez avec une autre identifiant"
                    return res.status(404).json({message})
                } 
                const message = `Un pokemon ${pokemon.name} à bien été modifié.`
                res.json({ message, data: pokemon })
            })
        })
        .catch(error => {
            const message = "Le pokemon n'a pas pu être modifié. Réessayer dans quelque instants"
            res.status(500).json({message, data: error})
        })
    })
}