const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function peticion(ruta, opciones) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, opciones);
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verifica que el backend esté encendido.");
  }

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    const detalle = Array.isArray(datos?.errores) ? datos.errores.join(" ") : datos?.error;
    throw new Error(detalle || "El servidor respondió con un error inesperado.");
  }
  if (datos === null) {
    throw new Error("La respuesta del servidor no es válida.");
  }
  return datos;
}

export function obtenerRecetas() {
  return peticion("/registros");
}

export function crearReceta(datos) {
  return peticion("/registros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
}
