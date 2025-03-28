import React, { useEffect, useState } from "react";
import { fetchRoleRequests, approveRoleRequest, rejectRoleRequest } from "../../services/apiService"
import DashboardComponent from "../../components/DashboardComponent";

const AccessControl = () => {
  const [roleRequests, setRoleRequests] = useState([]);

  useEffect(() => {
    loadRoleRequests();
  }, []);

  const loadRoleRequests = async () => {
    try {
      const data = await fetchRoleRequests();
      setRoleRequests(data);
    } catch (error) {
      console.error("Error fetching role requests:", error);
    }
  };

  const handleApprove = async (id) => {
    await approveRoleRequest(id);
    loadRoleRequests();
  };

  const handleReject = async (id) => {
    await rejectRoleRequest(id);
    loadRoleRequests();
  };

  return (
    <div>
      <h2>Role Requests</h2>
      <DashboardComponent roleRequests={roleRequests} onApprove={handleApprove} onReject={handleReject} />
    </div>
  );
};

export default AccessControl;
