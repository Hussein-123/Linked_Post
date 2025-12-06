import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="page-shell min-h-[70vh]">
        <Outlet></Outlet>
      </main>
    </>
  );
}
