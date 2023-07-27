import { Link } from "react-router-dom";

import Logo from '../../assets/img/logo.png'

function Navbar() {
  return (
    <nav>
        <div>
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
