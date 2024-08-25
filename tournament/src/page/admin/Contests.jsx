import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteContest, GetContests } from "../../redux/contestSlice";
import ModalForm from "./Forms/ModalForm";
import ContestForm from "./Forms/ContestForm";
import { getAllTimes } from "../../utils_sec/auth";
import { imageBaseUrl } from "../../assets/config";
import Loader from "../../components/Loader";
import ContestsCard from "../../components/ContestsCard";

function Contests() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.GetContest.items);
  const isStatus = useSelector((state) => state?.GetContest.status);


  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    dispatch(GetContests());
};

  useEffect(() => {
    dispatch(GetContests());
  }, [dispatch]);

  const handelDelete = (id) =>{
    dispatch(deleteContest(id)).then((res)=>{
      dispatch(GetContests());
    })
}

  return (
    <div className="py-3">
       {isStatus === "loading" && <Loader/>}
      <Container>
        <div className="actions">
          <button onClick={handleShow} className="pr-btn">
            <CiSquarePlus size={35} /> Create Contests
          </button>
        </div>
        <Row className="mt-4">
        {data?.slice()?.reverse()?.map((item, key) => (
          <Col key={key} md={3} className="mb-3">
            {console.log(item)}
          <ContestsCard
                id={item?._id}
                startDate={getAllTimes(item?.startDate)?.formattedDate}
                image={imageBaseUrl + item?.image }
                name={item?.name}
                citie={item?.cities}
                joinBtn={""}
                joined={""}
            />
          </Col>
        ))}
        </Row>

        <Table responsive bordered className="mt-3 rounded">
          <thead>
            <tr>
              <th>Contests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.slice()?.reverse()?.map((item) => (
              <tr>
                <td> 
                  <div className='Tourament d-flex gap-3'>
                        <img style={{objectFit:"cover"}} className='rounded-2 ' width={200} height={150} src={imageBaseUrl + item?.image } alt={item?.name} srcset={imageBaseUrl + item?.image } /> 
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
                  <span className="d-flex gap-3">
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
        title={"New Contest"}
        handleClose={handleClose}
        show={show}
        component={<ContestForm handleClose={handleClose}/>}

        />
    </div>
  );
}

export default Contests;
