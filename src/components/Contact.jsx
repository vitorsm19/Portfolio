import React from "react";
import "../css/Contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-container" id="contact">
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
      </div>
    </section>
  );
};

export default Contact;
