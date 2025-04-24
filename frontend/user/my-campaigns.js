const link = "http://localhost:8000"; // adjust if deployed elsewhere

// Extract userId from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

// Function to fetch and display user's campaigns
async function fetchMyCampaigns() {
  try {
    const response = await fetch(`${link}/campaign/myCampaign/${userId}`);
    const data = await response.json();
    console.log(data.allCampaigns);

    const container = document.getElementById("campaign-list");
    container.innerHTML = ""; // Clear previous content

    if (data.allCampaigns && data.allCampaigns.length > 0) {
      data.allCampaigns.forEach((campaign) => {
        const div = document.createElement("div");
        div.classList.add("campaign-card");
        div.innerHTML = `
            <h3>${campaign.title}</h3>
            <p><strong>Description:</strong> ${campaign.description}</p>
            <p><strong>Raised Amount:</strong> ₹${
              campaign.raisedAmount || 0
            }</p>
            <p><strong>Goal Amount:</strong> ₹${campaign.goalAmount}</p>
            
          `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = `<p>No campaigns found.</p>`;
    }
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    document.getElementById("campaign-list").innerText =
      "Error loading campaigns.";
  }
}

fetchMyCampaigns();
