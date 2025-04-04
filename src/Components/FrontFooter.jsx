

import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function FrontFooter() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredLink(index);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    position: "relative",
    display: "inline-block",
    transition: "all 0.3s ease",
  };

  const hoverEffectStyle = (index) => ({
    color: hoveredLink === index ? "#ffc631" : "white",
    borderBottom: hoveredLink === index ? "2px solid #ffc631" : "none",
  });

  return (
  //   <footer className="footer text-white py-5" style={{background:'#001f3f'}}>

  //   <Container className='mt-2'>
  //   <Row>
  //     {/* Column 1: About Us */}
  //     <Col md={3}>
  //       <h5>About Us</h5>
  //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"5px" }}></div>

  //       <ul className="list-unstyled">
  //         <Link to={'/about'} style={{textDecoration:"none" , color:"white"}}>
  //         <li>About us</li>
  //         </Link>
  //         <li>Terms & Conditions</li>
  //         <Link to={'/privacy-policy'} style={{textDecoration:"none" , color:"white"}}>
  //         <li>Privacy Policy</li>
  //         </Link>
  //         <Link to={'/'} style={{textDecoration:"none" , color:"white"}}>
  //         <li>Shipping & Delivery</li>
  //         </Link>
  //       </ul>
  //     </Col>

  //     {/* Column 2: How to Sell Fast */}
  //     <Col md={3}>
  //       <h5>How to Sell Fast</h5>
  //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"5px" }}></div>

  //       <ul className="list-unstyled">
  //         <li>Buy Now on PUC</li>
  //         <li>Price Plan</li>
  //         <li>Promote your ads</li>
  //       </ul>
  //     </Col>

  //     {/* Column 3: Help & Support */}
  //     <Col md={3}>
  //       <h5>Help & Support</h5>
  //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"5px" }}></div>

  //       <ul className="list-unstyled">
  //         <li>Live Chat</li>
  //         <li>FAQ</li>
  //         <Link to={'/'} style={{textDecoration:"none" , color:"white"}}>
  //         <li>Contact us</li>
  //         </Link>
  //         <li className='hhh'>Delete My Account</li>
  //       </ul>
  //     </Col>

  //     {/* Column 4: Follow Us On */}
  //     <Col md={3}>
  //       <h5 >Follow Us On</h5>
  //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"15px" }}></div>

  //       <div className="social-icons">
  //         <a href="https://www.facebook.com" className="text-white ">
  //           <FaFacebook size={30} style={{color:"#ffc631", marginRight:"5px"}} />
  //         </a>
  //         <a href="https://www.instagram.com" className="text-white ">
  //           <FaInstagram size={30} style={{color:"#ffc631", marginRight:"5px"}} />
  //         </a>
  //         <a href="https://www.youtube.com" className="text-white ">
  //           <FaYoutube size={30} style={{color:"#ffc631", marginRight:"5px"}}/>
  //         </a>
  //         <a href="https://www.linkedin.com" className="text-white">
  //           <FaLinkedin size={30} style={{color:"#ffc631"}}/>
  //         </a>
  //       </div>
  //     </Col>

  //   </Row>
  //   <hr></hr>
  //   <p className='text-center mt-4'>Copyright © 2025. All rights reserved.</p>

  // </Container>
  // </footer>
  <footer className="footer text-white py-5" style={{ background: '#001f3f' }}>
      <Container className='mt-2'>
        <Row>
          {/* Column 1: About Us */}
          <Col md={3}>
            <h5>About Us</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
            <ul className="list-unstyled">
  <li>
    <Link
      to="/about"
      style={{ ...linkStyle, ...hoverEffectStyle(0) }}
      onMouseEnter={() => handleMouseEnter(0)}
      onMouseLeave={handleMouseLeave}
    >
      About us
    </Link>
  </li>
  <li>
  <Link
      to="/terms-conditions-web"
      style={{ ...linkStyle, ...hoverEffectStyle(0) }}
      onMouseEnter={() => handleMouseEnter(0)}
      onMouseLeave={handleMouseLeave}
    >
Terms & Conditions    </Link>
</li>
  <li>
    <Link
      to="/privacy-policy"
      style={{ ...linkStyle, ...hoverEffectStyle(1) }}
      onMouseEnter={() => handleMouseEnter(1)}
      onMouseLeave={handleMouseLeave}
    >
      Privacy Policy
    </Link>
  </li>
  <li>
    <Link
      to="/shiping-delivery"
      style={{ ...linkStyle, ...hoverEffectStyle(2) }}
      onMouseEnter={() => handleMouseEnter(2)}
      onMouseLeave={handleMouseLeave}
    >
      Shipping & Delivery
    </Link>
  </li>
</ul>

          </Col>

          {/* Column 2: How to Sell Fast */}
          <Col md={3}>
            <h5>How to Sell Fast</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
            <ul className="list-unstyled">
              <li>Buy Now on PUC</li>
              <li>Price Plan</li>
              <li>Promote your ads</li>
            </ul>
          </Col>

          {/* Column 3: Help & Support */}
          <Col md={3}>
            <h5>Help & Support</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
            <ul className="list-unstyled">
              <li>Live Chat</li>
              <li>FAQ</li>
              <Link
                to={'/contact-web'}
                style={{ ...linkStyle, ...hoverEffectStyle(3) }}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <li>Contact us</li>
              </Link>
              <li className='hhh'>Delete My Account</li>
            </ul>
          </Col>

          {/* Column 4: Follow Us On */}
          <Col md={3}>
            <h5>Follow Us On</h5>
            <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "15px" }}></div>
            <div className="social-icons">
              <a href="https://www.facebook.com" className="text-white ">
                <FaFacebook size={30} style={{ color: "#ffc631", marginRight: "5px" }} />
              </a>
              <a href="https://www.instagram.com" className="text-white ">
                <FaInstagram size={30} style={{ color: "#ffc631", marginRight: "5px" }} />
              </a>
              <a href="https://www.youtube.com" className="text-white ">
                <FaYoutube size={30} style={{ color: "#ffc631", marginRight: "5px" }} />
              </a>
              <a href="https://www.linkedin.com" className="text-white">
                <FaLinkedin size={30} style={{ color: "#ffc631" }} />
              </a>
            </div>
          </Col>
        </Row>
        <hr />
        <p className='text-center mt-4'>Copyright © 2025. All rights reserved.</p>
      </Container>
    </footer>
)
}
















// import React, { useState } from 'react'
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// export default function FrontFooter() {
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const handleMouseEnter = (index) => {
//     setHoveredLink(index);
//   };

//   const handleMouseLeave = () => {
//     setHoveredLink(null);
//   };

//   const linkStyle = {
//     textDecoration: "none",
//     color: "white",
//     position: "relative",
//     display: "inline-block",
//     transition: "all 0.3s ease",
//   };

//   const hoverEffectStyle = (index) => ({
//     color: hoveredLink === index ? "#ffc631" : "white",
//     borderBottom: hoveredLink === index ? "2px solid #ffc631" : "none",
//   });

//   return (
//   //   <footer className="footer text-white py-5" style={{background:'#001f3f'}}>

//   //   <Container className='mt-2'>
//   //   <Row>
//   //     {/* Column 1: About Us */}
//   //     <Col md={3}>
//   //       <h5>About Us</h5>
//   //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"5px" }}></div>

//   //       <ul className="list-unstyled">
//   //         <Link to={'/about'} style={{textDecoration:"none" , color:"white"}}>
//   //         <li>About us</li>
//   //         </Link>
//   //         <li>Terms & Conditions</li>
//   //         <Link to={'/privacy-policy'} style={{textDecoration:"none" , color:"white"}}>
//   //         <li>Privacy Policy</li>
//   //         </Link>
//   //         <Link to={'/'} style={{textDecoration:"none" , color:"white"}}>
//   //         <li>Shipping & Delivery</li>
//   //         </Link>
//   //       </ul>
//   //     </Col>

//   //     {/* Column 2: How to Sell Fast */}
//   //     <Col md={3}>
//   //       <h5>How to Sell Fast</h5>
//   //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"5px" }}></div>

//   //       <ul className="list-unstyled">
//   //         <li>Buy Now on PUC</li>
//   //         <li>Price Plan</li>
//   //         <li>Promote your ads</li>
//   //       </ul>
//   //     </Col>

//   //     {/* Column 3: Help & Support */}
//   //     <Col md={3}>
//   //       <h5>Help & Support</h5>
//   //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"5px" }}></div>

//   //       <ul className="list-unstyled">
//   //         <li>Live Chat</li>
//   //         <li>FAQ</li>
//   //         <Link to={'/'} style={{textDecoration:"none" , color:"white"}}>
//   //         <li>Contact us</li>
//   //         </Link>
//   //         <li className='hhh'>Delete My Account</li>
//   //       </ul>
//   //     </Col>

//   //     {/* Column 4: Follow Us On */}
//   //     <Col md={3}>
//   //       <h5 >Follow Us On</h5>
//   //       <div style={{ borderBottom: "2px solid purple", width: "17%",  marginTop: "6px",marginBottom:"15px" }}></div>

//   //       <div className="social-icons">
//   //         <a href="https://www.facebook.com" className="text-white ">
//   //           <FaFacebook size={30} style={{color:"#ffc631", marginRight:"5px"}} />
//   //         </a>
//   //         <a href="https://www.instagram.com" className="text-white ">
//   //           <FaInstagram size={30} style={{color:"#ffc631", marginRight:"5px"}} />
//   //         </a>
//   //         <a href="https://www.youtube.com" className="text-white ">
//   //           <FaYoutube size={30} style={{color:"#ffc631", marginRight:"5px"}}/>
//   //         </a>
//   //         <a href="https://www.linkedin.com" className="text-white">
//   //           <FaLinkedin size={30} style={{color:"#ffc631"}}/>
//   //         </a>
//   //       </div>
//   //     </Col>

//   //   </Row>
//   //   <hr></hr>
//   //   <p className='text-center mt-4'>Copyright © 2025. All rights reserved.</p>

//   // </Container>
//   // </footer>
//   <footer className="footer text-white py-5" style={{ background: '#001f3f' }}>
//       <Container className='mt-2'>
//         <Row>
//           {/* Column 1: About Us */}
//           <Col md={3}>
//             <h5>About Us</h5>
//             <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
//             <ul className="list-unstyled">
//   <li>
//     <Link
//       to="/about"
//       style={{ ...linkStyle, ...hoverEffectStyle(0) }}
//       onMouseEnter={() => handleMouseEnter(0)}
//       onMouseLeave={handleMouseLeave}
//     >
//       About us
//     </Link>
//   </li>
//   <li>
//     <Link
//       to="/"
//       style={{ ...linkStyle, ...hoverEffectStyle(1) }}
//       onMouseEnter={() => handleMouseEnter(1)}
//       onMouseLeave={handleMouseLeave}
//     >
//       Terms & Conditions
//     </Link>
//   </li>
//   <li>
//     <Link
//       to="/privacy-policy"
//       style={{ ...linkStyle, ...hoverEffectStyle(1) }}
//       onMouseEnter={() => handleMouseEnter(1)}
//       onMouseLeave={handleMouseLeave}
//     >
//       Privacy Policy
//     </Link>
//   </li>
//   <li>
//     <Link
//       to="/"
//       style={{ ...linkStyle, ...hoverEffectStyle(2) }}
//       onMouseEnter={() => handleMouseEnter(2)}
//       onMouseLeave={handleMouseLeave}
//     >
//       Shipping & Delivery
//     </Link>
//   </li>
// </ul>

//           </Col>

//           {/* Column 2: How to Sell Fast */}
//           <Col md={3}>
//             <h5>How to Sell Fast</h5>
//             <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
//             <ul className="list-unstyled">
//               <li>Buy Now on PUC</li>
//               <li>Price Plan</li>
//               <li>Promote your ads</li>
//             </ul>
//           </Col>

//           {/* Column 3: Help & Support */}
//           <Col md={3}>
//             <h5>Help & Support</h5>
//             <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "5px" }}></div>
//             <ul className="list-unstyled">
//               <li>Live Chat</li>
//               <li>FAQ</li>
//               <Link
//                 to={'/'}
//                 style={{ ...linkStyle, ...hoverEffectStyle(3) }}
//                 onMouseEnter={() => handleMouseEnter(3)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <li>Contact us</li>
//               </Link>
//               <li className='hhh'>Delete My Account</li>
//             </ul>
//           </Col>

//           {/* Column 4: Follow Us On */}
//           <Col md={3}>
//             <h5>Follow Us On</h5>
//             <div style={{ borderBottom: "2px solid purple", width: "17%", marginTop: "6px", marginBottom: "15px" }}></div>
//             <div className="social-icons">
//               <a href="https://www.facebook.com" className="text-white ">
//                 <FaFacebook size={30} style={{ color: "#ffc631", marginRight: "5px" }} />
//               </a>
//               <a href="https://www.instagram.com" className="text-white ">
//                 <FaInstagram size={30} style={{ color: "#ffc631", marginRight: "5px" }} />
//               </a>
//               <a href="https://www.youtube.com" className="text-white ">
//                 <FaYoutube size={30} style={{ color: "#ffc631", marginRight: "5px" }} />
//               </a>
//               <a href="https://www.linkedin.com" className="text-white">
//                 <FaLinkedin size={30} style={{ color: "#ffc631" }} />
//               </a>
//             </div>
//           </Col>
//         </Row>
//         <hr />
//         <p className='text-center mt-4'>Copyright © 2025. All rights reserved.</p>
//       </Container>
//     </footer>
// )
// }
