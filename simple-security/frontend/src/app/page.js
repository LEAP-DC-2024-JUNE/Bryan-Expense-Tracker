"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = new Date(decodedToken.exp * 1000);

      const currentTime = new Date();
      if (currentTime > expirationTime) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.refresh();
  };

  return (
    <div className="px-10 py-20">
      {isAuthenticated ? (
        <div>
          <h1 className="text-2xl text-center font-bold mb-5">
            You are logged in!
          </h1>
          <button
            onClick={handleLogout}
            className="w-max mx-auto px-3 py-2 bg-blue-400 text-white font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-center font-bold mb-5">
            You are not logged in!
          </h1>
          <button
            onClick={() => router.push("/login")}
            className="w-max mx-auto px-3 py-2 bg-blue-400 text-white font-semibold"
          >
            Go to login page
          </button>
        </div>
      )}
    </div>
  );
}
