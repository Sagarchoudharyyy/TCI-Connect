import Notification from "./pages/Notification";
import "../styles/header.css";
import { FaBars } from "react-icons/fa";
function Header({ title = "Dashboard", setShowSidebar }) {
  return (
    <div className="header d-flex justify-content-between align-items-center " style={{ width: "100%" }} >
      <div className="header-inner d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          {setShowSidebar && (
            <div
              className="mobile-menu me-3"
              onClick={() => setShowSidebar(prev => !prev)}
            >
              <FaBars size={22} />
            </div>
          )}

          <h2>{title}</h2>

        </div>

        <div className="header-right d-flex align-items-center">
          <Notification />

          <div className="lab-badge">
            TCI LAB
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;
