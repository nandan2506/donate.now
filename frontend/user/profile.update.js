document.addEventListener("DOMContentLoaded", () => {
    const updateProfileForm = document.getElementById("updateProfileForm");
    const errorDiv = document.getElementById("error");
    const successDiv = document.getElementById("success");
  
    async function updateProfile(event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
  
      const token = localStorage.getItem("add-new-campaign-token");
  
      if (!token) {
        alert("Please login first!");
        window.location.href = "../user/user.login.html";
        return;
      }
  
      // Prepare the data to be sent based on the fields entered
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
  
      if (Object.keys(updateData).length === 0) {
        errorDiv.textContent = "Please enter at least one field (username or email) to update.";
        successDiv.textContent = '';
        return;
      }
  
      try {
        const res = await fetch("http://localhost:8000/user/updateProfile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });
  
        const data = await res.json();
  
        if (res.status === 200) {
          successDiv.textContent = data.msg;
          errorDiv.textContent = '';
        } else {
          errorDiv.textContent = data.msg;
          successDiv.textContent = '';
        }
      } catch (error) {
        errorDiv.textContent = "Something went wrong, please try again.";
        successDiv.textContent = '';
      }
    }
  
    updateProfileForm.addEventListener("submit", updateProfile);
  
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("add-new-campaign-token");
      window.location.href = "../user/user.login.html";
    });
  
    document.getElementById("backBtn").addEventListener("click", () => {
      window.history.back();
    });
  });
  