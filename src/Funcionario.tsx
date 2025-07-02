//1 - Criar tela inicial para login de administrador alisson 

 //2 -criar página que tenha 4 botões para levar para as páginas ( cadastro de funcionários, cadastro de cliente, cadastro de gerentes e cadastro de secretário)

//3 - CRIAR AS PÁGINAS 

 //4 - bonus - tentar criar página que mostre todos os cadastrados 



import { useEffect, useState } from "react";
import './Funcionario.css';


interface FuncionarioState {
    idFuncionario: number,
    nomeFuncionario: string,
    salarioFuncionario: number,
    cargoFuncionario: string
}

function Funcionario() {
    const [idFuncionario, setIdFuncionario] = useState("");
    const [nomeFuncionario, setNomeFuncionario] = useState("");
    const [salarioFuncionario, setSalarioFuncionario] = useState("");
    const [cargoFuncionario, setCargoFuncionario] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [funcionarios, setFuncionarios] = useState<FuncionarioState[]>([]);

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch('http://localhost:8000/funcionarios');
                if (resultado.status === 200) {
                    const dados = await resultado.json();
                    setFuncionarios(dados);
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

        const novoFuncionario: FuncionarioState = {
            idFuncionario: parseInt(idFuncionario) || Date.now(),
            nomeFuncionario: nomeFuncionario,
            salarioFuncionario: parseFloat(salarioFuncionario),
            cargoFuncionario: cargoFuncionario
        };

        setFuncionarios([...funcionarios, novoFuncionario]);

        // Limpa os campos do formulário
        setIdFuncionario("");
        setNomeFuncionario("");
        setSalarioFuncionario("");
        setCargoFuncionario("");
    }

    function trataIdFuncionario(event: React.ChangeEvent<HTMLInputElement>) {
        setIdFuncionario(event.target.value);
    }

    function trataNomeFuncionario(event: React.ChangeEvent<HTMLInputElement>) {
        setNomeFuncionario(event.target.value);
    }

    function trataSalarioFuncionario(event: React.ChangeEvent<HTMLInputElement>) {
        setSalarioFuncionario(event.target.value);
    }

    function trataCargoFuncionario(event: React.ChangeEvent<HTMLInputElement>) {
        setCargoFuncionario(event.target.value);
    }

    // Função para excluir funcionário
    const excluirFuncionario = async (id: number) => {
        try {
            const resposta = await fetch(`http://localhost:8000/funcionarios/${id}`, {
                method: 'DELETE',
            });
            if (resposta.status === 200) {
                setFuncionarios(funcionarios.filter(f => f.idFuncionario !== id));
                setMensagem('Funcionário excluído com sucesso!');
            } else {
                setMensagem('Erro ao excluir funcionário.');
            }
        } catch (erro) {
            setMensagem('Erro ao conectar com o backend.');
        }
    };

    return (
        <div className="app">
            <header>
                <div className="logo">Cadastro de Funcionários</div>
                <nav>
                    <ul>
                        <li><a href="#">Início</a></li>
                        <li><a href="#">Funcionários</a></li>
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
                    <h2>Cadastrar Novo Funcionário</h2>
                    <form onSubmit={TrataCadastro}>
                        <div className="form-group">
                            <label htmlFor="idFuncionario">ID:</label>
                            <input
                                type="text"
                                id="idFuncionario"
                                value={idFuncionario}
                                onChange={trataIdFuncionario}
                                placeholder="Digite o ID"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeFuncionario">Nome do Funcionário:</label>
                            <input
                                type="text"
                                id="nomeFuncionario"
                                value={nomeFuncionario}
                                onChange={trataNomeFuncionario}
                                placeholder="Digite o nome"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salarioFuncionario">Salário (R$):</label>
                            <input
                                type="number"
                                id="salarioFuncionario"
                                value={salarioFuncionario}
                                onChange={trataSalarioFuncionario}
                                placeholder="Digite o salário"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cargoFuncionario">Cargo:</label>
                            <input
                                type="text"
                                id="cargoFuncionario"
                                value={cargoFuncionario}
                                onChange={trataCargoFuncionario}
                                placeholder="Digite o cargo"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-cadastrar">
                            Cadastrar Funcionário
                        </button>
                    </form>
                </div>

                <div className="container-listagem">
                    <h2>Lista de Funcionários</h2>

                    {funcionarios.length === 0 ? (
                        <p className="sem-produtos">Nenhum funcionário cadastrado ainda.</p>
                    ) : (
                        <div className="produtos-grid">
                            {funcionarios.map(funcionario => (
                                <div className="produto-card" key={funcionario.idFuncionario}>
                                    <div className="produto-header">
                                        <span className="produto-id">#{funcionario.idFuncionario}</span>
                                        <span className="produto-categoria">{funcionario.cargoFuncionario}</span>
                                    </div>
                                    <h3 className="produto-nome">{funcionario.nomeFuncionario}</h3>
                                    <div className="produto-preco">
                                        R$ {funcionario.salarioFuncionario}
                                    </div>
                                    <button className="btn-detalhes">Ver Detalhes</button>
                                    <button className="btn-excluir" style={{marginLeft: '10px', background: '#e74c3c', color: 'white'}} onClick={() => excluirFuncionario(funcionario.idFuncionario)}>
                                        Excluir
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} Cadastro de Funcionários. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Funcionario;