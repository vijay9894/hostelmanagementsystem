import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./StudentList.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomList = () => {
    const navigate = useNavigate(); 
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add' or 'edit'
    const [currentRoom, setCurrentRoom] = useState({ roomNo: '', roomCapacity: '', vacancies: '' });
    const [deleteConfirmation, setDeleteConfirmation] = useState(null); // Track room to delete

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/hms/api/rooms');
                if (!response.ok) {
                    throw new Error(`Failed to fetch rooms: ${response.status}`);
                }
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
            if (!response.ok) {
                throw new Error(`Failed to delete room: ${response.status}`);
            }
            setRooms(rooms.filter((room) => room.roomNo !== roomNo));
            setDeleteConfirmation(null); // Clear confirmation after successful delete
        } catch (err) {
            setError(err);
            console.error("Error deleting room:", err);
        }
    };

    const handleSaveRoom = async () => {
        try {
            const method = modalType === 'add' ? 'POST' : 'PUT';
            const url = modalType === 'add'
                ? 'http://localhost:8080/hms/api/rooms'
                : `http://localhost:8080/hms/api/rooms/${currentRoom.roomNo}`;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentRoom), // Send the entire currentRoom object
            });

            if (!response.ok) {
                throw new Error(`Failed to ${modalType} room: ${response.status}`);
            }

            const data = await response.json();

            if (modalType === 'add') {
                setRooms([...rooms, data]);
            } else {
                setRooms(rooms.map(room => (room.roomNo === data.roomNo ? data : room)));
            }

            setShowModal(false);
            setCurrentRoom({ roomNo: '', roomCapacity: '', vacancies: '' }); // Reset form
        } catch (err) {
            setError(err);
            console.error(`Error ${modalType}ing room:`, err);
        }
    };


    const handleEdit = (room) => {
        setCurrentRoom({ ...room }); // Set current room for editing (spread operator!)
        setModalType('edit');
        setShowModal(true);
    };

    const confirmDelete = (room) => {
        setDeleteConfirmation(room); // Set the room to be deleted
    };

    const cancelDelete = () => {
        setDeleteConfirmation(null); // Clear confirmation
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <div className="header">
            <h1>Room List</h1>
            <button className="btn btn-secondary back-button" onClick={() => navigate('/adminhome')}>
          Back To Home
        </button>
            </div>
            <button className="btn btn-primary" onClick={() => { setCurrentRoom({ roomNo: '', roomCapacity: '', vacancies: '' }); setModalType('add'); setShowModal(true); }}>Add Room</button>
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
                                <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(room)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(room)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalType === 'add' ? 'Add' : 'Edit'} Room</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {modalType === 'add' && (
                                        <div className="mb-3">
                                            <label className="form-label">Room No</label>
                                            <input type="text" className="form-control" value={currentRoom.roomNo} onChange={(e) => setCurrentRoom({ ...currentRoom, roomNo: e.target.value })} required />
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label">Capacity</label>
                                        <input type="number" className="form-control" value={currentRoom.roomCapacity} onChange={(e) => setCurrentRoom({ ...currentRoom, roomCapacity: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Vacancies</label>
                                        <input type="number" className="form-control" value={currentRoom.vacancies} onChange={(e) => setCurrentRoom({ ...currentRoom, vacancies: e.target.value })} required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveRoom}>{modalType === 'add' ? 'Add' : 'Update'} Room</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete room {deleteConfirmation.roomNo}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteConfirmation.roomNo)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomList;