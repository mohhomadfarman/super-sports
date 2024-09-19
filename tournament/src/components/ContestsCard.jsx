import React, { useEffect, useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { GetContests } from '../redux/contestSlice';
import { FaLocationDot } from 'react-icons/fa6';
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { getUserId } from '../utils_sec/auth';

function ContestsCard({ image, name, citie, startDate, id, handleEdit, handleDelete }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const role = getUserId()?.userRole;

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        dispatch(GetContests());
    }, [dispatch]);

    return (
        <div className="games">
            <div className="banner_wrapper">
                {role === 'admin' && (
                    <>
                        <BsThreeDots
                            className="three-dots-icon"
                            onClick={handleMenuClick}
                        />
                        {showMenu && (
                            <div className="dropdown-menu show">
                                <button onClick={() => handleEdit(id)}>Edit</button>
                                <button onClick={() => handleDelete(id)}>Delete</button>
                            </div>
                        )}
                    </>
                )}
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
                        {role === 'admin' && (
                            <Link to={`/contest/${id}`}>
                                <button className="border-0">
                                    Open
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContestsCard;
