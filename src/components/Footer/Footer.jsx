function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">&copy; {currentYear} Ao redor dos E.U.A.</p>
      </div>
    </footer>
  );
}

export default Footer;
