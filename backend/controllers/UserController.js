//models
const User = require("../models/User");

//dependencias
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    //desestruturando todos os dados que vieram do body
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: "O campo nome é obrigatorio" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O campo email é obrigatorio" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O campo Phone é obrigatorio" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "O campo password é obrigatorio" });
      return;
    }
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "O campo confirmpassword é obrigatorio" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmacao de senha precisam ser iguais",
      });
      return;
    }

    //check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message:
          "O usario ja esta cadastrado em nosso sistema , utilize outro e-mail!",
      });
      return;
    }

    //create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
      return;
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O campo email é obrigatorio" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatoria" });
      return;
    }

    //check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({
        message: "Nao ha usuario cadastrado com este e-mail",
      });
      return;
    }

    //check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({
        message: "Senha invalida!",
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req); //resgatando o token
      const decoded = jwt.verify(token, "secret"); //decodificando o token informando nossa palavra chave

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id passado é invalido" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({
        message: "Usuario nao encontrado",
      });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {

    const id = req.params.id; //req params sao o que pegamos da URL

    //checamos se a informacao id passada realmente se encaixa no padrao do ObjectId do nosso MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id passado é invalido" });
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const { name, email, phone, password, confirmpassword } = req.body; //req body sao o que pegamos do corpo da requisicao
    let image = "";

    //validacoes
    if (!name) {
      res.status(422).json({ message: "O campo nome é obrigatorio" });
      return;
    }
    user.name = name;
    if (!email) {
      res.status(422).json({ message: "O campo email é obrigatorio" });
      return;
    }

    //checando se o email esta sendo usado por outra pessoa
    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({
        message: "Este email ja esta sendo usado!",
      });
    }
    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "O campo Telefone é obrigatorio" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "O campo password é obrigatorio" });
      return;
    }
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "O campo confirmpassword é obrigatorio" });
      return;
    }
  }
};
