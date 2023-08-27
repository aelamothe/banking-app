import React from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import bank from "./bank.png";

function Home() {
  return (
    <Card
      bgcolor="warning"
      txtcolor="white"
      header="Ana's Bank Landing Page"
      title="Welcome to Ana's bank!"
      text="Please create an account to begin"
      body={
        <>
          <img src={bank} className="img-fluid" alt="Responsive image" />
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
