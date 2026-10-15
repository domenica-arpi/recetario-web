import { Link } from "react-router-dom";
import { CATEGORIAS } from "../utils/categorias";

const PASOS = [
  { n: 1, titulo: "Escribe tu receta", texto: "Completa el formulario con tu nombre, el título, la descripción y la categoría." },
  { n: 2, titulo: "Publícala", texto: "Se guarda en el servidor y queda disponible al instante para todos." },
  { n: 3, titulo: "Descubre más", texto: "Explora las recetas publicadas y filtra por tipo de comida." },
];

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <p className="hero__etiqueta">🍽️ Recetas de la comunidad</p>
        <h1>Cocina, comparte y descubre nuevas recetas</h1>
        <p className="hero__texto">
          Aquí puedes publicar tus platos favoritos y consultar lo que otras personas están cocinando.
        </p>
        <div className="hero__acciones">
          <Link className="boton" to="/registro">Registrar una receta</Link>
          <Link className="boton boton--claro" to="/lista">Ver todas las recetas</Link>
        </div>
        <div className="hero__chips" aria-hidden="true">
          {CATEGORIAS.map((c) => (
            <span key={c.nombre} className="chip" data-cat={c.nombre}>
              {c.emoji} {c.nombre}
            </span>
          ))}
        </div>
      </section>

      <section className="pasos" aria-label="Cómo funciona">
        {PASOS.map((p) => (
          <article key={p.n} className="paso">
            <span className="paso__numero">{p.n}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </article>
        ))}
      </section>
    </>
  );
}