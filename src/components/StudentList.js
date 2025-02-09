import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./StudentList.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
  const navigate = useNavigate(); 
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ prn: '', name: '', contactNo: '', course: '', year: '', email: '', address: '', roomNo: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/hms/api/students');
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
      const response = await fetch(`http://localhost:8080/hms/api/students/${prn}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete student');
      setStudents(students.filter((student) => student.prn !== prn));
      setStudentToDelete(null); // Close the modal after successful delete
    } catch (err) {
      setError(err);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch('http://localhost:8080/hms/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) throw new Error('Failed to add student');
      const data = await response.json();
      setStudents([...students, data]);
      setNewStudent({ prn: '', name: '', contactNo: '', course: '', year: '', email: '', address: '', roomNo: '' });
      setShowModal(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/hms/api/students/${editingStudent.prn}`, {
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
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student); // Set the student to delete
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <div className="header">  {/* Container for h1 and button */}
        <h1>Student List</h1>
        <button className="btn btn-secondary back-button" onClick={() => navigate('/adminhome')}>
          Back To Home
        </button>
      </div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
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
                <button className="btn btn-info btn-sm me-2" onClick={() => { setEditingStudent(student); setShowEditModal(true); }}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(student)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Student */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="PRN"
                  value={newStudent.prn}
                  onChange={(e) => setNewStudent({ ...newStudent, prn: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Contact No"
                  value={newStudent.contactNo}
                  onChange={(e) => setNewStudent({ ...newStudent, contactNo: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Course"
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Year"
                  value={newStudent.year}
                  onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Room No"
                  value={newStudent.roomNo}
                  onChange={(e) => setNewStudent({ ...newStudent, roomNo: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddStudent}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Student */}
      {showEditModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="PRN"
                  value={editingStudent.prn}
                  onChange={(e) => setEditingStudent({ ...editingStudent, prn: e.target.value })}
                  disabled
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Name"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Contact No"
                  value={editingStudent.contactNo}
                  onChange={(e) => setEditingStudent({ ...editingStudent, contactNo: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Course"
                  value={editingStudent.course}
                  onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Year"
                  value={editingStudent.year}
                  onChange={(e) => setEditingStudent({ ...editingStudent, year: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Address"
                  value={editingStudent.address}
                  onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Room No"
                  value={editingStudent.roomNo}
                  onChange={(e) => setEditingStudent({ ...editingStudent, roomNo: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateStudent}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Confirming Delete */}
      {studentToDelete && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setStudentToDelete(null)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the student with PRN: {studentToDelete.prn}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setStudentToDelete(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(studentToDelete.prn)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
