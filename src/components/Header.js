import "./Header.css";
import logoIcon from "../assets/TODO-ICON.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";

function Header() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="header-parent">
      {window.location.pathname === "/" ||
      window.location.pathname === "/features" ||
      window.location.pathname === "/platform" ||
      window.location.pathname === "/pricing" ||
      window.location.pathname === "/dashboard" ? (
        <div className="header-menu">
          <Link to="/" className="header-link">
            <div className="header-logo">
              <img src={logoIcon} className="header-logo-icon" />
              <p className="header-logo-title">doin' it</p>
            </div>
          </Link>
          {!user ? (
            <div className="register-buttons">
              <Link to="/register" className="header-link signin">
                sign up
              </Link>
              <Link to="/login" className="header-link login">
                log in
              </Link>
            </div>
          ) : (
            <div className="register-buttons">
              <Link to="/dashboard" className="header-link signin">
                dashboard
              </Link>
              <button className="header-link login" onClick={logout}>
                log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="headerBack_parent">
          <Link to="/" className="headerBack_link">
            back home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
