import { useState } from "react";
import "./css/App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
    <Hero />
        <section className="about">
          <div className="about-title">
            <h1>About Me</h1>
          </div>
        </section>
        <section className="skills">
          <h2>Tech/Stack</h2>
        </section>
        <section className="projects">
          <h2>Projects</h2>
        </section>
      </main>
      <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="6.29"
            numOctaves="6"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </div>
  );
}

export default App;
