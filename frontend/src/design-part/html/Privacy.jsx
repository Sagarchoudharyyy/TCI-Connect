import Header from "../Design-Component/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrivacyBanner from "../../assets/privacy-banner.jpeg";
import ContactUs from "../Design-Component/ContactUs";
import Footer from "../Design-Component/Footer";

function Privacy() {
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
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="" class="active">Privacy Policy</Link></li>
                                    </ul>
                                    <h1>Privacy Policy</h1>
                                </div>
                                <div class="all-banner-img">
                                    <img src={PrivacyBanner} alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="policy-section">
                <div class="container">
                    <div class="policy-meta">
                        <h2 class="all-same-heading">Privacy Policy | Technological Crown Innovation Belgium</h2>
                        <p>This privacy policy explains how we use the personal information we collect about you when you use this
                            website
                            TCI Dental Laboratory is committed to protecting your privacy, we aim to meet the requirements of the
                            Data Protection Act 2018, the General Data Protection Regulation (GDPR).</p>
                        <p>You will be asked for personal data when you phone us for inquiries or related topics to our services.
                            The purpose of processing this data is to provide excellent service as a dental laboratory.</p>
                        <h3>Our legal basis for necessary processing:</h3>
                        <ul>
                            <li>Consent, for personal data that has been consented for processing to use our services</li>
                            <li>Contractual, to take steps into entering a contract to use and facilitate our services as a dental
                                laboratory and an online shop</li>
                            <li>Personal data for the purposes of staff and self-employed team member management</li>
                            <li>Legitimate interests, with sensitive data which is necessary for carrying out obligations under
                                employment and medical purposes to asses the working capacity of an employee</li>
                            <li>Special category data for the purposes of manufacturing dental appliances, account management and
                                complaint handling for the delivery of healthcare.</li>
                        </ul>

                        <h3>You have the following personal data rights:</h3>
                        <ul>
                            <li>The right to be informed</li>
                            <li>The right of access</li>
                            <li>The right to rectification</li>
                            <li>The right to erasure (laboratory prescriptions must be retained for a certain time period)</li>
                            <li>The right to restrict processing</li>
                            <li>The right to data portability</li>
                            <li>The right to object</li>
                        </ul>
                        <p>We never pass your personal details to a third party unless we have a contract for them to process data
                            on our behalf and will otherwise keep it confidential.</p>
                        <h3>Disclosures:</h3>
                        <p>We will only disclose personal data to [any of our employees, officers, agents, suppliers or
                            subcontractors] insofar as reasonably necessary for the purposes as set out in this privacy policy.</p>
                        <ul>
                            <li>In addition, we may disclose personal data :</li>
                            <li>to the extent that we are required to do so by law</li>
                            <li>in connection with any legal proceedings or prospective legal proceedings</li>
                            <li>in order to establish, exercise or defend our legal rights.</li>
                            <li>others for the purposes of fraud prevention and reducing credit risk); and to the purchaser (or
                                prospective purchaser) of any business or asset which we are (or are contemplating) selling.</li>
                        </ul>

                        <h3>What information do we collect:</h3>
                        <p>We collect information about you when you enquire with us about products or services. We also collect
                            information when you voluntarily complete customer surveys, subscriptions, provide feedback, and
                            participate in competitions. Website usage information is collected using cookies. Personal data is
                            stored in the EU whether in digital or hard copy format.</p>

                        <h3>What do we use your information for?:</h3>
                        <p>Any of the information we collect from you may be used in one of the following ways:</p>
                        <ul>
                            <li>To improve our website (we continually strive to improve our website offerings based on the
                                information and feedback we receive from you).</li>
                            <li>To improve customer service (your information helps us to more effectively respond to your customer
                                service requests and support needs).</li>
                            <li>To send periodic emails (The email address you provide for order processing, will only be used to
                                send you information and updates pertaining to your order.)</li>
                            <li>To manage your account and, if you agree, to email you about other products, newsletters and
                                services we think may be of interest to you.</li>
                            <li>To establis a price offer, issue an invoice, credit note or other accounting document.</li>
                        </ul>
                        <p>TCI Dental Laboratory will not share your information for marketing purposes with companies outside of
                            our company.</p>
                        <h3>Retention period:</h3>
                        <p>The retention period for special data in laboratory prescription/statements is a minimum of 10 years and
                            maybe longer in order to meet our legal requirements. Your personal data is kept private and
                            confidential and stored securely until a time it is no longer required or has no use with our services.
                        </p>
                        <p>Marketing:</p>
                        <p>We would like to send you information about products and services of ours and others. If you have
                            consented to receive marketing, you may opt-out at a later date. You have a right at any time to stop us
                            from contacting you for marketing purposes. If you no longer wish to be contacted for marketing
                            purposes, please contact us on sales tcidental.com.</p>
                        <h3>Your rights:</h3>
                        <p>You will always have access to your personal data and you can check the accuracy of this and correct
                            inaccuracies. You can also have your data deleted. For this purpose, you can contact us at sales
                            tcidental.com
                        </p>
                        <p>If at any time you would like to unsubscribe from receiving future emails, we include detailed
                            unsubscribe instructions at the bottom of each email.)
                            You have the right to request a copy of the information that we hold about you. If you would like a copy
                            of some or all of your personal information including amendments, please email or write to us. This
                            service is free of charge and we aim to provide you with this information within 48 hours.</p>
                        <h3>Cookies:</h3>
                        <p>Cookies are text files placed on your computer to collect standard internet log information and visitor behavior information. This information is used to track visitor use of the website and to compile statistical reports on website activity.
                            For further information visit www.aboutcookies.org or www.allaboutcookies.org.</p>
                        <p>You can set your browser not to accept cookies and the above websites tell you how to remove cookies from your browser. However, in a few cases, some of our website features may not function as a result.</p>
                        <h3>Brands of other companies:</h3>
                        <p>TCI is not the owner of the associated registered trade names and trademarks mentioned on our website. They are referred to for information purposes only.</p>
                        <h3>Data breach and security:</h3>
                        <p>TCI Dental Laboratory has appropriate procedures to ensure personal data breaches are detected, reported, and investigated effectively within 72 hours of their identification (as required by the GDPR).</p>
                        <p>TCI Dental Laboratory will report serious data breaches to the ICO within 24 hours of becoming aware of the essential facts. We will keep a log of all personal data breaches and record the basic facts, effects of the breach, and remedial action taken.</p>
                        <p>We ensure the safety of your personal information to prevent loss, misuse, or misconduct of your personal information. We cannot, however, guarantee the security of data sent over the internet as transmission over the internet or electronic storage is not 100% secure. We have various methods in place to facilitate a secure infrastructure with personal information but cannot guarantee security, we will always act in accordance with the UK and EU legislation.</p>
                        <h3>Other websites:</h3>
                        <p>Our website contains links to other websites. This privacy policy only applies to this website so when you link to other websites you should read their own privacy policies.</p>
                        <h3>Do we disclose any information to outside parties?:</h3>
                        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
                        <h3>Data of minors:</h3>
                        <p>Children are not allowed to use our services. If you are a minor (under 18 years of age), we ask you to leave our websites.</p>
                        <h3>Social Media platforms:</h3>
                        <p>Communication, engagement, and actions taken through external social media platforms that this website and we participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.
                        </p>
                        <p>Users are advised to use social media platforms wisely and communicate/engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.</p>
                        <p>This website uses social sharing buttons that help share web content directly from web pages to the social media platform in question. You are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.</p>
                        <p>Below are the privacy policies of some of the other third parties who may indirectly provide services to us:</p>
                        <ul>
                            <li><a href="https://policies.google.com/privacy?hl=en">Google http://www.google.com/intl/en/privacy/</a></li>
                            <li><a href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&amp;entry=0">Facebook http://www.facebook.com/policy.php</a></li>
                            <li><a href="https://x.com/en/privacy">Twitter http://twitter.com/privacy</a></li>
                        </ul>
                        <h3>Changes to our privacy policy:</h3>
                        <p>We keep our privacy policy under regular review and we will place any updates on this web page. This privacy policy was last updated on 30/04/2020</p>
                        <p>If we decide to change our privacy policy, we will post those changes on this page.</p>
                        <h3>Your consent:</h3>
                        <p>By using our site, you consent to our online privacy policy</p>
                        <h3>Comments, suggestions, and complaints:</h3>
                        <p>If there are any questions regarding this privacy policy or have any comments, suggestions or complaints about your data processing contact us via:</p>
                        <p>Technological crown innovation</p>
                        <p>31 rue du saphir</p>
                        <p>1030 Brussels-Belgium</p>
                        <ul>
                            <li><a href="mailto:info@tcidental.com">info@tcidental.com</a>
                            </li>
                            <li><a href="www.tcidental.com">www.tcidental.com</a>
                            </li>
                            <li><a href="003227348565">TEL 003227348565</a></li>
                        </ul>
                    </div>
                </div>

            </section>
            <ContactUs />
            <Footer />
        </>

    )
}
export default Privacy;