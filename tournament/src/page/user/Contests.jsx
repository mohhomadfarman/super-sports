import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TournamentCard from '../../components/TournamentCard';
import { getAllTimes, getUserId } from '../../utils_sec/auth';
import { useDispatch, useSelector } from 'react-redux';
import { GetContests, GetJoinedContest } from '../../redux/contestSlice';
import { imageBaseUrl } from '../../assets/config';
import ModalForm from '../admin/Forms/ModalForm';
import Submission from '../admin/Forms/Submission';

function ContestsUser() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedContestId, setSelectedContestId] = useState(null);
    const [joined, setJoined] = useState([]);
    const data = useSelector((state) => state?.GetContest?.items);
    const userId = getUserId()?.id;

    const handleClose = () => {
        setShow(false);
        dispatch(GetContests());
        dispatch(GetJoinedContest(userId)).then((res) => {
            setJoined(res?.payload || []);
        });
    };

    const handleShow = (id) => {
        setSelectedContestId(id);
        setShow(true);
    };

    useEffect(() => {
        dispatch(GetContests());
        dispatch(GetJoinedContest(userId)).then((res) => {
            setJoined(res?.payload || []);
        });
    }, [dispatch, userId]);

    const isJoined = (contestId) => {
        return joined.some((item) => item.contest._id === contestId);
    };

    return (
        <Container className='pt-5'>
            <Row>
                <Col md={12}>
                    <h1 className='mb-4'>Latest Contests</h1>
                </Col>
            </Row>
            <Row>
                {data?.slice().reverse().map((item, key) => (
                    <Col md={3} key={key}>
                        <TournamentCard
                            startDate={getAllTimes(item?.startDate)?.formattedDate}
                            image={imageBaseUrl + item?.image}
                            name={item?.name}
                            citie={item?.cities[0]?.name}
                            joinBtn={() => handleShow(item._id)}
                            id={item?._id}
                            joined={isJoined(item?._id)}
                        />
                    </Col>
                ))}
            </Row>
            <ModalForm
                title={"Submit your 1 min video"}
                handleClose={handleClose}
                show={show}
                component={<Submission handleClose={handleClose} id={selectedContestId} />}
            />
        </Container>
    );
}

export default ContestsUser;
