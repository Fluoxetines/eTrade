import React from "react";
import Hero from "./Hero";
import Navbar from "../components/Navbar";
import Category from "../components/Category";

const Home = () => {
  return (
    <>
      <div className="bg-[#f9f3f0]">
        <Navbar />
        <Hero />
      </div>
      <main className="container">
        <Category />
      </main>
    </>
  );
};

export default Home;
