import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './TodosCadastros.css';

interface Gerente {
    idGerente: number;
    nomeGerente: string;
    salarioGerente: number;
    departamentoGerente: string;
}

interface Funcionario {
    idFuncionario: number;
    nomeFuncionario: string;
    salarioFuncionario: number;
    cargoFuncionario: string;
}

interface Secretario {
    idSecretario: number;
    nomeSecretario: string;
    salarioSecretario: number;
    setorSecretario: string;
}

interface Cliente {
    idCliente: number;
    nomeCliente: string;
    cidadeCliente: string;
}

function TodosCadastros() {
    const [gerente, setGerente] = useState<Gerente[]>([]);
    const [funcionario, setFuncionario] = useState<Funcionario[]>([]);
    const [secretario, setSecretario] = useState<Secretario[]>([]);
    const [cliente, setCliente] = useState<Cliente[]>([]);
    const [mensagem, setMensagem] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch all data in parallel
                const [gerenteRes, funcionarioRes, secretarioRes, clienteRes] = await Promise.all([
                    fetch("http://localhost:8000/gerente"),
                    fetch("http://localhost:8000/funcionario"),
                    fetch("http://localhost:8000/secretario"),
                    fetch("http://localhost:8000/cliente")
                ]);

                setGerente(gerenteRes.ok ? await gerenteRes.json() : []);
                setFuncionario(funcionarioRes.ok ? await funcionarioRes.json() : []);
                setSecretario(secretarioRes.ok ? await secretarioRes.json() : []);
                setCliente(clienteRes.ok ? await clienteRes.json() : []);

            } catch (error) {
                setMensagem("error|Erro ao carregar dados. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="todos-cadastros loading">
                <div className="loading-spinner"></div>
                <p>Carregando dados...</p>
            </div>
        );
    }

    return (
        <div className="todos-cadastros">
            <div className="todos-cadastros-header">
                <h1>Todos os Cadastros</h1>
                <button onClick={() => navigate('/menu-cadastro')}>
                    Voltar ao Menu
                </button>
            </div>

            {mensagem && (
                <div className={`mensagem ${mensagem.split("|")[0]}`}>
                    {mensagem.split("|")[1]}
                </div>
            )}

            <div className="cadastro-section">
                <div className="cadastro-header">
                    <h2 className="gerente-icon">Gerentes</h2>
                    <span className="cadastro-count">{gerente.length} cadastros</span>
                </div>
                <ul>
                    {gerente.length === 0 ? (
                        <li>Nenhum gerente cadastrado.</li>
                    ) : (
                        gerente.map((g: Gerente) => (
                            <li key={g.idGerente}>
                                <span>{g.nomeGerente}</span>
                                <div>
                                    <span>{g.departamentoGerente}</span> - 
                                    <span>R$ {g.salarioGerente.toFixed(2)}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="cadastro-section">
                <div className="cadastro-header">
                    <h2 className="funcionario-icon">Funcionários</h2>
                    <span className="cadastro-count">{funcionario.length} cadastros</span>
                </div>
                <ul>
                    {funcionario.length === 0 ? (
                        <li>Nenhum funcionário cadastrado.</li>
                    ) : (
                        funcionario.map((f: Funcionario) => (
                            <li key={f.idFuncionario}>
                                <span>{f.nomeFuncionario}</span>
                                <div>
                                    <span>{f.cargoFuncionario}</span> - 
                                    <span>R$ {f.salarioFuncionario.toFixed(2)}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="cadastro-section">
                <div className="cadastro-header">
                    <h2 className="secretario-icon">Secretários</h2>
                    <span className="cadastro-count">{secretario.length} cadastros</span>
                </div>
                <ul>
                    {secretario.length === 0 ? (
                        <li>Nenhum secretário cadastrado.</li>
                    ) : (
                        secretario.map((s: Secretario) => (
                            <li key={s.idSecretario}>
                                <span>{s.nomeSecretario}</span>
                                <div>
                                    <span>{s.setorSecretario}</span> - 
                                    <span>R$ {s.salarioSecretario.toFixed(2)}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="cadastro-section">
                <div className="cadastro-header">
                    <h2 className="cliente-icon">Clientes</h2>
                    <span className="cadastro-count">{cliente.length} cadastros</span>
                </div>
                <ul>
                    {cliente.length === 0 ? (
                        <li>Nenhum cliente cadastrado.</li>
                    ) : (
                        cliente.map((c: Cliente) => (
                            <li key={c.idCliente}>
                                <span>{c.nomeCliente}</span>
                                <div>
                                    <span>{c.cidadeCliente}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TodosCadastros;