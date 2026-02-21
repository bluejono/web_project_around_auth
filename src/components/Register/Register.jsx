import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  return (
    <div className="page page_auth">
      <Header
        logo="../src/assets/svg-logo.svg"
        isLoggedIn={false}
        currentPage="signup"
      />
      <main className="auth">
        <div className="auth__header">
          <h2 className="auth__title">Cadastro</h2>
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
          </form>
        </div>
        <div className="auth__footer">
          <button className="auth__button" type="submit" onClick={handleSubmit}>
            Cadastrar
          </button>
          <p className="auth__link-text">
            Já é um membro?{" "}
            <Link className="auth__link" to="/signin">
              Faça o login aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
