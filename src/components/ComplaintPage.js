import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
  const [complaint, setComplaint] = useState({
    name: '',
    prn: '',
    room: '',
    subject: '',
    date: new Date().toLocaleDateString()
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPrn = sessionStorage.getItem("prn");
    if (!storedPrn) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hms/api/students/${storedPrn}`);
        setComplaint({
          ...complaint,
          name: response.data.name,
          prn: response.data.prn,
          room: response.data.roomNo
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/hms/api/complaints', complaint);
      setSuccess(true);
      setError(null);
      setComplaint({
        name: complaint.name,
        prn: complaint.prn,
        room: complaint.room,
        subject: '',
        date: new Date().toLocaleDateString()
      });
    } catch (error) {
      setError('Error submitting complaint');
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg rounded-4 p-4">
        <CardBody>
          {/* Title & Back Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <CardTitle tag="h3" className="text-primary fw-bold">📢 Submit a Complaint</CardTitle>
            <Button color="info" className="fw-bold" onClick={() => navigate('/home')}>
              ⬅ Back to Home
            </Button>
          </div>

          {/* Alerts */}
          {success && <Alert color="success">✅ Complaint submitted successfully!</Alert>}
          {error && <Alert color="danger">❌ {error}</Alert>}

          {/* Complaint Form */}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">👤 Name:</Label>
              <Input type="text" name="name" id="name" value={complaint.name} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="prn">🎓 PRN:</Label>
              <Input type="text" name="prn" id="prn" value={complaint.prn} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="room">🏠 Room No:</Label>
              <Input type="text" name="room" id="room" value={complaint.room} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="subject">✍️ Subject:</Label>
              <Input
                type="textarea"
                name="subject"
                id="subject"
                value={complaint.subject}
                onChange={handleChange}
                rows="5"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">📅 Date:</Label>
              <Input type="text" name="date" id="date" value={complaint.date} readOnly />
            </FormGroup>
            <Button color="primary" type="submit" className="fw-bold">🚀 Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ComplaintPage;
