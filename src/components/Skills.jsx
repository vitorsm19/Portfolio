import React from "react";
import "../css/Skills.css";
import {
  Html,
  Css,
  Javascript,
  Reactjs,
  Angular,
  Node,
  Tailwind,
  Bootstrap,
  Csharp,
  Dotnet,
  Jquery,
} from "../components/SkillsLogo.jsx";

const Skills = () => {
  return (
    <section className="skills">
      <div className="skills-container">
        <div className="skills-text">
          <p className="first">Focused on</p>
          <div className="logos">
            <Html />
            <Css />
            <Javascript />
            <Reactjs />
          </div>
          <p className="second">but also knowledgeable in</p>
          <div className="other-logos">
            <Angular />
            <Node />
            <Tailwind />
            <Bootstrap />
            <Csharp />
            <Dotnet />
            <Jquery />
          </div>
        </div>
        <div className="skills-title">
          <h1>TECH/</h1>
          <h1>STACK</h1>
        </div>
      </div>
    </section>
  );
};

export default Skills;
