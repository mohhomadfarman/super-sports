import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { CiSquarePlus } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux';
import { createRegion, deleteRegion, GetCities } from '../../redux/citiesSlice';
import Loader from '../../components/Loader';

function Regions() {
const [region,setRegion] =useState()
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.GetCities.items);
    const isStatus = useSelector((state) => state?.GetCities.status);

    useEffect(() => {
      dispatch(GetCities());
    }, [dispatch]);
  
    const handelSubmit  = (e) =>{
      e.preventDefault();
      dispatch(createRegion({name:region})).then((res)=>{
        dispatch(GetCities());
        e.target[0].value = ''
 
      })
    }
    const handelDelete = (id) =>{
      dispatch(deleteRegion(id)).then((res)=>{
        dispatch(GetCities());
      })
  }


  return (
    <div className='py-3'>
       {isStatus === "loading" && <Loader/>}
    <Container>
    <div className='actions'>
          <form className='w-100 d-flex  gap-3' onSubmit={handelSubmit}>
           <div className="col-4 d-flex">
            <input className='form-control' onChange={(e)=> setRegion(e.target.value)} type="text" name="name" placeholder='New Regions Name' />
            </div>
            <div className="col-3  d-flex">
            <button type='submit' className='pr-btn py-2 px-3'><CiSquarePlus size={35} /> Add Regions</button>
            </div>
            </form>
        </div>


        <Table responsive bordered className='mt-3 rounded'>
        <thead>
            <tr>
            <th>#</th>
            <th>Regions</th>
            </tr>
        </thead>
        <tbody>
            {data?.map((item,key) =>(
             <tr key={item?.id}>
             <td >{key +1}</td>
             <td >
               <div className='d-flex justify-content-between'>
               <span className='fs-3'>{item?.name}</span>
 
             <span className='d-flex gap-3'>
                 <button onClick={()=>handelDelete(item?._id)} className='btn btn-danger'>Delete</button>
                 <button className='btn btn-secondary'>Edit</button>
                 </span>
                 </div>
             </td>
             
             </tr>
            ))}
        </tbody>
        </Table>

    </Container>
</div>
  )
}

export default Regions