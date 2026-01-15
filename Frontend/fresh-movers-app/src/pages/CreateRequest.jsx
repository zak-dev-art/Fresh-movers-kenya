import React, { useState } from "react";
import { api } from "../api";

const couriers = [
  { name: "QuickMove", available: true },
  { name: "Swift Logistics", available: true },
  { name: "FreshLink Transport", available: false },
  { name: "Kenya Express", available: true },
  { name: "Farm2Market Couriers", available: true },
];

function CreateRequest() {
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const [weight, setWeight] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const handleCourierSelect = (courier) => {
    setSelectedCourier(courier);
    setSubmittedOrder(null);
  };

  const handlePriceEstimate = () => {
    const price = weight ? weight * 50 : 0;
    setEstimatedPrice(price);
  };

  const handleSubmitOrder = async () => {
    if (!pickup || !dropoff || !goodsType || !weight) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      customer_id: 1,
      goods: goodsType,
      weight_kg: parseFloat(weight),
      pickup_location: pickup,
      dropoff_location: dropoff,
      status: "pending",
    };

    try {
      await api.post("/requests/", payload);
      setSubmittedOrder({
        courier: selectedCourier.name,
        pickup: payload.pickup_location,
        dropoff: payload.dropoff_location,
        goods: payload.goods,
        weight: payload.weight_kg,
        price: payload.weight_kg * 50,
        status: payload.status,
      });
      setPickup("");
      setDropoff("");
      setGoodsType("");
      setWeight("");
      setEstimatedPrice(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit order.");
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: !selectedCourier ? "#000" : "#f9f9f9",
    color: !selectedCourier ? "white" : "#000",
    minHeight: !selectedCourier ? "100vh" : "auto",
    borderRadius: selectedCourier ? "10px" : "0",
  };

  const serviceCardStyle = {
    padding: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "#0056b3",
    marginBottom: "1rem",
    color: "white",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "0.7rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h2>Create a Delivery Request</h2>

      {!selectedCourier ? (
        <>
          <p>Select a courier service:</p>
          <div>
            {couriers.filter((c) => c.available).map((c, idx) => (
              <div key={idx} style={serviceCardStyle} onClick={() => handleCourierSelect(c)}>
                {c.name}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={formStyle}>
          <label>Pickup Location</label>
          <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} style={inputStyle} />

          <label>Dropoff Location</label>
          <input type="text" value={dropoff} onChange={(e) => setDropoff(e.target.value)} style={inputStyle} />

          <label>Goods Type</label>
          <input type="text" value={goodsType} onChange={(e) => setGoodsType(e.target.value)} style={inputStyle} />

          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={inputStyle} />

          <button type="button" onClick={handlePriceEstimate} style={buttonStyle}>
            Estimate Price
          </button>

          {estimatedPrice !== null && (
            <p>Estimated Price: KES {estimatedPrice.toLocaleString()}</p>
          )}

          <button type="button" onClick={handleSubmitOrder} style={buttonStyle}>
            Submit Order
          </button>

          <button type="button" onClick={() => setSelectedCourier(null)} style={buttonStyle}>
            Back
          </button>

          {submittedOrder && (
            <div style={{ backgroundColor: "white", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
              <h3>Order Submitted!</h3>
              <p><strong>Courier:</strong> {submittedOrder.courier}</p>
              <p><strong>Pickup:</strong> {submittedOrder.pickup}</p>
              <p><strong>Dropoff:</strong> {submittedOrder.dropoff}</p>
              <p><strong>Goods:</strong> {submittedOrder.goods}</p>
              <p><strong>Weight:</strong> {submittedOrder.weight} KGs</p>
              <p><strong>Estimated Price:</strong> KES {submittedOrder.price.toLocaleString()}</p>
              <p><strong>Status:</strong> {submittedOrder.status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateRequest;
