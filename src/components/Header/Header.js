import "./Header.css";
import logo from "../../assets/img/logo.webp";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container header-container">
        <div className="header-logo-container">
          <img className="header-logo" src={logo} alt="" />
        </div>
        <nav className="header-nav">
          <Link to="/">
            <div className="header-nav-link">
              <span>CHARACTERS</span>
            </div>
          </Link>
          <Link to="/comics">
            <div className="header-nav-link">
              <span>COMICS</span>
            </div>
          </Link>
          <Link to="/myfovorites">
            <div className="header-nav-link">
              <span>MY FAVORITES</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
