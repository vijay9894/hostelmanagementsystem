import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle } from 'reactstrap';

const PermissionPage = () => {
  const [student, setStudent] = useState(null);
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [autoDate, setAutoDate] = useState(new Date().toLocaleDateString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PRN_NUMBER = '240850325040'; // Replace with actual PRN number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hms/api/students/${PRN_NUMBER}`);
        console.log(`Fetching data from: http://localhost:8080/hms/api/students/${PRN_NUMBER}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [PRN_NUMBER]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name: student?.name, prn: student?.prn, subject, file, autoDate, roomNo: student?.roomNo });
    // Implement actual form submission logic here
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h3" className="mb-4">Permission</CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input type="text" id="name" value={student?.name || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="prn">PRN:</Label>
              <Input type="text" id="prn" value={student?.prn || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="roomNo">Room No:</Label>
              <Input 
                type="text" 
                id="roomNo" 
                value={student?.roomNo || ''} 
                onChange={(e) => setStudent({ ...student, roomNo: e.target.value })} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label for="subject">Subject:</Label>
              <Input type="textarea" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} rows="5" required />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date:</Label>
              <Input type="text" id="date" value={autoDate} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="file">File (Optional):</Label>
              <Input type="file" id="file" onChange={handleFileChange} />
              {file && <p className="mt-2">Selected file: {file.name}</p>}
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PermissionPage;
