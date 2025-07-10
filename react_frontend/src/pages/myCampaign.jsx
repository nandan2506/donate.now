import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CampCard from "@/components/campCard";

function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const API_BASE = "https://crowdfundingplatform.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      navigate("/userLogin");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.userId;

    fetch(`${API_BASE}/campaign/myCampaign/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data.allCampaigns || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user campaigns:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <section className="min-h-screen bg-gradient-to-br from-[#e6fafa] to-[#f0fafa] px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-[#01BFBD] mb-3">
            My Campaigns
          </h1>
          <p className="text-gray-600 mb-10 text-base">
            Manage your fundraising efforts effectively.
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>

              <div className="h-[192px] w-[352px]  rounded-xl shadow-xl "></div>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">
                You haven't started any campaigns yet.
              </p>
              <button
                onClick={() => navigate("/createCampaign")}
                className="mt-6 px-6 py-3 bg-[#01BFBD] hover:bg-[#019fa5] text-white text-lg rounded-xl transition duration-300"
              >
                Start a New Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="text-start cursor-pointer"
                  onClick={() => navigate(`/myCampDetails/${campaign._id}`)}
                >
                  <CampCard campaign={campaign} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default MyCampaigns;
