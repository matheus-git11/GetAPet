import { useState, useContext } from "react"
import Input from "../../form/Input"
import Styles from './Form.module.css'
import { Context } from "../../../context/UserContext"
import { Link } from "react-router-dom"

function Login(){
    function handleChange(e){}

    return(
        <section className={Styles.form_container}>
            <h1>Login</h1>
            <form >
                <Input 
                text='Email'
                type="email"
                name="email"
                placeholder="digite seu e-mail"
                handleOnChange={handleChange}
                />
                <Input 
                text='Senha'
                type="password"
                name="password"
                placeholder="digite seu e-mail"
                handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar"/>
            </form>

            <p>
                Nao tem conta? <Link to="/register">Clique Aqui.</Link>
            </p>
        </section>
    )
}

export default Login