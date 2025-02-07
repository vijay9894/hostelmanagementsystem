import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NoticeList from './NoticeList';


const NoticeForm = () => {
  const [notice, setNotice] = useState({ noticeContent: '', noticeDate: '' });
  const [showNotices, setShowNotices] = useState(false);

  const handleChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/hms/api/notices', notice)
      .then(response => {
        setNotice({ noticeContent: '', noticeDate: '' });
      })
      .catch(error => {
        console.error('There was an error posting the notice!', error);
      });
  };

  const toggleShowNotices = () => {
    setShowNotices(!showNotices);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Post a New Notice</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="noticeContent">
          <Form.Label>Notice Content</Form.Label>
          <Form.Control
            type="text"
            name="noticeContent"
            value={notice.noticeContent}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="noticeDate" className="mt-3">
          <Form.Label>Notice Date</Form.Label>
          <Form.Control
            type="date"
            name="noticeDate"
            value={notice.noticeDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Post Notice
        </Button>
        <Button variant="secondary" className="mt-3 ms-3" onClick={toggleShowNotices}>
          {showNotices ? 'Hide Notices List' : 'Show Notices List'}
        </Button>
      </Form>

      {showNotices && <NoticeList/>}
    </div>
  );
};

export default NoticeForm;
