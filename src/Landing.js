import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { Link, Navigate } from "react-router-dom";
import "./Landing.css";
import { auth } from "./firebase";

function Landing() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>doin' it - welcome</title>
      </Helmet>
      <div>
        {user ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <div>
            <section className="home-container">
              <div className="first-part">
                <h1 className="home-title">make your own to do list</h1>
                <Link to="/login" className="home-button">
                  Start now
                </Link>
              </div>
            </section>
            <section className="home-container2"></section>
            <section className="home-container3"></section>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Landing;
