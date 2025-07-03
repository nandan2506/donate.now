import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = "http://localhost:8000";

function UpdateCampaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
    milestones: "",
    media: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("add-new-campaign-token");

  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get("campaignId");

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/campaign/Campaign/${campaignId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
          setForm({
            title: data.campaign.title,
            description: data.campaign.description,
            goalAmount: data.campaign.goalAmount,
            milestones: data.campaign.milestones.join(", "),
            media: data.campaign.media,
          });
        } else {
          setMessage("❌ Error fetching campaign data.");
        }
      } catch (err) {
        console.error("Error fetching campaign data:", err);
        setMessage("❌ Error fetching campaign data.");
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [campaignId, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, goalAmount, milestones, media } = form;

    try {
      const response = await fetch(
        `${API_BASE}/campaign/updateCampaign/${campaignId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            goalAmount,
            milestones: milestones.split(",").map((item) => item.trim()),
            media,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Campaign updated successfully!");
        navigate("/allCampaigns");
      } else {
        setMessage(data.msg || "❌ Failed to update campaign.");
      }
    } catch (err) {
      console.error("Error updating campaign:", err);
      setMessage("❌ Error updating campaign.");
    }
  };

  if (loading) return <p className="loading">Loading campaign details...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#01BFBD] mb-4">
          Update Campaign
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block font-medium text-gray-700 mb-1"
            >
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="goalAmount"
              className="block font-medium text-gray-700 mb-1"
            >
              Goal Amount (₹)
            </label>
            <input
              type="number"
              id="goalAmount"
              value={form.goalAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="milestones"
              className="block font-medium text-gray-700 mb-1"
            >
              Milestones (comma-separated)
            </label>
            <input
              type="text"
              id="milestones"
              value={form.milestones}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="media"
              className="block font-medium text-gray-700 mb-1"
            >
              Media Link
            </label>
            <input
              type="text"
              id="media"
              value={form.media}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#01BFBD] text-white font-semibold py-3 rounded-md hover:bg-[#019fa5] transition"
          >
            Update Campaign
          </button>
        </form>

        {message && (
          <div className="text-center mt-4 text-red-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateCampaign;
