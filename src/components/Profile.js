import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [student, setStudent] = useState(null);  // Initially set to null

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch('http://localhost:8080/hms/api/students/240850325035');  // Replace 12345 with the actual PRN number
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudent();
  }, []);

  if (!student) {
    return <div>Loading...</div>;  // Show a loading indicator while fetching data
  }

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Profile Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Name:</strong> {student?.name}</li>
            <li className="list-group-item"><strong>Year of Joining:</strong>{student?.year}</li>
            <li className="list-group-item"><strong>PRN Number:</strong> {student?.prn}</li>
            <li className="list-group-item"><strong>Course:</strong> {student?.course}</li>
            <li className="list-group-item"><strong>Phone No:</strong> {student?.contactNo}</li>
            <li className="list-group-item"><strong>Room No:</strong> {student?.roomNo}</li>
            <li className="list-group-item"><strong>Email Id:</strong> {student?.email}</li>
            <li className="list-group-item"><strong>Address:</strong> {student?.address}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
