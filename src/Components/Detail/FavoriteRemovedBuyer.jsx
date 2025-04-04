


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdCalendarMonth, MdOutlineBed, MdOutlineMapsHomeWork, MdOutlineTimer, MdFamilyRestroom, MdOutlineCall, MdCall } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { LuIndianRupee, LuBriefcaseBusiness } from 'react-icons/lu';
import { RiStairsLine } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiSittingDog } from 'react-icons/gi';
import { GrMapLocation } from 'react-icons/gr';
import profil from '../../Assets/xd_profile.png'
import { FaArrowLeft, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import pricemini from '../../Assets/Price Mini-01.png'
import pricemax from '../../Assets/Price maxi-01.png'

const FavoriteRemovedBuyer = () => {
  const { phoneNumber } = useParams();
  const [removedFavorites, setRemovedFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (!phoneNumber) return;

    const fetchRemovedFavoritesBuyer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
          params: { postedPhoneNumber: phoneNumber },
        });

        if (response.status === 200) {
          setRemovedFavorites(response.data.favoriteRemovedData || []);
        }
      } catch (error) {
        console.error("Failed to fetch removed favorites for buyer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemovedFavoritesBuyer();
  }, [phoneNumber]);

  
  const handleDelete = async (ppcId, favoriteUserPhone) => {
    console.log("Deleting favorite:", { ppcId, favoriteUserPhone });
  
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/favoriteRemoved/delete/${ppcId}/${favoriteUserPhone}`
      );
  
      // ✅ Update State Efficiently: Remove Buyer from Property
      setRemovedFavorites((prevFavorites) =>
        prevFavorites
          .map((property) =>
            property.ppcId === ppcId
              ? {
                  ...property,
                  removedFavoriteUserPhoneNumbers: property.removedFavoriteUserPhoneNumbers.filter(
                    (user) => user.phoneNumber !== favoriteUserPhone
                  ),
                }
              : property
          )
          .filter((property) => property.removedFavoriteUserPhoneNumbers.length > 0)
      );
  
      setMessage({ text: "Removed successfully.", type: "success" });
    } catch (error) {
      console.error("Failed to remove favorite request:", error);
      setMessage({ text: "Error removing favorite request.", type: "error" });
    }
  };
  
  const handleUndo = async (ppcId, favoriteUserPhone) => {
    console.log("Undoing removal:", { ppcId, favoriteUserPhone });
  
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
  
      // ✅ Update State Efficiently: Remove from Removed List
      setRemovedFavorites((prevFavorites) =>
        prevFavorites
          .map((property) =>
            property.ppcId === ppcId
              ? {
                  ...property,
                  removedFavoriteUserPhoneNumbers: property.removedFavoriteUserPhoneNumbers.filter(
                    (user) => user.phoneNumber !== favoriteUserPhone
                  ),
                }
              : property
          )
          .filter((property) => property.removedFavoriteUserPhoneNumbers.length > 0)
      );
  
      setMessage({ text: "Restored successfully.", type: "success" });
    } catch (error) {
      console.error("Failed to restore favorite request:", error);
      setMessage({ text: "Error restoring favorite request.", type: "error" });
    }
  };

    const navigate = useNavigate();

    const handlePageNavigation = () => {
      navigate('/mobileviews'); // Redirect to the desired path
    };
  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
    <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%',  fontFamily: "Inter, sans-serif", }}>
      <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
              <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
            </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>REMOVED FAVORITE BUYER</h3> </div>
      
    <div className="row g-2 w-100 mb-4">
    <div className="col-6 p-0">
          <button
            style={{ backgroundColor: "#4F4B7E", color: "white", width: "100%" }}
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "active" : ""}
          >
            All Properties
          </button>
        </div>
        <div className="col-6 p-0">
          <button
            style={{ backgroundColor: "#FF0000", color: "white", width: "100%" }}
            onClick={() => setActiveTab("removed")}
            className={activeTab === "removed" ? "active" : ""}
          >
            Removed Properties
          </button>
        </div>      
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      
      {loading ? (
        <p>Loading...</p>
      ) : removedFavorites.length > 0 ? (
        removedFavorites.map((property) => (
          <div key={property.ppcId} className="property-card">
            <div className="buyers-list">
              {property.removedFavoriteUserPhoneNumbers.length > 0 ? (
                property.removedFavoriteUserPhoneNumbers.map((user, index) => (
                 
                  <div
                  key={index}
              className="card w-100"
              style={{
                maxWidth: "100%",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <div className="row d-flex align-items-center">
                <div className="col-md-3 col-4 d-flex flex-column align-items-center justify-content-center mb-1">
                  <img
                    src={profil}
                    alt="Placeholder"
                    className="rounded-circle img-fluid"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  {/* <span className="p-1 rounded-1 mt-1" style={{background:"#30747F", color:"#fff", fontSize:"11px"}}>BA ID: 1563</span> */}
                </div>
                <div className="p-0" style={{ background: "#707070", width: "2px", height: "80px" }}></div>
                <div className="col-md-7 col-6 p-0 ms-4">
                  <div className="text-center rounded-1 w-100 mb-1" style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "14px" }}>
                    REMOVED FAVORITE BUYER
                  </div>
                  <div className="d-flex">
                    <p className="mb-1 ps-2 px-2 rounded-1" style={{ color: "#30747F", fontWeight: "500", fontSize: "12px" ,border:"1px solid #30747F" }}>
                      PP ID: {property.ppcId}
                    </p>
                  </div>
                  <h5 className="mb-1" style={{ color: "#5E5E5E", fontWeight: "500", fontSize: "16px" }}>
                    {property.propertyType || "N/A"} 
                  </h5>
                  <h5 className="mb-1" style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>
                    {property.propertyMode || "N/A"} 
                  </h5>
                </div>
              </div>
      
          
        <div className="d-flex align-items-center mb-2">
                            <div className="d-flex  flex-row align-items-start justify-content-between ps-3">
                    
                             
                              <div className="d-flex align-items-center ">
                                <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                                <div>
                                  <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                                     Buyer Phone
                                  </h6>
                                  <span className="card-text" style={{  fontWeight:"500"}}>
                                  <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
                                  {activeIndex === index ? user.phoneNumber : user.phoneNumber.slice(0, -5) + "*****"}
                      </a>
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex align-items-center ms-3">
                                <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                                <div>
                                  <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                                  Favorite Requested Date                            </h6>
                                  <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                                  {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                                  </span>
                                </div>
                              </div>
                              </div>
                                        </div>
          <button className='w-100 m-0 p-1'
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            // onClick={() => setActiveIndex(activeIndex === `${property.ppcId}-${index}` ? null : `${property.ppcId}-${index}`)}

            style={{
              background: "#2F747F", 
              color: "white", 
              border: "none", 
             
              marginLeft: "10px", 
              cursor: "pointer",
              borderRadius: "5px"
            }}>
                    {activeIndex === index ? "HIDE BUYER NUMBER" : "VIEW BUYER NUMBER"}
                    </button>
        {activeIndex === index && (
      
        <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
         {activeTab === "all" ? (
                      <button
                      className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                      style={{ background: "#FF0000", color: "white", cursor: "pointer",  fontSize: "13px"}}
                      onClick={() => handleDelete(property.ppcId, user.phoneNumber)}
                      >
                        Delete
                      </button>
                     ) : ( 
                      <button
                      className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                      style={{ background: "green", color: "white", cursor: "pointer" ,  fontSize: "13px"}}
                      onClick={() => handleUndo(property.ppcId, user.phoneNumber)}
                      >
                        Undo 
                      </button>
                     )} 
                    <button
                    className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                    style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
                 >
                    Call
                  </button> 
                    </div>
                  )}
      
            </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No removed favorite requests found.</p>
      )}
                </div>

          </div>

    </div>
  );
};

export default FavoriteRemovedBuyer;


 // <div key={index} className="buyer-card removed">
                  //   <p>ppcId {property.ppcId} </p>
                  //   📞 {user.phoneNumber} <span>🗓️ Removed At: {new Date(user.removedAt).toDateString()}</span>
                  //   <button className="undo-btn" onClick={() => handleUndo(property.ppcId, user.phoneNumber)}>
                  //     Undo
                  //   </button>
                  //   <button className="delete-btn" onClick={() => handleDelete(property.ppcId, user.phoneNumber)}>
                  //     Delete
                  //   </button>
                  // </div>

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const FavoriteRemovedBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [removedFavorites, setRemovedFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   useEffect(() => {
//     if (!phoneNumber) return;

//     const fetchRemovedFavoritesBuyer = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//           params: { postedPhoneNumber: phoneNumber },
//         });

//         if (response.status === 200) {
//           setRemovedFavorites(response.data.favoriteRemovedData || []);
//         }
//       } catch (error) {
//         console.error("Failed to fetch removed favorites for buyer:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRemovedFavoritesBuyer();
//   }, [phoneNumber]);

  
//   const handleDelete = async (ppcId, favoriteUserPhone) => {
//     console.log("Deleting favorite:", { ppcId, favoriteUserPhone });
  
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_URL}/favoriteRemoved/delete/${ppcId}/${favoriteUserPhone}`
//       );
  
//       // ✅ Update State Efficiently: Remove Buyer from Property
//       setRemovedFavorites((prevFavorites) =>
//         prevFavorites
//           .map((property) =>
//             property.ppcId === ppcId
//               ? {
//                   ...property,
//                   removedFavoriteUserPhoneNumbers: property.removedFavoriteUserPhoneNumbers.filter(
//                     (user) => user.phoneNumber !== favoriteUserPhone
//                   ),
//                 }
//               : property
//           )
//           .filter((property) => property.removedFavoriteUserPhoneNumbers.length > 0)
//       );
  
//       setMessage({ text: "Removed successfully.", type: "success" });
//     } catch (error) {
//       console.error("Failed to remove favorite request:", error);
//       setMessage({ text: "Error removing favorite request.", type: "error" });
//     }
//   };
  
//   const handleUndo = async (ppcId, favoriteUserPhone) => {
//     console.log("Undoing removal:", { ppcId, favoriteUserPhone });
  
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
  
//       // ✅ Update State Efficiently: Remove from Removed List
//       setRemovedFavorites((prevFavorites) =>
//         prevFavorites
//           .map((property) =>
//             property.ppcId === ppcId
//               ? {
//                   ...property,
//                   removedFavoriteUserPhoneNumbers: property.removedFavoriteUserPhoneNumbers.filter(
//                     (user) => user.phoneNumber !== favoriteUserPhone
//                   ),
//                 }
//               : property
//           )
//           .filter((property) => property.removedFavoriteUserPhoneNumbers.length > 0)
//       );
  
//       setMessage({ text: "Restored successfully.", type: "success" });
//     } catch (error) {
//       console.error("Failed to restore favorite request:", error);
//       setMessage({ text: "Error restoring favorite request.", type: "error" });
//     }
//   };

  

//   return (
//     <div>
//       <h1>Removed Favorite Buyers</h1>
      
//       {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : removedFavorites.length > 0 ? (
//         removedFavorites.map((property) => (
//           <div key={property.ppcId} className="property-card">
//             {/* <h2>Property ID: {property.ppcId}</h2> */}
//             <div className="buyers-list">
//               {property.removedFavoriteUserPhoneNumbers.length > 0 ? (
//                 property.removedFavoriteUserPhoneNumbers.map((user, index) => (
//                   <div key={index} className="buyer-card removed">
//                     <p>ppcId {property.ppcId} </p>
//                     📞 {user.phoneNumber} <span>🗓️ Removed At: {new Date(user.removedAt).toDateString()}</span>
//                     <button className="undo-btn" onClick={() => handleUndo(property.ppcId, user.phoneNumber)}>
//                       Undo
//                     </button>
//                     <button className="delete-btn" onClick={() => handleDelete(property.ppcId, user.phoneNumber)}>
//                       Delete
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No removed favorite requests found.</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteRemovedBuyer;









// ***************************************************************************************


// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const FavoriteRemovedBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [removedFavorites, setRemovedFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all");
//   const [favorites, setFavorites] = useState([]);


  
//     useEffect(() => {
//       const storedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
//       const storedRemovedFavorites = JSON.parse(localStorage.getItem("removedFavoriteProperties")) || [];
//       setFavorites(storedFavorites);
//       setRemovedFavorites(storedRemovedFavorites);
//     }, []);
  
//     useEffect(() => {
//       localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
//     }, [favorites]);
  
//     useEffect(() => {
//       localStorage.setItem("removedFavoriteProperties", JSON.stringify(removedFavorites));
//     }, [removedFavorites]);
 
//   useEffect(() => {
//     if (!phoneNumber) return;

//     const fetchRemovedFavoritesBuyer = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//           params: { postedPhoneNumber: phoneNumber },
//         });

//         if (response.status === 200) {
//           setRemovedFavorites(response.data.favoriteRemovedData || []);
//         }
//       } catch (error) {
//         console.error("Failed to fetch removed favorites for buyer:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRemovedFavoritesBuyer();
//   }, [phoneNumber]);


  // const handleDelete = async (ppcId, favoriteUserPhone) => {
  //   console.log("Deleting favorite:", { ppcId, favoriteUserPhone });
  
  //   try {
  //     await axios.put(
  //       `${process.env.REACT_APP_API_URL}/favoriteRemoved/delete/${ppcId}/${favoriteUserPhone}`
  //     );
  
  //     // ✅ Update State Efficiently: Remove Buyer from Property
  //     setRemovedFavorites((prevFavorites) =>
  //       prevFavorites
  //         .map((property) =>
  //           property.ppcId === ppcId
  //             ? {
  //                 ...property,
  //                 removedFavoriteUserPhoneNumbers: property.removedFavoriteUserPhoneNumbers.filter(
  //                   (user) => user.phoneNumber !== favoriteUserPhone
  //                 ),
  //               }
  //             : property
  //         )
  //         .filter((property) => property.removedFavoriteUserPhoneNumbers.length > 0)
  //     );
  
  //     setMessage({ text: "Removed successfully.", type: "success" });
  //   } catch (error) {
  //     console.error("Failed to remove favorite request:", error);
  //     setMessage({ text: "Error removing favorite request.", type: "error" });
  //   }
  // };
  
  // const handleUndo = async (ppcId, favoriteUserPhone) => {
  //   console.log("Undoing removal:", { ppcId, favoriteUserPhone });
  
  //   try {
  //     await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
  
  //     // ✅ Update State Efficiently: Remove from Removed List
  //     setRemovedFavorites((prevFavorites) =>
  //       prevFavorites
  //         .map((property) =>
  //           property.ppcId === ppcId
  //             ? {
  //                 ...property,
  //                 removedFavoriteUserPhoneNumbers: property.removedFavoriteUserPhoneNumbers.filter(
  //                   (user) => user.phoneNumber !== favoriteUserPhone
  //                 ),
  //               }
  //             : property
  //         )
  //         .filter((property) => property.removedFavoriteUserPhoneNumbers.length > 0)
  //     );
  
  //     setMessage({ text: "Restored successfully.", type: "success" });
  //   } catch (error) {
  //     console.error("Failed to restore favorite request:", error);
  //     setMessage({ text: "Error restoring favorite request.", type: "error" });
  //   }
  // };

  

//   return (
//     <div className="container">
//       <h1>Removed Favorite Buyers</h1>

//       {/* Tabs for Switching Between All Favorites & Removed Requests */}
//       <div className="tabs">
//         <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
//           All Favorites
//         </button>
//         <button onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
//           Removed Requests
//         </button>
//       </div>

//       {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      
//       {loading ? (
//         <p>Loading...</p>
        
//       ) : removedFavorites.length > 0 ? (
//         removedFavorites.map((property) => (
//           <div key={property.ppcId} className="property-card">
//             {/* <h2>Property ID: {property.ppcId}</h2> */}
//             <div className="buyers-list">
              // {property.removedFavoriteUserPhoneNumbers.length > 0 ? (
              //   property.removedFavoriteUserPhoneNumbers.map((user, index) => (
//                   <div key={index} className="buyer-card removed">
//                     <p>📞 {user.phoneNumber}</p>
//                     <p>🗓️ Removed At: {new Date(user.removedAt).toLocaleString()}</p>
                    // <button className="undo-btn" onClick={() => handleUndo(property.ppcId, user.phoneNumber)}>
                    //   Undo
                    // </button>
                    // <button className="delete-btn" onClick={() => handleDelete(property.ppcId, user.phoneNumber)}>
                    //   Delete
                    // </button>
//                   </div>
                  
                  
//                 ))
//               ) : (
//                 <p></p>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No removed favorite requests found.</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteRemovedBuyer;








// ---------------------------------------------------




// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const FavoriteRemovedBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [removedFavorites, setRemovedFavorites] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
//     const storedRemovedFavorites = JSON.parse(localStorage.getItem("removedFavoriteProperties")) || [];
//     setFavorites(storedFavorites);
//     setRemovedFavorites(storedRemovedFavorites);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
//   }, [favorites]);

//   useEffect(() => {
//     localStorage.setItem("removedFavoriteProperties", JSON.stringify(removedFavorites));
//   }, [removedFavorites]);

//   useEffect(() => {
//     if (!phoneNumber) return;

//     const fetchRemovedFavoritesBuyer = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//           params: { postedPhoneNumber: phoneNumber },
//         });
//         if (response.status === 200) {
//           // setRemovedFavorites(response.data.favoriteRemovedData || []);
//           setRemovedFavorites(response.data.favoriteRemovedData ?? []);

//         }
//       } catch (error) {
//         console.error("Failed to fetch removed favorites for buyer:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRemovedFavoritesBuyer();
//   }, [phoneNumber]);

//   const handleRemoveFavorite = async (ppcId, favoriteUserPhone) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/delete/${ppcId}/${favoriteUserPhone}`);
//       setFavorites((prev) => prev.filter((property) => property.ppcId !== ppcId));
//       setRemovedFavorites((prev) => [...prev, { ppcId, favoriteUserPhone }]);
//       setMessage({ text: "Moved to removed tab.", type: "success" });
//     } catch (error) {
//       console.error("Failed to remove favorite:", error);
//     }
//   };

//   const handleUndo = async (ppcId, favoriteUserPhone) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
//       setRemovedFavorites((prev) => prev.filter((item) => item.ppcId !== ppcId));
//       setFavorites((prev) => [...prev, { ppcId, favoriteUserPhone }]);
//       setMessage({ text: "Restored to All Favorites.", type: "success" });
//     } catch (error) {
//       console.error("Failed to restore favorite:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Removed Favorite Buyers</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
//           All Favorites
//         </button>
//         <button onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
//           Removed Requests
//         </button>
//       </div>
//       {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : activeTab === "all" ? (
//         favorites.length > 0 ? (
//           favorites.map((property, index) => (
            
//             <div key={index} className="buyer-card">
//               📞 {property.favoriteUserPhone}
//               <button onClick={() => handleRemoveFavorite(property.ppcId, property.favoriteUserPhone)}>❌ Remove</button>
//             </div>
//           ))
//         ) : (
//           <p>No favorites found.</p>
//         )
//       ) : removedFavorites.length > 0 ? (
//         removedFavorites.map((item, index) => (
          
//           <div key={index} className="buyer-card removed">
//             📞 {item.favoriteUserPhone}
//             <button onClick={() => handleUndo(item.ppcId, item.favoriteUserPhone)}>↩️ Undo</button>
//           </div>
//         ))
//       ) : (
//         <p>No removed requests.</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteRemovedBuyer;

























// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const FavoriteRemovedBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [removedFavorites, setRemovedFavorites] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
//     const storedRemovedFavorites = JSON.parse(localStorage.getItem("removedFavoriteProperties")) || [];
//     setFavorites(storedFavorites);
//     setRemovedFavorites(storedRemovedFavorites);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
//   }, [favorites]);

//   useEffect(() => {
//     localStorage.setItem("removedFavoriteProperties", JSON.stringify(removedFavorites));
//   }, [removedFavorites]);



//   useEffect(() => {
//     if (!phoneNumber) return;
  
  
//   const fetchRemovedFavoritesBuyer = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//         params: { postedPhoneNumber: phoneNumber },
//       });
  
//       console.log("API Response:", response.data); // Debugging log
  
//       if (response.status === 200) {
//         const formattedFavorites = response.data.favoriteRemovedData.flatMap(item => 
//           item.removedFavoriteUserPhoneNumbers.map(user => ({
//             ppcId: item.ppcId,
//             favoriteUserPhone: user.phoneNumber, // Ensure correct key
//             removedAt: user.removedAt,
//           }))
//         );
  
//         setRemovedFavorites(formattedFavorites);
//       }
//     } catch (error) {
//       console.error("Failed to fetch removed favorites for buyer:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchRemovedFavoritesBuyer();
// }, [phoneNumber]);

 
  
  
//   const handleRemoveFavorite = async (ppcId, favoriteUserPhone) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/delete/${ppcId}/${favoriteUserPhone}`);
//       // setFavorites((prev) => prev.filter((property) => property.ppcId !== ppcId));
//       setFavorites((prev) => prev.filter((property) => !(property.ppcId === ppcId && property.favoriteUserPhone === favoriteUserPhone)));

//       setRemovedFavorites((prev) => [...prev, { ppcId, favoriteUserPhone }]);
//       setMessage({ text: "Moved to removed tab.", type: "success" });
//     } catch (error) {
//       console.error("Failed to remove favorite:", error);
//     }
//   };

//   // const handleUndo = async (ppcId, favoriteUserPhone) => {
//   //   try {
//   //     await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
//   //     setRemovedFavorites((prev) => prev.filter((item) => item.ppcId !== ppcId));
//   //     setFavorites((prev) => [...prev, { ppcId, favoriteUserPhone }]);
//   //     setMessage({ text: "Restored to All Favorites.", type: "success" });
//   //   } catch (error) {
//   //     console.error("Failed to restore favorite:", error);
//   //   }
//   // };


//   // const handleUndo = async (ppcId, favoriteUserPhone) => {
//   //   try {
//   //     await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
  
//   //     // setRemovedFavorites((prev) => {
//   //     //   const updatedRemovedFavorites = prev.filter((item) => item.ppcId !== ppcId);
//   //     //   localStorage.setItem("removedFavoriteProperties", JSON.stringify(updatedRemovedFavorites)); // Persist update
//   //     //   return updatedRemovedFavorites;
//   //     // });

//   //     setRemovedFavorites((prev) => {
//   //       const updatedRemovedFavorites = [...prev, { ppcId, favoriteUserPhone }];
//   //       localStorage.setItem("removedFavoriteProperties", JSON.stringify(updatedRemovedFavorites));
//   //       return updatedRemovedFavorites;
//   //     });
      
  
//   //     setFavorites((prev) => {
//   //       const updatedFavorites = [...prev, { ppcId, favoriteUserPhone }];
//   //       localStorage.setItem("favoriteProperties", JSON.stringify(updatedFavorites)); // Persist update
//   //       return updatedFavorites;
//   //     });
  
//   //     setMessage({ text: "Restored to All Favorites.", type: "success" });
//   //   } catch (error) {
//   //     console.error("Failed to restore favorite:", error);
//   //   }
//   // };



  
  

//   const handleUndo = async (ppcId, favoriteUserPhone) => {
//     console.log("Undoing favorite for:", { ppcId, favoriteUserPhone }); // Debugging log
  
//     if (!favoriteUserPhone) {
//       console.error("Error: favoriteUserPhone is undefined!");
//       return;
//     }
  
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);
  
//       setRemovedFavorites((prev) => {
//         const updatedRemovedFavorites = prev.filter((item) => !(item.ppcId === ppcId && item.favoriteUserPhone === favoriteUserPhone));
//         localStorage.setItem("removedFavoriteProperties", JSON.stringify(updatedRemovedFavorites));
//         return updatedRemovedFavorites;
//       });
  
//       setFavorites((prev) => {
//         const updatedFavorites = [...prev, { ppcId, favoriteUserPhone }];
//         localStorage.setItem("favoriteProperties", JSON.stringify(updatedFavorites));
//         return updatedFavorites;
//       });
  
//       setMessage({ text: "Restored to All Favorites.", type: "success" });
//     } catch (error) {
//       console.error("Failed to restore favorite:", error);
//     }
//   };
  

//   return (
//     <div className="container">
//       <h1>Removed Favorite Buyers</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
//           All Favorites
//         </button>
//         <button onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
//           Removed Requests
//         </button>
//       </div>
//       {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : activeTab === "all" ? (
//         favorites.length > 0 ? (
//           favorites.map((property, index) => (
            
//             <div key={index} className="buyer-card">
//               <p>📞 {property.favoriteUserPhone}</p>
//               {property.ppcId}
//               <button onClick={() => handleRemoveFavorite(property.ppcId, property.favoriteUserPhone)}>❌ Remove</button>
//             </div>
//           ))
//         ) : (
//           <p>No favorites found.</p>
//         )
//       ) : removedFavorites.length > 0 ? (
//         removedFavorites.map((item, index) => (
          
//           <div key={index} className="buyer-card removed">
//            <p> 📞 {item.favoriteUserPhone}</p>
//             {item.ppcId}
//             <button onClick={() => handleUndo(item.ppcId, item.favoriteUserPhone)}>↩️ Undo</button>
//           </div>
//         ))
//       ) : (
//         <p>No removed requests.</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteRemovedBuyer;






// -----**///////////////////


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const FavoriteRemovedBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [removedFavorites, setRemovedFavorites] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
//     const storedRemovedFavorites = JSON.parse(localStorage.getItem("removedFavoriteProperties")) || [];
//     setFavorites(storedFavorites);
//     setRemovedFavorites(storedRemovedFavorites);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
//   }, [favorites]);

//   useEffect(() => {
//     localStorage.setItem("removedFavoriteProperties", JSON.stringify(removedFavorites));
//   }, [removedFavorites]);

//   useEffect(() => {
//     if (!phoneNumber) return;

//     const fetchRemovedFavoritesBuyer = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//           params: { postedPhoneNumber: phoneNumber },
//         });

//         if (response.status === 200) {
//           const formattedFavorites = response.data.favoriteRemovedData.flatMap(item =>
//             item.removedFavoriteUserPhoneNumbers.map(user => ({
//               ppcId: item.ppcId,
//               favoriteUserPhone: user.phoneNumber,
//               removedAt: user.removedAt,
//             }))
//           );

//           setRemovedFavorites(formattedFavorites);
//         }
//       } catch (error) {
//         console.error("Failed to fetch removed favorites for buyer:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRemovedFavoritesBuyer();
//   }, [phoneNumber]);

//   const handleRemoveFavorite = async (ppcId, favoriteUserPhone) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/delete/${ppcId}/${favoriteUserPhone}`);

//       // Move from favorites to removedFavorites
//       setFavorites(prev => prev.filter(property => !(property.ppcId === ppcId && property.favoriteUserPhone === favoriteUserPhone)));

//       setRemovedFavorites(prev => [...prev, { ppcId, favoriteUserPhone }]);
//       setMessage({ text: "Moved to removed tab.", type: "success" });
//     } catch (error) {
//       console.error("Failed to remove favorite:", error);
//     }
//   };

//   const handleUndo = async (ppcId, favoriteUserPhone) => {
//     console.log("Undoing favorite for:", { ppcId, favoriteUserPhone });

//     if (!favoriteUserPhone) {
//       console.error("Error: favoriteUserPhone is undefined!");
//       return;
//     }

//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/favoriteRemoved/undo/${ppcId}/${favoriteUserPhone}`);

//       // Move from removedFavorites back to favorites
//       setRemovedFavorites(prev => prev.filter(item => !(item.ppcId === ppcId && item.favoriteUserPhone === favoriteUserPhone)));

//       setFavorites(prev => [...prev, { ppcId, favoriteUserPhone }]);

//       setMessage({ text: "Restored to All Favorites.", type: "success" });
//     } catch (error) {
//       console.error("Failed to restore favorite:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Removed Favorite Buyers</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
//           All Favorites
//         </button>
//         <button onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>
//           Removed Requests
//         </button>
//       </div>
//       {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : activeTab === "all" ? (
//         favorites.length > 0 ? (
//           favorites.map((property, index) => (
//             <div key={index} className="buyer-card">
//               <p>📞 {property.favoriteUserPhone}</p>
//               {property.ppcId}
//               <button onClick={() => handleRemoveFavorite(property.ppcId, property.favoriteUserPhone)}>❌ Remove</button>
//             </div>
//           ))
//         ) : (
//           <p>No favorites found.</p>
//         )
//       ) : removedFavorites.length > 0 ? (
//         removedFavorites.map((item, index) => (
//           <div key={index} className="buyer-card removed">
//             <p> 📞 {item.favoriteUserPhone}</p>
//             {item.ppcId}
//             <button onClick={() => handleUndo(item.ppcId, item.favoriteUserPhone)}>↩️ Undo</button>
//           </div>
//         ))
//       ) : (
//         <p>No removed requests.</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteRemovedBuyer;





// *************************-------------------*********************


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const FavoriteBuyer = () => {
//     const [favorites, setFavorites] = useState([]);
//     const [removedFavorites, setRemovedFavorites] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { phoneNumber } = useParams();

//     useEffect(() => {
//         const fetchFavorites = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//                     params: { postedPhoneNumber: phoneNumber },
//                 });

//                 setFavorites(response.data.favorites || []);
//                 setRemovedFavorites(response.data.favoriteRemovedData || []);
//             } catch (error) {
//                 console.error("Error fetching favorite properties:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (phoneNumber) {
//             fetchFavorites();
//         }
//     }, [phoneNumber]);

//     return (
//         <div>
//             <h2>Favorite Properties</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : favorites.length > 0 ? (
//                 <ul>
//                     {favorites.map((property) => (
//                         <li key={property._id}>{property.title || "No Title Available"}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No favorite properties found.</p>
//             )}

//             <h2>Removed Favorite Properties</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : removedFavorites.length > 0 ? (
//                 <ul>
//                     {removedFavorites.map((property, index) => (
//                         <li key={index}>
//                             <strong>Property ID:</strong> {property.ppcId} <br />
//                             <strong>Price:</strong> {property.price} <br />
//                             <strong>Type:</strong> {property.propertyType} <br />
//                             <strong>Mode:</strong> {property.propertyMode} <br />
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No removed favorite properties.</p>
//             )}
//         </div>
//     );
// };

// export default FavoriteBuyer;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const FavoriteBuyer = () => {
//     const [favorites, setFavorites] = useState([]);
//     const [removedFavorites, setRemovedFavorites] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { phoneNumber } = useParams();

//     useEffect(() => {
//         const fetchFavorites = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/remove-favorite-buyer`, {
//                     params: { postedPhoneNumber: phoneNumber },
//                 });

//                 // Ensure favorites are prioritized
//                 const fetchedFavorites = response.data.favorites || [];
//                 const fetchedRemovedFavorites = response.data.favoriteRemovedData || [];

//                 console.log("Fetched Favorites:", fetchedFavorites);
//                 console.log("Fetched Removed Favorites:", fetchedRemovedFavorites);

//                 setFavorites(fetchedFavorites);
//                 setRemovedFavorites(fetchedRemovedFavorites);
//             } catch (error) {
//                 console.error("Error fetching favorite properties:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (phoneNumber) {
//             fetchFavorites();
//         }
//     }, [phoneNumber]);

//     return (
//         <div>
//             {/* Display Favorite Properties first */}
//             <h2>Favorite Properties</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : favorites.length > 0 ? (
//                 <ul>
//                     {favorites.map((property) => (
//                         <li key={property.ppcId}>
//                             <strong>Property ID:</strong> {property.ppcId} <br />
//                             <strong>Price:</strong> {property.price || "N/A"} <br />
//                             <strong>Type:</strong> {property.propertyType || "N/A"} <br />
//                             <strong>Mode:</strong> {property.propertyMode || "N/A"} <br />
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No favorite properties found.</p>
//             )}

//             {/* Display Removed Favorite Properties */}
//             <h2>Removed Favorite Properties</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : removedFavorites.length > 0 ? (
//                 <ul>
//                     {removedFavorites.map((property, index) => (
//                         <li key={index}>
//                             <strong>Property ID:</strong> {property.ppcId} <br />
//                             <strong>Price:</strong> {property.price || "N/A"} <br />
//                             <strong>Type:</strong> {property.propertyType || "N/A"} <br />
//                             <strong>Mode:</strong> {property.propertyMode || "N/A"} <br />
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No removed favorite properties.</p>
//             )}
//         </div>
//     );
// };

// export default FavoriteBuyer;
