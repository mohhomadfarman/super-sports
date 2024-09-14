import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../redux/userSlice';
import '../assets/scss/ProfileDetailsForm.scss'; // Ensure the path is correct

const ProfileDetailsForm = ({ id }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profilePhoto: null,
  });

  // State to hold the image URL
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
        profilePhoto: null, // Not setting this here because it's a file input
      });
      // Assuming profilePhoto URL needs to be fetched
      if (userProfile.profilePhoto) {
        setImageURL(userProfile.profilePhoto);
      }
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePhoto: file,
    });

    // Create a URL for the selected image
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare form data for submission
    const updatedData = new FormData();
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }
    dispatch(updateUserProfile({ id, formData: updatedData }));
  };

  return (
    <div className="profile-details-form">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group-half">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="profilePhoto">Profile Photo</label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {imageURL && (
          <div className="image-preview">
            <img
              src={imageURL}
              alt="Profile Preview"
              style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
