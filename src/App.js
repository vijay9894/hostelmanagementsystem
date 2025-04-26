import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import PermissionPage from './components/PermissionPage';
import ComplaintPage from './components/ComplaintPage';
import InstitutionCalendar from './components/InstitutionCalendar';
import Notices from './components/Notices';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import { useState } from 'react';
import RoomList from './components/RoomList';
import ComplaintList from './components/ComplaintList';
import NoticeForm from './components/NoticeForm';
import PermissionsList from './components/PermissionList';
import PermissionsListPage from './components/PermissionsListPage';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const [students , setStudents] = useState([]);
  
  const handleAddStudent = (newStudent) => {
    setStudents([...students , newStudent]);
  }
  return (
     <Routes> 
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register/>} />
         <Route path="/login" element={<AdminLogin/>}/>
         <Route element={<PrivateRoute />}>
         <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<Profile></Profile>}/>
         <Route path="/cdac-calendar" element={<InstitutionCalendar/>}/>
         <Route path="notices" element={<Notices/>}/>
         <Route path="/permission" element={<PermissionPage/>}/>
         <Route path="/permissions" element={<PermissionsListPage/>}/>
         <Route path = "/complaints" element={<ComplaintPage/>}/>
         
         <Route path="/adminhome" element={<AdminHome/>} />
         <Route path="/studentlist" element={<StudentList/>} />
         {/* <Route path="/add-student" element={<AddStudent/>} /> */}
         <Route path="/add-student" element={<AddStudent onAdd={handleAddStudent} />} />
         <Route path="/roomvacancies" element={<RoomList/>}/>
         <Route path="/admincomplaints" element={<ComplaintList/>}/>
         <Route path="/adminnotices" element={<NoticeForm/>}/>
         <Route path="/adminpermission" element={<PermissionsList/>}/>
         </Route>    
     </Routes>
  );
}
export default App;
