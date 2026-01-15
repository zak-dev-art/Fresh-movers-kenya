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
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    textDecoration: "none",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
    display: "block",
    marginBottom: "1rem"
  };

  return (
    <div style={{ backgroundColor: "#34495e", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {loading ? (
          <p style={{ color: "white", textAlign: "center" }}>Loading dashboard...</p>
        ) : (
          <>
            <Link to="/create-request" style={cardStyle}>
              <h3>Order Truck</h3>
              <p>Book a cargo truck for your goods</p>
            </Link>

            <Link to="/view-requests" style={cardStyle}>
              <h3>View Requests</h3>
              <p>Total: {stats.totalRequests}, Pending: {stats.pendingRequests}</p>
            </Link>

            <Link to="/subscription-plan" style={cardStyle}>
              <h3>Subscription Plan</h3>
              <p>Current: {stats.subscription}</p>
            </Link>

            <Link to="/notifications" style={cardStyle}>
              <h3>Notifications</h3>
              <p>Check latest alerts from couriers</p>
            </Link>

            <Link to="/packaging" style={cardStyle}>
              <h3>Packaging</h3>
              <p>Book after-sale packaging services</p>
            </Link>

            <Link to="/manage-trucks" style={cardStyle}>
              <h3>Manage Trucks</h3>
              <p>Total Trucks: {stats.trucks}</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;