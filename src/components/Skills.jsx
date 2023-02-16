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
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section className="skills">
      <div className="skills-container" id="skills">
        <motion.div
          className={"skills-text"}
          initial={{
            x: "-500px",
            opacity: 0,
          }}
          whileInView={{
            threshold: 0.35,
            opacity: 1,
            x: "0px", // This is the final position of the element
            transition: {
              duration: 1.2,
              ease: [0, 0.71, 0.2, 1.01],
            },
          }}
          viewport={{ once: false }}>
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
        </motion.div>
        <motion.div
          className={"skills-title"}
          initial={{
            x: "500px",
            opacity: 0,
          }}
          whileInView={{
            threshold: 0.35,
            opacity: 1,
            x: "0px", // This is the final position of the element
            transition: {
              duration: 1.2,
              ease: [0, 0.71, 0.2, 1.01],
            },
          }}
          viewport={{ once: false }}>
          <h1>TECH/</h1>
          <h1>STACK</h1>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
