const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

//middleware para validar o token
const checkToken = (req,res,next) => {
    
    if(!req.headers.authorization){
        return res.status(401).json({message : 'Acesso Negado 1!'})
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({message : 'Acesso Negado 2!'})
    }

    try {
        const verified = jwt.verify(token,'secret')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({message : 'Token Invalido!'})
    }


}

module.exports = checkToken