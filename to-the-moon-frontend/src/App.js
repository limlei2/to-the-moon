import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage"

import Navbar from "./components/Navbar"
import LoggedInNavbar from "./components/LoggedInNavbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<NoPage />}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
