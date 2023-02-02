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
            <img src="/src/assets/hungary-flag.png" alt="Hungary flag" />
          </span>
        </div>
        <img src="/src/assets/about-pic.png" alt="Picture of Vitor Mesquita" />
      </div>
      <div className="hero-text">
        <p>Creative dev with a passion for crafting beautiful and </p>
        <Typewriter
          words={[
            "responsive web applications",
            "fast web applications",
            "accessible web applications",
          ]}
          loop={1}
          cursor
          cursorColor="#424dff"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
    </section>
  );
};

export default Hero;
