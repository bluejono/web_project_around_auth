import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <div className="page page_auth">
      <Header
        logo="../src/assets/svg-logo.svg"
        isLoggedIn={false}
        currentPage="signin"
      />
      <main className="auth">
        <div className="auth__header">
          <h2 className="auth__title">Entrar</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              className="auth__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button className="auth__button" type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div className="auth__footer">
          <p className="auth__link-text">
            Ainda não é membro?{" "}
            <Link className="auth__link" to="/signup">
              Inscreva-se aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
