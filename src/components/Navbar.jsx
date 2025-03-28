import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({userRole}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const defaultProfileImage = "https://via.placeholder.com/40?text=👤"; // Default placeholder

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, profile_photo: data.profile_photo };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyles = {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "0.3rem 0.8rem",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const activeLinkStyles = {
    animation: "pop-up 0.4s ease-in-out",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.42)",
  };

  const linksContainerStyles = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };

  const profileImageStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    objectFit: "cover",
    border: "2px solid white",
  };

  return (
    <nav className="navbar">
      <h1 style={{ margin: 0, fontSize: "1.3rem" }}>Smart Disaster Management System</h1>
      <ul style={linksContainerStyles}>
        <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles)}>
          Home
        </NavLink>
        <NavLink to="/disasters" style={({ isActive }) => (isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles)}>
          Disasters
        </NavLink>
        {userRole!="Admin" ?(<NavLink to="/resource-allocations" style={({ isActive }) => (isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles)}>
          Resources
        </NavLink>) :
        (<div
          className="resources-dropdown-container"
          onMouseEnter={() => setIsResourcesDropdownOpen(true)}
          
        >
          <div
            style={linkStyles}
          >
            Resources
          </div>

          {isResourcesDropdownOpen && (
            <div className="resources-dropdown-menu"
            onMouseLeave={() => setIsResourcesDropdownOpen(false)}
            >
              <button onClick={() => navigate("/resource-allocations")}>Allocation</button>
              <button onClick={() => navigate("/resources")}>Available</button>
            </div>
          )}
        </div>)}

        <NavLink to="/relief-teams" style={({ isActive }) => (isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles)}>
          Relief Teams
        </NavLink>

        {/* Show Signup & Login if user is not logged in */}
        {!token ? (
          <>
            <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles)}>
              Login
            </NavLink>
          </>
        ) : (
          <>
            {/* Profile Icon */}
            <div
              className="profile-dropdown-container"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <img
                src={user?.profile_photo || defaultProfileImage}
                alt="Profile"
                style={profileImageStyles}
              />
              {isDropdownOpen && (
                <div className="dropdown-menu"
                 onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button onClick={() => navigate("/profile")}>Profile</button>
                  {userRole == "Admin" &&(<button onClick={() => navigate("/accesscontrol")}>Access-Control</button>)}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>

          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
