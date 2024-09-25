import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getUserId } from "../utils_sec/auth";
import "./navbar.scss";
import { NavbarMenu, UserNavbarMenu } from "../assets/Menu";

function Navbars() {
  const role = getUserId()?.userRole;
  const [change, setChange] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    setChange(key);
  };

  const logout = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-wrapper') && showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <Container fluid className="shadow-sm navbar">
      <Container>
        <Navbar.Brand>
          <Link className="text-decoration-none text-black" to="/">
            Sports Name
          </Link>
        </Navbar.Brand>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <div className="d-none d-lg-flex ms-auto align-items-center">
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
            <div className="Menus d-flex">
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
            <div className="Menus d-flex">
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

        <div className={`menu-wrapper ${showMenu ? "show" : ""}`}>
          <button
            className="menu-close"
            type="button"
            onClick={toggleMenu}
          >
            &times;
          </button>

          <div className="menu-content">
            <div className="ms-auto d-flex flex-column align-items-center">
              {!role && (
                <Link
                  className={`text-decoration-none menuList ${change === -1 ? "active" : ""}`}
                  onClick={() => handleMenuClick(-1)}
                  to="/"
                >
                  Home
                </Link>
              )}

              {!role && (
                <>
                  <Link className="btn btn-primary rounded-1" to="/login">
                    LOGIN
                  </Link>
                  <Link className="btn btn-primary Signup rounded-1" to="/signup">
                    SIGNUP
                  </Link>
                </>
              )}

              {role === "admin" && (
                <div className="Menus d-flex flex-column align-items-center">
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

              {role === "user" && (
                <div className="Menus d-flex flex-column align-items-center">
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
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Navbars;
