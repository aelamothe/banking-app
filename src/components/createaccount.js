import React from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { UserContext } from "./context";
import * as yup from "yup";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  // defining yup schema to validate our form
  const userSchema = yup.object().shape({
    // name can not be an empty string
    name: yup.string().required(),
    // email can not be an empty string and cannot be a duplicate
    email: yup
      .string()
      .email()
      .required()
      .test("is-unique", "Email already exists. Please log in.", (value) => {
        let duplicate = ctx.users.map((a) => a.email);
        return duplicate.indexOf(value) === -1;
      }),
    // password can not be an empty string. Also, we have used the `min` function to set the minimum length of the password. Yup passwords by default handle the conditions of at least one upper case, at least one lower case, and at least one special character in the password
    password: yup.string().min(8).required(),
  });

  // Function which will validate the input data whenever submit button is clicked.
  async function validated() {
    // creating a form data object
    let newAccount = {
      name: name,
      email: email,
      password: password,
    };

    userSchema
      .validate(newAccount)
      .then(function (value) {
        console.log(value); // new account info
        setDisabled(false);
      })
      .catch(function (err) {
        setStatus(err.errors[0]);
        setDisabled(true);
        setTimeout(() => status, 5000);
      });

    console.log(disabled);
  }
  /*
  function handleSubmit() {
    console.log(name, email, password);
    // if all is validated, then add the users to our contextual list  of users

    validated();
    if (!disabled) {
      ctx.users.push({ name, email, password, balance: 100 });
      console.log(ctx.users);
      // hide our initial form
      setShow(false);
    }
  }
  */

  async function handleSubmit() {
    console.log(name, email, password);
    await validated();
    // if all is validated, then add the users to our contextual list  of users
    if (!disabled) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        // handles error responses that may not be in JSON format
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setShow(false);
        } else {
          const text = await response.text();
          setStatus(text || "Error creating account");
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus("Error creating account");
      }
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  // if show=true, show the form for creating an account
  // else, clear form and provide option to submit a new response
  // empty tags <> because react requires a parent/ container element for components
  return (
    <Card
      bgcolor="dark"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
                validated();
              }}
            />
            <br />
            Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                validated();
              }}
            />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                validated();
              }}
            />
            <br />
            <button
              type="submit"
              id="submit-btn"
              className={"btn btn-light "}
              onClick={handleSubmit}
              disabled={disabled}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
            <> </>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}

export default CreateAccount;
