const express = require("express");
const cors = require("cors");
const recetasRouter = require("./routes/recetas");
const { inicializarArchivo } = require("./utils/almacen");
 
const app = express();
const PORT = process.env.PORT || 3001;
 
// CORS: el frontend corre en otro puerto (otro origen), así que se permite
// únicamente localhost / 127.0.0.1 en cualquier puerto
app.use(cors({ origin: /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/ }));
 
// Permite leer el cuerpo de las peticiones en formato JSON
app.use(express.json());
 
// Todas las rutas de recetas cuelgan de /registros
app.use("/registros", recetasRouter);
 
// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});
 
// Manejo central de errores: siempre responde en JSON (nunca en HTML)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido." });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "El cuerpo de la petición es demasiado grande." });
  }
  console.error("Error no controlado:", err.message);
  res.status(500).json({ error: "Error interno del servidor." });
});
 
// Si el archivo no se puede preparar, se avisa pero el servidor sigue encendido
try {
  inicializarArchivo();
} catch (error) {
  console.error("Error al inicializar el archivo:", error.message);
}
 
app
  .listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`El puerto ${PORT} ya está en uso. Cierra el otro servidor e inténtalo de nuevo.`);
    } else {
      console.error("No se pudo iniciar el servidor:", error.message);
    }
    process.exit(1);
  });
