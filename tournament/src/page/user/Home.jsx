import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetHomeContests } from '../../redux/contestSlice';
import ContestsCard from '../../components/ContestsCard';
import { imageBaseUrl } from '../../assets/config';
import '../../assets/scss/Home.scss';

function Home() {
  const dispatch = useDispatch();
  const [contests, setContests] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(GetHomeContests())
        .unwrap()
        .then((data) => {
          setContests(data);
          setStatus('succeeded');
        })
        .catch((err) => {
          setError(err.message);
          setStatus('failed');
        });
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const filteredContests = contests.filter(contest =>
    contest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container home">
      <div className="header">
        <h1>Contests</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='btn btn-primary rounded-1 fs-5' style={{marginRight: "10px"}}>SEARCH</button>
        </div>
      </div>
      <div className="contests-grid">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
            <ContestsCard
              key={contest._id}
              image={contest.image ? `${imageBaseUrl}${contest.image}` : 'path/to/no-image-placeholder.png'}
              name={contest.name}
              citie={contest.cities}
              startDate={new Date(contest.startDate).toLocaleDateString()}
              joined={false} // Or set appropriate value
              id={contest._id}
            />
          ))
        ) : (
          <p>No contests available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
