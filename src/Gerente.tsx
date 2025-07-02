//1 - Criar tela inicial para login de administrador 
//2 -criar página que tenha 4 botões para levar para as páginas ( cadastro de funcionários, cadastro de cliente, cadastro de gerentes e cadastro de secretário)
//3 - CRIAR AS PÁGINAS
//4 - bonus - tentar criar página que mostre todos os cadastrados 

import { useEffect, useState } from "react";
import './Funcionario.css';

interface GerenteState {
    idGerente: number,
    nomeGerente: string,
    salarioGerente: number,
    departamentoGerente: string
}

function Gerente() {
    const [idGerente, setIdGerente] = useState("");
    const [nomeGerente, setNomeGerente] = useState("");
    const [salarioGerente, setSalarioGerente] = useState("");
    const [departamentoGerente, setDepartamentoGerente] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [gerentes, setGerentes] = useState<GerenteState[]>([]);

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch('http://localhost:8000/gerente');
                if (resultado.status === 200) {
                    const dados = await resultado.json();
                    setGerentes(dados);
                }
                if (resultado.status === 400) {
                    const erro = await resultado.json();
                    setMensagem(erro.mensagem);
                }
            } catch (erro) {
                setMensagem("Fetch não encontrado");
            }
        };
        buscaDados();
    }, []);

    function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const novoGerente: GerenteState = {
            idGerente: parseInt(idGerente) || Date.now(),
            nomeGerente: nomeGerente,
            salarioGerente: parseFloat(salarioGerente),
            departamentoGerente: departamentoGerente
        };

        setGerentes([...gerentes, novoGerente]);

        // Limpa os campos do formulário
        setIdGerente("");
        setNomeGerente("");
        setSalarioGerente("");
        setDepartamentoGerente("");
    }

    function trataIdGerente(event: React.ChangeEvent<HTMLInputElement>) {
        setIdGerente(event.target.value);
    }

    function trataNomeGerente(event: React.ChangeEvent<HTMLInputElement>) {
        setNomeGerente(event.target.value);
    }

    function trataSalarioGerente(event: React.ChangeEvent<HTMLInputElement>) {
        setSalarioGerente(event.target.value);
    }

    function trataDepartamentoGerente(event: React.ChangeEvent<HTMLInputElement>) {
        setDepartamentoGerente(event.target.value);
    }

    // Função para excluir gerente
    const excluirGerente = async (id: number) => {
        try {
            const resposta = await fetch(`http://localhost:8000/gerente/${id}`, {
                method: 'DELETE',
            });
            if (resposta.status === 200) {
                setGerentes(gerentes.filter(g => g.idGerente !== id));
                setMensagem('Gerente excluído com sucesso!');
            } else {
                setMensagem('Erro ao excluir gerente.');
            }
        } catch (erro) {
            setMensagem('Erro ao conectar com o backend.');
        }
    };

    return (
        <div className="app">
            <header>
                <div className="logo">Cadastro de Gerentes</div>
                <nav>
                    <ul>
                        <li><a href="#">Início</a></li>
                        <li><a href="#">Gerentes</a></li>
                        <li><a href="#">Sobre</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                {mensagem && 
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                }

                <div className="container-cadastro">
                    <h2>Cadastrar Novo Gerente</h2>
                    <form onSubmit={TrataCadastro}>
                        <div className="form-group">
                            <label htmlFor="idGerente">ID:</label>
                            <input
                                type="text"
                                id="idGerente"
                                value={idGerente}
                                onChange={trataIdGerente}
                                placeholder="Digite o ID"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeGerente">Nome do Gerente:</label>
                            <input
                                type="text"
                                id="nomeGerente"
                                value={nomeGerente}
                                onChange={trataNomeGerente}
                                placeholder="Digite o nome"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salarioGerente">Salário (R$):</label>
                            <input
                                type="number"
                                id="salarioGerente"
                                value={salarioGerente}
                                onChange={trataSalarioGerente}
                                placeholder="Digite o salário"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="departamentoGerente">Departamento:</label>
                            <input
                                type="text"
                                id="departamentoGerente"
                                value={departamentoGerente}
                                onChange={trataDepartamentoGerente}
                                placeholder="Digite o departamento"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-cadastrar">
                            Cadastrar Gerente
                        </button>
                    </form>
                </div>

                <div className="container-listagem">
                    <h2>Lista de Gerentes</h2>

                    {gerentes.length === 0 ? (
                        <p className="sem-produtos">Nenhum gerente cadastrado ainda.</p>
                    ) : (
                        <div className="produtos-grid">
                            {gerentes.map(gerente => (
                                <div className="produto-card" key={gerente.idGerente}>
                                    <div className="produto-header">
                                        <span className="produto-id">#{gerente.idGerente}</span>
                                        <span className="produto-categoria">{gerente.departamentoGerente}</span>
                                    </div>
                                    <h3 className="produto-nome">{gerente.nomeGerente}</h3>
                                    <div className="produto-preco">
                                        R$ {gerente.salarioGerente}
                                    </div>
                                    <button className="btn-detalhes">Ver Detalhes</button>
                                    <button className="btn-excluir" style={{marginLeft: '10px', background: '#e74c3c', color: 'white'}} onClick={() => excluirGerente(gerente.idGerente)}>
                                        Excluir
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} Cadastro de Gerentes. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Gerente;