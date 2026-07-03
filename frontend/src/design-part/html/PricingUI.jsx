
import { useState, useEffect } from "react";
import AboutSectionImg from "../../assets/about-section-img.png";
import ContactOverly from "../../assets/contact-overly.png";
import ExpertImg from "../../assets/expert-img.png";
import ExtraOverly from "../../assets/extra-overly.png";
import FooterLogo from "../../assets/footer-logo.png";
import FooterOverly from "../../assets/footer-overly.png";
import LeefImg from "../../assets/leef-img.png";
import PricingImg from "../../assets/pricing-img.png";
import PricingBanner from "../../assets/pricing-banner.png";
import SolutionImg from "../../assets/solution-img.png";
import TciBanner from "../../assets/tci-banner.png";
import TCILogo from "../../assets/TCI-logo.png";
import Header from "../Design-Component/Header";
import ContactUs from "../Design-Component/ContactUs";
import Footer from "../Design-Component/Footer";
import "../../design-part/style/home.css";
import { Link } from "react-router-dom";

function PricingUI() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <Header />
            <section className="all-banner">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-lg-11">
                            <div className="all-banner-meta">
                                <div className="all-banner-content">
                                    <ul className="banner-nav">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="" className="active">Pricing</Link></li>
                                    </ul>
                                    <h1>Pricing</h1>
                                </div>
                                <div className="all-banner-img">
                                    <img src={PricingBanner} alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pricing-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-11">
                            <div className="pricing-section-meta">
                                <div className="pricing-section-left">
                                    <Link to="/login" className="pricing-section-img">
                                        <img src={PricingImg} alt="" />
                                    </Link>
                                    <Link to="/login" className="get-start-icon"><i className="bi bi-arrow-right"></i></Link>

                                </div>
                                <div className="pricing-section-right">
                                    <h3>Pricing</h3>
                                    <h5>Getting Started Is Easy</h5>
                                    <p>Create your TCI Connect account and log in to submit your first case. Our pricing is
                                        competitive and transparent. After your registration is approved, our team will send you Link
                                        personalized price list giving you all the details you need to order with confidence.</p>
                                    <p>Enjoy Link smooth onboarding experience, clear communication, and fast access to everything you
                                        need to get started.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs />
            <Footer />
        </>
    )
}
export default PricingUI;