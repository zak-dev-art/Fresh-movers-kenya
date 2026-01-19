import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Dashboard() {
  const [stats, setStats] = useState({ totalRequests: 0, pendingRequests: 0, trucks: 0, subscription: "None" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || 1;
  const userName = localStorage.getItem("userName") || "User";

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠", active: true },
    { name: "Order Truck", path: "/create-request", icon: "🚛" },
    { name: "View Requests", path: "/view-requests", icon: "📋" },
    { name: "Manage Trucks", path: "/manage-trucks", icon: "🔧" },
    { name: "Subscription", path: "/subscription-plan", icon: "💎" },
    { name: "Notifications", path: "/notifications", icon: "🔔" },
    { name: "Packaging", path: "/packaging", icon: "📦" },
  ];

  const quickStats = [
    { title: "Total Requests", value: stats.totalRequests, icon: "📊", color: "bg-blue-500" },
    { title: "Pending", value: stats.pendingRequests, icon: "⏳", color: "bg-yellow-500" },
    { title: "Active Trucks", value: stats.trucks, icon: "🚛", color: "bg-green-500" },
    { title: "Subscription", value: stats.subscription, icon: "💎", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚛</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fresh Movers Kenya</h1>
                <p className="text-sm text-gray-500">Logistics Dashboard</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {userName}</p>
                <p className="text-xs text-gray-500">Logistics Manager</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  item.active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Monitor your logistics operations and manage your fleet efficiently.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/create-request"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🚛</div>
                  <div>
                    <h3 className="text-lg font-semibold">Order New Truck</h3>
                    <p className="text-blue-100 text-sm">Book cargo transportation</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/view-requests"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📋</div>
                  <div>
                    <h3 className="text-lg font-semibold">View Requests</h3>
                    <p className="text-green-100 text-sm">Check order status</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/manage-trucks"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🔧</div>
                  <div>
                    <h3 className="text-lg font-semibold">Manage Fleet</h3>
                    <p className="text-purple-100 text-sm">Add or remove trucks</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New delivery request submitted</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🚛</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Truck KCA 123A assigned to route</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Packaging service completed</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;