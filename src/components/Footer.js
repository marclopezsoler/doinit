import React from "react";
import "./Footer.css";

function Footer({ isLoading }) {
  return (
    <>
      {window.location.pathname === "/" ? (
        <div className={`footer footer-home ${isLoading ? "show" : "hide"}`}>
          <p className="footer-text">
            Webiste created by{" "}
            <a
              className="footer-text footer-link-home"
              href="https://marclopez.oddsolutionslab.com"
              target="_blank"
            >
              Marc López
            </a>
          </p>
        </div>
      ) : (
        <div className={`footer footer-dashboard ${isLoading ? "show" : "hide"}`}>
          <p className="footer-text">
            Webiste created by{" "}
            <a
              className="footer-text footer-link-dashboard"
              href="https://marclopez.oddsolutionslab.com"
              target="_blank"
            >
              Marc López
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default Footer;
