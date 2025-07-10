
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const userId = useParams()

const API_BASE = "https://crowdfundingplatform.onrender.com";

  const token = localStorage.getItem("add-new-campaign-token");

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/userLogin");
    }
  }, [token, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      setErrorMsg("Please enter at least one field to update.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/user/updateProfile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (res.status === 200) {
        setSuccessMsg(data.msg || "updated successfully!");
        setErrorMsg("");
        alert('user updated!')
        navigate('/')
      } else {
        setErrorMsg(data.msg || "Update failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };



  const handleLogout = () => {
    localStorage.removeItem("add-new-campaign-token");
    navigate("/userLogin");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
    <div style={styles.container}>
      <header style={styles.navbar}>
        <div>
          <button onClick={handleBack} style={styles.navBtn}>
            Back
          </button>
        </div>
        <h2>Update Profile</h2>
        <div>
          <button onClick={handleLogout} style={styles.navBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <form onSubmit={handleUpdate} style={styles.form}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            Update
          </button>
        </form>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}
        {successMsg && <div style={styles.success}>{successMsg}</div>}
      </main>
    </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
  },
  navBtn: {
    backgroundColor: "#fff",
    color: "#1976d2",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  main: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitBtn: {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
};

export default UpdateProfile;
