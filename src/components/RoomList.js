import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomNo: '', roomCapacity: '', vacancies: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/hms/api/rooms');
        if (!response.ok) throw new Error(`Failed to fetch rooms: ${response.status}`);
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleDelete = async (roomNo) => {
    try {
      const response = await fetch(`http://localhost:8080/hms/api/rooms/${roomNo}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Failed to delete room: ${response.status}`);
      setRooms(rooms.filter((room) => room.roomNo !== roomNo));
    } catch (err) {
      setError(err);
      console.error("Error deleting room:", err);
    }
  };

  const handleAddRoom = async () => {
    try {
      const response = await fetch('http://localhost:8080/hms/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) throw new Error(`Failed to add room: ${response.status}`);
      const data = await response.json();
      setRooms([...rooms, data]);
      setNewRoom({ roomNo: '', roomCapacity: '', vacancies: '' });
      setShowAddModal(false);
    } catch (err) {
      setError(err);
      console.error("Error adding room:", err);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const response = await fetch(`http://localhost:8080/hms/api/rooms/${editingRoom.roomNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingRoom),
      });
      if (!response.ok) throw new Error(`Failed to update room: ${response.status}`);
      setRooms(rooms.map(room => (room.roomNo === editingRoom.roomNo ? editingRoom : room)));
      setShowEditModal(false);
      setEditingRoom(null);
    } catch (error) {
      setError(error);
      console.error("Error updating room:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h1>Room List</h1>
      <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Room</button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Room No</th>
            <th>Capacity</th>
            <th>Vacancies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomNo}>
              <td>{room.roomNo}</td>
              <td>{room.roomCapacity}</td>
              <td>{room.vacancies}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => { setEditingRoom(room); setShowEditModal(true); }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(room.roomNo)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add & Edit Modals */}
      {[showAddModal, showEditModal].map((showModal, idx) => (
        <div key={idx} className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{idx === 0 ? 'Add' : 'Edit'} Room</h5>
                <button type="button" className="btn-close" onClick={() => idx === 0 ? setShowAddModal(false) : setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Room No</label>
                    <input type="text" className="form-control" value={idx === 0 ? newRoom.roomNo : editingRoom?.roomNo} onChange={(e) => idx === 0 ? setNewRoom({ ...newRoom, roomNo: e.target.value }) : setEditingRoom({ ...editingRoom, roomNo: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Capacity</label>
                    <input type="number" className="form-control" value={idx === 0 ? newRoom.roomCapacity : editingRoom?.roomCapacity} onChange={(e) => idx === 0 ? setNewRoom({ ...newRoom, roomCapacity: e.target.value }) : setEditingRoom({ ...editingRoom, roomCapacity: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Vacancies</label>
                    <input type="number" className="form-control" value={idx === 0 ? newRoom.vacancies : editingRoom?.vacancies} onChange={(e) => idx === 0 ? setNewRoom({ ...newRoom, vacancies: e.target.value }) : setEditingRoom({ ...editingRoom, vacancies: e.target.value })} required />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => idx === 0 ? setShowAddModal(false) : setShowEditModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => idx === 0 ? handleAddRoom() : handleUpdateRoom()}>{idx === 0 ? 'Add' : 'Update'} Room</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;