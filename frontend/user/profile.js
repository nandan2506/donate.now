document.addEventListener("DOMContentLoaded", () => {
  const link = "http://localhost:8000/";

  const campaignsDiv = document.getElementById("campaigns");
  const errorDiv = document.getElementById("error");
  const addCampaignBtn = document.getElementById("addCampaignBtn");
  const profileBtn = document.getElementById("profileBtn");
  const hamMenu = document.getElementById("ham");
  const profileContainer = document.getElementById("profileContainer");
  const username = document.getElementById("username")

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

      document.querySelectorAll(".donate-btn").forEach((btn) => {
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
  document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".campaign-card").forEach((card) => {
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

  // Toggle dropdown menu
  profileBtn.addEventListener("click", () => {
    hamMenu.classList.toggle("hidden");
  });

  // Auto-close menu when clicking outside
  window.addEventListener("click", (e) => {
    if (!profileContainer.contains(e.target)) {
      hamMenu.classList.add("hidden");
    }
  });

  // Menu options
  document.getElementById("myCampaigns").onclick = () => {
    const token = localStorage.getItem("add-new-campaign-token");
    
    if (!token) {
      alert("Please login first!");
      window.location.href = "../user/user.login.html";
      return;
    }
  
    // Decode the JWT to get the payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;
  
    // Redirect with userId in query param
    window.location.href = `./myCampaigns.html?userId=${userId}`;
  };
  
  

  document.getElementById("myDonations").onclick = () => {
    window.location.href = "/my-donations.html";
  };

  document.getElementById("logout").onclick = () => {
    localStorage.removeItem("add-new-campaign-token");
    window.location.href = "/user/user.login.html";
  };

  // Initial fetch
  fetchCampaigns();
});
