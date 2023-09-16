import React from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { CurrentUser } from "./context";

function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const loggedInStatus = React.useContext(CurrentUser);

  async function validate(email, password) {
    // check that fields have been populated
    if (!email || !password) {
      console.log("missing info");
      setStatus("Error: Enter all info");
      setTimeout(() => setStatus(""), 5000);
      return;
    }

    // check that email exists in our database
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        loggedInStatus.currUser = data.user.email;
        console.log("Login successful");
        setShow(false);
      } else {
        setStatus(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Server error");
    }
  }

  function handleSubmit() {
    console.log(email, password);
    // return early if any of the validation checks fail
    if (!validate(email, password)) return;

    // hide our initial form
    setShow(false);
  }

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleSubmit}
            >
              Log In
            </button>
            <> </>
            <Link to="/CreateAccount" className="btn btn-light">
              Create Account
            </Link>
          </>
        ) : (
          <>
            <h5>Success!</h5>
            <Link to="/deposit" className="btn btn-light">
              Deposit
            </Link>
            <> </>
            <Link to="/withdraw" className="btn btn-light">
              Withdraw
            </Link>
          </>
        )
      }
    />
  );
}

export default Login;
