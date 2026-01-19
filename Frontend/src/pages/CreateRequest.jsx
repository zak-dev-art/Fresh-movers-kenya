import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Create Delivery Request</h1>

          {!selectedCourier ? (
            <div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">Select a courier service:</p>
              <div className="grid gap-3 sm:gap-4">
                {couriers.filter((c) => c.available).map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCourierSelect(c)}
                    className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left w-full"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{c.name}</span>
                      <span className="text-blue-600 text-lg sm:text-xl">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <p className="text-blue-800 text-sm sm:text-base">Selected Courier: <strong>{selectedCourier.name}</strong></p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Enter pickup location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dropoff Location</label>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Enter dropoff location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goods Type</label>
                  <input
                    type="text"
                    value={goodsType}
                    onChange={(e) => setGoodsType(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="e.g., Electronics, Food"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Enter weight in kg"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handlePriceEstimate}
                  className="w-full sm:w-auto bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  Estimate Price
                </button>

                <button
                  onClick={handleSubmitOrder}
                  className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Submit Order
                </button>

                <button
                  onClick={() => setSelectedCourier(null)}
                  className="w-full sm:w-auto border border-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Back
                </button>
              </div>

              {estimatedPrice !== null && (
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-green-800 font-semibold text-sm sm:text-base">
                    Estimated Price: KES {estimatedPrice.toLocaleString()}
                  </p>
                </div>
              )}

              {submittedOrder && (
                <div className="bg-green-50 border border-green-200 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Order Submitted Successfully!</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div><strong>Courier:</strong> {submittedOrder.courier}</div>
                    <div><strong>Status:</strong> {submittedOrder.status}</div>
                    <div><strong>Pickup:</strong> {submittedOrder.pickup}</div>
                    <div><strong>Dropoff:</strong> {submittedOrder.dropoff}</div>
                    <div><strong>Goods:</strong> {submittedOrder.goods}</div>
                    <div><strong>Weight:</strong> {submittedOrder.weight} KGs</div>
                    <div className="sm:col-span-2"><strong>Price:</strong> KES {submittedOrder.price.toLocaleString()}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;