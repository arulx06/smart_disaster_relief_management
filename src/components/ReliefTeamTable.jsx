import { useState } from "react";
import { addReliefTeams, updateReliefTeams, deleteReliefTeams } from "../services/apiService";
import "./ReliefTeamTable.css"; // Import CSS file

const ReliefTeamTable = ({ reliefTeams, refreshReliefTeams, userRole }) => {
  
  const [newReliefTeams, setNewReliefTeams] = useState({
    team_name: "" , 
    leader_name: "", 
    contact_number : "", 
    disaster_id : "",
  });

  const [editReliefTeams, setEditReliefTeams] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false); // State to show/hide modal

  const handleChange = (e) => {
    setNewReliefTeams({ ...newReliefTeams, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditReliefTeams({ ...editReliefTeams, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await addReliefTeams(newReliefTeams);
    setNewReliefTeams({ team_name: "" , leader_name: "", contact_number : "", disaster_id : "" });
    refreshReliefTeams(); // Refresh the table
    setShowAddPopup(false); // Close modal after adding
  };

  const handleUpdate = async () => {
    if (!editReliefTeams) return;
    await updateReliefTeams(editReliefTeams.team_id, editReliefTeams);
    setEditReliefTeams(null);
    refreshReliefTeams(); // Refresh the table
  };

  const handleDelete = async (id) => {
    await deleteReliefTeams(id);
    refreshReliefTeams(); // Refresh the table
  };

  // Check if the user has permission to edit
  const canEdit = ["Admin", "Relief-Team Leader", "Relief-Team Member"].includes(userRole);

  return (
    <div className="relief-table-container">
      <table className="relief-table">
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Leader Name</th>
            <th>Contact Number</th>
            <th>Disaster ID</th>
            {canEdit && (
              <th>
                Actions 
                <button className="add-btn" onClick={() => setShowAddPopup(true)} style={{ color: "#007bff" }}>
                  ➕
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {reliefTeams.length === 0 ? (
            <tr>
              <td colSpan={canEdit ? 6 : 5}>No data available</td>
            </tr>
          ) : (
            reliefTeams.map((reliefTeam) => (
              <tr key={reliefTeam.team_id}>
                <td>{reliefTeam.team_id}</td>
                <td>
                  {editReliefTeams?.team_id === reliefTeam.team_id ? (
                    <input type="text" name="team_name" value={editReliefTeams.team_name} onChange={handleEditChange} />
                  ) : (
                    reliefTeam.team_name
                  )}
                </td>
                <td>
                  {editReliefTeams?.team_id === reliefTeam.team_id ? (
                    <input type="text" name="leader_name" value={editReliefTeams.leader_name} onChange={handleEditChange} />
                  ) : (
                    reliefTeam.leader_name
                  )}
                </td>
                <td>
                  {editReliefTeams?.team_id === reliefTeam.team_id ? (
                    <input type="text" name="contact_number" value={editReliefTeams.contact_number} onChange={handleEditChange} />
                  ) : (
                    reliefTeam.contact_number
                  )}
                </td>
                <td>
                  {editReliefTeams?.team_id === reliefTeam.team_id ? (
                    <input type="text" name="disaster_id" value={editReliefTeams.disaster_id} onChange={handleEditChange} />
                  ) : (
                    reliefTeam.disaster_id
                  )}
                </td>
                {canEdit && (
                  <td>
                    {editReliefTeams?.team_id === reliefTeam.team_id ? (
                      <button onClick={handleUpdate} className="save-btn">Save</button>
                    ) : (
                      <button onClick={() => setEditReliefTeams(reliefTeam)} className="edit-btn">Edit</button>
                    )}
                    <button onClick={() => handleDelete(reliefTeam.team_id)} className="delete-btn">Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add New Relief Team Modal */}
      {showAddPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign New Relief Team</h3>
            <input type="text" name="team_name" placeholder="Team Name" value={newReliefTeams.team_name} onChange={handleChange} />
            <input type="text" name="leader_name" placeholder="Leader Name" value={newReliefTeams.leader_name} onChange={handleChange} />
            <input type="text" name="contact_number" placeholder="Contact Number" value={newReliefTeams.contact_number} onChange={handleChange} />
            <input type="text" name="disaster_id" placeholder="Disaster ID" value={newReliefTeams.disaster_id} onChange={handleChange} />
            <div className="modal-actions">
              <button onClick={handleAdd} className="add-btn">Assign Relief Team</button>
              <button onClick={() => setShowAddPopup(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReliefTeamTable;
