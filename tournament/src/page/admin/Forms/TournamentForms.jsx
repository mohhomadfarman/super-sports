import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetCities } from '../../../redux/citiesSlice';
import { CreateTournament } from '../../../redux/tournamentSlice';


function TournamentForms({ handleClose }) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state?.GetCities.items);

  useEffect(() => {
    dispatch(GetCities());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    file: null,
    startDate: '',
    endDate: ''
  });

  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!formData.name || !formData.city) {
      setError('Name and city are required');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('city', formData.city);
    form.append('file', formData.file);
    form.append('startDate', formData.startDate);
    form.append('endDate', formData.endDate);

    dispatch(CreateTournament(form)).then((res) => {
      handleClose();
    });
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
      <div className="mb-3">
        <div className='form-label'>
          Images
          <input 
            type="file" 
            className='form-control' 
            name="file" 
            onChange={handleChange} 
          />
        </div>
      </div>
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
      <button onClick={handleCreate} className='btn btn-dark rounded-1 px-5 py-2'>
        Create
      </button>
    </Container>
  );
}

export default TournamentForms;
