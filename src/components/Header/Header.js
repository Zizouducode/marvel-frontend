import "./Header.css";
import logo from "../../assets/img/logo.webp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ token, handleToken, favorites }) => {
  //State and variables
  const navigate = useNavigate();
  const numberOfFavorites = favorites.length;
  // console.log("token=>", token);
  //Functions
  const handleLogout = (event) => {
    event.preventDefault();
    handleToken(null);
    navigate("/");
  };

  return (
    <header>
      <div className="container header-container">
        <Link to="/">
          <div className="header-logo-container">
            <img className="header-logo" src={logo} alt="" />
          </div>
        </Link>
        <nav className="header-nav-container">
          <div className="header-menu-container">
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
            <Link to="/myfavorites">
              <div className="header-nav-link">
                <span>MY FAVORITES</span>
                {numberOfFavorites > 0 ? (
                  <div className="header-number-favorites">
                    {numberOfFavorites}
                  </div>
                ) : null}
              </div>
            </Link>
          </div>

          <div className="header-button-container">
            {!token ? (
              <>
                <div>
                  <Link to="/signup">
                    <button className="header-button-signup">
                      SIGN UP NOW
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/login">
                    <button className="header-button-login-logout">
                      LOG IN
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <Link to="/">
                <button
                  className="header-button-login-logout"
                  onClick={(event) => {
                    handleLogout(event);
                  }}
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
