import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddComment() {
  const API_BASE = "http://localhost:8000";
  const navigate = useNavigate();
  const { campId } = useParams();

  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState("");

  async function handleComment(e) {
    e.preventDefault();
    const token = localStorage.getItem("add-new-campaign-token");

    if (!token) {
      alert("Please login first");
      navigate("/userLogin");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/comment/add_comment/${campId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ commentText }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Comment added successfully!");
        setCommentText("");
        setMessage("Comment added successfully.");
        // You can optionally redirect or refresh comments
      } else {
        setMessage(data.msg || "Failed to add comment.");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setMessage("Error adding comment.");
    }
  }

  return (
    <div>
      <h3>Add a Comment</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Enter your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddComment;
