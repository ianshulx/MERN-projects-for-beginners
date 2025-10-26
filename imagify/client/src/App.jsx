import React, { useContext } from "react";
import Home from "./Pages/Home";
import BuyCredit from "./Pages/BuyCredit";
import Result from "./Pages/Result";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import { AppContext } from "./context/AppContext";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const { ShowLogin } = useContext(AppContext);
  return (
    <div className="w-full min-h-screen px-28 relative bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position="bottom-right" />
      <NavBar />
      <Login />
      {!ShowLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
      ) : (
        ""
      )}

      <Footer />
    </div>
  );
};

export default App;
