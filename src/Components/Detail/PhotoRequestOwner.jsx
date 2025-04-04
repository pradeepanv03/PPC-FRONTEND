

import React, { useState, useEffect } from 'react'; 
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

import { FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { MdCall } from 'react-icons/md';
const PropertyCard = ({ property , onRemove , onUndo }) => {
  const [properties, setProperties] = useState([]);

 
  
  return (
    <div className="row g-0 rounded-4 mb-2" style={{ border: '1px solid #ddd', overflow: "hidden", background: "#EFEFEF" }}>
    <div className="col-md-4 col-4 d-flex flex-column justify-content-between align-items-center">
      <div className="text-white py-1 px-2 text-center" style={{ width: '100%', background: "#2F747F" }}>
        PUC- {property.ppcId}
      </div>
      <div style={{ position: "relative", width: "100%", height: '160px' }}>
        <img
          src={property.photos?.length ? `http://localhost:5006/${property.photos[0]}` : "default.jpg"}
          alt="Property"
          className="img-fluid"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
    <div className="col-md-8 col-8 ps-2">
      <div className="d-flex justify-content-between">
        <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 'normal' }}>
          {property.propertyMode || 'N/A'}
        </p>
        {onRemove ? (
          <p className="mb-0 ps-3 pe-3 text-center pt-1" 
             style={{ background: "#FF0000", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px', fontSize: "12px" }}
             onClick={() => onRemove(property.ppcId)}>
            REMOVE
          </p>
        ) : (
          <p className="mb-0 ps-3 pe-3 text-center pt-1" 
             style={{ background: "#2F747F", color: "white", cursor: "pointer", borderRadius: '0px 0px 0px 15px', fontSize: "12px" }}
             onClick={() => onUndo(property.ppcId)}>
            UNDO
          </p>
        )}
      </div>
      <p className="fw-bold m-0" style={{ color: '#000000' }}>{property.propertyType || 'N/A'}</p>
      <p className='m-0' style={{ color: '#5E5E5E' }}>{property.city || 'N/A'}</p>
      <div className="card-body ps-2 m-0 pt-0 pe-2 d-flex flex-column justify-content-center">
      <div className="row">
        <div className="col-6 d-flex align-items-center mt-1 mb-1">
          <FaRulerCombined className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 'medium' }}>
            {property.totalArea || 'N/A'}
          </span>
        </div>
        <div className="col-6 d-flex align-items-center mt-1 mb-1">
          <FaBed className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
            {property.bedrooms || 'N/A'}
          </span>
        </div>
        <div className="col-6 d-flex align-items-center mt-1 mb-1">
          <FaUserAlt className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
            {property.ownership || 'N/A'}
          </span>
        </div>
        <div className="col-6 d-flex align-items-center mt-1 mb-1">
          <FaCalendarAlt className="me-2" color="#2F747F" />
          <span style={{ fontSize: '13px', color: '#5E5E5E' }}>
            {property.bestTimeToCall || 'N/A'}
          </span>
        </div>

        <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1">
          <h6 className="m-0">
            <span style={{ fontSize: '17px', color: '#2F747F', fontWeight: 'bold', letterSpacing: "1px" }}>
              <FaRupeeSign className="me-2" color="#2F747F" />
              {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
            </span>
            <span style={{ color: '#2F747F', fontSize: '13px', marginLeft: "5px", fontSize: '11px' }}>
              Negotiable
            </span>
          </h6>
        </div>

        <p style={{ color: "#2E7480", margin: "0px" }}>
          <a href={`tel:${property.postedUserPhoneNumber}`} style={{ textDecoration: 'none', color: '#2E7480' }}>
            <MdCall className="me-2" color="#2F747F" /> {property.postedUserPhoneNumber || 'N/A'}
          </a>
        </p>
      </div>

      <div className="d-flex justify-content-between mt-2">
 
      </div>
      <p>{property.status || 'N/A'}</p>
    </div>
    </div>

  </div>
  
  );
};

const PhotoRequestOwner = ({ properties, onRemove }) => {
  const filteredProperties = properties.filter((property) => property.status !== 'deleted');
  
  return (
    <div className="container">
      <div className="row mt-4 rounded-4">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.ppcId} property={property} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

const RemovedProperties = ({ removedProperties, onUndo }) => {

  return (
    <div className="container">
      <div className="row mt-4 rounded-4">
        {removedProperties.map((property) => (
          <PropertyCard key={property.ppcId} property={property} onUndo={onUndo} />
        ))}
      </div>
    </div>
  );
};


const App = () => {
  const { phoneNumber } = useParams();

  const [activeKey, setActiveKey] = useState('All');
  const [removedProperties, setRemovedProperties] = useState(() => {
    const storedRemovedProperties = localStorage.getItem('removedProperties');
    return storedRemovedProperties ? JSON.parse(storedRemovedProperties) : [];
  });
  const [properties, setProperties] = useState([]);

  // Fetch properties data from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/photo-requests/owner/${phoneNumber}`);
        setProperties(response.data);  // Assuming the data is in the response body
      } catch (error) {
        toast.error("Error fetching properties.");
      }
    };

    fetchProperties();
  }, []);



  const handleRemoveProperty = async (ppcId) => {
    if (!ppcId) {
      toast.error("Invalid property ID.");
      return;
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/photo-requests/delete/${ppcId}`);
      if (response.status === 200) {
        toast.success('Photo request marked as deleted.');
  
        // Update the property status to "deleted"
        setProperties((prevProperties) => {
          const updatedProperties = prevProperties.map((property) =>
            property.ppcId === ppcId ? { ...property, status: 'deleted' } : property
          );
          localStorage.setItem('properties', JSON.stringify(updatedProperties)); // Update localStorage
          return updatedProperties;
        });
  
        // Move the property to removedProperties
        const removedProperty = properties.find((property) => property.ppcId === ppcId);
        if (removedProperty) {
          setRemovedProperties((prevRemovedProperties) => {
            const updatedRemovedProperties = [...prevRemovedProperties, removedProperty];
            localStorage.setItem('removedProperties', JSON.stringify(updatedRemovedProperties));
            return updatedRemovedProperties;
          });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting photo request.');
    }
  };
  
  const handleUndoRemove = async (ppcId) => {
    if (!ppcId) {
      toast.error("Invalid property ID.");
      return;
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/photo-requests/undo/${ppcId}`);
      if (response.status === 200) {
        toast.success("Photo request restored.");
  
        const restoredProperty = removedProperties.find((property) => property.ppcId === ppcId);
        if (restoredProperty) {
          // Restore the property status to its original value (remove the 'deleted' status)
          setProperties((prevProperties) => {
            const updatedProperties = prevProperties.map((property) =>
              property.ppcId === ppcId
                ? { ...property, status: restoredProperty.originalStatus || 'N/A' }
                : property
            );
            localStorage.setItem('properties', JSON.stringify(updatedProperties)); // Update localStorage
            return updatedProperties;
          });
  
          setRemovedProperties((prevRemovedProperties) =>
            prevRemovedProperties.filter((property) => property.ppcId !== ppcId)
          );
  
          localStorage.setItem(
            'removedProperties',
            JSON.stringify(removedProperties.filter((property) => property.ppcId !== ppcId))
          );
        }
      }
    } catch (error) {
      toast.error("Error restoring photo request.");
    }
  };
  const navigate = useNavigate();

const handlePageNavigation = () => {
  navigate('/mobileviews'); // Redirect to the desired path
};
  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <Row className="g-3">
          <Col lg={12} className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>PHOTO REQUEST OWNER </h3> </div>
            <Nav variant="tabs" className="mb-3" style={{ width: '100%' }}>
              <Nav.Item style={{ flex: '1' }}>
                <Nav.Link eventKey="All" style={{ backgroundColor: '#4F4B7E', color: 'white', textAlign: 'center' }}>
                  All
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ flex: '1' }}>
                <Nav.Link eventKey="removed" style={{ backgroundColor: '#FF0000', color: 'white', textAlign: 'center' }}>
                  Removed
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="All">
                {/* Only show properties with status other than "deleted" */}
                <PhotoRequestOwner properties={properties} onRemove={handleRemoveProperty} />
              </Tab.Pane>
              <Tab.Pane eventKey="removed">
                {/* Display removed properties */}
                <RemovedProperties removedProperties={removedProperties} onUndo={handleUndoRemove} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default App;












