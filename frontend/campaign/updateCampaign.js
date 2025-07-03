const link = "http://localhost:8000"; // Adjust to your backend URL

// Get the campaignId from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get("campaignId"); // Ensure this matches the query parameter name
const token = localStorage.getItem("add-new-campaign-token");

async function fetchCampaignData() {
  try {
    const response = await fetch(`${link}/campaign/Campaign/${campaignId}`, {
      // Correct API endpoint
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("API Response:", data); // Log the API response

    if (response.ok) {
      const milestones = Array.isArray(data.campaign.milestones)
        ? data.campaign.milestones.join(", ")
        : "";
      document.getElementById("title").value = data.campaign.title;
      document.getElementById("description").value = data.campaign.description;
      document.getElementById("goalAmount").value = data.campaign.goalAmount;
      document.getElementById("milestones").value = milestones;
      document.getElementById("media").value = data.campaign.media;
    } else {
      document.getElementById("message").textContent =
        "Error fetching campaign data.";
    }
  } catch (err) {
    console.error("Error fetching campaign data:", err);
    document.getElementById("message").textContent =
      "Error fetching campaign data.";
  }
}

document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const goalAmount = document.getElementById("goalAmount").value;
  const milestones = document
    .getElementById("milestones")
    .value.split(",")
    .map((item) => item.trim());
  const media = document.getElementById("media").value;

  const response = await fetch(
    `${link}/campaign/updateCampaign/${campaignId}`,
    {
      // Correct API endpoint
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        goalAmount,
        milestones,
        media,
      }),
    }
  );

  const data = await response.json();
  const message = document.getElementById("message");

  if (response.ok) {
    message.textContent = "Campaign updated successfully!";
    alert("Campaign updated successfully!")
  } else {
    message.textContent = data.msg || "Failed to update campaign.";
    alert(data.msg || "Failed to update campaign.")
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;
  window.location.href = `../user/myCampaigns.html?userId=${userId}`;
});

// Fetch campaign details when the page loads
fetchCampaignData();
