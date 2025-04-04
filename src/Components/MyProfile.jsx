

// import React from 'react';
// import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaHome, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../Assets/Sale Property-01.png'
// import { useNavigate } from 'react-router-dom';


// const MyProfile = () => {
//   const { phoneNumber } = useParams();

  
//   const navigate = useNavigate();

//   const handlePageNavigation = () => {
//     navigate('/mobileviews'); // Redirect to the desired path
//   };
//   return (
//     <div
//       className="container-fluid d-flex justify-content-center"
//       style={{
//         height: '100vh',
//         overflowY: 'scroll',
//         scrollbarWidth: 'none', // For Firefox
//         msOverflowStyle: 'none', // For IE and Edge
//       }}
//     >
//       {/* Main Form Container with width 450px */}
//       <div className="card p-4" style={{ width: '450px' }}>

//           <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
//                                 <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
//                               </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}> My Profile</h3> </div>
        
                     
        // {/* Top Image Centered */}
        // <div className="text-center mb-4 mt-3">
        //   <img
        //     src={logo} // Replace with your image URL
        //     alt="Profile"
        //     className="img-fluid"
        //     style={{ maxWidth: '150px' }}
        //   />
        // </div>

//         {/* Form Section */}
//         <form>
//           {/* Name Input */}
//           <div className="form-group mb-3 ">
//           <label htmlFor="name" className="form-label"><FaUserAlt className='me-2'color="#4F4B7E"/>Name</label>
//             <div className="input-group d-flex align-items-center" style={{ width: '100%' }}>
//               {/* <div className="input-group-prepend">
//                 <span className="input-group-text d-flex align-items-center" style={{ background: 'none', border: 'none', color:"#4F4B7E" }}>
//                   <FaUserAlt />
//                 </span>
//               </div> */}
//               <input type="text" className="form-control rounded-0" placeholder="Name"   style={{
//                   border: 'none',
//                   borderBottom: '1px solid #4F4B7E',
//                 }}/>
//             </div>
//           </div>

//           {/* Email Input */}
//           <div className="form-group mb-3 ">
//           <label htmlFor="email" className="form-label"><FaEnvelope className='me-2'color="#4F4B7E"/>Email</label>
//             <div className="input-group d-flex align-items-center" style={{ width: '100%' }}>
//               {/* <div className="input-group-prepend">
//                 <span className="input-group-text d-flex align-items-center" style={{ background: 'none', border: 'none', color:"#4F4B7E" }}>
//                   <FaEnvelope />
//                 </span>
//               </div> */}
//               <input type="email" className="form-control rounded-0" placeholder="Email" style={{
//                   border: 'none',
//                   borderBottom: '1px solid #4F4B7E',
//                 }}/>
//             </div>
//           </div>

//           {/* Mobile Number Input */}
//           <div className="form-group mb-3 ">
//           <label htmlFor="mobile" className="form-label"><FaPhoneAlt className='me-2' color="#4F4B7E"/>Mobile Number</label>
//             <div className="input-group d-flex align-items-center" style={{ width: '100%' }}>
//               {/* <div className="input-group-prepend">
//                 <span className="input-group-text d-flex align-items-center" style={{ background: 'none', border: 'none', color:"#4F4B7E" }}>
//                   <FaPhoneAlt />
//                 </span>
//               </div> */}
//               <input type="tel" className="form-control rounded-0" placeholder="Mobile Number" style={{
//                   border: 'none',
//                   borderBottom: '1px solid #4F4B7E',
//                 }} />
//             </div>
//           </div>

//           {/* Address Input */}
//           <div className="form-group mb-3">
//           <label htmlFor="address" className="form-label"> <FaHome className='me-2'color="#4F4B7E"/>Address</label>
//             <div className="input-group d-flex align-items-center" style={{ width: '100%' }}>
//               {/* <div className="input-group-prepend">
//                 <span className="input-group-text d-flex align-items-center" style={{ background: 'none', border: 'none', color:"#4F4B7E" }}>
//                   <FaHome />
//                 </span>
//               </div> */}
//               <input type="text" className="form-control rounded-0" placeholder="Address" style={{
//                   border: 'none',
//                   borderBottom: '1px solid #4F4B7E',
//                 }}/>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="d-flex flex-column">
//             <button type="button" className="btn w-100 mb-2" style={{background:"#4F4B7E", color:"#ffffff"}}>
//               UPDATE PROFILE
//             </button>
//             <button type="button" className="btn w-100" style={{background:'#ffffff', border:'1px solid red'}}>
//                LOG OUT
//             </button>
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default MyProfile;




















import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaHome, FaArrowLeft } from "react-icons/fa";
import logo from '../Assets/Sale Property-01.png'


const MyProfile = () => {
  const { phoneNumber } = useParams(); // Get mobile number from URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", email: "", mobile: phoneNumber, address: "" });
  const [isEditing, setIsEditing] = useState(false); // Track profile existence
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Fetch Profile Data on Mount
  useEffect(() => {
    if (phoneNumber) {
      axios.get(`${process.env.REACT_APP_API_URL}/profile/mobile/${phoneNumber}`)
        .then((res) => {
          if (res.data) {
            setProfile(res.data); // Ensure correct data structure
            setIsEditing(true);
            setIsLoggedIn(true);
          }
        })
        .catch(() => console.error("Profile not found"));
    }
  }, [phoneNumber]);

  // Handle Input Change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Create Profile
  const handleSubmit = () => {
    if (!profile.name || !profile.email || !profile.address) {
      alert("Please fill all fields");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/profile-create`, profile)
      .then((res) => {
        alert("Profile created successfully!");
        setProfile(res.data);
        setIsEditing(true);
        setIsLoggedIn(true);
      })
      .catch((error) => console.error("Error creating profile:", error));
  };

  // Update Profile
  const handleUpdate = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/profile/${profile.mobile}`, {
      name: profile.name,
      email: profile.email,
      address: profile.address,
    })
      .then(() => alert("Profile updated successfully!"))
      .catch((error) => console.error("Error updating profile:", error));
  };

  // Logout Function
  const handleLogout = () => {
    alert("Logged out successfully!");
    setProfile({ name: "", email: "", mobile: phoneNumber, address: "" });
    setIsEditing(false);
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home/login page
  };

  // Generate Profile Image with First Letter of Name
  const getProfileInitial = () => {
    return profile.name?.charAt(0)?.toUpperCase() || "?";
  };

  // const getProfileInitial = (name = "") => {
  //   return name ? name.charAt(0).toUpperCase() : "?";
  // };
  

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh", overflowY: "auto", background: "#f8f9fa" }}>
      <div className="card p-4 shadow-lg rounded" style={{ width: "450px" }}>
        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-start w-100 bg-light p-2 rounded">
          <button className="btn btn-light" onClick={() => navigate("/mobileviews")}>
            <FaArrowLeft color="#30747F" size={20} />
          </button>
          <h3 className="m-0 ms-3" style={{ fontSize: "20px", color: "#30747F" }}>My Profile</h3>
        </div>

        {/* Profile Image */}
        {/* <div className="text-center my-3">
          <div className="rounded-circle d-flex align-items-center justify-content-center" 
               style={{ width: "100px", height: "100px", background: "#30747F", color: "#fff", fontSize: "40px", fontWeight: "bold" }}>
            {getProfileInitial()}
          </div>
        </div> */}
<div className="text-center my-3">
  {profile && profile.name ? (
    // 🟢 User has a profile: Show initials inside a circle
    <div
      className="rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: "100px",
        height: "100px",
        background: "#30747F",
        color: "#fff",
        fontSize: "40px",
        fontWeight: "bold",
        marginLeft:"35%"
      }}
    >
      {getProfileInitial(profile.name)}
    </div>
  ) : (
    // 🔴 New user: Show default logo image
    <img
      src={logo} // Replace with actual default image URL
      alt="Default Profile"
      className="img-fluid"
      style={{ maxWidth: "100px" }}
    />
  )}
</div>


        {/* Form */}
        <form>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label"><FaUserAlt className="me-2" color="#4F4B7E"/>Name</label>
            <input type="text" className="form-control" name="name" value={profile.name} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label"><FaEnvelope className="me-2" color="#4F4B7E"/>Email</label>
            <input type="email" className="form-control" name="email" value={profile.email} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="mobile" className="form-label"><FaPhoneAlt className="me-2" color="#4F4B7E"/>Mobile Number</label>
            <input type="tel" className="form-control" name="mobile" value={profile.mobile} readOnly />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address" className="form-label"><FaHome className="me-2" color="#4F4B7E"/>Address</label>
            <input type="text" className="form-control" name="address" value={profile.address} onChange={handleChange} required />
          </div>

          {/* Buttons */}
          <div className="d-flex flex-column">
            {isEditing ? (
              <button type="button" className="btn btn-primary w-100 mb-2" onClick={handleUpdate}>
                UPDATE PROFILE
              </button>
            ) : (
              <button type="button" className="btn btn-success w-100 mb-2" onClick={handleSubmit}>
                CREATE PROFILE
              </button>
            )}
            {isLoggedIn && (
              <button type="button" className="btn btn-danger w-100" onClick={handleLogout}>
                LOGOUT
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
