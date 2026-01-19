import React, { useEffect, useState } from "react";
import { api } from "../api";

function ManageTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [refrigerated, setRefrigerated] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchTrucks = async () => {
    try {
      const response = await api.get("/trucks/");
      const data = Array.isArray(response.data) ? response.data : [];
      setTrucks(data);
    } catch (error) {
      console.error("Failed to fetch trucks:", error);
      alert("Failed to fetch trucks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const addTruck = async () => {
    if (!plate || !capacity) return;

    try {
      const payload = {
        plate,
        capacity_kg: parseInt(capacity, 10),
        refrigerated,
      };

      const response = await api.post("/trucks/", payload);
      setTrucks((prev) => [...prev, response.data]);
      setPlate("");
      setCapacity("");
      setRefrigerated(true);
    } catch (error) {
      console.error("Failed to add truck:", error);
      alert("Failed to add truck");
    }
  };

  const deleteTruck = async (id) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;

    try {
      await api.delete(`/trucks/${id}/`);
      setTrucks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete truck:", error);
      alert("Failed to delete truck");
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h2>Manage Trucks</h2>

      <div style={formStyle}>
        <input type="text" placeholder="Plate Number" value={plate} onChange={(e) => setPlate(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Capacity (KG)" value={capacity} onChange={(e) => setCapacity(e.target.value)} style={inputStyle} />
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="checkbox" checked={refrigerated} onChange={(e) => setRefrigerated(e.target.checked)} />
          Refrigerated
        </label>
        <button onClick={addTruck} style={buttonStyle}>Add Truck</button>
      </div>

      <h3>Fleet</h3>
      {loading ? (
        <p>Loading trucks...</p>
      ) : trucks.length === 0 ? (
        <p>No trucks added yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {trucks.map((t) => (
            <li key={t.id} style={{ backgroundColor: "white", padding: "1rem", marginBottom: "0.5rem", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{t.plate} - {t.capacity_kg} KGs - {t.refrigerated ? "Refrigerated" : "Non-refrigerated"} - {t.status}</span>
              <button onClick={() => deleteTruck(t.id)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageTrucks;