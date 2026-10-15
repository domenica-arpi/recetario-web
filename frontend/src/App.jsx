import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Lista from "./pages/Lista";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={<Lista />} />
      </Routes>
    </main>
  );
}