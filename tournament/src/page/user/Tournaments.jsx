import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TournamentCard from '../../components/TournamentCard'
import { useDispatch, useSelector } from 'react-redux'
import { GetTournamets } from '../../redux/tournamentSlice';
import { imageBaseUrl } from '../../assets/config';
import { getAllTimes } from '../../utils_sec/auth';


function Tournaments() {
    const dispatch =useDispatch();

    const data = useSelector((state)=>state?.GetTournamet?.items)
console.log(data)
    useEffect(()=>{
        dispatch(GetTournamets())
    },[dispatch])

  return (
    <Container className='pt-5'>
        <Row>
            <Col md={12}>
                    <h1 className='mb-4'>Latest Tournaments</h1>
            </Col>
        </Row>
        <Row>
           {data?.map((item)=> 
            ( 
            <Col md={3}>
                <TournamentCard startDate={getAllTimes(item?.startDate)?.formattedDate} image={imageBaseUrl+ item?.file} name={item?.name} citie={item?.city?.name} />
            </Col>
            )
            )}
        </Row>
    </Container>
  )
}

export default Tournaments