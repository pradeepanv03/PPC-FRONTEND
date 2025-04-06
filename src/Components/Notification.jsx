
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../Assets/Sale Property-01.png";

const READ_NOTIFICATIONS_KEY = "readNotifications";

// Utility: Get and Save to localStorage
const getReadNotificationsFromStorage = () => {
  const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveReadNotificationToStorage = (id) => {
  const stored = getReadNotificationsFromStorage();
  if (!stored.includes(id)) {
    const updated = [...stored, id];
    localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(updated));
  }
};

const Notification = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const storedPhoneNumber =
    location.state?.phoneNumber || localStorage.getItem("phoneNumber") || "";
  const [userPhoneNumber] = useState(storedPhoneNumber);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  


  const fetchUnreadNotifications = async (phoneNumber) => {
    if (!phoneNumber) {
      setError("No phone number found.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-unread-notifications`,
        { params: { phoneNumber } }
      );
  
      const readIds = getReadNotificationsFromStorage();
      const updated = (res.data.notifications || []).map((n) => ({
        ...n,
        isRead: readIds.includes(n._id),
      }));
  
      setNotifications(updated);
    } catch (err) {
      console.error("Error fetching unread notifications:", err);
      setError("Error fetching unread notifications.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (userPhoneNumber) {
      if (showUnreadOnly) {
        fetchUnreadNotifications(userPhoneNumber);
      }
    }
  }, [userPhoneNumber, showUnreadOnly]);
  



  const fetchAllNotifications = async (phoneNumber) => {
    if (!phoneNumber) {
      setError("No phone number found.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const [res1, res2] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/notifications/${phoneNumber}`),
        axios.get(`${process.env.REACT_APP_API_URL}/get-user-notifications`, {
          params: { phoneNumber },
        }),
      ]);

      const allNotifications = [
        ...(res1.data.notifications || []),
        ...(res2.data.notifications || []),
      ];

      allNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const readIds = getReadNotificationsFromStorage();
      const updatedNotifications = allNotifications.map((n) => ({
        ...n,
        isRead: n.isRead || readIds.includes(n._id),
      }));

      setNotifications(updatedNotifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Error fetching notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userPhoneNumber) {
      fetchAllNotifications(userPhoneNumber);
    }
  }, [userPhoneNumber]);

  const handlePageNavigation = () => {
    navigate("/mobileviews");
  };

  const handleSingleNotificationClick = async (notificationId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/mark-single-notification-read/${notificationId}`
      );

      saveReadNotificationToStorage(notificationId);

      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this notification?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/delete-notification/${notificationId}`
      );

      setNotifications((prev) =>
        prev.filter((n) => n._id !== notificationId)
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
      alert("Failed to delete notification. Please try again.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">
      <div className="d-flex flex-column align-items-center justify-content-center m-0" 
        style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-start w-100"
        style={{ background: "#EFEFEF" }}
      >
        <button className="pe-5" onClick={handlePageNavigation}>
          <FaArrowLeft color="#30747F" />
        </button>
        <h3 className="m-0 ms-3" style={{ fontSize: "20px" }}>
          Notifications
        </h3>
      </div>
      <div className="row g-2 w-100">
      <div className="d-flex justify-content-between mb-3 pt-1">
  <button
    style={{
      backgroundColor: !showUnreadOnly ? '#F9FAFC' : 'transparent',
      color: 'black',
      border: !showUnreadOnly ? 'none' : '1px solid #ccc',
      boxShadow: !showUnreadOnly ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
    }}
    className="btn w-50 me-2"
    onClick={() => setShowUnreadOnly(false)}
  >
    Show All Notifications
  </button>
  <button
    style={{
      backgroundColor: showUnreadOnly ? '#F9FAFC' : 'transparent',
      color: 'black',
      border: showUnreadOnly ? 'none' : '1px solid #ccc',
      boxShadow: showUnreadOnly ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
    }}
    className="btn w-50"
    onClick={() => setShowUnreadOnly(true)}
  >
    Show Unread Only
  </button>
</div>
      {/* Phone number */}
      {userPhoneNumber ? (
        <p className="text-lg font-medium mb-4">
          Notifications for: <strong>{userPhoneNumber}</strong>
        </p>
      ) : (
        <p className="text-danger">
          No phone number found. Please log in again.
        </p>
      )}
      {error && <p className="text-danger">{error}</p>}

      {/* Notification list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {notifications.length > 0 ? (
            <div className="row">
              {notifications.map((notification) => (


<div
  key={notification._id}
  className="mb-3"
  onClick={() => handleSingleNotificationClick(notification._id)}
  style={{
    cursor: "pointer",
    borderRadius: "10px",
    position: "relative", // Make this relative to position the close button inside
  }}
>
  <div
    className={`card ${notification.isRead ? "shadow-sm border" : ""}`}
    style={{
      backgroundColor: notification.isRead ? "#F9FAFC" : "#ffffff",
      borderRadius: "10px",
      position: "relative", // Needed for positioning the delete button
    }}
  >
    <div className="card-body d-flex flex-row align-items-center">
      {/* Image */}
      <div className="me-3">
        <img
          src={logo}
          alt="Notification"
          className="rounded-circle"
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      {/* Content */}
      <div className="d-flex flex-grow-1 justify-content-between align-items-start">
        <div>
          {notification.ppcId && (
            <h6 className="mb-1 text-primary">PPC ID: {notification.ppcId}</h6>
          )}
          {notification.type && (
            <p className="mb-1 text-dark">Type: {notification.type}</p>
          )}
          <p className="mb-1 text-secondary">{notification.message}</p>
          <p className="text-muted small mb-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
          <h6 className="mb-1 text-primary">
            {notification.isRead ? "🔵 Read" : "🔴 Unread"}
          </h6>
        </div>
      </div>

      {/* X icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteNotification(notification._id);
        }}
        className="position-absolute top-0 end-0 m-2 p-1 bg-light border-0 rounded-circle shadow-sm"
        title="Delete notification"
        style={{
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          lineHeight: "1",
          color: "#555",
        }}
      >
        &times;
      </button>
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

    </div>
    </div>
  );
};
export default Notification;


