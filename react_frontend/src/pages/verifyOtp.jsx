import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function VerifyOtp() {
const API_BASE = "https://crowdfundingplatform.onrender.com";
  const [otp, setOtp] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSendOtp() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/user/verify-otp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Something went wrong");
        setResponseMsg("");
      } else {
        setResponseMsg(data.msg || "Email verified successfully.");
        setError(null);
        navigate("/userLogin");
      }
    } catch (err) {
      console.log(err.message);
      setError("Error while verifying OTP");
      setResponseMsg("");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0c3d3d]">
          Enter OTP
        </h1>

        <label className="block mb-2 font-medium">
          Please enter the OTP sent to your registered email
        </label>

        <input
          type="text"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#01BFBD] mb-4"
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 border border-[#01BFBD] text-[#01BFBD] rounded-lg hover:bg-[#01BFBD] hover:text-white transition"
          >
            <IoMdArrowBack />
            Previous
          </button>

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white transition flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#01BFBD] hover:bg-[#019fa5]"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>

        {responseMsg && (
          <p className="mt-4 text-green-600 font-semibold">{responseMsg}</p>
        )}

        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </div>
    </div>
  );
}
