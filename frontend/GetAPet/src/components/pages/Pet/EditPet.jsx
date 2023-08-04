import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './AddPet.module.css'
import PetForm from './PetForm'

function EditPet(){
    const [pet,setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(()=>{
        api.get(`/pets/${id}`,{
            Authorization: `bearer ${JSON.parse(token)}`
        }).then((response)=>{
            setPet(response.data.pet)
        })
    },[token,id])

    async function updatePet(pet){
        
    }

    return(
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet : {pet.name}</h1>
                <p>Depois da edicao os dados serao atualizados no sistema</p>
            </div>
            {pet.name && (
                <PetForm handleSubmit={updatePet} btnText="atualizar" petData={pet}/>
            )}
        </section>
    )
}

export default EditPet