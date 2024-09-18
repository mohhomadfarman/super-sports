import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetContests } from '../redux/contestSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function ContestsCard({ image, name, citie, startDate, joined, id }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetContests());
    }, [dispatch]);

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
                                    <FaLocationDot size={12} color="#ff0000" /> {citie?.map((item, index) => (
                                        <span key={index}>
                                            {item?.name}
                                            {index < citie.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <Link to={`/contest/${id}`}>
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
    );
}

export default ContestsCard;
