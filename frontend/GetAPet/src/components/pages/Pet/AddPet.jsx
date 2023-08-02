import { useState } from 'react'
import api from '../../../utils/api'
import styles from './AddPet.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from './PetForm'

function AddPet() {
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficara disponivel para adocao</p>
      </div>
      <PetForm btnText="Cadastrar Pet"/>
    </section>
  )
}
export default AddPet
