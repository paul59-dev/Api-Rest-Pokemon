const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemons => {
                if(pokemon === null){
                    const message = "Le pokémon demandé n'existe pas. Réessayez avec une autre identifiant"
                    return res.status(404).json({message})
                } 
                const message = `Un pokemon à bien été trouvé.`
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = "Le pokemon n'a pas pu être récupéré. Réessayer dans quelque instants"
                res.status(500).json({message, data: error})
            })
    })
}