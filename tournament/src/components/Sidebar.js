// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './sidebar.scss';

function Sidebar() {
  return (
    <div className="sidebar w-100">
      <ul>
        <li>
          <Link to="/profile">My Profile</Link> {/* Navigate to Profile route */}
        </li>
        <li>
          <Link to="/change-password">Change Password</Link> {/* Example route */}
        </li>
        <li>
          <Link to="/privacy-settings">Privacy Settings</Link> {/* Example route */}
        </li>
        <li>
          <Link to="/messages">Messages</Link> {/* Example route */}
        </li>
        <li>
          <Link to="/help-support">Help/Support</Link> {/* Example route */}
        </li>
        <li>
          <Link to="/logout">Logout</Link> {/* Example route */}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
