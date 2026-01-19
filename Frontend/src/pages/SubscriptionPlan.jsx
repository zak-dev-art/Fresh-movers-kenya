import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function SubscriptionPlan() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic Plan",
      price: 120000,
      features: ["Access to standard deliveries", "Limited refrigerated trucks", "Basic customer support", "Track up to 5 deliveries per month", "Email notifications"],
      type: "basic",
    },
    {
      name: "Premium Plan",
      price: 150000,
      features: ["Unlimited deliveries", "Full refrigerated trucks access", "Priority support", "Track up to 50 deliveries per month", "SMS & Email notifications", "Discounts on select deliveries"],
      type: "premium",
    },
    {
      name: "Farm Fresh Plan",
      price: 200000,
      features: ["All Premium features", "Discounts on bulk orders", "Dedicated account manager", "Custom packaging options", "Extended refrigerated storage", "24/7 customer support", "Weekly analytics reports"],
      type: "farmfresh",
    },
  ];

  const handleSubscribe = async (planName, price) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first to subscribe!");
        return;
      }

      const payload = {
        user_id: parseInt(userId),
        plan: planName,
        price: price,
      };

      await api.post("/subscriptions/", payload);
      alert(`You have successfully subscribed to the ${planName}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to subscribe. Make sure you are logged in.");
    }
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    width: "250px",
    margin: "10px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem"
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#3498db", color: "#fff", cursor: "pointer" }}>
        ← Go Back
      </button>

      <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#2c3e50" }}>Subscription Plans</h2>
      <p style={{ fontSize: "1rem", color: "#555", marginBottom: "30px" }}>Select a plan that best fits your farming and delivery needs.</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {plans.map((plan, index) => (
          <div key={index} style={cardStyle}>
            <h3 style={{ marginBottom: "10px", color: "#2c3e50" }}>{plan.name}</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "15px" }}>KSh {plan.price.toLocaleString()}/month</p>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "15px", textAlign: "left" }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ marginBottom: "8px", fontSize: "0.95rem" }}>{feature}</li>
              ))}
            </ul>
            <button style={buttonStyle} onClick={() => handleSubscribe(plan.name, plan.price)}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlan;