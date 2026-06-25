import "../designcomponentstyle/footer.css";
import { Link } from "react-router-dom";

import FooterLogo from "../../assets/footer-logo.png";
import FooterOverly from "../../assets/footer-overly.png";

function Footer() {
  return (
    <>
      <footer className="main-footer">
        <div className="container">
          <div className="row ">

            {/* Logo Section */}
            <div className="col-lg-3">
              <div className="footer-meta">
                <Link to="/" className="footer-logo">
                  <img
                    src={FooterLogo}
                    alt="TCI Dental Lab"
                  />
                </Link>

                <p>
                  TCI Dental Lab is a full-service dental
                  laboratory providing advanced dental
                  products and restorations. With facilities
                  in Beirut and Brussels, we combine
                  expertise with digital CAD/CAM technology.
                </p>

                <ul className="social-links">
                  <li>
                    <a
                      href="https://www.facebook.com/TCIdental"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.instagram.com/tcidental/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://wa.me/96170144044"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-3">
              <div className="footer-meta  quick-links-meta">
                <h4>Quick Links</h4>

                <ul className="quick-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/lab-services">Lab Services</Link></li>
                  <li><Link to="/submit-case">Submit a Case</Link></li>
                  <li><Link to="/clinical-support">Clinical Support</Link></li>
                  <li><Link to="/pricing">Pricing</Link></li>
                  <li><Link to="/our-solutions">Our Solutions</Link></li>
                </ul>
              </div>
            </div>

            {/* Brussels */}
            <div className="col-lg-3 col-md-5">
              <div className="footer-meta">
                <h4>Brussels – Belgium</h4>

                <ul className="personal-information">
                  <li>
                    <p>
                      <a href="#">
                        31 Rue Du Saphir 1030 Brussels
                      </a>
                    </p>
                  </li>

                  <li>
                    <p>
                      <a href="tel:+3227348565">
                        Tel: +32 2 734 85 65
                      </a>

                      <br />

                      <a href="tel:+32475263026">
                        Mob: +32 475 263 026
                      </a>
                    </p>
                  </li>

                  <li>
                    <a href="mailto:info@tcidental.com">
                      info@tcidental.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Beirut */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-meta">
                <h4>Beirut – Lebanon</h4>

                <ul className="personal-information">
                  <li>
                    <p>
                      <a href="#">
                        Zalka Highway – Amaret Chalhoub
                        Nora Building
                      </a>
                    </p>
                  </li>

                  <li>
                    <p>
                      <a href="tel:+9611903300">
                        Tel: +961 1 903 300
                      </a>

                      <br />

                      <a href="tel:+96170144044">
                        Mob: +961 70 144 044
                      </a>
                    </p>
                  </li>

                  <li>
                    <a href="mailto:sales@tcidental.com">
                      sales@tcidental.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="copy-right-section">
            <p>
              Copyright © 2025 TCI Dental Labs.
              All Rights Reserved.
            </p>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>
          </div>

          <div className="footer-overly-img">
            <img
              src={FooterOverly}
              alt="Footer Background"
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;