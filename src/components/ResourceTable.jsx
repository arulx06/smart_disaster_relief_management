import { useState } from "react";
import { addResource, updateResource, deleteResource } from "../services/apiService";
import "./resourceTable.css"; // Import CSS file

const ResourceTable = ({ resources, refreshResources, userRole }) => {

  const [newResource, setNewResource] = useState({
    resource_name: "",
    quantity_available: 0,
    quantity_dispatched: 0,
    disaster_id: "",
  });

  const [editResource, setEditResource] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditResource({ ...editResource, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await addResource(newResource);
    setNewResource({ resource_name: "", quantity_available: 0, quantity_dispatched: 0, disaster_id: "" });
    refreshResources();
    setShowAddPopup(false);
  };

  const handleUpdate = async () => {
    if (!editResource) return;
    await updateResource(editResource.resource_id, editResource);
    setEditResource(null);
    refreshResources();
  };

  const handleDelete = async (id) => {
    await deleteResource(id);
    refreshResources();
  };

  return (
    <div className="resource-container">
      {/* Resource Table */}
      <table className="resource-table">
        <thead>
          <tr>
            <th>Resource ID</th>
            <th>Resource Name</th>
            <th>Quantity Available</th>
            <th>Quantity Dispatched</th>
            <th>Disaster ID</th>
            {userRole === "Admin" && (
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
          {resources.length === 0 ? (
            <tr>
              <td colSpan={userRole === "Admin" ? 6 : 5}>No data available</td>
            </tr>
          ) : (
            resources.map((resource) => (
              <tr key={resource.resource_id}>
                <td>{resource.resource_id}</td>
                <td>
                  {editResource?.resource_id === resource.resource_id ? (
                    <input type="text" name="resource_name" value={editResource.resource_name} onChange={handleEditChange} />
                  ) : (
                    resource.resource_name
                  )}
                </td>
                <td>
                  {editResource?.resource_id === resource.resource_id ? (
                    <input type="number" name="quantity_available" value={editResource.quantity_available} onChange={handleEditChange} />
                  ) : (
                    resource.quantity_available
                  )}
                </td>
                <td>
                  {editResource?.resource_id === resource.resource_id ? (
                    <input type="number" name="quantity_dispatched" value={editResource.quantity_dispatched} onChange={handleEditChange} />
                  ) : (
                    resource.quantity_dispatched
                  )}
                </td>
                <td>
                  {editResource?.resource_id === resource.resource_id ? (
                    <input type="text" name="disaster_id" value={editResource.disaster_id} onChange={handleEditChange} />
                  ) : (
                    resource.disaster_id
                  )}
                </td>
                {userRole === "Admin" && (
                  <td>
                    {editResource?.resource_id === resource.resource_id ? (
                      <button onClick={handleUpdate} className="save-btn">Save</button>
                    ) : (
                      <button onClick={() => setEditResource(resource)} className="edit-btn">Edit</button>
                    )}
                    <button onClick={() => handleDelete(resource.resource_id)} className="delete-btn">Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add New Resource Modal - Pop-up */}
      {userRole === "Admin" && showAddPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Resource</h3>
            <input type="text" name="resource_name" placeholder="Resource Name" value={newResource.resource_name} onChange={handleChange} />
            <input type="number" name="quantity_available" placeholder="Quantity Available" value={newResource.quantity_available} onChange={handleChange} />
            <input type="number" name="quantity_dispatched" placeholder="Quantity Dispatched" value={newResource.quantity_dispatched} onChange={handleChange} />
            <input type="text" name="disaster_id" placeholder="Disaster ID" value={newResource.disaster_id} onChange={handleChange} />
            <div className="modal-actions">
              <button onClick={handleAdd} className="add-btn">Add Resource</button>
              <button onClick={() => setShowAddPopup(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceTable;
