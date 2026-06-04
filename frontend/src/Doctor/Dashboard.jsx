import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
import "../DoctorStyle/DoctorSideBar.css";

function DoctorDashboard() {
    return (
        <div className="container-fluid">
            <div className="row dashboard-main">
                <DoctorSideBar />
                <DoctorHeader title="Dashboard" />

                <div className="p-4">
                    Dashboard Content
                </div>
            </div>
        </div>

    )
};
export default DoctorDashboard;