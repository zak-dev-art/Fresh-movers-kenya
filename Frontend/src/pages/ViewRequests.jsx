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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-2 sm:mb-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>←</span>
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Truck Requests</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage and track all your delivery requests</p>
        </div>
        <button
          onClick={() => navigate("/create-request")}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
        >
          + New Request
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
          <p className="text-red-800 text-sm sm:text-base">{error}</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-6xl mb-4">📋</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">You haven't made any delivery requests yet.</p>
          <button
            onClick={() => navigate("/create-request")}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Create Your First Request
          </button>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">#{req.id}</h3>
                    <p className="text-sm text-gray-600">{req.goods}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{req.weight_kg} KG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">KES {req.estimated_price?.toLocaleString() || 0}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-gray-600 text-xs mb-1">Pickup:</div>
                    <div className="text-sm truncate">{req.pickup_location}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs mb-1">Dropoff:</div>
                    <div className="text-sm truncate">{req.dropoff_location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">Goods</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">Weight (KG)</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">Price (KES)</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">Dropoff</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{req.id}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-900">{req.goods}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-900">{req.weight_kg}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-900">
                        {req.estimated_price?.toLocaleString() || 0}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-900 max-w-xs truncate">{req.pickup_location}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-900 max-w-xs truncate">{req.dropoff_location}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewRequests;