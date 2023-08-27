import "./App.css";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { UserContext, CurrentUser } from "./components/context";
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
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "abel",
              email: "abel@mit.edu",
              password: "secret",
              balance: 100,
            },
            {
              name: "a",
              email: "s",
              password: "d",
              balance: 200,
            },
          ],
        }}
      >
        <CurrentUser.Provider value={{ currUser: "" }}>
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount" component={CreateAccount} />
            <Route path="/login" component={Login} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/alldata" component={AllData} />
          </Routes>
        </CurrentUser.Provider>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
