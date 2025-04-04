import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imge from "../Assets/website-construction-line-style.png"


const Building = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-grow-1 overflow-auto px-3 py-2"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
    <div
      className="d-flex flex-column bg-white shadow overflow-hidden"
      style={{ width: "450px", height: "100vh" }}
    >
      {/* Top Half: Image */}
      <div className="flex-grow-1">
        <img
          src={imge}
          alt="Placeholder"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* Bottom Half: Content */}
      <div
        className="flex-grow-1 overflow-auto px-3 py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <h1 style={{color:'#1E1A4F', fontSize:'50px'}}>Cooming Soon! !</h1>
        <p style={{color:'#1E1A4F', fontSize:'20px'}}>
         Page is Under Construction
        </p>
        <p style={{color:'#1E1A4F', fontSize:'20px'}}>
         Go back to more info
        </p>
      </div>
    </div>
  </div>
  );
};

export default Building;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaShare } from 'react-icons/fa6';

// const ShareProperty = () => {
//   const [shareData, setShareData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const { ppcId, phoneNumber } = location.state || {};

//   const handleShare = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Fetching property data from the backend
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/share/${ppcId}`);
//       setShareData(response.data);  // Set the shared property details in the state
//     } catch (err) {
//       setError('Failed to fetch property details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSocialMediaShare = async (platform) => {
//     const shareMessage = {
//       ppcId: shareData.ppcId,
//       price: shareData.price,
//       propertyMode: shareData.propertyMode,
//       propertyType: shareData.propertyType,
//       city: shareData.city
//     };

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/share-property`, {
//         platform,
//         shareMessage,
//         phoneNumber
//       });

//       // Handle the response from the backend (e.g., a success message or error)
//       if (response.status === 200) {
//         alert('Property shared successfully!');
//       } else {
//         alert('Failed to share property');
//       }
//     } catch (error) {
//       console.error('Error sharing property:', error);
//       alert('Error sharing property!');
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleShare} style={buttonStyle}><FaShare /></button>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {shareData && (
//         <div>
//           <h3>Shared Property Details:</h3>
//           <p><strong>PPC ID:</strong> {shareData.ppcId}</p>
//           <p><strong>Price:</strong> {shareData.price}</p>
//           <p><strong>Property Mode:</strong> {shareData.propertyMode}</p>
//           <p><strong>Property Type:</strong> {shareData.propertyType}</p>
//           <p><strong>City:</strong> {shareData.city}</p>

//           <div>
//             <button onClick={() => handleSocialMediaShare('whatsapp')} style={buttonStyle}>Share on WhatsApp</button>
//             <button onClick={() => handleSocialMediaShare('facebook')} style={buttonStyle}>Share on Facebook</button>
//             <button onClick={() => handleSocialMediaShare('twitter')} style={buttonStyle}>Share on Twitter</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
//   backgroundColor: "#4CAF50",
//   color: "white",
//   border: "none",
//   padding: "10px 15px",
//   margin: "5px",
//   cursor: "pointer",
//   borderRadius: "5px",
//   fontSize: "14px",
// };

// export default ShareProperty;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaShare } from 'react-icons/fa6';

// const ShareProperty = () => {
//   const [shareData, setShareData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const { ppcId, phoneNumber } = location.state || {};

//   const handleShare = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Ensure ppcId is valid
//       if (!ppcId) {
//         setError('Invalid PPC ID');
//         setLoading(false);
//         return;
//       }

//       // Fetching property data from the backend
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/share/${ppcId}`);
//       setShareData(response.data);  // Set the shared property details in the state
//     } catch (err) {
//       setError('Failed to fetch property details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSocialMediaShare = async (platform) => {
//     if (!shareData) {
//       setError('Property data is not available yet');
//       return;
//     }

//     const shareMessage = {
//       ppcId: shareData.ppcId,
//       price: shareData.price,
//       propertyMode: shareData.propertyMode,
//       propertyType: shareData.propertyType,
//       city: shareData.city
//     };

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/share-property`, {
//         platform,
//         shareMessage,
//         phoneNumber
//       });

//       // Handle the response from the backend
//       if (response.status === 200) {
//         alert('Property shared successfully!');
//       } else {
//         alert('Failed to share property');
//       }
//     } catch (error) {
//       console.error('Error sharing property:', error);
//       alert('Error sharing property!');
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleShare} style={buttonStyle}><FaShare /> Share Property</button>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {shareData && (
//         <div>
//           <h3>Shared Property Details:</h3>
//           <p><strong>PPC ID:</strong> {shareData.ppcId}</p>
//           <p><strong>Price:</strong> {shareData.price}</p>
//           <p><strong>Property Mode:</strong> {shareData.propertyMode}</p>
//           <p><strong>Property Type:</strong> {shareData.propertyType}</p>
//           <p><strong>City:</strong> {shareData.city}</p>

//           <div>
//             <button onClick={() => handleSocialMediaShare('whatsapp')} style={buttonStyle}>Share on WhatsApp</button>
//             <button onClick={() => handleSocialMediaShare('facebook')} style={buttonStyle}>Share on Facebook</button>
//             <button onClick={() => handleSocialMediaShare('twitter')} style={buttonStyle}>Share on Twitter</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
//   backgroundColor: "#4CAF50",
//   color: "white",
//   border: "none",
//   padding: "10px 15px",
//   margin: "5px",
//   cursor: "pointer",
//   borderRadius: "5px",
//   fontSize: "14px",
// };

// export default ShareProperty;
