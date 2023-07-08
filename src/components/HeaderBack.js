import "./HeaderBack.css";
import logoIcon from "../assets/TODO-ICON.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";

function HeaderBack() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="headerBack_parent">
      <Link to="/" className="headerBack_link">
        back home
      </Link>
    </div>
  );
}

export default HeaderBack;
