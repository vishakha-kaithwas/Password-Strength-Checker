import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBolt, FaCopy, FaCheck } from "react-icons/fa";
import useSound from "use-sound";
import clickSfx from "../assets/click.mp3";

const PasswordGenerator = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");
  const [play] = useSound(clickSfx, { volume: 0.2 });

  // 🌈 Random Sparks
  const [sparks, setSparks] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      setSparks((prev) => [...prev, id]);
      setTimeout(() => setSparks((prev) => prev.filter((s) => s !== id)), 2000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 🔐 Generate Password
  const generatePassword = () => {
    play();
    if (!name.trim()) {
      setPassword("⚠️ Enter a name first!");
      setStrength("");
      return;
    }
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const randomPart = Array.from({ length: 8 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
    const final = `${name.slice(0, 3).toUpperCase()}${randomPart}${name
      .slice(-2)
      .toLowerCase()}`;

    // Typewriter animation
    setPassword("");
    for (let i = 0; i <= final.length; i++) {
      setTimeout(() => setPassword(final.slice(0, i)), i * 40);
    }

    checkStrength(final);
  };

  // 🧠 Strength logic
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) setStrength("Weak");
    else if (score === 3) setStrength("Moderate");
    else setStrength("Strong");
  };

  // 📋 Copy
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getStrengthColor = () => {
    if (strength === "Weak") return "from-red-600 to-orange-500";
    if (strength === "Moderate") return "from-yellow-400 to-green-400";
    if (strength === "Strong") return "from-green-400 to-emerald-500";
    return "from-gray-700 to-gray-900";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#060012] to-black flex flex-col items-center justify-center overflow-hidden text-white">
      {/* 🌌 Moving Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-600/20 blur-[150px] rounded-full"
        animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full"
        animate={{ x: [0, -40, 40, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
      />

      {/* 🔥 Floating Sparks */}
      {sparks.map((id) => (
        <motion.div
          key={id}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 1,
          }}
          animate={{
            y: [null, Math.random() * -300],
            opacity: [1, 0],
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}

      {/* ⚙️ Forge Console */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-gradient-to-b from-neutral-900/70 to-black/90 p-10 rounded-3xl border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.4)] backdrop-blur-2xl max-w-xl w-full text-center"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent mb-2"
          animate={{
            textShadow: [
              "0 0 10px #a855f7",
              "0 0 20px #60a5fa",
              "0 0 15px #a855f7",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ⚙️ AI Password Forge
        </motion.h1>
        <p className="text-gray-400 mb-6">Enter your name to forge a password 🔐</p>

        {/* Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full bg-black/70 border border-purple-600/40 rounded-xl p-3 text-center text-white focus:outline-none focus:border-purple-400 mb-5"
        />

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePassword}
          className="bg-gradient-to-r from-purple-500 to-blue-500 py-3 px-6 rounded-xl font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 mx-auto hover:shadow-[0_0_45px_rgba(168,85,247,0.6)]"
        >
          <FaBolt className="text-yellow-300" /> Forge Password
        </motion.button>

        {/* Output */}
        {password && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-black/50 border border-purple-500/30 p-4 rounded-xl flex justify-between items-center"
          >
            <p className="text-purple-300 font-mono text-sm">{password}</p>
            <button
              onClick={copyToClipboard}
              className="text-purple-400 hover:text-purple-200 text-lg"
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </motion.div>
        )}

        {/* Strength */}
        {strength && (
          <div className="mt-5">
            <p className="text-sm text-gray-400 mb-1">Password Strength:</p>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <motion.div
                layout
                transition={{ duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${getStrengthColor()} rounded-full`}
              ></motion.div>
            </div>
            <p className="text-gray-300 italic mt-1">{strength}</p>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-6 text-gray-500 text-xs">
        🔮 Forged by <span className="text-purple-400 font-semibold">PassShield AI</span>
      </p>
    </div>
  );
};

export default PasswordGenerator;
