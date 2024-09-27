import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetCities } from '../../../redux/citiesSlice';
import { useParams } from 'react-router-dom';
import { createRounds, UpdateRounds } from '../../../redux/roundsSlice';

const RoundsForm = ({ handleClose, type, id, rounds }) => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.GetCities.items);
  const { id: contestId } = useParams();

  const initialState = {
    name: '',
    numberOfWinners: '',
    city: '',
    isStatus: '',
    startDate: '',
    endDate: '',
    contestId: contestId,
    roundId: id,
    type: type
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(GetCities());
    if (rounds) {
      setFormData({
        name: rounds.name || '',
        city: rounds.city?._id || '',
        startDate: rounds.startDate ? new Date(rounds.startDate).toISOString().split('T')[0] : '',
        endDate: rounds.endDate ? new Date(rounds.endDate).toISOString().split('T')[0] : '',
        numberOfWinners: rounds.numberOfWinners || '',
        isStatus: rounds.isStatus || '',
        contestId: contestId,
        roundId: id,
        type: type
      });
    }
  }, [dispatch, rounds, contestId, id, type]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.numberOfWinners) {
      setError('Name and numberOfWinners are required');
      return;
    }
  
    try {
      if (rounds) {
        await dispatch(UpdateRounds({ id: rounds._id, form: formData })).unwrap();
        handleClose();
      } else if (type === 'subRound') {
        await dispatch(createRounds(formData)).unwrap();
        handleClose();
      } else {
        await dispatch(createRounds(formData)).unwrap();
        handleClose();
      }
      setError('');
    } catch (err) {
      setError('Error processing request');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container>
      <div className="mb-3">
        <label className="form-label">
          Name
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          City
          <select
            className="form-control"
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
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Status
          <select
            className="form-control"
            name="isStatus"
            value={formData.isStatus}
            onChange={handleChange}
          >
            <option value="" disabled>Choose Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Number Of Winners
          <input
            type="number"
            className="form-control"
            name="numberOfWinners"
            value={formData.numberOfWinners}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Start Date
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={today}
          />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          End Date
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate}
          />
        </label>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleSubmit} className='btn btn-dark rounded-1 px-5 py-2'>
        {rounds ? 'Update' : 'Create'}
      </button>
    </Container>
  );
};

export default RoundsForm;
