import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaCogs, FaBrain, FaLock } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/generate", icon: <FaCogs />, label: "Generate" },
    { to: "/check", icon: <FaBrain />, label: "Analyze" },
    { to: "/breach", icon: <FaLock />, label: "Breach" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-gray-700 
                    px-6 py-3 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] z-50">
      <ul className="flex items-center gap-8 text-gray-300 font-medium">
        {navLinks.map((link) => (
          <li key={link.to} className="relative group">
            <Link to={link.to} className="flex items-center gap-2 hover:text-purple-400 transition">
              {link.icon}
              <span>{link.label}</span>
            </Link>
            {location.pathname === link.to && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
