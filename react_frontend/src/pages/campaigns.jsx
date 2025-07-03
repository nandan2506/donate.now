import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const API_BASE = "http://localhost:8000";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/campaign/allCampaigns`);
        const data = await res.json();

        if (data.msg === "no campaigns") {
          setCampaigns([]);
          setError("No campaigns available.");
        } else {
          setCampaigns(Array.isArray(data.campaigns) ? data.campaigns : []);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h1 className="loading-text">Loading campaigns...</h1>;
  if (!campaigns.length)
    return <h1 className="loading-text">No campaigns found.</h1>;

  function handleDonate(id) {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      alert("please login first");
      navigate(`/userLogin`);
    } else {
      navigate(`/donate?campaignId=${id}`);
    }
  }

  return (
    <div>
      <NavBar />
      <main className="min-h-screen bg-[#f8fafa]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-[#01BFBD] mb-6 text-center">
            All Campaigns
          </h1>

          {/* Search Input */}

          <div className="flex justify-center mb-10">
            <div className="relative w-full lg:w-1/2">
              <CiSearch className="absolute top-1/2 right-2 bg-[#01BFBD] rounded-full text-5xl transform -translate-y-1/2 text-white p-2 font-bold" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 h-15 pr-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-600 font-medium mb-6">
              {error}
            </div>
          )}

          {/* Campaign Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => {
              const percentage = campaign.raisedAmount
                ? ((campaign.raisedAmount / campaign.goalAmount) * 100).toFixed(
                    2
                  )
                : 0;

              return (
                <div
                  key={campaign._id}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
                >
                  <div
                    onClick={() => navigate(`/campaign/${campaign._id}`)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-[#0c3d3d] mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Description:</strong> {campaign.description}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Goal Amount:</strong> ₹{campaign.goalAmount}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Raised Amount:</strong> ₹
                      {campaign.raisedAmount || 0}{" "}
                      <span className="text-[#01BFBD]">({percentage}%)</span>
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full mt-3">
                      <div
                        className="h-3 bg-[#01BFBD] rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDonate(campaign._id)}
                    className="mt-6 bg-[#01BFBD] text-white px-4 py-2 rounded-lg hover:bg-[#019fa5] transition-all"
                  >
                    Donate
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Campaigns;
