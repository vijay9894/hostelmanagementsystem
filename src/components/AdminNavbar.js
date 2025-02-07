import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/adminlogin"); // Redirect to login page after logout
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
                            <a className="nav-link" onClick={() => navigate("/studentlist")}>
                                StudentList
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/roomvacancies")}>
                                Room Vacancies
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/adminnotices")}>
                                Notices
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/adminpermission")}>
                                Permission
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate("/admincomplaints")}>
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

export default AdminNavbar;