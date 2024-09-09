import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createLeaderBoard } from '../../../redux/leaderboardSlice';
import { Getvideosubmit } from '../../../redux/getvideosubmitSlice'; 
import { imageBaseUrl } from '../../../assets/config';

function LeaderboardForm({ handleClose, data, contest }) {
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);

  const { items = [], status = 'idle', error = null } = useSelector(state => state.videosubmit || {});

  const [formData, setFormData] = useState({
    score: '',       
    isWinner: false,
    userId: data?._id,
    contestId: contest?._id,
    subroundId: contest?.rounds[0]?.SubRounds[0],
  });

  useEffect(() => {
    if (data?._id) {
      dispatch(Getvideosubmit(data._id)).then((res) => setVideo(res.payload[0]));
    }
  }, [dispatch, data?._id]);

  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreate = () => {
    dispatch(createLeaderBoard({ id: data?._id, item: formData })).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      {/* Video Section */}
      <div className="mb-3">
        {status === 'loading' && <p>Loading video...</p>}
        {status === 'failed' && <p>Error loading video: {error}</p>}
        {video ? (
          <video width="100%" controls>
            <source src={`${imageBaseUrl}${video?.submission}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available</p>
        )}
      </div>

      {/* Score Input */}
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

      <Form.Group controlId="winnerCheckbox" className="mb-3">
        <Form.Check 
          type="checkbox" 
          label="Winner"
          name="isWinner"
          checked={formData.isWinner}
          onChange={handleInputChange}
        />
      </Form.Group>
      <div className="text-center">
        <button onClick={handleCreate} className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
}

export default LeaderboardForm;
