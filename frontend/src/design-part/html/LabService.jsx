import Header from "../Design-Component/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import labSection1 from "../../assets/lab-section-1.png";
import labSection2 from "../../assets/lab-section-2.png";
import labSection3 from "../../assets/lab-section-3.png";
import labSection4 from "../../assets/lab-section-4.png";
import labServicesBanner from "../../assets/lab-services-banner.png";
import "../style/labservices.css";
import ContactUs from "../Design-Component/ContactUs";
import Footer from "../Design-Component/Footer";

function LabService() {
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
                                        <li><Link to="">Home</Link></li>
                                        <li><Link to="" className="active"> Lab Services</Link></li>
                                    </ul>
                                    <h1>Lab Services</h1>
                                </div>
                                <div className="all-banner-img">
                                    <img src={labServicesBanner} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="lab-page-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-11">
                            <div className="lab-page-section-meta">

                                <div className="lab-page-section-img order-1 order-lg-1">
                                    <img src={labSection1} alt="" />
                                </div>

                                <div className="service-card-single order-2 order-lg-2">
                                    <span className="service-icon"><svg width="35" height="32" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.4551 32C17.349 31.9998 17.2443 31.9766 17.1481 31.9318C17.0519 31.8871 16.9665 31.8221 16.898 31.7411L0.170784 11.8735C0.0764006 11.7614 0.01812 11.6233 0.00358442 11.4774C-0.0109512 11.3315 0.0189369 11.1847 0.0893292 11.0561L5.95404 0.378302C6.0166 0.263962 6.10874 0.168536 6.22082 0.102006C6.33289 0.0354759 6.46079 0.000287458 6.59113 0.00012207H28.3191C28.5852 0.00012207 28.8296 0.145576 28.9562 0.378302L34.8194 11.0561C34.9649 11.3194 34.9314 11.6437 34.738 11.8735L18.0107 31.7411C17.9425 31.8221 17.8575 31.8872 17.7615 31.9319C17.6656 31.9767 17.561 31.9999 17.4551 32ZM1.60642 11.3179L17.4551 30.144L33.3038 11.3179L27.8885 1.45466H7.02167L1.60642 11.3179Z" fill="#013A77"></path>
                                        <path d="M33.8187 12.3637H1.0915C0.898614 12.3637 0.71363 12.2871 0.57724 12.1507C0.44085 12.0143 0.364227 11.8293 0.364227 11.6364C0.364227 11.4436 0.44085 11.2586 0.57724 11.1222C0.71363 10.9858 0.898614 10.9092 1.0915 10.9092H33.8187C34.0116 10.9092 34.1965 10.9858 34.3329 11.1222C34.4693 11.2586 34.5459 11.4436 34.5459 11.6364C34.5459 11.8293 34.4693 12.0143 34.3329 12.1507C34.1965 12.2871 34.0116 12.3637 33.8187 12.3637Z" fill="#013A77"></path>
                                        <path d="M24.818 11.955C24.7012 11.9551 24.5861 11.927 24.4825 11.8731C24.3789 11.8191 24.2899 11.7409 24.2231 11.6452L17.458 1.9972L10.7788 11.5943C10.7242 11.6726 10.6548 11.7394 10.5745 11.7909C10.4941 11.8423 10.4044 11.8775 10.3105 11.8943C10.2165 11.9111 10.1202 11.9093 10.027 11.8889C9.93374 11.8685 9.84545 11.8299 9.76714 11.7753C9.60897 11.6652 9.50104 11.4968 9.46707 11.307C9.45026 11.2131 9.45211 11.1168 9.47252 11.0235C9.49294 10.9303 9.53151 10.842 9.58605 10.7637L16.8588 0.311394C16.9254 0.215349 17.0144 0.136872 17.118 0.0826676C17.2216 0.0284629 17.3367 0.0001413 17.4537 0.00012207H17.4551C17.6922 0.00012207 17.9133 0.115031 18.05 0.309939L25.4129 10.8103C25.4898 10.9191 25.5353 11.0469 25.5443 11.1799C25.5534 11.3128 25.5257 11.4457 25.4642 11.5639C25.4028 11.6821 25.31 11.7811 25.196 11.8501C25.082 11.9191 24.9512 11.9554 24.818 11.955Z" fill="#013A77"></path>
                                        <path d="M17.4551 32C17.305 32 17.1586 31.9536 17.036 31.8671C16.9133 31.7807 16.8204 31.6584 16.77 31.5171L5.90602 0.971727C5.85447 0.793466 5.87286 0.602252 5.95746 0.437088C6.04205 0.271923 6.18646 0.145252 6.36124 0.0829095C6.53602 0.0205673 6.728 0.0272514 6.89802 0.101598C7.06805 0.175946 7.2033 0.312354 7.2762 0.483002L17.4551 29.1025L27.634 0.483002C27.6988 0.301305 27.8331 0.152796 28.0074 0.0701437C28.1817 -0.0125084 28.3817 -0.0225325 28.5634 0.0422766C28.7451 0.107086 28.8936 0.241419 28.9763 0.415725C29.0589 0.590031 29.0689 0.790031 29.0041 0.971727L18.1402 31.5171C18.0897 31.6584 17.9968 31.7807 17.8742 31.8671C17.7515 31.9536 17.6051 32 17.4551 32Z" fill="#013A77"></path>
                                    </svg>
                                    </span>
                                    <h6>Crowns, Bridges Veneers</h6>
                                    <p>Our digitally designed crowns, bridges, and veneers combine strength, precision, and natural
                                        beauty. With CAD/CAM technology and high-quality materials, we ensure restorations that
                                        mimic natural teeth in both function and appearance. Every piece is customized for a
                                        flawless fit, offering durability and long-lasting comfort. From single crowns to full-arch
                                        solutions, we bring smiles back to life with elegance and confidence.</p>

                                </div>

                                <div className="service-card-single order-4 order-lg-3">
                                    <span className="service-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.2633 1.05658C16.825 1.80227 15.1076 1.80208 13.6694 1.05658C7.45521 -2.165 0 2.37377 0 9.3763C0 13.7832 3.65345 32 9.3656 32C11.3693 32 13.1928 29.9559 14.9405 25.751C15.3183 24.842 16.6144 24.8418 16.9922 25.751C18.7399 29.9559 20.5634 32 22.5671 32C28.2233 32 31.9327 13.9234 31.9327 9.3763C31.9326 2.37608 24.48 -2.16637 18.2633 1.05658ZM22.567 30.3324C21.382 30.3324 19.9113 28.4294 18.5323 25.111C17.5846 22.8311 14.3485 22.83 13.4004 25.1111C12.0214 28.4293 10.5507 30.3324 9.36566 30.3324C5.71277 30.3324 1.66776 14.5512 1.66776 9.37642C1.66776 3.61453 7.80253 -0.106176 12.9019 2.53721C14.8208 3.53196 17.1119 3.53196 19.0308 2.53721C24.125 -0.103613 30.2649 3.60909 30.2649 9.37642C30.2649 14.5289 26.2226 30.3324 22.567 30.3324Z" fill="#013A77"></path>
                                        <path d="M27.2073 8.54243C26.7468 8.54243 26.3735 8.91568 26.3735 9.37631C26.3735 10.7685 25.8011 14.7288 24.5287 19.1741C24.4019 19.6167 24.6581 20.0785 25.1008 20.2051C25.5416 20.3318 26.0048 20.077 26.1319 19.633C27.4487 15.0326 28.041 10.8659 28.041 9.37637C28.0412 8.91574 27.6678 8.54243 27.2073 8.54243ZM9.36558 3.9021C6.34713 3.9021 3.89131 6.3578 3.89131 9.37624C3.89131 9.83687 4.26469 10.2101 4.72519 10.2101C5.18569 10.2101 5.55907 9.83687 5.55907 9.37624C5.55907 7.27736 7.26657 5.56986 9.36558 5.56986C9.82608 5.56986 10.1995 5.1966 10.1995 4.73598C10.1995 4.27535 9.82608 3.9021 9.36558 3.9021Z" fill="#013A77"></path>
                                    </svg>

                                    </span>
                                    <h6>Implant Prosthetics</h6>
                                    <p>Implant cases demand accuracy—and that’s exactly what we deliver. Whether it’s a single unit
                                        or a complex multi-implant restoration, our digital design ensures seamless integration with
                                        the patient’s existing dentition. Using state-of-the-art software and 3D printing, we create
                                        prosthetics that provide stability, functionality, and natural aesthetics. The result is a
                                        restoration that feels as real as it looks, giving both dentists and patients peace of mind.
                                    </p>

                                </div>
                                <div className="lab-page-section-img order-3 order-lg-4">
                                    <img src={labSection2} alt="" />
                                </div>
                                <div className="lab-page-section-img order-5 order-lg-5">
                                    <img src={labSection3} alt="" />
                                </div>
                                <div className="service-card-single order-6 order-lg-6">
                                    <span className="service-icon"><svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M31.941 5.96775C31.9384 5.80385 31.8854 5.64473 31.7891 5.51207C31.6928 5.37941 31.5579 5.27966 31.4029 5.22641L16.2571 0.044939C16.0896 -0.0149797 15.9065 -0.0149797 15.7389 0.044939L0.593109 5.22641C0.43808 5.27966 0.303237 5.37941 0.20695 5.51207C0.110664 5.64473 0.0576161 5.80385 0.0550333 5.96775L0.0151757 8.31934C-0.104397 15.5614 0.481508 20.7588 1.81275 24.2145C2.8109 26.8164 4.3161 29.1941 6.24091 31.2095C8.54349 33.5512 11.2721 35.4316 14.2802 36.7497L15.6672 37.3834C15.771 37.4308 15.8839 37.4553 15.998 37.4553C16.1122 37.4553 16.225 37.4308 16.3288 37.3834L17.7159 36.7497C20.7239 35.4316 23.4525 33.5512 25.7551 31.2095C27.6818 29.1933 29.1884 26.8142 30.1873 24.2105C31.5185 20.7549 32.1044 15.5575 31.9848 8.31536L31.941 5.96775ZM28.7006 23.6366C27.7783 26.0449 26.3854 28.2453 24.6032 30.1094C22.4389 32.2987 19.8786 34.057 17.0582 35.2909L15.998 35.7811L14.9378 35.2988C12.1174 34.0649 9.55708 32.3066 7.39279 30.1174C5.60976 28.251 4.21682 26.0477 3.29544 23.6366C2.0479 20.3762 1.48592 15.3741 1.60549 8.3592L1.63339 6.56562L15.998 1.62728L30.3467 6.54967L30.3746 8.34326C30.5101 15.3741 29.9481 20.3762 28.7006 23.6366Z" fill="#013A77"></path>
                                        <path d="M27.9553 8.75788C27.9535 8.5933 27.9009 8.43329 27.8045 8.29984C27.7082 8.16639 27.5729 8.06603 27.4172 8.01255L16.2572 4.18623C16.089 4.13031 15.9072 4.13031 15.739 4.18623L4.57893 8.01255C4.42326 8.06603 4.28797 8.16639 4.19163 8.29984C4.09529 8.43329 4.04262 8.5933 4.04085 8.75788V8.83361C3.93323 15.155 4.43942 19.9698 5.51956 22.7598C6.30951 24.8275 7.50472 26.7166 9.03499 28.3159C10.9216 30.2336 13.1562 31.7743 15.6194 32.8557L15.6673 32.8756C15.7701 32.9264 15.8834 32.9523 15.9981 32.9513C16.1122 32.9514 16.225 32.9269 16.3289 32.8796L16.3767 32.8557C18.8415 31.7799 21.0788 30.2447 22.9691 28.3319C24.4994 26.7325 25.6946 24.8435 26.4846 22.7757C27.5567 19.9857 28.0789 15.1709 27.9633 8.85354L27.9553 8.75788ZM24.9859 22.1898C24.2678 24.0593 23.1838 25.7667 21.7973 27.2119C20.13 28.9103 18.1641 30.2871 15.9981 31.2733C13.8262 30.2939 11.8535 28.9225 10.1789 27.2278C8.79248 25.7826 7.70845 24.0753 6.9903 22.2058C6.03372 19.6708 5.54746 15.2387 5.63515 9.35574L15.9981 5.80046L26.361 9.35574C26.4487 15.2347 25.9624 19.6708 24.9939 22.2058L24.9859 22.1898Z" fill="#013A77"></path>
                                        <path d="M19.7406 14.8679L14.0569 20.5516L12.2554 18.75C12.1813 18.6759 12.0934 18.6172 11.9966 18.5771C11.8998 18.537 11.7961 18.5164 11.6914 18.5164C11.5866 18.5164 11.4829 18.537 11.3862 18.5771C11.2894 18.6172 11.2015 18.6759 11.1274 18.75C11.0533 18.8241 10.9946 18.912 10.9545 19.0088C10.9144 19.1055 10.8938 19.2092 10.8938 19.314C10.8938 19.4187 10.9144 19.5224 10.9545 19.6192C10.9946 19.716 11.0533 19.8039 11.1274 19.878L13.491 22.2415C13.5651 22.3161 13.6533 22.3753 13.7504 22.4157C13.8476 22.456 13.9517 22.4768 14.0569 22.4767C14.268 22.4758 14.4701 22.3912 14.6189 22.2415L20.8686 15.9959C20.9426 15.9218 21.0014 15.8339 21.0415 15.7371C21.0815 15.6403 21.1022 15.5366 21.1022 15.4319C21.1022 15.3271 21.0815 15.2234 21.0415 15.1266C21.0014 15.0299 20.9426 14.942 20.8686 14.8679C20.7945 14.7938 20.7066 14.7351 20.6098 14.695C20.513 14.6549 20.4093 14.6343 20.3046 14.6343C20.1998 14.6343 20.0961 14.6549 19.9994 14.695C19.9026 14.7351 19.8147 14.7938 19.7406 14.8679Z" fill="#013A77"></path>
                                    </svg>

                                    </span>
                                    <h6>Splints, Guards &amp; Trays</h6>
                                    <p>Comfort and protection go hand in hand with our range of digitally crafted splints, guards,
                                        and trays. Designed for precision and patient-specific needs, our appliances are
                                        lightweight, durable, and easy to wear. From night guards that prevent grinding, to
                                        bleaching trays for aesthetic treatments, to orthodontic retainers, every product is made
                                        with accuracy for maximum comfort and effectiveness. Patients enjoy the perfect fit, and
                                        practitioners benefit from reliable results.</p>

                                </div>

                                <div className="service-card-single order-8 order-lg-7">
                                    <span className="service-icon"><svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6663 29.3324C6.57987 29.3324 0 22.7527 0 14.6663C0 6.57986 6.57987 0 14.6663 0C17.4782 0 20.214 0.801226 22.578 2.31849C23.0421 2.61736 23.178 3.23596 22.8792 3.70126C22.5794 4.16662 21.962 4.30112 21.4967 4.0025C19.4567 2.69179 17.0942 1.99994 14.6663 1.99994C7.6824 1.99994 1.99994 7.68239 1.99994 14.6663C1.99994 21.65 7.6824 27.3324 14.6663 27.3324C21.65 27.3324 27.3324 21.65 27.3324 14.6663C27.3324 14.2488 27.3124 13.8355 27.2739 13.429C27.2206 12.8782 27.6232 12.3902 28.1725 12.337C28.7245 12.2863 29.2111 12.6864 29.2645 13.2357C29.3099 13.7112 29.3326 14.1886 29.3324 14.6663C29.3324 22.7527 22.7528 29.3324 14.6663 29.3324Z" fill="#013A77"></path>
                                        <path d="M16.3327 17.9994C16.0769 17.9994 15.8208 17.902 15.6262 17.7062L9.62638 11.7063C9.23577 11.3155 9.23577 10.6822 9.62638 10.2916C10.017 9.90101 10.6503 9.90101 11.0409 10.2916L16.3342 15.5849L30.2923 1.62658C30.6831 1.23596 31.3164 1.23596 31.707 1.62658C32.0976 2.01719 32.0976 2.65048 31.707 3.0411L17.0407 17.7074C16.8527 17.8946 16.5981 17.9997 16.3327 17.9994Z" fill="#013A77"></path>
                                    </svg>

                                    </span>
                                    <h6>Streamlined Digital Platform</h6>
                                    <p>We don’t just create restorations—we create convenience. Our fully integrated digital
                                        platform allows clinics and labs to communicate seamlessly, track cases in real time, and
                                        reduce turnaround times. From design submission to final delivery, the process is
                                        transparent, efficient, and stress-free. This means fewer delays, more accuracy, and a
                                        smoother experience for both dentists and patients.</p>

                                </div>

                                <div className="lab-page-section-img order-7 order-lg-8">
                                    <img src={labSection4} alt="" />
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
export default LabService;