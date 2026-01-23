import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateRequest from "./pages/CreateRequest";
import ViewRequests from "./pages/ViewRequests";
import ManageTrucks from "./pages/ManageTrucks";
import SubscriptionPlan from "./pages/SubscriptionPlan";
import Notification from "./pages/Notification";
import Package from "./pages/Packaging";
import ProtectedRoute from "./components/ProtectedRoute";
import { RequestProvider } from "./context/RequestContext";

function App() {
  return (
    <RequestProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['customer', 'driver', 'logistics_manager']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-request" element={
            <ProtectedRoute allowedRoles={['customer', 'logistics_manager']}>
              <CreateRequest />
            </ProtectedRoute>
          } />
          <Route path="/view-requests" element={
            <ProtectedRoute allowedRoles={['customer', 'driver', 'logistics_manager']}>
              <ViewRequests />
            </ProtectedRoute>
          } />
          <Route path="/manage-trucks" element={
            <ProtectedRoute allowedRoles={['driver', 'logistics_manager']}>
              <ManageTrucks />
            </ProtectedRoute>
          } />
          <Route path="/subscription-plan" element={
            <ProtectedRoute allowedRoles={['customer', 'logistics_manager']}>
              <SubscriptionPlan />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute allowedRoles={['customer', 'driver', 'logistics_manager']}>
              <Notification />
            </ProtectedRoute>
          } />
          <Route path="/packaging" element={
            <ProtectedRoute allowedRoles={['customer', 'logistics_manager']}>
              <Package />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </RequestProvider>
  );
}

export default App;