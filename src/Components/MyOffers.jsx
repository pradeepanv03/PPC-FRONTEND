

import React, { useState } from "react";
import { FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign , FaCamera, FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

const MyOffers = () => {
  const [properties, setProperties] = useState([
    {
      _id: "1",
      ppcId: "PUC-001",
      photos: [],
      propertyMode: "Sale",
      propertyType: "Apartment",
      city: "Pondicherry",
      totalArea: "1200 sq.ft",
      bedrooms: 3,
      ownership: "Owner",
      bestTimeToCall: "9 AM - 5 PM",
      price: "₹50,00,000",
      removed: false,
    },
    {
      _id: "2",
      ppcId: "PUC-002",
      photos: [],
      propertyMode: "Rent",
      propertyType: "Villa",
      city: "Chennai",
      totalArea: "2000 sq.ft",
      bedrooms: 4,
      ownership: "Agent",
      bestTimeToCall: "10 AM - 6 PM",
      price: "₹1,00,000",
      removed: false,
    },
    {
      _id: "3",
      ppcId: "PUC-003",
      photos: [],
      propertyMode: "Sale",
      propertyType: "Plot",
      city: "Bangalore",
      totalArea: "5000 sq.ft",
      bedrooms: null,
      ownership: "Owner",
      bestTimeToCall: "11 AM - 7 PM",
      price: "₹75,00,000",
      removed: true,
    },
  ]);

  const filterProperties = (removedStatus) => {
    return properties.filter(property => property.removed === removedStatus);
  };

  return (
    <Container fluid style={{ fontFamily: '"inter", sans-serif', width:"470px" }}>
      <Helmet>
        <title>Pondy Property | Properties</title>
      </Helmet>

      <Tab.Container defaultActiveKey="all">
        <Row className="mb-4">
          <Col>
            <Nav variant="tabs" className="w-100">
              {/* All Tab */}
              <Nav.Item className="w-50">
                <Nav.Link className="text-center"
                  eventKey="all" 
                  style={{
                    backgroundColor: '#4F4B7E', 
                    color: 'white', 
                    padding: '10px 20px', 
                    borderRadius: '5px'
                  }}
                >
                  ALL
                </Nav.Link>
              </Nav.Item>

              {/* Removed Tab */}
              <Nav.Item className="w-50">
                <Nav.Link className="text-center"
                  eventKey="removed" 
                  style={{
                    backgroundColor: '#FF0000', 
                    color: 'white', 
                    padding: '10px 20px', 
                    borderRadius: '5px'
                  }}
                >
                  REMOVED
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row className="g-3">
          <Col lg={12} className="d-flex align-items-center justify-content-center">
            <Tab.Content>
              {/* Tab for All Properties */}
              <Tab.Pane eventKey="all">
                <div style={{ maxHeight: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                  {filterProperties(false).length > 0 ? (
                    filterProperties(false).map((property) => (
                      <div 
                        key={property._id} 
                        className="card mb-3 shadow p-1" 
                        style={{
                          width: '450px', 
                          minWidth: '400px', 
                          background: '#F9F9F9'
                        }}
                      >
                        <div className="row g-0">
                          {/* Image Column */}
                          <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
                            <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
                              PUC- {property.ppcId}
                            </div>
                            <div className="img-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                              <img
                                src={property.photos && property.photos.length > 0
                                  ? `http://localhost:5006/${property.photos[0]}`
                                  : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"}
                                className="img-fluid"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                                <div className="d-flex justify-content-between mt-2 w-100">
                                          <span className="p-2" style={{ color:'#fff', background:'#2F747F', fontSize:'12px' , borderRadius:'10% 75% 30% 10%'}}> <FaCamera className="me-1"/> 1</span>
                                          <span className="p-2" style={{ color:'#fff',  background:'#2F747F', fontSize:'12px', borderRadius:'75% 20% 30% 10%'}}>  <FaEye className="me-1" />1</span>
                                           </div>
                          </div>

                          {/* Content Column */}
                          <div className="col-md-8 col-8 p-1">
                            <div className="row">
                            <div className="col-6 d-flex align-items-center mt-1 mb-1">
                            <p className="m-0">{property.propertyMode}</p>

                                </div>
                                 <div className="col-6 d-flex align-items-center justify-content-end mt-1 mb-1">
                                 <p className="m-0"><button className="btn" style={{background:"#FF0000", color:"#fff"}}>remove</button></p>
                                </div>
                            
                            </div>
                            <p className="m-0">{property.propertyType}</p>
                            <p>{property.city}</p>
                            <div className="card-body p-2 d-flex flex-column justify-content-center">
                              <div className="row">
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.totalArea}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaBed className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.bedrooms}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaUserAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.ownership}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaCalendarAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.bestTimeToCall}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaRupeeSign className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.price}</span>
                                </div>
                                {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <p className="m-0" style={{ color: '#2F747F', fontSize: '14px' }}>
                                    Negotiation: <span style={{ color: '#555555' }}>{property.negotiation}</span>
                                  </p>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="w-100" style={{border:'1px solid #2F747F'}}>
                                <p className="text-center m-0"><span className="text-muted"> My Offer Rent</span>  <FaRupeeSign className="me-2" color="#2F747F" /> 6,000</p>
                            </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No properties available.</p>
                  )}
                </div>
              </Tab.Pane>

              {/* Tab for Removed Properties */}
              <Tab.Pane eventKey="removed">
                <div style={{ maxHeight: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                  {filterProperties(true).length > 0 ? (
                    filterProperties(true).map((property) => (
                      <div 
                        key={property._id} 
                        className="card mb-3 shadow p-1" 
                        style={{
                          width: '450px', 
                          minWidth: '400px', 
                          background: '#F9F9F9'
                        }}
                      >
                        <div className="row g-0">
                          {/* Image Column */}
                          <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
                            <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
                              PUC- {property.ppcId}
                            </div>
                            <div className="img-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                              <img
                                src={property.photos && property.photos.length > 0
                                  ? `http://localhost:5006/${property.photos[0]}`
                                  : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"}
                                className="img-fluid"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                          </div>

                          {/* Content Column */}
                          <div className="col-md-8 col-8 p-1">
                          <div className="row">
                            <div className="col-6 d-flex align-items-center mt-1 mb-1">
                            <p className="m-0">{property.propertyMode}</p>

                                </div>
                                 <div className="col-6 d-flex align-items-center justify-content-end mt-1 mb-1">
                                 <p className="m-0"><button className="btn" style={{background:"#FF0000", color:"#fff"}}>undo</button></p>
                                </div>
                            
                            </div>                            <p className="m-0">{property.propertyType}</p>
                            <p>{property.city}</p>
                            <div className="card-body p-2 d-flex flex-column justify-content-center">
                              <div className="row">
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaRulerCombined className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.totalArea}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaBed className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.bedrooms}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaUserAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.ownership}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaCalendarAlt className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.bestTimeToCall}</span>
                                </div>
                                <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <FaRupeeSign className="me-2" color="#2F747F" /> <span style={{ fontSize: '14px', color: '#555555' }}>{property.price}</span>
                                </div>
                                {/* <div className="col-6 d-flex align-items-center mt-1 mb-1">
                                  <p className="m-0" style={{ color: '#2F747F', fontSize: '14px' }}>
                                    Negotiation: <span style={{ color: '#555555' }}>{property.negotiation}</span>
                                  </p>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="w-100" style={{border:'1px solid #2F747F'}}>
                                <p className="text-center m-0"><span className="text-muted"> My Offer Rent</span>  <FaRupeeSign className="me-2" color="#2F747F" /> 6,000</p>
                            </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No removed properties.</p>
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default MyOffers;
