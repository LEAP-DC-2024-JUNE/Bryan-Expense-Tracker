"use client";

import { useState } from "react";
import { login } from "@/utils/apiService";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(formData);
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <div className="px-10 py-32">
      <div className="w-[500px] mx-auto bg-gray-200 px-10 py-10 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-2 py-1  rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-2 py-1  rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-max mx-auto px-3 py-2 bg-blue-400 text-white"
          >
            Login
          </button>
          <div>{error && <p className="text-red-500">{error}</p>}</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
