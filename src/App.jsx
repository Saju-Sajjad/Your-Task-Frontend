import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/LoginForm';
import Signup from './components/SignUpForm';
import TaskTable from './components/Task';
import AddTask from './components/AddTask';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLogin);

  return (
    <Router>
      <div>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/task" element={<ProtectedRoute element={<TaskTable />} />} />
          <Route path="/add-task" element={<ProtectedRoute element={<AddTask />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
