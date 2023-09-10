import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { CurrentUser } from "./context";

function Transaction(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [transaction, setTransaction] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const loggedInStatus = React.useContext(CurrentUser);
  const [thisUser, setThisUser] = React.useState(null);
  const transactionType = props.transactionType;

  const fetchUserData = useCallback(async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${email}`);
      const userData = await response.json();
      setThisUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setStatus("Error fetching user data.");
    }
  }, []);

  React.useEffect(() => {
    fetchUserData(loggedInStatus.currUser);
  }, [loggedInStatus.currUser, fetchUserData]);

  async function updateBalance(email, newBalance) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/updateBalance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newBalance }),
        }
      );

      const data = await response.json();
      console.log("Balance updated on server:", data);
    } catch (error) {
      console.error("Error updating balance on server:", error);
      setStatus("Error updating balance on server.");
    }
  }

  function clearForm() {
    setTransaction(0);
    setShow(true);
  }

  function loggedIn() {
    if (!thisUser) {
      setStatus("Error: please log in");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    if (thisUser.balance !== undefined) {
      setTotalState(thisUser.balance);
      return true;
    }
    return false;
  }

  function validated(amount) {
    if (!(transactionType === "deposit" || transactionType === "withdraw")) {
      setStatus("Select a valid transaction");
      return false;
    }
    if (transactionType === "withdraw" && amount > thisUser.balance) {
      setStatus("Overdraft warning");
      return false;
    }
    if (amount <= 0) {
      setStatus("Please enter a number greater than 0");
      return false;
    }

    thisUser.balance = Number(thisUser.balance);
    amount = Number(amount);

    if (transactionType === "withdraw") thisUser.balance -= amount;
    else thisUser.balance += amount;
    setTotalState(thisUser.balance);

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!loggedIn()) return;
    if (!validated(transaction)) return;
    updateBalance(loggedInStatus.currUser, thisUser.balance);
    setShow(false);
  }

  // if show = false, provide option to submit another transaction
  return (
    <Card
      bgcolor={props.color}
      header={transactionType.toUpperCase()}
      status={status}
      text={
        <>Current Balance: ${loggedIn && thisUser ? thisUser.balance : 0}</>
      }
      body={
        loggedIn ? (
          show ? (
            <>
              Transaction Amount
              <br />
              <input
                type="number"
                className="form-control"
                id="transaction"
                placeholder="Transaction Amount"
                value={transaction}
                onChange={(e) => {
                  setTransaction(e.currentTarget.value);
                }}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleSubmit}
                disabled={!validated}
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <h5>Success!</h5>
              <p>Your new balance is ${totalState}</p>
              <p>Would you like to make another transaction?</p>
              <Link to="/deposit" className="btn btn-light" onClick={clearForm}>
                Deposit
              </Link>
              <> </>
              <Link
                to="/withdraw"
                className="btn btn-light"
                onClick={clearForm}
              >
                Withdraw
              </Link>
              <br />
              <br />
              <Link to="/CreateAccount" className="btn btn-light">
                Logout
              </Link>
            </>
          )
        ) : (
          <>
            <h5>Please log in!</h5>
            <br />
            <> </>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </>
        )
      }
    />
  );
}

export default Transaction;
