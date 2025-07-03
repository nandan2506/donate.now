import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function UserSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError(true);
      setResponseMsg("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponseMsg(data.message);
      setError(!res.ok);

      if (res.ok) {
        setTimeout(() => {
          navigate("/userLogin");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setResponseMsg("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0c3d3d] mb-6">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Username
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              type="text"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 border border-[#01BFBD] text-[#01BFBD] rounded-lg hover:bg-[#01BFBD] hover:text-white transition w-full"
            >
              <IoMdArrowBack />
              Previous
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#01BFBD] text-white rounded-lg hover:bg-[#019fa5] transition w-full"
            >
              Signup
            </button>
          </div>
        </form>

        {/* Response Message */}
        {responseMsg && (
          <div
            className={`mt-5 text-center font-medium px-4 py-2 rounded-md ${
              error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {responseMsg}
          </div>
        )}

        {/* Link to login */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/userLogin"
            className="text-[#01BFBD] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
