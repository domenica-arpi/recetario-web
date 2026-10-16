import { emojiDe } from "../utils/categorias";
import { formatearFecha, iniciales } from "../utils/formato";

export default function TarjetaReceta({ receta }) {
  const { titulo, categoria, descripcion, nombre, email, fecha } = receta;

  return (
    <article className="tarjeta" data-cat={categoria}>
      <div className="tarjeta__cabecera">
        <span className="chip">
          <span aria-hidden="true">{emojiDe(categoria)}</span> {categoria}
        </span>
        <time className="tarjeta__fecha" dateTime={fecha}>{formatearFecha(fecha)}</time>
      </div>

      <h3 className="tarjeta__titulo">{titulo}</h3>
      <p className="tarjeta__descripcion">{descripcion}</p>

      <footer className="tarjeta__autor">
        <span className="avatar" aria-hidden="true">{iniciales(nombre)}</span>
        <div className="tarjeta__datos">
          <strong>{nombre}</strong>
          <span>{email}</span>
        </div>
      </footer>
    </article>
  );
}