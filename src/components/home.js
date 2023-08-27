import React from "react";
import { Card } from "react-bootstrap";

function Home() {
  return (
    <Card
      bgcolor="warning"
      txtcolor="white"
      header="BadBank Landing Page"
      title="Welcome to the bank"
      text="You can use this bank"
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}

export default Home;
