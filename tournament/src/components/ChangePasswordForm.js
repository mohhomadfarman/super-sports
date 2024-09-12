import React, { useState } from 'react';
import './ChangePasswordForm.scss';

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    console.log('Password change data submitted:', formData);
    // Implement actual API call here
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePasswordForm;
