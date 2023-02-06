import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-title">
          <h1>ABOUT</h1>
          <h1>ME</h1>
        </div>
        <div className="about-text">
          <span>
            I'm a detail-oriented developer, always bringing a unique
            perspective to the team. <br />
            Self-starter and a fast learner, looking for a position where I can
            continue to grow as a developer. <br />
            <br />
            Check out my <span className="font-blue">skills</span> and
            <span className="font-blue"> projects</span> below!
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
