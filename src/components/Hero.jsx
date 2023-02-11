import React from "react";
import "../css/Hero.css";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-title">
          <span className="name">Hey, I'm Vitor Mesquita</span>
          <h1 className="front">FRONTEND</h1>
          <h1 className="dev">DEVELOPER</h1>
          <span className="location">
            Located in Budapest{" "}
            <img
              src="https://github.com/vitorsm19/frontend-portfolio/blob/master/src/assets/hungary-flag.png?raw=true"
              alt="Hungary flag"
            />
          </span>
        </div>
        <img
          src="https://github.com/vitorsm19/frontend-portfolio/blob/master/src/assets/about-pic.png?raw=true"
          alt="Picture of Vitor Mesquita"
        />
      </div>
      <div className="hero-text">
        <p>Creative dev with a passion for building beautiful and </p>
        <Typewriter
          className="typewriter"
          words={[
            "responsive",
            "interactive",
            "user-friendly",
            "intuitive",
            "pixel-perfect",
          ]}
          loop={5}
          typeSpeed={100}
          deleteSpeed={60}
          delaySpeed={3000}
        />
        <p> web applications</p>
      </div>
    </section>
  );
};

export default Hero;
