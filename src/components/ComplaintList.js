import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/hms/api/complaints')
      .then(response => {
        console.log(response.data);
        setComplaints(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the complaints!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Complaints List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Name</th>
            <th>PRN</th>
            <th>Room No</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint.complaintId}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.name}</td>
              <td>{complaint.prn}</td>
              <td>{complaint.room}</td>
              <td>{complaint.subject}</td>
              <td>{complaint.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ComplaintList;
