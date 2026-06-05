import DoctorSideBar from "../components/DoctorSideBar";
import DoctorHeader from "../components/DoctorHeader";
function Profile() {
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 doctor-dashboard-main">
                <DoctorSideBar />
                <div className="col-md-9 doctor-main-content">

                    <DoctorHeader title="Dashboard" />
                </div>
            </div>
        </div>
    )
}
export default Profile;