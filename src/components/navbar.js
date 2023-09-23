import React, { useState, useEffect, useCallback, useContext } from "react";
import { CurrentUser } from "./context";
import "./navbar.css";
import Tooltip from "./tooltip";
import logo from "./logo.png";
import { googleLogout } from "@react-oauth/google";

function NavBar() {
  const [active, setActive] = useState("");
  const [welcome, setWelcome] = useState("Welcome!");
  const [showLogout, setShowLogout] = useState(false);
  const loggedInStatus = useContext(CurrentUser);

  // Determines which link was clicked on
  const handleClick = (event) => setActive(event.target.id);

  // Fetch data
  const fetchUserData = useCallback(async (email) => {
    try {
      const response = await fetch(`/api/users/${email}`);
      const userData = await response.json();
      console.log("API response:", userData); // Log the entire response to check its structure

      if (userData && userData.name) {
        setWelcome("Hello " + userData.name + "!");
        setShowLogout(true);
        console.log(userData);
      } else {
        console.error("User data does not have a name property:", userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  console.log("Initial logged in status:", loggedInStatus.currUser);

  useEffect(() => {
    console.log("useEffect has been triggered");
    if (loggedInStatus && loggedInStatus.currUser) {
      console.log("Logged in status:", loggedInStatus);
      fetchUserData(loggedInStatus.currUser);
    }
  }, [fetchUserData, loggedInStatus.currUser]);

  const handleLogOut = () => {
    googleLogout();
    loggedInStatus.currUser = "";
    setWelcome("Welcome!");
    setShowLogout(false);
    console.log("LOGOUT SUCCESSFUL");
  };

  return (
    <nav>
      <div>
        <div>
          <img
            className="logo-img"
            src={logo}
            href="#/"
            alt="Bank of Anastasia"
          />
          <Tooltip content="Home" direction="bottom">
            <a
              onClick={handleClick}
              key={1}
              className={"bank-name nav-pill "}
              id={"1"}
              href="#/"
            >
              Bank of Anastasia
            </a>
          </Tooltip>
          <Tooltip content="Create Account" direction="bottom">
            <a
              onClick={handleClick}
              key={2}
              className={"nav-pill " + (active === "2" ? "active" : undefined)}
              id={"2"}
              href="#/CreateAccount/"
            >
              Create Account
            </a>
          </Tooltip>
          <Tooltip content="Login" direction="bottom">
            <a
              onClick={handleClick}
              key={3}
              className={"nav-pill " + (active === "3" ? "active" : undefined)}
              id={"3"}
              href="#/login/"
            >
              Login
            </a>
          </Tooltip>
          <Tooltip content="Deposit" direction="bottom">
            <a
              onClick={handleClick}
              key={4}
              className={"nav-pill " + (active === "4" ? "active" : undefined)}
              id={"4"}
              href="#/deposit/"
            >
              Deposit
            </a>
          </Tooltip>
          <Tooltip content="Login" direction="bottom">
            <a
              onClick={handleClick}
              key={5}
              className={"nav-pill " + (active === "5" ? "active" : undefined)}
              id={"5"}
              href="#/withdraw/"
            >
              Withdraw
            </a>
          </Tooltip>
          <Tooltip content="All Data" direction="bottom">
            <a
              onClick={handleClick}
              key={6}
              className={"nav-pill " + (active === "6" ? "active" : undefined)}
              id={"6"}
              href="#/alldata/"
            >
              All Data
            </a>
          </Tooltip>
        </div>
      </div>
      <span id="welcome-user" className="ms-auto">
        {welcome}
      </span>
      <span>
        {showLogout ? (
          <>
            <a href="#/" className="btn btn-light" onClick={handleLogOut}>
              Logout
            </a>
          </>
        ) : (
          <></>
        )}
      </span>
    </nav>
  );
}

export default NavBar;
