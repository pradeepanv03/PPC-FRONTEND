
import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import ppclogo from "../Assets/ppc logo.jpg";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Header.css'
const Header = () => {
  const [expand, updateExpanded] = useState(false);
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate('/login');
  };
  const [hovered, setHovered] = useState(false);

  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttonStyle = (id) => ({
    backgroundColor: hoveredButton === id ? "#FF8E2B" : "#ffc631",
    color: hoveredButton === id ? "white" : "#001f3f", // Text color change
    marginRight: "5px",
    border: "none",
    transition: "background-color 0.3s ease",
  });
const linkStyle = (id) => ({
  color: hoveredLink === id ? "#F9754B" : "white",
  transition: "color 0.3s ease",
});
  return (
    <header>
      {/* Top Bar */}
      {/* <div className="text-white py-2" style={{backgroundColor: "#ffc631"}}>
  <Container className='p-0' style={{height:'50px'}}>
    <Row className="d-flex mt-2 align-items-center justify-content-center">
     
        <Col
      xs={12}
      md={6}
      className="d-flex align-items-center justify-content-center justify-content-md-start"
    >
      <span style={{ color: "#001f3f" }}>Need Help?</span>
      <FaPhoneAlt
        className={`mx-2 ${hovered ? "phone-animate" : ""}`}
        style={{ color: "#001f3f", transition: "transform 0.3s ease-in-out" }}
      />
      <span
        style={{
          color: "#001f3f",
          cursor: "pointer",
          fontWeight: hovered ? "bold" : "normal",
          transition: "font-weight 0.2s ease-in-out",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Call: +91 0413-2222244
      </span>

      <style>
        {`
          .phone-animate {
            animation: shake 0.3s ease-in-out infinite alternate;
          }

          @keyframes shake {
            0% { transform: rotate(0); }
            25% { transform: rotate(-10deg); }
            50% { transform: rotate(10deg); }
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(5deg); }
          }
        `}
      </style>
    </Col>
      <Col xs={12} md={6} className="d-flex align-items-center justify-content-center justify-content-md-end">
        <Button size="sm" className="me-2  weblogin" onClick={handleLoginPage}>Login</Button>
      </Col>
    </Row>
  </Container>
</div> */}

    <div className="container-fluid" style={{backgroundColor: "#ffc631"}}>
  <div className="row">
    <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-between align-items-center pt-2 pb-2">
      <div className="text-left">
        <p className='m-0' style={{fontSize: "14px"}}>
          Need Help? 
          <FaPhoneAlt
            className={`mx-2  ${hovered ? "phone-animate" : ""}`}
            style={{
              color: "#001f3f",
              transition: "transform 0.3s ease-in-out"
            }}
          /> 
          <span
            style={{
              color: "#001f3f",
              cursor: "pointer",
              fontWeight: hovered ? "bold" : "normal",
              transition: "font-weight 0.2s ease-in-out",
              fontSize: "14px"  // Adjust font size for mobile
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Call: +91 0413-2222244
          </span> 
        </p>
        
        <style>
          {`
            .phone-animate {
              animation: shake 0.3s ease-in-out infinite alternate;
            }

            @keyframes shake {
              0% { transform: rotate(0); }
              25% { transform: rotate(-10deg); }
              50% { transform: rotate(10deg); }
              75% { transform: rotate(-5deg); }
              100% { transform: rotate(5deg); }
            }

            @media (max-width: 576px) {
              .text-left p {
                font-size: 12px; /* Adjust font size for smaller screens */
              }
            }
          `}
        </style>
      </div>
      <div className="text-right">
        <Button size="sm" className="me-2 weblogin" onClick={handleLoginPage}>Login</Button>
      </div>
    </div>
  </div>
</div>

      {/* Main Navbar */}
      {/* <Navbar style={{backgroundColor:"#001f3f" , }} expand="lg">
        <Container fluid className='ps-5 pe-5'>

          <Navbar.Brand href="/" className="text-danger">
            <img src={ppclogo} alt="Logo" style={{ height: '40px' }} className='rounded-3' />
          </Navbar.Brand>
          <h3 className='m-0' style={{color:"#ffffff"}}>PONDY PROPERTY</h3>

          <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>         
         <Navbar.Collapse id="basic-navbar-nav" >
           <div className="ms-auto d-flex align-items-center">
  <Nav className="me-3 d-flex flex-column flex-lg-row w-100">
    
       {[
        { id: 1, name: "HOME", href: "/" },
        { id: 2, name: "My Account", href: "/login" },
        { id: 3, name: "All Property", href: "/login" },
        { id: 4, name: "Search", href: "/login" },
        { id: 5, name: "Pricing", href: "/login" },
        { id: 6, name: "Bradford", href: "/login" },
      ].map((item) => (
        <Nav.Link
          key={item.id}
          href={item.href}
          style={linkStyle(item.id)}
          onMouseEnter={() => setHoveredLink(item.id)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {item.name}
        </Nav.Link>
      ))}
      <div className="d-flex flex-column flex-lg-row">
      <Link
  to="/login"
  className="mb-2 mb-lg-0"
  onMouseEnter={() => setHoveredButton(1)}
  onMouseLeave={() => setHoveredButton(null)}
>
  <Button style={buttonStyle(1)}>Add Listing</Button>
</Link>

<Link
  to="/login"
  onMouseEnter={() => setHoveredButton(2)}
  onMouseLeave={() => setHoveredButton(null)}
>
  <Button style={buttonStyle(2)}>Buyer Assistance</Button>
</Link>
    </div>
    </Nav>
 
  </div>
          </Navbar.Collapse>
            </Container>

      </Navbar> */}
  
  <Navbar style={{ backgroundColor: "#001f3f" }} expand="lg">
  <Container fluid className="ps-3 pe-1">
    {/* Logo and Title on the left */}
    <div className="d-flex align-items-center">
      <Navbar.Brand href="/" className="text-danger">
        <img
          src={ppclogo}
          alt="Logo"
          style={{ height: '40px' }}
          className="rounded-3"
        />
      </Navbar.Brand>
      <h3 className="m-0 fs-3 fs-sm-4 fs-md-5 fs-lg-6" style={{ color: "#ffffff" }}>PONDY PROPERTY</h3>
    </div>

    {/* Navbar.Toggle on the right side */}
    <Navbar.Toggle
      aria-controls="responsive-navbar-nav"
      className="ms-auto" // This moves it to the right
      onClick={() => {
        updateExpanded(expand ? false : "expanded");
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </Navbar.Toggle>

    <Navbar.Collapse id="basic-navbar-nav">
      <div className="ms-auto d-flex align-items-center">
        <Nav className="me-3 d-flex flex-column flex-lg-row w-100">
          {[{ id: 1, name: "HOME", href: "/" },
            { id: 2, name: "My Account", href: "/login" },
            { id: 3, name: "All Property", href: "/login" },
            { id: 4, name: "Search", href: "/login" },
            { id: 5, name: "Pricing", href: "/login" },
            { id: 6, name: "Bradford", href: "/login" }].map((item) => (
              <Nav.Link
                key={item.id}
                href={item.href}
                style={linkStyle(item.id)}
                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.name}
              </Nav.Link>
            ))}
          <div className="d-flex flex-column flex-lg-row">
            <Link
              to="/login"
              className="mb-2 mb-lg-0"
              onMouseEnter={() => setHoveredButton(1)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Button style={buttonStyle(1)}>Add Listing</Button>
            </Link>

            <Link
              to="/login"
              onMouseEnter={() => setHoveredButton(2)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Button style={buttonStyle(2)}>Buyer Assistance</Button>
            </Link>
          </div>
        </Nav>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>


    </header>
  );
};

export default Header;