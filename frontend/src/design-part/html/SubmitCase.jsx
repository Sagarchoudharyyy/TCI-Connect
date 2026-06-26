import Header from "../Design-Component/Header";
import ContactUs from "../Design-Component/ContactUs";
import Footer from "../Design-Component/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import casebanne from "../../assets/case-banne.png";
import submitcase from "../../assets/submit-case-3.png";
import "../../design-part/style/home.css";
function SubmitCase() {
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
                                        <li><Link to="/submit-case" className="active">Submit A Case</Link></li>
                                    </ul>
                                    <h1>Submit Link Case</h1>
                                </div>
                                <div className="all-banner-img">
                                    <img src={casebanne} alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="submit-case">
                <div className="container pb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-11">
                            <div className="submit-case-meta">

                                <Link to="/submit-case" className="submit-case-single">
                                    <div className="submit-case-img">
                                        <img src={submitcase} alt="" />
                                    </div>
                                    <div className="submit-case-content">
                                        <h4>Send your Scanned Files</h4>
                                        <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 8H15" stroke="#3D9BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8 1L15 8L8 15" stroke="#3D9BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        </span>
                                    </div>
                                </Link>
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
export default SubmitCase;