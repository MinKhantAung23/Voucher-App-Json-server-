import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Toaster position="right-top" />
    </main>
  );
};

export default Layout;
