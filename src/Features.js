import "./Features.css";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function Features() {
  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>doin' it - features</title>
      </Helmet>
      <div>
        <p>FEATURES</p>
      </div>
    </motion.div>
  );
}

export default Features;
