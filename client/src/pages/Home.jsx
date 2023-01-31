import React from "react";
import Hero from "./Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="bg-[#f9f3f0]">
        <Navbar />
        <Hero />
      </div>
    </>
  );
};

export default Home;
