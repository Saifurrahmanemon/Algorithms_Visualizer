import React from "react";
import { AiFillGithub } from "react-icons/ai";
import "./Header.css";
const Header = () => {
    return (
        <header className="header-container">
            <h4 className="sorting-visualizer-title">
                Sorting Algorithms Visualizer
            </h4>
            <a href="https://github.com/Saifurrahmanemon/" target="_blank">
                <AiFillGithub className="github-icon" />
            </a>
        </header>
    );
};

export default Header;
