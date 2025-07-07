import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaCadastroUsuario from "./Pagina.tsx";
import PaginaLogin from "./PaginaLogin.tsx";
import MenuCadastro from "./MenuCadastro.tsx";
import Funcionario from "./Funcionario";
import Gerente from "./Gerente";
import Secretario from "./Secretario";

// Importe as páginas de cadastro quando criar

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaCadastroUsuario />} />
                <Route path="/PaginaLogin" element={<PaginaLogin />} />
                <Route path="/menu-cadastro" element={<MenuCadastro />} />
                <Route path="/cadastro-funcionario" element={<Funcionario />} />
                <Route path="/cadastro-gerente" element={<Gerente />} />
                <Route path="/cadastro-secretario" element={<Secretario />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

