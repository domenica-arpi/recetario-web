import { useState } from "react";
import { Link } from "react-router-dom";
import FormularioReceta from "../components/FormularioReceta";
import Mensaje from "../components/Mensaje";

export default function Registro() {
  const [guardada, setGuardada] = useState(null);

  function alGuardar(receta) {
    setGuardada(receta);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section>
      <header className="pagina__encabezado">
        <h1>Registrar una receta</h1>
        <p>Comparte tu receta con la comunidad. Todos los campos son obligatorios.</p>
      </header>

      {guardada && (
        <Mensaje tipo="exito">
          <strong>¡Tu receta «{guardada.titulo}» fue publicada!</strong>{" "}
          <Link to="/lista">Ver todas las recetas →</Link>
        </Mensaje>
      )}

      <FormularioReceta onGuardada={alGuardar} onIntento={() => setGuardada(null)} />
    </section>
  );
}