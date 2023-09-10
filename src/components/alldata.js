import React, { useState, useEffect } from "react";
import Card from "./card";

function AllData() {
  const [users, setUsers] = useState([]);
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
  };
  const headerRow = {
    fontWeight: "bold",
    color: "white",
    font: "3em",
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/users";
      console.log("Fetching data from URL:", url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error("Failed to fetch users, status:", response.status);
          const responseText = await response.text();
          console.error("Response text:", responseText);
          return;
        }

        const responseText = await response.text();
        try {
          const data = JSON.parse(responseText);
          setUsers(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          console.error("Response text:", responseText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              <div style={headerRow}>Balance</div>
            </div>
            <br />
            {users.map((user, i) => (
              <div style={gridStyles} key={i}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.password}</div>
                <div>${user.balance}</div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}

export default AllData;
