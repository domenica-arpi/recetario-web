import { Link, NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <header className="menu">
      <div className="menu__interior">
        <Link to="/" className="menu__marca">
          <span className="menu__logo" aria-hidden="true">🍲</span>
          <span>Recetario</span>
        </Link>
        <nav className="menu__enlaces" aria-label="Principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/registro">Registrar receta</NavLink>
          <NavLink to="/lista">Ver recetas</NavLink>
        </nav>
      </div>
    </header>
  );
}