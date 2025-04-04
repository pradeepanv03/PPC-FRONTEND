import React, { useState, useEffect, useRef } from "react";
import { FaRulerCombined, FaBed, FaUserAlt, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import NewProperty from "./NewProperty";
import axios from "axios";
import FeatureProperty from "./FeatureProperty";

const Carousel = () => {
  const navigate = useNavigate();
  const [Properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Fetch Featured Properties
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-featured-properties`);
        console.log("API Response:", response.data);
        if (response.status === 200 && response.data.properties) {
          setProperties(response.data.properties);
        }
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      }
    };
    fetchFeaturedProperties();
  }, []);

  // Navigate function
  const handleClick = () => {
    navigate("/login");
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setIsAnimating(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Properties.length);
    setTimeout(() => setIsAnimating(true), 3000);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setIsAnimating(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Properties.length) % Properties.length);
    setTimeout(() => setIsAnimating(true), 3000);
  };

  // Handle Animation
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.animation = isAnimating ? "scroll 20s linear infinite" : "none";
    }
  }, [isAnimating]);

  return (
    <>
      <div
        className="p-1 mt-5"
        style={{
          background: "linear-gradient(to right, #ee9ca7 , #ffdde1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "auto",
          width: "100%",
        }}
      >
        <h3 className="m-2" style={{ color: "#763A87" }}>FEATURE PROPERTY</h3>
        <div style={{ overflow: "hidden", width: "100%", position: "relative", fontFamily: "Inter, sans-serif" }}>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <div
              className="carousel-track p-0"
              ref={carouselRef}
              style={{
                display: "flex",
                flexWrap: "nowrap",
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Properties.length > 0 ? (
                Properties.map((property) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={property._id} style={{ flex: "0 0 auto", marginRight: "10px" }}>
                    <div className="card w-100 h-100" style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        src={property.photos && property.photos.length > 0
                          ? `http://localhost:5006/${property.photos[0]}`
                          : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                        }
                        className="card-img-top"
                        alt="Property"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "250px",
                          objectPosition: "center",
                        }}
                      />
                      <div className="card-body d-flex flex-column" style={{ flex: "1", justifyContent: "space-between" }}>
                        <p className="card-title">{property.propertyMode || "N/A"}</p>
                        <p className="card-text text-muted">
                          <MdLocationOn color="#2F747F" /> {property.city || "N/A"}
                        </p>
                        <p className="card-text">
                          <span style={{ color: "#06AAD4" }}>
                            <FaRupeeSign color="#06AAD4" /> {property.price || "0"}
                          </span>
                        </p>
                        <div className="container p-0">
                          <div className="row">
                            <div className="col-md-6 col-6">
                              <p>
                                <FaRulerCombined className="icon" />{" "}
                                {property.totalArea ? `${property.totalArea}${property.areaUnit}` : "N/A"}
                              </p>
                            </div>
                            <div className="col-md-6 col-6">
                              <p>
                                <FaBed className="icon ms-3" /> {property.bedrooms || "N/A"} Bhk
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 col-6">
                              <p>
                                <FaUserAlt className="icon" /> {property.ownership || "N/A"}
                              </p>
                            </div>
                            <div className="col-md-6 col-6">
                              <p>
                                <FaCalendarAlt className="icon ms-3" /> {property.bestTimeToCall || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn mt-auto"
                          style={{
                            width: "100%",
                            background: "#2294B1",
                            color: "#FFC631",
                            border: "none",
                            height: "50px",
                          }}
                          onClick={() => console.log(`Card clicked: ${property.ppcId}`)}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No properties found.</p>
              )}
            </div>
          </Link>

          {/* Navigation Buttons */}
          <div style={{ textAlign: "center", marginTop: "10px", position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
            <button onClick={prevSlide} className="btn" style={{ background: "#C23AA0", color: "#fff", border: "none", height: "50px", width: "100px" }}>Prev</button>
            <button onClick={nextSlide} className="btn btn-secondary" style={{ background: "#A5009C", color: "#fff", border: "none", height: "50px", width: "100px", marginLeft: "10px" }}>Next</button>
          </div>

          <p onClick={handleClick} style={{ float: "right", fontSize: "16px", color: "red", cursor: "pointer" }}>view more</p>
        </div>
      </div>
      <NewProperty />
    </>
  );
};

export default Carousel;







