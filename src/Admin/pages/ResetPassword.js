import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import httpClient from "../../Api/axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token || !userId) {
      setMessage("Invalid reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setMessage("Password must be at least 8 characters, include a number & a special character.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await httpClient.put('/auth/reset_Password', {
        userId,
        token,
        newPassword: password,
      });

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage("Failed to reset password. Try again.");
      console.error("Reset Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4 text-lg"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4 text-lg"
            required
          />
          <button
            type="submit"
            className={`w-full text-white p-3 rounded text-lg font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && <p className="mt-4 text-lg text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
