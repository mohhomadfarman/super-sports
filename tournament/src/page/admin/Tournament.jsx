import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTournaments, GetTournamets } from '../../redux/tournamentSlice';
import ModalForm from './Forms/ModalForm';
import TournamentForms from './Forms/TournamentForms';
import { imageBaseUrl } from '../../assets/config';
import { getAllTimes } from '../../utils_sec/auth';
import Loader from '../../components/Loader';

function Tournament() {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        dispatch(GetTournamets());
    };
    const handleShow = () => setShow(true);
    const data =useSelector((state)=>state?.GetTournamet?.items)
    const isStatus =useSelector((state)=>state?.GetTournamet?.status)

    useEffect(()=>{
        dispatch(GetTournamets())
    },[dispatch])

    const handelDelete = (id) =>{
        dispatch(deleteTournaments(id)).then((res)=>{
          dispatch(GetTournamets());
        })
    }
  return (
    <div className='py-3'>
        {isStatus === "loading" && <Loader/>}
        <Container>
            <div className='actions'>
                <button onClick={handleShow} className='pr-btn'><CiSquarePlus size={35} /> Create Tournament</button>
            </div>


            <Table responsive bordered className='mt-3 rounded'>
            <thead>
                <tr>
                <th>Tournament</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.slice()?.reverse().map((item) =>(
                <tr>
                <td>
                    <div className='Tourament d-flex gap-3'>
                        <img style={{objectFit:"cover"}} className='rounded-2 ' width={200} height={150} src={imageBaseUrl + item?.file } alt={item?.name} srcset={imageBaseUrl + item?.file } /> 
                        <div className='d-flex flex-column'>
                        <span className='fs-3'>{item?.name}</span>
                        <span >City/Region: {item?.city?.name}</span>
                        <span >Matches Count: {item?.matches?.length}</span>
                        <span>Start Date: {getAllTimes(item?.startDate)?.formattedDate}</span>
                        <span>End Date: {getAllTimes(item?.endDate)?.formattedDate}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span className='d-flex gap-3'>
                    <button onClick={()=>handelDelete(item?._id)} className='btn btn-danger'>Delete</button>
                    <button className='btn btn-secondary'>Edit</button>
                    </span>
                </td>
                </tr>
                ))}
            </tbody>
            </Table>

        </Container>

        <ModalForm
        title={"New Tournament"}
        handleClose={handleClose}
        show={show}
        component={<TournamentForms  handleClose={handleClose} />}

        />
    </div>
  )
}

export default Tournament