import { useEffect, useState } from "react";
import api from "../services/api";
import DoctorHeader from "../components/DoctorHeader";
import DoctorSideBar from "../components/DoctorSideBar";
import "../DoctorStyle/doctorpricingtable.css";

import {
    BsInfoCircle,
    BsPercent,
    BsCashCoin,
    BsFileEarmarkText,
    BsClockHistory,
    BsBoxSeam,
    BsGear,
    BsLaptop,
    BsShieldCheck,
    BsTools
} from "react-icons/bs";

function DoctorPricing() {
    const [pricing, setPricing] = useState([]);
    const [showSidebar, setShowSidebar] =
        useState(false);

    const getPricing = async () => {
        try {
            const res =
                await api.get(
                    "/pricing/my-pricing"
                );

            setPricing(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPricing();
    }, []);

    useEffect(() => {
        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            return;
        }

        let user;

        try {
            user = JSON.parse(
                storedUser
            );
        } catch (error) {
            console.log(
                "Invalid user data:",
                error
            );
            return;
        }

        const userId = user?.id;

        if (!userId) {
            console.log(
                "Doctor user ID not found"
            );
            return;
        }

        const apiUrl =
            import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            console.log(
                "VITE_API_URL is not configured"
            );
            return;
        }

        let wsUrl;

        try {
            const parsedUrl =
                new URL(apiUrl);

            const wsProtocol =
                parsedUrl.protocol === "https:"
                    ? "wss:"
                    : "ws:";

            const basePath =
                parsedUrl.pathname.replace(
                    /\/api\/?$/,
                    ""
                );

            wsUrl =
                `${wsProtocol}//${parsedUrl.host}` +
                `${basePath}/ws/pricing/${userId}`;
        } catch (error) {
            console.log(
                "Pricing WebSocket URL error:",
                error
            );
            return;
        }

        let websocket;
        let reconnectTimer;
        let isUnmounted = false;

        const connectWebSocket = () => {
            if (isUnmounted) {
                return;
            }

            console.log(
                "DOCTOR PRICING WEBSOCKET CONNECTING..."
            );

            console.log(
                "PRICING WEBSOCKET URL:",
                wsUrl
            );

            websocket =
                new WebSocket(wsUrl);

            websocket.onopen = () => {
                console.log(
                    "DOCTOR PRICING WEBSOCKET CONNECTED"
                );
            };

            websocket.onmessage =
                async (event) => {
                    try {
                        const data =
                            JSON.parse(
                                event.data
                            );

                        console.log(
                            "DOCTOR PRICING WEBSOCKET MESSAGE:",
                            data
                        );

                        if (
                            data.type ===
                            "pricing_updated"
                        ) {
                            await getPricing();
                        }
                    } catch (error) {
                        console.log(
                            "DOCTOR PRICING WEBSOCKET MESSAGE ERROR:",
                            error
                        );
                    }
                };

            websocket.onerror = (
                error
            ) => {
                console.log(
                    "DOCTOR PRICING WEBSOCKET ERROR:",
                    error
                );
            };

            websocket.onclose = () => {
                console.log(
                    "DOCTOR PRICING WEBSOCKET DISCONNECTED"
                );

                if (!isUnmounted) {
                    reconnectTimer =
                        setTimeout(() => {
                            connectWebSocket();
                        }, 3000);
                }
            };
        };

        connectWebSocket();

        return () => {
            isUnmounted = true;

            if (reconnectTimer) {
                clearTimeout(
                    reconnectTimer
                );
            }

            if (
                websocket &&
                websocket.readyState ===
                WebSocket.OPEN
            ) {
                websocket.close();
            }
        };
    }, []);

    return (
        <div className="doctor-dashboard-main">

            {showSidebar && (
                <div
                    className="doctor-sidebar-overlay"
                    onClick={() =>
                        setShowSidebar(false)
                    }
                />
            )}

            <DoctorSideBar
                showSidebar={showSidebar}
            />

            <div className="doctor-main-content">

                <DoctorHeader
                    title="Pricing"
                    setShowSidebar={
                        setShowSidebar
                    }
                />

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-12">

                            <div className="pricing-table-card">

                                <div className="pricing-table-header">

                                    <div>
                                        <h4>
                                            Pricing
                                        </h4>

                                        <p>
                                            Current pricing available for your account
                                        </p>
                                    </div>

                                </div>

                                <div className="table-responsive">

                                    <table className="table pricing-table">

                                        <thead>

                                            <tr>

                                                <th>
                                                    Product
                                                </th>

                                                <th>
                                                    Category
                                                </th>

                                                <th>
                                                    Material
                                                </th>

                                                <th>
                                                    Price
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {pricing.length === 0 ? (

                                                <tr>

                                                    <td
                                                        colSpan="4"
                                                        className="text-center"
                                                    >
                                                        No pricing available
                                                    </td>

                                                </tr>

                                            ) : (

                                                pricing.map(
                                                    item => (
                                                        <tr
                                                            key={
                                                                item.id
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    item.product
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    item.category
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    item.material
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    Number(
                                                                        item.price
                                                                    ).toFixed(
                                                                        2
                                                                    )
                                                                }{" "}
                                                                {
                                                                    item.currency
                                                                }
                                                            </td>

                                                        </tr>
                                                    )
                                                )

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DoctorPricing;