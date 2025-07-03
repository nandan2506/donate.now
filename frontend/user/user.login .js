const link = "http://localhost:8000";

async function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const responseDiv = document.getElementById("response");

  if (!email || !password) {
    responseDiv.innerText = "Please enter both email and password.";
    responseDiv.className = "message error";
    return;
  }

  try {
    const res = await fetch(`${link}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    responseDiv.innerText = data.message;
    responseDiv.className = res.ok ? "message" : "message error";

    if (res.ok) {
      const token = data.tkn; // after login success
      if (token) {
        localStorage.setItem("add-new-campaign-token", token);

        const redirectPath = localStorage.getItem("redirectAfterLogin");

        if (redirectPath) {
          // Redirect to where user wanted originally
          localStorage.removeItem("redirectAfterLogin"); // Clear after use
          window.location.href = redirectPath;
        } else {
          // Normal login → send to profile
          window.open("../user/profile.html");
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    responseDiv.innerText = "Something went wrong";
    responseDiv.className = "message error";
  }
}
