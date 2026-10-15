const ICONOS = { info: "ℹ️", exito: "✅", error: "⚠️" };

export default function Mensaje({ tipo = "info", texto, children }) {
  if (!texto && !children) return null;
  return (
    <div className={`mensaje mensaje--${tipo}`} role={tipo === "error" ? "alert" : "status"}>
      <span className="mensaje__icono" aria-hidden="true">{ICONOS[tipo]}</span>
      <div>{texto}{children}</div>
    </div>
  );
}