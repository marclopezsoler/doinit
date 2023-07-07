import "./Header.css";
import logoIcon from "../assets/TODO-ICON.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";

function Header() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="header-parent">
      <div className="header-menu">
        <Link to="/" className="header-link">
          <div className="header-logo">
            <img src={logoIcon} className="header-logo-icon" />
            <p className="header-logo-title">doin' it</p>
          </div>
        </Link>
        <div className="header-links">
          <Link to="/features" className="header-link">
            features
          </Link>
          <Link to="/platform" className="header-link">
            platform
          </Link>
          <Link to="/pricing" className="header-link">
            pricing
          </Link>
        </div>
        {!user ? (
          <div className="register-buttons">
            <Link to="/register" className="header-link signin">
              Sign Up
            </Link>
            <Link to="/login" className="header-link login">
              Log In
            </Link>
          </div>
        ) : (
          <div className="register-buttons">
          <button className="logout__btn" onClick={logout}>
            log out
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
