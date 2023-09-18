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
<<<<<<< HEAD
import { GoogleOAuthProvider } from "@react-oauth/google";

const client_id =
  "614440106254-50kj27efhlrkmamgvg3vesvr4pk83cdr.apps.googleusercontent.com";
=======
>>>>>>> parent of 05a5d4d (Google Auth Login functionality added)

function App() {
  // shared context is our set of users
  return (
    <GoogleOAuthProvider clientId="client_id">
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
    </GoogleOAuthProvider>
  );
}

export default App;
