import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/userSlice'; // Import the signup action
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const { error, signupSuccess } = useSelector((state) => state.user); // Get state from Redux
  
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    username: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  return (
    <div>
      <Container className="py-5">
        <div className="form-container shadow-sm p-4 rounded">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label kanit-light">
                  First Name
                  <input 
                    className="form-control" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label kanit-light">
                  Last Name
                  <input 
                    className="form-control" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="mb-3 col-md-12">
                <label className="form-label kanit-light">
                  Mobile No.
                  <input 
                    className="form-control" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="mb-3 col-md-12">
                <label className="form-label kanit-light">
                  Username
                  <input 
                    className="form-control" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="mb-3 col-md-12">
                <label className="form-label kanit-light">
                  Password
                  <input 
                    className="form-control" 
                    name="password" 
                    type="password"
                    value={formData.password} 
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="mb-3 col-md-12">
                <input 
                  className="btn btn-dark rounded-1 w-100" 
                  type="submit" 
                  value="Signup" 
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              {signupSuccess && <div className="success-message">Signup successful!</div>}
              <p className="text-center mb-0">
                <Link to="/login">Login</Link> If you already have an account.
              </p>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Register;
