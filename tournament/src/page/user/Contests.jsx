import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TournamentCard from '../../components/TournamentCard';
import { getAllTimes, getUserId } from '../../utils_sec/auth';
import { useDispatch, useSelector } from 'react-redux';
import { GetContests, GetJoinedContest } from '../../redux/contestSlice';
import { imageBaseUrl } from '../../assets/config';

function ContestsUser() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.GetContest?.items);
    const userId = getUserId()?.id;
    const [joined,setJoined] =useState()

    useEffect(() => {
        dispatch(GetContests());
        dispatch(GetJoinedContest(userId)).then((res)=>{
            setJoined(res?.payload)
        })
    }, [dispatch, userId]);




    return (
        <Container className='pt-5'>
            <Row>
                <Col md={12}>
                    <h1 className='mb-4'>Latest Contests</h1>
                </Col>
            </Row>
            <Row>
                {data?.map((item, key) => (
                    <Col md={3} key={key}>
                        <TournamentCard
                            startDate={getAllTimes(item?.startDate)?.formattedDate}
                            image={`${imageBaseUrl}${item?.image}`}
                            name={item?.name}
                            citie={item?.cities[0]?.name}
                            id={item?._id}
                        />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col md={12} className='mt-5'>
                    <h1 className='mb-4'>Joined Contests</h1>
                </Col>
            </Row>
            <Row>
                {joined?.map((item, key) => (
                    <Col md={3} key={key}>
                        <TournamentCard
                            startDate={getAllTimes(item?.contest?.startDate)?.formattedDate}
                            image={`${imageBaseUrl}${item?.contest?.image}`}
                            name={item?.contest?.name}
                            citie={item?.contest?.cities[0]?.name}
                            id={item?.contest?._id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ContestsUser;
