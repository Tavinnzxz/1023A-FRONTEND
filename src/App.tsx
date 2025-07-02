import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagina from "./Pagina";
import MenuCadastro from "./MenuCadastro";
// Importe as páginas de cadastro quando criar

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Pagina />} />
                <Route path="/menu-cadastro" element={<MenuCadastro />} />
                {/* Adicione as rotas das páginas de cadastro aqui */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;