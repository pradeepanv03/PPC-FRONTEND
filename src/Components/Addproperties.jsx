















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "react-bootstrap";
// import {  useLocation, useNavigate, useParams } from "react-router-dom";
// import { RiLayoutLine } from 'react-icons/ri';
// import { TbArrowLeftRight } from 'react-icons/tb';
// import {FaBuilding, FaMoneyBillWave,  FaBath, FaChartArea, FaPhone ,FaEdit,FaRoad,FaDoorClosed,FaMapPin, FaHome, FaUserAlt, FaEnvelope,  FaRupeeSign , FaFileVideo , FaToilet,FaCar,FaBed,  FaCity , FaTimes} from 'react-icons/fa';
// import {  FaRegAddressCard } from 'react-icons/fa6';
// import { MdLocationOn, MdOutlineMeetingRoom, MdOutlineOtherHouses, MdSchedule , MdStraighten , MdApproval, MdLocationCity , MdAddPhotoAlternate, MdKeyboardDoubleArrowDown} from "react-icons/md";
// import { BsBank, BsBuildingsFill, BsFillHouseCheckFill , BsTextareaT} from "react-icons/bs";
// import { GiKitchenScale, GiMoneyStack , GiResize , GiGears} from "react-icons/gi";
// import { HiUserGroup } from "react-icons/hi";
// import { BiBuildingHouse , BiMap, BiWorld} from "react-icons/bi";
// import {   FaFileAlt, FaGlobeAmericas, FaMapMarkerAlt, FaMapSigns } from "react-icons/fa";
// import {MdElevator ,MdOutlineChair ,MdPhone, MdOutlineAccessTime, MdTimer, MdHomeWork, MdHouseSiding, MdOutlineKitchen, MdEmail, } from "react-icons/md";
// import {  BsBarChart, BsGraphUp } from "react-icons/bs";
// import { BiBuilding, BiStreetView } from "react-icons/bi";
// import { GiStairs, GiForkKnifeSpoon, GiWindow } from "react-icons/gi";
// import { AiOutlineEye, AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
// import { BiBed, BiBath, BiCar, BiCalendar, BiUser, BiCube } from "react-icons/bi";
// import { toast } from "react-toastify";
// import Plans from './PricingPlans';
// import PricingPlans from "./PricingPlans";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// function AddProperties() {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [showPlans, setshowPlans] = useState(false);
//     // const { phoneNumber,ppcId } = useParams(); // Get phone number from URL


//   const location = useLocation();
//   const { ppcId, phoneNumber } = location.state || {};

//     const handleCloseAddForm = () => {
//       setshowPlans(false); // Close add property form
//     };

//   // const [ppcId, setPpcId] = useState(location.state?.ppcId || ""); 
//   const [formData, setFormData] = useState({
//     propertyMode: '',
//     propertyType: '',
//     price: '',
//     propertyAge: '',
//     bankLoan: '',
//     negotiation: '',
//     length: '',
//     breadth: '',
//     totalArea: '',
//     ownership: '',
//     bedrooms: '',
//     kitchen: '',
//     kitchenType: '',
//     balconies: '',
//     floorNo: '',
//     areaUnit: '',
//     propertyApproved: '',
//     postedBy: '',
//     facing: '',
//     salesMode: '',
//     salesType: '',
//     description: '',
//     furnished: '',
//     lift: '',
//     attachedBathrooms: '',
//     western: '',
//     numberOfFloors: '',
//     carParking: '',
//     rentalPropertyAddress: '',
//     country: '',
//     state: '',
//     city: '',
//     district: '',
//     area: '',
//     streetName: '',
//     doorNumber: '',
//     nagar: '',
//     ownerName: '',
//     email: '',
//     phoneNumber: "",
//   phoneNumberCountryCode: "",
//   alternatePhone: "",
//   alternatePhoneCountryCode: "",
//     bestTimeToCall: '',
//   });
//   const [photos, setPhotos] = useState([]);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
//   const [video, setVideo] = useState(null);
//   const [isPreview, setIsPreview] = useState(true);
//   const [step, setStep] = useState("form"); // "form" -> "preview" -> "submitted"

//   const navigate = useNavigate();


//   const handlePreview = () => { 
//     const requiredFields = [
      
//       "propertyMode",
//       "propertyType",
//       "price",
//       "totalArea",
//       "areaUnit",
//       "salesType",
//       "postedBy"
//     ];
  
//     const missingFields = requiredFields.filter(field => !formData[field]);
  
//     if (missingFields.length > 0) {
//       alert(`Please fill in the following fields before previewing: ${missingFields.join(", ")}`);
//       return;
//     }
  
//     setStep("preview");
//   };

//   const propertyDetailsList = [
//     { heading: true, label: "Basic Property Info" }, // Heading 1
//     { icon: <MdHomeWork />, label: "Property Mode", value:  formData.propertyMode},
//     { icon: <MdHouseSiding />, label: "Property Type", value: formData.propertyType },
//     // { icon: <MdOutlineCurrencyRupee />, label: "Price", value: formData.price },
//     // { icon: <FaBalanceScale />, label: "Negotiation", value: formData.negotiation },
//     { icon: <AiOutlineColumnWidth />, label: "Length", value: formData.length },
//     { icon: <AiOutlineColumnHeight />, label: "Breadth", value: formData.breadth  },
//     // { icon: <RiLayoutLine />, label: "Total Area", value: formData.totalArea},
//     {
//       icon: <RiLayoutLine />,
//       label: "Total Area",
//       value: `${formData.totalArea} ${formData.areaUnit}`, // Combined value
//     },
//     // { icon: <BiRuler />, label: "Area Unit", value: formData.areaUnit },
//     { icon: <FaUserAlt />, label: "Ownership", value: formData.ownership },
//     { icon: <MdApproval />, label: "Property Approved", value: formData.propertyApproved },
//     { icon: <MdTimer />, label: "Property Age", value: formData.propertyAge },
//     { icon: <BsBank />, label: "Bank Loan", value: formData.bankLoan },


//     { heading: true, label: "Property Features" }, // Heading 1
//     { icon: <BiBed />, label: "Bedrooms", value: formData.bedrooms },

//     { icon: <GiStairs />, label: "Floor No", value:formData.floorNo },
//     { icon: <GiForkKnifeSpoon />, label: "Kitchen", value: formData.kitchen},
//     { icon: <MdOutlineKitchen />, label: "Kitchen Type", value: formData.kitchenType },
//     { icon: <GiWindow />, label: "Balconies", value: formData.balconies},
//     { icon: <BiCube />, label: "Floors", value: formData.numberOfFloors },
// { label: "western", value: formData.western, icon: <BiBath /> },
// { label: "attached", value: formData.attachedBathrooms, icon: <BiBath /> },

//     { icon: <BiCar />, label: "Car Park", value: formData.carParking },
//     { icon: <MdElevator />, label: "Lift", value: formData.lift },
//     { heading: true, label: "Other details" }, // Heading 2

//     { icon: <MdOutlineChair />, label: "Furnished", value: formData.furnished },
//     { icon: <TbArrowLeftRight />, label: "Facing", value: formData.facing },

//     { icon: <BsGraphUp />, label: "Sale Mode", value: formData.salesMode },
//     { icon: <BsBarChart />, label: "Sales Type", value: formData.salesType },
//     { icon: <BiUser />, label: "Posted By", value: formData.postedBy },
//     // { icon: <AiOutlineEye />, label: "No.Of.Views", value: "1200" },
//     { icon: <BiCalendar />, label: "Posted On", value: "Dec 20, 2024" },
//     { heading: true, label: "Description" }, // Heading 3
//     { icon: <FaFileAlt />, value: formData.description },
  
//     { heading: true, label: "Property Location Info" }, // Heading 4
  
//     // { icon: <BiMap />, label: "Location", value: "New York, USA" },
//     { icon: <FaGlobeAmericas />, label: "Country", value: formData.country },
//     { icon: <BiBuilding />, label: "State", value: formData.state },
//     { icon: <MdLocationCity />, label: "City", value: formData.city },
//     { icon: <FaMapMarkerAlt />, label: "District", value:  formData.district},
//     { icon: <FaMapSigns />, label: "Nagar", value: formData.nagar },
//     { icon: <FaDoorClosed />, label: "Door Number", value: formData.doorNumber },

//     { heading: true, label: "Contact Info" }, // Heading 5
   
//     { icon: <FaUserAlt />, label: "Owner Name", value: formData.ownerName },
//     { icon: <MdPhone  />, label: "Phone Number", value: phoneNumber },
//     { icon: <MdPhone  />, label: "alternate Phone", value: formData.alternatePhone },

//     { icon: <MdEmail />, label: "Email", value: formData.email },
//     { icon: <MdOutlineAccessTime />, label: "Best Time To Call", value: formData.bestTimeToCall },
 
//   ];
//   const [dropdownState, setDropdownState] = useState({
//     activeDropdown: null,
//     filterText: "",
//   });

//   // Toggle dropdown visibility
//   const toggleDropdown = (field) => {
//     setDropdownState((prevState) => ({
//       activeDropdown: prevState.activeDropdown === field ? null : field,
//       filterText: "",
//     }));
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (field, value) => {
//     setFormData((prevState) => ({ ...prevState, [field]: value }));
//     setDropdownState({ activeDropdown: null, filterText: "" });
//   };

//   // Handle filter input change for dropdown
//   const handleFilterChange = (e) => {
//     setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }));
//   };
//   // const [ppcId, setPpcId] = useState(null);

 


//   const [countryCodes, setCountryCodes] = useState([
//     { code: '+1', country: 'USA/Canada' },
//     { code: '+44', country: 'UK' },
//     { code: '+91', country: 'India' },
//     { code: '+61', country: 'Australia' },
//     { code: '+81', country: 'Japan' },
//     { code: '+49', country: 'Germany' },
//     { code: '+33', country: 'France' },
//     { code: '+34', country: 'Spain' },
//     { code: '+55', country: 'Brazil' },
//     { code: '+52', country: 'Mexico' },
//     { code: '+86', country: 'China' },
//     { code: '+39', country: 'Italy' },
//     { code: '+7', country: 'Russia/Kazakhstan' },
//     // ... other countries
//   ]);
//   const [alternateCountryCodes, setAlternateCountryCodes] = useState([
//     { code: '+1', country: 'USA/Canada' },
//     { code: '+44', country: 'UK' },
//     { code: '+91', country: 'India' },
//     { code: '+61', country: 'Australia' },
//     { code: '+81', country: 'Japan' },
//     { code: '+49', country: 'Germany' },
//     { code: '+33', country: 'France' },
//     { code: '+34', country: 'Spain' },
//     { code: '+55', country: 'Brazil' },
//     { code: '+52', country: 'Mexico' },
//     { code: '+86', country: 'China' },
//     { code: '+39', country: 'Italy' },
//     { code: '+7', country: 'Russia/Kazakhstan' },
//   ]);
  
  
//   const [dataList, setDataList] = useState({});

//   const fetchDropdownData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch`);
//       const groupedData = response.data.data.reduce((acc, item) => {
//         if (!acc[item.field]) acc[item.field] = [];
//         acc[item.field].push(item.value);
//         return acc;
//       }, {});
//       setDataList(groupedData);
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDropdownData();
//   }, []);

  

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     for (let file of files) {
//       if (file.size > maxSize) {
//         alert('File size exceeds the 10MB limit');
//         return;
//       }
//     }
//     if (photos.length + files.length <= 15) {
//       setPhotos([...photos, ...files]);
//       setSelectedPhotoIndex(0);
//     } else {
//       alert('Maximum 15 photos can be uploaded.');
//     }
//   };

//   const removePhoto = (index) => {
//     setPhotos(photos.filter((_, i) => i !== index));
//     if (index === selectedPhotoIndex) {
//       setSelectedPhotoIndex(0);
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     const maxSize = 50 * 1024 * 1024; // 50MB
//     if (file.size > maxSize) {
//       alert('File size exceeds the 50MB limit');
//       return;
//     }
//     setVideo(file);
//   };

//   const removeVideo = () => {
//     setVideo(null);
//   };

//   const handlePhotoSelect = (index) => {
//     setSelectedPhotoIndex(index);
//   };

//   const handleFieldChange = (e) => {
//     const { name, value } = e.target;
//     // setFormData({ ...formData, [name]: value });
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value, // This dynamically updates the correct field (phoneNumberCountryCode or alternatePhoneCountryCode)
//     }));
    
//   };


  
//   const handleShowMore =async (e) => {
//     e.preventDefault();


//     // Ensure `ppcId` is available
//     if (!ppcId) {
//       alert("PPC-ID is required. Please refresh or try again.");
//       return;
//     }
  
//     // Create FormData instance to send photos and video
//     const formDataToSend = new FormData();
  
//     // Append PPC-ID first
//     formDataToSend.append("ppcId", ppcId);
  
//     // Append form fields
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });
  
//     // Append photos
//     photos.forEach((photo) => {
//       formDataToSend.append("photos", photo);
//     });
  
//     // Append video if available
//     if (video) {
//       formDataToSend.append("video", video);
//     }
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data', 
//         },
//       });

//       if (response.status === 200) {
//         // alert('Property details updated successfully!');
//       }
//     } catch (error) {
//       console.error('Error updating property details:', error);
//       // alert('Failed to update property details. Please try again.');
//     }
//     setCurrentStep(currentStep + 1);
//   };




//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStep("submitted"); // Show PricingPlans

//     // Ensure `ppcId` is available
//     if (!ppcId) {
//       alert("PPC-ID is required. Please refresh or try again.");
//       return;
//     }
  
//     // Create FormData instance to send photos and video
//     const formDataToSend = new FormData();
  
//     // Append PPC-ID first
//     formDataToSend.append("ppcId", ppcId);
  
//     // Append form fields
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });
  
//     // Append photos
//     photos.forEach((photo) => {
//       formDataToSend.append("photos", photo);
//     });
  
//     // Append video if available
//     if (video) {
//       formDataToSend.append("video", video);
//     }
  
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/update-property`,
//         formDataToSend,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setTimeout(() => {
//       }, 5000);
    
//     } catch (error) {
//       console.error("Error saving property data:", error);
//     }
//   };



// const fieldIcons = {
//   // Contact Details
//   phoneNumber: <FaPhone color="#2F747F" />,
//   alternatePhone: <FaPhone color="#2F747F" />,
//   email: <FaEnvelope color="#2F747F" />,
//   bestTimeToCall: <MdSchedule color="#2F747F" />,
  
//   // Property Location
//   rentalPropertyAddress: <MdLocationCity color="#2F747F" />,
//   country: <BiWorld color="#2F747F" />,
//   state: <MdLocationCity color="#2F747F" />,
//   city: <FaCity color="#2F747F" />,
//   district: <FaRegAddressCard color="#2F747F" />,
//   area: <MdLocationOn color="#2F747F" />,
//   streetName: <RiLayoutLine color="#2F747F" />,
//   doorNumber: <BiBuildingHouse color="#2F747F" />,
//   nagar: <FaRegAddressCard color="#2F747F" />,

//   // Ownership & Posting Info
//   ownerName: <FaUserAlt color="#2F747F" />,
//   postedBy: <FaUserAlt color="#2F747F" />,
//   ownership: <HiUserGroup color="#2F747F" />,

//   // Property Details
//   propertyMode: <MdApproval color="#2F747F" />,
//   propertyType: <MdOutlineOtherHouses color="#2F747F" />,
//   propertyApproved: <BsFillHouseCheckFill color="#2F747F" />,
//   propertyAge: <MdSchedule color="#2F747F" />,
//   description: <BsTextareaT color="#2F747F" />,

//   // Pricing & Financials
//   price: <FaRupeeSign color="#2F747F" />,
//   bankLoan: <BsBank color="#2F747F" />,
//   negotiation: <GiMoneyStack color="#2F747F" />,

//   // Measurements
//   length: <MdStraighten color="#2F747F" />,
//   breadth: <MdStraighten color="#2F747F" />,
//   totalArea: <GiResize color="#2F747F" />,
//   areaUnit: <FaChartArea color="#2F747F" />,

//   // Room & Floor Details
//   bedrooms: <FaBed color="#2F747F" />,
//   kitchen: <GiKitchenScale color="#2F747F" />,
//   kitchenType: <GiKitchenScale color="#2F747F" />,
//   balconies: <MdOutlineMeetingRoom color="#2F747F" />,
//   floorNo: <BsBuildingsFill color="#2F747F" />,
//   numberOfFloors: <BsBuildingsFill color="#2F747F" />,
//   attachedBathrooms: <FaBath color="#2F747F" />,
//   western: <FaToilet  color="#2F747F" />,

//   // Features & Amenities
//   facing: <TbArrowLeftRight color="#2F747F" />,
//   salesMode: <GiGears color="#2F747F" />,
//   salesType: <MdOutlineOtherHouses color="#2F747F" />,
//   furnished: <FaHome color="#2F747F" />,
//   lift: <BsBuildingsFill color="#2F747F" />,
//   carParking: <FaCar color="#2F747F" />,
// };

    
//     const renderDropdown = (field) => {
//       const options = dataList[field] || [];
//       const filteredOptions = options.filter((option) =>
//         option.toLowerCase().includes(dropdownState.filterText.toLowerCase())
//       );
  
//       return (
//         dropdownState.activeDropdown === field && (
//           <div
//             className="dropdown-popup"
//             style={{
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: '#fff',
//               width: '100%',
//               maxWidth: '400px',
//               padding: '10px',
//               zIndex: 10,
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//               borderRadius: '8px',
//               overflowY: 'auto',
//               maxHeight: '50vh',
//               animation: 'popupOpen 0.3s ease-in-out',
//             }}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Filter options..."
//                 value={dropdownState.filterText}
//                 onChange={handleFilterChange}
//                 style={{
//                   width: '80%',
//                   padding: '5px',
//                   marginBottom: '10px',
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => toggleDropdown(field)}
//                 style={{
//                   cursor: 'pointer',
//                   border: 'none',
//                   background: 'none',
//                 }}
//               >
//                 <FaTimes size={18} color="red" />
//               </button>
//             </div>
//             <ul
//               style={{
//                 listStyleType: 'none',
//                 padding: 0,
//                 margin: 0,
//               }}
//             >
//               {filteredOptions.map((option, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     setFormData((prevState) => ({
//                       ...prevState,
//                       [field]: option,
//                     }));
//                     toggleDropdown(field);
//                   }}
//                   style={{
//                     padding: '5px',
//                     cursor: 'pointer',
//                     backgroundColor: '#f9f9f9',
//                     marginBottom: '5px',
//                   }}
//                 >
//                   {option}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )
//       );
//     };



// const fields = [
//   { name: "propertyMode", type: "select" },
//   { name: "propertyType", type: "select" },
//   { name: "price", type: "input" },
//   { name: "propertyAge", type: "select" },
//   { name: "bankLoan", type: "select" },
//   { name: "negotiation", type: "select" },
//   { name: "length", type: "input" },
//   { name: "breadth", type: "input" },
//   { name: "totalArea", type: "input" },
//   { name: "ownership", type: "select" },
//   { name: "bedrooms", type: "select" },
//   { name: "kitchen", type: "select" },
//   { name: "kitchenType", type: "select" },
//   { name: "balconies", type: "select" },
//   { name: "floorNo", type: "select" },
//   { name: "areaUnit", type: "select" },
//   { name: "propertyApproved", type: "select" },
//   { name: "postedBy", type: "select" },
//   { name: "facing", type: "select" },
//   { name: "salesMode", type: "select" },
//   { name: "salesType", type: "select" },
//   { name: "description", type: "input" },
//   { name: "furnished", type: "select" },
//   { name: "lift", type: "select" },
//   { name: "attachedBathrooms", type: "select" },
//   { name: "western", type: "select" },
//   { name: "numberOfFloors", type: "select" },
//   { name: "carParking", type: "select" },
//   { name: "rentalPropertyAddress", type: "input" },
//   { name: "country", type: "input" },
//   { name: "state", type: "input" },
//   { name: "city", type: "input" },
//   { name: "district", type: "input" },
//   { name: "area", type: "input" },
//   { name: "streetName", type: "input" },
//   { name: "doorNumber", type: "input" },
//   { name: "nagar", type: "input" },
//   { name: "ownerName", type: "input" },
//   { name: "email", type: "input" },
//   { name: "phoneNumber", type: "input" },
//   { name: "alternatePhone", type: "input" },
//   { name: "bestTimeToCall", type: "select" },
// ];

// const handleEdit = () => {
//   // setIsPreview(false);
//   setStep("form"); // Go back to form

// };
//   return (
//     <div className="d-flex align-items-center justify-content-center">
//     <div      style={{
//               width: '100%',
//               maxWidth: '450px',
//               minWidth: '300px',
//               padding: '5px',
//               borderRadius: '8px',
//               margin: '0 5px',
//               overflowY:"scroll"
//               , height:"70vh",
//               scrollbarWidth: 'none',
//             }}>
//       <h1>Property Management</h1>
//       {step === "submitted" ?  (
//             <PricingPlans phoneNumber={phoneNumber} onClose={handleCloseAddForm}/>
      
      
//     ) : step === "form" ?  (
// <form onSubmit={handleSubmit} className="w-100">
//         <p className="p-3" style={{ color: "white", backgroundColor: "rgb(47,116,127)" }}>PPC-ID: {ppcId}</p>


//                         <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Images  </h4>

// <div className="form-group photo-upload-container mt-2">
//   <input
//     type="file"
//     multiple
//     accept="image/*"
//     onChange={handlePhotoUpload}
//     name="photos"
//     id="photo-upload"
//     className="photo-upload-input"
//     style={{ display: 'none' }} // Hide the input field
//   />
//   <label htmlFor="photo-upload" className="photo-upload-label fw-normal m-0">
//     <MdAddPhotoAlternate
//       style={{
//         color: 'white',
//         backgroundColor: '#2e86e4',
//         padding: '5px',
//         fontSize: '30px',
//         borderRadius: '50%',
//         marginRight: '5px',
//       }}
//     />
//     Upload Your Property Images
//   </label>
// </div>

//         {photos.length > 0 && (
//           <div className="uploaded-photos">
//             <h4>Uploaded Photos</h4>
//             <div className="uploaded-photos-grid">
//               {photos.map((photo, index) => (
//                 <div key={index} className="uploaded-photo-item">
//                   <input
//                     type="radio"
//                     name="selectedPhoto"
//                     className="me-1"
//                     checked={selectedPhotoIndex === index}
//                     onChange={() => handlePhotoSelect(index)}
//                   />
//                   <img
//                     src={URL.createObjectURL(photo)}
//                     alt="Uploaded"
//                     className="uploaded-photo mb-3"
//                   />
//                   <button
//                     className=""
//                     onClick={() => removePhoto(index)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Video Upload Section */}
//         <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>Property Video</h4>
//         <div className="form-group">
//           <input
//             type="file"
//             name="video"
//             accept="video/*"
//             id="videoUpload"
//             onChange={handleVideoChange}
//             className="d-none"
//           />
//           <label htmlFor="videoUpload" className="file-upload-label fw-normal">
//             <span className="pt-5">
//               <FaFileVideo
//                 style={{
//                   color: 'white',
//                   backgroundColor: '#2e86e4',
//                   padding: '5px',
//                   fontSize: '30px',
//                   marginRight: '5px',
//                 }}
//               />
//               Upload Property Video
//             </span>
//           </label>

//           {/* Display the selected video */}
//           {video && (
//             <div className="selected-video-container">
//               <h4 className="text-start">Selected Video:</h4>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <video width="200" controls>
//                   <source src={URL.createObjectURL(video)} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//                 <Button
//                   variant="danger"
//                   onClick={removeVideo}
//                   style={{ height: '40px' }}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

// {currentStep >= 1 && (
//                 <div>
//                           <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property OverView  </h4>             

//   {/* Property Mode */}
//   <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>Property Mode <span style={{ color: 'red' }}>* </span></label>

//       <div style={{ display: "flex", alignItems: "center", width:"100%" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="propertyMode"
//             value={formData.propertyMode || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }}
//             required
//           >
//             <option value="">Select Property Mode</option>
//             {dataList.propertyMode?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("propertyMode")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.propertyMode || <FaHome />}
//             </span>
//             {formData.propertyMode || "Select Property Mode"}
//           </button>

//           {renderDropdown("propertyMode")}
//         </div>
//       </div>
//     </label>
//   </div>

//   <div className="form-group">
//     <label style={{ width: '100%'}}>
// <label>Property Type <span style={{ color: 'red' }}>* </span> </label>
//       <div style={{ display: "flex", alignItems: "center"}}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="propertyType"
//             value={formData.propertyType || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} 
//             required
//           >
//             <option value="">Select property Type</option>
//             {dataList.propertyType?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("propertyType")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.propertyType || <FaHome />}
//             </span>
//             {formData.propertyType || "Select Property Type"}
//           </button>

//           {renderDropdown("propertyType")}
//         </div>
//       </div>
//     </label>
//   </div>
//   {/* Price */}
 
//   <div className="form-group">
//   <label>Price <span style={{ color: 'red' }}>* </span> </label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="price"
//       value={formData.price}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="price"
//       required
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
//   </div>

//   </div>
//  )}


// {currentStep >= 2 && (
//                 <div>
//   {/* Negotiation */}
//   <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Basic Property Info  </h4>             

//   <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>Negotiation  </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="negotiation"
//             value={formData.negotiation || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select negotiation</option>
//             {dataList.negotiation?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("negotiation")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.negotiation || <FaHome />}
//             </span>
//             {formData.negotiation || "Selectnegotiation"}
//           </button>

//           {renderDropdown("negotiation")}
//         </div>
//       </div>
//     </label>
//   </div>

//   {/* Length */} 
//   <div className="form-group">
//   <label>length</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="length"
//       value={formData.length}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="length"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* Breadth */}
//   <div className="form-group">
//   <label>breadth:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="breadth"
//       value={formData.breadth}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="breadth"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
//   </div>
//   {/* Total Area */}
//   <div className="form-group">
//   <label>Total Area: <span style={{ color: 'red' }}>* </span> </label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="totalArea"
//       value={formData.totalArea}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="totalArea"
//       required
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
//   </div>

//     {/* areaUnit */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>Area Unit <span style={{ color: 'red' }}>* </span> </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="areaUnit"
//             value={formData.areaUnit || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             required
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select areaUnit</option>
//             {dataList.areaUnit?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("areaUnit")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.areaUnit || <FaHome />}
//             </span>
//             {formData.areaUnit || "Select areaUnit"}
//           </button>

//           {renderDropdown("areaUnit")}
//         </div>
//       </div>
//     </label>
//   </div>

//   {/* Ownership */}
//   <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>Ownership </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="ownership"
//             value={formData.ownership || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select ownership</option>
//             {dataList.ownership?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("ownership")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.ownership || <FaHome />}
//             </span>
//             {formData.ownership || "Select ownership"}
//           </button>

//           {renderDropdown("ownership")}
//         </div>
//       </div>
//     </label>
//   </div>

//   </div>
//  )}


//  {currentStep >= 3 && ( 
//                 <div>
//   {/* Bedrooms */}
//   <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property details  </h4>             

// <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>bedrooms </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="bedrooms"
//             value={formData.bedrooms || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select bedrooms</option>
//             {dataList.bedrooms?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("bedrooms")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.bedrooms || <FaHome />}
//             </span>
//             {formData.bedrooms || "Select bedrooms"}
//           </button>

//           {renderDropdown("bedrooms")}
//         </div>
//       </div>
//     </label>
//   </div>
//   {/* kitchen */}
//   <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>kitchen </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="kitchen"
//             value={formData.kitchen || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select kitchen</option>
//             {dataList.kitchen?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("kitchen")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.kitchen || <FaHome />}
//             </span>
//             {formData.kitchen || "Select kitchen"}
//           </button>

//           {renderDropdown("kitchen")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* kitchenType */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>kitchenType </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="kitchenType"
//             value={formData.kitchenType || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select kitchenType</option>
//             {dataList.kitchenType?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("kitchenType")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.kitchenType || <FaHome />}
//             </span>
//             {formData.kitchenType || "Select kitchenType"}
//           </button>

//           {renderDropdown("kitchenType")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* balconies */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>balconies </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="balconies"
//             value={formData.balconies || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select balconies</option>
//             {dataList.balconies?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("balconies")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.balconies || <FaHome />}
//             </span>
//             {formData.balconies || "Select balconies"}
//           </button>

//           {renderDropdown("balconies")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* floorNo */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>floorNo </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="floorNo"
//             value={formData.floorNo || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select floorNo</option>
//             {dataList.floorNo?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("floorNo")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.floorNo || <FaHome />}
//             </span>
//             {formData.floorNo || "Select floorNo"}
//           </button>

//           {renderDropdown("floorNo")}
//         </div>
//       </div>
//     </label>
//   </div>
//   </div>
//  )}
  

// {currentStep >= 4 && (
//                 <div>

// <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Other Details  </h4>             

//     {/* propertyApproved */}

//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>property Approved</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="propertyApproved"
//             value={formData.propertyApproved || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select propertyApproved</option>
//             {dataList.propertyApproved?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("propertyApproved")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.propertyApproved || <FaHome />}
//             </span>
//             {formData.propertyApproved || "Select propertyApproved"}
//           </button>

//           {renderDropdown("propertyApproved")}
//         </div>
//       </div>
//     </label>
//   </div>


//     {/* Property Age */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>Property Age </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="propertyAge"
//             value={formData.propertyAge || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select Property Age</option>
//             {dataList.propertyAge?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("propertyAge")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.propertyAge || <FaHome />}
//             </span>
//             {formData.propertyAge || "Select Property Age"}
//           </button>

//           {renderDropdown("propertyAge")}
//         </div>
//       </div>
//     </label>
//   </div>

//   {/* Bank Loan */}

//   <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>Bank Loan </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="bankLoan"
//             value={formData.bankLoan || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select Bank Loan</option>
//             {dataList.bankLoan?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("bankLoan")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.bankLoan || <FaHome />}
//             </span>
//             {formData.bankLoan || "Select Bank Loan"}
//           </button>

//           {renderDropdown("bankLoan")}
//         </div>
//       </div>
//     </label>
//   </div>

 
//     {/* facing */}
//     <div className="form-group">

//     <label style={{ width: '100%'}}>
//     <label>facing</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="facing"
//             value={formData.facing || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select facing</option>
//             {dataList.facing?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("facing")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.facing || <FaHome />}
//             </span>
//             {formData.facing || "Select facing"}
//           </button>

//           {renderDropdown("facing")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* salesMode */}

//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>sales Mode</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="salesMode"
//             value={formData.salesMode || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select salesMode</option>
//             {dataList.salesMode?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("salesMode")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.salesMode || <FaHome />}
//             </span>
//             {formData.salesMode || "Select salesMode"}
//           </button>

//           {renderDropdown("salesMode")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* salesType */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//       <label>Sale Type <span style={{ color: 'red' }}>* </span> </label>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="salesType"
//             value={formData.salesType || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             required
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select salesType</option>
//             {dataList.salesType?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("salesType")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.salesType || <FaHome />}
//             </span>
//             {formData.salesType || "Select salesType"}
//           </button>

//           {renderDropdown("salesType")}
//         </div>
//       </div>
//     </label>
//   </div>

//    {/* postedBy */}
//    <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>postedBy <span style={{ color: 'red' }}>* </span> </label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="postedBy"
//             value={formData.postedBy || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             required
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select postedBy</option>
//             {dataList.postedBy?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("postedBy")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.postedBy || <FaHome />}
//             </span>
//             {formData.postedBy || "Select postedBy"}
//           </button>

//           {renderDropdown("postedBy")}
//         </div>
//       </div>
//     </label>
//   </div>

//   </div>
// )} 



// {currentStep >= 5 && (
// <div>
// <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property Description   </h4>             

//   {/* Description */}
//   <div className="form-group">
//     <label>Description:</label>
//     <textarea name="description" onChange={handleFieldChange} className="form-control" placeholder="Enter Description"></textarea>
//   </div>

//   {/* furnished */}
//   <div className="form-group">
//     <label style={{width:"100%"}}>
//     <label>furnished</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="furnished"
//             value={formData.furnished || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select furnished</option>
//             {dataList.furnished?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("furnished")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.furnished || <FaHome />}
//             </span>
//             {formData.furnished || "Select furnished"}
//           </button>

//           {renderDropdown("furnished")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/*lift */}
//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//       <label>lift</label>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="lift"
//             value={formData.lift || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select lift</option>
//             {dataList.lift?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("lift")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.lift || <FaHome />}
//             </span>
//             {formData.lift || "Select lift"}
//           </button>

//           {renderDropdown("lift")}
//         </div>
//       </div>
//     </label>
//   </div>

//       {/*attachedBathrooms */}
//       <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>attached Bathrooms</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="attachedBathrooms"
//             value={formData.attachedBathrooms || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select attachedBathrooms</option>
//             {dataList.attachedBathrooms?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("attachedBathrooms")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.attachedBathrooms || <FaHome />}
//             </span>
//             {formData.attachedBathrooms || "Select attachedBathrooms"}
//           </button>

//           {renderDropdown("attachedBathrooms")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* western */}
//     <div className="form-group">

//     <label style={{ width: '100%'}}>
//     <label>western</label>

//       <div style={{ display: "flex", alignItems: "center"}}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="western"
//             value={formData.western || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select western</option>
//             {dataList.western?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("western")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.western || <FaHome />}
//             </span>
//             {formData.western || "Select western"}
//           </button>

//           {renderDropdown("western")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* numberOfFloors */}
//     <div className="form-group">

//     <label style={{ width: '100%'}}>
//     <label>number Of Floors</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="numberOfFloors"
//             value={formData.numberOfFloors || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select numberOfFloors</option>
//             {dataList.numberOfFloors?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("numberOfFloors")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.numberOfFloors || <FaHome />}
//             </span>
//             {formData.numberOfFloors || "Select numberOfFloors"}
//           </button>

//           {renderDropdown("numberOfFloors")}
//         </div>
//       </div>
//     </label>
//   </div>
//     {/* carParking */}

//     <div className="form-group">
//     <label style={{ width: '100%'}}>
//     <label>car Parking</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="carParking"
//             value={formData.carParking || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select carParking</option>
//             {dataList.carParking?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("carParking")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.carParking || <FaHome />}
//             </span>
//             {formData.carParking || "Select carParking"}
//           </button>

//           {renderDropdown("carParking")}
//         </div>
//       </div>
//     </label>
//   </div>
//   </div>
//  )} 




//   {/*   rentalPropertyAddress */}
//   {currentStep >= 6 && (
// <div>

// <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property Address   </h4>             


//   <div className="form-group">
// <label>rental Property Address:</label>

// <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background:"#fff"}}>
//     <FaHome className="input-icon" 
//     style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="rentalPropertyAddress"
//       value={formData.rentalPropertyAddress}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Rental Property Address"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>


//   {/* country */}

//   <div className="form-group">
//   <label>country:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <BiWorld className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="country"
//       value={formData.country}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="country"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
//   </div>
  
//   {/* State */}

// <div className="form-group">
//   <label>State:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <MdLocationCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="state"
//       value={formData.state}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="State"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* City */}

// <div className="form-group">
//   <label>City:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="city"
//       value={formData.city}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="City"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>

//   {/* district */}
//   <div className="form-group">
//   <label>District:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="district"
//       value={formData.district}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="District"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* area */}
//   <div className="form-group">
//   <label>Area:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <MdLocationOn className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="area"
//       value={formData.area}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Area"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* streetName */}
//   <div className="form-group">
//   <label>Street Name:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaRoad className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="streetName"
//       value={formData.streetName}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Street Name"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* doorNumber */}
//   <div className="form-group">
//   <label>Door Number:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaDoorClosed className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="doorNumber"
//       value={formData.doorNumber}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Door Number"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
//   </div>

//   {/* Nagar */}
//   <div className="form-group">
//   <label>Nagar:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaMapPin className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="nagar"
//       value={formData.nagar}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Nagar"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>

// <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Owner Details   </h4>             
//   {/* Owner Name */}

// <div className="form-group">
//   <label>Owner Name:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaUserAlt className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="text"
//       name="ownerName"
//       value={formData.ownerName}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Owner Name"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>

//   {/* Email */}
//   <div className="form-group">
//   <label>Email:</label>
//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaEnvelope className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
//     <input
//       type="email"
//       name="email"
//       value={formData.email}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Email"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* Phone Number */}

// <div className="form-group">
// <label>Phone Number:</label>

//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaPhone className="input-icon" style={{ color: '#2F747F', marginLeft:"10px" }} />
    
//     <div style={{ flex: '0 0 10%' }}>
//       <label>
//         <select
//           name="countryCode"
//           value={formData.countryCode || ""}
//           onChange={handleFieldChange}
//           className="form-control m-0"
//           style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//         >
//           <option value="">Select Country Code</option>
//           {countryCodes.map((item, index) => (
//             <option key={index} value={item.code}>
//               {item.code} - {item.country}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>

//     <input
//       type="text"
//       name="phoneNumber"
//       value={phoneNumber}
//       readOnly
//       className="form-input m-0"
//       placeholder="Phone Number"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>
//   {/* Alternate Number */}

// <div className="form-group">
// <label>Alternate number:</label>

//   <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
//     <FaPhone className="input-icon" style={{ color: '#2F747F', marginLeft:"10px" }} />
    
//     <div style={{ flex: '0 1 10%' }}>
//       <label>
//         <select
//           name="countryCode"
//           value={formData.countryCode || ""}
//           onChange={handleFieldChange}
//           className="form-control m-0"
//           style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//         >
//           <option value="">Select Country Code</option>
//           {countryCodes.map((item, index) => (
//             <option key={index} value={item.code}>
//               {item.code} - {item.country}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>

//     <input
//       type="tel"
//       name="alternatePhone"
//       value={formData.alternatePhone}
//       onChange={handleFieldChange}
//       className="form-input m-0"
//       placeholder="Alternate Phone Number"
//       style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
//     />
//   </div>
// </div>

//   {/* Best Time to Call */}
//   <div className="form-group" >
//     <label style={{width:'100%'}}>
//     <label>best Time To Call</label>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div style={{ flex: "1" }}>
//           <select
//             name="bestTimeToCall"
//             value={formData.bestTimeToCall || ""}
//             onChange={handleFieldChange}
//             className="form-control"
//             style={{ display: "none" }} // Hide the default <select> dropdown
//           >
//             <option value="">Select bestTimeToCall</option>
//             {dataList.bestTimeToCall?.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           <button
//             className="m-0"
//             type="button"
//             onClick={() => toggleDropdown("bestTimeToCall")}
//             style={{
//               cursor: "pointer",
//               border: "1px solid #2F747F",
//               padding: "10px",
//               background: "#fff",
//               borderRadius: "5px",
//               width: "100%",
//               textAlign: "left",
//               color: "#2F747F",
//             }}
//           >
//             <span style={{ marginRight: "10px" }}>
//               {fieldIcons.bestTimeToCall || <FaHome />}
//             </span>
//             {formData.bestTimeToCall || "Select bestTimeToCall"}
//           </button>

//           {renderDropdown("bestTimeToCall")}
//         </div>
//       </div>
//     </label>
//   </div>
//   </div>
// )}



//               {/* Show "Show More" button */}
//               <div className="text-center mt-4">
//                 <div
//                   style={{
//                     display: 'inline-block',
//                     backgroundColor: 'rgb(219, 219, 219)',
//                     padding: '5px',
//                     borderRadius: '50%',
//                     cursor: 'pointer',
//                   }}
//                   onClick={handleShowMore}
//                 >
//                   <MdKeyboardDoubleArrowDown
//                     size={30}
//                     style={{ color: 'rgb(58, 57, 57)' }}
//                   />
//                 </div>
//               </div>

//               {/* Step 3: Submit all data */}
//               {currentStep > 6 && (
//                 <Button
//                   type="submit"
//                   style={{ marginTop: '15px', backgroundColor: "rgb(47,116,127)" }}
//                   onClick={handlePreview}
//                 >
//                   PreView
//                 </Button>
//            )} 

//       </form>
//       ) :  (

// <div className="preview-section">
       
//        <div className="preview-section row">
//        {photos.length > 0 || video ? (
//          <Swiper navigation modules={[Navigation]} className="swiper-container">
//            {photos.map((photo, index) => (
//              <SwiperSlide key={index}
//              className="d-flex justify-content-center align-items-center"
//              style={{
//                height: "200px",
//                width: "100%",
//                overflow: "hidden",
//                borderRadius: "8px",
//                margin: "auto",
//                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                cursor: "pointer",
//              }}>
//                <img
//                  src={URL.createObjectURL(photo)}
//                  alt={`Preview ${index + 1}`}
//                  className="preview-image"
//                  style={{
//                    height: "100%",
//                    width: "100%",
//                    objectFit: "cover",
//                  }}
//                />
//              </SwiperSlide>
//            ))}
//            {video && (
//              <SwiperSlide>
//                <div
//              className="d-flex justify-content-center align-items-center"
//              style={{
//                height: "200px",
//                width: "100%",
//                overflow: "hidden",
//                borderRadius: "8px",
//                margin: "auto",
//                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                cursor: "pointer",
//              }}
//            >
//                <video controls className="preview-video" style={{ width: "100%", height: "200px", objectFit: "cover" }}>
//                  <source src={URL.createObjectURL(video)} type={video.type} />
//                  Your browser does not support the video tag.
//                </video>
//                </div>
//              </SwiperSlide>
//            )}
//          </Swiper>
//        ) : (
//          <p>No media uploaded.</p>
//        )}
// <div className="row">
// {propertyDetailsList.map((detail, index) => {
// // Check if it's a heading, which should always be full-width (col-12)
// if (detail.heading) {
//   return (
//     <div key={index} className="col-12">
//       <h4
//         className="mb-3 fw-bold"
//         style={{ color: "#000000", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
//       >
//         {detail.label}
//       </h4>
//     </div>
//   );
// }


// // If it's one of the specific fields (Location, Total Area, Posted On) or any field except description, use col-6
// const columnClass = detail.value === "Description"
//   ? "col-12"  // Description will always be col-12
//   : "col-6";  // All other fields including Location, Total Area, and Posted On will use col-6

// return (
//   <div key={index} className={columnClass}>
//     <div
//       className="d-flex align-items-center border rounded p-3 mb-1"
//       style={{
//         backgroundColor: "#F9F9F9", // Background for the item
//         width: "100%",
//         height: detail.label === "Description" || detail.value === formData.description ? "auto" : "100px", // Full height for description
//       }}
//     >
//       <span className="me-3 fs-3" style={{ color: "#30747F" }}>
//         {detail.icon} 
//       </span>
//       <div>
//         <h6 className="mb-1">{detail.label}</h6>
//         <p
//           className="mb-0 p-0"
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             width: "100%", // Ensure the value takes full width
//           }}
//         >
//           {detail.value || "N/A"} 
//         </p>
//       </div>
//     </div>
//   </div>
// );
// })}
// </div>


//       </div>
//       <button
//         type="button"
//         style={{ background: "#2F747F", color: "#fff" }}
//         onClick={handleEdit}
//       >
//         Edit
//       </button>
//       <button
//         type="button"
//         style={{ border: "1px solid #2F747F",background:"none" , color: "#2F747F" , marginLeft: '10px', fontWeight:"bold"}}
//         onClick={handleSubmit}
//       >
//         Submit Property
//       </button> 
//       </div>
     
//       )
//     }

//     </div>
//     </div>

//   );
// }

// export default AddProperties;


























import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {  useLocation, useNavigate } from "react-router-dom";
import { RiLayoutLine } from 'react-icons/ri';
import { TbArrowLeftRight } from 'react-icons/tb';
import {FaBuilding, FaMoneyBillWave,  FaBath, FaChartArea, FaPhone ,FaEdit,FaRoad,FaDoorClosed,FaMapPin, FaHome, FaUserAlt, FaEnvelope,  FaRupeeSign , FaFileVideo , FaToilet,FaCar,FaBed,  FaCity , FaTimes, FaPhoneAlt, FaClock, FaMapMarkedAlt, FaExchangeAlt, FaCompass, FaHandshake, FaTag, FaArrowLeft} from 'react-icons/fa';
import {  FaRegAddressCard } from 'react-icons/fa6';
import { MdLocationOn, MdOutlineMeetingRoom, MdOutlineOtherHouses, MdSchedule , MdStraighten , MdApproval, MdLocationCity , MdAddPhotoAlternate, MdKeyboardDoubleArrowDown, MdOutlineBathroom, MdDoorFront} from "react-icons/md";
import { BsBank, BsBuildingsFill, BsFillHouseCheckFill , BsTextareaT} from "react-icons/bs";
import { GiKitchenScale, GiMoneyStack , GiResize , GiGears} from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { BiBuildingHouse , BiMap, BiWorld} from "react-icons/bi";
import {   FaFileAlt, FaGlobeAmericas, FaMapMarkerAlt, FaMapSigns } from "react-icons/fa";
import {MdElevator ,MdOutlineChair ,MdPhone, MdOutlineAccessTime, MdTimer, MdHomeWork, MdHouseSiding, MdOutlineKitchen, MdEmail, } from "react-icons/md";
import {  BsBarChart, BsGraphUp } from "react-icons/bs";
import { BiBuilding, BiStreetView } from "react-icons/bi";
import { GiStairs, GiForkKnifeSpoon, GiWindow } from "react-icons/gi";
import { AiOutlineEye, AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { BiBed, BiBath, BiCar, BiCalendar, BiUser, BiCube } from "react-icons/bi";
import { toast } from "react-toastify";
import Plans from './PricingPlans';
import PricingPlans from "./PricingPlans";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GrSteps } from "react-icons/gr";
import moment from "moment";



function AddProperties() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPlans, setshowPlans] = useState(false);
  const [priceInWords, setPriceInWords] = useState("");

      const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    
      const previewRef = useRef(null);
    
  const location = useLocation();
  const { ppcId, phoneNumber } = location.state || {};


    const handleCloseAddForm = () => {
      setshowPlans(false); // Close add property form
    };

  // const [ppcId, setPpcId] = useState(location.state?.ppcId || ""); 
  const [formData, setFormData] = useState({
    propertyMode: '',
    propertyType: '',
    price: '',
    propertyAge: '',
    bankLoan: '',
    negotiation: '',
    length: '',
    breadth: '',
    totalArea: '',
    ownership: '',
    bedrooms: '',
    kitchen: '',
    kitchenType: '',
    balconies: '',
    floorNo: '',
    areaUnit: '',
    propertyApproved: '',
    postedBy: '',
    facing: '',
    salesMode: '',
    salesType: '',
    description: '',
    furnished: '',
    lift: '',
    attachedBathrooms: '',
    western: '',
    numberOfFloors: '',
    carParking: '',
    rentalPropertyAddress: '',
    country: '',
    state: '',
    city: '',
    district: '',
    area: '',
    streetName: '',
    doorNumber: '',
    nagar: '',
    ownerName: '',
    email: '',
    phoneNumber: "",
  phoneNumberCountryCode: "",
  alternatePhone: "",
  alternatePhoneCountryCode: "",
    bestTimeToCall: '',
  });
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [video, setVideo] = useState(null);
  const [isPreview, setIsPreview] = useState(true);
  const [step, setStep] = useState("form"); // "form" -> "preview" -> "submitted"

  const navigate = useNavigate();

  
   
  const formattedCreatedAt = Date.now
  ? moment(formData.createdAt).format("DD-MM-YYYY") 
  : "N/A";

  const handlePreview = () => { 
    const requiredFields = [
      
      "propertyMode",
      "propertyType",
      "price",
      "totalArea",
      "areaUnit",
      "salesType",
      "postedBy"
    ];
  
    const missingFields = requiredFields.filter(field => !formData[field]);
  
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields before previewing: ${missingFields.join(", ")}`);
      return;
    }
    setStep("preview");
    const isValid = requiredFields.every(field => formData[field]);
  
    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }
  
    setIsPreviewOpen(true); // Open the preview
  
    // Scroll to the preview section
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const propertyDetailsList = [
    { heading: true, label: "Basic Property Info" }, // Heading 1
    { icon: <MdHomeWork />, label: "Property Mode", value:  formData.propertyMode},
    { icon: <MdHouseSiding />, label: "Property Type", value: formData.propertyType },
    // { icon: <MdOutlineCurrencyRupee />, label: "Price", value: formData.price },
    // { icon: <FaBalanceScale />, label: "Negotiation", value: formData.negotiation },
    { icon: <AiOutlineColumnWidth />, label: "Length", value: formData.length },
    { icon: <AiOutlineColumnHeight />, label: "Breadth", value: formData.breadth  },
    // { icon: <RiLayoutLine />, label: "Total Area", value: formData.totalArea},
    {
      icon: <RiLayoutLine />,
      label: "Total Area",
      value: `${formData.totalArea} ${formData.areaUnit}`, // Combined value
    },
    // { icon: <BiRuler />, label: "Area Unit", value: formData.areaUnit },
    { icon: <FaUserAlt />, label: "Ownership", value: formData.ownership },
    { icon: <MdApproval />, label: "Property Approved", value: formData.propertyApproved },
    { icon: <MdTimer />, label: "Property Age", value: formData.propertyAge },
    { icon: <BsBank />, label: "Bank Loan", value: formData.bankLoan },


    { heading: true, label: "Property Features" }, // Heading 1
    { icon: <BiBed />, label: "Bedrooms", value: formData.bedrooms },

    { icon: <GiStairs />, label: "Floor No", value:formData.floorNo },
    { icon: <GiForkKnifeSpoon />, label: "Kitchen", value: formData.kitchen},
    { icon: <MdOutlineKitchen />, label: "Kitchen Type", value: formData.kitchenType },
    { icon: <GiWindow />, label: "Balconies", value: formData.balconies},
    { icon: <BiCube />, label: "Floors", value: formData.numberOfFloors },
{ label: "western", value: formData.western, icon: <BiBath /> },
{ label: "attached", value: formData.attachedBathrooms, icon: <BiBath /> },

    { icon: <BiCar />, label: "Car Park", value: formData.carParking },
    { icon: <MdElevator />, label: "Lift", value: formData.lift },
    { heading: true, label: "Other details" }, // Heading 2

    { icon: <MdOutlineChair />, label: "Furnished", value: formData.furnished },
    { icon: <TbArrowLeftRight />, label: "Facing", value: formData.facing },

    { icon: <BsGraphUp />, label: "Sale Mode", value: formData.salesMode },
    { icon: <BsBarChart />, label: "Sales Type", value: formData.salesType },
    { icon: <BiUser />, label: "Posted By", value: formData.postedBy },
    // { icon: <AiOutlineEye />, label: "No.Of.Views", value: "1200" },
    { icon: <BiCalendar />, label: "Posted On", value:formattedCreatedAt },
    { heading: true, label: "Description" }, // Heading 3
    { icon: <FaFileAlt />, label: "Description", value: formData.description },
  
    { heading: true, label: "Property Location Info" }, // Heading 4
  
    // { icon: <BiMap />, label: "Location", value: "New York, USA" },
    { icon: <FaGlobeAmericas />, label: "Country", value: formData.country },
    { icon: <BiBuilding />, label: "State", value: formData.state },
    { icon: <MdLocationCity />, label: "City", value: formData.city },
    { icon: <FaMapMarkerAlt />, label: "District", value:  formData.district},
    { icon: <FaMapSigns />, label: "Nagar", value: formData.nagar },
    { icon: <FaDoorClosed />, label: "Door Number", value: formData.doorNumber },

    { heading: true, label: "Contact Info" }, // Heading 5
   
    { icon: <FaUserAlt />, label: "Owner Name", value: formData.ownerName },
    { icon: <MdPhone  />, label: "Phone Number", value: phoneNumber },
    { icon: <MdPhone  />, label: "alternate Phone", value: formData.alternatePhone },

    { icon: <MdEmail />, label: "Email", value: formData.email },
    { icon: <MdOutlineAccessTime />, label: "Best Time To Call", value: formData.bestTimeToCall },
 
  ];
  const [dropdownState, setDropdownState] = useState({
    activeDropdown: null,
    filterText: "",
  });

  // Toggle dropdown visibility
  const toggleDropdown = (field) => {
    setDropdownState((prevState) => ({
      activeDropdown: prevState.activeDropdown === field ? null : field,
      filterText: "",
    }));
  };

  // Handle dropdown selection
  const handleDropdownSelect = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    setDropdownState({ activeDropdown: null, filterText: "" });
  };

  // Handle filter input change for dropdown
  const handleFilterChange = (e) => {
    setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }));
  };
  // const [ppcId, setPpcId] = useState(null);

 


  const [countryCodes, setCountryCodes] = useState([
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+86', country: 'China' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    // ... other countries
  ]);
  const [alternateCountryCodes, setAlternateCountryCodes] = useState([
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+86', country: 'China' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia/Kazakhstan' },
  ]);
  
  
  const [dataList, setDataList] = useState({});

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch`);
      const groupedData = response.data.data.reduce((acc, item) => {
        if (!acc[item.field]) acc[item.field] = [];
        acc[item.field].push(item.value);
        return acc;
      }, {});
      setDataList(groupedData);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    for (let file of files) {
      if (file.size > maxSize) {
        alert('File size exceeds the 10MB limit');
        return;
      }
    }
    if (photos.length + files.length <= 15) {
      setPhotos([...photos, ...files]);
      setSelectedPhotoIndex(0);
    } else {
      alert('Maximum 15 photos can be uploaded.');
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    if (index === selectedPhotoIndex) {
      setSelectedPhotoIndex(0);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      alert('File size exceeds the 50MB limit');
      return;
    }
    setVideo(file);
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const handlePhotoSelect = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((prev) => ({
      ...prev,
      [name]: value, // This dynamically updates the correct field (phoneNumberCountryCode or alternatePhoneCountryCode)
    }));
    if (name === "price" && value !== "" && !isNaN(value)) {
      setPriceInWords(convertToIndianRupees(value));
    } else if (name === "price" && value === "") {
      setPriceInWords("");
    }

  };

  const convertToIndianRupees = (num) => {
    if (!num) return "";
  
    const units = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen",
    ];
    const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
      "Eighty", "Ninety",
    ];
    
    const scales = ["", "Thousand", "Lakh", "Crore"];
    
    let number = parseInt(num, 10);
    let words = "";
  
    if (number === 0) return "Zero";
  
    // Handle Crores
    if (number >= 10000000) {
      words += convertToIndianRupees(Math.floor(number / 10000000)) + " Crore ";
      number %= 10000000;
    }
    // Handle Lakhs
    if (number >= 100000) {
      words += convertToIndianRupees(Math.floor(number / 100000)) + " Lakh ";
      number %= 100000;
    }
    // Handle Thousands
    if (number >= 1000) {
      words += convertToIndianRupees(Math.floor(number / 1000)) + " Thousand ";
      number %= 1000;
    }
    // Handle Hundreds
    if (number >= 100) {
      words += units[Math.floor(number / 100)] + " Hundred ";
      number %= 100;
    }
    // Handle last part (0-99)
    if (number > 0) {
      if (words !== "") words += "and ";
      if (number < 20) {
        words += units[number];
      } else {
        words += tens[Math.floor(number / 10)];
        if (number % 10 !== 0) words += " " + units[number % 10];
      }
    }
  
    return words.trim();
  };
  
  
  const handleShowMore =async (e) => {
    e.preventDefault();


    // Ensure `ppcId` is available
    if (!ppcId) {
      alert("PPC-ID is required. Please refresh or try again.");
      return;
    }
  
    // Create FormData instance to send photos and video
    const formDataToSend = new FormData();
  
    // Append PPC-ID first
    formDataToSend.append("ppcId", ppcId);
  
    // Append form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    // Append photos
    photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });
  
    // Append video if available
    if (video) {
      formDataToSend.append("video", video);
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/update-property`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (response.status === 200) {
        // alert('Property details updated successfully!');
      }
    } catch (error) {
      console.error('Error updating property details:', error);
      // alert('Failed to update property details. Please try again.');
    }
    setCurrentStep(currentStep + 1);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep("submitted"); // Show PricingPlans

    // Ensure `ppcId` is available
    if (!ppcId) {
      alert("PPC-ID is required. Please refresh or try again.");
      return;
    }
  
    // Create FormData instance to send photos and video
    const formDataToSend = new FormData();
  
    // Append PPC-ID first
    formDataToSend.append("ppcId", ppcId);
  
    // Append form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    // Append photos
    photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });
  
    // Append video if available
    if (video) {
      formDataToSend.append("video", video);
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/update-property`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setTimeout(() => {
      }, 5000);
    
    } catch (error) {
      console.error("Error saving property data:", error);
    }
  };


const fieldIcons = {
  // Contact Details
  phoneNumber: <MdPhone color="#2F747F" />,
  alternatePhone: <MdPhone color="#2F747F" />,
  email: <FaEnvelope  color="#2F747F" />,
  bestTimeToCall: <FaClock color="#2F747F" />, // Changed from MdSchedule

  // Property Location
  rentalPropertyAddress: <MdLocationOn color="#2F747F" />, // Changed from MdLocationCity
  country: <BiWorld color="#2F747F" />,
  state: <FaMapMarkerAlt color="#2F747F" />, // Changed from MdLocationCity
  city: <FaCity color="#2F747F" />,
  district: <FaMapMarkedAlt color="#2F747F" />, // Changed from FaRegAddressCard
  area: <MdLocationOn color="#2F747F" />,
  streetName: <FaRoad color="#2F747F" />, // Changed from RiLayoutLine
  doorNumber: <MdDoorFront color="#2F747F" />, // Changed from BiBuildingHouse
  nagar: <FaMapMarkedAlt color="#2F747F" />, // Changed from FaRegAddressCard

  // Ownership & Posting Info
  ownerName: <FaUserAlt color="#2F747F" />,
  postedBy: <FaUserAlt color="#2F747F" />,
  ownership: <HiUserGroup color="#2F747F" />,

  // Property Details
  propertyMode: <FaExchangeAlt color="#2F747F" />, // Changed from MdApproval
  propertyType: <MdOutlineOtherHouses color="#2F747F" />,
  propertyApproved: <BsFillHouseCheckFill color="#2F747F" />,
  propertyAge: <MdSchedule color="#2F747F" />,
  description: <BsTextareaT color="#2F747F" />,

  // Pricing & Financials
  price: <FaRupeeSign color="#2F747F" />,
  bankLoan: <BsBank color="#2F747F" />,
  negotiation: <GiMoneyStack color="#2F747F" />,

  // Measurements
  length: <MdStraighten color="#2F747F" />,
  breadth: <MdStraighten color="#2F747F" />,
  totalArea: <GiResize color="#2F747F" />,
  areaUnit: <FaChartArea color="#2F747F" />,

  // Room & Floor Details
  bedrooms: <FaBed color="#2F747F" />,
  kitchen: <GiKitchenScale color="#2F747F" />,
  kitchenType: <GiKitchenScale color="#2F747F" />,
  balconies: <GiWindow color="#2F747F" />,
  floorNo: <GrSteps  color="#2F747F" />,
  numberOfFloors: <BsBuildingsFill color="#2F747F" />,
  attachedBathrooms: <FaBath color="#2F747F" />,
  western: <MdOutlineBathroom color="#2F747F" />, // Changed from FaToilet

  // Features & Amenities
  facing: <FaCompass color="#2F747F" />, // Changed from TbArrowLeftRight
  salesMode: <FaHandshake color="#2F747F" />, // Changed from GiGears
  salesType: <FaTag color="#2F747F" />, // Changed from MdOutlineOtherHouses
  furnished: <FaHome color="#2F747F" />,
  lift: <MdElevator color="#2F747F" />,
  carParking: <FaCar color="#2F747F" />,
};
   
   const fieldLabels = {
     propertyMode: "Property Mode",
     propertyType: "Property Type",
     price: "Price",
     propertyAge: "Property Age",
     bankLoan: "Bank Loan",
     negotiation: "Negotiation",
     length: "Length",
     breadth: "Breadth",
     totalArea: "Total Area",
     ownership: "Ownership",
     bedrooms: "Bedrooms",
     kitchen: "Kitchen",
     kitchenType: "Kitchen Type",
     balconies: "Balconies",
     floorNo: "Floor No.",
     areaUnit: "Area Unit",
     propertyApproved: "Property Approved",
     postedBy: "Posted By",
     facing: "Facing",
     salesMode: "Sales Mode",
     salesType: "Sales Type",
     description: "Description",
     furnished: "Furnished",
     lift: "Lift",
     attachedBathrooms: "Attached Bathrooms",
     western: "Western Toilet",
     numberOfFloors: "Number of Floors",
     carParking: "Car Parking",
     rentalPropertyAddress: "Rental Property Address",
     country: "Country",
     state: "State",
     city: "City",
     district: "District",
     area: "Area",
     streetName: "Street Name",
     doorNumber: "Door Number",
     nagar: "Nagar",
     ownerName: "Owner Name",
     email: "Email",
     phoneNumber: "Phone Number",
     phoneNumberCountryCode: "Phone Country Code",
     alternatePhone: "Alternate Phone",
     alternatePhoneCountryCode: "Alternate Phone Country Code",
     bestTimeToCall: "Best Time to Call",
   };
   
   const renderDropdown = (field) => {
     const options = dataList[field] || [];
     const filteredOptions = options.filter((option) =>
       option.toLowerCase().includes(dropdownState.filterText.toLowerCase())
     );
   
     return (
       dropdownState.activeDropdown === field && (
         <div
           className="dropdown-popup"
           style={{
             position: "fixed",
             top: "50%",
             left: "50%",
             transform: "translate(-50%, -50%)",
             backgroundColor: "#fff",
             width: "100%",
             maxWidth: "400px",
             padding: "10px",
             zIndex: 10,
             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
             borderRadius: "8px",
             overflowY: "auto",
             maxHeight: "50vh",
             animation: "popupOpen 0.3s ease-in-out",
           }}
         >
           {/* Dynamically Display Field Label */}
           <div
             style={{
               fontWeight: "bold",
               fontSize: "16px",
               marginBottom: "10px",
               textAlign: "start",
               color: "#019988",
             }}
           >
             {fieldLabels[field] || "Property Field"}
           </div>
   
           {/* Search Input and Close Button */}
           <div
             style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
             }}
           >
             <input
               type="text"
               placeholder="Filter options..."
               value={dropdownState.filterText}
               onChange={handleFilterChange}
               style={{
                 width: "80%",
                 padding: "5px",
                 marginBottom: "10px",
               }}
             />
             <button
               type="button"
               onClick={() => toggleDropdown(field)}
               style={{
                 cursor: "pointer",
                 border: "none",
                 background: "none",
               }}
             >
               <FaTimes size={18} color="red" />
             </button>
           </div>
   
           {/* Dropdown List */}
           <ul
             style={{
               listStyleType: "none",
               padding: 0,
               margin: 0,
             }}
           >
             {filteredOptions.map((option, index) => (
               <li
                 key={index}
                 onClick={() => {
                   setFormData((prevState) => ({
                     ...prevState,
                     [field]: option,
                   }));
                   toggleDropdown(field);
                 }}
                 style={{
                   padding: "5px",
                   cursor: "pointer",
                   backgroundColor: "#f9f9f9",
                   marginBottom: "5px",
                 }}
               >
                 {option}
               </li>
             ))}
           </ul>
         </div>
       )
     );
   };
   
   



const fields = [
  { name: "propertyMode", type: "select" },
  { name: "propertyType", type: "select" },
  { name: "price", type: "input" },
  { name: "propertyAge", type: "select" },
  { name: "bankLoan", type: "select" },
  { name: "negotiation", type: "select" },
  { name: "length", type: "input" },
  { name: "breadth", type: "input" },
  { name: "totalArea", type: "input" },
  { name: "ownership", type: "select" },
  { name: "bedrooms", type: "select" },
  { name: "kitchen", type: "select" },
  { name: "kitchenType", type: "select" },
  { name: "balconies", type: "select" },
  { name: "floorNo", type: "select" },
  { name: "areaUnit", type: "select" },
  { name: "propertyApproved", type: "select" },
  { name: "postedBy", type: "select" },
  { name: "facing", type: "select" },
  { name: "salesMode", type: "select" },
  { name: "salesType", type: "select" },
  { name: "description", type: "input" },
  { name: "furnished", type: "select" },
  { name: "lift", type: "select" },
  { name: "attachedBathrooms", type: "select" },
  { name: "western", type: "select" },
  { name: "numberOfFloors", type: "select" },
  { name: "carParking", type: "select" },
  { name: "rentalPropertyAddress", type: "input" },
  { name: "country", type: "input" },
  { name: "state", type: "input" },
  { name: "city", type: "input" },
  { name: "district", type: "input" },
  { name: "area", type: "input" },
  { name: "streetName", type: "input" },
  { name: "doorNumber", type: "input" },
  { name: "nagar", type: "input" },
  { name: "ownerName", type: "input" },
  { name: "email", type: "input" },
  { name: "phoneNumber", type: "input" },
  { name: "alternatePhone", type: "input" },
  { name: "bestTimeToCall", type: "select" },
];

const handleEdit = () => {
  // setIsPreview(false);
  setStep("form"); // Go back to form

};



  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
     <div      style={{
              width: '100%',
              maxWidth: '450px',
              borderRadius: '8px',
              margin: '0 5px',
              fontFamily: "Inter, sans-serif",
            }}>
  <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
            <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
          </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Rental AddProperty </h3> </div>
    


      <h1>Property Management</h1>
      {step === "submitted" ?  (
            <PricingPlans phoneNumber={phoneNumber} onClose={handleCloseAddForm}/>
      
      
    ) : step === "form" ?  (
<form onSubmit={handleSubmit} className="w-100 pb-5">
        <p className="p-3" style={{ color: "white", backgroundColor: "rgb(47,116,127)" }}>PPC-ID: {ppcId}</p>


                        <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Images  </h4>

<div className="form-group photo-upload-container mt-2">
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handlePhotoUpload}
    name="photos"
    id="photo-upload"
    className="photo-upload-input"
    style={{ display: 'none' }} // Hide the input field
  />
  <label htmlFor="photo-upload" className="photo-upload-label fw-normal m-0">
    <MdAddPhotoAlternate
      style={{
        color: 'white',
        backgroundColor: '#2e86e4',
        padding: '5px',
        fontSize: '30px',
        borderRadius: '50%',
        marginRight: '5px',
      }}
    />
    Upload Your Property Images Max-15
  </label>
</div>

        {photos.length > 0 && (
          <div className="uploaded-photos">
            <h4>Uploaded Photos</h4>
            <div className="uploaded-photos-grid">
              {photos.map((photo, index) => (
                <div key={index} className="uploaded-photo-item">
                  <input
                    type="radio"
                    name="selectedPhoto"
                    className="me-1"
                    checked={selectedPhotoIndex === index}
                    onChange={() => handlePhotoSelect(index)}
                  />
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded"
                    className="uploaded-photo mb-3"
                  />
                  <button
                    className=""
                    onClick={() => removePhoto(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Upload Section */}
        <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>Property Video</h4>
        <div className="form-group">
          <input
            type="file"
            name="video"
            accept="video/*"
            id="videoUpload"
            onChange={handleVideoChange}
            className="d-none"
            
          />
          <label htmlFor="videoUpload" className="file-upload-label fw-normal">
            <span className="pt-5">
              <FaFileVideo
                style={{
                  color: 'white',
                  backgroundColor: '#2e86e4',
                  padding: '5px',
                  fontSize: '30px',
                  marginRight: '5px',
                }}
              />
              Upload Property Video
            </span>
          </label>

          {/* Display the selected video */}
          {video && (
            <div className="selected-video-container">
              <h4 className="text-start">Selected Video:</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <video width="200" controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Button
                  variant="danger"
                  onClick={removeVideo}
                  style={{ height: '40px' }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

{currentStep >= 1 && (
                <div>
                          <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property OverView  </h4>             

  {/* Property Mode */}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Property Mode <span style={{ color: 'red' }}>* </span></label>

      <div style={{ display: "flex", alignItems: "center", width:"100%" }}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyMode"
            value={formData.propertyMode || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }}
            required
          >
            <option value="">Select Property Mode</option>
            {dataList.propertyMode?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("propertyMode")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyMode || <FaHome />}
            </span>
            {formData.propertyMode || "Select Property Mode"}
          </button>

          {renderDropdown("propertyMode")}
        </div>
      </div>
    </label>
  </div>

  <div className="form-group">
    <label style={{ width: '100%'}}>
<label>Property Type <span style={{ color: 'red' }}>* </span> </label>
      <div style={{ display: "flex", alignItems: "center"}}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyType"
            value={formData.propertyType || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} 
            required
          >
            <option value="">Select property Type</option>
            {dataList.propertyType?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("propertyType")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyType || <FaHome />}
            </span>
            {formData.propertyType || "Select Property Type"}
          </button>

          {renderDropdown("propertyType")}
        </div>
      </div>
    </label>
  </div>
  {/* Price */}
 
  <div className="form-group">
  <label>Price <span style={{ color: 'red' }}>* </span> </label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRupeeSign className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="price"
      required
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
  {priceInWords && (
        <p style={{ fontSize: "14px", color: "#2F747F", marginTop: "5px" }}>
          {priceInWords}
        </p>
      )}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Negotiation  </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="negotiation"
            value={formData.negotiation || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select negotiation</option>
            {dataList.negotiation?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("negotiation")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.negotiation || <FaHome />}
            </span>
            {formData.negotiation || "Selectnegotiation"}
          </button>

          {renderDropdown("negotiation")}
        </div>
      </div>
    </label>
  </div>

  </div>
 )}


{currentStep >= 2 && (
                <div>
  {/* Negotiation */}
  <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Basic Property Info  </h4>             



  {/* Length */} 
  <div className="form-group">
  <label>Length</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <AiOutlineColumnHeight className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="length"
      value={formData.length}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="length"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<style>
    {`
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}
  </style>
  {/* Breadth */}
  <div className="form-group">
  <label>Breadth:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <AiOutlineColumnWidth className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="breadth"
      value={formData.breadth}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="breadth"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
  {/* Total Area */}
  <div className="form-group">
  <label>Total Area: <span style={{ color: 'red' }}>* </span> </label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <RiLayoutLine className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="number"
      name="totalArea"
      value={formData.totalArea}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="totalArea"
      required
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>

    {/* areaUnit */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Area Unit <span style={{ color: 'red' }}>* </span> </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="areaUnit"
            value={formData.areaUnit || ""}
            onChange={handleFieldChange}
            className="form-control"
            required
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select areaUnit</option>
            {dataList.areaUnit?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("areaUnit")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.areaUnit || <FaHome />}
            </span>
            {formData.areaUnit || "Select areaUnit"}
          </button>

          {renderDropdown("areaUnit")}
        </div>
      </div>
    </label>
  </div>

  {/* Ownership */}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Ownership </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="ownership"
            value={formData.ownership || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select ownership</option>
            {dataList.ownership?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("ownership")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.ownership || <FaHome />}
            </span>
            {formData.ownership || "Select ownership"}
          </button>

          {renderDropdown("ownership")}
        </div>
      </div>
    </label>
  </div>

  </div>
 )}


 {currentStep >= 3 && ( 
                <div>
  {/* Bedrooms */}
  <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property details  </h4>             

<div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Bedrooms </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="bedrooms"
            value={formData.bedrooms || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select bedrooms</option>
            {dataList.bedrooms?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("bedrooms")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.bedrooms || <FaHome />}
            </span>
            {formData.bedrooms || "Select bedrooms"}
          </button>

          {renderDropdown("bedrooms")}
        </div>
      </div>
    </label>
  </div>
  {/* kitchen */}
  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>kitchen </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="kitchen"
            value={formData.kitchen || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select kitchen</option>
            {dataList.kitchen?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("kitchen")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.kitchen || <FaHome />}
            </span>
            {formData.kitchen || "Select kitchen"}
          </button>

          {renderDropdown("kitchen")}
        </div>
      </div>
    </label>
  </div>
    {/* kitchenType */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>kitchenType </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="kitchenType"
            value={formData.kitchenType || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select kitchenType</option>
            {dataList.kitchenType?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("kitchenType")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.kitchenType || <FaHome />}
            </span>
            {formData.kitchenType || "Select kitchenType"}
          </button>

          {renderDropdown("kitchenType")}
        </div>
      </div>
    </label>
  </div>
    {/* balconies */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Balconies </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="balconies"
            value={formData.balconies || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select balconies</option>
            {dataList.balconies?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("balconies")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.balconies || <FaHome />}
            </span>
            {formData.balconies || "Select balconies"}
          </button>

          {renderDropdown("balconies")}
        </div>
      </div>
    </label>
  </div>
    {/* floorNo */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>FloorNo </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="floorNo"
            value={formData.floorNo || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select floorNo</option>
            {dataList.floorNo?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("floorNo")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.floorNo || <FaHome />}
            </span>
            {formData.floorNo || "Select floorNo"}
          </button>

          {renderDropdown("floorNo")}
        </div>
      </div>
    </label>
  </div>
  </div>
 )}
  

{currentStep >= 4 && (
                <div>

<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Other Details  </h4>             

    {/* propertyApproved */}

    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Property Approved</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyApproved"
            value={formData.propertyApproved || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select propertyApproved</option>
            {dataList.propertyApproved?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("propertyApproved")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyApproved || <FaHome />}
            </span>
            {formData.propertyApproved || "Select propertyApproved"}
          </button>

          {renderDropdown("propertyApproved")}
        </div>
      </div>
    </label>
  </div>


    {/* Property Age */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Property Age </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="propertyAge"
            value={formData.propertyAge || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select Property Age</option>
            {dataList.propertyAge?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("propertyAge")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.propertyAge || <FaHome />}
            </span>
            {formData.propertyAge || "Select Property Age"}
          </button>

          {renderDropdown("propertyAge")}
        </div>
      </div>
    </label>
  </div>

  {/* Bank Loan */}

  <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Bank Loan </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="bankLoan"
            value={formData.bankLoan || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select Bank Loan</option>
            {dataList.bankLoan?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("bankLoan")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.bankLoan || <FaHome />}
            </span>
            {formData.bankLoan || "Select Bank Loan"}
          </button>

          {renderDropdown("bankLoan")}
        </div>
      </div>
    </label>
  </div>

 
    {/* facing */}
    <div className="form-group">

    <label style={{ width: '100%'}}>
    <label>Facing</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="facing"
            value={formData.facing || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select facing</option>
            {dataList.facing?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("facing")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.facing || <FaHome />}
            </span>
            {formData.facing || "Select facing"}
          </button>

          {renderDropdown("facing")}
        </div>
      </div>
    </label>
  </div>
    {/* salesMode */}

    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Sales Mode</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="salesMode"
            value={formData.salesMode || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select salesMode</option>
            {dataList.salesMode?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("salesMode")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.salesMode || <FaHome />}
            </span>
            {formData.salesMode || "Select salesMode"}
          </button>

          {renderDropdown("salesMode")}
        </div>
      </div>
    </label>
  </div>
    {/* salesType */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
      <label>Sale Type <span style={{ color: 'red' }}>* </span> </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="salesType"
            value={formData.salesType || ""}
            onChange={handleFieldChange}
            className="form-control"
            required
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select salesType</option>
            {dataList.salesType?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("salesType")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.salesType || <FaHome />}
            </span>
            {formData.salesType || "Select salesType"}
          </button>

          {renderDropdown("salesType")}
        </div>
      </div>
    </label>
  </div>

   {/* postedBy */}
   <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>PostedBy <span style={{ color: 'red' }}>* </span> </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="postedBy"
            value={formData.postedBy || ""}
            onChange={handleFieldChange}
            className="form-control"
            required
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select postedBy</option>
            {dataList.postedBy?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("postedBy")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.postedBy || <FaHome />}
            </span>
            {formData.postedBy || "Select postedBy"}
          </button>

          {renderDropdown("postedBy")}
        </div>
      </div>
    </label>
  </div>

  </div>
)} 



{currentStep >= 5 && (
<div>
<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property Description   </h4>             

  {/* Description */}
  <div className="form-group">
    <label>Description:</label>
    <textarea name="description" style={{border: "1px solid #2F747F",}}
     onChange={handleFieldChange} className="form-control"
      placeholder="Max-word 250"></textarea>
  </div>

  {/* furnished */}
  <div className="form-group">
    <label style={{width:"100%"}}>
    <label>Furnished</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="furnished"
            value={formData.furnished || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select furnished</option>
            {dataList.furnished?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("furnished")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.furnished || <FaHome />}
            </span>
            {formData.furnished || "Select furnished"}
          </button>

          {renderDropdown("furnished")}
        </div>
      </div>
    </label>
  </div>
    {/*lift */}
    <div className="form-group">
    <label style={{ width: '100%'}}>
      <label>Lift</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="lift"
            value={formData.lift || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select lift</option>
            {dataList.lift?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("lift")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.lift || <FaHome />}
            </span>
            {formData.lift || "Select lift"}
          </button>

          {renderDropdown("lift")}
        </div>
      </div>
    </label>
  </div>

      {/*attachedBathrooms */}
      <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Attached Bathrooms</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="attachedBathrooms"
            value={formData.attachedBathrooms || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select attachedBathrooms</option>
            {dataList.attachedBathrooms?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("attachedBathrooms")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.attachedBathrooms || <FaHome />}
            </span>
            {formData.attachedBathrooms || "Select attachedBathrooms"}
          </button>

          {renderDropdown("attachedBathrooms")}
        </div>
      </div>
    </label>
  </div>
    {/* western */}
    <div className="form-group">

    <label style={{ width: '100%'}}>
    <label>Western</label>

      <div style={{ display: "flex", alignItems: "center"}}>
        <div style={{ flex: "1" }}>
          <select
            name="western"
            value={formData.western || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select western</option>
            {dataList.western?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("western")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.western || <FaHome />}
            </span>
            {formData.western || "Select western"}
          </button>

          {renderDropdown("western")}
        </div>
      </div>
    </label>
  </div>
    {/* numberOfFloors */}
    <div className="form-group">

    <label style={{ width: '100%'}}>
    <label>Number Of Floors</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="numberOfFloors"
            value={formData.numberOfFloors || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select numberOfFloors</option>
            {dataList.numberOfFloors?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("numberOfFloors")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.numberOfFloors || <FaHome />}
            </span>
            {formData.numberOfFloors || "Select numberOfFloors"}
          </button>

          {renderDropdown("numberOfFloors")}
        </div>
      </div>
    </label>
  </div>
    {/* carParking */}

    <div className="form-group">
    <label style={{ width: '100%'}}>
    <label>Car Parking</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="carParking"
            value={formData.carParking || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select carParking</option>
            {dataList.carParking?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("carParking")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.carParking || <FaHome />}
            </span>
            {formData.carParking || "Select carParking"}
          </button>

          {renderDropdown("carParking")}
        </div>
      </div>
    </label>
  </div>
  </div>
 )} 




  {/*   rentalPropertyAddress */}
  {currentStep >= 6 && (
<div>

<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Property Address   </h4>             


  <div className="form-group">
<label>Property Address:</label>

<div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background:"#fff"}}>
    <FaHome className="input-icon" 
    style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="rentalPropertyAddress"
      value={formData.rentalPropertyAddress}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Property Address"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>


  {/* country */}

  <div className="form-group">
  <label>Country:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <BiWorld className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="country"
      value={formData.country}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="country"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>
  
  {/* State */}

<div className="form-group">
  <label>State:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <MdLocationCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="State"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* City */}

<div className="form-group">
  <label>City:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaCity className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="City"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

  {/* district */}
  <div className="form-group">
  <label>District:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRegAddressCard className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="district"
      value={formData.district}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="District"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* area */}
  <div className="form-group">
  <label>Area:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <MdLocationOn className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="area"
      value={formData.area}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Area"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* streetName */}
  <div className="form-group">
  <label>Street Name:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaRoad className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="streetName"
      value={formData.streetName}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Street Name"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* doorNumber */}
  <div className="form-group">
  <label>Door Number:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaDoorClosed className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="doorNumber"
      value={formData.doorNumber}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Door Number"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
  </div>

  {/* Nagar */}
  <div className="form-group">
  <label>Nagar:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaMapPin className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="nagar"
      value={formData.nagar}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Nagar"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

<h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>  Owner Details   </h4>             
  {/* Owner Name */}

<div className="form-group">
  <label>Owner Name:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaUserAlt className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="text"
      name="ownerName"
      value={formData.ownerName}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Owner Name"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

  {/* Email */}
  <div className="form-group">
  <label>Email:</label>
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaEnvelope className="input-icon" style={{color: '#2F747F', marginLeft:"10px"}} />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Email"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* Phone Number */}

<div className="form-group">
<label>Phone Number:</label>

  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaPhoneAlt  className="input-icon" style={{ color: '#2F747F', marginLeft:"10px" }} />
    
    <div style={{ flex: '0 0 10%' }}>
      <label className="m-0">
        <select
          name="countryCode"
          value={formData.countryCode || ""}
          onChange={handleFieldChange}
          className="form-control m-0"
          style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
        >
          <option value="">Select Country Code</option>
          {countryCodes.map((item, index) => (
            <option key={index} value={item.code}>
              {item.code} - {item.country}
            </option>
          ))}
        </select>
      </label>
    </div>

    <input
      type="number"
      name="phoneNumber"
      value={phoneNumber}
      readOnly
      className="form-input m-0"
      placeholder="Phone Number"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
  {/* Alternate Number */}

<div className="form-group">
<label>Alternate number:</label>

  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',  border: '1px solid #2F747F', background:"#fff" }}>
    <FaPhoneAlt  className="input-icon" style={{ color: '#2F747F', marginLeft:"10px" }} />
    
    <div style={{ flex: '0 1 10%' }}>
      <label className="m-0">
        <select
          name="countryCode"
          value={formData.countryCode || ""}
          onChange={handleFieldChange}
          className="form-control m-0"
          style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
        >
          <option value="">Select Country Code</option>
          {countryCodes.map((item, index) => (
            <option key={index} value={item.code}>
              {item.code} - {item.country}
            </option>
          ))}
        </select>
      </label>
    </div>

    <input
      type="number"
      name="alternatePhone"
      value={formData.alternatePhone}
      onChange={handleFieldChange}
      className="form-input m-0"
      placeholder="Alternate Phone Number"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>


<div className="form-group">
  <label>Created At:</label>
  <div className="input-card p-2 rounded-1" style={{ border: '1px solid #2F747F', background:"#fff" }}>
    <span>{moment(formData.createdAt).format("DD-MM-YYYY HH:mm A")}</span>
  </div>
</div>


  {/* Best Time to Call */}
  <div className="form-group" >
    <label style={{width:'100%'}}>
    <label>Best Time To Call</label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <select
            name="bestTimeToCall"
            value={formData.bestTimeToCall || ""}
            onChange={handleFieldChange}
            className="form-control"
            style={{ display: "none" }} // Hide the default <select> dropdown
          >
            <option value="">Select bestTimeToCall</option>
            {dataList.bestTimeToCall?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="m-0"
            type="button"
            onClick={() => toggleDropdown("bestTimeToCall")}
            style={{
              cursor: "pointer",
              border: "1px solid #2F747F",
              padding: "10px",
              background: "#fff",
              borderRadius: "5px",
              width: "100%",
              textAlign: "left",
              color: "#2F747F",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {fieldIcons.bestTimeToCall || <FaHome />}
            </span>
            {formData.bestTimeToCall || "Select bestTimeToCall"}
          </button>

          {renderDropdown("bestTimeToCall")}
        </div>
      </div>
    </label>
  </div>
  </div>
)}



              {/* Show "Show More" button */}
              <div className="text-center mt-4">
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgb(219, 219, 219)',
                    padding: '5px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  onClick={handleShowMore}
                >
                  <MdKeyboardDoubleArrowDown
                    size={30}
                    style={{ color: 'rgb(58, 57, 57)' }}
                  />
                </div>
              </div>

              {/* Step 3: Submit all data */}
              {currentStep > 6 && (
                <Button
                  type="submit"
                  style={{ marginTop: '15px', backgroundColor: "rgb(47,116,127)" }}
                  onClick={handlePreview}
                >
                  PreView
                </Button>
           )} 

      </form>
      ) :  (

<div ref={previewRef} className="preview-section pb-5">
       
       <div className="preview-section row">
       {photos.length > 0 || video ? (
         <Swiper navigation modules={[Navigation]} className="swiper-container">
           {photos.map((photo, index) => (
             <SwiperSlide key={index}
             className="d-flex justify-content-center align-items-center"
             style={{
               height: "200px",
               width: "100%",
               overflow: "hidden",
               borderRadius: "8px",
               margin: "auto",
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
               cursor: "pointer",
             }}>
               <img
                 src={URL.createObjectURL(photo)}
                 alt={`Preview ${index + 1}`}
                 className="preview-image"
                 style={{
                   height: "100%",
                   width: "100%",
                   objectFit: "cover",
                 }}
               />
             </SwiperSlide>
           ))}
           {video && (
             <SwiperSlide>
               <div
             className="d-flex justify-content-center align-items-center"
             style={{
               height: "200px",
               width: "100%",
               overflow: "hidden",
               borderRadius: "8px",
               margin: "auto",
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
               cursor: "pointer",
             }}
           >
               <video controls className="preview-video" style={{ width: "100%", height: "200px", objectFit: "cover" }}>
                 <source src={URL.createObjectURL(video)} type={video.type} />
                 Your browser does not support the video tag.
               </video>
               </div>
             </SwiperSlide>
           )}
         </Swiper>
       ) : (
         <p>No media uploaded.</p>
       )}
<div className="row">

        <p style={{
      color: "#4F4B7E",
      fontWeight: 'bold',
      fontSize: "26px"
    }}>
      <FaRupeeSign size={26} /> {formData.price ? Number(formData.price).toLocaleString('en-IN') : 'N/A'}
  
      <span style={{ fontSize: '14px', color: "#30747F", marginLeft: "10px" }}>
         Negotiation: {formData.negotiation || "N/A"}
      </span>
    </p>
    {priceInWords && (
          <p style={{ fontSize: "14px", color: "#2F747F", marginTop: "5px" }}>
            {priceInWords}
          </p>
        )}
{propertyDetailsList.map((detail, index) => {
// Check if it's a heading, which should always be full-width (col-12)
if (detail.heading) {
  return (
    <div key={index} className="col-12">
      <h4
        className="mb-3 fw-bold"
        style={{ color: "#000000", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
      >
        {detail.label}
      </h4>
    </div>
  );
}

const isDescription = detail.label === "Description";

// const isDescription = typeof detail.value === "string" && detail.value.trim() === formData.description.trim();
// const columnClass = isDescription ? "col-12" : "col-6";
const columnClass = isDescription ? "col-12" : "col-6";

return (
  <div key={index} className={columnClass}>
    <div
      className="d-flex align-items-center border rounded p-3 mb-1"
      style={{
        backgroundColor: "#F9F9F9", // Background for the item
        width: "100%",
        height: isDescription ? "auto" : "100px",
        wordBreak: "break-word",
        // height: detail.label === "Description" || detail.value === formData.description ? "auto" : "100px", // Full height for description
      }}
    >
      <span className="me-3 fs-3" style={{ color: "#30747F" }}>
        {detail.icon} 
      </span>
      <div>
      {!isDescription && <h6 className="mb-1">{detail.label || "N/A"}</h6>}  {/* ✅ Hide label for description */}

      {/* <h6 className="mb-1">{isDescription ? "Description" : detail.label || "N/A"}</h6> */}
        <p
          className="mb-0 p-0"
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "100%", // Ensure the value takes full width
          }}
        >
          {detail.value || "N/A"} 
        </p>
      </div>
    </div>
  </div>
);
})}
</div>


      </div>
      <button
        type="button"
        style={{ background: "#2F747F", color: "#fff" }}
        onClick={handleEdit}
      >
        Edit
      </button>
      {/* <button
        type="button"
        style={{ border: "1px solid #2F747F",background:"none" , color: "#2F747F" , marginLeft: '10px', fontWeight:"bold"}}
        onClick={handleSubmit}
      >
        Submit Property
      </button>  */}
      <button className="mx-2"
        type="submit"
        style={{
          border:"none",
          backgroundColor: 'rgb(17, 76, 165)',
          transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
        }}
        onClick={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          // e.target.style.transform = 'scale(0.9)';
          e.target.style.backgroundColor = 'rgb(68, 103, 168)'; // Lighter shade
          setTimeout(() => {
            // e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = '#57C8BD'; // Original background
          }, 200);
          handleSubmit(e); // Pass event to handleSubmit
        }}
      >
        Submit Property
      </button>
      
      </div>
     
      )
    }

    </div>
    </div>

  );
}

export default AddProperties;
