import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContest, GetContests } from '../redux/contestSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function ContestsCard({ image, name, citie, startDate, joinBtn, joined, id}) {

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
    <div className="games">
      <div className="banner_wrapper">
        <div className="label">Started at: {startDate}</div>
        <div className="banner">
          <img
            src={image}
            alt={name}
            className="banner__image"
          />
        </div>
        <div className="card__wrapper w-100">
          <div className="card d-flex w-100 flex-row align-items-start">
            <div className="card__info">
              <div>
                <span>{name}</span>
                <p>
                  <FaLocationDot size={12} color="#ff0000" /> {citie?.map((item)=>(
                    <span>{item?.name} {item.lenght >0 && (',')}</span>
                  ))}
                </p>
              </div>
            </div>
            <Link
            
            to={`/contest/${id}`}>
            <button className={`border-0`}>
            Open
            </button>
            </Link>
            {/* <button
              onClick={joinBtn}
              disabled={joined}
              className={`border-0 ${joined ? "btn btn-secondary" : ""}`}
              aria-label={joined ? "Already joined" : "Join contest"}
            >
              {joined ? "JOINED" : "JOIN"}
              {console.log(joined)}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContestsCard