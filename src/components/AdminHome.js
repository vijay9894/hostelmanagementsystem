import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./AdminNavbar";

const AdminHome = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1>Welcome to the Cdac Girls hostel</h1>
                <p>This is the user dashboard. Here some photos</p>
            </div>
        </div>
    );
};

export default AdminHome;