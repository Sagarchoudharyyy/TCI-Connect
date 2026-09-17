
import { Link } from "react-router-dom";
import "../designcomponentstyle/footer.css";

import FooterLogo from "../../assets/footer-logo.png";
import FooterOverly from "../../assets/footer-overly.png";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">

          {/* Logo Section */}
          <div className="col-lg-4 col-md-12">
            <div className="footer-meta">

              <div className="footer-logo">
                <img src={FooterLogo} alt="TCI Dental Labs" />
              </div>

              <p>
                TCI Dental Lab is a full-service dental laboratory
                providing advanced dental products and restorations.
                With facilities in Beirut and Brussels, we combine
                expertise with digital CAD/CAM technology.
              </p>

              <ul className="social-links">
                <li>
                  <a href="#">
                    <FaFacebookF />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <FaInstagram />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <FaWhatsapp />
                  </a>
                </li>
              </ul>

            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4">
            <div className="footer-meta">

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

          {/* Belgium */}
          <div className="col-lg-3 col-md-4">
            <div className="footer-meta">

              <h4>Brussels – Belgium</h4>

              <ul className="personal-information">

                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <a href="#">
                    31 Rue Du Saphir 1030 Brussels
                  </a>
                </li>

                <li>
                  <FaPhoneAlt className="contact-icon" />
                  <div>
                    <a href="tel:+3227348565">
                      Tel: +32 2 734 85 65
                    </a>

                    <br />

                    <a href="tel:+32475263026">
                      Mob: +32 475 263 026
                    </a>
                  </div>
                </li>

                <li>
                  <MdEmail className="contact-icon" />
                  <a href="mailto:info@tcidental.com">
                    info@tcidental.com
                  </a>
                </li>

              </ul>

            </div>
          </div>

          {/* Lebanon */}
          <div className="col-lg-3 col-md-4">
            <div className="footer-meta">

              <h4>Beirut – Lebanon</h4>

              <ul className="personal-information">

                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <a href="#">
                    Zalka Highway – Amaret Chalhoub Nora Building
                  </a>
                </li>

                <li>
                  <FaPhoneAlt className="contact-icon" />
                  <div>
                    <a href="tel:+9611903300">
                      Tel: +961 1 903 300
                    </a>

                    <br />

                    <a href="tel:+96170144044">
                      Mob: +961 70 144 044
                    </a>
                  </div>
                </li>

                <li>
                  <MdEmail className="contact-icon" />
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
            Copyright © 2026 TCI Dental Labs. All Rights Reserved.
          </p>
          <Link className="link-privacy" to="/privacy-policy">
            Privacy Policy
          </Link>



        </div>

        <div className="footer-overly-img">
          <img src={FooterOverly} alt="" />
        </div>

      </div>
    </footer>
  );
}

export default Footer;