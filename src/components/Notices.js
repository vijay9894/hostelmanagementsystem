import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa"; // Back button icon

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    axios
      .get("http://localhost:8080/hms/api/notices")
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the notices!", error);
      });
  }, []);

  return (
    <Container className="mt-5">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📢 Notices</h2>
        <Button
          variant="outline-primary"
          className="fw-bold"
          onClick={() => navigate("/home")}
          style={{ transition: "0.3s" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bff")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaArrowLeft className="me-2" /> Back to Home
        </Button>
      </div>

      {/* Styled Table */}
      <Table striped bordered hover responsive className="shadow-lg rounded-4">
        <thead className="text-white" style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}>
          <tr className="text-center">
            <th>📌 Notice ID</th>
            <th>📝 Notice Content</th>
            <th>📅 Notice Date</th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <tr key={notice.noticeId} className="text-center">
                <td className="fw-bold">{notice.noticeId}</td>
                <td>{notice.noticeContent}</td>
                <td>{notice.noticeDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center fw-bold py-3 text-muted">
                No notices available 📭
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Notices;
