import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DisastersPage from "./pages/Disasters/DisastersPage";
import ResourcesPage from "./pages/Resources/ResourcesPage";
import ReliefTeamsPage from "./pages/ReliefTeams/ReliefTeamsPage";
import ResourceAllocPage from "./pages/ResourceAlloc/ResourceAllocPage"; 
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import Profile from "./pages/User/Profile";
import AccessControl from "./pages/AccessControl/AccessControl";
import { fetchUserProfile } from "./services/apiService";
import ForgotPassword from "./pages/User/ForgotPassword";
const App = () => {
  
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserProfile();
        if (userData) {
          setUserRole(userData.role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <Router>
      <Navbar userRole={userRole} />
      <Routes>
        <Route path="/" element={<HomePage userRole={userRole} />} />
        <Route path="/disasters" element={<DisastersPage userRole={userRole} />} />
        <Route path="/resources" element={<ResourcesPage userRole={userRole} />} />
        <Route path="/relief-teams" element={<ReliefTeamsPage userRole={userRole} />} />
        <Route path="/resources" element={<ResourcesPage userRole={userRole} />} /> 
        <Route path="/resource-allocations" element={<ResourceAllocPage userRole={userRole} />} /> 
        <Route path="/accesscontrol" element={<AccessControl />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
