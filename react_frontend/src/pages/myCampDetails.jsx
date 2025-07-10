import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/comments";
import AddComment from "../components/addComment";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";
import { toast } from "react-toastify";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";

function MyCampaignDetails() {
  const navigate = useNavigate();

const API_BASE = "https://crowdfundingplatform.onrender.com";
  
  const { campId } = useParams();

  const [campaign, setCampaign] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [deleting, setDeleting] = useState(false);

  // Auth check + userId decoding
  useEffect(() => {
    const savedToken = localStorage.getItem("add-new-campaign-token");
    if (!savedToken) {
      alert("Please login first");
      navigate("/userLogin");
    } else {
      setToken(savedToken);
      const payload = JSON.parse(atob(savedToken.split(".")[1]));
      setUserId(payload.userId);
    }
  }, [navigate]);

  // Fetch campaign
  useEffect(() => {
    if (!token) return;

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

  if (err) return <h2>{err}</h2>;

  if (!campaign) return <h2>No campaign found</h2>;

  function handleDonate(campId) {
    if (!token) {
      alert("Please login first");
      navigate(`/userLogin`);
    } else {
      navigate(`/donate?campaignId=${campId}`);
    }
  }

  async function handleDelete(campId) {
    if (!token) {
      alert("Please login first");
      navigate(`/userLogin`);
    } else {
      try {
        if (userId !== campaign.owner._id) {
          toast.error("not authorized");
          return;
        }
        const confirmed = window.confirm(
          "Are you sure you want to delete this campaign?"
        );
        if (!confirmed) return;

        setDeleting(true);
        await fetch(`${API_BASE}/campaign/deleteCampaign/${campId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDeleting(false);
        toast.success("Campaign deleted successfully");
        navigate("/allCampaigns");
      } catch (error) {
        console.log(error);
        setError("Failed to delete campaign.");
      }
    }
  }

  function handleEdit(campId) {
    if (!token) {
      toast.error("Please login first");
      navigate(`/userLogin`);
    } else {
      if (userId !== campaign.owner._id) {
        toast.error("not authorized");
        return;
      }
      navigate(`/updateCampaign?campaignId=${campId}`);
    }
  }

  const percentage = campaign.raisedAmount
    ? Math.min(
        (campaign.raisedAmount / campaign.goalAmount) * 100,
        100
      ).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {deleting && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg px-8 py-6 shadow-lg text-center">
            <div className="mb-4">
              <svg
                className="animate-spin h-6 w-6 text-[#01BFBD] mx-auto"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
            </div>
            <p className="text-gray-700 font-medium">Deleting campaign...</p>
          </div>
        </div>
      )}

      <div className="text-center text-2xl md:text-4xl font-bold text-gray-600 mt-10 mx-20 px-30">
        <h2>{campaign.title}</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 lg:flex lg:gap-8">
        {/* Left Section */}
        <div className="lg:w-2/3 space-y-8">
          <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-6 transition">
            <div className="h-80 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={campaign.dp}
                alt="campaign"
                className="h-full object-contain"
              />
            </div>

            <hr className="my-6 border-[#01BFBD]" />

            {/* Action Buttons */}
            <div className="flex justify-around text-gray-500 text-sm md:text-base">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex items-center gap-2 ${
                  activeTab === "about" ? "text-[#01BFBD]" : ""
                }`}
              >
                <TfiWorld />
                <span>About</span>
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex items-center gap-2 ${
                  activeTab === "comments" ? "text-[#01BFBD]" : ""
                }`}
              >
                <FaComment />
                <span>Comments</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#01BFBD]">
                <FaShare />
                <span>Share</span>
              </button>
            </div>

            <hr className="my-6 border-[#01BFBD]" />

            {activeTab === "about" && (
              <div className="py-4">
                <h1 className="text-center font-medium text-2xl text-gray-800">
                  About the Fundraiser
                </h1>
                <p className="mt-4">{campaign.description}</p>
              </div>
            )}

            {activeTab === "comments" && (
              <div className="py-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Supporter's Comments ({campaign.comments.length})
                </h2>
                <AddComment />
                <Comments campId={campId} />
              </div>
            )}
          </div>

          {/* Comments Section */}
          {activeTab == "about" ? (
            <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Supporter's Comments ({campaign.comments.length})
              </h2>
              <AddComment />
              <Comments campId={campId} />
            </div>
          ) : null}
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 space-y-6 mt-10 lg:mt-0">
          {/* Donate Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <button
              onClick={() => handleDonate(campaign._id)}
              className="bg-[#01BFBD] text-white font-semibold py-3 w-full rounded-lg hover:bg-[#019fa5] transition"
            >
              CONTRIBUTE NOW
            </button>

            <div className="flex flex-wrap gap-2 md:gap-4 justify-between">
              <button
                onClick={() => handleDelete(campaign._id)}
                className="bg-red-500 text-white md:px-6 px-3 md:py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>

              <button
                onClick={() => handleEdit(campaign._id)}
                className="bg-yellow-500 text-white md:px-6 px-3 md:py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
            </div>

            <div className="text-gray-700 text-sm">
              <strong className="font-medium text-4xl text-gray-600">
                ₹{campaign.raisedAmount || 0}
              </strong>
              <span className="text-[#01BFBD]"> ({percentage}%)</span>
              <p className="text-md text-gray-400">
                raised of{" "}
                <strong className="text-xl font-light text-gray-600">
                  ₹{campaign.goalAmount}
                </strong>{" "}
                goal
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#01BFBD] transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <p className="font-light text-2xl text-gray-700">
                {campaign.donors.length}{" "}
                <strong className="text-md text-gray-400 text-sm">
                  Supporters
                </strong>
              </p>
              <p className="font-light text-2xl text-gray-700">
                20
                <strong className="text-md text-gray-400 text-sm">
                  {" "}
                  Days left
                </strong>
              </p>
            </div>
          </div>

          {/* Campaigner & Beneficiary */}
          <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
            <div className="flex gap-6">
              <div className="h-12 w-12 rounded-full bg-gray-300"></div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">
                  Campaigner
                </h4>
                <p className="text-gray-600">
                  {campaign.owner?.username || "Anonymous"}
                </p>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">
                    Beneficiary
                  </h4>
                  <p className="text-gray-600">
                    {campaign.owner?.username || "Anonymous"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyCampaignDetails;
