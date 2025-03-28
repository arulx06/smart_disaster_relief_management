import { useState } from "react";
import { addResourceAllocation, updateResourceAllocation, deleteResourceAllocation } from "../services/apiService";
import "./ResourceAllocationsTable.css";

const ResourceAllocTable = ({ resourceAllocations, refreshAllocations, userRole }) => {
  const [newAllocation, setNewAllocation] = useState({
    resource_id: "", 
    team_id: "", 
    quantity_allocated: "", 
    allocation_date: ""
  });

  const [editAllocation, setEditAllocation] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleChange = (e) => {
    setNewAllocation({ ...newAllocation, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditAllocation({ ...editAllocation, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await addResourceAllocation(newAllocation);
    setNewAllocation({ resource_id: "", team_id: "", quantity_allocated: "", allocation_date: "" });
    refreshAllocations();
    setShowAddPopup(false);
  };

  const handleUpdate = async () => {
    if (!editAllocation) return;
    await updateResourceAllocation(editAllocation.allocation_id, editAllocation);
    setEditAllocation(null);
    refreshAllocations();
  };

  const handleDelete = async (id) => {
    await deleteResourceAllocation(id);
    refreshAllocations();
  };

  const canEdit = ["Admin", "Relief-Team Leader"].includes(userRole);

  return (
    <div className="allocation-table-container">
      <table className="allocation-table">
        <thead>
          <tr>
            <th>Allocation ID</th>
            <th>Resource ID</th>
            <th>Team ID</th>
            <th>Quantity Allocated</th>
            <th>Allocation Date</th>
            {canEdit && (
              <th>
                Actions
                <button className="add-btn" onClick={() => setShowAddPopup(true)}>
                  ➕
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {resourceAllocations.length === 0 ? (
            <tr>
              <td colSpan={canEdit ? 6 : 5}>No data available</td>
            </tr>
          ) : (
            resourceAllocations.map((allocation) => (
              <tr key={allocation.allocation_id}>
                <td>{allocation.allocation_id}</td>
                <td>
                  {editAllocation?.allocation_id === allocation.allocation_id ? (
                    <input type="text" name="resource_id" value={editAllocation.resource_id} onChange={handleEditChange} />
                  ) : (
                    allocation.resource_id
                  )}
                </td>
                <td>
                  {editAllocation?.allocation_id === allocation.allocation_id ? (
                    <input type="text" name="team_id" value={editAllocation.team_id} onChange={handleEditChange} />
                  ) : (
                    allocation.team_id
                  )}
                </td>
                <td>
                  {editAllocation?.allocation_id === allocation.allocation_id ? (
                    <input type="text" name="quantity_allocated" value={editAllocation.quantity_allocated} onChange={handleEditChange} />
                  ) : (
                    allocation.quantity_allocated
                  )}
                </td>
                <td>
                  {editAllocation?.allocation_id === allocation.allocation_id ? (
                    <input type="date" name="allocation_date" value={editAllocation.allocation_date} onChange={handleEditChange} />
                  ) : (
                    allocation.allocation_date
                  )}
                </td>
                {canEdit && (
                  <td>
                    {editAllocation?.allocation_id === allocation.allocation_id ? (
                      <button onClick={handleUpdate} className="save-btn">Save</button>
                    ) : (
                      <button onClick={() => setEditAllocation(allocation)} className="edit-btn">Edit</button>
                    )}
                    <button onClick={() => handleDelete(allocation.allocation_id)} className="delete-btn">Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showAddPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign New Resource Allocation</h3>
            <input type="text" name="resource_id" placeholder="Resource ID" value={newAllocation.resource_id} onChange={handleChange} />
            <input type="text" name="team_id" placeholder="Team ID" value={newAllocation.team_id} onChange={handleChange} />
            <input type="text" name="quantity_allocated" placeholder="Quantity Allocated" value={newAllocation.quantity_allocated} onChange={handleChange} />
            <input type="date" name="allocation_date" placeholder="Allocation Date" value={newAllocation.allocation_date} onChange={handleChange} />
            <div className="modal-actions">
              <button onClick={handleAdd} className="add-btn">Assign Resource</button>
              <button onClick={() => setShowAddPopup(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceAllocTable;
