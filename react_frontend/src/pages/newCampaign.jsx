import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function NewCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [milestones, setMilestones] = useState("");
  const [media, setMedia] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const link = "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaignData = {
      title,
      description,
      goalAmount,
      milestones: milestones.split(",").map((m) => m.trim()),
      media: media.split(",").map((m) => m.trim()),
    };

    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      setMessage("You must be logged in to create a campaign.");
      return;
    }

    try {
      const response = await fetch(`${link}/campaign/newCampaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Campaign created successfully!");
        navigate("/profile");
      } else {
        setMessage(data.msg || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 md:p-10 m-5 md:m-10" >
        <h1 className="text-3xl md:text-4xl font-bold text-[#0c3d3d] mb-8 text-center">
          Create New Campaign
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Campaign Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              placeholder="Describe your campaign"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            ></textarea>
          </div>

          {/* Goal Amount */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Goal Amount</label>
            <input
              type="number"
              placeholder="e.g. 100000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            />
          </div>

          {/* Milestones */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Milestones</label>
            <input
              type="text"
              placeholder="Comma-separated milestones"
              value={milestones}
              onChange={(e) => setMilestones(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            />
          </div>

          {/* Media URLs */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Media URL(s)</label>
            <input
              type="url"
              placeholder="Comma-separated image/video URLs"
              value={media}
              onChange={(e) => setMedia(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-[#01BFBD] border border-[#01BFBD] rounded-md hover:bg-[#01BFBD] hover:text-white transition-all"
            >
              <IoMdArrowBack />
              Previous
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#01BFBD] text-white rounded-md hover:bg-[#019fa5] transition-all"
            >
              Create Campaign
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-6 text-center font-medium text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}

export default NewCampaign;
