import React, { useState } from "react";
import { api } from "../api";
import Layout from "../components/Layout";

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

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Delivery Request</h1>

          {!selectedCourier ? (
            <div>
              <p className="text-gray-600 mb-6">Select a courier service:</p>
              <div className="grid gap-4">
                {couriers.filter((c) => c.available).map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCourierSelect(c)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{c.name}</span>
                      <span className="text-blue-600">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">Selected Courier: <strong>{selectedCourier.name}</strong></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter pickup location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dropoff Location</label>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter dropoff location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goods Type</label>
                  <input
                    type="text"
                    value={goodsType}
                    onChange={(e) => setGoodsType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Electronics, Food"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter weight in kg"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handlePriceEstimate}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Estimate Price
                </button>

                <button
                  onClick={handleSubmitOrder}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Order
                </button>

                <button
                  onClick={() => setSelectedCourier(null)}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              </div>

              {estimatedPrice !== null && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    Estimated Price: KES {estimatedPrice.toLocaleString()}
                  </p>
                </div>
              )}

              {submittedOrder && (
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Order Submitted Successfully!</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Courier:</strong> {submittedOrder.courier}</div>
                    <div><strong>Status:</strong> {submittedOrder.status}</div>
                    <div><strong>Pickup:</strong> {submittedOrder.pickup}</div>
                    <div><strong>Dropoff:</strong> {submittedOrder.dropoff}</div>
                    <div><strong>Goods:</strong> {submittedOrder.goods}</div>
                    <div><strong>Weight:</strong> {submittedOrder.weight} KGs</div>
                    <div className="col-span-2"><strong>Price:</strong> KES {submittedOrder.price.toLocaleString()}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CreateRequest;