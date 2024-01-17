import React from 'react'

const usrname = localStorage.getItem('username');
const usrpass = localStorage.getItem('password');
const role = localStorage.getItem('role');

const Header = () => {
  return (
    <div>
        <header>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
  <a className="navbar-brand" href="/">Travel Plan Management</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      {role ? (
      <a className="nav-item nav-link" href="/employee">Employee</a>
      ) : null}
      {role ? (
      <a className="nav-item nav-link" href="/travel">Travel</a>
      ) : null}
      {role ? (
      <a className="nav-item nav-link" href="/assoc">Association</a>
      ) : null}
      {role ? (
      <a className="nav-item nav-link" href="/logout">Logout</a>
      ) : null}
      {role ? (
      <a className="nav-item nav-link disabled text-danger ml-auto" href="#">{usrname} ({role.toLowerCase()})</a>
      ) : null}
    </div>
  </div>
</nav>
        </header>
    </div>
  )
}

export default Header