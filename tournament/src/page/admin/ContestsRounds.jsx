import React, { useEffect, useState, useCallback } from "react";
import { Accordion, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { getContestRounds } from "../../redux/roundsSlice";
import { imageBaseUrl } from "../../assets/config";
import { GetSingleContests } from "../../redux/contestSlice";
import AddSubRounds from "./Forms/AddSubRounds";
import ModalForm from "./Forms/ModalForm";
import RoundsFrom from "./Forms/RoundsFrom";

const ContestsRounds = () => {
  const [show, setShow] = useState(false);
  const [contest, setContest] = useState();
  const [videoModalShow, setVideoModalShow] = useState(false); // for video modal
  const [selectedParticipant, setSelectedParticipant] = useState(null); // to store selected participant

  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => state.getContestRounds.items);

  useEffect(() => {
    dispatch(getContestRounds(id));
    dispatch(GetSingleContests(id)).then((res) => {
      setContest(res?.payload);
    });
  }, [dispatch, id]);

  const handleShow = useCallback(() => setShow(true), []);
  const handleClose = useCallback(() => {
    setShow(false);
    dispatch(getContestRounds(id));
  }, [dispatch, id]);

  // For opening the video modal
  const handleOpenModal = (participant) => {
    setSelectedParticipant(participant);
    setVideoModalShow(true);
  };

  // For closing the video modal
  const handleCloseModal = () => {
    setVideoModalShow(false);
  };

  return (
    <>
      <Container className="position-relative container-bg mt-3">
        <Row>
          <Col>
            <img
              className="image-banner"
              src={`${imageBaseUrl}${contest?.image}`}
              alt={data?.name || "Contest Banner"}
            />
          </Col>
          <Col md={12} className="mt-5 mx-5 text-white">
            <h1>
              Rounds of <br /> {contest?.name}
            </h1>

            <button className="border-0" onClick={handleShow}>
              <CiSquarePlus size={35} /> Create New Rounds
            </button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={8} className="mt-4">
            <Accordion defaultActiveKey="0">
              {data?.map((item, key) => (
                <Accordion.Item key={key} eventKey={key}>
                  <Accordion.Header>
                    <div className="d-flex justify-content-between w-100">
                      <h3>{item?.name}</h3>
                      <span className="d-flex gap-3">
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-secondary me-5">Edit</button>
                      </span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <AddSubRounds
                      NoFoundMsg={!item?.SubRounds.length && "No Sub Rounds Found"}
                      subRound={item?.SubRounds}
                      id={item?._id}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>

          {/* Participants Section */}
          <Col md={4} className="mt-4">
            <div className="navbar bg-light px-3 rounded">
              <h3 className="d-flex justify-content-between w-100">
                Participants
                <span className="btn px-3 bg-success rounded-5 text-white">
                  {contest?.participants?.length === undefined
                    ? "0"
                    : contest?.participants?.length}
                </span>
              </h3>
              <div className="w-100">
                {contest?.participants?.map((item, key) => (
                  <p
                    key={key}
                    className={`text-capitalize d-flex gap-3 align-items-center fs-5 text-secondary border p-2 rounded `}
                  >
                    <span className="btn px-3 bg-success rounded-5 text-white">
                      #{key + 1}
                    </span>
                    {item?.firstName} {item?.lastName}
                    {/* View Button to open the modal */}
                    <button
                      className="btn btn-primary ms-auto"
                      onClick={() => handleOpenModal(item)}
                    >
                      View
                    </button>
                  </p>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Modal for Video, Rating, and Checkboxes */}
        <Modal show={videoModalShow} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Participant Video - {selectedParticipant?.firstName}{" "}
              {selectedParticipant?.lastName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Video Section */}
            <div className="mb-3">
              <video width="100%" controls>
                <source src="http://localhost:8080/uploads/1725611738133-1 Minute Sample Video (1).mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Rating Input */}
            <Form.Group className="mb-3" controlId="ratingInput">
              <Form.Label>Score</Form.Label>
              <Form.Control type="number" min="1" max="10" placeholder="Enter Score" />
            </Form.Group>

            {/* Winner and Not Winner Checkboxes */}
            <Form.Group controlId="winnerCheckbox" className="mb-3">
              <Form.Check type="checkbox" label="Winner" />
            </Form.Group>
            <Form.Group controlId="notWinnerCheckbox">
              <Form.Check type="checkbox" label="Not Winner" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
            <button className="btn btn-primary">Submit</button>
          </Modal.Footer>
        </Modal>

        <ModalForm
          title={"Add Rounds"}
          handleClose={handleClose}
          show={show}
          component={<RoundsFrom handleClose={handleClose} />}
        />
      </Container>
    </>
  );
};

export default ContestsRounds;
