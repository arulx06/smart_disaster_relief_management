import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Recipient's email
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Only send recipient's email
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setStep(2); // Navigate to the "Enter OTP" area
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }), // Only email and otp are sent
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("OTP verified successfully");
      setStep(3); // Navigate to the "Enter New Password" area
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetNewPassword = async () => {
    try {
      setError(""); // Clear previous errors

      // Validate password length
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/auth/set-new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }), // Send email and new password
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Password reset successfully");
      setStep(4); // Navigate to step 4
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Only send recipient's email
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("OTP resent to your email");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {step === 1 && (
          <>
            <h2>Reset Your Password</h2>
            <p className="instruction-text">
              Forgot your password? 
              Please enter your email and we will send you a 6 digit code
            </p>
            {error && <p className="error">{error}</p>}
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
            <a href="/login" className="back-to-login">
              ⬅️ Back to Login
            </a>
          </>
        )}
        {step === 2 && (
          <>
            <div className="otp-header">
              <h2>Enter Confirmation Code</h2>
              <p>We sent a code to <strong>{email}</strong></p>
            </div>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />
            <button className="otp-continue-button" onClick={handleVerifyOtp}>
              Continue
            </button>
            <p className="resend-text">
              Didn’t receive the email?{" "}
              <span className="resend-link" onClick={handleResendOtp}>
                Click to resend
              </span>
            </p>
            <a
              href="#"
              className="back-to-email"
              onClick={(e) => {
                e.preventDefault();
                setMessage(""); // Clear the success message
                setError(""); // Clear the error message
                setStep(1); // Navigate back to the "Enter Email" area
              }}
            >
              ⬅️ Back to Enter Email
            </a>
          </>
        )}
        {step === 3 && (
          <>
            <h2>Set New Password</h2>
            <p className="para">Please choose a password that is at least 8 characters long.</p>
            {error && <p className="error">{error}</p>}
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleSetNewPassword}>Submit</button>
          </>
        )}
        {step === 4 && (
          <>
            <div className="reset-success">
              <h2>Password Reset!</h2>
              <p>Your password has been successfully reset.</p>
              <p> Click Below to Log In</p>
              <button className="proceed-button" onClick={() => navigate("/login")}>
                Proceed
              </button>
            </div>
          </>
        )}
      </div>
      <div className="step-indicator">
        <span className={`dot ${step === 1 ? "active" : ""}`}></span>
        <span className={`dot ${step === 2 ? "active" : ""}`}></span>
        <span className={`dot ${step === 3 ? "active" : ""}`}></span>
        <span className={`dot ${step === 4 ? "active" : ""}`}></span>
      </div>
    </div>
  );
};

export default ForgotPassword;
