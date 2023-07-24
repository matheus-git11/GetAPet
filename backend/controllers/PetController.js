//models
const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController{

    static async create(req,res){

        const{name,age,weight,color} = req.body
        const available = true

        //upload de imagens

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
}