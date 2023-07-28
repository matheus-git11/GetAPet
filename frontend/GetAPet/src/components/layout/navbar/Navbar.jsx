//modulos
import { Link } from "react-router-dom";
//arquivos estaticos
import Logo from '../../../assets/img/logo.png'
//estilizacao css
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <img src={Logo} alt="Logo do Get a Pet" />
            <h2>Get A Pet</h2>
        </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        <li>
          <Link to="/login">Entrar</Link>
        </li>
        <li>
          <Link to="/register">Cadastar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
