import Notification from "./pages/Notification";
function Header({ title = "Dashboard" }) {
  return (
    <div className="mc-ibxx">
      <div className="doctor-header d-flex justify-content-between align-items-center" style={{ width: "100%" }} >
        <h2>{title}</h2>
        <div className="header-right">
          <div className="p-2 border-bottom">
            <Notification />
          </div>
          <div className="lab-badge">
            TCI LAB
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;