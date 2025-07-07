import { useEffect, useState } from "react";

interface Gerente {
    idGerente: number;
    nomeGerente: string;
    salarioGerente: number;
    departamentoGerente: string;
}

// Adicione interfaces para Funcionário, Cliente, Secretário conforme seu backend

function TodosCadastros() {
    const [gerentes, setGerentes] = useState<Gerente[]>([]);
    // Adicione states para funcionários, clientes, secretários

    useEffect(() => {
        // Busque todos os cadastros do backend
        fetch("http://localhost:8000/gerente")
            .then(res => res.json())
            .then(data => setGerentes(data));
        // Repita para funcionários, clientes, secretários
    }, []);

    return (
        <div>
            <h1>Todos os Cadastros</h1>
            <h2>Gerentes</h2>
            <ul>
                {gerentes.map(g => (
                    <li key={g.idGerente}>
                        {g.nomeGerente} - {g.departamentoGerente} - R$ {g.salarioGerente}
                    </li>
                ))}
            </ul>
            {/* Repita para funcionários, clientes, secretários */}
        </div>
    );
}

export default TodosCadastros;