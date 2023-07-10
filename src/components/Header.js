import "./Header.css";
import logoIcon from "../assets/TODO-ICON.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import burger from "../assets/burger.svg";
import cross from "../assets/cross.svg";
import { useEffect, useState } from "react";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [burgerState, setBurgerState] = useState(true);

  useEffect(() => {
    setBurgerState(true);
  }, [window.location.pathname]);

  function toggleMenu() {
    setBurgerState(!burgerState);
  }

  return (
    <div className="header-parent">
      <div className="desktop-menu">
        {window.location.pathname === "/" ||
        window.location.pathname === "/features" ||
        window.location.pathname === "/platform" ||
        window.location.pathname === "/pricing" ||
        window.location.pathname === "/dashboard" ? (
          <div className="header-menu">
            <Link to="/" className="header-link">
              <div className="header-logo">
                <img src={logoIcon} className="header-logo-icon" />
                <h2 className="header-logo-title">doin' it</h2>
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
      <div className="mobile-menu">
        {window.location.pathname === "/" ||
        window.location.pathname === "/features" ||
        window.location.pathname === "/platform" ||
        window.location.pathname === "/pricing" ||
        window.location.pathname === "/dashboard" ? (
          <>
            <div className={burgerState ? "header-menu" : "hide"}>
              <Link to="/" className="header-link">
                <div className="header-logo">
                  <img src={logoIcon} className="header-logo-icon" />
                </div>
              </Link>
              <a className="header-logo" onClick={toggleMenu}>
                <img src={burger} width={36} id="burger-menu" />
              </a>
            </div>
            <div className={burgerState ? "hide" : "burger-menu-appear show"}>
              <div className="register-buttons-mobile">
                <a className="header-logo" onClick={toggleMenu}>
                  <img src={cross} width={36} id="menu-cross" />
                </a>
                {!user ? (
                  <>
                    <Link to="/register" className="header-link-mobile">
                      sign up
                    </Link>
                    <Link to="/login" className="header-link-mobile">
                      log in
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="header-link-mobile">
                      dashboard
                    </Link>
                    <button className="header-link-mobile-button" onClick={logout}>
                      log out
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="headerBack_parent-mobile">
            <Link to="/" className="headerBack_link">
              back home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
