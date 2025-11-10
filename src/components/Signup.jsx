import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem("passshieldUser", name.trim());
    navigate("/"); // redirect to home
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0014] via-[#11002a] to-[#000000] text-white overflow-hidden">
      {/* 💫 Animated Background */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[150px]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6],
          rotate: 360,
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 bg-gradient-to-b from-neutral-900/80 to-black/90 p-10 rounded-3xl border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.4)] backdrop-blur-2xl w-[400px] text-center"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
          PassShield OS
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Identify yourself to initialize the system
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full bg-black/60 border border-purple-500/40 rounded-xl p-3 text-center text-white focus:outline-none focus:border-purple-400 mb-5"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 py-3 px-6 rounded-xl font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] transition"
          >
            Initialize System
          </motion.button>
        </form>
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-6 text-gray-500 text-xs">
        🔒 PassShield v2.0 AI System Interface
      </p>
    </div>
  );
};

export default Signup;
