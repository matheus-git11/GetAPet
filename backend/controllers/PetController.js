//models
const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

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
}