import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

function Dashboard() {
  const [stats, setStats] = useState({ totalRequests: 0, pendingRequests: 0, trucks: 0, subscription: "None" });
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || 1;

  const fetchStats = async () => {
    try {
      const [requestsRes, trucksRes, subscriptionRes] = await Promise.all([
        api.get(`/requests/?user_id=${userId}`),
        api.get("/trucks/"),
        api.get(`/subscriptions/?user_id=${userId}`),
      ]);

      const requests = requestsRes.data;
      const pendingRequests = requests.filter((r) => r.status === "pending").length;
      const subscriptionPlan = subscriptionRes.data?.map((s) => s.plan)?.[0] || "None";

      setStats({
        totalRequests: requests.length,
        pendingRequests,
        trucks: trucksRes.data.trucks?.length || trucksRes.data.length,
        subscription: subscriptionPlan,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "2rem",
    borderRadius: "15px",
    textAlign: "center",
    textDecoration: "none",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    display: "block",
    marginBottom: "1.5rem",
    border: "2px solid transparent",
    position: "relative",
    overflow: "hidden"
  };

  const cardHoverStyle = {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    borderColor: "#3498db"
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.8rem",
    color: "#2c3e50"
  };

  const descriptionStyle = {
    fontSize: "1rem",
    color: "#7f8c8d",
    lineHeight: "1.4"
  };

  const containerStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    padding: "3rem 2rem"
  };

  const gridStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem"
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {loading ? (
          <p style={{ color: "white", textAlign: "center", fontSize: "1.2rem" }}>Loading dashboard...</p>
        ) : (
          <>
            <Link 
              to="/create-request" 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚛</div>
              <h3 style={titleStyle}>Order Truck</h3>
              <p style={descriptionStyle}>Book a cargo truck for your goods</p>
            </Link>

            <Link 
              to="/view-requests" 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
              <h3 style={titleStyle}>View Requests</h3>
              <p style={descriptionStyle}>Total: {stats.totalRequests}, Pending: {stats.pendingRequests}</p>
            </Link>

            <Link 
              to="/subscription-plan" 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💎</div>
              <h3 style={titleStyle}>Subscription Plan</h3>
              <p style={descriptionStyle}>Current: {stats.subscription}</p>
            </Link>

            <Link 
              to="/notifications" 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔔</div>
              <h3 style={titleStyle}>Notifications</h3>
              <p style={descriptionStyle}>Check latest alerts from couriers</p>
            </Link>

            <Link 
              to="/packaging" 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
              <h3 style={titleStyle}>Packaging</h3>
              <p style={descriptionStyle}>Book after-sale packaging services</p>
            </Link>

            <Link 
              to="/manage-trucks" 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔧</div>
              <h3 style={titleStyle}>Manage Trucks</h3>
              <p style={descriptionStyle}>Total Trucks: {stats.trucks}</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;