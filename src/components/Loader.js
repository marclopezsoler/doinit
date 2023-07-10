import "./Loader.css";
import loader from "../assets/loader.svg";

function Loader() {
  return (
    <div className="loading-parent">
      <img src={loader} className="loading-icon" />
    </div>
  );
}

export default Loader;