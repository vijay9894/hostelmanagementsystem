import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import "./StudentList.css";
import axios from "axios";

const PermissionsList = () => {
    const [permissions, setPermissions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Fetch pending permissions when the component loads
    useEffect(() => {
        fetchPendingPermissions();
    }, []);

    const fetchPendingPermissions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/hms/api/permissions/pending");
            setPermissions(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to update permission status
    const updatePermissionStatus = async (permissionId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/hms/api/permissions/${permissionId}/status?status=${newStatus}`);

            // Update UI immediately
            setPermissions(prevPermissions =>
                prevPermissions.map(permission =>
                    permission.permissionId === permissionId
                        ? { ...permission, permissionStatus: newStatus }
                        : permission
                )
            );

            // Remove the row from UI after 30 seconds
            setTimeout(() => {
                setPermissions(prevPermissions => prevPermissions.filter(permission => permission.permissionId !== permissionId));
            }, 30000); // 30 seconds delay

        } catch (error) {
            console.error("Error updating permission status:", error);
        }
    };

    // Show error if exists
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container className="mt-5">
            <div className="header">
            <h2 className="text-center mb-4">Pending Permissions</h2>
            <button className="btn btn-secondary back-button" onClick={() => navigate('/adminhome')}>
          Back To Home
        </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Permission ID</th>
                        <th>Name</th>
                        <th>PRN</th>
                        <th>Room No</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map(permission => (
                        <tr key={permission.permissionId}>
                            <td>{permission.permissionId}</td>
                            <td>{permission.name}</td>
                            <td>{permission.prn}</td>
                            <td>{permission.roomNo}</td>
                            <td>{permission.subject}</td>
                            <td>{permission.date}</td>
                            <td>{permission.permissionStatus}</td>
                            <td>
                                <Button color="success" className="m-1"
                                    onClick={() => updatePermissionStatus(permission.permissionId, "GRANTED")}>
                                    GRANT
                                </Button>
                                <Button color="danger" className="m-1"
                                    onClick={() => updatePermissionStatus(permission.permissionId, "REJECTED")}>
                                    REJECT
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PermissionsList;
