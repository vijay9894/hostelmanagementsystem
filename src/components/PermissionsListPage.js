import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PermissionsListPage = () => {
    const [permissions, setPermissions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedPrn = sessionStorage.getItem("prn");
        if (!storedPrn) {
            navigate("/login");
            return;
        }

        const fetchPermissions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/hms/api/permissions'); // Fetch all permissions
                const allPermissions = response.data;

                // Filter permissions for the logged-in student's PRN
                const studentPermissions = allPermissions.filter(permission => permission.prn === storedPrn);

                setPermissions(studentPermissions);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPermissions();
    }, [navigate]);

    return (
        <Container className="mt-5">
            {/* Header Section with Back Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">📜 Your Permissions</h2>
                <Button color="info" className="fw-bold" onClick={() => navigate('/home')}>
                    ⬅ Back to Home
                </Button>
            </div>

            {/* Error Handling */}
            {error && <Alert color="danger">❌ Error: {error}</Alert>}

            {/* Permissions Table */}
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>🆔 Permission ID</th>
                        <th>👤 Name</th>
                        <th>🎓 PRN</th>
                        <th>🏠 Room No</th>
                        <th>✍️ Subject</th>
                        <th>📅 Date</th>
                        <th>✅ Status</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.length > 0 ? (
                        permissions.map(permission => (
                            <tr key={permission.permissionId}>
                                <td>{permission.permissionId}</td>
                                <td>{permission.name}</td>
                                <td>{permission.prn}</td>
                                <td>{permission.roomNo}</td>
                                <td>{permission.subject}</td>
                                <td>{permission.date}</td>
                                <td>
                                    <span className={`badge ${permission.permissionStatus === "Approved" ? "bg-success" : "bg-warning"}`}>
                                        {permission.permissionStatus}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">No permissions found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Buttons Section */}
            <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/permission">
                    <Button color="primary" className="fw-bold">📝 Request New Permission</Button>
                </Link>
            </div>
        </Container>
    );
};

export default PermissionsListPage;
