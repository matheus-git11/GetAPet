const User = require("../models/User");
const bcrypt = require('bcrypt')

module.exports = class UserController {

  static async register(req, res) {
    //desestruturando todos os dados que vieram do body
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: "O campo nome é obrigatorio" });
      return
    }
    if (!email) {
      res.status(422).json({ message: "O campo email é obrigatorio" });
      return
    }
    if (!phone) {
      res.status(422).json({ message: "O campo Phone é obrigatorio" });
      return
    }
    if (!password) {
      res.status(422).json({ message: "O campo password é obrigatorio" });
      return
    }
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "O campo confirmpassword é obrigatorio" });
        return
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmacao de senha precisam ser iguais",
      });
      return
    }

    //check if user exists
    const userExists = await User.findOne({email: email})

    if(userExists){
        res
        .status(422)
        .json({
            message: 'O usario ja esta cadastrado em nosso sistema , utilize outro e-mail!'
        })
        return
    }

    //create a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    //create a user
    const user = new User({
        name,
        email,
        phone,
        password: passwordHash
    })

    try {
        const newUser = await user.save()
        res
        .status(201)
        .json({
            message: 'Usuario Criado!',
            newUser
        })
        return
    } catch (error) {
        res.status(500).json({message: error})
        return
    }
  }
};
