import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";
import "./Landing.css";
import { auth } from "./firebase";

function Landing() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <div>
        <h1>Landing</h1>
        <Link to="/login">Access your account</Link> now.
        </div>
      )}
    </div>
  );
}

export default Landing;
