import React, { useState } from "react";
import { api } from "../api";

function Package() {
  const [form, setForm] = useState({
    itemType: "",
    weight: "",
    packagingType: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        item_type: form.itemType,
        weight_kg: parseFloat(form.weight),
        packaging_type: form.packagingType,
        notes: form.notes,
      };

      await api.post("/packaging/", payload);
      alert("Packaging request submitted successfully!");
      setForm({ itemType: "", weight: "", packagingType: "", notes: "" });
    } catch (error) {
      console.error("Failed to submit packaging request:", error.response || error);
      alert("Failed to submit packaging request. Check console for details and make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const wrapperStyle = {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#ffffffcc",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer"
  };

  return (
    <div style={wrapperStyle}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", textAlign: "center", color: "#333" }}>After-Sale Service: Packaging</h1>
      <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#555" }}>Secure and high-quality packaging options for your goods.</p>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={{ fontWeight: "bold", marginBottom: "5px", color: "#333" }}>Type of Item</label>
        <input type="text" name="itemType" value={form.itemType} onChange={handleChange} placeholder="e.g. Apples, Strawberries" required style={inputStyle} />

        <label style={{ fontWeight: "bold", marginBottom: "5px", color: "#333" }}>Weight (KG)</label>
        <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 20" step="0.01" required style={inputStyle} />

        <label style={{ fontWeight: "bold", marginBottom: "5px", color: "#333" }}>Preferred Packaging Type</label>
        <select name="packagingType" value={form.packagingType} onChange={handleChange} required style={inputStyle}>
          <option value="">Select packaging</option>
          <option value="insulated-box">Insulated Box</option>
          <option value="shock-proof">Shock-Proof Cushioning</option>
          <option value="eco-friendly">Eco-Friendly Packaging</option>
        </select>

        <label style={{ fontWeight: "bold", marginBottom: "5px", color: "#333" }}>Additional Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special instructions..." style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}></textarea>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Submitting..." : "Submit Packaging Request"}
        </button>
      </form>
    </div>
  );
}

export default Package;