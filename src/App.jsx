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
          {isLoggedIn ? (
            <>
              <Route path="/task" element={<TaskTable />} />
              <Route path="/add-task" element={<AddTask />} />
            </>
          ) : (
        
            <Route path="*" element={<Navigate to="/" />} />
          )}
          {/* Redirect all other unmatched routes to the home page */}
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
