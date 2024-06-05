import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      // Make a POST request to your backend to refresh the token
      const response = await axios.post('https://your-task-backend.vercel.app/api/auth/refresh-token');
      const newAccessToken = response.data.accessToken;
      
      // Update your existing access token in local storage or state
      localStorage.setItem('accessToken', newAccessToken);
      
      // Schedule the next token refresh 20 seconds from now
      setTimeout(refreshAccessToken, 20000);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    try {
      const response = await axios.post('https://your-task-backend.vercel.app/api/auth/login', data);
      console.log(response.data); // Handle login response accordingly
      dispatch(login()); // Dispatch login action upon successful login
      navigate('/task');
      toast.success("Welcome in! Your login is a success!"
    );
      // Start token refresh mechanism after successful login
      refreshAccessToken();
      // Show success toast
      
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login Error:', error);

      // Show error toast
      toast.error('Invalid email or password. Please try again.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    minLength="6"
                    required
                    placeholder="Enter your password"
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
