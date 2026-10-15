import { NOMBRES_CATEGORIAS } from "./categorias";

export const LIMITES = {
  nombre: { min: 3, max: 60 },
  titulo: { min: 3, max: 80 },
  descripcion: { min: 20, max: 500 },
  email: { max: 100 },
};

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function fechaHoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function validarFormulario(valores) {
  const errores = {};
  const nombre = valores.nombre.trim();
  const email = valores.email.trim();
  const titulo = valores.titulo.trim();
  const descripcion = valores.descripcion.trim();

  if (!nombre) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nombre.length < LIMITES.nombre.min || nombre.length > LIMITES.nombre.max) {
    errores.nombre = `El nombre debe tener entre ${LIMITES.nombre.min} y ${LIMITES.nombre.max} caracteres.`;
  }

  if (!email) {
    errores.email = "El email es obligatorio.";
  } else if (!REGEX_EMAIL.test(email) || email.length > LIMITES.email.max) {
    errores.email = "Escribe un email válido, por ejemplo nombre@correo.com.";
  }

  if (!titulo) {
    errores.titulo = "El título es obligatorio.";
  } else if (titulo.length < LIMITES.titulo.min || titulo.length > LIMITES.titulo.max) {
    errores.titulo = `El título debe tener entre ${LIMITES.titulo.min} y ${LIMITES.titulo.max} caracteres.`;
  }

  if (!descripcion) {
    errores.descripcion = "La descripción es obligatoria.";
  } else if (descripcion.length < LIMITES.descripcion.min) {
    errores.descripcion = `La descripción debe tener al menos ${LIMITES.descripcion.min} caracteres.`;
  } else if (descripcion.length > LIMITES.descripcion.max) {
    errores.descripcion = `La descripción no puede superar los ${LIMITES.descripcion.max} caracteres.`;
  }

  if (!valores.fecha) {
    errores.fecha = "La fecha es obligatoria.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(valores.fecha)) {
    errores.fecha = "La fecha no es válida.";
  } else if (valores.fecha > fechaHoy()) {
    errores.fecha = "La fecha no puede ser futura.";
  }

  if (!valores.categoria) {
    errores.categoria = "Selecciona una categoría.";
  } else if (!NOMBRES_CATEGORIAS.includes(valores.categoria)) {
    errores.categoria = "La categoría no es válida.";
  }

  return errores;
}