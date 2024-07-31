import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { CiSquarePlus } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, deleteCategories, GetCategories } from '../../redux/categoriesSlice';
import Loader from '../../components/Loader';

function Categories() {
  const [categories,setCategories] =useState()
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.GetCategories.items);
    const isStatus = useSelector((state) => state?.GetCategories.status);

    useEffect(() => {
      dispatch(GetCategories());
    }, [dispatch]);
  
    
const handelSubmit = (e)=>{
  e.preventDefault();
  dispatch(createCategories({name:categories})).then((res)=>{
    dispatch(GetCategories());
       e.target[0].value = ''
  })
}

const handelDelete = (id) =>{
    dispatch(deleteCategories(id)).then((res)=>{
       dispatch(GetCategories());
    })
}
  return (
    <div className='py-3'>
       {isStatus === "loading" && <Loader/>}
    <Container>
      <Row>
        <Col md={12}>
        <div className='actions'>
          <form className='w-100 d-flex  gap-3' onSubmit={handelSubmit}>
           <div className="col-4 d-flex">
            <input className='form-control' onChange={(e)=> setCategories(e.target.value)} type="text" name="name" placeholder='New Categories Name' />
            </div>
            <div className="col-3  d-flex">
            <button type='submit' className='pr-btn py-2 px-3'><CiSquarePlus size={35} /> Add Categories</button>
            </div>
            </form>
        </div>
        <Table responsive bordered className='mt-3 rounded'>
        <thead>
            <tr>
            <th>#</th>
            <th >Categories</th>
            </tr>
        </thead>
        <tbody>
            {data?.slice()?.reverse()?.map((item,key) =>(
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
        </Col>
      </Row>
    </Container>
</div>
  )
}

export default Categories