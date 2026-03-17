import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // Reset error
    setError("");

    // ✅ Admin Validation
    if (
      role === "admin" &&
      email === "admin@gmail.com" &&
      password === "4321"
    ) {
      navigate("/admin-dashboard");
    }

    // ✅ Customer Validation
    else if (
      role === "customer" &&
      email === "customer@gmail.com" &&
      password === "4321"
    ) {
      navigate("/customer-dashboard");
    }

    // ❌ Invalid
    else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-blue-700 text-white items-center justify-center p-10">
        <h1 className="text-3xl font-bold">
          A few more clicks to <br /> Sign in to your account.
        </h1>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">

          {/* Role Switch */}
          <div className="flex mb-4 gap-2">
            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 rounded ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Admin
            </button>

            <button
              onClick={() => setRole("customer")}
              className={`flex-1 py-2 rounded ${
                role === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Customer
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Sign In</h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;