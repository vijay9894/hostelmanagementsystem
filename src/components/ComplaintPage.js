import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  const PRN_NUMBER = '240850325040'; // Replace with actual PRN number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hms/api/students/${PRN_NUMBER}`);
        console.log('Data fetched:', response.data);
        setComplaint({
          ...complaint,
          name: response.data.name,
          prn: response.data.prn,
          room: response.data.roomNo
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [PRN_NUMBER]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/hms/api/complaints', complaint);
      console.log('Complaint submitted:', response.data);
      setSuccess(true);
      setError(null);
      // Clear the form fields
      setComplaint({
        name: '',
        prn: '',
        room: '',
        subject: '',
        date: new Date().toLocaleDateString()
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setError('Error submitting complaint');
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h3" className="mb-4">Submit a Complaint</CardTitle>
          {success && <Alert color="success">Complaint submitted successfully!</Alert>}
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={complaint.name}
                onChange={handleChange}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="prn">PRN:</Label>
              <Input
                type="text"
                name="prn"
                id="prn"
                value={complaint.prn}
                onChange={handleChange}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="room">Room No:</Label>
              <Input
                type="text"
                name="room"
                id="room"
                value={complaint.room}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="subject">Subject:</Label>
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
              <Label for="date">Date:</Label>
              <Input
                type="text"
                name="date"
                id="date"
                value={complaint.date}
                readOnly
              />
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ComplaintPage;
