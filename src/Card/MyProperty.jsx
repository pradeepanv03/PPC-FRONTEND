


import React, { useState, useEffect } from "react";
import { FaRulerCombined, FaBed, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Button, Nav, Tab, Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-toastify";
import "./MyProperty.css";

const MyProperty = () => {
  const location = useLocation();
  const { phoneNumber } = location.state || {};

  const [activeKey, setActiveKey] = useState("property");
  const [propertyUsers, setPropertyUsers] = useState([]); // State for properties with incomplete and complete status
  const [removedUsers, setRemovedUsers] = useState([]); // State for deleted properties

  // Fetch users based on the phone number
  useEffect(() => {
    if (activeKey === "property" && phoneNumber) {
      fetchPropertyData(phoneNumber);
    }
    if (activeKey === "removed" && phoneNumber) {
      fetchDeletedProperties(phoneNumber);
    }
  }, [activeKey, phoneNumber]);

  // Fetch properties with incomplete or complete status
  const fetchPropertyData = async (phoneNumber) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-status`, {
        params: { phoneNumber },
      });

      if (response.status === 200) {
        setPropertyUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      toast.error("Error fetching property data.");
    }
  };

  // Fetch deleted properties
  const fetchDeletedProperties = async (phoneNumber) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-delete-status`, {
        params: { phoneNumber },
      });

      if (response.status === 200) {
        setRemovedUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching deleted properties:", error);
      toast.error("Error fetching deleted properties.");
    }
  };

  // Handle delete property
  const handleDelete = async (ppcId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/delete-property`, {
        ppcId,
        phoneNumber,
      });

      if (response.status === 200) {
        toast.success("Property deleted successfully!");
        fetchPropertyData(phoneNumber); // Refresh the property list
      }
    } catch (error) {
      toast.error("Error deleting property.");
      console.error("Delete Error:", error);
    }
  };

  // Handle undo deletion
  const handleUndo = async (ppcId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/undo-delete`, {
        ppcId,
        phoneNumber,
      });

      if (response.status === 200) {
        toast.success("Property status reverted successfully!");
        fetchDeletedProperties(phoneNumber); 
        
      }
    } catch (error) {
      toast.error("Error undoing property status.");
      console.error("Undo Error:", error);
    }
  };

  return (
    <Container fluid className="p-3 my">
      <Helmet>
        <title>Pondy Property | Properties</title>
      </Helmet>

      {/* Tab Navigation */}
      <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <Row className="g-3">
          <Col lg={12} className="d-flex flex-column align-items-center">
            {/* Navbar Tabs */}
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="property">Property</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="removed">Removed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="expired">Expired</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="add-prop">Add Prop</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              {/* Property Tab */}
              <Tab.Pane eventKey="property">
                {propertyUsers.map((user, index) => (
                  <div className="property-card" key={user._id}>
                    <div className="property-image">
                      <div
                        className="text-center"
                        style={{
                          color: "white",
                          backgroundColor: "rgb(47,116,127)",
                          padding: "3px",
                          width: "160px",
                          borderRadius: "2px",
                          marginTop: "2px",
                          marginBottom: "2px",
                        }}
                      >
                        PUC- {user.ppcId}
                      </div>

                      <img
                        src={
                          user.photos && user.photos.length > 0
                            ? `http://localhost:5006/${user.photos[0]}`
                            : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                        }
                        alt={`Property ${index + 1}`}
                      />
                      <button className="incomplete-button">{user.status}</button>
                    </div>

                    {/* Property Details */}
                    <div className="property-details m-0 p-0">
                      <p>{user.propertyMode}</p>
                      <p>{user.city}</p>
                      <p className="">
                        <FaRulerCombined className="icon" /> {user.totalArea}
                        {user.areaUnit}
                        <FaBed className="icon ms-3" /> {user.bedrooms}
                      </p>
                      <p>
                        <FaUser className="icon" /> {user.ownership}
                        <FaCalendarAlt className="icon ms-3" /> {user.bestTimeToCall}
                      </p>
                      <p style={{ color: "rgb(47,116,127)", fontWeight: "bold" }}>
                        ₹{user.price}
                      </p>
                      <p style={{ fontSize: "10px" }}>Edit and submit ad to complete</p>

                      <div className="d-flex gap-2 mt-2">
                        <Button
                          style={{ backgroundColor: "orangered", border: "none" }}
                          size="sm"
                          onClick={() => handleDelete(user.ppcId)} // Trigger handleDelete when clicked
                        >
                          Remove
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "rgb(47,116,127)",
                            border: "none",
                            width: "50%",
                          }}
                          size="sm"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </Tab.Pane>

              {/* Removed Tab */}
              <Tab.Pane eventKey="removed">
                {removedUsers.map((user) => (
                  <div className="property-card" key={user._id}>
                    <div className="property-image">
                      <div
                        className="text-center"
                        style={{
                          color: "white",
                          backgroundColor: "rgb(47,116,127)",
                          padding: "3px",
                        }}
                      >
                        PUC- {user.ppcId}
                      </div>
                      <img
                        src={
                          user.photos && user.photos.length > 0
                            ? `http://localhost:5006/${user.photos[0]}`
                            : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                        }
                        alt="Property"
                      />
                    </div>

                    <div className="property-details">
                      <p>{user.propertyMode}</p>
                      <p>{user.city}</p>
                      <p>
                        <FaRulerCombined className="icon" /> {user.totalArea}
                        {user.areaUnit}
                        <FaBed className="icon ms-3" /> {user.bedrooms} Bhk
                      </p>
                      <p>
                        <FaUser className="icon" /> {user.ownership}
                        <FaCalendarAlt className="icon ms-3" /> {user.bestTimeToCall}
                      </p>
                      <p
                        className="mt-2"
                        style={{ color: "rgb(47,116,127)", fontWeight: "bold" }}
                      >
                        ₹{user.price}
                      </p>

                      <div className="d-flex gap-2 mt-2">
                        <Button
                          style={{
                            backgroundColor: "green",
                            border: "none",
                            width: "50%",
                            borderRadius: "10px",
                          }}
                          size="sm"
                          onClick={() => handleUndo(user.ppcId)} // Trigger handleUndo when clicked
                        >
                          UNDO
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </Tab.Pane>

              {/* Expired Tab */}
              <Tab.Pane eventKey="expired">
                <h5>No expired properties yet.</h5>
              </Tab.Pane>

              {/* Add Property Tab */}
              <Tab.Pane eventKey="add-prop">
                <h5>Add Property Form (Coming Soon)</h5>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default MyProperty;





























// **********************************



