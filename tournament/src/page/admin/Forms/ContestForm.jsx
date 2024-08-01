import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCities } from '../../../redux/citiesSlice';
import { GetCategories } from '../../../redux/categoriesSlice';
import { createContests } from '../../../redux/contestSlice';
import { Container } from 'react-bootstrap';

function ContestForm({ handleClose }) {
  const dispatch = useDispatch();
  const cityList = useSelector((state) => state?.GetCities?.items);
  const categoriesList = useSelector((state) => state?.GetCategories?.items);

  useEffect(() => {
    dispatch(GetCities());
    dispatch(GetCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    cities: '',
    categories: '',
    startDate: '',
    endDate: ''
  });

  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!formData.name || !formData.categories) {
      setError('Name and categories are required');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('image', formData.image);
    form.append('cities', formData.cities);
    form.append('categories', formData.categories);
    form.append('startDate', formData.startDate);
    form.append('endDate', formData.endDate);

    dispatch(createContests(form)).then((res) => {
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
          Description
          <input 
            type="text" 
            className='form-control' 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='form-label'>
          Images
          <input 
            type="file" 
            className='form-control' 
            name="image" 
            onChange={handleChange} 
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='form-label'>
          Cities/Regions
          <select 
            className='form-control' 
            name="cities" 
            value={formData.cities} 
            onChange={handleChange}
          >
            <option value="">Select a City</option>
            {cityList?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <div className='form-label'>
          Categories
          <select 
            className='form-control' 
            name="categories" 
            value={formData.categories} 
            onChange={handleChange}
          >
            <option value="">Select a Category</option>
            {categoriesList?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
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

export default ContestForm;
