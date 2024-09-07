import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { createLeaderBoard } from '../../../redux/leaderboardSlice';

function LeaderboardForm({ handleClose,data,contest }) {
  const dispatch = useDispatch();

  useEffect(() => {

    
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue, 
    });
  };

  const [formData, setFormData] = useState({
    score: '',       
    isWinner: '',
    userId: data?._id,
    contestId: contest?._id,
    subroundId: contest?.rounds[0]?.SubRounds[0]
  });

  const [error, setError] = useState('');

  const handleCreate =  () => {
    dispatch(createLeaderBoard({id:data?._id,item:formData})).then((res)=>{

      console.log(res)
    })
    // handleClose();
  };
  return (
    <div>
      <div className="mb-3">
        <video width="100%" controls>
          <source src="http://localhost:8080/uploads/1725611738133-1 Minute Sample Video (1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Rating Input */}
      <Form.Group className="mb-3" controlId="ratingInput">
        <Form.Label>Score</Form.Label>
        <Form.Control 
          type="number" 
          min="1" 
          max="10" 
          placeholder="Enter Score" 
          name="score"                
          value={formData.score}   
          onChange={handleInputChange} 
        />
      </Form.Group>

      {/* Winner and Not Winner Checkboxes */}
      <Form.Group controlId="winnerCheckbox" className="mb-3">
        <Form.Check 
          type="checkbox" 
          label="Winner" 
          name="isWinner"               
          checked={formData.isWinner}  
          onChange={handleInputChange} 
        />
      </Form.Group>

      {/* Centered Submit Button */}
      <div className="text-center">
        <button onClick={handleCreate} className="btn btn-primary">Submit</button>
      </div>
    </div>
  )
}

export default LeaderboardForm;
