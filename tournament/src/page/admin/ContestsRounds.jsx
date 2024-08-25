import React, { useEffect, useState, useCallback } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { getContestRounds } from "../../redux/roundsSlice";
import { imageBaseUrl } from "../../assets/config";
import { getAllTimes } from "../../utils_sec/auth";
import ModalForm from "./Forms/ModalForm";
import RoundsFrom from "./Forms/RoundsFrom";
import AddSubRounds from "./Forms/AddSubRounds";
import { GetSingleContests } from "../../redux/contestSlice";

const ContestsRounds = () => {
  const [show, setShow] = useState(false);
  const [contest, setContest] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  const data = useSelector((state) => state.getContestRounds.items);

  useEffect(() => {
    dispatch(getContestRounds(id));
    dispatch(GetSingleContests(id)).then((res)=>{
      setContest(res?.payload)
    })
    
  }, [dispatch, id]);

  const handleShow = useCallback(() => setShow(true), []);
  const handleClose = useCallback(() => {
    setShow(false);
    dispatch(getContestRounds(id));
  }, [dispatch, id]);

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
            <h1>Rounds of <br /> {contest?.name}</h1>

            <button
            className="border-0"
              onClick={handleShow}
            >
             <CiSquarePlus size={35} /> Create New Rounds
            </button>
          </Col>
          </Row>
          </Container>
    <Container >
      <Row>
  
        {/* <Col md={12} className="mt-4">
          <div className="actions">
            <h1>Rounds of {contest?.name}</h1>
            <button onClick={handleShow} className="pr-btn">
              <CiSquarePlus size={35} /> Create Rounds
            </button>
          </div>
        </Col> */}
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
        <Col md={4} className="mt-4">
            <div className="navbar bg-light px-3 rounded">
              <h3 className="d-flex justify-content-between w-100">
                Participants
                <span className="btn px-3 bg-success rounded-5 text-white">
                  {contest?.participants?.length === undefined ? "0": contest?.participants?.length}
                </span>
              </h3>
              <div className="w-100">
                {contest?.participants?.map((item, key) => (
                  <p
                    key={key}
                    className={`text-capitalize d-flex gap-3 align-items-center fs-5 text-secondary border p-2 rounded `}
                  >
                    <span className="btn px-3 bg-success rounded-5 text-white">#{key + 1}</span>
                    {item?.firstName} {item?.lastName}
                  </p>
                ))}
              </div>
            </div>
          </Col>
      </Row>
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
