document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('campaignId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const goalAmount = document.getElementById('goalAmount').value;
    const milestones = document.getElementById('milestones').value.split(',').map(item => item.trim());
    const media = document.getElementById('media').value;

    const response = await fetch(`http://localhost:5000/your-update-campaign-route/${id}`, { // Replace with your update route
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN_HERE' // if token needed
        },
        body: JSON.stringify({ title, description, goalAmount, milestones, media })
    });

    const data = await response.json();
    const message = document.getElementById('message');

    if (response.ok) {
        message.textContent = "Campaign Updated Successfully!";
    } else {
        message.textContent = data.msg || "Failed to update campaign.";
    }
});
