//1 - Criar tela inicial para login de administrador alisson 

 //2 -criar página que tenha 4 botões para levar para as páginas ( cadastro de funcionários, cadastro de cliente, cadastro de gerentes e cadastro de secretário)

//3 - CRIAR AS PÁGINAS 

 //4 - bonus - tentar criar página que mostre todos os cadastrados 



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Funcionario.css';

function Funcionario() {
    const [idFuncionario, setIdFuncionario] = useState("");
    const [nomeFuncionario, setNomeFuncionario] = useState("");
    const [salarioFuncionario, setSalarioFuncionario] = useState("");
    const [cargoFuncionario, setCargoFuncionario] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    async function handleCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMensagem("");
        try {
            const resposta = await fetch('http://localhost:8000/funcionarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nomeFuncionario, salarioFuncionario, cargoFuncionario })
            });
            if (resposta.status === 200 || resposta.status === 201) {
                setMensagem("Funcionário cadastrado com sucesso!");
                setIdFuncionario(""); setNomeFuncionario(""); setSalarioFuncionario(""); setCargoFuncionario("");
                setTimeout(() => navigate("/menu-cadastro"), 2000);
            } else {
                const erro = await resposta.json();
                setMensagem(erro.mensagem || "Erro ao cadastrar funcionário.");
            }
        } catch (erro) {
            setMensagem("Erro de conexão com o backend.");
        }
    }

    function irParaMenu() {
        navigate("/menu-cadastro");
    }



    return (
        <div className="app">
            <header>
                <div className="logo">Cadastro de Funcionário</div>
            </header>
            <main>
                {mensagem &&
                    <div className={`mensagem ${mensagem.includes("Erro") ? "erro" : "sucesso"}`}>
                        <p>{mensagem}</p>
                    </div>
                }
                <div className="container-cadastro">
                    <h2>Cadastre um Funcionário</h2>
                    <form onSubmit={handleCadastro}>
                        <div className="form-group">
                            <label htmlFor="idFuncionario">ID:</label>
                            <input
                                type="text"
                                id="idFuncionario"
                                value={idFuncionario}
                                onChange={e => setIdFuncionario(e.target.value)}
                                placeholder="Digite o ID"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nomeFuncionario">Nome:</label>
                            <input
                                type="text"
                                id="nomeFuncionario"
                                value={nomeFuncionario}
                                onChange={e => setNomeFuncionario(e.target.value)}
                                placeholder="Digite o nome"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salarioFuncionario">Salário:</label>
                            <input
                                type="number"
                                id="salarioFuncionario"
                                value={salarioFuncionario}
                                onChange={e => setSalarioFuncionario(e.target.value)}
                                placeholder="Digite o salário"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cargoFuncionario">Cargo:</label>
                            <input
                                type="text"
                                id="cargoFuncionario"
                                value={cargoFuncionario}
                                onChange={e => setCargoFuncionario(e.target.value)}
                                placeholder="Digite o cargo"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-cadastrar">
                            Cadastrar
                        </button>
                    </form>
                    <button className="btn-login" style={{marginTop: '1rem'}} onClick={irParaMenu}>
                        Voltar ao menu
                    </button>
                </div>
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Cadastro de Funcionários. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Funcionario;