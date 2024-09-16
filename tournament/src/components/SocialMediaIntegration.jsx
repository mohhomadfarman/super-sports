import React from 'react';
import '../assets/scss/SocialMediaIntegration.scss';

function SocialMediaIntegration() {

  const videos = [
    { id: 1, title: "Video 1", votes: 120 },
    { id: 2, title: "Video 2", votes: 95 },
    { id: 3, title: "Video 3", votes: 78 }
  ];
  const handleShare = (platform, video) => {
    alert(`Sharing ${video.title} on ${platform}`);
  };

  return (
    <div className="social-media-integration">
      <h2>Social Media Integration</h2>

      <div className="video-list">
        <h3>Uploaded Videos</h3>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <strong>{video.title}</strong> - {video.votes} Votes
              <div className="share-buttons">
                <button onClick={() => handleShare("Facebook", video)}>Share on Facebook</button>
                <button onClick={() => handleShare("Twitter", video)}>Share on Twitter</button>
                <button onClick={() => handleShare("Instagram", video)}>Share on Instagram</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SocialMediaIntegration;
