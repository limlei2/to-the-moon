import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage"
import StockPage from "./pages/StockPage"
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbars/Navbar"
import LoggedInNavbar from "./components/Navbars/LoggedInNavbar";

import { useSelector } from "react-redux";
import { selectUser } from "./store/userSlice";

import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAutoLogout from "./hooks/useAutoLogout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const user = useSelector(selectUser);
  useAutoLogout();
  
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

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PrivateRoute>
                    <Portfolio />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stock/:tickerSymbol"
                element={
                  <PrivateRoute>
                    <StockPage />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NoPage />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={1500} />
      </>
  );
}

export default App;
