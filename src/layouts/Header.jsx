import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userPic from '../assets/img/user-pic.png';
import Axios from "../api/Axios";

const Header = () => {

  const dropdownRef = useRef(null);

  const handleDropDownToggle = () => {
    dropdownRef.current.classList.toggle("show");
  };

  const handleToggle = () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
  };

  const { currentUser, setCurrentUser } = useAuth();


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

  const getProfile = async () => {
    const { data } = await Axios.get('client/getProfile'); // Use the Axios instance
    setCurrentUser(data);
  }

  useEffect(() => {
    getProfile()
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <Link className="sidebar-toggle js-sidebar-toggle" onClick={handleToggle}>
        <i className="hamburger align-self-center"></i>
      </Link>
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <div className="mt-2">
            <span>{currentUser?.userName} {currentUser?.name}</span>
            <span className="mx-3"><b>Limit : {currentUser?.limit} </b></span>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
