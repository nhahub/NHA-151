import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Common/Navbar/Navbar";
import Footer from "@/Components/Common/Footer/Footer";
import ScrollToTop from "@/Components/Common/ScrollToTop/ScrollToTop";

function Main() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {navigation.state === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default Main;
