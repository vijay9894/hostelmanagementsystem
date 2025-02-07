import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ prn: '', name: '', contactNo: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/hms/api/students'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (prn) => {
    try {
      const response = await fetch(`#`, { method: 'DELETE' }); // Replace with your API endpoint
      if (!response.ok) throw new Error('Failed to delete student');
      setStudents(students.filter((student) => student.prn !== prn));
    } catch (err) {
      setError(err);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch('#', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) throw new Error('Failed to add student');
      const data = await response.json();
      setStudents([...students, data]);
      setNewStudent({ prn: '', name: '', contactNo: '' });
      setShowModal(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`#`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent),
      });
      if (!response.ok) throw new Error('Failed to update student');
      const updatedStudents = students.map((student) =>
        student.prn === editingStudent.prn ? editingStudent : student
      );
      setStudents(updatedStudents);
      setShowEditModal(false);
      setEditingStudent(null);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h1>Student List</h1>
      <button className="btn btn-primary" onClick={() => navigate('/add-student')}>
        Add Student
      </button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>PRN</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.prn}>
              <td>{student.prn}</td>
              <td>{student.name}</td>
              <td>{student.contactNo}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => setEditingStudent(student) || setShowEditModal(true)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.prn)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
