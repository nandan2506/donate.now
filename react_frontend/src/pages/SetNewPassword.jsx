import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

const API_BASE = "https://crowdfundingplatform.onrender.com";

  async function handleSetPassword() {
    if (!password || !verifyPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setResponseMsg("");

    try {
      const res = await fetch(`${API_BASE}/user/setNewPassword/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, verifyPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(data.msg);
        toast.success(responseMsg)
        setTimeout(() => navigate("/userLogin"), 3000);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      console.log('error while setting new password:',err)
      setError("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0c3d3d] mb-6">
          Set New Password
        </h2>

        <label className="block mb-2 font-medium">New Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />

        <label className="block mb-2 font-medium">Confirm New Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="Confirm new password"
        />

        <button
          onClick={handleSetPassword}
          disabled={loading}
          className={`w-full py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#01BFBD] hover:bg-[#019fa5]"
          }`}
        >
          {loading ? "Updating..." : "Set Password"}
        </button>

        {responseMsg && (
          <p className="mt-4 text-green-600 text-center">{responseMsg}</p>
        )}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
