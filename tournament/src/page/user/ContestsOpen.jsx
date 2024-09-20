import React, { useEffect, useState, useMemo } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetHomeSingleContests, GetSingleContests } from "../../redux/contestSlice";
import { imageBaseUrl } from "../../assets/config";
import AddSubRounds from "../admin/Forms/AddSubRounds";
import { getContestRounds } from "../../redux/roundsSlice";
import ModalForm from "../admin/Forms/ModalForm";
import Submission from "../admin/Forms/Submission";
import { getUserId } from "../../utils_sec/auth";

function ContestsOpen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const rounds = useSelector((state) => state.getContestRounds.items);

  // Memoized userid to prevent re-calculation on every render
  const userid = useMemo(() => getUserId()?.id, []);

  // Fetch contest and rounds when component mounts or id, userid changes
  useEffect(() => {
    dispatch(getContestRounds(id));
    
    // If user is logged in, fetch with GetSingleContests, else use GetHomeSingleContests
    const fetchContest = userid ? GetSingleContests : GetHomeSingleContests;
    
    dispatch(fetchContest(id)).then((res) => {
      setData(res.payload);
    });
  }, [id, userid, dispatch]); // Include userid as a dependency

  const handleClose = () => {
    setShow(false);
    dispatch(GetSingleContests(id)).then((res) => {
      setData(res.payload);
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  // Check if user has joined the contest
  const isUserJoined = useMemo(
    () => data?.participants?.some((item) => item?._id === userid),
    [data, userid]
  );

  return (
    <>
      <Container className="position-relative container-bg mt-3">
        <Row>
          <Col>
            <img
              className="image-banner"
              src={`${imageBaseUrl}${data?.image}`}
              alt={data?.name || "Contest Banner"}
            />
          </Col>
          <Col md={12} className="mt-5 mx-5 text-white">
            <h1>{data?.name}</h1>
            <p>{data?.description}</p>
            {userid ? (
              <button
                onClick={handleShow}
                disabled={isUserJoined}
                className={`border-0 fs-5 ${
                  isUserJoined ? "btn btn-secondary" : ""
                }`}
              >
                {isUserJoined ? "JOINED" : "JOIN NOW"}
              </button>
            ) : (
              <a href="/login">
                <button className={`border-0 fs-5 "btn btn-secondary"`}>
                  JOIN NOW
                </button>
              </a>
            )}
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={8} className="mt-4">
            <div className="w-100 justify-content-start align-items-center bg-light px-3 py-3 pt-0 rounded mb-3">
              <h2>Rounds</h2>
              <Accordion defaultActiveKey="0">
                {rounds?.map((item, key) => (
                  <Accordion.Item key={key} eventKey={key}>
                    <Accordion.Header>
                      <h4>{item?.name}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <AddSubRounds
                        NoFoundMsg={
                          !item?.SubRounds.length && "No Sub Rounds Found"
                        }
                        subRound={item?.SubRounds}
                        id={item?._id}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Col>
          <Col md={4} className="mt-4">
            <div className="navbar bg-light px-3 rounded">
              <h3 className="d-flex justify-content-between w-100">
                Participants
                <span className="btn px-3 bg-success rounded-5 text-white">
                  {data?.participants?.length}
                </span>
              </h3>
              <div className="w-100">
                {data?.participants?.map((item, key) => (
                  <p
                    key={key}
                    className={`text-capitalize d-flex gap-3 align-items-center fs-5 text-secondary border p-2 rounded ${
                      userid === item?._id ? "bg-primary-2" : ""
                    }`}
                  >
                    <span className="btn px-3 bg-success rounded-5 text-white">
                      #{key + 1}
                    </span>
                    {item?.firstName} {item?.lastName}
                  </p>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <ModalForm
        title={"Submit your 1 min video"}
        handleClose={handleClose}
        show={show}
        component={<Submission handleClose={handleClose} id={data?._id} />}
      />
    </>
  );
}

export default ContestsOpen;
