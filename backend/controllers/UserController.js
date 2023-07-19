const User = require("../models/User");

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
    }
  }
};
