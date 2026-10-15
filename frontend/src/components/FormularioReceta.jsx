import { useState } from "react";
import { CATEGORIAS } from "../utils/categorias";

function formularioVacio() {
  return { nombre: "", email: "", titulo: "", descripcion: "", fecha: "", categoria: "" };
}

export default function FormularioReceta() {
  const [datos, setDatos] = useState(formularioVacio);

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((anteriores) => ({ ...anteriores, [name]: value }));
  }

  function manejarEnvio(e) {
    e.preventDefault();
    console.log("Datos del formulario:", datos);
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <label htmlFor="nombre">Nombre del autor</label>
      <input id="nombre" name="nombre" value={datos.nombre} onChange={manejarCambio} />

      <label htmlFor="email">Correo electrónico</label>
      <input id="email" name="email" type="email" value={datos.email} onChange={manejarCambio} />

      <label htmlFor="titulo">Título de la receta</label>
      <input id="titulo" name="titulo" value={datos.titulo} onChange={manejarCambio} />

      <label htmlFor="fecha">Fecha de publicación</label>
      <input id="fecha" name="fecha" type="date" value={datos.fecha} onChange={manejarCambio} />

      <label htmlFor="descripcion">Descripción (ingredientes y preparación)</label>
      <textarea id="descripcion" name="descripcion" rows="5" value={datos.descripcion} onChange={manejarCambio} />

      <fieldset id="categoria">
        <legend>Categoría de comida</legend>
        {CATEGORIAS.map((c) => (
          <label key={c.nombre}>
            <input
              type="radio"
              name="categoria"
              value={c.nombre}
              checked={datos.categoria === c.nombre}
              onChange={manejarCambio}
            />
            {c.emoji} {c.nombre}
          </label>
        ))}
      </fieldset>

      <button type="submit">Publicar receta</button>
    </form>
  );
}