import React from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import bank from "./bank.png";

function Home() {
  return (
    <Card
      bgcolor="warning"
      txtcolor="white"
      header="Bank of Anastasia"
      title="Welcome to the Bank of Anastasia!"
      text="Please create an account to begin"
      body={
        <>
          <img src={bank} style={{ maxHeight: "20em" }} alt="Bank imagery" />
          <br />
          <Link to="/CreateAccount" className="btn btn-light link">
            Create Account
          </Link>
          <> </>
          <Link to="/login" className="btn btn-light link">
            Login
          </Link>
        </>
      }
    />
  );
}

export default Home;
