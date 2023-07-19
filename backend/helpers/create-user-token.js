const jwt = require('jsonwebtoken')

const createUserToken = async(user,req,res) => {

    //criando token jwt
    const token = jwt.sign({
        name: user.name,
        id: user._id
    },"secret") //aconselhado botar Strings complexas para fortificar o JWT e deixa ele confiavel 

    //return token
    res.status(200).json({
        message: "Voce esta autenticado",
        token: token,
        userId: user._id
    })
}


module.exports = createUserToken