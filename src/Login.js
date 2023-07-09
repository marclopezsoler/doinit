import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logoIcon from "./assets/TODO-ICON.png";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [storedEmails, setStoredEmails] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const storedEmails = localStorage.getItem("storedEmails");
    if (storedEmails) {
      setStoredEmails(JSON.parse(storedEmails));
    }
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  useEffect(() => {
    localStorage.setItem("storedEmails", JSON.stringify(storedEmails));
  }, [storedEmails]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowSuggestions(true);
  };

  const handleStoredEmailClick = (storedEmail) => {
    setEmail(storedEmail);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  const filteredSuggestions = storedEmails.filter((storedEmail) =>
    storedEmail.includes(email)
  );

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>doin' it - login</title>
      </Helmet>
      <div className="login-container">
        <h1>Welcome back!</h1>
        <div className="loginAll">
          <div className="inputs-box">
            <input
              type="text"
              className="login__textBox mail_txt"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              placeholder="Email Address"
              autoComplete="email"
            />
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                className="login__textBox2"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              <button
                onClick={togglePasswordVisibility}
                className={
                  showPassword ? "password_toggle_2" : "password_toggle_1"
                }
              >
                {showPassword ? "H" : "S"}
              </button>
            </div>
            <button
              className="login_btn"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </button>
            <button
              className="login_btn login__google"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
          </div>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div>
              <p>Suggested Emails:</p>
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleStoredEmailClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div>
            <Link to="/reset" className="forgot">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="newAccount">
          Don't have an account?{" "}
          <Link to="/register" className="newAccount_link">
            Register
          </Link>{" "}
          now.
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
