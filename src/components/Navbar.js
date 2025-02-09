import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Redirect to login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ background: "#0D1B2A", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
            <div className="container-fluid">
                {/* Brand Logo */}
                <a className="navbar-brand fw-bold fs-4 text-light" href="#" onClick={() => navigate("/")}
                    style={{ letterSpacing: "1px", cursor: "pointer", color: "#FFD700" }}>
                    <i className="bi bi-gem me-2"></i> Hostel Management
                </a>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {[
                            { name: "Profile", path: "/profile" },
                            { name: "CDAC Calendar", path: "/cdac-calendar" },
                            { name: "Notices", path: "/notices" },
                            { name: "Permission", path: "/permission" },
                            { name: "Complaints", path: "/complaints" }
                        ].map((item, index) => (
                            <li className="nav-item" key={index}>
                                <a
                                    className="nav-link fw-semibold px-3"
                                    onClick={() => navigate(item.path)}
                                    style={{
                                        cursor: "pointer",
                                        color: "white",
                                        transition: "0.3s",
                                        position: "relative"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = "#FFD700";
                                        e.target.style.transform = "translateY(-2px)";
                                        e.target.style.transition = "0.3s ease-in-out";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "white";
                                        e.target.style.transform = "translateY(0)";
                                    }}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Logout Button */}
                    <button
                        className="btn fw-bold"
                        onClick={handleLogout}
                        style={{
                            cursor: "pointer",
                            color: "#FFD700",
                            border: "2px solid #FFD700",
                            transition: "0.3s",
                            padding: "8px 15px",
                            borderRadius: "5px"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#FFD700";
                            e.target.style.color = "#0D1B2A";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#FFD700";
                        }}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
