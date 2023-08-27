import React from "react";
import Card from "./card";
import { UserContext, CurrentUser } from "./context";

function AllData() {
  const ctx = React.useContext(UserContext);
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  };
  const headerRow = {
    fontWeight: "bold",
    color: "white",
    font: "3em",
  };

  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="Bank of Anastasia"
      title="User Data"
      body={
        <>
          <br />
          <div>
            <div style={gridStyles}>
              <div style={headerRow}>Name</div>
              <div style={headerRow}>Email</div>
              <div style={headerRow}>Password</div>
            </div>
            <br />
            {ctx.users.map((user, i) => (
              <div style={gridStyles} key={i}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.password}</div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}

export default AllData;
