import React from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { UserContext, CurrentUser } from "./context";

function Transaction(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [transaction, setTransaction] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const ctx = React.useContext(UserContext);
  const loggedInStatus = React.useContext(CurrentUser);
  const thisUser = ctx.users.find(findUser);
  const transactionType = props.transactionType;

  function clearForm() {
    setTransaction(0);
    setShow(true);
  }

  function findUser(u) {
    console.log(u);
    return u.email === loggedInStatus.currUser;
  }
  function loggedIn() {
    // if not logged in, return
    if (!thisUser) {
      console.log(thisUser);
      console.log(loggedInStatus.currUser);
      setStatus("Error: please log in");
      setTimeout(() => setStatus(""), 1000);
      return false;
    }
    if (thisUser.balance) {
      console.log("supposedly we have a user");
      setTotalState(thisUser.balance);
      return true;
    }
    return false;
  }
  // validated transaction
  function validated(amount) {
    // update the total based on the logged in user's account
    console.log(loggedIn());
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

  // update total balance
  function handleSubmit(event) {
    console.log(ctx.users);

    // return early if any of the validation checks fail
    if (!loggedIn()) return;
    if (!validated(transaction)) return;
    event.preventDefault();
    // hide our initial form
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
