import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge, Button } from "reactstrap";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa"; // Icons for profile & back button

const Profile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchStudent = async () => {
      const prn = sessionStorage.getItem("prn"); // Retrieve stored PRN
      if (!prn) {
        console.error("No PRN found. Please log in.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/hms/api/students/${prn}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudent();
  }, []);

  if (!student) {
    return <div className="text-center mt-5 fs-4 fw-bold">Loading Profile...</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0 rounded-4" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", color: "white" }}>
        <CardBody className="text-center">
          <FaUserCircle size={80} className="mb-3" />
          <CardTitle tag="h2" className="fw-bold">Profile</CardTitle>
          <Badge color="light" className="fs-6 p-2">{student.course}</Badge>

          <ListGroup flush className="mt-3">
            <ListGroupItem className="fs-5"><strong className="fw-bold">Name:</strong> {student.name}</ListGroupItem>
            <ListGroupItem className="fs-5"><strong className="fw-bold">Year of Joining:</strong> {student.year}</ListGroupItem>
            <ListGroupItem className="fs-5"><strong className="fw-bold">PRN Number:</strong> {student.prn}</ListGroupItem>
            <ListGroupItem className="fs-5"><strong className="fw-bold">Phone No:</strong> {student.contactNo}</ListGroupItem>
            <ListGroupItem className="fs-5"><strong className="fw-bold">Room No:</strong> {student.roomNo}</ListGroupItem>
            <ListGroupItem className="fs-5"><strong className="fw-bold">Email:</strong> {student.email}</ListGroupItem>
            <ListGroupItem className="fs-5"><strong className="fw-bold">Address:</strong> {student.address}</ListGroupItem>
          </ListGroup>

          {/* Back to Home Button */}
          <Button
            color="light"
            className="mt-4 fw-bold"
            onClick={() => navigate("/home")}
            style={{ color: "#6a11cb", transition: "0.3s", border: "2px solid white" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "white"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            <FaArrowLeft className="me-2" /> Back to Home
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Profile;
