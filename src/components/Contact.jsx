import React from "react";
import "../css/Contact.css";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="contact">
      <motion.div
        className="contact-container"
        id="contact"
        initial={{
          y: "100px",
          opacity: 0,
        }}
        whileInView={{
          threshold: 0.1,
          opacity: 1,
          y: "0px", // This is the final position of the element
          transition: {
            duration: 1.2,
            ease: [0, 0.71, 0.2, 1.01],
          },
        }}
        viewport={{ once: false }}>
        <h1>Are you hiring?</h1>
        <p>
          I'm ready to join the team! Let's chat about how I can bring my skills
          to the table!
        </p>
        <p className="mobile-contact">
          Contact me on{" "}
          <a
            href="https://www.linkedin.com/in/vitormesquita19/"
            target="_blank"
            rel="noreferrer">
            {" "}
            LinkedIn
          </a>
          , <a href="mailto:vitormesquita190902@gmail.com">Email</a> or call me
          at <span className="font-blue">+36 20 598 4775</span>
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
