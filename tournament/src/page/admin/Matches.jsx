import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { CiSquarePlus } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux';
import { deleteMatch, Getmatches } from '../../redux/matchesSlice';
import { getAllTimes } from '../../utils_sec/auth';
import ModalForm from './Forms/ModalForm';
import MatchesForm from './Forms/MatchesForm';
import Loader from '../../components/Loader';

function Matches() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.GetMatches.items);
    const isStatus = useSelector((state) => state?.GetMatches.status);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false)
        dispatch(Getmatches());
    };

    useEffect(() => {
      dispatch(Getmatches());
    }, [dispatch]);
  

    const handelDelete = (id) =>{
        dispatch(deleteMatch(id)).then((res)=>{
          dispatch(Getmatches());
        })
    }

  return (
    <div className='py-3'>
        {isStatus === "loading" && <Loader/>}
        <Container>
            <div className='actions'>
                <button onClick={handleShow} className='pr-btn'><CiSquarePlus size={35} /> Create Matches</button>
            </div>


            <Table responsive bordered className='mt-3 rounded'>
            <thead>
                <tr>
                <th>#</th>
                <th>Matches</th>
                <th>Type of match</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.slice()?.reverse().map((item,key) =>(
                <tr key={item?._id}>
                    <td>   <span>{key+1}</span></td>
                <td>
                    <div className='Tourament d-flex gap-2 flex-column'>
                 
                    <span className='fs-3'>{item?.name}</span>
                    </div>
                </td>
                <td>{item?.type}</td>
                <td> <span> {getAllTimes(item?.startDate)?.formattedDate}</span></td>
                <td> <span> {getAllTimes(item?.endDate)?.formattedDate}</span></td>
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
        title={"New Match"}
        handleClose={handleClose}
        show={show}
        component={<MatchesForm handleClose={handleClose}/>}

        />
    </div>
  )
}

export default Matches