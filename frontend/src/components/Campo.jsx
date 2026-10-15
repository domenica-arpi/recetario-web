// Envuelve una etiqueta, el control del formulario y su mensaje de error
export default function Campo({ id, etiqueta, error, contador, children }) {
  return (
    <div className={`campo${error ? " campo--error" : ""}`}>
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {(error || contador) && (
        <div className="campo__pie">
          {error && <p className="campo__error" id={`${id}-error`}>{error}</p>}
          {contador && <span className="campo__contador">{contador}</span>}
        </div>
      )}
    </div>
  );
}