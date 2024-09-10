"use client";

import React from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, isLoggedIn, actions } = useAuth();
  const router = useRouter();
  console.log(user);

  const handleLogout = () => {
    actions.logout();
    router.push("/"); //LINK?!
  };
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          {isLoggedIn
            ? `Welcome, ${user.name}`
            : "We are the knights that say nee"}
        </div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
