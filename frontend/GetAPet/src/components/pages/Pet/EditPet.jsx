import { useEffect, useState } from 'react'
import api from '../../../utils/api'
import styles from './AddPet.module.css'
import PetForm from './PetForm'
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet(){
    return(
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet : 'pet.name'</h1>
                <p>Depois da edicao os dados serao atualizados no sistema</p>
            </div>
        </section>
    )
}

export default EditPet