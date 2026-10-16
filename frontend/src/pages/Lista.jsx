import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerRecetas } from "../api";
import FiltroCategorias from "../components/FiltroCategorias";
import Mensaje from "../components/Mensaje";
import TarjetaReceta from "../components/TarjetaReceta";

export default function Lista() {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);
  const [filtro, setFiltro] = useState("Todas");

  useEffect(() => {
    let cancelado = false;
    obtenerRecetas()
      .then((datos) => {
        if (cancelado) return;
        setRecetas([...datos].reverse());
        setError("");
      })
      .catch((e) => {
        if (!cancelado) setError(e.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [intento]);

  function reintentar() {
    setCargando(true);
    setError("");
    setIntento((n) => n + 1);
  }

  const conteos = useMemo(() => {
    const cuenta = {};
    recetas.forEach((r) => {
      cuenta[r.categoria] = (cuenta[r.categoria] || 0) + 1;
    });
    return cuenta;
  }, [recetas]);

  const visibles = filtro === "Todas" ? recetas : recetas.filter((r) => r.categoria === filtro);
  const hayRecetas = !cargando && !error && recetas.length > 0;

  return (
    <section>
      <header className="encabezado-lista">
        <div>
          <h1>Recetas publicadas</h1>
          {hayRecetas && (
            <p className="pagina__subtitulo">
              {recetas.length} {recetas.length === 1 ? "receta compartida" : "recetas compartidas"}
            </p>
          )}
        </div>
        <Link className="boton boton--claro" to="/registro">+ Nueva receta</Link>
      </header>

      {cargando && (
        <div aria-busy="true">
          <p className="cargando-texto" role="status">Cargando recetas…</p>
          <div className="lista">
            {[1, 2, 3].map((n) => (
              <div key={n} className="esqueleto" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <>
          <Mensaje tipo="error" texto={error} />
          <button type="button" className="boton" onClick={reintentar}>Reintentar</button>
        </>
      )}

      {!cargando && !error && recetas.length === 0 && (
        <div className="vacio">
          <div className="vacio__emoji" aria-hidden="true">🍳</div>
          <h2>Aún no hay recetas</h2>
          <p>Sé la primera persona en compartir una receta con la comunidad.</p>
          <Link className="boton" to="/registro">Registrar la primera receta</Link>
        </div>
      )}

      {hayRecetas && (
        <>
          <FiltroCategorias
            seleccionada={filtro}
            onCambiar={setFiltro}
            conteos={conteos}
            total={recetas.length}
          />
          <div className="lista">
            {visibles.map((r) => (
              <TarjetaReceta key={r.id} receta={r} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}