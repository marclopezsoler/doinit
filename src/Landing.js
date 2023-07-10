import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./Landing.css";
import brand1 from "./assets/amazon.svg";
import brand2 from "./assets/google-icon.svg";
import homeFirst from "./assets/home-first.png";
import brand3 from "./assets/nike.svg";
import secondary_image_1 from "./assets/secondary-image-1.png";
import secondary_image_2 from "./assets/secondary-image-2.png";
import brand4 from "./assets/shopify.svg";
import star from "./assets/star.svg";
import brand5 from "./assets/tesla.svg";
import Loader from "./components/Loader";
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
      {loading ? (
        <Loader />
      ) : (
        <div>
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
                {user ? (
                  <Link to="/dashboard" className="home-button" replace>
                    Start now
                  </Link>
                ) : (
                  <Link to="/login" className="home-button" replace>
                    Start now
                  </Link>
                )}
              </div>
              <img src={homeFirst} className="home-image-first" />
            </section>
            <section className="home-container2">
              <div className="home-content">
                <div className="reviews">
                  <p className="">300,000+ REVIEWS</p>
                  <div>
                    <img src={star} className="star" />
                    <img src={star} className="star" />
                    <img src={star} className="star" />
                    <img src={star} className="star" />
                    <img src={star} className="star" />
                  </div>
                  <p>App Store and Google Play</p>
                </div>
                <span className="separator"></span>
                <div className="brands">
                  <p>USED BY INDIVIDUALS AND TEAMS AT</p>
                  <div className="brand-logos">
                    <Link to="https://www.amazon.com/" target="_blank">
                      <img src={brand1} className="brand lg1" />
                    </Link>
                    <Link to="https://www.google.com/" target="_blank">
                      <img src={brand2} className="brand" />
                    </Link>
                    <Link to="https://www.nike.com/" target="_blank">
                      <img src={brand3} className="brand lg1" />
                    </Link>
                    <Link to="https://www.shopify.com/" target="_blank">
                      <img src={brand4} className="brand lg1" />
                    </Link>
                    <Link to="https://www.tesla.com/" target="_blank">
                      <img src={brand5} className="brand" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="home-container3">
              <div className="secondary-content">
                <div className="secondary-content-texts">
                  <p className="secondary-tag">Get more done</p>
                  <h2 className="secondary-title">
                    Add your tasks.
                    <br />
                    Organize your life.
                    <br />
                    Achieve more every day.
                  </h2>
                  <p className="secondary-text">
                    Add tasks like “Read work emails every day at 10am” to fill
                    your to-do list in seconds using Todoist’s powerful natural
                    language recognition and recurring dates.
                  </p>
                </div>
                <img src={secondary_image_1} className="secondary-image" />
              </div>
              <div className="secondary-content2">
                <img src={secondary_image_2} className="secondary-image" />
                <div className="secondary-content-texts">
                  <p className="secondary-tag">Clear your mind</p>
                  <h2 className="secondary-title">
                    Reach that mental clarity you’ve been longing for.
                  </h2>
                  <p className="secondary-text">
                    Your to-do lists are automatically sorted into Today,
                    Upcoming and custom Filter views to help you focus on your
                    most important things.
                  </p>
                </div>
              </div>
            </section>
            <section className="home-container4">
              <div className="home-container4-child">
                <h2>Achieve peace of mind with doin' it</h2>
                {user ? (
                  <Link to="/dashboard" className="home-button-2" replace>
                    Start free today
                  </Link>
                ) : (
                  <Link to="/login" className="home-button-2" replace>
                    Start free today
                  </Link>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Landing;
