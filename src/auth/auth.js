const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) {
        const message = `Vous n'avez pas founot d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
        return res.status(401).json({ message })
    }

    const token = authorizationHeader.split(' ')[1] // retirer bearer de l'entete
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = `L'utilisateur n'est pas authorisé à accèder à cette ressources.`
            return res.status(401).json({ message, data: error })
        }

        const userId = decodedToken .userId
        if(req.body.userId && req.body.userId !== userId) {
            const message = `L'identification de l'utilisateur est invalide`
            res.status(401).json({ message })
        } else {
            next()
        }
    })
}