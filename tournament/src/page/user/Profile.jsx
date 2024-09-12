// Profile.js
import React from 'react';
import ProfileForm from '../../components/ProfileForm'; // Import ProfileForm
import { Col, Container, Row } from 'react-bootstrap';
import '../../assets/scss/profile.scss';
import Sidebar from '../../components/Sidebar';

function Profile() {
  return (
    <Container fluid className="profile-layout">
      <Row>
        <Col md={3}>
          <Sidebar /> {/* Sidebar component */}
        </Col>
        <Col md={9}>
          <div className="profile-content">
            <ProfileForm /> {/* Render ProfileForm here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
