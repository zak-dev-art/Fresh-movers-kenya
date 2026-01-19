import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications/");
      const data = Array.isArray(response.data) ? response.data : response.data.notifications || [];
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      alert("Failed to load notifications. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const containerStyle = {
    width: "350px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    margin: "2rem auto"
  };

  const notificationItemStyle = {
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderLeft: "4px solid #3498db"
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem", padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#3498db", color: "#fff", cursor: "pointer" }}>
        ← Go Back
      </button>

      <h2 style={{ marginBottom: "15px", fontSize: "1.5rem", color: "#2c3e50" }}>Notifications</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : !Array.isArray(notifications) || notifications.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777", fontSize: "0.9rem" }}>No new notifications</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {notifications.map((note, index) => (
            <li key={index} style={notificationItemStyle}>
              <p style={{ margin: 0, fontSize: "1rem", color: "#2c3e50" }}>{note.message}</p>
              <span style={{ fontSize: "0.8rem", color: "#999" }}>{note.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;