function Header({ title = "Dashboard" }) {
  return (
    <div
      className="header d-flex justify-content-between align-items-center"
      style={{ width: "100%" }}
    >
      <div className="header-inner d-flex justify-content-between align-items-center w-100">

        <h2>{title}</h2>

        <div className="header-right d-flex align-items-center">

          {/* Notification */}
          <div
            className="notification-wrapper position-relative"
            style={{
              display: "inline-block"
            }}
          >
            <div
              id="notifToggle"
              className="notification-icon"
              style={{
                position: "relative",
                cursor: "pointer"
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.02 20.53C9.68999 20.53 7.35999 20.16 5.14999 19.42C4.30999 19.13 3.66999 18.54 3.38999 17.77C3.09999 17 3.19999 16.15 3.65999 15.39L4.80999 13.48C5.04999 13.08 5.26999 12.28 5.26999 11.81V8.92C5.26999 5.2 8.29999 2.17 12.02 2.17C15.74 2.17 18.77 5.2 18.77 8.92V11.81C18.77 12.27 18.99 13.08 19.23 13.49L20.37 15.39C20.8 16.11 20.88 16.98 20.59 17.77C20.3 18.56 19.67 19.16 18.88 19.42C16.68 20.16 14.35 20.53 12.02 20.53Z"
                  fill="#666666"
                />
                <path
                  d="M13.88 3.94C13.81 3.94 13.74 3.93 13.67 3.91C13.38 3.83 13.1 3.77 12.83 3.73C11.98 3.62 11.16 3.68 10.39 3.91C10.11 4 9.80999 3.91 9.61999 3.7C9.42999 3.49 9.36999 3.19 9.47999 2.92C9.88999 1.87 10.89 1.18 12.03 1.18C13.17 1.18 14.17 1.86 14.58 2.92C14.68 3.19 14.63 3.49 14.44 3.7C14.29 3.86 14.08 3.94 13.88 3.94Z"
                  fill="#666666"
                />
                <path
                  d="M12.02 22.81C11.03 22.81 10.07 22.41 9.37002 21.71C8.67002 21.01 8.27002 20.05 8.27002 19.06H9.77002C9.77002 19.65 10.01 20.23 10.43 20.65C10.85 21.07 11.43 21.31 12.02 21.31C13.26 21.31 14.27 20.3 14.27 19.06H15.77C15.77 21.13 14.09 22.81 12.02 22.81Z"
                  fill="#666666"
                />
              </svg>

              <span
                id="notifCount"
                className="notif-badge position-absolute"
                style={{
                  top: "-6px",
                  right: "-6px",
                  display: "inline-block",
                  background:
                    "rgb(217, 83, 79)",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: "12px",
                  fontSize: "12px"
                }}
              >
                { }
              </span>
            </div>

            <div
              id="notifDropdownBox"
              className="notif-dropdown shadow"
              style={{
                display: "none",
                position: "absolute",
                right: 0,
                top: "40px",
                width: "450px",
                maxHeight: "450px",
                background: "#fff",
                borderRadius: "8px",
                overflow: "auto",
                zIndex: 3000
              }}
            >
              <div className="p-2 border-bottom d-flex justify-content-between align-items-center">

                <strong>
                  Notifications
                </strong>

                <button
                  id="markAllReadBtn"
                  type="button"
                  className="btn btn-sm btn-link"
                >
                  Mark all read
                </button>
              </div>

              <div
                id="notifList"
                style={{
                  minHeight: "80px"
                }}
              ></div>

              <div className="p-2 border-top text-center">
                <a
                  href="/notifications/all"
                  className="small"
                >
                  View all
                </a>
              </div>
            </div>
          </div>

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