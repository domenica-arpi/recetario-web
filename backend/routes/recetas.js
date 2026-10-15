const express = require("express");
const crypto = require("crypto");
const { leerRecetas, guardarReceta } = require("../utils/almacen");
 
const router = express.Router();
 
// GET /registros -> devuelve todas las recetas (200)
router.get("/", (req, res) => {
  res.status(200).json(leerRecetas());
});
 
// POST /registros -> crea una receta (201)
router.post("/", (req, res) => {
  const nueva = { id: crypto.randomUUID(), ...req.body };
  guardarReceta(nueva);
  res.status(201).json(nueva);
});
 
module.exports = router;
