const link = "https://b44-web-051.onrender.com"; // adjust if deployed elsewhere

// Get token from localStorage
const token = localStorage.getItem('add-new-campaign-token');

// Extract userId from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

// Function to fetch and display user's campaigns
async function fetchMyCampaigns() {
  try {
    const response = await fetch(`${link}/campaign/myCampaign/${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = await response.json();
    console.log(data.allCampaigns);

    const container = document.getElementById("campaign-list");
    container.innerHTML = ""; // Clear previous content

    if (data.allCampaigns && data.allCampaigns.length > 0) {
      data.allCampaigns.forEach((campaign) => {
        const percentageRaised = campaign.raisedAmount
          ? ((campaign.raisedAmount / campaign.goalAmount) * 100).toFixed(2)
          : 0;

        const div = document.createElement("div");
        div.classList.add("campaign-card");
        div.innerHTML = `
          <h3>${campaign.title}</h3>
          <p><strong>Description:</strong> ${campaign.description}</p>
          <p><strong>Goal Amount:</strong> ₹${campaign.goalAmount}</p>
          <p><strong>Raised:</strong> ₹${campaign.raisedAmount || 0} (${percentageRaised}%)</p>

          <div class="progress-bar-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${percentageRaised}%"></div>
            </div>
          </div>

          <div class="button-container">
            <button class="update-btn" data-campaign-id="${campaign._id}">Update</button>
          </div>
        `;
        container.appendChild(div);

        // Add event listener to Update button
        div.querySelector('.update-btn').addEventListener('click', () => {
          const campaignId = campaign._id;
          window.open(`../campaign/updateCampaign.html?campaignId=${campaignId}`);
        });
      });
    } else {
      container.innerHTML = `<p>No campaigns found.</p>`;
    }
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    document.getElementById("campaign-list").innerText = "Error loading campaigns.";
  }
}

fetchMyCampaigns();
