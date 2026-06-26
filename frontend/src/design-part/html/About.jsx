import Header from "../Design-Component/Header";
import ContactUs from "../Design-Component/ContactUs";
import Footer from "../Design-Component/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AboutBanner from "../../assets/about-ban.jpg";
import "../style/home.css";
import WhatIcon from "../../assets/what-icon.png";
import LocationIcon from "../../assets/location-icon.png";
import SystemIcon from "../../assets/system-icon.png";
import LoveIcon from "../../assets/love.png";
import DoctorIcon from "../../assets/doctor.png";
import CollaborationIcon from "../../assets/collaboration.png";
import VerifiedIcon from "../../assets/verified.png";
import DigitalDentistryImg from "../../assets/digital-dentistry.png";
import CheckmarkIcon from "../../assets/checkmark.png";
import OurLabImg from "../../assets/our-lab.jpg";
import QualityImg from "../../assets/quality.webp";
import VerifiedImg from "../../assets/verified-img.jpg";
import TraceImg from "../../assets/trace.jpg";
import Partner1 from "../../assets/partner1.png";
import Partner2 from "../../assets/partner2.png";
import Partner3 from "../../assets/partner3.png";
import Partner4 from "../../assets/partner4.png";
import Partner5 from "../../assets/partner5.jpg";
import Partner6 from "../../assets/partner6.jpg";
import Partner7 from "../../assets/partner7.png";
import Partner8 from "../../assets/partner8.png";
import Partner9 from "../../assets/partner9.png";
import Partner10 from "../../assets/partner10.jpg";
import Partner11 from "../../assets/partner11.png";
import Partner12 from "../../assets/partner12.png";
import ArmaLogo from "../../assets/arma-logo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


function About() {
    const [activeSection, setActiveSection] = useState("dental_tab_section")
    const partners = [
        Partner1,
        Partner2,
        Partner3,
        Partner4,
        Partner5,
        Partner6,
        Partner7,
        Partner8,
        Partner9,
        Partner10,
        Partner11,
        Partner12,
        ArmaLogo,
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                "dental_tab_section",
                "about_service_section",
                "our_lab_section",
                "quality_sec",
                "our_brands",
            ];

            let currentSection = "";

            sections.forEach((id) => {
                const section = document.getElementById(id);

                if (
                    section &&
                    window.scrollY >= section.offsetTop - 150 &&
                    window.scrollY < section.offsetTop + section.offsetHeight - 150
                ) {
                    currentSection = id;
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Run once on load

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <div className="bg-white">
                <Header />
                <section className="all-banner">
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-lg-11">
                                <div className="all-banner-meta">

                                    <div className="all-banner-content">
                                        <ul className="banner-nav">
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>

                                            <li>
                                                <Link to="/about-us" className="active">
                                                    About
                                                </Link>
                                            </li>
                                        </ul>

                                        <h1>About Us</h1>
                                    </div>

                                    <div className="all-banner-img">
                                        <img src={AboutBanner} alt="About Banner" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="on-section">
                    <div className="container">
                        <div className="on-section-meta">
                            <ul>
                                <li>
                                    <Link
                                        to="#dental_tab_section"
                                        className={activeSection === "dental_tab_section" ? "active" : ""}
                                    >
                                        ABOUT TCI DENTAL LAB
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="#about_service_section"
                                        className={activeSection === "about_service_section" ? "active" : ""}
                                    >
                                        OUR PHILOSOPHY
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="#our_lab_section"
                                        className={activeSection === "our_lab_section" ? "active" : ""}
                                    >
                                        OUR LABS
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="#quality_sec"
                                        className={activeSection === "quality_sec" ? "active" : ""}
                                    >
                                        QUALITY &amp; ASSURANCE
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="#our_brands"
                                        className={activeSection === "our_brands" ? "active" : ""}
                                    >
                                        OUR PARTNERS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="dental-tab" id="dental_tab_section">
                    <div className="container">
                        <div className="dental-lab-meta">
                            <h2 className="all-same-heading">About TCI Dental Lab</h2>

                            <p className="dental-para">
                                PRECISION. INNOVATION. CONNECTED CARE.
                            </p>

                            <div className="dental-lab-main">

                                <div className="dental-lab-content">
                                    <div className="icons-detal">
                                        <img src={WhatIcon} alt="What We Do" />
                                    </div>

                                    <h3>What We Do</h3>

                                    <p>
                                        We craft custom dental restorations and implants using advanced
                                        digital technology, delivering precise, high-quality results fast.
                                    </p>
                                </div>

                                <div className="dental-lab-content">
                                    <div className="icons-detal">
                                        <img src={LocationIcon} alt="Our Locations" />
                                    </div>

                                    <h3>Our Locations</h3>

                                    <p>
                                        TCI Dental has Link double manufacturing structure located in
                                        Beirut, Lebanon and Brussels, Belgium.
                                    </p>
                                </div>

                                <div className="dental-lab-content">
                                    <div className="icons-detal">
                                        <img src={SystemIcon} alt="Our Systems" />
                                    </div>

                                    <h3>Our Systems</h3>

                                    <p>
                                        Uses advanced CAD/CAM, precision scanning, and 3D printing
                                        for fast, accurate dental restorations with easy digital
                                        collaboration.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-service-section" id="about_service_section">
                    <div className="container">
                        <div className="service-section-meta">
                            <h2 className="all-same-heading">Our Philosophy</h2>

                            <p className="lab-service-para">
                                The values we adopt is what makes us stand out.
                            </p>

                            <div className="service-section-cards">

                                <div className="service-card-single">
                                    <span className="service-icon">
                                        <img src={LoveIcon} alt="Harmonization" />
                                    </span>

                                    <h6>Harmonization</h6>

                                    <p>
                                        At the heart of our platform is the seamless integration of
                                        digital workflows between dentists and the lab. Advanced
                                        CAD/CAM machines, precision scanners, and 3D printing
                                        technology work in harmony to ensure each restoration is
                                        accurate, reliable, and perfectly tailored to clinical needs.
                                    </p>
                                </div>

                                <div className="service-card-single">
                                    <span className="service-icon">
                                        <img src={DoctorIcon} alt="Professionalism" />
                                    </span>

                                    <h6>Professionalism</h6>

                                    <p>
                                        Our expert team brings together years of experience in dental
                                        technology, working closely with dental professionals to
                                        deliver consistent quality. We value open communication and
                                        genuine partnership, making sure every case benefits from fast
                                        feedback and clarity at each stage.
                                    </p>
                                </div>

                                <div className="service-card-single">
                                    <span className="service-icon">
                                        <img src={CollaborationIcon} alt="Collaboration" />
                                    </span>

                                    <h6>Collaboration</h6>

                                    <p>
                                        We offer Link wide range of digital solutions, from custom crowns
                                        and bridges to complex implant-supported restorations. Our
                                        high-end technology and diverse materials provide flexible
                                        options that suit every treatment plan and patient expectation.
                                    </p>
                                </div>

                                <div className="service-card-single">
                                    <span className="service-icon">
                                        <img src={VerifiedIcon} alt="Optimal Services" />
                                    </span>

                                    <h6>Optimal Services</h6>

                                    <p>
                                        We prioritize responsive service and support, with intuitive
                                        digital tools making case submission, tracking, and
                                        communication effortless. Every project is followed through by
                                        dedicated technicians, committed to timely delivery and
                                        ongoing support for every partner.
                                    </p>
                                </div>

                            </div>

                            <div className="digital-dentistry-img">
                                <img
                                    src={DigitalDentistryImg}
                                    alt="Digital Dentistry"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="solution-section" id="our_lab_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-11 col-lg-12">
                                <div className="solution-section-meta">
                                    <h2 className="all-same-heading">Our Labs</h2>

                                    <div className="solution-section-main">
                                        <div className="solution-section-content">
                                            <ul>
                                                <li>
                                                    <span>
                                                        <img src={CheckmarkIcon} alt="Checkmark" />
                                                    </span>

                                                    <p>
                                                        <b>Our labs are committed </b>
                                                        to providing you with highly advanced and quality
                                                        products. We comply with the European Medical Devices
                                                        Directive standards 93/42/EEC.
                                                    </p>
                                                </li>

                                                <li>
                                                    <span>
                                                        <img src={CheckmarkIcon} alt="Checkmark" />
                                                    </span>

                                                    <p>
                                                        <b>Our labs are equipped </b>
                                                        with cutting-edge CAD/CAM scanners, advanced 3D printers,
                                                        and complete milling services. From scanning and digital
                                                        design to final production, we maintain full control over
                                                        every step. Using materials such as acrylic, wax,
                                                        ceramics, titanium, chrome-cobalt, and zirconia, our
                                                        milling systems deliver restorations with exceptional
                                                        precision and reliability.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="solution-section-img">
                                            <img src={OurLabImg} alt="Our Lab" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="quality-section" id="quality_sec">
                    <div className="container">
                        <h2 className="all-same-heading">Quality &amp; Assurance</h2>

                        <div className="quality-section-meta">

                            <div className="quality-section-box">
                                <div className="quality-section-img">
                                    <img src={QualityImg} alt="Quality Control" />
                                </div>

                                <div className="quality-section-content">
                                    <h3>Quality Control</h3>

                                    <p>
                                        We have implemented our Critical Quality Assurance Protocol,
                                        so that at each critical point in production your case is
                                        checked by Link Certified Dental Technician. From the moment
                                        your case enters the laboratory until completion, it goes
                                        through rigorous quality checks.
                                    </p>
                                </div>
                            </div>

                            <div className="quality-section-box">
                                <div className="quality-section-img">
                                    <img src={VerifiedImg} alt="Certificate" />
                                </div>

                                <div className="quality-section-content">
                                    <h3>Certificate</h3>

                                    <p>
                                        The medical device dental prosthetics meet the requirements
                                        of Regulation (EU) 2017/745 to guarantee the traceability
                                        and identification of every medical device throughout its
                                        life cycle. All products come with an EU Declaration of
                                        Conformity according to Appendix XIII of Regulation
                                        2017/745.
                                    </p>
                                </div>
                            </div>

                            <div className="quality-section-box">
                                <div className="quality-section-img">
                                    <img src={TraceImg} alt="Traceability" />
                                </div>

                                <div className="quality-section-content">
                                    <h3>Traceability</h3>

                                    <p>
                                        According to the requirements of DIN EN ISO 13485:2016
                                        ("Traceability") and the MDR (Medical Device Regulation)
                                        "Post-market Surveillance Plan", we are committed to
                                        ensuring complete batch traceability. We maintain delivery
                                        records containing the product name, batch/lot number,
                                        and the name and address of the recipient (dentist and
                                        patient reference).
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="brands-section" id="our_brands">
                    <div className="brands-container-fluid">
                        <div className="brands-meta">
                            <h2 className="all-same-heading">
                                Our Partners & Suppliers
                            </h2>

                            <p>
                                TCI Dental services pride itself on using the finest
                                manufactures in the industry for all of our materials.
                            </p>

                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={6}
                                loop={true}
                                speed={5000}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    576: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    992: {
                                        slidesPerView: 5,
                                    },
                                    1200: {
                                        slidesPerView: 6,
                                    },
                                }}
                                className="partners-slider"
                            >
                                {partners.map((partner, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="brands-img">
                                            <img
                                                src={partner}
                                                alt={`partner-${index + 1}`}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <ContactUs />
                <Footer />
            </div>
        </>
    );
}

export default About;