import { useState } from "react";
import { updateDisaster, deleteDisaster, addDisaster } from "../services/apiService";
import "./disasterTable.css";
const DisasterTable = ({ disasters, refreshDisasters , userRole}) => {

  const [isUpdating, setIsUpdating] = useState(false);
  const [newDisaster, setNewDisaster] = useState({
    disno: "",
    historic: false,
    classification_key: "",
    disastergroup: "",
    subgroupdisaster: "",
    typedisaster: "",
    subtypedisaster: "",
    externalids: "",
    eventname: "",
    iso: "",
    country: "",
    subregion: "",
    region: "",
    location_: "",
    origin: "",
    associatedtypes: "",
    ofda_bha_response: false,
    appeal: false,
    declaration: false,
    aid_contribution_000_us_: 0,
    magnitude: 0,
    magnitudescale: "",
    latitude: 0,
    longitude: 0,
    riverbasin: "",
    start_year: 0,
    start_month: 0,
    start_day: 0,
    end_year: 0,
    end_month: 0,
    end_day: 0,
    total_deaths: 0,
    no_injured: 0,
    no_affected: 0,
    no_homeless: 0,
    total_affected: 0,
    reconstruction_costs_000_us_: 0,
    reconstruction_costs_adjusted_000_us_: 0,
    insured_damage_000_us_: 0,
    insured_damage_adjusted_000_us_: 0,
    total_damage_000_us_: 0,
    total_damage_adjusted_000_us_: 0,
    cpi: 0,
    admin_units: "",
    entry_date: "",
    last_update: "",
    live: false,
  });
  
  const [editDisaster, setEditDisaster] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDisaster({
      ...newDisaster,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditDisaster({
      ...editDisaster,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleAdd = async () => {
    console.log("New Disaster Data:", newDisaster);
    try {
      await addDisaster(newDisaster);
  
      // Reset all fields after adding
      setNewDisaster({
        disno: "",
        historic: false,
        classification_key: "",
        disastergroup: "",
        subgroupdisaster: "",
        typedisaster: "",
        subtypedisaster: "",
        externalids: "",
        eventname: "",
        iso: "",
        country: "",
        subregion: "",
        region: "",
        location_: "",
        origin: "",
        associatedtypes: "",
        ofda_bha_response: false,
        appeal: false,
        declaration: false,
        aid_contribution_000_us_: 0,
        magnitude: 0,
        magnitudescale: "",
        latitude: 0,
        longitude: 0,
        riverbasin: "",
        start_year: 0,
        start_month: 0,
        start_day: 0,
        end_year: 0,
        end_month: 0,
        end_day: 0,
        total_deaths: 0,
        no_injured: 0,
        no_affected: 0,
        no_homeless: 0,
        total_affected: 0,
        reconstruction_costs_000_us_: 0,
        reconstruction_costs_adjusted_000_us_: 0,
        insured_damage_000_us_: 0,
        insured_damage_adjusted_000_us_: 0,
        total_damage_000_us_: 0,
        total_damage_adjusted_000_us_: 0,
        cpi: 0,
        admin_units: "",
        entry_date: "",
        last_update: "",
        live: false,
      });
  
      await refreshDisasters(); // Ensure refreshDisasters is defined
      setShowAddPopup(false); // Close the popup
    } catch (error) {
      console.error("Failed to add disaster:", error);
    }
  };
  
  
  const handleUpdate = async () => {
    if (!editDisaster) return;
    
    setIsUpdating(true); // Set loading state
    
    try {
      await updateDisaster(editDisaster.disno, editDisaster);
      setEditDisaster(null);
      console.log("refreshDisasters:", refreshDisasters);
      refreshDisasters();
    } catch (error) {
      console.error("Failed to update disaster:", error);
      alert("Error updating disaster. Please try again.");
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };
  
  const canEdit = ["Admin", "Relief-Team Leader", "Relief-Team Member"].includes(userRole);

return (
  <div className="disaster-container">
    {/* Disaster Table */}
    <table className="disaster-table">
      <thead>
        <tr>
          <th>Disaster ID</th>
          <th>Historic</th>
          <th>Classification Key</th>
          <th>Disaster Group</th>
          <th>Subgroup Disaster</th>
          <th>Type of Disaster</th>
          <th>Subtype of Disaster</th>
          <th>External IDs</th>
          <th>Event Name</th>
          <th>ISO</th>
          <th>Country</th>
          <th>Subregion</th>
          <th>Region</th>
          <th>Location</th>
          <th>Origin</th>
          <th>Associated Types</th>
          <th>OFDA/BHA Response</th>
          <th>Appeal</th>
          <th>Declaration</th>
          <th>Aid Contribution</th>
          <th>Magnitude</th>
          <th>Magnitude Scale</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>River Basin</th>
          <th>Start Year</th>
          <th>Start Month</th>
          <th>Start Day</th>
          <th>End Year</th>
          <th>End Month</th>
          <th>End Day</th>
          <th>Total Deaths</th>
          <th>No Injured</th>
          <th>No Affected</th>
          <th>No Homeless</th>
          <th>Total Affected</th>
          <th>Reconstruction Costs</th>
          <th>Reconstruction Costs Adjusted</th>
          <th>Insured Damage</th>
          <th>Insured Damage Adjusted</th>
          <th>Total Damage</th>
          <th>Total Damage Adjusted</th>
          <th>CPI</th>
          <th>Admin Units</th>
          <th>Entry Date</th>
          <th>Last Update</th>
          {canEdit && (<th>Actions
            <button className="add-btn" onClick={() => setShowAddPopup(true)} style={{ color: "#007bff" }}>
              ➕
            </button>
          </th>)}
        </tr>
      </thead>
      <tbody>
        {disasters.length === 0 ? (
          <tr>
            <td colSpan="48">No data available</td>
          </tr>
        ) : (
          disasters.map((disaster) => (
            <tr key={disaster.disno}>
                {editDisaster?.disno === disaster.disno ? (
                  <>
                    <td><input type="text" name="disno" value={editDisaster?.disno ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="checkbox" name="historic" checked={!!editDisaster?.historic} onChange={handleEditChange} /></td>
                    <td><input type="text" name="classification_key" value={editDisaster?.classification_key ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="disastergroup" value={editDisaster?.disastergroup ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="subgroupdisaster" value={editDisaster?.subgroupdisaster ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="typedisaster" value={editDisaster?.typedisaster ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="subtypedisaster" value={editDisaster?.subtypedisaster ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="externalids" value={editDisaster?.externalids ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="eventname" value={editDisaster?.eventname ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="iso" value={editDisaster?.iso ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="country" value={editDisaster?.country ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="subregion" value={editDisaster?.subregion ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="region" value={editDisaster?.region ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="location_" value={editDisaster?.location_ ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="origin" value={editDisaster?.origin ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="associatedtypes" value={editDisaster?.associatedtypes ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="checkbox" name="ofda_bha_response" checked={!!editDisaster?.ofda_bha_response} onChange={handleEditChange} /></td>
                    <td><input type="checkbox" name="appeal" checked={!!editDisaster?.appeal} onChange={handleEditChange} /></td>
                    <td><input type="checkbox" name="declaration" checked={!!editDisaster?.declaration} onChange={handleEditChange} /></td>
                    <td><input type="number" name="aid_contribution_000_us_" value={editDisaster?.aid_contribution_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="magnitude" value={editDisaster?.magnitude ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="text" name="magnitudescale" value={editDisaster?.magnitudescale ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="number" name="latitude" value={editDisaster?.latitude ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="longitude" value={editDisaster?.longitude ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="text" name="riverbasin" value={editDisaster?.riverbasin ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="number" name="start_year" value={editDisaster?.start_year ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="start_month" value={editDisaster?.start_month ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="start_day" value={editDisaster?.start_day ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="end_year" value={editDisaster?.end_year ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="end_month" value={editDisaster?.end_month ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="end_day" value={editDisaster?.end_day ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="total_deaths" value={editDisaster?.total_deaths ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="no_injured" value={editDisaster?.no_injured ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="no_affected" value={editDisaster?.no_affected ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="no_homeless" value={editDisaster?.no_homeless ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="total_affected" value={editDisaster?.total_affected ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="reconstruction_costs_000_us_" value={editDisaster?.reconstruction_costs_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="reconstruction_costs_adjusted_000_us_" value={editDisaster?.reconstruction_costs_adjusted_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="insured_damage_000_us_" value={editDisaster?.insured_damage_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="insured_damage_adjusted_000_us_" value={editDisaster?.insured_damage_adjusted_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="total_damage_000_us_" value={editDisaster?.total_damage_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="total_damage_adjusted_000_us_" value={editDisaster?.total_damage_adjusted_000_us_ ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="number" name="cpi" value={editDisaster?.cpi ?? 0} onChange={handleEditChange} /></td>
                    <td><input type="text" name="admin_units" value={editDisaster?.admin_units ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="entry_date" value={editDisaster?.entry_date ?? ""} onChange={handleEditChange} /></td>
                    <td><input type="text" name="last_update" value={editDisaster?.last_update ?? ""} onChange={handleEditChange} /></td>
                    {/* <td><input type="checkbox" name="live" checked={editDisaster.live} onChange={handleEditChange} /></td> */}
                    (<td>
                      <button onClick={handleUpdate} className="save-btn">Save</button>
                      <button onClick={() => setEditDisaster(null)} className="cancel-btn">Cancel</button>
                    </td>)
                  </>
                ) : (

                <>
                <td>{disaster.disno}</td>
                <td>{disaster.historic ? "Yes" : "No"}</td>
                <td>{disaster.classification_key}</td>
                <td>{disaster.disastergroup}</td>
                <td>{disaster.subgroupdisaster}</td>
                <td>{disaster.typedisaster}</td>
                <td>{disaster.subtypedisaster}</td>
                <td>{disaster.externalids}</td>
                <td>{disaster.eventname}</td>
                <td>{disaster.iso}</td>
                <td>{disaster.country}</td>
                <td>{disaster.subregion}</td>
                <td>{disaster.region}</td>
                <td>{disaster.location_}</td>
                <td>{disaster.origin}</td>
                <td>{disaster.associatedtypes}</td>
                <td>{disaster.ofda_bha_response ? "Yes" : "No"}</td>
                <td>{disaster.appeal ? "Yes" : "No"}</td>
                <td>{disaster.declaration ? "Yes" : "No"}</td>
                <td>{disaster.aid_contribution_000_us_}</td>
                <td>{disaster.magnitude}</td>
                <td>{disaster.magnitudescale}</td>
                <td>{disaster.latitude}</td>
                <td>{disaster.longitude}</td>
                <td>{disaster.riverbasin}</td>
                <td>{disaster.start_year}</td>
                <td>{disaster.start_month}</td>
                <td>{disaster.start_day}</td>
                <td>{disaster.end_year}</td>
                <td>{disaster.end_month}</td>
                <td>{disaster.end_day}</td>
                <td>{disaster.total_deaths}</td>
                <td>{disaster.no_injured}</td>
                <td>{disaster.no_affected}</td>
                <td>{disaster.no_homeless}</td>
                <td>{disaster.total_affected}</td>
                <td>{disaster.reconstruction_costs_000_us_}</td>
                <td>{disaster.reconstruction_costs_adjusted_000_us_}</td>
                <td>{disaster.insured_damage_000_us_}</td>
                <td>{disaster.insured_damage_adjusted_000_us_}</td>
                <td>{disaster.total_damage_000_us_}</td>
                <td>{disaster.total_damage_adjusted_000_us_}</td>
                <td>{disaster.cpi}</td>
                <td>{disaster.admin_units}</td>
                <td>{disaster.entry_date}</td>
                <td>{disaster.last_update}</td>
                {/* <td>{disaster.live ? "Yes" : "No"}</td>  */}
                  {canEdit &&(<td>
                    <button onClick={() => setEditDisaster(disaster)} className="edit-btn">Edit</button>
                    <button onClick={() => deleteDisaster(disaster.disno)} className="delete-btn">Delete</button>
                  </td>)}
                </>
              )}
            </tr>

          ))
        )}
      </tbody>
    </table>
    {showAddPopup && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Add New Disaster</h3>
          <div className="modal-body">
            <div className="form-grid">
              {Object.keys(newDisaster).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.replace(/_/g, ' ')}</label>
                  <input 
                    type={typeof newDisaster[key] === "boolean" ? "checkbox" : "text"} 
                    name={key} 
                    placeholder={key.replace(/_/g, ' ')} 
                    value={newDisaster[key]} 
                    onChange={handleChange} 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={handleAdd} className="add-btn">Add Disaster</button>
            <button onClick={() => setShowAddPopup(false)} className="close-btn">Close</button>
          </div>
        </div>
      </div>
    )}


  </div>
);

};

export default DisasterTable;
