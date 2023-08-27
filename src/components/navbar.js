import "./navbar.css";
import Tooltip from "./tooltip";
import { useState } from "react";
import logo from "./logo.png";

function NavBar() {
  const [active, setActive] = useState("");
  const handleClick = (event) => {
    setActive(event.target.id);
  };

  return (
    <nav>
      <div>
        <div>
          <Tooltip content="Home" direction="bottom">
            <img className="logo-img" src={logo} href="#/" />
          </Tooltip>
          <Tooltip content="Home" direction="bottom">
            <a
              onClick={handleClick}
              key={1}
              className={
                "bank-name nav-pill " + (active === "1" ? "active" : undefined)
              }
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
    </nav>
  );
}

export default NavBar;
