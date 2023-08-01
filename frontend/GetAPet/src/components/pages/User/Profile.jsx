import { useState,useEffect } from 'react'
import api from '../../../utils/api'
import Input from '../../form/Input'
import formStyles from '../Auth/Form.module.css'
import styles from './Profile.module.css'


function Profile (){
    const [user,setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() =>{
        api.get('/users/checkuser',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) =>{
            setUser(response.data)
        })
    },[token])

    function onFileChange(e){}
    function handleChange(e){}

    return(
        <section>
            <div className={styles.profile_header}>
            <h1>Perfil</h1>
            <p>Preview Imagem</p>
            </div>
            <form className={formStyles.form_container}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu e-nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu Telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confime a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value='editar'/>
            </form>
        </section>
    )
}

export default Profile