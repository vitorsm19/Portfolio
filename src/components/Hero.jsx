import React from "react";
import "../css/Hero.css";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      whileInView={{
        threshold: 0.35,
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: [0, 0.71, 0.2, 1.01],
        },
      }}
      viewport={{ once: false }}
      delay={{ duration: 0.5 }}>
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
    </motion.section>
  );
};

export default Hero;
