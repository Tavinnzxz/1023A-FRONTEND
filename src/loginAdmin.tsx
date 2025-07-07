import React, { useState } from "react"; // Importa React e o hook useState
import "./Pagina.css"; // Importa o CSS para estilização

// Define a interface para as props do componente
interface LoginProps {
  onLogin: () => void; // Função chamada ao fazer login com sucesso
}

// Componente funcional de Login do Administrador
const LoginAdmin: React.FC<LoginProps> = ({ onLogin }) => {
  // Estados para armazenar usuário, senha e mensagem de erro
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Função chamada ao enviar o formulário de login
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Evita o recarregamento da página
    // Validação simples: usuário "admin" e senha "1234"
    if (usuario === "admin" && senha === "1234") {
      setErro(""); // Limpa mensagem de erro
      onLogin();   // Chama função de login (passada por props)
    } else {
      setErro("Usuário ou senha inválidos."); // Mostra erro se inválido
    }
  }

  // JSX que renderiza o formulário de login
  return (
    <div className="container-cadastro">
      <h2>Login Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)} // Atualiza estado do usuário
            required
            placeholder="Digite o usuário"
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={e => setSenha(e.target.value)} // Atualiza estado da senha
            required
            placeholder="Digite a senha"
          />
        </div>
        {erro && <div className="mensagem"><p>{erro}</p></div>} {/* Exibe erro se houver */}
        <button type="submit" className="btn-cadastrar">Entrar</button>
      </form>
    </div>
  );
};

export default LoginAdmin; // Exporta o componente para uso em