


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import profil from '../Assets/xd_profile.png';
import { MdOutlineCall, MdOutlineMapsHomeWork, MdCalendarMonth, MdOutlineBed, MdOutlineTimer } from "react-icons/md";
import { RiStairsLine } from "react-icons/ri"; // Corrected import
import { LuIndianRupee } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { TfiLocationPin } from "react-icons/tfi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const BuyerLists = () => {
  const [assistanceData, setAssistanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const iconContainerRef = useRef(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchAssistanceData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-interests`);
        setAssistanceData(response.data.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAssistanceData();
  }, []);

  // Handle scroll events for container and icons
  const handleWheelScroll = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const handleIconScroll = (e) => {
    if (iconContainerRef.current) {
      e.preventDefault();
      const scrollAmount = e.deltaX || e.deltaY;
      iconContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "auto",
        padding: "10px",
        gap: "15px",
        borderRadius: "10px",
        overflowY: "auto", 
      }}
      onWheel={handleWheelScroll}
      ref={scrollContainerRef}
    >
      <h5>Buyer List Datas</h5>
      {assistanceData.length > 0 ? (
        assistanceData.map((card) => (
          <div
            key={card._id}
            className="card p-1"
            style={{
              width: "450px", 
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "15px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-items-center justify-content-center mb-1">
                <img
                  src={profil}
                  alt="Placeholder"
                  className="rounded-circle mt-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
              <div className="col-9 p-0">
                <div className="d-flex justify-content-between">
                  <p className="m-0" style={{ color: "#5E5E5E", fontWeight: "normal" }}>
                    BA ID: {card.ba_id}
                  </p>
                  {/* <p
                    className="mb-0 ps-3 pe-3 text-center pt-1 pb-1 position-absolute top-0 end-0"
                    style={{
                      background: "#FF0000", 
                      color: "white", 
                      cursor: "pointer", 
                      borderRadius: '0px 0px 0px 15px', 
                      fontSize: "12px"
                    }}
                  >
                    UNDO
                  </p> */}
                </div>
                <h5 className="mb-1">
                  {card.phoneNumber || "Unknown Buyer"} |{" "}
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Buyer
                  </span>
                </h5>
                <div className="d-flex justify-content-between align-items-center col-8">
                <div className="d-flex justify-content-between align-items-center col-8">
 
  <div className="d-flex">
    <p className="mb-0 d-flex align-items-center me-3">
      <span className="text-muted"><FaArrowDown /> Price: </span>
      <LuIndianRupee color="#019988" className="me-2" />
      {card.minPrice}
    </p>
    <p className="mb-0 d-flex align-items-center">
      <span className="text-muted"><FaArrowUp /> Price: </span>
      <LuIndianRupee color="#019988" className="me-2" />
      {card.maxPrice}
    </p>
  </div>
</div>

</div>

              </div>
            </div>

            <div className="p-1">
              <div
                className="d-flex align-items-center overflow-auto mb-0 p-1 rounded-1"
                style={{
                  whiteSpace: "nowrap",
                  minWidth: "100%",
                  overflowX: "auto",
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  border: "1px solid #019988",
                }}
                onWheel={handleIconScroll}
                ref={iconContainerRef}
              >
                <div className="d-flex align-items-center me-3">
                  <GoHome size={20} className="me-2" color="#019988" />
                  <p className="mb-0 small">{card.propertyMode}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineMapsHomeWork size={20} className="me-2" color="#019988" />
                  <p className="mb-0 small">{card.propertyType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdCalendarMonth size={20} className="me-2" color="#019988" />
                  <p className="mb-0 small">{card.paymentType}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineBed size={20} className="me-2" color="#019988" />
                  <p className="mb-0 small">{card.noOfBHK} BHK</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <RiStairsLine size={20} className="me-2" color="#019988" />
                  <p className="mb-0 small">{card.propertyAge}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <MdOutlineTimer size={20} className="me-2" color="#019988" />
                  <p className="mb-0 small">{card.updatedAt.slice(0, 10)}</p>
                </div>
              </div>

              <div className="mb-0">
                <p className="mb-0">
                  <TfiLocationPin size={16} className="me-2" color="#019988" />
                  {card.area}, {card.city}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlineCall color="#019988" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted mt-1 fw-bold" style={{ fontSize: "11px" }}>Interested Owner Phone</h6>
                    {/* <span className="card-text" style={{ color: "grey" }}>
                      {card.interestedUserPhone ? `${card.interestedUserPhone.slice(0, -5)}*****` : "N/A"}
                    </span> */}
                    <span>{card.interestedUserPhone}</span>
                  
                  </div>
                </div>
                <div>
                  {/* <button className="btn btn-sm me-2" style={{ background: "#019988", color: "#fff" }}>
                    SEND INTEREST
                  </button>
                  <button className="btn btn-primary btn-sm">MORE</button>
                   */}
                  <button
              className="btn text-white px-3 py-1 flex-grow-1 mx-1"
              style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
              onClick={() => (window.location.href = `tel:${ card.interestedUserPhone}`)}

           >
              Call
            </button>   
                  
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No buyer assistance interests found.</p>
      )}
    </div>
  );
};

export default BuyerLists;
