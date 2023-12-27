const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if(pokemon === null){
                const message = "Le pokémon demandé n'existe pas. Réessayez avec une autre identifiant"
                return res.status(404).json({message})
            } 
            const pokemonDeleted = pokemon
            return Pokemon.destroy({
                where: { id: pokemon.id }
            })
            .then(_ => {
                const message = `Un pokemon avec l'identifiant n°${pokemonDeleted.id} à bien été supprimé.`
                res.json({ message, data: pokemonDeleted })
            })
        })
        .catch(error => {
            const message = "Le pokémon n'a pu être supprimé. Réessayer dans quelque instants."
            res.status(500).json({message, data: error})
        })
    })
}