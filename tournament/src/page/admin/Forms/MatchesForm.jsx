import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetTournamets } from '../../../redux/tournamentSlice';
import { CreateMatches } from '../../../redux/matchesSlice';

function MatchesForm({ handleClose }) {
  const dispatch = useDispatch();
  const tournamentList = useSelector((state) => state?.GetTournamet?.items);

  useEffect(() => {
    dispatch(GetTournamets());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    tournament: '',
    type: '',
    startDate: '',
    endDate: ''
  });

  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!formData.name || !formData.tournament) {
      setError('Name and tournament are required');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('tournament', formData.tournament);
    form.append('type', formData.type);
    form.append('startDate', formData.startDate);
    form.append('endDate', formData.endDate);

    dispatch(CreateMatches(form)).then((res) => {
      handleClose();
    });
    setError(''); // Clear error message if submission is successful
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: value });
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
          Tournament
          <select 
            className='form-control' 
            name="tournament" 
            value={formData.tournament} 
            onChange={handleChange}
          >
            <option value="">Select a tournament</option>
            {tournamentList?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <div className='form-label'>
          Type
          <select 
            className='form-control' 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
          >
            <option value="">Select Type of Matches</option>
            <option value="single">Single Round</option>
            <option value="rounds">Multi Rounds</option>
          </select>
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

export default MatchesForm;
