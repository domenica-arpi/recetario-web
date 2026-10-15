import { useState } from "react";
import { CATEGORIAS } from "../utils/categorias";
import { LIMITES, fechaHoy, validarFormulario } from "../utils/validar";
import Campo from "./Campo";

function formularioVacio() {
  return { nombre: "", email: "", titulo: "", descripcion: "", fecha: fechaHoy(), categoria: "" };
}

export default function FormularioReceta() {
  const [datos, setDatos] = useState(formularioVacio);
  const [errores, setErrores] = useState({});

  const hoy = fechaHoy();

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((anteriores) => ({ ...anteriores, [name]: value }));
    // Al corregir un campo se limpia su mensaje de error
    if (errores[name]) {
      setErrores((anteriores) => ({ ...anteriores, [name]: undefined }));
    }
  }

  // Atributos comunes de cada control (estado, accesibilidad)
  function propsDe(nombre) {
    return {
      id: nombre,
      name: nombre,
      value: datos[nombre],
      onChange: manejarCambio,
      "aria-invalid": errores[nombre] ? "true" : undefined,
      "aria-describedby": errores[nombre] ? `${nombre}-error` : undefined,
    };
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const nuevos = validarFormulario(datos);
    setErrores(nuevos);
    const campos = Object.keys(nuevos);
    if (campos.length > 0) {
      // No se envían datos inválidos: se enfoca el primer campo con error
      document.getElementById(campos[0])?.focus();
      return;
    }

    // Por ahora solo mostramos los datos válidos; en el paso 3.9 se envían a la API
    console.log("Datos válidos:", datos);
  }

  const largo = datos.descripcion.trim().length;

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <div className="formulario__rejilla">
        <Campo id="nombre" etiqueta="Nombre del autor" error={errores.nombre}>
          <input {...propsDe("nombre")} autoComplete="name" placeholder="Ej.: María Pérez" />
        </Campo>
        <Campo id="email" etiqueta="Correo electrónico" error={errores.email}>
          <input {...propsDe("email")} type="email" autoComplete="email" placeholder="nombre@correo.com" />
        </Campo>
      </div>

      <div className="formulario__rejilla">
        <Campo id="titulo" etiqueta="Título de la receta" error={errores.titulo}>
          <input {...propsDe("titulo")} placeholder="Ej.: Encebollado ecuatoriano" />
        </Campo>
        <Campo id="fecha" etiqueta="Fecha de publicación" error={errores.fecha}>
          <input {...propsDe("fecha")} type="date" max={hoy} />
        </Campo>
      </div>

      <Campo
        id="descripcion"
        etiqueta="Descripción (ingredientes y preparación)"
        error={errores.descripcion}
        contador={`${largo}/${LIMITES.descripcion.max}`}
      >
        <textarea
          {...propsDe("descripcion")}
          rows="5"
          placeholder="Cuenta qué ingredientes lleva y cómo se prepara…"
        />
      </Campo>

      <fieldset
        id="categoria"
        tabIndex={-1}
        className={`campo${errores.categoria ? " campo--error" : ""}`}
      >
        <legend>Categoría de comida</legend>
        <div className="chips">
          {CATEGORIAS.map((c) => (
            <label key={c.nombre} className="chip-opcion" data-cat={c.nombre}>
              <input
                type="radio"
                name="categoria"
                value={c.nombre}
                checked={datos.categoria === c.nombre}
                onChange={manejarCambio}
              />
              <span>
                <span aria-hidden="true">{c.emoji}</span> {c.nombre}
              </span>
            </label>
          ))}
        </div>
        {errores.categoria && <p className="campo__error">{errores.categoria}</p>}
      </fieldset>

      <button className="boton" type="submit">Publicar receta</button>
    </form>
  );
}