import React from "react";
import "../css/Projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const Project = (props) => {
  return (
    <div className="proj-card">
      <div className="face card-cover" id={props.name}>
        {props.empty}
      </div>
      <div className="face card-content">
        <div className="proj-content">
          <p className="proj-details">{props.text}</p>
          <div className="proj-links">
            <a
              target={"_blank"}
              href={`https://github.com/vitorsm19/${props.repoName}`}
              type="button"
            >
              Repository
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </a>
            <a target={"_blank"} href={props.link} type="button">
              Live
              <FontAwesomeIcon icon={faLink} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/vitorsm19/repos")
      .then((response) => {
        setRepos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching repos", error);
      });
  }, []);

  return (
    <section className="projects">
      <motion.div
        className="proj-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, threshold: 0.35 }}
        viewport={{ once: false }}
        delay={{ duration: 0.5 }}
        transition={{ duration: 1 }}
      >
        <h1>PROJECTS</h1>
      </motion.div>
      <motion.div
        className="proj-container"
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, threshold: 0.35 }}
        viewport={{ once: false }}
        delay={{ duration: 0.5 }}
        transition={{ duration: 1 }}
      >
        <Glider
          hasArrows
          slidesToShow={1}
          slidesToScroll={1}
          scrollLock
          hasDots
          iconRight={<FontAwesomeIcon icon={faChevronRight} />}
          iconLeft={<FontAwesomeIcon icon={faChevronLeft} />}
          duration={1}
          responsive={[
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {/* <Project
            title="WhatsOnForToday?"
            name="todo"
            repoName="WhatsOnForToday"
            link="https://woftoday.vercel.app/"
            text="To-do List made with HTML, CSS, JavaScript and React (useState and useEffect Hooks)"
          />
          <Project
            title="Mozify"
            name="mozify"
            repoName="Mozify"
            link="https://mozify.vercel.app/"
            text="Movies catalog app made with HTML, CSS, JavaScript and React Hooks (useState, useEffect, useParams Hooks), API fetch with Axios and  LocalStorage.
            "
          />
          
          <Project name="next" repoName="" empty="In progress..." /> */}
          {repos
            .filter((repo) => {
              return repo.stargazers_count !== 0 && repo.name !== "Portfolio";
            })
            .map((repo) => (
              <Project
                key={repo.id}
                title={repo.name}
                name={repo.name}
                repoName={repo.name}
                link={repo.html_url}
                text={repo.description}
              />
            ))}
            <Project name="next" repoName="" empty="In progress..." />
            <Project name="next" repoName="" empty="In progress..." />
        </Glider>
      </motion.div>
    </section>
  );
};

export default Projects;
