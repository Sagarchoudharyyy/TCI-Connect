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
            <section class="all-banner">
                <div class="container h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-lg-11">
                            <div class="all-banner-meta">
                                <div class="all-banner-content">
                                    <ul class="banner-nav">
                                        <li><a href="https://mediumseagreen-herring-541085.hostingersite.com/">Home</a></li>
                                        <li><a href="" class="active">Submit a Case</a></li>
                                    </ul>
                                    <h1>Submit a Case</h1>
                                </div>
                                <div class="all-banner-img">
                                    <img src={casebanne} alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="submit-case">
                <div class="container mb-5 pb-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-11">
                            <div class="submit-case-meta">

                                <a href="https://mediumseagreen-herring-541085.hostingersite.com/client/submit-case" class="submit-case-single">
                                    <div class="submit-case-img">
                                        <img src={submitcase} alt="" />
                                    </div>
                                    <div class="submit-case-content">
                                        <h4>Send your Scanned Files</h4>
                                        <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 8H15" stroke="#3D9BFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M8 1L15 8L8 15" stroke="#3D9BFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        </span>
                                    </div>
                                </a>
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