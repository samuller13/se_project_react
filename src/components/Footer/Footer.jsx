import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">Developed by Samantha Muller</p>
      <p className="footer__year">&copy; {currentYear}</p>
    </footer>
  );
}

export default Footer;
