import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

function NewCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [milestones, setMilestones] = useState("");
  const [media, setMedia] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [dp, setDp] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });
  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

const API_BASE = "https://crowdfundingplatform.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaignData = {
      title,
      description,
      goalAmount,
      milestones: milestones.split(",").map((m) => Number(m.trim())),
      media: media.split(",").map((m) => m.trim()),
      beneficiary,
      dp,
      tags: tags.split(",").map((t) => t.trim()),
      category,
      endDate,
      location,
    };

    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      setMessage("You must be logged in to create a campaign.");
      return;
    }

    try {
      setAdding(true);
      const response = await fetch(`${API_BASE}/campaign/newCampaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();
      setAdding(false)
      if (response.ok) {
        setMessage("✅ Campaign created successfully!");
        toast.success("Campaign created successfully!");
        setAdding(false);
        navigate("/profile");
      } else {
        setMessage(data.msg || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong!");
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 md:p-10 m-5">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0c3d3d] mb-8 text-center">
          Create New Campaign
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Title" value={title} setValue={setTitle} />
          <TextArea
            label="Description"
            value={description}
            setValue={setDescription}
          />
          <Input
            label="Goal Amount"
            type="number"
            value={goalAmount}
            setValue={setGoalAmount}
          />
          <Input
            label="Milestones (comma-separated numbers)"
            value={milestones}
            setValue={setMilestones}
          />
          <Input
            label="Media URLs (comma-separated)"
            value={media}
            setValue={setMedia}
          />
          <Input label="Display Image URL" value={dp} setValue={setDp} />
          <Input
            label="Beneficiary"
            value={beneficiary}
            setValue={setBeneficiary}
          />
          <Input
            label="Tags (comma-separated)"
            value={tags}
            setValue={setTags}
          />
          <Input label="Category" value={category} setValue={setCategory} />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            setValue={setEndDate}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={location.city}
              setValue={(v) => setLocation({ ...location, city: v })}
            />
            <Input
              label="State"
              value={location.state}
              setValue={(v) => setLocation({ ...location, state: v })}
            />
            <Input
              label="Country"
              value={location.country}
              setValue={(v) => setLocation({ ...location, country: v })}
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
              disabled={adding}
              className={`px-6 py-2 rounded-md transition-all font-semibold flex items-center justify-center gap-2 ${
                adding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#01BFBD] hover:bg-[#019fa5] text-white"
              }`}
            >
              {adding ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Campaign"
              )}
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

function Input({ label, value, setValue, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
      />
    </div>
  );
}

function TextArea({ label, value, setValue }) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        rows={4}
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
      ></textarea>
    </div>
  );
}

export default NewCampaign;
