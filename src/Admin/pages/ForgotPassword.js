import React, { useState } from "react";
import httpClient from "../../Api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await httpClient.post('/auth/forgot_password', { email });
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send reset link. Try again.");
      console.log("Forgot Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4 text-lg"
            required
          />
          <button
            type="submit"
            className={`w-full text-white p-3 rounded text-lg font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="mt-4 text-lg text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;


