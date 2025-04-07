
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaCamera, FaEye, FaRupeeSign, FaUserAlt } from "react-icons/fa";
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import myImage from '../Assets/Rectangle 146.png'; // Correct path

const LastViewedProperty = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedPhoneNumber =
    location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLastViewed = async () => {
      if (!phoneNumber) {
        setError("Phone number is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user-get-last-view/${phoneNumber}`
        );
        setProperty(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Error fetching last viewed property"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLastViewed();
  }, [phoneNumber]);

  if (loading) return <p>Loading last viewed property...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!property) return <p>No last viewed property found.</p>;

  const { property: propDetails, viewedAt } = property;

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
        <div className="container d-flex align-items-center justify-content-center p-0">
        <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
        
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
              <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
            </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>My Last View Property  </h3> </div>
    <div className="row g-2 w-100">
    
    <div 
  className="card mb-1 shadow rounded-4"
  style={{ width: '100%', height: 'auto', background: '#F9F9F9', overflow: 'hidden' }}
>
  <div className="row g-0">
    
    {/* Left: Image and Icons */}
    <div className="col-md-4 col-4 d-flex flex-column align-items-center">
      <div style={{ position: "relative", width: "100%", height: window.innerWidth <= 640 ? "180px" : "170px" }}>
        <img
          src={
            propDetails.photos && propDetails.photos.length > 0
              ? propDetails.photos[0]
              : pic
          }
          alt="property"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
          }}
          className="rounded-start"
        />

        {/* Bottom icons on image */}
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 5px",
          }}
        >
          <span
            className="d-flex justify-content-center align-items-center"
            style={{
              color: "#fff",
              backgroundImage: `url(${myImage})`,
              width: "45px",
              height: "20px",
              fontSize: "11px",
              borderRadius: "3px",
            }}
          >
            <FaCamera className="me-1" size={13} />
            {propDetails.photos?.length || 0}
          </span>
          <span
            className="d-flex justify-content-center align-items-center"
            style={{
              color: "#fff",
              backgroundImage: `url(${myImage1})`,
              width: "45px",
              height: "20px",
              fontSize: "11px",
              borderRadius: "3px",
            }}
          >
            <FaEye className="me-1" size={15} />
            {propDetails.views || 0}
          </span>
        </div>
      </div>
    </div>

    {/* Right: Property Details */}
    <div className="col-md-8 col-8 ps-2">
      <div className="d-flex justify-content-start">
        <p className="mb-1" style={{ color: '#5E5E5E', fontWeight: 500 }}>
          {propDetails.propertyMode || 'N/A'}
        </p>
      </div>

      <p className="fw-bold m-0" style={{ color: '#000000' }}>
        {propDetails.propertyType || 'N/A'}
      </p>
      <p className="m-0" style={{ color: '#5E5E5E', fontWeight: 500 }}>
        {propDetails.location || 'Not specified'}
      </p>

      <div className="card-body ps-2 m-0 pt-0 pe-2 pb-0 d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col-6 d-flex align-items-center mt-1 mb-1">
            <FaUserAlt className="me-2" color="#2F747F" />
            <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
              PPC ID: {propDetails.ppcId || "N/A"}
            </span>
          </div>

          <div className="col-6 d-flex align-items-center mt-1 mb-1">
            <FaCalendarAlt className="me-2" color="#2F747F" />
            <span style={{ fontSize: '13px', color: '#5E5E5E', fontWeight: 500 }}>
              {viewedAt ? new Date(viewedAt).toLocaleString() : "Not available"}
            </span>
          </div>

          <div className="col-12 d-flex flex-col align-items-center mt-1 mb-1">
            <h6 className="m-0">
              <span
                style={{
                  fontSize: '17px',
                  color: '#2F747F',
                  fontWeight: 'bold',
                  letterSpacing: "1px",
                }}
              >
                <FaRupeeSign className="me-2" color="#2F747F" />
                {propDetails.price ? propDetails.price.toLocaleString('en-IN') : 'N/A'}
              </span>
              <span
                style={{
                  color: '#2F747F',
                  marginLeft: "5px",
                  fontSize: '11px',
                }}
              >
                Negotiable
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>

  );
};

export default LastViewedProperty;
