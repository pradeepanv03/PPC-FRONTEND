







import React, { useRef } from "react";
import profil from '../Assets/xd_profile.png'
import {  MdOutlineCall , MdFamilyRestroom , MdOutlineMapsHomeWork , MdCalendarMonth , MdOutlineBed , MdOutlineTimer  } from "react-icons/md";
import { LuIndianRupee , LuBriefcaseBusiness  } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { GiSittingDog } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { RiStairsLine } from "react-icons/ri";

const BuyerList = () => {
  const scrollContainerRef = useRef(null);
  const iconContainerRef = useRef(null);

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

  const cards = [
    { 
      id: 1, 
      name: "John Doe", 
      price: 200, 
      month: "January", 
      monthlyPrice: 500, 
      location: "New York", 
      number: 10, 
      mobileNumber: "1234567890",
      member:'Any Member',
      Business:"Business",
      food:'Any food Habit',
      pet:'Pet-Yes',
      bed: 'Any BHK',
      time:'Immediately',
      floor:'Any floor',
      payment:'Monthly',
      housetype:'anny Type',
      propertymode:'Commerical'
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      price: 150, 
      month: "February", 
      monthlyPrice: 400, 
      location: "Los Angeles", 
      number: 8, 
      mobileNumber: "9876543210" ,
      member:'Any Member',
      Business:"Business",
      food:'Any food Habit',
      pet:'Pet-Yes',
      bed: 'Any BHK',
      time:'Immediately',
      floor:'Any floor',
      payment:'Monthly',
      housetype:'anny Type',
      propertymode:'Commerical'
      
    },
    { 
      id: 3, 
      name: "Alice Johnson", 
      price: 300, 
      month: "March", 
      monthlyPrice: 600, 
      location: "Chicago", 
      number: 15, 
      mobileNumber: "5551234567",
      member:'Any Member',
      Business:"Business",
      food:'Any food Habit',
      pet:'Pet-Yes', 
      bed: 'Any BHK',
      time:'Immediately',
      floor:'Any floor',
      payment:'Monthly',
      housetype:'anny Type',
      propertymode:'Commerical'
    },
    { 
      id: 4, 
      name: "Bob Brown", 
      price: 250, 
      month: "April", 
      monthlyPrice: 550, 
      location: "Houston", 
      number: 12, 
      mobileNumber: "2223456789",
      member:'Any Member',
      Business:"Business",
      food:'Any food Habit',
      pet:'Pet-Yes',
      bed: 'Any BHK',
      time:'Immediately',
      floor:'Any floor',
      payment:'Monthly',
      housetype:'anny Type',
      propertymode:'Commerical'
    },
  ];

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "auto",
        padding: "10px",
        gap: "15px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflowY: "auto", 
      }}
      onWheel={handleWheelScroll}
      ref={scrollContainerRef}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className="card"
          style={{
            width: "450px", 
            border: "1px solid #ddd",
            borderRadius: "10px",
            overflow: "hidden",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div className="d-flex align-items-start mb-3">
            <img
              src={profil}
              alt="Placeholder"
              className="rounded-circle"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div className="ms-3 flex-grow-1">
            <p className="mb-1">RA ID: {card.id}</p>
              <h5 className="mb-1">{card.name} | <span className="text-muted" style={{fontSize:"12px"}}>buyer</span></h5>
              <p className="mb-1"><LuIndianRupee color="#019988" className="me-2"/>
              {card.price}</p>
            </div>
            <div>
              <p className="mb-1 text-muted"><MdCalendarMonth color="#019988" className="me-2"/> 
              {card.month}</p>
              <p className="mb-1"><LuIndianRupee color="#019988" className="me-2"/>
              {card.monthlyPrice}</p>
            </div>
          </div>

          <div
            className="d-flex align-items-center overflow-auto mb-3 p-1 rounded-1"
            style={{
              whiteSpace: "nowrap",
              minWidth: "100%",
              overflowX: "auto",
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              border:"1px solid #019988"
            }}
            onWheel={handleIconScroll}
            ref={iconContainerRef}
          >
            <div className="d-flex align-items-center me-3">
              <GoHome  size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.propertymode}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <MdOutlineMapsHomeWork  size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.housetype}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <MdCalendarMonth  size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.payment}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <MdOutlineBed  size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.bed}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <RiStairsLine size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.floor}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <MdOutlineTimer size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.time}</p>
            </div>
          </div>

          <div
            className="d-flex align-items-center overflow-auto mb-3 p-1 rounded-1"
            style={{
              whiteSpace: "nowrap",
              minWidth: "100%",
              overflowX: "auto",
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              border:'1px solid #019988'
            }}
            onWheel={handleIconScroll}
            ref={iconContainerRef}
          >
            <div className="d-flex align-items-center me-3">
              <MdFamilyRestroom  size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.member}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <LuBriefcaseBusiness size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.Business}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <IoFastFoodOutline size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.food}</p>
            </div>
            <div className="d-flex align-items-center me-3">
              <GiSittingDog size={20} className="me-2" color="#019988"/>
              <p className="mb-0 small">{card.pet}</p>
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-0">
              <GrMapLocation  size={16} className="me-2" color="#019988"/>
              {card.location}
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              <MdOutlineCall  size={16} className="me-2" color="#019988"/>
               {card.mobileNumber.slice(0, -5)}*****
            </p>
            <div>
              <button className="btn btn-sm me-2" style={{background:"#019988", color:"#fff"}}>SEND INTEREST</button>
              <button className="btn btn-primary btn-sm">MORE</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyerList;
