const express = require("express");
const crypto = require("crypto");
const { leerRecetas, guardarReceta } = require("../utils/almacen");
const { validarReceta } = require("../utils/validar");
 
const router = express.Router();
 
// GET /registros -> devuelve todas las recetas (200)
router.get("/", (req, res) => {
  res.status(200).json(leerRecetas());
});
 
// POST /registros -> crea una receta (201) o rechaza datos inválidos (400)
router.post("/", (req, res) => {
  const { errores, datos } = validarReceta(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ error: "Datos inválidos.", errores });
  }
  const nueva = { id: crypto.randomUUID(), ...datos };
  guardarReceta(nueva);
  res.status(201).json(nueva);
});
 
module.exports = router;
