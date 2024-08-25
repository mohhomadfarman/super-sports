import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetCities } from '../../../redux/citiesSlice';
import { useParams } from 'react-router-dom';
import { createRounds } from '../../../redux/roundsSlice';

const RoundsForm = ({ handleClose, type, id }) => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.GetCities.items);
  const { id: contestId } = useParams();

  useEffect(() => {
    dispatch(GetCities());
  }, [dispatch]);

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

  const handleCreate = useCallback(() => {
    if (!formData.name || !formData.numberOfWinners) {
      setError('Name and Number of Winners are required');
      return;
    }

    if (!type) {
      dispatch(createRounds(formData)).then(() => handleClose());
    } else if (type === 'subRound') {
      dispatch(createRounds(formData)).then(() => handleClose());
    }

    setError(''); // Clear error message if submission is successful
  }, [dispatch, formData, handleClose, type]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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
      <button onClick={handleCreate} className="btn btn-dark rounded-1 px-5 py-2">
        Create
      </button>
    </Container>
  );
};

export default RoundsForm;
