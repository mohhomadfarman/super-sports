import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../redux/userSlice';
import '../assets/scss/PasswordChange.scss'; // Ensure the path is correct

function PasswordChange({ id }) {
  const dispatch = useDispatch();

  // Get the Redux state for handling the password update process
  const { error, passwordUpdateSuccess } = useSelector((state) => state.user);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input changes
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
    const { oldPassword, newPassword, confirmPassword } = formData;

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    // Dispatch the updateUserPassword thunk with the required data
    dispatch(updateUserPassword({ userId: id, oldPassword, newPassword }));
  };

  // Reset form if the password update was successful
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
