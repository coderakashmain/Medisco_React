import React from "react";
import { Outlet } from "react-router-dom";

const BpDashboard = () => {
  const businessdata = JSON.parse(localStorage.getItem("bpdata"));



  return (
    <div className="sm:pt-100 pt-80 sm:pt-60 lg:pt-80 min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Welcome Section */}
       

      <Outlet/>
      </div>
    </div>
  );
};

export default BpDashboard;
