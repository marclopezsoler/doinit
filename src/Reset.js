import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>doin' it - reset</title>
      </Helmet>
      <div className="reset">
        <h2>Reset your password</h2>
        <div className="reset__container">
          <div className="inputs-box">
            <input
              type="text"
              className="reset__textBox mail_txt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <button
              className="reset__btn"
              onClick={() => sendPasswordReset(email)}
            >
              Send password reset email
            </button>
          </div>
          <div className="newAccount">
            Don't have an account?{" "}
            <Link to="/register" className="newAccount_link">
              Register
            </Link>{" "}
            now.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Reset;
