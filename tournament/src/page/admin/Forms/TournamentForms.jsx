import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetCities } from '../../../redux/citiesSlice';
import { CreateTournament, UpdateTournament } from '../../../redux/tournamentSlice';
import { imageBaseUrl } from '../../../assets/config';

function TournamentForms({ handleClose, tournament }) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state?.GetCities.items);

  useEffect(() => {
    dispatch(GetCities());
    if (tournament) {
      setFormData({
        name: tournament.name || '',
        city: tournament.city?._id || '',
        file: null,
        startDate: tournament.startDate ? new Date(tournament.startDate).toISOString().split('T')[0] : '',
        endDate: tournament.endDate ? new Date(tournament.endDate).toISOString().split('T')[0] : '',
      });
    }
  }, [dispatch, tournament]);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    file: null,
    startDate: '',
    endDate: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!formData.name || !formData.city) {
      setError('Name and city are required');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('city', formData.city);
    if (formData.file) {
      form.append('file', formData.file); // Only append file if a new file is selected
    }
    form.append('startDate', formData.startDate);
    form.append('endDate', formData.endDate);

    if (tournament) {
      // Update tournament if editing
      dispatch(UpdateTournament({ id: tournament._id, form })).then((res) => {
        handleClose();
      });
    } else {
      // Create new tournament
      dispatch(CreateTournament(form)).then((res) => {
        handleClose();
      });
    }
    setError(''); // Clear error message if submission is successful
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container>
      {/* Name Field */}
      <div className="mb-3">
        <div className='form-label'>
          Name
          <input 
            type="text" 
            className='form-control' 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
      </div>

      {/* Cities Field */}
      <div className="mb-3">
        <div className='form-label'>
          Cities
          <select 
            className='form-control' 
            name="city" 
            value={formData.city} 
            onChange={handleChange}
          >
            <option value="">Select a city</option>
            {cities?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* File Input */}
      <div className="mb-3">
        <div className='form-label'>
          Image
          <input 
            type="file" 
            className='form-control' 
            name="file" 
            onChange={handleChange} 
          />
        </div>
        {/* Show existing image if available */}
        {tournament?.file && (
          <div>
            <img 
              src={imageBaseUrl + tournament.file} 
              alt="Tournament" 
              width={200} 
              height={150}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      {/* Start Date Field */}
      <div className="mb-3">
        <div className='form-label'>
          Start Date
          <input 
            type="date" 
            className='form-control' 
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            min={today}
          />
        </div>
      </div>

      {/* End Date Field */}
      <div className="mb-3">
        <div className='form-label'>
          End Date
          <input 
            type="date" 
            className='form-control' 
            name="endDate" 
            value={formData.endDate} 
            onChange={handleChange} 
            min={formData.startDate}
          />
        </div>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button onClick={handleSubmit} className='btn btn-dark rounded-1 px-5 py-2'>
        {tournament ? 'Update' : 'Create'}
      </button>
    </Container>
  );
}

export default TournamentForms;
