import React from "react";
import { Card } from "react-bootstrap";
import bank from "./bank.png";

function Home() {
  return (
    <Card
      bgcolor="warning"
      txtcolor="white"
      header="BadBank Landing Page"
      title="Welcome to the bank"
      text="You can use this bank"
      body={<img src={bank} className="img-fluid" alt="Responsive image" />}
    />
  );
}

export default Home;
