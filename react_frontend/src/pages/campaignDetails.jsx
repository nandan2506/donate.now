import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/comments";
import AddComment from "../components/addComment";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

function CampaignsDetails() {
  const navigate = useNavigate();
  const API_BASE = "http://localhost:8000";
  const { campId } = useParams();
  const token = localStorage.getItem("add-new-campaign-token");
  if (!token) {
    alert("please login first");
    navigate(`/userLogin`);
  }

  const [campaign, setCampaign] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/campaign/Campaign/${campId}`);
        const data = await res.json();

        if (data.msg === "no campaigns") {
          setCampaign("");
          setError("No campaign found.");
        } else {
          setCampaign(data.campaign);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching campaigns.");
      } finally {
        setLoading(false);
      }
    })();
  }, [campId, token]);

  if (loading) return <h2>Loading...</h2>;

  if (err) return <h2>{err.msg}</h2>;

  if (!campaign) return <h2>No campaign found</h2>;

  function handleDonate(campId) {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      alert("please login first");
      navigate(`/userLogin`);
    } else {
      navigate(`/donate?campaignId=${campId}`);
    }
  }

  async function handleDelete(campId) {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      alert("please login first");
      navigate(`/userLogin`);
    } else {
      try {
        alert("confirm delete Campaign");
        await fetch(`${API_BASE}/campaign/deleteCampaign/${campId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("campaign deleted successfully");
      } catch (error) {
        console.log(error.msg);
        setError(error.msg);
      }
    }
  }

  async function handleEdit(campId) {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      alert("please login first");
      navigate(`/userLogin`);
    } else {
      navigate(`/updateCampaign?campaignId=${campId}`);
    }
  }

  const percentage = campaign.raisedAmount
    ? ((campaign.raisedAmount / campaign.goalAmount) * 100).toFixed(2)
    : 0;

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#01BFBD] mb-6">
          {campaign.title}
        </h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {campaign.description}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Goal Amount:</strong> ₹{campaign.goalAmount}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Raised Amount:</strong> ₹{campaign.raisedAmount || 0}
            <span className="text-[#01BFBD]"> ({percentage}%)</span>
          </p>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full mt-4 mb-6">
            <div
              className="h-4 bg-[#01BFBD] rounded-full max-w-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={() => handleDonate(campaign._id)}
              className="bg-[#01BFBD] text-white px-6 py-2 rounded-lg hover:bg-[#019fa5] transition"
            >
              Donate
            </button>
            <button
              onClick={() => handleDelete(campaign._id)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(campaign._id)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Comments
          </h3>
          <AddComment />
          <Comments campId={campId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CampaignsDetails;
