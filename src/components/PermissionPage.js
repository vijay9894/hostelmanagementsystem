import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Alert } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';

const PermissionPage = () => {
    const [student, setStudent] = useState(null);
    const [subject, setSubject] = useState('');
    const [autoDate] = useState(new Date().toLocaleDateString());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedPrn = sessionStorage.getItem("prn");
        if (!storedPrn) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const studentResponse = await fetch(`http://localhost:8080/hms/api/students/${storedPrn}`);
                if (!studentResponse.ok) throw new Error(`HTTP error! status: ${studentResponse.status}`);
                const studentData = await studentResponse.json();
                setStudent(studentData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPermission = {
            name: student?.name,
            prn: student?.prn,
            subject,
            date: autoDate,
            roomNo: student?.roomNo,
        };

        try {
            const response = await fetch('http://localhost:8080/hms/api/permissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPermission),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccessMessage('✅ Permission submitted successfully!');
        } catch (error) {
            setError(`❌ Error submitting permission: ${error.message}`);
        }
    };

    if (loading) return <div className="text-center mt-5 text-primary font-weight-bold">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger font-weight-bold">Error: {error}</div>;

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0">
                <CardBody>
                    {/* Header Section */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <CardTitle tag="h3">📝 Request Permission</CardTitle>
                        <Button color="info" className="fw-bold" onClick={() => navigate('/home')}>
                            ⬅ Back to Home
                        </Button>
                    </div>

                    {/* Success & Error Messages */}
                    {successMessage && <Alert color="success">{successMessage}</Alert>}
                    {error && <Alert color="danger">{error}</Alert>}
                    
                    {/* Form Section */}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">👤 Name:</Label>
                            <Input type="text" id="name" value={student?.name || ''} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="prn">🎓 PRN:</Label>
                            <Input type="text" id="prn" value={student?.prn || ''} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="roomNo">🏠 Room No:</Label>
                            <Input type="text" id="roomNo" value={student?.roomNo || ''} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subject">✍️ Subject:</Label>
                            <Input
                                type="textarea"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                rows="5"
                                required
                                placeholder="Enter your permission reason..."
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">📅 Date:</Label>
                            <Input type="text" id="date" value={autoDate} readOnly />
                        </FormGroup>

                        {/* Submit Button */}
                        <Button color="success" className="fw-bold w-100">Submit Request</Button>
                    </Form>

                    {/* Link to View Permissions */}
                    <Link to="/permissions">
                        <Button color="secondary" className="mt-3 w-100">📄 View Your Permissions</Button>
                    </Link>
                </CardBody>
            </Card>
        </Container>
    );
};

export default PermissionPage;
