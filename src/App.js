import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
import List from "./List";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Header from "./components/Header";
import Features from "./Features";
import Pricing from "./Pricing";
import Platform from "./Platform";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={<><Header /><Landing /></>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<><Header /><List /></>} />
            <Route exact path="/features" element={<><Header /><Features /></>} />
            <Route exact path="/pricing" element={<><Header /><Pricing /></>} />
            <Route exact path="/platform" element={<><Header /><Platform /></>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;