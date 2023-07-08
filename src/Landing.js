import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { Link, Navigate } from "react-router-dom";
import "./Landing.css";
import homeFirst from "./assets/home-first.png";
import star from "./assets/star.svg";
import { auth } from "./firebase";
import brand1 from "./assets/amazon.svg";
import brand2 from "./assets/google-icon.svg";
import brand3 from "./assets/nike.svg";
import brand4 from "./assets/shopify.svg";
import brand5 from "./assets/tesla.svg";

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
                <h1 className="home-title">
                  Organize your <br /> work and life, finally.
                </h1>
                <p className="home-text">
                  Become focused, organized, and calm with doin' it. The world’s
                  #1 task manager and to-do list app.
                </p>
                <Link to="/login" className="home-button">
                  Start now
                </Link>
              </div>
              <img src={homeFirst} className="home-image-first" />
            </section>
            <section className="home-container2">
              <div className="home-content">
                <div className="reviews">
                  <p className="">300,000+ REVIEWS</p>
                  <div>
                    <img src={star} className="star"/>
                    <img src={star} className="star"/>
                    <img src={star} className="star"/>
                    <img src={star} className="star"/>
                    <img src={star} className="star"/>
                  </div>
                  <p>App Store and Google Play</p>
                </div>
                <div className="brands">
                  <p>USED BY INDIVIDUALS AND TEAMS AT</p>
                  <div className="brand-logos">
                    <img src={brand1} className="brand lg1"/>
                    <img src={brand2} className="brand"/>
                    <img src={brand3} className="brand lg1"/>
                    <img src={brand4} className="brand lg1"/>
                    <img src={brand5} className="brand"/>
                  </div>
                </div>
              </div>
            </section>
            <section className="home-container3"></section>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Landing;
