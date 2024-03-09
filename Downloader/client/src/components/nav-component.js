import React from "react";
import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/bucket">
                    BUCKET
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/object">
                    OBJECT
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/download">
                    DOWNLOAD
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
