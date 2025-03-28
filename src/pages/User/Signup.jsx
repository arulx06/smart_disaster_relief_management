import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    role: "", // ✅ Added role with an empty string to avoid uncontrolled issues
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Password validation
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      setError("Password must be at least 8 characters long, contain an uppercase letter and a number.");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Remove role if it's empty before sending to the backend
      const requestBody = { ...formData };
      if (!requestBody.role) delete requestBody.role;

      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Left Section - Signup Form */}
        <div className="signup-left">
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleSubmit}>
            <SignupInput type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
            <SignupInput type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
            <SignupInput type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />

            {/* Role & Contact Number on Same Line */}
            <div className="input-group">
              <SignupInput type="text" name="role" placeholder="Role (Optional)" onChange={handleChange} value={formData.role} />
              <SignupInput type="text" name="contact_number" placeholder="Contact Number" onChange={handleChange} value={formData.contact_number} />
            </div>

            <SignupButton text={loading ? "Signing Up..." : "Sign Up"} disabled={loading} />
          </form>
        </div>

        {/* Right Section - Navigation */}
        <div className="signup-right">
          <h2>Welcome to Signup</h2>
          <p>Already have an account?</p>
          <Link to="/login">
            <button className="login-button">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const SignupInput = ({ type, name, placeholder, onChange, value }) => (
  <input type={type} name={name} placeholder={placeholder} value={value} required={name !== "role"} onChange={onChange} />
);

// Reusable Button Component
const SignupButton = ({ text, disabled }) => (
  <button type="submit" disabled={disabled}>
    {text}
  </button>
);

export default Signup;
