import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = "https://crowdfundingplatform.onrender.com";

function DonatePage() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const navigate = useNavigate();

  const [campaignTitle, setCampaignTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!campaignId) {
        setMessage("Campaign ID missing in URL.");
        return;
      }

      try {
        const token = localStorage.getItem("add-new-campaign-token");
        const response = await fetch(
          `${API_BASE}/campaign/Campaign/${campaignId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.campaign) {
          setCampaignTitle(result.campaign.title);
        } else {
          setMessage(result.msg || "Something went wrong");
        }
      } catch (error) {
        console.error("Error while fetching campaign title:", error);
        setMessage("Something went wrong.");
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const token = localStorage.getItem("add-new-campaign-token");

    if (!token) {
      toast("Please login first!");
      navigate("/userLogin");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/donation/donate/${campaignId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: parseFloat(amount) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("Thank you for your donation!");
        navigate(`/`);
      } else {
        alert(data.msg || "Failed to donate.");
      }
    } catch (error) {
      console.error("Error while donating:", error);
      toast("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-[#01BFBD] text-center">
          Donate to Campaign
        </h2>

        <h3 className="text-lg font-semibold text-gray-700 text-center">
          {campaignTitle ? `Campaign: ${campaignTitle}` : "Loading..."}
        </h3>

        <input
          type="number"
          value={amount}
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter donation amount"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01BFBD] text-gray-800"
        />

        <button
          onClick={handleDonate}
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-lg transition flex items-center justify-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#01BFBD] text-white hover:bg-[#019fa5]"
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
              Processing...
            </>
          ) : (
            "Contribute Now"
          )}
        </button>

        {message && (
          <div className="text-center text-red-600 font-medium">{message}</div>
        )}
      </div>
    </div>
  );
}

export default DonatePage;
