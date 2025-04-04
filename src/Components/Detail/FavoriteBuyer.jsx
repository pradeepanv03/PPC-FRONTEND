






import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdCall } from 'react-icons/md';
import profil from '../../Assets/xd_profile.png'
import {  FaCalendarAlt } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";


const FavoriteBuyer = () => {
  const { phoneNumber } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [removedFavorites, setRemovedFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("all");
  const [showFullNumber, setShowFullNumber] = useState(false);
const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  const confirmAction = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
    const storedRemovedFavorites = JSON.parse(localStorage.getItem("removedFavoriteProperties")) || [];
    setFavorites(storedFavorites);
    setRemovedFavorites(storedRemovedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("removedFavoriteProperties", JSON.stringify(removedFavorites));
  }, [removedFavorites]);

  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false);
      return;
    }
    const fetchFavoriteRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-favorite-buyer`, {
          params: { postedPhoneNumber: phoneNumber },
        });

        if (response.status === 200) {
          setFavorites(response.data.favoriteRequestsData);
          localStorage.setItem("favoriteProperties", JSON.stringify(response.data.favoriteRequestsData));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteRequests();
  }, [phoneNumber]);

  


  const handleRemoveFavorite = async (ppcId, favoriteUser) => {
    confirmAction("Are you sure you want to remove this favorite request?", async () => {

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/favorite/delete/${ppcId}/${favoriteUser}`);
      const updatedFavorites = favorites.map((property) =>
        property.ppcId === ppcId
          ? { ...property, favoritedUsersPhoneNumbers: property.favoritedUsersPhoneNumbers.filter((user) => user !== favoriteUser) }
          : property
      );
      setFavorites(updatedFavorites);
      setRemovedFavorites([...removedFavorites, { ppcId, favoriteUser }]);
    } catch (error) {
      setMessage({ text: "Error removing favorite request.", type: "error" });
    }
    setShowPopup(false);
  });
  };

  const handleUndoRemove = async (ppcId, favoriteUser) => {
    confirmAction("Do you want to restore this favorite request?", async () => {

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/favorite/undo/${ppcId}/${favoriteUser}`);
      setRemovedFavorites(removedFavorites.filter((item) => item.favoriteUser !== favoriteUser));
      setFavorites((prev) =>
        prev.map((property) =>
          property.ppcId === ppcId
            ? { ...property, favoritedUsersPhoneNumbers: [...property.favoritedUsersPhoneNumbers, favoriteUser] }
            : property
        )
      );
      setMessage({ text: "Favorite request restored successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: "Error restoring favorite request.", type: "error" });
    }
    setShowPopup(false);
  });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [message]);

  const validRemovedFavorites = removedFavorites.filter(property => property.favoriteUser);


  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
     
    <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
        <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
          <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
        </button> <h3 className="m-0 ms-3" style={{fontSize:"15px"}}>FAVORITE BUYER </h3> </div>
     {/* Tabs */}
     <div className="row g-2 w-100">
     <div className="col-6 p-0">

        <button style={{ backgroundColor: '#4F4B7E', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>All Favorites</button>
        </div>

        <div className="col-6 p-0">

        <button style={{ backgroundColor: '#FF0000', color: 'white' , width:"100%" }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>Removed Requests</button>
        </div>

        <div>
      {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Body>
          <p>{popupMessage}</p>
          <Button style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }} onClick={popupAction}>Yes</Button>
          <Button className="ms-3" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}} onClick={() => setShowPopup(false)}>No</Button>
        </Modal.Body>
      </Modal>
    </div>
    
      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "all" ? (
        favorites.length > 0 ? (
          favorites.map((property) => (
            <div key={property.ppcId} className="property-card">
              <div className="buyers-list">
                {property.favoritedUsersPhoneNumbers.length > 0 ? (
                  property.favoritedUsersPhoneNumbers.map((user, index) => (
                    // <div key={index} className="buyer-card">
                    //   📞 {user}
                    //   <button onClick={() => handleRemoveFavorite(property.ppcId, user)}>❌ Remove</button>
                    // </div>
                    <div
                    key={index}
                    className="card p-2 w-100 w-md-50 w-lg-33"
                    style={{
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
                      <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
                      <div className="col-7 p-0 ms-4">
                        <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"13px"}}>FAVORITE BUYER</div>
                        <div className="d-flex">
                          <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
                          PUC- {property.ppcId}
                          </p>
                        </div>    
              
                        <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
                          {property.propertyType || "N/A"} |{property.city || "N/A"}
                        </h5>
                     
                      </div>
                    </div>
              
                    <div className="p-1">
              
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
                  {showFullNumber[index]
                    ? user
                    : user?.slice(0, 5) + "*****"}
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
                      {!showFullNumber && (
                  <button className='w-100 m-0 p-1'
                  onClick={() => setShowFullNumber(true)}
                  style={{
                      background: "#2F747F", 
                      color: "white", 
                      border: "none", 
                     
                      marginLeft: "10px", 
                      cursor: "pointer",
                      borderRadius: "5px"
                    }}>
                    View
                  </button>
                )}
                  {showFullNumber
                    ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
                   <button
                            className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                            style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
              
                         >
                            Call
                          </button>   
                          <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                            style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
                            onClick={() => handleRemoveFavorite(property.ppcId, user)}> Remove</button>
                    </div>
                    : ''}
                   
                    </div>
                  </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )
      ) : (
        // removedFavorites.length > 0 ? (
        //   removedFavorites.map((property, index) => (
          validRemovedFavorites.length > 0 ? (
            validRemovedFavorites.map((property, index) => (
            <>
         
            <div
            key={property.ppcId}
            className="card p-2 w-100 w-md-50 w-lg-33"
            style={{
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
              <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
              <div className="col-7 p-0 ms-4">
                <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"14px"}}>FAVORITE BUYER</div>
                <div className="d-flex">
                  <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
                  PUC- {property.ppcId}
                  </p>
                </div>    
      
                <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
                  {property.propertyType || "N/A"} |{property.city || "N/A"}
                </h5>
             
              </div>
            </div>
      
            <div className="p-1">
      
              <div className="d-flex align-items-center mb-2">
              <div className="d-flex  flex-column align-items-start justify-content-between ps-3">
      
                <div className="d-flex align-items-center mb-4">
                  <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                      Favorite Requested Date
                    </h6>
                    <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
                      {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}

                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
                  <div>
                    <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
                       Buyer Phone
                    </h6>
                    <span className="card-text" style={{  fontWeight:"500"}}>
                    <a href={`tel:${property.favoriteUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
          {showFullNumber
            ? property.favoriteUser
            : property.favoriteUser?.slice(0, 5) + "*****"}
        </a>
                    </span>
                  </div>
                </div>
                </div>
                          </div>
              {!showFullNumber && (
          <button className='w-100 m-0 p-1'
            onClick={() => setShowFullNumber(true)}
            style={{
              background: "#2F747F", 
              color: "white", 
              border: "none", 
             
              marginLeft: "10px", 
              cursor: "pointer",
              borderRadius: "5px"
            }}>
            View
          </button>
        )}
          {showFullNumber
            ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
           <button
                    className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                    style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
      
                 >
                    Call
                  </button>   
                  <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
                    style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
                   onClick={() => handleUndoRemove(property.ppcId, property.favoriteUser)}> ↩ Undo</button>

            </div>
            : ''}
           
            </div>
          </div>
          </>
          ))
        ) : (
          <p>No removed requests.</p>
        )
      )}
      </div>

</div>

    </div>
  );
};

export default FavoriteBuyer;
















// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { MdCall } from 'react-icons/md';
// import profil from '../../Assets/xd_profile.png'
// import {  FaCalendarAlt } from "react-icons/fa";
// import { Button, Modal } from "react-bootstrap";
// import { FaArrowLeft } from "react-icons/fa";


// const FavoriteBuyer = () => {
//   const { phoneNumber } = useParams();
//   const [favorites, setFavorites] = useState([]);
//   const [removedFavorites, setRemovedFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeTab, setActiveTab] = useState("all");
//   const [showFullNumber, setShowFullNumber] = useState(false);
// const [showPopup, setShowPopup] = useState(false);
//   const [popupAction, setPopupAction] = useState(null);
//   const [popupMessage, setPopupMessage] = useState("");
//   const navigate = useNavigate();

//   const handlePageNavigation = () => {
//     navigate('/mobileviews'); // Redirect to the desired path
//   };
//   const confirmAction = (message, action) => {
//     setPopupMessage(message);
//     setPopupAction(() => action);
//     setShowPopup(true);
//   };
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

//   const handleUndoRemove = async (ppcId, favoriteUserPhone) => {
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


//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
//       return () => clearTimeout(timer); // Cleanup timer
//     }
//   }, [message]);

//   return (
//     <div className="container d-flex align-items-center justify-content-center p-0">
//       <div className="d-flex flex-column align-items-center justify-content-center m-0" 
//         style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
        
//         {/* Header Section */}
//         <div className="d-flex align-items-center justify-content-start w-100" style={{ background: "#EFEFEF" }}>
//           <button className="pe-5" onClick={handlePageNavigation}>
//             <FaArrowLeft color="#30747F" /> 
//           </button>
//           <h3 className="m-0 ms-3" style={{ fontSize: "15px" }}>FAVORITE BUYER</h3> 
//         </div>
  
//         {/* Tabs */}
//         <div className="row g-2 w-100">
//           <div className="col-6 p-0">
//             <button style={{ backgroundColor: '#4F4B7E', color: 'white', width: "100%" }} 
//               onClick={() => setActiveTab("all")} 
//               className={activeTab === "all" ? "active" : ""}>
//               All Favorites
//             </button>
//           </div>
//           <div className="col-6 p-0">
//             <button style={{ backgroundColor: '#FF0000', color: 'white', width: "100%" }} 
//               onClick={() => setActiveTab("removed")} 
//               className={activeTab === "removed" ? "active" : ""}>
//               Removed Requests
//             </button>
//           </div>
//         </div>
  
//         {/* Messages */}
//         <div>
//           {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
//           <Modal show={showPopup} onHide={() => setShowPopup(false)}>
//             <Modal.Body>
//               <p>{popupMessage}</p>
//               <Button style={{ background: "#2F747F", width: "80px", fontSize: "13px", border: "none" }} 
//                 onClick={popupAction}>
//                 Yes
//               </Button>
//               <Button className="ms-3" style={{ background: "#FF0000", width: "80px", fontSize: "13px", border: "none" }} 
//                 onClick={() => setShowPopup(false)}>
//                 No
//               </Button>
//             </Modal.Body>
//           </Modal>
//         </div>
  
//         {/* Data Handling */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : activeTab === "all" ? (
//           favorites.length > 0 ? (
//             favorites.map((property, index) => (
//               <div key={index} className="buyer-card">
//                 <p>📞 {property.favoriteUserPhone}</p>
//                 {property.ppcId}
//                 <button onClick={() => handleRemoveFavorite(property.ppcId, property.favoriteUserPhone)}>❌ Remove</button>
//               </div>
//             ))
//           ) : (
//             <p>No properties found.</p>
//           )
//         ) : removedFavorites.length > 0 ? (
//           removedFavorites.map((property, index) => (
//             <div key={property.ppcId} className="card p-2 w-100 w-md-50 w-lg-33"
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 marginBottom: "15px",
//                 fontFamily: "Inter, sans-serif",
//               }}>
//               <div className="row d-flex align-items-center">
//                 <div className="col-3 d-flex align-items-center justify-content-center mb-1">
//                   <img src={profil} alt="Placeholder" className="rounded-circle mt-2" 
//                     style={{ width: "80px", height: "80px", objectFit: "cover" }} />
//                 </div>
//                 <div className='p-0' style={{ background: "#707070", width: "2px", height: "80px" }}></div>
//                 <div className="col-7 p-0 ms-4">
//                   <div className='text-center rounded-1 w-100 mb-1' 
//                     style={{ border: "2px solid #30747F", color: "#30747F", fontSize: "14px" }}>
//                     FAVORITE BUYER
//                   </div>
//                   <div className="d-flex">
//                     <p className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "12px" }}>
//                       PUC- {property.ppcId}
//                     </p>
//                   </div>    
//                   <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500", fontSize: "16px" }}>
//                     {property.propertyType || "N/A"} | {property.city || "N/A"}
//                   </h5>
//                 </div>
//               </div>
  
//               <div className="p-1">
//                 <div className="d-flex align-items-center mb-2">
//                   <div className="d-flex flex-column align-items-start justify-content-between ps-3">
//                     <div className="d-flex align-items-center mb-4">
//                       <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                       <div>
//                         <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
//                           Favorite Requested Date
//                         </h6>
//                         <span className="card-text" style={{ color: "#1D1D1D", fontWeight: "500" }}>
//                           {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="d-flex align-items-center mb-1">
//                       <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
//                       <div>
//                         <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
//                           Buyer Phone
//                         </h6>
//                         <span className="card-text" style={{ fontWeight: "500" }}>
//                           <a href={`tel:${property.favoriteUserPhone}`} 
//                             style={{ textDecoration: "none", color: "#1D1D1D" }}>
//                             {showFullNumber ? property.favoriteUser : property.favoriteUserPhone?.slice(0, 5) + "*****"}
//                           </a>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
  
//                 {/* View and Action Buttons */}
//                 {!showFullNumber && (
//                   <button className='w-100 m-0 p-1'
//                     onClick={() => setShowFullNumber(true)}
//                     style={{
//                       background: "#2F747F", 
//                       color: "white", 
//                       border: "none", 
//                       marginLeft: "10px", 
//                       cursor: "pointer",
//                       borderRadius: "5px"
//                     }}>
//                     View
//                   </button>
//                 )}
//                 {showFullNumber && (
//                   <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
//                     <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                       style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}>
//                       Call
//                     </button>   
//                     <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
//                       style={{ background: "#2F747F", width: "80px", fontSize: "13px" }}
//                       onClick={() => handleUndoRemove(property.ppcId, property.favoriteUserPhone)}>
//                       ↩️ Undo
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No removed requests.</p>
//         )}
//       </div>
//     </div>
//   );

// };

// export default FavoriteBuyer;

  

// //   return (
// //     <div className="container d-flex align-items-center justify-content-center p-0">
     
// //     <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
// //         <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
// //           <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
// //         </button> <h3 className="m-0 ms-3" style={{fontSize:"15px"}}>FAVORITE BUYER </h3> </div>
// //      {/* Tabs */}
// //      <div className="row g-2 w-100">
// //      <div className="col-6 p-0">

// //         <button style={{ backgroundColor: '#4F4B7E', color: 'white' , width:"100%" }} onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>All Favorites</button>
// //         </div>

// //         <div className="col-6 p-0">

// //         <button style={{ backgroundColor: '#FF0000', color: 'white' , width:"100%" }} onClick={() => setActiveTab("removed")} className={activeTab === "removed" ? "active" : ""}>Removed Requests</button>
// //         </div>

// //         <div>
// //       {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
// //       <Modal show={showPopup} onHide={() => setShowPopup(false)}>
// //         <Modal.Body>
// //           <p>{popupMessage}</p>
// //           <Button style={{ background:  "#2F747F", width: "80px", fontSize: "13px", border:"none" }} onClick={popupAction}>Yes</Button>
// //           <Button className="ms-3" style={{ background:  "#FF0000", width: "80px", fontSize: "13px" , border:"none"}} onClick={() => setShowPopup(false)}>No</Button>
// //         </Modal.Body>
// //       </Modal>
// //     </div>
    
// //       {loading ? (

// // <p>Loading...</p>
// // ) : activeTab === "all" ? (
// //   favorites.length > 0 ? (
// //     favorites.map((property, index) => (
// //       <div key={index} className="buyer-card">
// //         <p>📞 {property.favoriteUserPhone}</p>
// //         {property.ppcId}
// //         <button onClick={() => handleRemoveFavorite(property.ppcId, property.favoriteUserPhone)}>❌ Remove</button>
// //       </div>
// //     ))
 
// //                     <div
// //                     key={index}
// //                     className="card p-2 w-100 w-md-50 w-lg-33"
// //                     style={{
// //                       border: "1px solid #ddd",
// //                       borderRadius: "10px",
// //                       overflow: "hidden",
// //                       marginBottom: "15px",
// //                       fontFamily: "Inter, sans-serif",
// //                     }}
// //                   >
// //                     <div className="row d-flex align-items-center">
// //                       <div className="col-3 d-flex align-items-center justify-content-center mb-1">
// //                         <img
// //                           src={profil}
// //                           alt="Placeholder"
// //                           className="rounded-circle mt-2"
// //                           style={{ width: "80px", height: "80px", objectFit: "cover" }}
// //                         />
              
// //                       </div>
// //                       <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
// //                       <div className="col-7 p-0 ms-4">
// //                         <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"13px"}}>FAVORITE BUYER</div>
// //                         <div className="d-flex">
// //                           <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
// //                           PUC- {property.ppcId}
// //                           </p>
// //                         </div>    
              
// //                         <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
// //                           {property.propertyType || "N/A"} |{property.city || "N/A"}
// //                         </h5>
                     
// //                       </div>
// //                     </div>
              
// //                     <div className="p-1">
              
// //                       <div className="d-flex align-items-center mb-2">
// //                       <div className="d-flex  flex-row align-items-start justify-content-between ps-3">
              
                       
// //                         <div className="d-flex align-items-center ">
// //                           <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
// //                           <div>
// //                             <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
// //                                Buyer Phone
// //                             </h6>
// //                             <span className="card-text" style={{  fontWeight:"500"}}>
// //                             <a href={`tel:${user}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
// //                   {showFullNumber[index]
// //                     ? user
// //                     : user?.slice(0, 5) + "*****"}
// //                 </a>
// //                             </span>
// //                           </div>
// //                         </div>
// //                         <div className="d-flex align-items-center ms-3">
// //                           <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
// //                           <div>
// //                             <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
// //                             Favorite Requested Date                            </h6>
// //                             <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
// //                             {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
// //                             </span>
// //                           </div>
// //                         </div>
// //                         </div>
// //                                   </div>
// //                       {!showFullNumber && (
// //                   <button className='w-100 m-0 p-1'
// //                   onClick={() => setShowFullNumber(true)}
// //                   style={{
// //                       background: "#2F747F", 
// //                       color: "white", 
// //                       border: "none", 
                     
// //                       marginLeft: "10px", 
// //                       cursor: "pointer",
// //                       borderRadius: "5px"
// //                     }}>
// //                     View
// //                   </button>
// //                 )}
// //                   {showFullNumber
// //                     ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
// //                    <button
// //                             className="btn text-white px-3 py-1 flex-grow-1 mx-1"
// //                             style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
              
// //                          >
// //                             Call
// //                           </button>   
// //                           <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
// //                             style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}
// //                             onClick={() => handleRemoveFavorite(property.ppcId, property.favoriteUserPhone)}> Remove</button>
// //                     </div>
// //                     : ''}
                   
// //                     </div>
// //                   </div>
// //                   ))
// //                 ) : (
// //                   <p></p>
// //                 )}
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No properties found.</p>
// //         )
// //       ) : (
// //       ) : removedFavorites.length > 0 ? (
// //         removedFavorites.map((item, index) => (
// //             <>
           
// //             <div
// //             key={property.ppcId}
// //             className="card p-2 w-100 w-md-50 w-lg-33"
// //             style={{
// //               border: "1px solid #ddd",
// //               borderRadius: "10px",
// //               overflow: "hidden",
// //               marginBottom: "15px",
// //               fontFamily: "Inter, sans-serif",
// //             }}
// //           >
// //             <div className="row d-flex align-items-center">
// //               <div className="col-3 d-flex align-items-center justify-content-center mb-1">
// //                 <img
// //                   src={profil}
// //                   alt="Placeholder"
// //                   className="rounded-circle mt-2"
// //                   style={{ width: "80px", height: "80px", objectFit: "cover" }}
// //                 />
      
// //               </div>
// //               <div className='p-0' style={{background:"#707070", width:"2px", height:"80px"}}></div>
// //               <div className="col-7 p-0 ms-4">
// //                 <div className='text-center rounded-1 w-100 mb-1' style={{border:"2px solid #30747F", color:"#30747F", fontSize:"14px"}}>FAVORITE BUYER</div>
// //                 <div className="d-flex">
// //                   <p className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"12px" }}>
// //                   PUC- {property.ppcId}
// //                   </p>
// //                 </div>    
      
// //                 <h5 className="mb-1" style={{ color: "#474747", fontWeight: "500",fontSize:"16px" }}>
// //                   {property.propertyType || "N/A"} |{property.city || "N/A"}
// //                 </h5>
             
// //               </div>
// //             </div>
      
// //             <div className="p-1">
      
// //               <div className="d-flex align-items-center mb-2">
// //               <div className="d-flex  flex-column align-items-start justify-content-between ps-3">
      
// //                 <div className="d-flex align-items-center mb-4">
// //                   <FaCalendarAlt color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
// //                   <div>
// //                     <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
// //                       Favorite Requested Date
// //                     </h6>
// //                     <span className="card-text" style={{ color: "#1D1D1D", fontWeight:"500"}}>
// //                       {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}

// //                     </span>
// //                   </div>
// //                 </div>
// //                 <div className="d-flex align-items-center mb-1">
// //                   <MdCall color="#30747F" style={{ fontSize: "20px", marginRight: "8px" }} />
// //                   <div>
// //                     <h6 className="m-0 text-muted" style={{ fontSize: "11px" }}>
// //                        Buyer Phone
// //                     </h6>
// //                     <span className="card-text" style={{  fontWeight:"500"}}>
// //                     <a href={`tel:${property.favoriteUser}`} style={{ textDecoration: "none", color: "#1D1D1D" }}>
// //           {showFullNumber
// //             ? property.favoriteUser
// //             : property.favoriteUser?.slice(0, 5) + "*****"}
// //         </a>
// //                     </span>
// //                   </div>
// //                 </div>
// //                 </div>
// //                           </div>
// //               {!showFullNumber && (
// //           <button className='w-100 m-0 p-1'
// //             onClick={() => setShowFullNumber(true)}
// //             style={{
// //               background: "#2F747F", 
// //               color: "white", 
// //               border: "none", 
             
// //               marginLeft: "10px", 
// //               cursor: "pointer",
// //               borderRadius: "5px"
// //             }}>
// //             View
// //           </button>
// //         )}
// //           {showFullNumber
// //             ?  <div className="d-flex justify-content-between align-items-center ps-2 pe-2 mt-1">
// //            <button
// //                     className="btn text-white px-3 py-1 flex-grow-1 mx-1"
// //                     style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
      
// //                  >
// //                     Call
// //                   </button>   
// //                   <button className="btn text-white px-3 py-1 flex-grow-1 mx-1"
// //                     style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}
// //                    onClick={() => handleUndoRemove(property.ppcId, property.favoriteUser)}>↩️ Undo</button>

// //             </div>
// //             : ''}
           
// //             </div>
// //           </div>
// //           </>
// //           ))
// //         ) : (
// //           <p>No removed requests.</p>
// //         )
// //       )}
// //       </div>

// // </div>

// //     </div>
// //   );
// // };

// // export default FavoriteBuyer;



















