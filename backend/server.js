const express = require("express");
const cors = require("cors");
const { inicializarArchivo } = require("./utils/almacen");
const recetasRouter = require("./routes/recetas");
 
const app = express();
const PORT = process.env.PORT || 3001;
 
// CORS: el frontend corre en otro puerto (otro origen), así que se permite
// únicamente localhost / 127.0.0.1 en cualquier puerto
app.use(cors({ origin: /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/ }));
 
// Permite leer el cuerpo de las peticiones en formato JSON
app.use(express.json());
 
app.use("/registros", recetasRouter);
 
inicializarArchivo();
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

