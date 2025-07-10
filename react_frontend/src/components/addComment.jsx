import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaChevronRight } from "react-icons/fa";

function AddComment() {
const API_BASE = "https://crowdfundingplatform.onrender.com";
  const navigate = useNavigate();
  const { campId } = useParams();

  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState("");

  async function handleComment(e) {
    e.preventDefault();
    const token = localStorage.getItem("add-new-campaign-token");

    if (!token) {
      toast.warning("Please login first");
      navigate("/userLogin");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/comment/add_comment/${campId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ commentText }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Comment added successfully!");
        setCommentText("");

      } else {
        setMessage(data.msg || "Failed to add comment.");
        toast.error(data.msg || "Failed to add comment.");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setMessage("Error adding comment.");
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleComment}
        className="flex mt-3 flex-col sm:flex-row gap-4 items-start sm:items-end"
      >
        <input
          type="text"
          placeholder="Enter your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01BFBD] transition"
        />
        <button
          type="submit"
          className="text-[#01BFBD]   text-xl h-10 rounded-md hover:shadow-lg transition"
        >
          <FaChevronRight />
        </button>
      </form>
      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </div>
  );
}

export default AddComment;
