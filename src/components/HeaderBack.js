import { Link } from "react-router-dom";
import "./HeaderBack.css";

function HeaderBack() {

  return (
    <div className="headerBack_parent">
      <Link to="/" className="headerBack_link">
        back home
      </Link>
    </div>
  );
}

export default HeaderBack;
