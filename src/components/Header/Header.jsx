import { useState } from "react";

function Header({ logo, isLoggedIn, userEmail, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isMobileMenuOpen ? "header--open" : ""}`}>
      <div className="header__inner">
        <img
          className="header__logo"
          src={logo}
          alt="Around the US logo branca"
        />

        {isLoggedIn && (
          <nav className="header__nav header__nav--desktop">
            <span className="header__email">{userEmail}</span>
            <button
              className="header__logout"
              type="button"
              onClick={onLogout}
            >
              Sair
            </button>
          </nav>
        )}

        {isLoggedIn && (
          <button
            className={`header__hamburger ${isMobileMenuOpen ? "header__hamburger--open" : ""}`}
            type="button"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? "✕" : ""}
          </button>
        )}
      </div>

      {isMobileMenuOpen && isLoggedIn && (
        <div className="header__mobile-menu">
          <span className="header__mobile-email">{userEmail}</span>
          <button
            className="header__mobile-logout"
            type="button"
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
