import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, resetSignupState } from '../../redux/userSlice'; 
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const dispatch = useDispatch();
  const { error, signupSuccess, message } = useSelector((state) => state.user); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(signupUser(formData)); 
  };

  
  useEffect(() => {
    if (signupSuccess) {
      toast.success(message || "Registration successful!"); 
      setTimeout(() => {
        navigate('/login'); 
      }, 3000);
      dispatch(resetSignupState()); 
    }

    if (error) {
      toast.error(error); 
    }

    setIsSubmitting(false); 
  }, [signupSuccess, error, navigate, message, dispatch]);

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
                    name="phone" 
                    value={formData.phone} 
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
                  disabled={isSubmitting} 
                />
              </div>
              {error && <div className="error-message">{error}</div>}
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
