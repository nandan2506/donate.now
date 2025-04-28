const link = "https://b44-web-051.onrender.com";

// Get campaignId from URL
const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get('campaignId');

// Immediately fetch and set the campaign title
(async () => {
  try {
    const token = localStorage.getItem('add-new-campaign-token');  // <-- corrected key
    const response = await fetch(`${link}/campaign/Campaign/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.campaign) {
      const title = document.getElementById("title-campaign");
      title.innerText = `Campaign: ${result.campaign.title}`;
    } else {
      alert(result.msg || "Something went wrong");
    }
  } catch (error) {
    console.log("Error while setting the title:", error);
    alert("Something went wrong.");
  }
})();

// Handle donation submission
async function handleDonate() {
  const amount = document.getElementById('amount').value;
  
  if (!amount || amount <= 0) {
    alert('Please enter a valid donation amount.');
    return;
  }

  const token = localStorage.getItem('add-new-campaign-token');  // <-- corrected key

  if (!token) {
    alert('Please login first!');
    window.location.href = "../user/user.login.html";
    return;
  }

  try {
    const response = await fetch(`${link}/donation/donate/${campaignId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Thank you for your donation!');
      window.location.href = "../user/profile.html";
    } else {
      alert(data.msg || 'Failed to donate.');
    }
  } catch (error) {
    console.error('Error while donating:', error);
    alert('Something went wrong.');
  }
}
