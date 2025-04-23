const link = "http://localhost:8000/";

  async function handleSignUp() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const responseDiv = document.getElementById('response');

    if (!username || !email || !password) {
      responseDiv.innerText = "All fields are required!";
      responseDiv.className = "message error";
      return;
    }

    try {
      const res = await fetch(`${link}user/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      responseDiv.innerText = data.message;
      responseDiv.className = res.ok ? 'message' : 'message error';
      if (res.ok) {
            window.location.href = "./user.login.html";
          }

    } catch (error) {
      console.error('Error:', error);
      responseDiv.innerText = 'Something went wrong';
      responseDiv.className = 'message error';
    }
  }