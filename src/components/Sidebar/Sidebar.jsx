import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuList = [
  {
    to: "/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
      </svg>
    ),
    label: "Dashboard",
  },
  { to: "/create", icon: "📄", label: "Create Invoices" },
  { to: "/invoices", icon: "👥", label: "Invoices" },
];

const otherList = [{ to: "/settings", icon: "⚙️", label: "Settings" }];

const defaultAvatar = "https://ui-avatars.com/api/?background=random&name=U"; // Fallback image

const Sidebar = ({ user, logout, open, setOpen }) => {
  const [imgSrc, setImgSrc] = useState(user?.photoURL || defaultAvatar);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const RenderNavBar = () => {
    return (
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          {open && <span className="sidebar-section-title">MAIN</span>}
          {menuList.map((item) => (
            <NavLink to={item.to} onClick={() => closeMobileMenu()} className="sidebar-link" key={item.to}>
              <span className="sidebar-icon">{item.icon}</span>
              {open && item.label}
            </NavLink>
          ))}
        </div>
        <div className="sidebar-section">
          {open && <span className="sidebar-section-title">OTHERS</span>}
          {otherList.map((item) => (
            <NavLink to={item.to} onClick={() => closeMobileMenu()} className="sidebar-link" key={item.to}>
              <span className="sidebar-icon">{item.icon}</span>
              {open && item.label}
            </NavLink>
          ))}
          <Link className="sidebar-link" onClick={logout}>
            <span className="sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </span>
            {open && "Logout"}
          </Link>
        </div>
      </nav>
    );
  };
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar--open" : "sidebar--closed"}`}>
        <div className="sidebar-header">
          <img
            src={imgSrc}
            alt={user?.displayName || "User"}
            className="sidebar-user-image"
            onError={() => setImgSrc(defaultAvatar)}
          />
          {open && <span className="sidebar-title">{user.displayName}</span>}
          <button className="sidebar-toggle" onClick={() => setOpen((v) => !v)}>
            {!open ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff">
                <path d="M300-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff">
                <path d="M460-320v-320L300-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z" />
              </svg>
            )}
          </button>
        </div>
        <RenderNavBar />
      </aside>
      <aside>
        <button
          className={`mobile-toggle-btn ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
            </svg>
          )}
        </button>
        <div className={`m-sidebar-overlay ${mobileOpen ? "active" : ""}`} onClick={() => mobileOpen(false)}>
          <div className={`m-sidebar ${mobileOpen ? "m-sidebar--open" : ""}`}>
            <div className="sidebar-header">
              <img
                src={imgSrc}
                alt={user?.displayName || "User"}
                className="sidebar-user-image"
                onError={() => setImgSrc(defaultAvatar)}
              />
              <span className="sidebar-title">{user.displayName}</span>
            </div>
            <RenderNavBar />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
