const link = "https://b44-web-051.onrender.com/";

const campaignsDiv = document.getElementById("campaigns");
const errorDiv = document.getElementById("error");

async function fetchCampaigns() {
  try {
    const res = await fetch(`${link}campaign/allCampaign`);
    const data = await res.json();

    if (data.msg === "no campaigns") {
      errorDiv.innerText = "No campaigns available.";
      return;
    }

    campaignsDiv.innerHTML = ""; // Clear before adding new

    data.campaigns.forEach((campaign) => {
      const percentageRaised = campaign.raisedAmount
        ? ((campaign.raisedAmount / campaign.goalAmount) * 100).toFixed(2)
        : 0;

      const card = document.createElement("div");
      card.className = "campaign-card";
      card.innerHTML = `
        <h3>${campaign.title}</h3>
        <p><strong>Description:</strong> ${campaign.description}</p>
        <p><strong>Goal Amount:</strong> ₹${campaign.goalAmount}</p>
        <p><strong>Raised Amount:</strong> ₹${campaign.raisedAmount || 0} (${percentageRaised}%)</p>

        <div class="progress-bar">
          <div class="progress" style="width: ${percentageRaised}%"></div>
        </div>

        <button class="donate-btn" data-campaign-id="${campaign._id}">Donate</button>
      `;
      campaignsDiv.appendChild(card);
    });

    // Add event listeners to all donate buttons
    const donateButtons = document.querySelectorAll(".donate-btn");
    donateButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default behavior
        const campaignId = e.target.getAttribute("data-campaign-id");
        checkAuthAndRedirect(`./donate/donate.html?campaignId=${campaignId}`, e);
      });
    });

    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const campaignCards = document.querySelectorAll(".campaign-card");

      campaignCards.forEach((card) => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        if (title.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });

    const signInBtn = document.getElementById("signInBtn");
    const loginBtn = document.getElementById("loginBtn");

    signInBtn.addEventListener("click", () => {
      window.location.href = "./user/user.signUp.html";
    });

    loginBtn.addEventListener("click", () => {
      window.location.href = "./user/user.login.html";
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    errorDiv.innerText = "Something went wrong while fetching campaigns.";
  }
}

const addCampaignBtn = document.getElementById("addCampaignBtn");
const donateNowBtn = document.getElementById("donateNowBtn");

function checkAuthAndRedirect(path, event) {
  if (event) event.preventDefault(); // optional, only if event passed
  const token = localStorage.getItem("add-new-campaign-token");
  if (token) {
    window.location.href = path;
  } else {
    localStorage.setItem("redirectAfterLogin", path); // Save where user wanted to go
    alert("Please login first to continue.");
    window.location.href = "./user/user.login.html";
  }
}

addCampaignBtn.addEventListener("click", () => {
  checkAuthAndRedirect("./campaign/newCampaign.html");
});

donateNowBtn.addEventListener("click", () => {
  checkAuthAndRedirect("./donate/donate.html");
});

fetchCampaigns();
