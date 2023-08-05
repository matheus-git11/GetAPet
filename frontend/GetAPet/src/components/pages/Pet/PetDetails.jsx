import { useEffect, useState } from 'react'
import { useParams , Link} from 'react-router-dom'
import api from '../../../utils/api'
import styles from './PetDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails(){
    return(
        <h1>Pagina de Pet</h1>
    )
}

export default PetDetails