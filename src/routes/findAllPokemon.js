const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if(req.query.name) {
            // The query params are string, if we have a number he make a parseInt()
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            // Test the length for the search 
            if(name.length < 2) {
                const message = "Le therme de recherche dois contenir au moin 2 caracteres."
                return res.status(400).json({ message })
            }

            return Pokemon.findAndCountAll({  // other => findAll() -> search all pokemons
                where: {
                    name: { // name est la propriété du modèle pokemon
                        [Op.like]: `%${name}%` // 'name' est le critaire de la recherche
                    }
                },
                order: ['name'],
                limit: limit // limit for 5 pokemon to see to default else it's the user number for limit
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
                res.json({ message, data: rows })
            })
        } else {
            Pokemon.findAll({ order: ['name'] })
            .then(pokemons => {
                const message = `La liste des pokémons da bien été récupérée.`
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = "La liste des pokémoons n'a pas pu être récupéré. Réessayer dans quelque instants."
                res.status(500).json({ message, data: error })
            })
        }
    })
}
