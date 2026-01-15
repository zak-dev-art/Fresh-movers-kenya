import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || 1;

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/requests/?user_id=${userId}`);
      const data = Array.isArray(res.data) ? res.data : res.data.requests || [];
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  };

  const thStyle = {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px",
    textAlign: "left"
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd"
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem", padding: "8px 16px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        ← Go Back
      </button>

      <h2>Your Truck Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Goods</th>
              <th style={thStyle}>Quantity (KG)</th>
              <th style={thStyle}>Estimated Price (KES)</th>
              <th style={thStyle}>Pickup</th>
              <th style={thStyle}>Dropoff</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td style={tdStyle}>{req.id}</td>
                <td style={tdStyle}>{req.goods}</td>
                <td style={tdStyle}>{req.weight_kg}</td>
                <td style={tdStyle}>{req.estimated_price?.toLocaleString() || 0}</td>
                <td style={tdStyle}>{req.pickup_location}</td>
                <td style={tdStyle}>{req.dropoff_location}</td>
                <td style={tdStyle}>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewRequests;