"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/signup", formData);
      if (res.status === 201) {
        // Redirect to NextAuth sign-in page
        router.push("/api/auth/signin");
      } 
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-[#161b22]">
      <div className="p-8 bg-[#0d1117] rounded-3xl shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>

        {error && <p className="text-sm text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-[#0d1117] border border-[#555555] rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-[#0d1117] border border-[#555555] rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 bg-[#0d1117] border border-[#555555] rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-12 text-black transition bg-white rounded-md font-regular hover:bg-gray-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => signIn()} // Redirects to NextAuth sign-in page
            className="text-gray-300 hover:text-white"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
  