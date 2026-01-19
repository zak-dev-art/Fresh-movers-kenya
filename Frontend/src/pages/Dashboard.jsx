import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Dashboard() {
  const [stats, setStats] = useState({ totalRequests: 0, pendingRequests: 0, trucks: 0, subscription: "None" });
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* Mobile-First Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl">🚛</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Fresh Movers Kenya</h1>
                <p className="text-xs sm:text-sm text-gray-500">Logistics Dashboard</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">Fresh Movers</h1>
              </div>
            </div>

            {/* Mobile Menu Button & User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {userName}</p>
                <p className="text-xs text-gray-500">Logistics Manager</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                Logout
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex mt-6 space-x-1 overflow-x-auto">
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

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content - Mobile Responsive */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome Section - Mobile Responsive */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-sm sm:text-base text-gray-600">Monitor your logistics operations and manage your fleet efficiently.</p>
            </div>

            {/* Stats Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-lg sm:text-xl self-end sm:self-auto`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Link
                to="/create-request"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl">🚛</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Order New Truck</h3>
                    <p className="text-blue-100 text-xs sm:text-sm">Book cargo transportation</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/view-requests"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl">📋</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">View Requests</h3>
                    <p className="text-green-100 text-xs sm:text-sm">Check order status</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/manage-trucks"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl">🔧</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Manage Fleet</h3>
                    <p className="text-purple-100 text-xs sm:text-sm">Add or remove trucks</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Recent Activity - Mobile Responsive */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">New delivery request submitted</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🚛</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Truck KCA 123A assigned to route</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-sm">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Packaging service completed</p>
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