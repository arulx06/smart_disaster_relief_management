import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setEditedUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({ ...prev, profile_photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setUser(editedUser);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!passwords.oldPassword || !passwords.newPassword) {
        setPasswordMessage("Both current and new passwords are required");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/users/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setPasswordMessage("Password updated successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMessage(err.message);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <br /> <br /> <br /> 
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-photo-container">
            <img
              src={editedUser.profile_photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-photo"
            />
            {isEditing && <input type="file" accept="image/*" onChange={handlePhotoUpload} />}
          </div>
          <div className="profile-actions">
            <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button className="edit-btn" onClick={() => setShowPasswordForm(!showPasswordForm)}>
            {showPasswordForm ? "Cancel Password Reset" : "Reset Password"}
            </button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}

        <div className="profile-details">
          <div className="detail">
            <label>Name:</label>
            {isEditing ? (
              <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          <div className="detail">
            <label>Email:</label>
            {isEditing ? (
              <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="detail">
            <label>Role:</label>
            {isEditing ? (
              <input type="text" name="role" value={editedUser.role} onChange={handleChange} />
            ) : (
              <p>{user.role}</p>
            )}
          </div>

          <div className="detail">
            <label>Contact Number:</label>
            {isEditing ? (
              <input type="text" name="contact_number" value={editedUser.contact_number} onChange={handleChange} />
            ) : (
              <p>{user.contact_number}</p>
            )}
          </div>

          <div className="detail">
            <label>Description:</label>
            {isEditing ? (
              <textarea name="description" value={editedUser.description} onChange={handleChange} />
            ) : (
              <p>{user.description || "No description added yet."}</p>
            )}
          </div>

          {isEditing && (
            <div className="buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>

        
      </div>

      {showPasswordForm && (
        <div className="popup-overlay">
          <div className="password-reset-popup">
            <h3>Reset Your Password</h3>
            <div className="detail">
              <label htmlFor="current-password">Current Password</label>
              <input
                type="password"
                id="current-password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                placeholder="Enter current password"
              />
            </div>
            <div className="detail">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="Enter new password"
              />
            </div>
            <div className="buttons">
              <button className="save-btn" onClick={handlePasswordReset}>Reset Password</button>
              <button className="cancel-btn" onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
            {passwordMessage && <p className="message">{passwordMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
