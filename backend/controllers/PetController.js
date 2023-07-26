//models
const Pet = require("../models/Pet");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async create(req, res) {
    const { name, age, weight, color } = req.body;
    const images = req.files;
    const available = true;

    //upload de imagens

    console.log(name);

    //validacao
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatorio" });
    }
    if (!age) {
      return res.status(422).json({ message: "A idade é obrigatoria" });
    }
    if (!weight) {
      return res.status(422).json({ message: "O peso é obrigatorio" });
    }
    if (!color) {
      return res.status(422).json({ message: "A cor é obrigatoria" });
    }
    if (images.legnth === 0) {
      return res.status(422).json({ message: "A Imagem é obrigatoria" });
    }

    //resgatando o dono do pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    //criando o pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet Cadastrado com sucesso",
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt"); // usamos o - para ordenarmos em ordem crescente
    return res.status(200).json({
      pets,
    });
  }

  static async getAllUserPets(req, res) {
    //resgatando o usuario pelo token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createAt");

    return res.status(200).json({
      pets,
    });
  }

  static async getAllUserAdoptions(req, res) {
    //resgatando o usuario pelo token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createAt");

    return res.status(200).json({
      pets,
    });
  }

  static async getPetById(req, res) {
    //resgatando o id paassado pelo parametro da requisicao
    const id = req.params.id;
    //verificando se o Id passaado se encaixa no modelo do ObjectID do MongoDB
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "Id Invalido" });
    }
    //resgatando nosso pet atraves de uma acao assincrona no banco de dados
    const pet = await Pet.findOne({ _id: id });
    //tratamento de erro para se a busca no banco de dados for null
    if (!pet) {
      res.status(404).json({ message: "Pet nao encontrado" });
    }
    //retornando status de sucesso e objeto pet no corpo de response
    res.status(200).json({ pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "Id Invalido" });
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ message: "Pet nao encontrado" });
    }

    //checando se o usuario logado registrou o Pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ meesage: "Houve um problema em processar a sua solicitacao" });
    }

    await Pet.findByIdAndRemove(id);

    return res.status(200).json({ message: "Pet removido com sucesso" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "Id Invalido" });
    }

    const { name, age, weight, color, available } = req.body;
  

    const images = req.files;

    const updatedData = {};

    const pet = await Pet.findOne({ _id: id });

    //checando se o pet existe
    if (!pet) {
      return res.status(404).json({ message: "Pet Nao Encontrado!" });
    }

    //checando se o pet pertence ao usuario do token
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({
        message: "Houve um problema em processar a solicitacao",
      });
    }

    //validacao
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatorio" });
    } else {
        updatedData.name = name
    }

    if (!age) {
      return res.status(422).json({ message: "A idade é obrigatoria" });
    } else {
        updatedData.age = age
    }

    if (!weight) {
      return res.status(422).json({ message: "O peso é obrigatorio" });
    } else {
        updatedData.weight = weight
    }

    if (!color) {
      return res.status(422).json({ message: "A cor é obrigatoria" });
    } else {
        updatedData.color = color
    }

    //tratando imagens
    if (images.length === 0) {
      return res.status(422).json({ message: "A Imagem é obrigatoria" });
    } else {
        updatedData.images = []
        images.map((image) =>{
            updatedData.images.push(image.filename)
        })
    }

    //atualizando o Pet
    await Pet.findByIdAndUpdate(id,updatedData)
    return res.status(200).json({message: 'Pet atualizado com sucesso'})
  }

  static async schedule(req,res){

    const id = req.params.id
    //checando se o Id é objectId
    if(!ObjectId.isValid(id)){
        return res.status(422).json({ message: "Id Invalido" });
    }

    //checando se o pet existe
    const pet = await Pet.findOne({_id : id})

    if(!pet){
       return res.status(404).json({message : 'Pet nao encontrado'})
    }

    //checando se o usario registrou o pet 
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.equals(user._id)){
       return res.status(422).json({
            message : 'Voce nao pode agendar uma visitar com seu proprio Pet'
        })
    }

    //checando se ele ja marcou uma visita com esse pet
    if(pet.adopter){
        if(pet.adopter._id.equals(user._id)){
           return res.status(422).json({
                message : 'Voce ja agendou uma visita para esse Pet'
            })
        }
    }

    pet.adopter = {
        _id: user._id,
        name: user.name,
        image: user.image
    }

    await Pet.findByIdAndUpdate(id,pet)

    return res.status(200).json({
        message: `a Visita foi agendada com sucesso , entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone} `
    })

  }

  static async concludeAdoption(req,res){

    const id = req.params.id
    //checando se o Id é objectId
    if(!ObjectId.isValid(id)){
        return res.status(422).json({ message: "Id Invalido" });
    }

    //checando se o pet existe
    const pet = await Pet.findOne({_id : id})

    if(!pet){
       return res.status(404).json({message : 'Pet nao encontrado'})
    }

    //checando se o o usuario é dono do pet
    const token = getToken(req)
    const user = await getUserByToken(token)
    if(!pet.user._id.equals(user._id)){
      return res.status(422).json({
           message : 'Voce nao pode confirmar a adocao de um Pet que nao é seu'
       })
   }

   pet.available = false
   await Pet.findByIdAndUpdate(id,pet)

   res.status(200).json({
    message: 'Parabens seu Pet foi adotado'
   })


  }
};
