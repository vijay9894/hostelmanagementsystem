import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Notices= () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/hms/api/notices')
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the notices!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Notices List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Notice ID</th>
            <th>Notice Content</th>
            <th>Notice Date</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(notice => (
            <tr key={notice.noticeId}>
              <td>{notice.noticeId}</td>
              <td>{notice.noticeContent}</td>
              <td>{notice.noticeDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notices;
