import { useEffect, useState } from "react";
import axios from "axios";
import DoctorHeader from "../components/DoctorHeader";
import DoctorSideBar from "../components/DoctorSideBar";
import "../DoctorStyle/doctorpricingtable.css";
import {
    BsInfoCircle, BsPercent,
    BsCashCoin,
    BsFileEarmarkText

} from "react-icons/bs";
import {
    BsClockHistory,
    BsBoxSeam,
    BsGear,
    BsLaptop,
    BsShieldCheck,
    BsTools
} from "react-icons/bs";



function DoctorPricing() {
    const [pricing, setPricing] = useState([]);

    useEffect(() => {
        getPricing();
    }, []);

    const getPricing = async () => {
        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/pricing"
            );

            console.log("Pricing API:", res.data);

            setPricing(res.data);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="container-fluid p-0">
                <div className="row g-0 doctor-dashboard-main">
                    <DoctorSideBar />
                    <div className="col-md-9 doctor-main-content">
                        <DoctorHeader title="Dashboard" />
                        <div className="mc-btm-bxx">
                            <h2>Your Pricing</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Material</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pricing.length > 0 ? (
                                        pricing.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.product}</td>
                                                <td>{item.category}</td>
                                                <td>{item.material}</td>
                                                <td>{Number(item.belgium_dentist_price).toFixed(2)} $</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >
                                                No Pricing Found
                                            </td>
                                        </tr>
                                    )}


                                </tbody>

                            </table>

                            <div className="card mt-4 m-0">
                                <div className="card-body small">


                                    <div className="d-flex align-items-center mb-2">
                                        <BsInfoCircle className="me-2" />

                                        <p className="mb-0 fw-semibold">
                                            Prices & Order Information
                                        </p>
                                    </div>

                                    <ul
                                        className="mb-3"
                                        style={{
                                            listStyleType: "disc",
                                            paddingLeft: "20px"
                                        }}
                                    >
                                        <li className="mb-2">
                                            <BsPercent className="me-2" />
                                            Prices are exclusive of VAT.
                                        </li>

                                        <li className="mb-2">
                                            <BsBoxSeam className="me-2" />
                                            Shipping is free for orders of{" "}
                                            <strong>€150 or more</strong>.
                                        </li>

                                        <li className="mb-2">
                                            <BsCashCoin className="me-2" />
                                            Orders below €150 are subject
                                            to a fixed shipping fee of{" "}
                                            <strong>€9</strong>.
                                        </li>

                                        <li className="mb-2">
                                            <BsFileEarmarkText className="me-2" />
                                            Prices are for reference only.
                                            Orders must be submitted via the{" "}
                                            <strong>RX form</strong>.
                                        </li>
                                    </ul>



                                    <hr />

                                    <ul className="list-unstyled">

                                        <li className="mb-2">
                                            <BsClockHistory className="me-2" />
                                            <strong>Temporaries (PMMA)</strong>
                                        </li>

                                        <li className="mb-2">
                                            <BsBoxSeam className="me-2" />
                                            <strong>3D Printing & Models</strong>
                                        </li>

                                        <li className="mb-2">
                                            <BsGear className="me-2" />
                                            <strong>Mill Only</strong> (No CAD design included)
                                        </li>

                                        <li className="mb-2">
                                            <BsLaptop className="me-2" />
                                            <strong>CAD Services</strong>
                                        </li>

                                        <li className="mb-2">
                                            <BsShieldCheck className="me-2" />
                                            <strong>Abutments & Attachments</strong>
                                        </li>

                                        <li className="mb-2">
                                            <BsTools className="me-2" />
                                            <strong>Implant Restorations</strong>
                                        </li>

                                    </ul>

                                    <hr />

                                    <p className="mb-0">
                                        <strong>
                                            Fixed Prosthetics – Crowns /
                                            Veneers / Inlay-Onlay
                                        </strong>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DoctorPricing;