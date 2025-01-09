import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from '../assets/img/logo.png';
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation(); // Get the current route path

  const { logout } = useAuth();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };
  // Helper function to check if the path matches
  const isActive = (path) => location.pathname.startsWith(path);
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/">
          <span className="align-middle"><img src={logoImg} alt="Logo" style={{ width: "100%" }} /></span>
        </Link>

        <ul className="sidebar-nav">
          <li className={`sidebar-item ${isActive("/drow") ? "active" : ""}`}>
            <Link className="sidebar-link material-icons" to="/drow">
              <i className="align-middle fa fa-book" data-feather="user"></i> <span className="align-middle">Drow</span>
            </Link>
          </li>

          <li className={`sidebar-item ${isActive("/report") ? "active" : ""}`}>
            <Link className="sidebar-link" to="/report">
              <i className="align-middle fa fa-file-text  material-icons" data-feather="user"></i> <span className="align-middle">Report</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isActive("/display") ? "active" : ""}`}>
            <Link className="sidebar-link" to="/display">
              <i className="align-middle fa fa-history material-icons" data-feather="user"></i> <span className="align-middle">Display</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isActive("/change-password") ? "active" : ""}`}>
            <Link className="sidebar-link" to="/change-password">
              <i className="align-middle fa fa-key material-icons" data-feather="user"></i> <span className="align-middle">Change Password</span>
            </Link>
          </li>
          <li className={`sidebar-item`}>
            <Link onClick={handleLogout} className="sidebar-link">
              <i className="align-middle fa fa-sign-out" ></i> <span className="align-middle">Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
