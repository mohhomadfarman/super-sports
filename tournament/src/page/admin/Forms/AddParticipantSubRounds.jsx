import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetSubRounds } from '../../../redux/roundsSlice';

function AddParticipantSubRounds({ winners }) {

    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        dispatch(GetSubRounds(winners)).then((res) => {
            setData(res?.payload?.data)
        })
    }, [dispatch, winners]);

    return (
        <div className='row'>
            <div className="col-md-12">
                <div className='mb-3'>
                    <div className='form-label'>
                        <h4>Select Participant</h4>
                        {data?.winners?.length > 0 ? (
                            <>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.winners.map((item) => {
                                            const capitalizeFirstLetter = (str) => {
                                                if (!str) return '';
                                                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                                            };

                                            const fullName = `${capitalizeFirstLetter(item.firstName)} ${capitalizeFirstLetter(item.lastName)}`;

                                            return (
                                                <tr key={item._id}>
                                                    <td>{fullName}</td>
                                                    <td>{item.score}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className='text-center mt-3'>
                                    <button className='btn btn-primary'>
                                        Next Round
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p>No winners found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddParticipantSubRounds;
