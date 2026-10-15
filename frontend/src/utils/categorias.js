export const CATEGORIAS = [
  { nombre: "Desayuno", emoji: "🥞" },
  { nombre: "Almuerzo", emoji: "🍛" },
  { nombre: "Cena", emoji: "🌙" },
  { nombre: "Postre", emoji: "🍰" },
  { nombre: "Bebida", emoji: "🥤" },
  { nombre: "Snack", emoji: "🍿" },
];

export const NOMBRES_CATEGORIAS = CATEGORIAS.map((c) => c.nombre);

export function emojiDe(nombre) {
  return CATEGORIAS.find((c) => c.nombre === nombre)?.emoji ?? "🍽️";
}