import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userPic from '../assets/img/user-pic.png';

const Header = () => {

  const dropdownRef = useRef(null);

  const handleDropDownToggle = () => {
    dropdownRef.current.classList.toggle("show");
  };

  const handleToggle = () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
  };

  const auth = useAuth();

  const handleLogout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      dropdownRef.current.classList.remove("show");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <Link className="sidebar-toggle js-sidebar-toggle" onClick={handleToggle}>
        <i className="hamburger align-self-center"></i>
      </Link>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li><span>Limit : {auth?.currentUser?.limit} </span></li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle d-none d-sm-inline-block"
              data-bs-toggle="dropdown" to="#" onClick={handleDropDownToggle}>
              <img src={userPic} className="avatar img-fluid rounded-circle me-1"
                alt={auth?.currentUser?.name} /> <span className="text-dark">{auth?.currentUser?.name}</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-end" id="user-dropdown-menu"  ref={dropdownRef}>
              <Link className="dropdown-item" to="/profile"><i className="align-middle me-1"
                data-feather="user"></i> Profile</Link>
              <Link className="dropdown-item" to="/change-password"><i className="align-middle me-1"
                data-feather="pie-chart"></i> Change Password</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" onClick={handleLogout}>Log out</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
