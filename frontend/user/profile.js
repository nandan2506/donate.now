const link = "http://localhost:8000/";

const campaignsDiv = document.getElementById("campaigns");
const errorDiv = document.getElementById("error");
const addCampaignBtn = document.getElementById("addCampaignBtn");
const profileBtn = document.getElementById("profileBtn");
const hamMenu = document.getElementById("ham");

// Fetch all campaigns
async function fetchCampaigns() {
  try {
    const res = await fetch(`${link}campaign/allCampaign`);
    const data = await res.json();

    if (data.msg === "no campaigns") {
      errorDiv.innerText = "No campaigns available.";
      return;
    }

    data.campaigns.forEach((campaign) => {
      const card = document.createElement("div");
      card.className = "campaign-card";
      card.innerHTML = `
        <h3>${campaign.title}</h3>
        <p><strong>Description:</strong> ${campaign.description}</p>
        <p><strong>Goal Amount:</strong> ₹${campaign.goalAmount}</p>
        <button class="donate-btn" data-campaign-id="${campaign._id}">Donate</button>
      `;
      campaignsDiv.appendChild(card);
    });

    // Add donate button functionality
    const donateButtons = document.querySelectorAll(".donate-btn");
    donateButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const campaignId = e.target.getAttribute("data-campaign-id");
        checkAuthAndRedirect(`../donate/donate.html?campaignId=${campaignId}`);
      });
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    errorDiv.innerText = "Something went wrong while fetching campaigns.";
  }
}

// Search campaigns
document.getElementById("search").addEventListener("input", () => {
  const query = document.getElementById("search").value.toLowerCase();
  const campaignCards = document.querySelectorAll(".campaign-card");

  campaignCards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});

// Check authentication and redirect
function checkAuthAndRedirect(path) {
  const token = localStorage.getItem("add-new-campaign-token");
  if (token) {
    window.location.href = path;
  } else {
    localStorage.setItem("redirectAfterLogin", path);
    alert("Please login first to continue.");
    window.location.href = "./user/user.login.html";
  }
}



// Add Campaign button
addCampaignBtn.addEventListener("click", () => {
  checkAuthAndRedirect("../campaign/newCampaign.html");
});

// Profile (Hamburger Menu)
profileBtn.addEventListener("click", () => {
  hamMenu.classList.toggle("hidden");
});

// Inside the ham menu
document.getElementById("myCampaigns").addEventListener("click", () => {
  checkAuthAndRedirect("./user/myCampaigns.html");
});

document.getElementById("myDonations").addEventListener("click", () => {
  checkAuthAndRedirect("./user/myDonations.html");
});

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("add-new-campaign-token");
  alert("Logged out successfully!");
  window.location.href = "../index.html";
});

// Fetch campaigns when page loads
fetchCampaigns();
