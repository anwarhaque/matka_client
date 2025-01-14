import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MarqueeNotification from "../components/MarqueeNotification";


const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="marquee">
          <MarqueeNotification/>
        </div>
        <main className="content bg-cadetlightblue">
          <div className="container-fluid p-0">
            <Outlet /> {/* This renders the routed pages */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
