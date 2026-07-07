import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import "../../design-part/designcomponentstyle/header.css";
import TCILogo from "../../assets/TCI-logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <header
        className={`main-header tci-header ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="container">
          <nav className="navbar navbar-expand-xl w-100 tci-navbar">
            <NavLink className="navbar-brand  flex-shrink-0" to="/">
              <img
                src={TCILogo}
                alt="TCI Connect"
                className="logo-img"
              />
            </NavLink>

            <div className="tci-main-menus flex-grow-1 d-flex justify-content-center">
              <div
                className="collapse navbar-collapse justify-content-center tci-navbar-collapse"
                id="navbarSupportedContent"
              >

                <ul className="navbar-nav tci-navbar-nav">

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"

                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/about-us"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      About Us
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/lab-services"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      Lab Services
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/submit-case"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      Submit a Case
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/clinical-support"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      Clinical Support
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/pricing"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      Pricing
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/our-solutions"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      Our Solutions
                    </NavLink>
                  </li>

                  <li className="nav-item tci-nav-item">
                    <NavLink
                      to="/contact-us"
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link tci-nav-link active"
                          : "nav-link tci-nav-link"
                      }
                    >
                      Contact Us
                    </NavLink>
                  </li>

                </ul>
              </div>
            </div>
            <div className="d-flex align-items-center flex-shrink-0">
              <Link to="/login" className="login-btn tci-login-btn"><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9 8.99999C11.2091 8.99999 13 7.20913 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20913 6.79086 8.99999 9 8.99999Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              </Link>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

          </nav>
        </div>
      </header >

    </>
  );
}

export default Header;