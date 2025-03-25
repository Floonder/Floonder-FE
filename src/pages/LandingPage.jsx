import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/Accordion";
import Testimoni from "../components/Testimoni";
import Feature from "../components/Feature";
import Hero from "../components/Hero";

const LandingPage = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Navbar />
      <div className="space-y-0">
        {" "}
        <Hero />
        <Feature />
        <Testimoni />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
