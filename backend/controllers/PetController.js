//models
const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController{

    static async create(req,res){

        const{name,age,weight,color} = req.body
        const images = req.files
        const available = true

        //upload de imagens

        console.log(name)

        //validacao
        if(!name){
            return res.status(422).json({message : "O nome é obrigatorio"})
        }
        if(!age){
            return res.status(422).json({message : "A idade é obrigatoria"})
        }
        if(!weight){
            return res.status(422).json({message : "O peso é obrigatorio"})
        }
        if(!color){
            return res.status(422).json({message: "A cor é obrigatoria"})
        }
        if(images.legnth === 0){
            return res.status(422).json({message: "A Imagem é obrigatoria"})
        }

        //resgatando o dono do pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        //criando o pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images:[],
            user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        })

        images.map((image) =>{
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet Cadastrado com sucesso',
                newPet
            })
                 
        } catch (error) {
            res.status(500).json({message :error})
        }
    }

    static async getAll(req,res){

        const pets = await Pet.find().sort('-createdAt') // usamos o - para ordenarmos em ordem crescente 
        return res.status(200).json({
            pets
        })
    }
    
    static async getAllUserPets(req,res){
        //resgatando o usuario pelo token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createAt')

        return res.status(200).json({
            pets,
        })
    }

    static async getAllUserAdoptions(req,res){
         //resgatando o usuario pelo token
         const token = getToken(req)
         const user = await getUserByToken(token)
 
         const pets = await Pet.find({'adopter._id': user._id}).sort('-createAt')
 
         return res.status(200).json({
             pets,
         })
    }

    static async getPetById(req,res){
        //resgatando o id paassado pelo parametro da requisicao
        const id = req.params.id
        //verificando se o Id passaado se encaixa no modelo do ObjectID do MongoDB
        if(!ObjectId.isValid(id)){
            return res.status(422).json({message : 'Id Invalido'})
        }   
        //resgatando nosso pet atraves de uma acao assincrona no banco de dados
        const pet = await Pet.findOne({_id: id})
        //tratamento de erro para se a busca no banco de dados for null 
        if(!pet){
            res.status(404).json({message : 'Pet nao encontrado'})
        }
        //retornando status de sucesso e objeto pet no corpo de response
        res.status(200).json({pet})

    }

    static async removePetById(req,res){

        const id = req.params.id

        if(!ObjectId.isValid(id)){
            return res.status(422).json({message : 'Id Invalido'})
        }

        const pet = await Pet.findOne({_id: id})
       
        if(!pet){
            res.status(404).json({message : 'Pet nao encontrado'})
        }

        //checando se o usuario logado registrou o Pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({meesage: 'Houve um problema em processar a sua solicitacao'})
        }

        await Pet.findByIdAndRemove(id)

        return res.status(200).json({message: 'Pet removido com sucesso'})
    }
}