document.addEventListener("DOMContentLoaded", () => {
  const link = "https://b44-web-051.onrender.com";

  const campaignsDiv = document.getElementById("campaigns");
  const errorDiv = document.getElementById("error");
  const addCampaignBtn = document.getElementById("addCampaignBtn");
  const profileBtn = document.getElementById("profileBtn");
  const hamMenu = document.getElementById("ham");
  const profileContainer = document.getElementById("profileContainer");

  // For showing user's name and email
  const userNameSpan = document.querySelector("#userName span");
  const userEmailSpan = document.querySelector("#userEmail span");

  // Fetch user profile
  async function fetchUserProfile() {
    try {
      const token = localStorage.getItem("add-new-campaign-token");
      if (!token) return;

      const res = await fetch(`${link}/user/userProfile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data.userProfile)

      if (data.userProfile) {
        
        userNameSpan.textContent = data.userProfile.username;
        userEmailSpan.textContent = data.userProfile.email;
      } else {
        console.error("User profile not found.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  // Fetch campaigns
  async function fetchCampaigns() {
    try {
      const res = await fetch(`${link}/campaign/allCampaign`);
      const data = await res.json();

      if (data.msg === "no campaigns") {
        errorDiv.innerText = "No campaigns available.";
        return;
      }

      data.campaigns.forEach((campaign) => {
        const { title, description, goalAmount, raisedAmount = 0, _id } = campaign;
        const percentage = Math.min((raisedAmount / goalAmount) * 100, 100).toFixed(1);

        const card = document.createElement("div");
        card.className = "campaign-card";
        card.innerHTML = `
          <h3>${title}</h3>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Goal:</strong> ₹${goalAmount}</p>
          <p><strong>Raised:</strong> ₹${raisedAmount}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${percentage}%;">
              ${percentage}%
            </div>
          </div>
          <button class="donate-btn" data-campaign-id="${_id}">Donate</button>
        `;
        campaignsDiv.appendChild(card);
      });

      // Attach donate button listeners
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

  // Authentication check
  function checkAuthAndRedirect(path) {
    const token = localStorage.getItem("add-new-campaign-token");
    if (token) {
      window.location.href = path;
    } else {
      localStorage.setItem("redirectAfterLogin", path);
      alert("Please login first to continue.");
      window.location.href = "../user/user.login.html";
    }
  }

  // Add new campaign button
  addCampaignBtn.addEventListener("click", () => {
    checkAuthAndRedirect("../campaign/newCampaign.html");
  });

  // Toggle profile menu
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hamMenu.classList.toggle("hidden");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileContainer.contains(e.target)) {
      hamMenu.classList.add("hidden");
    }
  });

  // Profile menu buttons
  document.getElementById("myCampaignsBtn").addEventListener("click", () => {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "../user/user.login.html";
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;
    window.location.href = `./myCampaigns.html?userId=${userId}`;
  });

  document.getElementById("myDonationsBtn").addEventListener("click", () => {
    window.location.href = "../donations/my-donations.html"; // ✅ fixed path
  });

  document.getElementById("editProfileBtn").addEventListener("click", () => {
    window.open("./update.profile.html"); // ✅ you can create this page
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("add-new-campaign-token");
    window.location.href = "../user/user.login.html";
  });

  // --- INIT ---
  fetchUserProfile();  // ✅ Fetch user data
  fetchCampaigns();    // ✅ Fetch campaigns
});
