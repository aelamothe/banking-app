import "../App.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#/">
        Ana's Bank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link " href="#/CreateAccount/">
            Create Account
          </a>
          <a className="nav-item nav-link" href="#/login/">
            Login
          </a>
          <a className="nav-item nav-link" href="#/deposit/">
            Deposit
          </a>
          <a className="nav-item nav-link" href="#/withdraw/">
            Withdraw
          </a>
          <a className="nav-item nav-link" href="#/alldata/">
            All Data
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
