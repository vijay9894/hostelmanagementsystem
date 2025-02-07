import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddStudent = ({ onAdd }) => {
  const [student, setStudent] = useState({
    prn: '',
    name: '',
    course: '',
    year: '',
    contactNo: '',
    email: '',
    address: '',
    roomNo: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Student Payload:', student);
    const payload = {
      ...student,
      roomNo: parseInt(student.roomNo)
    };

    try {
      const response = await fetch('http://localhost:8080/hms/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      //console.log("data : ",data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add student');
      }

      setSuccess(data.message); // Using the message from SuccessResponse
      if (onAdd && data.student) {
        onAdd(data.student);
      }

      // Clear form
      setStudent({
        prn: '',
        name: '',
        course: '',
        year: '',
        contactNo: '',
        email: '',
        address: '',
        roomNo: ''
      });

    } catch (error) {
      setError(error.message || 'Error adding student');
      console.error('Error details:', error);  // Debugging message
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Add Student</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">PRN</label>
          <input type="text" className="form-control" name="prn" value={student.prn} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={student.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <input type="text" className="form-control" name="course" value={student.course} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input type="text" className="form-control" name="year" value={student.year} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact No</label>
          <input type="text" className="form-control" name="contactNo" value={student.contactNo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={student.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={student.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Room No</label>
          <input type="number" className="form-control" name="roomNo" value={student.roomNo} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
