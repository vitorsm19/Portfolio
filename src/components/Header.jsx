import React from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCode,
  faSheetPlastic,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="header-container">
      <div className="header">
        <img
          src="https://github.com/vitorsm19/frontend-portfolio/blob/master/src/assets/logo.png?raw=true"
          alt="logo"
        />
        <nav className="menu">
          <ul className="menu-header">
            <li>
              <a href="#"></a>
              <span className="icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="nav-li-title">About Me</span>
            </li>
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faCode} />
              </span>
              <span className="nav-li-title">Skills</span>
            </li>
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faSheetPlastic} />
              </span>
              <span className="nav-li-title">Projects</span>
            </li>
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <span className="nav-li-title">Contact</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
