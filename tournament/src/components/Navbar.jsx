import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.scss";
import { NavbarMenu, UserNavbarMenu } from "../assets/Menu";
import { Link, useNavigate } from "react-router-dom";
import { getUserId } from "../utils_sec/auth";

function Navbars() {
  const role = getUserId()?.userRole;
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    setChange(key);
  };

  const logout = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container fluid className="shadow-sm navbar">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-black" to="/">
            Sports Name
          </Link>
        </Navbar.Brand>
        
        {/* Navbar Menu for Admin */}
        {role === "admin" && (
          <div className="Menus d-flex justify-content-between">
            {NavbarMenu?.map((menu, key) => (
              <Link
                className={`text-decoration-none menuList ${key === change ? "active" : ""}`}
                onClick={() => handleMenuClick(key)}
                key={key}
                to={menu?.toLowerCase()}
              >
                {menu}
              </Link>
            ))}
            <Link className="text-decoration-none menuList" onClick={logout}>
              Logout
            </Link>
          </div>
        )}
        
        {/* If No User Role */}
        {!role && (
          <div className="ms-auto">
            <Link className="btn btn-primary Signup rounded-1" to="/signup">
              SIGNUP
            </Link>
          </div>
        )}

        {/* Navbar Menu for User */}
        {role === "user" && (
          <div className="Menus d-flex justify-content-between">
            {UserNavbarMenu?.map((menu, key) => (
              <Link
                className={`text-decoration-none menuList ${key === change ? "active" : ""}`}
                onClick={() => handleMenuClick(key)}
                key={key}
                to={menu?.toLowerCase() === "profile" ? `${menu?.toLowerCase()}/details` : menu?.toLowerCase()}
              >
                {menu}
              </Link>
            ))}
            <Link className="text-decoration-none menuList" onClick={logout}>
              Logout
            </Link>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default Navbars;
