import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TournamentCard from '../../components/TournamentCard'
import { getAllTimes } from '../../utils_sec/auth'
import { useDispatch, useSelector } from 'react-redux';
import { GetContests } from '../../redux/contestSlice';
import { imageBaseUrl } from '../../assets/config';

function ContestsUser() {
    const dispatch =useDispatch();

    const data = useSelector((state)=>state?.GetContest?.items)
    useEffect(()=>{
        dispatch(GetContests())
    },[dispatch])

  return (
    <Container className='pt-5'>
    <Row>
        <Col md={12}>
                <h1 className='mb-4'>Latest Contests</h1>
        </Col>
    </Row>
    <Row>
       {data?.map((item)=> 
        ( 
        <Col md={3}>
            <TournamentCard startDate={getAllTimes(item?.startDate)?.formattedDate} image={imageBaseUrl + item?.images} name={item?.name} citie={item?.cities?.name} />
        </Col>
        )
        )}
    </Row>
</Container>
  )
}

export default ContestsUser