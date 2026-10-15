const express = require("express");
const crypto = require("crypto");
const { leerRecetas, guardarReceta } = require("../utils/almacen");
const { validarReceta } = require("../utils/validar");
 
const router = express.Router();
 
// GET /registros -> devuelve todas las recetas (200)
router.get("/", (req, res) => {
  try {
    res.status(200).json(leerRecetas());
  } catch (error) {
    console.error("Error al leer:", error.message);
    res.status(500).json({ error: "No se pudieron leer los registros." });
  }
});
 
// POST /registros -> crea una receta (201) o rechaza datos inválidos (400)
router.post("/", (req, res) => {
  const { errores, datos } = validarReceta(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ error: "Datos inválidos.", errores });
  }
 
  try {
    const nueva = { id: crypto.randomUUID(), ...datos };
    guardarReceta(nueva);
    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al guardar:", error.message);
    res.status(500).json({ error: "No se pudo guardar el registro." });
  }
});
 
module.exports = router;
