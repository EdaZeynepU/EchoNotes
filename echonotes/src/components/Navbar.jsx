import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
    >
      <div className="container">
        <a className="navbar-brand" href="#">Echo Notes</a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link"
              >Anasayfa
                <span className="visually-hidden">(current)</span></Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Kavanozlar</a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownId"
              >
                <Link className="dropdown-item" to="/jars/1hours"
                >1 Saatlik Kavanoz</Link>
                <Link className="dropdown-item" to="/jars/3hours"
                >3 Saatlik Kavanoz</Link>
                <Link className="dropdown-item" to="/jars/8hours"
                >8 Saatlik Kavanoz</Link>
                <Link className="dropdown-item" to="/jars/24hours"
                >24 Saatlik Kavanoz</Link>
                <Link className="dropdown-item" to="/jars/done"
                >Tamamlananlar</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar