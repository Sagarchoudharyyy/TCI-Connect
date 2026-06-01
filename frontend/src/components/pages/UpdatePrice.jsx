import {
    useState,
    useEffect
} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

import axios from "axios";

import {
    useParams,
    useNavigate
} from "react-router-dom";

function UpdatePrice() {

    const { id } = useParams();

    const [formData,
        setFormData] =
        useState({});

    console.log(id);

    useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/pricing/${id}`
        )
            .then((response) => {
                setFormData(
                    response.data
                );
            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    return (
        <div className="container-fluid">
            <div className="dashboard-main">
                <div className="row g-0">

                    <Sidebar />

                    <div className="offset-2 col-12 col-md-9 col-lg-9 
                    offset-lg-3 col-xl-9 col-xxl-10 offset-xl-3 offset-xxl-2 
                    main-content">

                        <Header title="Dashboard" />
                        <div className="main-c-inner">
                            <div className="container">
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePrice;