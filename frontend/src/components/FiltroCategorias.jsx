import { CATEGORIAS } from "../utils/categorias";

export default function FiltroCategorias({ seleccionada, onCambiar, conteos, total }) {
  return (
    <div className="filtros" role="group" aria-label="Filtrar por categoría">
      <button
        type="button"
        className="filtro"
        aria-pressed={seleccionada === "Todas"}
        onClick={() => onCambiar("Todas")}
      >
        Todas <span className="filtro__n">{total}</span>
      </button>
      {CATEGORIAS.filter((c) => conteos[c.nombre] > 0).map((c) => (
        <button
          key={c.nombre}
          type="button"
          className="filtro"
          aria-pressed={seleccionada === c.nombre}
          onClick={() => onCambiar(c.nombre)}
        >
          <span aria-hidden="true">{c.emoji}</span> {c.nombre}{" "}
          <span className="filtro__n">{conteos[c.nombre]}</span>
        </button>
      ))}
    </div>
  );
}
