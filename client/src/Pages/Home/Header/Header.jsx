import React from "react";
import { Button } from "../../../Components/ui/button";
import "./Header.css";
import { Link } from "react-router";

function Header() {
  return (
    <header className="flex items-center p-6 Header h-[80vh]">
      <div className="w-full max-w-4xl space-y-6 text-left md:w-5/6">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          Welcome to Greenfiy — Where Nature Meets Innovation
        </h1>
        <p className="text-lg leading-relaxed text-muted md:text-xl">
          “Discover, grow, and connect with a community that celebrates plants
          and sustainable living.”
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="text-white transition bg-lime-800 ">
            <Link to="/indoor">Explore Indoor Plants</Link>
          </Button>
          <Button className="transition bg-lime-400 text-lime-900 hover:bg-lime-300">
            <Link to="/outdoor">Explore outdoor Plants</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
