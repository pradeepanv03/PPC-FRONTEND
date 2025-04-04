



import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Assets/Sale Property-01.png" 
import { FaArrowLeft } from "react-icons/fa";
const Notification = () => {
  const location = useLocation();
  
  // Retrieve phone number from location state or localStorage
  const storedPhoneNumber = location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  
  const [userPhoneNumber, setUserPhoneNumber] = useState(storedPhoneNumber);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch notifications by userPhoneNumber
  const fetchNotifications = async (phoneNumber) => {
    if (!phoneNumber) {
      setError("No phone number found.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notifications/${phoneNumber}`);
      setNotifications(response.data.notifications);
    } catch (err) {
      setError("Error fetching notifications. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications on mount if phone number is available
  useEffect(() => {
    if (userPhoneNumber) {
      fetchNotifications(userPhoneNumber);
    }
  }, [userPhoneNumber]);
  const navigate = useNavigate();

  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
    <div className="d-flex flex-column mx-auto custom-scrollbar"
    style={{
      maxWidth: '450px',
      height: '100vh',
      overflow: 'auto',
      scrollbarWidth: 'none', /* For Firefox */
      msOverflowStyle: 'none', /* For Internet Explorer */
      fontFamily: 'Inter, sans-serif'
    }}>
         <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
                    <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
                  </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Notifications</h3> </div>
      {/* Display userPhoneNumber if available */}
      {userPhoneNumber ? (
        <p className="text-lg font-medium mb-4">Fetching notifications for: <strong>{userPhoneNumber}</strong></p>
      ) : (
        <p className="text-red-500">No phone number found. Please log in again.</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Notification Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <table className="w-full border-collapse border border-gray-200 shadow-md">
        //   <thead>
        //     <tr className="bg-gray-100">
        //       <th className="border p-2">Message</th>
        //       <th className="border p-2">Type</th>
        //       <th className="border p-2">Date</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {notifications.length > 0 ? (
        //       notifications.map((notification) => (
        //         <tr key={notification._id} className="border">
        //           <td className="p-2 border">{notification.message}</td>
        //           <td className="p-2 border">{notification.type}</td>
        //           <td className="p-2 border">{new Date(notification.createdAt).toLocaleString()}</td>
        //         </tr>
        //       ))
        //     ) : (
        //       <tr>
        //         <td colSpan="3" className="p-4 text-center">No notifications found.</td>
        //       </tr>
        //     )}
        //   </tbody>
        // </table>
<div className="container">
  {notifications.length > 0 ? (
    <div className="row">
      {notifications.map((notification) => (
        <div key={notification._id}>
          <div className="card shadow-sm border">
            <div className="card-body d-flex align-items-center">
              {/* Left Side - Circular Image */}
              <div className="me-3">
                <img
                  src={logo}
                  alt="Notification"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              {/* Right Side - Notification Content */}
              <div>
                <h6 className="mb-1 text-primary">{notification.type}</h6>
                <p className="mb-1" style={{ color: 'grey' }}>{notification.message}</p>
                <p className="text-muted small mb-0">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center p-4 border shadow-sm">
      <p className="mb-0">No notifications found.</p>
    </div>
  )}
</div>

      )}
    </div>
  );
};

export default Notification;
