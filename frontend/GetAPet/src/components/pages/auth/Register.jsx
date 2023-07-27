/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom'
import Input from '../../form/Input'
import styles from './Form.module.css'

function Register() {

    function handleChange(e){}

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="digite o seu telefone"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="digite o seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="digite a sua Senha"
          handleOnChange={handleChange}
        />
         <Input
          text="Confirmacao de Senha"
          type="password"
          name="password"
          placeholder="Confirme a sua Senha"
          handleOnChange={handleChange}
        />

        <input type='submit' value="cadastrar"/>
    </form>
    <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
    </p>
    </section>
  );
}

export default Register;
