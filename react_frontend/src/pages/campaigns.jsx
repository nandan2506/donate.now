import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CampCard from "@/components/campCard";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://crowdfundingplatform.onrender.com";

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

  if (loading)
    return (
      <div>
        <NavBar />
        <main className="min-h-screen bg-[#f8fafa]">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
            {/* Search Input */}

            <div className="flex justify-center mb-6 md:mb-10">
              <div className="relative w-full lg:w-1/2">
                <input className="w-full pl-3  md:pl-10 h-6 sm:h-20 md:h-15  pr-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]" />
              </div>
            </div>

            {/* Campaign Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );

  return (
    <div>
      <NavBar />
      <main className="min-h-screen bg-[#f8fafa]">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
          {/* Search Input */}
          <div className="flex justify-center mb-6 md:mb-10">
            <div className="relative w-full lg:w-1/2">
              <CiSearch className="absolute top-1/2 right-1 sm:right-2 bg-[#01BFBD] rounded-full text-xl sm:text-5xl transform -translate-y-1/2 text-white p-0.5 sm:p-2 font-bold" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-3 sm:pl-10 h-6 sm:h-15 pr-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
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
          {campaigns.length == 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">
                No campaigns started yet.
              </p>
              <button
                onClick={() => navigate("/newCampaign")}
                className="mt-6 px-6 py-3 bg-[#01BFBD] hover:bg-[#019fa5] text-white text-lg rounded-xl transition duration-300"
              >
                Start a New Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="text-start cursor-pointer"
                  onClick={() => navigate(`/campaign/${campaign._id}`)}
                >
                  <CampCard campaign={campaign} />;
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Campaigns;
