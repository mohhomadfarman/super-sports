import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCities } from "../../../redux/citiesSlice";
import { GetCategories } from "../../../redux/categoriesSlice";
import { createContests, UpdateContests } from "../../../redux/contestSlice";
import { Container } from "react-bootstrap";
import { imageBaseUrl } from "../../../assets/config";

function ContestForm({ handleClose, itemEdits }) {

  const dispatch = useDispatch();
  const cityList = useSelector((state) => state?.GetCities?.items);
  const categoriesList = useSelector((state) => state?.GetCategories?.items);
  const contest = useSelector((state) => state?.contests?.singleContest);

  // const [formData, setFormData] = useState({
  //   name: itemEdits?.name || "",
  //   description: itemEdits?.description || "",
  //   image: itemEdits?.image || "",
  //   cities: itemEdits?.cities?.[0]?._id || '',
  //   categories: itemEdits?.category?._id || '', 
  //   startDate: itemEdits?.startDate?.split('T')[0] || "",
  //   endDate: itemEdits?.endDate?.split('T')[0] || "",
  // });
  const [formData, setFormData] = useState({
    name: itemEdits !== null ? itemEdits?.name : "",
    description: itemEdits !== null ? itemEdits?.description : "",
    image: itemEdits !== null ? itemEdits?.image : "",
    cities: itemEdits !== null && itemEdits?.cities?.length > 0 ? itemEdits?.cities[0]?._id : "",
    categories: itemEdits !== null && itemEdits?.category ? itemEdits?.category?._id : "",
    startDate: itemEdits !== null ? itemEdits?.startDate?.split('T')[0] : "",
    endDate: itemEdits !== null ? itemEdits?.endDate?.split('T')[0] : "",
  });
  
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(GetCities());
    dispatch(GetCategories());
  }, [dispatch]);

  useEffect(() => {
    if (contest) {
      setFormData({
        name: contest.name || '',
        description: contest.description || '',
        image: contest.image || '',
        cities: contest.cities[0] || '', 
        categories: contest.category || '', 
        startDate: contest.startDate?.split('T')[0] || '',
        endDate: contest.endDate?.split('T')[0] || ''
      });
    }
  }, [contest]);

  const handleSubmit = () => {
    if (!formData.name || !formData.categories) {
      setError('Name and categories are required');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    if (formData.image) form.append('image', formData.image);
    form.append('cities', formData.cities);
    form.append('categories', formData.categories);
    form.append('startDate', formData.startDate);
    form.append('endDate', formData.endDate);

    if (itemEdits?._id) {
      dispatch(UpdateContests({ id: itemEdits._id, data: form })).then(() => {
        handleClose();
      });
    } else {
      dispatch(createContests(form)).then(() => {
        handleClose();
      });
    }
    setError('');
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
          Image
          <input 
            type="file" 
            className='form-control' 
            name="image" 
            onChange={handleChange} 
          />
          {formData.image && (
            <img 
              src={imageBaseUrl + formData.image} 
              alt="Current" 
              style={{ width: '100px', height: '75px', objectFit: 'cover' }} 
            />
          )}
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
      <button onClick={handleSubmit} className='btn btn-dark rounded-1 px-5 py-2'>
        {itemEdits?._id ? 'Update' : 'Create'}
      </button>
    </Container>
  );
}

export default ContestForm;
