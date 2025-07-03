import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { IoMdArrowBack } from "react-icons/io";

function UserLogin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const link = "http://localhost:8000";

  const handleLogin = async () => {
    if (!email || !password) {
      setResponseMsg("Please enter both email and password.");
      setError(true);
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
      setResponseMsg(data.message);
      setError(!res.ok);

      if (res.ok) {
        const token = data.tkn;
        if (token) {
          dispatch(loginSuccess({ token }));
          const redirectPath = localStorage.getItem("redirectAfterLogin");
          if (redirectPath) {
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectPath);
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMsg("Something went wrong");
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#01BFBD] to-[#e8f9f7] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0c3d3d]">Login</h1>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 border border-[#01BFBD] text-[#01BFBD] rounded-lg hover:bg-[#01BFBD] hover:text-white transition"
            >
              <IoMdArrowBack />
              Previous
            </button>
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-[#01BFBD] text-white rounded-lg hover:bg-[#019fa5] transition"
            >
              Login
            </button>
          </div>

          {responseMsg && (
            <div
              className={`mt-4 text-center font-medium px-4 py-2 rounded-md ${
                error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}
            >
              {responseMsg}
            </div>
          )}

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/userSignup" className="text-[#01BFBD] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
