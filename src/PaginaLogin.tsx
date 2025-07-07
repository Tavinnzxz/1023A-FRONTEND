//1 - Criar tela inicial para login de administrador alisson 
 //2 -criar página que tenha 4 botões para levar para as páginas ( cadastro de funcionários, cadastro de cliente, cadastro de gerentes e cadastro de secretário)
 //3 - CRIAR AS PÁGINAS 
 //4 - bonus - tentar criar página que mostre todos os cadastrados 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './PaginaLogin.css';

function PaginaLogin() {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cidade, setCidade] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMensagem("");
        try {
            // Busca todos os usuários do backend
            const resposta = await fetch('http://localhost:8000/usuarios');
            if (resposta.status === 200) {
                const usuarios = await resposta.json();
                // Verifica se existe algum usuário com os dados informados
                const existe = usuarios.some((u: any) =>
                    String(u.id) === id &&
                    u.nome === nome &&
                    u.sobrenome === sobrenome &&
                    u.cidade === cidade
                );
                if (existe) {
                    setMensagem("Login realizado!");
                    navigate("/menu-cadastro");
                } else {
                    setMensagem("Usuário não encontrado no banco de dados!");
                }
            } else {
                setMensagem("Erro ao buscar usuários no banco de dados.");
            }
        } catch (erro) {
            setMensagem("Erro de conexão com o backend.");
        }
    }

    function irParaCadastro() {
        navigate("/");
    }

    return (
        <div className="app">
            <header>
                <div className="logo">Login de Usuário</div>
            </header>
            <main>
                {mensagem &&
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                }
                <div className="container-cadastro">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="id">ID:</label>
                            <input
                                type="text"
                                id="id"
                                value={id}
                                onChange={e => setId(e.target.value)}
                                placeholder="Digite o ID"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder="Digite o nome"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sobrenome">Sobrenome:</label>
                            <input
                                type="text"
                                id="sobrenome"
                                value={sobrenome}
                                onChange={e => setSobrenome(e.target.value)}
                                placeholder="Digite o sobrenome"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cidade">Cidade:</label>
                            <input
                                type="text"
                                id="cidade"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                                placeholder="Digite a cidade"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-cadastrar">
                            Entrar
                        </button>
                    </form>
                    <button className="btn-login" style={{marginTop: '1rem'}} onClick={irParaCadastro}>
                        Não tem uma conta? Cadastre-se
                    </button>
                </div>
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Loja de Produtos. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default PaginaLogin;