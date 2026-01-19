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
import { RequestProvider } from "./context/RequestContext";

function App() {
  return (
    <RequestProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/view-requests" element={<ViewRequests />} />
          <Route path="/manage-trucks" element={<ManageTrucks />} />
          <Route path="/subscription-plan" element={<SubscriptionPlan />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/packaging" element={<Package />} />
        </Routes>
      </Router>
    </RequestProvider>
  );
}

export default App;