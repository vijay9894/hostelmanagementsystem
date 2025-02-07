import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Redirect to login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Forkleaf Portal
                </a>
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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/profile")}>
                                Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/cdac-calendar")}>
                                CDAC Calendar
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/notices")}>
                                Notices
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/permission")}>
                                Permission
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/complaints")}>
                                Complaints
                            </a>
                        </li>
                    </ul>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;