import React from "react";
import { useNavigate } from "react-router-dom";

export default function CampCard({ campaign }) {
  const percentage = campaign.raisedAmount
    ? Math.min(
        (campaign.raisedAmount / campaign.goalAmount) * 100,
        100
      ).toFixed(2)
    : 0;

  function handleDonate(id) {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      alert("please login first");
      navigate(`/userLogin`);
    } else {
      navigate(`/donate?campaignId=${id}`);
    }
  }

  const navigate = useNavigate();
  return (
    // <div>
    <div
      key={campaign._id}
      className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
    >
      <div
        
      >
        <img src={campaign.dp} alt="" />
        <h3 className="text-xl font-semibold text-[#0c3d3d] mb-2">
          {campaign.title.slice(0, 50)}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <img
            src={
              campaign.owner.dp ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-gray-600 text-sm">
            by {campaign.owner.username}
          </span>
        </div>

        <p className="text-gray-600 text-sm">
          <strong>Goal Amount:</strong> ₹{campaign.goalAmount}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Raised Amount:</strong> ₹{campaign.raisedAmount || 0}{" "}
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

      <div className="flex justify-between">
        <div>
          {Math.ceil(
            (new Date(campaign.endDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )}
          <span> days left</span>
        </div>
        <div>
          <strong>{campaign.donors.length}</strong>
          <span> supporters</span>
        </div>
      </div>

      <button
        onClick={() => handleDonate(campaign._id)}
        className="mt-3 md:mt-6 bg-[#01BFBD] text-white px-1 md:px-4 md:py-2 rounded-lg hover:bg-[#019fa5] transition-all"
      >
        Contribute Now
      </button>
    </div>
    // </div>
  );
}
