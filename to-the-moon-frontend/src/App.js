import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage"
import StockPage from "./pages/StockPage"
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";

import Navbar from "./components/Navbars/Navbar"
import LoggedInNavbar from "./components/Navbars/LoggedInNavbar";

import { useSelector } from "react-redux";
import { selectUser } from "./store/userSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  return (
    <>
      <Router>
        <div className="App">
          {
            user ? (<LoggedInNavbar />) : (<Navbar />)
          }
          <Routes>
              <Route index element={<Home />}/>
              <Route path="/" element={<Home />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/portfolio" element={<Portfolio />}/>
              <Route path="/stock/:tickerSymbol" element={<StockPage />} />
              <Route path="*" element={<NoPage />}/>
          </Routes>
        </div>
      </Router>
      </>
  );
}

export default App;
