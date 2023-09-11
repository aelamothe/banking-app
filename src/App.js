import "./App.css";
import "./components/navbar.css";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CurrentUser } from "./components/context";
import AllData from "./components/alldata";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navbar";
import Withdraw from "./components/withdraw";

function App() {
  // shared context is our set of users
  return (
    <HashRouter>
      <CurrentUser.Provider value={{ currUser: "" }}>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/alldata" element={<AllData />} />
        </Routes>
      </CurrentUser.Provider>
    </HashRouter>
  );
}

export default App;
