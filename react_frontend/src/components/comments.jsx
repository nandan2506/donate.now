import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

function Comments({ campId }) {
  
const API_BASE = "https://crowdfundingplatform.onrender.com";

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/campaign/Campaign/${campId}`);
        const data = await res.json();

        if (!res.ok || !data.campaign) {
          setError("No campaign or comments found.");
          setComments([]);
        } else {
          setComments(data.campaign.comments || []);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong while fetching comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [campId]);

  if (loading) return <h3>Loading comments...</h3>;
  if (err) return <p style={{ color: "red" }}>{err}</p>;
  if (comments.length === 0) return <h4 className="mt-2">No comments yet.</h4>;

  return (
    <div>
      <h3>Comments:</h3>
      <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
        {comments.map((c, i) => (
          <div
            key={i}
            style={{
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: "#f1f8e9",
              borderRadius: "8px",
              borderLeft: "4px solid #4caf50",
            }}
          >
            <strong style={{ color: "#2e7d32" }}>
              {c.userId?.username || "Anonymous"}
            </strong>
            <p style={{ margin: "6px 0" }}>{c.commentText}</p>
            <p style={{ fontSize: "12px", color: "gray", margin: "0" }}>
              {c.createdAt
                ? formatDistanceToNow(new Date(c.createdAt), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
