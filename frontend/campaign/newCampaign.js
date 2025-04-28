const link = "http://localhost:8000"



const form = document.getElementById("createForm");
const responseMessage = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const goalAmount = document.getElementById("goalAmount").value;
  const milestones = document.getElementById("milestones").value.split(",").map(item => item.trim());
  const media = document.getElementById("media").value.split(",").map(item => item.trim());

  const campaignData = {
    title,
    description,
    goalAmount,
    milestones,
    media,
  };

  // Retrieve the token from localStorage
  const token = localStorage.getItem("add-new-campaign-token");

  if (!token) {
    responseMessage.innerText = "You must be logged in to create a campaign.";
    responseMessage.style.color = "red";
    return;
  }

  try {
    const response = await fetch(`${link}/campaign/newCampaign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Include the token in the header
      },
      body: JSON.stringify(campaignData),
    });

    const data = await response.json();
    if (response.ok) {
      responseMessage.innerText = "Campaign created successfully!";
      responseMessage.style.color = "green";
      window.location.href="../user/profile.html"
    } else {
      responseMessage.innerText = data.msg || "Something went wrong!";
      responseMessage.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    responseMessage.innerText = "Something went wrong!";
    responseMessage.style.color = "red";
  }
});
