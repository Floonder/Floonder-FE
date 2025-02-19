import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/Accordion";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <h1 className="mt-2 text-bold text-blue">Welcome to Landing Page</h1>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
