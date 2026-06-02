import Notification from "./pages/Notification";
function Header({ title = "Dashboard" }) {
  return (
    <div
      className="header d-flex justify-content-between align-items-center"
      style={{ width: "100%" }}
    >
      <div className="header-inner d-flex justify-content-between align-items-center w-100">

        <h2>{title}</h2>

        <div className="header-right d-flex align-items-center">
          <Notification />
          {/* Mobile Sidebar Icon */}
          <div className="dashboard-new-side-bar d-block d-md-none ms-3">
            <i className="bi bi-filter-left"></i>
          </div>

        </div>
      </div>

      <div className="lab-badge">
        TCI LAB
      </div>
    </div>
  );
}

export default Header;