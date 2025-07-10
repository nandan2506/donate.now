import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

const API_BASE = "https://crowdfundingplatform.onrender.com";
  
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Extract userId from token
  useEffect(() => {
    const token = localStorage.getItem("add-new-campaign-token");
    if (!token) {
      navigate("/userLogin");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.userId);
    } catch (e) {
      console.error("Token decoding error:", e);
      setError("Invalid token");
      setLoading(false);
    }
  }, [navigate]);

  // Fetch user profile
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("add-new-campaign-token");
    try {
      const res = await fetch(`${API_BASE}/user/userProfile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.userProfile) {
        setUser(data.userProfile);
      } else {
        setError(data.msg || "User not found.");
      }
    } catch (err) {
      setError("Error fetching profile.");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("add-new-campaign-token");
    navigate("/userLogin");
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold text-[#01BFBD] animate-pulse">
            Loading Profile...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="text-center text-red-600 font-semibold mt-10">
          {error}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-[80vh] bg-[#f0f9f9] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 text-center">
          {/* Avatar */}
          <img
            src={user.avatar || "https://www.gravatar.com/avatar/?d=mp&s=200"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-[#01BFBD]"
          />

          <h2 className="text-3xl font-bold text-[#01BFBD]">User Profile</h2>

          <div className="text-left space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/updateProfile/${userId}`)}
              className="bg-[#01BFBD] hover:bg-[#019fa5] text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
