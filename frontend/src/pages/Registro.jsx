import FormularioReceta from "../components/FormularioReceta";

export default function Registro() {
  return (
    <section>
      <h1>Registrar una receta</h1>
      <p>Comparte tu receta con la comunidad. Todos los campos son obligatorios.</p>
      <FormularioReceta />
    </section>
  );
}