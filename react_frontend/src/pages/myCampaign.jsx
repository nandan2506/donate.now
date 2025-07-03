import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE = "http://localhost:8000";

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
            <p className="text-center text-gray-500 text-lg">
              Loading campaigns...
            </p>
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
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => {
                const percentage = campaign.raisedAmount
                  ? (
                      (campaign.raisedAmount / campaign.goalAmount) *
                      100
                    ).toFixed(1)
                  : 0;

                return (
                  <div
                    key={campaign._id}
                    className="bg-white w-full max-w-md px-10 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border"
                  >
                    <div className="md:15">
                      <h2 className="text-2xl font-semibold text-[#0c3d3d]">
                        {campaign.title}
                      </h2>
                      <p className="text-start text-gray-600 mt-3 mb-4 text-md line-clamp-3">
                        {campaign.description}
                      </p>

                      <div className="text-start text-md text-gray-500 mb-2">
                        <span className="font-semibold text-gray-700">
                          Goal:
                        </span>{" "}
                        ₹{campaign.goalAmount} <br />
                        <span className="font-semibold text-gray-700">
                          Raised:
                        </span>{" "}
                        ₹{campaign.raisedAmount || 0} ({percentage}%)
                      </div>

                      <div className=" bg-gray-200 mt-4 w-full h-2 rounded-full">
                        <div
                          className="bg-[#01BFBD] max-w-full h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                        <button
                      onClick={() => navigate(`/campaign/${campaign._id}`)}
                      className="bg-[#01BFBD] text-white mt-4 w-full py-2 rounded-full transition-all duration-300 hover:bg-[#019fa5]"
                    >
                      View Details
                    </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyCampaigns;
