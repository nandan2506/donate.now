import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8000";

function DonatePage() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const navigate = useNavigate();

  const [campaignTitle, setCampaignTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

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
      alert("Please login first!");
      navigate("/userLogin");
      return;
    }

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
        alert("Thank you for your donation!");
        navigate(`/home`);
      } else {
        alert(data.msg || "Failed to donate.");
      }
    } catch (error) {
      console.error("Error while donating:", error);
      alert("Something went wrong.");
    }
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
            className="w-full bg-[#01BFBD] text-white font-semibold py-3 rounded-lg hover:bg-[#019fa5] transition"
          >
            Donate
          </button>

          {message && (
            <div className="text-center text-red-600 font-medium">
              {message}
            </div>
          )}
        </div>
      </div>
  );
}

export default DonatePage;
