export function formatearFecha(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function iniciales(nombre) {
  const letras = nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra[0]?.toUpperCase() ?? "")
    .join("");
  return letras || "?";
}