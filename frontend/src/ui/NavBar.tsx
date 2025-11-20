import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/carros">Carros</Link>
      <Link to="/viajes">Viajes</Link>
      <Link to="/buscar-carro">Buscar por placa</Link>

      {!isAuthenticated && <Link to="/login">Login</Link>}

      {isAuthenticated && (
        <button className="logoutbtn" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};
