import React from "react";

const DashboardComponent = ({ roleRequests, onApprove, onReject }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Requested Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roleRequests.length === 0 ? (
          <tr>
            <td colSpan="5">No pending requests</td>
          </tr>
        ) : (
          roleRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.requested_role}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "pending" && (
                  <>
                    <button onClick={() => onApprove(request.id)}>Approve</button>
                    <button onClick={() => onReject(request.id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DashboardComponent;
