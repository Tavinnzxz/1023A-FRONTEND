//1 - Criar tela inicial para login de administrador

 //2 -criar página que tenha 4 botões para levar para as páginas ( cadastro de funcionários, cadastro de cliente, cadastro de gerentes e cadastro de secretário)

//3 - CRIAR AS PÁGINAS 

 //4 - bonus - tentar criar página que mostre todos os cadastrados 



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Secretario.css';

interface SecretarioState {
    idSecretario: number,
    nomeSecretario: string,
    salarioSecretario: number,
    setorSecretario: string
}


function Secretario() {
    const navigate = useNavigate();
    const [idSecretario, setIdSecretario] = useState("");
    const [nomeSecretario, setNomeSecretario] = useState("");
    const [salarioSecretario, setSalarioSecretario] = useState("");
    const [setorSecretario, setSetorSecretario] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [secretarios, setSecretarios] = useState<SecretarioState[]>([])

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch('http://localhost:8000/secretarios')
                if (resultado.status === 200) {
                    const dados = await resultado.json();
                    setSecretarios(dados)
                }
                if (resultado.status === 400) {
                    const erro = await resultado.json();
                    setMensagem(erro.mensagem);
                }
            } catch (erro) {
                setMensagem("Fetch não encontrado");
            }
        }
        buscaDados()
    }, [])
            

    function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const novoSecretario: SecretarioState = {
            idSecretario: parseInt(idSecretario) || Date.now(),
            nomeSecretario: nomeSecretario,
            salarioSecretario: parseFloat(salarioSecretario),
            setorSecretario: setorSecretario
        }

        setSecretarios([...secretarios, novoSecretario]);

        // Limpa os campos do formulário
        setIdSecretario("");
        setNomeSecretario("");
        setSalarioSecretario("");
        setSetorSecretario("");
    }


    //adicionar esse novo secretario no vetor array de secretarios
    function trataIdSecretario(event: React.ChangeEvent<HTMLInputElement>) {
        setIdSecretario(event.target.value);
    }

    function trataNomeSecretario(event: React.ChangeEvent<HTMLInputElement>) {
        setNomeSecretario(event.target.value);
    }

    function trataSalarioSecretario(event: React.ChangeEvent<HTMLInputElement>) {
        setSalarioSecretario(event.target.value);
    }

    function trataSetorSecretario(event: React.ChangeEvent<HTMLInputElement>) {
        setSetorSecretario(event.target.value);
    }


    // Função para excluir secretário
    const excluirSecretario = async (id: number) => {
        try {
            const resposta = await fetch(`http://localhost:8000/secretarios/${id}`, {
                method: 'DELETE',
            });
            if (resposta.status === 200) {
                setSecretarios(secretarios.filter(s => s.idSecretario !== id));
                setMensagem('Secretário excluído com sucesso!');
            } else {
                setMensagem('Erro ao excluir secretário.');
            }
        } catch (erro) {
            setMensagem('Erro ao conectar com o backend.');
        }
    };

    return (
        <div className="app">
            <header>
                <div className="logo">Cadastro de Secretários</div>
                <nav>
                    <ul>
                        <li><button className="btn-inicio" onClick={() => navigate('/menu-cadastro')}>Início</button></li>
                        <li><a href="#">Secretários</a></li>
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
                    <h2>Cadastrar Novo Secretário</h2>
                    <form onSubmit={TrataCadastro}>
                        <div className="form-group">
                            <label htmlFor="idSecretario">ID:</label>
                            <input
                                type="text"
                                id="idSecretario"
                                value={idSecretario}
                                onChange={trataIdSecretario}
                                placeholder="Digite o ID"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeSecretario">Nome do Secretário:</label>
                            <input
                                type="text"
                                id="nomeSecretario"
                                value={nomeSecretario}
                                onChange={trataNomeSecretario}
                                placeholder="Digite o nome"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salarioSecretario">Salário (R$):</label>
                            <input
                                type="number"
                                id="salarioSecretario"
                                value={salarioSecretario}
                                onChange={trataSalarioSecretario}
                                placeholder="Digite o salário"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="setorSecretario">Setor:</label>
                            <input
                                type="text"
                                id="setorSecretario"
                                value={setorSecretario}
                                onChange={trataSetorSecretario}
                                placeholder="Digite o setor"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-cadastrar">
                            Cadastrar Secretário
                        </button>
                    </form>
                </div>

                <div className="container-listagem">
                    <h2>Lista de Secretários</h2>

                    {secretarios.length === 0 ? (
                        <p className="sem-produtos">Nenhum secretário cadastrado ainda.</p>
                    ) : (
                        <div className="produtos-grid">
                            {secretarios.map(secretario => (
                                <div className="produto-card" key={secretario.idSecretario}>
                                    <div className="produto-header">
                                        <span className="produto-id">#{secretario.idSecretario}</span>
                                        <span className="produto-categoria">{secretario.setorSecretario}</span>
                                    </div>
                                    <h3 className="produto-nome">{secretario.nomeSecretario}</h3>
                                    <div className="produto-preco">
                                        R$ {secretario.salarioSecretario}
                                    </div>
                                    <button className="btn-detalhes">Ver Detalhes</button>
                                    <button className="btn-excluir" style={{marginLeft: '10px', background: '#e74c3c', color: 'white'}} onClick={() => excluirSecretario(secretario.idSecretario)}>
                                        Excluir
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} Cadastro de Secretários. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Secretario;