import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../redux/userSlice';
import '../assets/scss/PasswordChange.scss'; 

function PasswordChange({ id }) {
  const dispatch = useDispatch();

  const { error, passwordUpdateSuccess } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    dispatch(updateUserPassword({ userId: id, oldPassword, newPassword }));
  };
  useEffect(() => {
    if (passwordUpdateSuccess) {
      alert("Password updated successfully!");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [passwordUpdateSuccess]);

  return (
    <div className='password-change-form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  );
}

export default PasswordChange;
