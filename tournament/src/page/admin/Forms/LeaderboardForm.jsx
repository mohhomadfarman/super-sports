import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createLeaderBoard, getLeaderboardByUserId, updateLeaderboardByUserId } from '../../../redux/leaderboardSlice';
import { Getvideosubmit } from '../../../redux/getvideosubmitSlice'; 
import { imageBaseUrl } from '../../../assets/config';

function LeaderboardForm({ handleClose, data, contest }) {
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);
  const [formData, setFormData] = useState({
    score: "",
    isWinner: false,
    userId: data?._id,
    contestId: contest?._id,
    subroundId: contest?.rounds[0]?.SubRounds[0],
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);

  // Fetch leaderboard data and video submission
  useEffect(() => {
    if (data?._id) {
      // Fetch leaderboard data
      setLoadingLeaderboard(true);
      dispatch(getLeaderboardByUserId(data._id))
        .then((res) => {
          const leaderboardData = res.payload.data;
          if (leaderboardData) {
            setFormData(prev => ({
              ...prev,
              score: leaderboardData.score || "",
              isWinner: leaderboardData.isWinner || false,
              contestId: leaderboardData.contestId || prev.contestId,
              subroundId: leaderboardData.subroundId || prev.subroundId,
            }));
            setIsUpdate(true);
          }
        })
        .catch(err => {
          setLeaderboardError(err.message);
        })
        .finally(() => {
          setLoadingLeaderboard(false);
        });

      // Fetch video submission
      setLoadingVideo(true);
      dispatch(Getvideosubmit(data._id))
        .then((res) => {
          setVideo(res.payload[0]);
        })
        .catch(err => {
          setVideoError(err.message);
        })
        .finally(() => {
          setLoadingVideo(false);
        });
    }
  }, [dispatch, data?._id]);

  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!data?._id) {
      alert("User ID is missing");
      return;
    }
  
    const submitData = {
      score: formData.score,
      isWinner: formData.isWinner,
      contestId: formData.contestId,
      subroundId: formData.subroundId,
    };
  
    const action = isUpdate 
      ? updateLeaderboardByUserId({ id: data?._id, item: submitData })
      : createLeaderBoard({ id: data?._id, item: [...submitData] });
  
    dispatch(action)
      .then((res) => {
        console.log(`${isUpdate ? "Update" : "Create"} response:`, res);
        handleClose(); // Optionally close the form upon successful submission
      })
      .catch(err => console.error(`${isUpdate ? "Update" : "Create"} error:`, err));
  };
  
  // Display the leaderboard loading and error states in the JSX
return (
  <div>
    {/* Leaderboard Loading/Error States */}
    {loadingLeaderboard && <p>Loading leaderboard...</p>}
    {leaderboardError && <p>Error loading leaderboard: {leaderboardError}</p>}
    
    {/* Video Section */}
    <div className="mb-3">
      {loadingVideo && <p>Loading video...</p>}
      {videoError && <p>Error loading video: {videoError}</p>}
      {video ? (
        <video width="100%" controls>
          <source src={`${imageBaseUrl}${video?.submission}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        !loadingVideo && <p>No video available</p>
      )}
    </div>

    {/* Form Inputs */}
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
      <button onClick={handleSubmit} className="btn btn-primary">
        {isUpdate ? "Update Score" : "Submit"}
      </button>
    </div>
  </div>
);

}

export default LeaderboardForm;
