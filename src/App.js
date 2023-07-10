import { AnimatePresence } from "framer-motion";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
import List from "./List";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="app">
      <AnimatePresence>
        <Router>
          <Routes>
            <Route exact path="/" element={<><Header /><Landing isLoading={loading} /><Footer isLoading={loading} /></>} />
            <Route exact path="/login" element={<><Header /><Login /></>} />
            <Route exact path="/register" element={<><Header /><Register /></>} />
            <Route exact path="/reset" element={<><Header /><Reset /></>} />
            <Route exact path="/dashboard" element={<><Header /><List isLoading={loading} /><Footer isLoading={loading} /></>} />
            <Route path='*' element={<Navigate to="/" />}/>
          </Routes>
        </Router>
      </AnimatePresence>
    </div>
  );
}

export default App;