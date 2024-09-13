import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../../assets/scss/ProfilePage.scss'; // Correct path

const ProfilePage = () => {
  return (
    <div className="row profile-page">
      <div className="col-3 sidebar">
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/profile/details">Profile Details</Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile/passwordchange">Password Change</Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile/voting-overview">Voting Overview</Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile/social-media-integration">Social Media Integration</Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile/settings">Settings</Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile/security">Security</Link>
          </li>

        </ul>
      </div>
      <div className="col-9 content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
