import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  db,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const register = () => {
    if (!name) {
      alert("Please enter name");
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
    if (loading) return;
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
      <div className="register-container">
        <h1>Welcome to doin' it!</h1>
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
            <button className="register__btn" onClick={register}>
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
            Already have an account? <Link to="/login" className="login_link">Login</Link> now.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
