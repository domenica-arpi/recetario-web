import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <div className="vacio">
      <div className="vacio__emoji" aria-hidden="true">🧂</div>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe o fue movida.</p>
      <Link className="boton" to="/">Volver al inicio</Link>
    </div>
  );
}