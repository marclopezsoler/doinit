import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Loader from "./components/Loader";
import {
  auth,
  db,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorName, setErrorName] = useState("");

  const checkData = () => {
    if (!name || !email || !password) {
      setErrorName("Please, complete all the fields");
      setTimeout(() => {
        setErrorName("");
      }, 5000);
    }
  };

  const register = () => {
    if (!name) {
      return;
    }

    registerWithEmailAndPassword(name, email, password)
      .then((userCredential) => {
        const userDocRef = doc(
          collection(db, "users"),
          userCredential.user.uid
        );
        setDoc(userDocRef, { name });
        addDoc(collection(db, "users"), { name, uid: userCredential.user.uid });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (loading);
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <motion.div
      className="container text-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>doin' it - sign up</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="register-container">
          <h1 className="register-title">Welcome to doin' it!</h1>
          <div className="registerAll">
            <div className="inputs-box">
              <input
                type="text"
                className="register__textBox nameTxt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                type="text"
                className="register__textBox mailBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  className="register__textBox2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                className="register__btn"
                onClick={() => {
                  register();
                  checkData();
                }}
              >
                Register
              </button>
              <button
                className="register__btn register__google"
                onClick={signInWithGoogle}
              >
                Register with Google
              </button>
            </div>
            <div className="goToLogin">
              Already have an account?{" "}
              <Link to="/login" className="login_link">
                Login
              </Link>{" "}
              now.
            </div>
          </div>
          {errorName ? (
            <div className="error-popup">
              <p>{errorName}</p>
            </div>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}

export default Register;
