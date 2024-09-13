import React from 'react';
import '../assets/scss/VotingOverview.scss';

function VotingOverview() {
  return (
    <div className="voting-overview">
      <h2>Voting Overview</h2>
      
      {/* Video List with Voting Details */}
      <div className="video-list">
        <h3>Uploaded Videos</h3>
        <ul>
          <li>
            <strong>Video 1</strong> - 120 Votes
            <button className="share-button">Share on Facebook</button>
          </li>
          <li>
            <strong>Video 2</strong> - 95 Votes
            <button className="share-button">Share on Twitter</button>
          </li>
          <li>
            <strong>Video 3</strong> - 78 Votes
            <button className="share-button">Share on Instagram</button>
          </li>
        </ul>
      </div>

      {/* Leaderboard */}
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ol>
          <li><strong>Video 1</strong> - 120 Votes</li>
          <li><strong>Video 2</strong> - 95 Votes</li>
          <li><strong>Video 3</strong> - 78 Votes</li>
        </ol>
      </div>

      {/* Voting Guidelines */}
      <div className="voting-guidelines">
        <h3>Voting Guidelines</h3>
        <p>Each user can vote once per video. Voting will close on [date].</p>
      </div>

      {/* Time Remaining */}
      <div className="time-remaining">
        <h3>Time Remaining for Voting</h3>
        <p>2 days 5 hours 20 minutes left to vote.</p>
      </div>

      {/* Call to Action */}
      <div className="cta">
        <button className="vote-button">Vote Now!</button>
      </div>
    </div>
  );
}

export default VotingOverview;
