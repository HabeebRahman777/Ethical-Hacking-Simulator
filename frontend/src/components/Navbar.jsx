import React from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogIn, LogOut, UserPlus, Home } from "lucide-react"; 

const Navbar = () => {
  const { clearAuthUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      clearAuthUser();
      console.log("Logged out successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar bg-base-100 shadow-md px-6 py-4">
      <div className="flex-1">
        <button 
          className="text-xl font-bold text-primary hover:text-secondary transition-all flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6" /> EHS APP
        </button>
      </div>
      <div className="flex gap-4">
        {isHomePage ? (
          <>
            <button className="btn btn-primary flex items-center gap-2" onClick={() => navigate("/signup")}>
              <UserPlus className="w-5 h-5" />
              Signup
            </button>
            <button className="btn btn-secondary flex items-center gap-2" onClick={() => navigate("/login")}>
              <LogIn className="w-5 h-5" />
              Login
            </button>
            <button className="btn btn-error flex items-center gap-2" onClick={logout}>
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        ) : (
          <button className="btn btn-outline btn-accent flex items-center gap-2" onClick={() => navigate("/")}>
            <Home className="w-5 h-5" />
            Home
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
