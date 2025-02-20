import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/Accordion";
import Testimoni from "../components/Testimoni";
import Feature from "../components/Feature";
import Hero from "../components/Hero";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <Testimoni />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
