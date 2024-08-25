import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { joinContest } from "../../../redux/contestSlice";

function Submission({ handleClose, id }) {
  const dispatch = useDispatch();
  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!submission) {
        setError('submission are required');
        return;
      }
  
      const form = new FormData();
      form.append('submission', submission);
  
      dispatch(joinContest({submission:form,id:id})).then((res) => {
        handleClose();
      });
      setError(''); 
    }
  const handleChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
        setSubmission(files[0]);
      setError(''); // Clear any previous error
    }
  };

  return (
    <Container>
      <div className="mb-3">
        <div className="form-label">
          Submission
          <input
            type="file"
            className="form-control"
            name="submission"
            onChange={handleChange}
          />
        </div>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleCreate}>Submit</button>
    </Container>
  );
}

export default Submission;
