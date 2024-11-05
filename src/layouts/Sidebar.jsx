import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current route path

  // Helper function to check if the path matches
  const isActive = (path) => location.pathname === path;
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/">
          <span className="align-middle"><img src="/img/logo.png" alt="Logo" style={{ width: "100%" }} /></span>
        </Link>

        <ul className="sidebar-nav">
          <li className={`sidebar-item ${isActive("/drow") ? "active" : ""}`}>
            <Link className="sidebar-link" to="/drow">
              <i className="align-middle" data-feather="user"></i> <span className="align-middle">Drow</span>
            </Link>
          </li>

          <li className={`sidebar-item ${isActive("/report") ? "active" : ""}`}>
            <Link className="sidebar-link" to="/report">
              <i className="align-middle" data-feather="user"></i> <span className="align-middle">Report</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isActive("/ledger") ? "active" : ""}`}>
            <Link className="sidebar-link" to="/ledger">
              <i className="align-middle" data-feather="user"></i> <span className="align-middle">Ledger</span>
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;