const CATEGORIAS = ["Desayuno", "Almuerzo", "Cena", "Postre", "Bebida", "Snack"];
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
// Límites de longitud (deben ser iguales a los del frontend: src/utils/validar.js)
const LIMITES = {
  nombre: { min: 3, max: 60 },
  titulo: { min: 3, max: 80 },
  descripcion: { min: 20, max: 500 },
  email: { max: 100 },
};
 
// Devuelve el texto sin espacios sobrantes; si el valor no es texto, devuelve ""
function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}
 
// Fecha de hoy en formato AAAA-MM-DD usando la hora LOCAL (no la UTC)
function fechaHoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}
 
// Comprueba el formato AAAA-MM-DD y que la fecha exista (rechaza, por ejemplo, 2026-02-30)
function esFechaReal(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const fecha = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(fecha.getTime()) && fecha.toISOString().slice(0, 10) === valor;
}
 
// Valida el cuerpo recibido. Devuelve { errores: [...], datos: {...datos limpios} }
function validarReceta(cuerpo) {
  // Si no llega un objeto JSON (cuerpo vacío, texto, lista...), se trata como objeto vacío
  const origen =
    cuerpo !== null && typeof cuerpo === "object" && !Array.isArray(cuerpo) ? cuerpo : {};
 
  const datos = {
    nombre: texto(origen.nombre),
    email: texto(origen.email),
    titulo: texto(origen.titulo),
    descripcion: texto(origen.descripcion),
    fecha: texto(origen.fecha),
    categoria: texto(origen.categoria),
  };
 
  const errores = [];
  const { nombre, titulo, descripcion } = LIMITES;
 
  if (datos.nombre.length < nombre.min || datos.nombre.length > nombre.max) {
    errores.push(`El nombre es obligatorio y debe tener entre ${nombre.min} y ${nombre.max} caracteres.`);
  }
  if (!REGEX_EMAIL.test(datos.email) || datos.email.length > LIMITES.email.max) {
    errores.push("El email es obligatorio y debe tener un formato válido.");
  }
  if (datos.titulo.length < titulo.min || datos.titulo.length > titulo.max) {
    errores.push(`El título es obligatorio y debe tener entre ${titulo.min} y ${titulo.max} caracteres.`);
  }
  if (datos.descripcion.length < descripcion.min || datos.descripcion.length > descripcion.max) {
    errores.push(
      `La descripción es obligatoria y debe tener entre ${descripcion.min} y ${descripcion.max} caracteres.`
    );
  }
  if (!esFechaReal(datos.fecha)) {
    errores.push("La fecha es obligatoria y debe tener el formato AAAA-MM-DD.");
  } else if (datos.fecha > fechaHoy()) {
    errores.push("La fecha no puede ser futura.");
  }
  if (!CATEGORIAS.includes(datos.categoria)) {
    errores.push(`La categoría debe ser una de: ${CATEGORIAS.join(", ")}.`);
  }
 
  return { errores, datos };
}
 
module.exports = { validarReceta, CATEGORIAS };
