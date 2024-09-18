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

        <div className="ms-auto d-flex align-items-center">
          {!role && (
            <Link 
              className={`text-decoration-none menuList ${change === -1 ? "active" : ""}`} 
              onClick={() => handleMenuClick(-1)} 
              to="/"
              style={{ marginRight: "15px" }} 
            >
              Home
            </Link>
          )}

          {!role && (
            <>
              <Link className="btn btn-primary rounded-1" to="/login" style={{ marginRight: "10px" }}>
                LOGIN
              </Link>
              <Link className="btn btn-primary Signup rounded-1" to="/signup">
                SIGNUP
              </Link>
            </>
          )}

          {role === "admin" && (
            <div className="Menus d-flex justify-content-between">
              {NavbarMenu?.map((menu, key) => (
                <Link
                  className={`text-decoration-none menuList ${key === change ? "active" : ""}`}
                  onClick={() => handleMenuClick(key)}
                  key={key}
                  to={menu?.toLowerCase()}
                  style={{ marginRight: "15px" }} 
                >
                  {menu}
                </Link>
              ))}
              <Link className="text-decoration-none menuList" onClick={logout}>
                Logout
              </Link>
            </div>
          )}

          {role === "user" && (
            <div className="Menus d-flex justify-content-between">
              {UserNavbarMenu?.map((menu, key) => (
                <Link
                  className={`text-decoration-none menuList ${key === change ? "active" : ""}`}
                  onClick={() => handleMenuClick(key)}
                  key={key}
                  to={menu?.toLowerCase() === "profile" ? `${menu?.toLowerCase()}/details` : menu?.toLowerCase()}
                  style={{ marginRight: "15px" }} 
                >
                  {menu}
                </Link>
              ))}
              <Link className="text-decoration-none menuList" onClick={logout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
}
export default Navbars;
