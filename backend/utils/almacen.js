const fs = require("fs");
const path = require("path");
 
// Archivo donde se guardan las recetas (se puede cambiar con la variable RECETAS_ARCHIVO)
const ARCHIVO = process.env.RECETAS_ARCHIVO
  ? path.resolve(process.env.RECETAS_ARCHIVO)
  : path.join(__dirname, "..", "data", "recetas.json");
 
// Crea la carpeta y el archivo con una lista vacía si todavía no existen
function inicializarArchivo() {
  fs.mkdirSync(path.dirname(ARCHIVO), { recursive: true });
  if (!fs.existsSync(ARCHIVO)) {
    fs.writeFileSync(ARCHIVO, "[]", "utf-8");
  }
}
 
// Devuelve la lista de recetas guardadas
function leerRecetas() {
  // Se quita el BOM que algunos editores de Windows agregan al inicio del archivo
  const contenido = fs.readFileSync(ARCHIVO, "utf-8").replace(/^/, "");
  if (contenido.trim() === "") return [];
  const datos = JSON.parse(contenido);
  if (!Array.isArray(datos)) {
    throw new Error("El archivo JSON no contiene una lista.");
  }
  return datos;
}
 
// Agrega una receta nueva sin perder las anteriores: lee, agrega y vuelve a escribir
function guardarReceta(nueva) {
  const recetas = leerRecetas();
  recetas.push(nueva);
  fs.writeFileSync(ARCHIVO, JSON.stringify(recetas, null, 2), "utf-8");
  return nueva;
}
 
module.exports = { inicializarArchivo, leerRecetas, guardarReceta };
