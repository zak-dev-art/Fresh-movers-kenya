import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

function ManageTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [refrigerated, setRefrigerated] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    if (!plate || !capacity) {
      alert("Please fill in all fields");
      return;
    }

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
      alert("Truck added successfully!");
    } catch (error) {
      console.error("Failed to add truck:", error);
      alert("Failed to add truck. Please try again.");
    }
  };

  const deleteTruck = async (id) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;

    try {
      await api.delete(`/trucks/${id}/`);
      setTrucks((prev) => prev.filter((t) => t.id !== id));
      alert("Truck deleted successfully!");
    } catch (error) {
      console.error("Failed to delete truck:", error);
      alert("Failed to delete truck. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 sm:mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <span>←</span>
        <span className="text-sm sm:text-base">Back to Dashboard</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Manage Trucks</h1>

          {/* Add Truck Form */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Truck</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number</label>
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., KCA 123A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (KG)</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5000"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    checked={refrigerated}
                    onChange={(e) => setRefrigerated(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Refrigerated</span>
                </label>
              </div>
            </div>
            <button
              onClick={addTruck}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Truck
            </button>
          </div>

          {/* Trucks List */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Fleet</h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading trucks...</span>
              </div>
            ) : trucks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🚛</div>
                <p className="text-gray-600">No trucks added yet. Add your first truck above!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {trucks.map((truck) => (
                  <div key={truck.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{truck.plate}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <span>📦 {truck.capacity_kg.toLocaleString()} KG</span>
                          <span>{truck.refrigerated ? "❄️ Refrigerated" : "🌡️ Non-refrigerated"}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            truck.status === "available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {truck.status || "Available"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTruck(truck.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTrucks;