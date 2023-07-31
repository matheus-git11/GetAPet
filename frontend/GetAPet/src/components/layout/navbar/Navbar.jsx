//modulos
import { Link ,useNavigate} from "react-router-dom";
import { useContext } from "react";
//arquivos estaticos
import Logo from "../../../assets/img/logo.png";
//estilizacao css
import styles from "./Navbar.module.css";
//context
import { Context } from "../../../context/UserContext";

function Navbar() {
  const { authenticated , logout } = useContext(Context);
  const navigate = useNavigate()

  function Logout(){
    logout()
    navigate('/')
  }

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
        {authenticated ? (
          <>
            <li onClick={Logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
