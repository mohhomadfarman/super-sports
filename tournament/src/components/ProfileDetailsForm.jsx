import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../redux/userSlice';
import { imageBaseUrl } from '../assets/config';
import '../assets/scss/ProfileDetailsForm.scss'; 

const ProfileDetailsForm = ({ id }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    barangay: "",
    province: "",
    phone: "",
    
    profilePhoto: null,
  });
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
        streetAddress1: userProfile.streetAddress1 || "",
        streetAddress2: userProfile.streetAddress2 || "",
        city: userProfile.city || "",
        barangay: userProfile.barangay || "",
        province: userProfile.province || "",
        profilePhoto: null,
      });
      if (userProfile.profilePhoto) {
        setImageURL(`${imageBaseUrl}${userProfile.profilePhoto}`);
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

    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }
    dispatch(updateUserProfile({ userId: id, formData: updatedData }));
  };

  return (
    <div className="profile-details-form">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
      {imageURL && (
          <div className="image-preview">
            <img
              src={imageURL}
              alt="Profile Preview"
              style={{ width: '50px', height: 'auto', borderRadius: '100px' }}
            />
          </div>
        )}
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
        <div className="form-group-inline">
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
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="streetAddress1">Street Address 1</label>
            <input
              type="text"
              id="streetAddress1"
              name="streetAddress1"
              value={formData.streetAddress1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress2">Street Address 2</label>
            <input
              type="text"
              id="streetAddress2"
              name="streetAddress2"
              value={formData.streetAddress2}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="barangay">Barangay</label>
            <input
              type="text"
              id="barangay"
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            />
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
       
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
