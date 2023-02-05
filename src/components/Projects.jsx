import React from "react";
import "../css/Projects.css";

const Projects = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="face face1">
          <div className="content"></div>
        </div>
        <div className="todo face face2">
          <div className="content">
            <p className="proj-detail">project details</p>
            <a href="#" type="button">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
